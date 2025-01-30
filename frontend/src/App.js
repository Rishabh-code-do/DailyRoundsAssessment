import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./Upload";
import Movies from "./Movies";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Content Upload and Review System</h1>
          <nav>
            <ul>
              <li><Link to="/upload" className="nav-link">Upload CSV</Link></li>
              <li><Link to="/movies" className="nav-link">Movies</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/upload" element={<Upload />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
