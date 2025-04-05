import styled from "styled-components";
import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <div
        className={`upload-container ${dragActive ? "drag-active" : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        <p>Drag and drop your photo here, or click to browse</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{
            display: "none",
          }}
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          style={{ cursor: "pointer", color: "blue" }}
        >
          Browse
        </label>
      </div>
      {file && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected File: {file.name}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;