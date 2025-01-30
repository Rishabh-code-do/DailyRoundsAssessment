from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import pandas as pd
from pymongo import DESCENDING, ASCENDING
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

# Local MongoDB Connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/imdb"
print("Database connected")
mongo = PyMongo(app)

@app.route("/upload", methods=["POST"])
def upload_csv():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400
    
    # Check file extension
    if not file.filename.endswith('.csv'):
        return jsonify({"error": "Invalid file type. Only .csv files are allowed."}), 400

    # Read CSV
    df = pd.read_csv(file)

    # Extract year from release_date
    df['year'] = df['release_date'].apply(lambda x: int(x.split('-')[0]) if pd.notna(x) else 0)
    
    records = df.to_dict(orient="records")
    
    if records:
        mongo.db.movies.insert_many(records)
        return jsonify({"message": "File uploaded successfully"}), 200
    else:
        return jsonify({"error": "Empty CSV"}), 400

@app.route("/movies", methods=["GET"])
def get_movies():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    year = request.args.get("year")
    language = request.args.get("language")
    sort_by = request.args.get("sort_by")  # No default sorting
    order = request.args.get("order", "1")

    # Convert order to integer
    try:
        order = int(order)
        if order not in [1, -1]:  # Validating order (1: ascending, -1: descending)
            raise ValueError("Order must be 1 or -1.")
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Build the query object
    query = {}
    if year:
        query["year"] = int(year)
    if language:
        query["languages"] = {"$regex": language, "$options": "i"}  # Case-insensitive search in language list

    # Adjust sorting order based on the order param
    sort_order = ASCENDING if order == 1 else DESCENDING

    # Handle pagination, filtering, and sorting
    try:
        # If no sort_by is provided, the movies will be returned in the default order of insertion
        if sort_by:
            movies = mongo.db.movies.find(query).sort(sort_by, sort_order).skip((page - 1) * limit).limit(limit)
        else:
            movies = mongo.db.movies.find(query).skip((page - 1) * limit).limit(limit)

        data = list(movies)

        # Convert ObjectId to string for JSON serialization
        for movie in data:
            movie["_id"] = str(movie["_id"])

        # Return data with pagination info
        total_count = mongo.db.movies.count_documents(query)
        return jsonify({
            "data": data,
            "pagination": {
                "page": page,
                "limit": limit,
                "total_count": total_count,
                "total_pages": (total_count + limit - 1) // limit  # Calculate total pages
            }
        })
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
