Content Upload and Review System
================================

This project is a full-stack application that allows users to upload CSV files containing movie data and view the uploaded movies with filtering, sorting, and pagination features. The backend is built with Flask and MongoDB, and the frontend is built with React.


Features
--------

*   **CSV Upload**: Upload a CSV file containing movie data.
    
*   **Movie Listing**: View uploaded movies with pagination, filtering, and sorting.
    
*   **Filtering**: Filter movies by year and language.
    
*   **Sorting**: Sort movies by release date or rating in ascending or descending order.
    
*   **Pagination**: Navigate through movie listings with pagination.
    

Backend Overview
----------------

The backend is built using **Flask** and **MongoDB**. It provides two main endpoints:

### API Endpoints

1.  **Upload CSV**:
    
    *   **Endpoint**: POST /upload
        
    *   **Description**: Accepts a CSV file, processes it, and stores the data in MongoDB.
        
    *   **Request Body**: A CSV file with movie data.
        
    *   **Response**: Success or error message.
        
2.  **Get Movies**:
    
    *   **Endpoint**: GET /movies
        
    *   **Description**: Retrieves movies from MongoDB with filtering, sorting, and pagination.
        
    *   **Query Parameters**:
        
        *   page: Page number (default: 1).
            
        *   limit: Number of movies per page (default: 10).
            
        *   year: Filter movies by year.
            
        *   language: Filter movies by language.
            
        *   sort\_by: Sort movies by release\_date or vote\_average.
            
        *   order: Sort order (1 for ascending, -1 for descending).
            
    *   **Response**: A list of movies and pagination details.
        

Frontend Overview
-----------------

The frontend is built using **React** and provides two main routes:

1.  **Upload CSV**: A page to upload a CSV file.
    
2.  **Movies**: A page to view movies with filtering, sorting, and pagination.
    

### Frontend Routes

1.  **Upload CSV**:
    
    *   **Route**: /upload
        
    *   **Description**: Allows users to upload a CSV file.
        
2.  **Movies**:
    
    *   **Route**: /movies
        
    *   **Description**: Displays a list of movies with filtering, sorting, and pagination options.
        

Installation
------------

### Prerequisites

*   Python 3.x
    
*   Node.js and npm
    
*   MongoDB
    

### Backend Setup

1.  git clone cd
    
2.  python -m venv 
    venvsource venv/bin/activate 
    # On Windows: venv\\Scripts\\activate
    
3.  pip install -r requirements.txt
    
4.  Start MongoDB:
    
    *   Ensure MongoDB is installed and running on your system.
        
    *   mongod
        
5.  python app.py
    

### Frontend Setup

1.  cd frontend
    
2.  npm install
    
3.  npm start
    

Running the Application
-----------------------

1.  python app.py
    
2.  cd frontendnpm start
    
3.  Open your browser and navigate to http://localhost:3000.
    

Usage
-----

### Upload CSV

1.  Navigate to the **Upload CSV** page (/upload).
    
2.  Select a CSV file and click **Upload**.
    
3.  The file will be processed, and the data will be stored in MongoDB.
    

### View Movies

1.  Navigate to the **Movies** page (/movies).
    
2.  Use the filters and sorting options to customize the movie list.
    
3.  Use the pagination controls to navigate through the movie listings.