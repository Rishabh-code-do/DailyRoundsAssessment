import React, { useState } from "react";
import "./App.css";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("file", file); // Ensure the key matches what the backend expects

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
        // Do not set Content-Type header manually for FormData
      });
      const data = await res.json();
      alert(data.message || "Upload failed");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload CSV</h2>
      <div className="upload-box">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-button">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Upload;