import React, { useState, useEffect } from "react";
import "./App.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("1");
  const [year, setYear] = useState("");
  const [language, setLanguage] = useState("");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/movies?page=${page}&limit=${limit}&sort_by=${sortBy}&order=${order}&year=${year}&language=${language}`
        );

        // Get raw response text
        const text = await res.text();

        // Replace 'NaN' with 'null' in the text
        const sanitizedText = text.replace(/NaN/g, "null");

        // Parse sanitized JSON text
        const data = JSON.parse(sanitizedText);

        console.log(data.data); // Log parsed data

        setMovies(data.data);
        setTotalPages(data.pagination.total_pages);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [page, limit, sortBy, order, year, language]);

  // Generate page range for pagination
  const generatePageRange = () => {
    const maxPages = 3; // Number of pages before and after the current page to display
    const startPage = Math.max(1, page - maxPages); // Start page number
    const endPage = Math.min(totalPages, page + maxPages); // End page number

    // Build page range with potential ellipses
    let pages = [];
    if (startPage > 1) pages.push(1); // Always include page 1
    if (startPage > 2) pages.push("..."); // Ellipses if the range starts after page 1

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("..."); // Ellipses if the range ends before the last page
    if (endPage < totalPages) pages.push(totalPages); // Always include last page

    return pages;
  };

  return (
    <div className="movies-container">
      <h2>Movies</h2>
      <div className="filters">
        <input
          type="number"
          placeholder="Limit (5-50)"
          value={limit}
          min="5"
          max="50"
          onChange={(e) =>
            setLimit(Math.max(5, Math.min(50, parseInt(e.target.value) || 10)))
          }
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="">Sort By</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Rating</option>
        </select>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="1">Ascending</option>
          <option value="-1">Descending</option>
        </select>
        <button onClick={() => setPage(1)}>Apply Filters</button>
      </div>
      <div className="movie-list">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="movie-card">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <p>Date of Release: {movie.release_date? movie.release_date : "---"}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {generatePageRange().map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof item === "number") {
                setPage(item);
              }
            }}
            className={page === item ? "active" : ""}
          >
            {item}
          </button>
        ))}

        <button
          onClick={() => setPage((prevPage) => Math.min(totalPages, prevPage + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
