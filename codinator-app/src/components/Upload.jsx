import React, { useState } from "react";
import drop from "./drop.png";
import "@fontsource/montserrat";
import "@fontsource/rubik/700.css";
import styled from "styled-components";

const ConfirmButton = styled.button`
  background-color: #000;
  color: white;
  height: 40px;
  width: 100px;
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #333; /* Slightly lighter black on hover */
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: black;
  height: 40px;
  width: 100px;
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0; /* Slightly darker white on hover */
  }
`;

function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  //   const [url, setUrl] = useState(""); // State to hold the URL input

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
  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setFile(null); // Clear the selected file after upload
    alert("File uploaded successfully!"); // Simulate successful upload
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0",
        padding: "20px",
        align: "left",
        textAlign: "left", // Align text to the left
      }}
    >
      <div
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow
          borderRadius: "20px", // Rounded corners
          border: "1px solid #ccc", // Light border
          backgroundColor: "white", // White background for the container
          padding: "20px", // Padding inside the container
        }}
      >
        <h2
          style={{
            fontFamily: "Rubik",
            fontWeight: "bold",
            marginLeft: "20px",
          
          }}
        >
          DROP YOUR CLOTHES HERE
        </h2>
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
            backgroundColor: "f0f0f0", // Light blue background when dragging over
          }}
        >
          <img
            src={drop}
            alt="Drop here"
            style={{
              width: "100px",
              height: "100px",
              marginBottom: "10px",
            }}
          />
          <p>
            Drag and drop your photo here, or click to browse. (jpg, jpeg, heic,
            png)
          </p>
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
      </div>

      {file && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected File: {file.name}</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <ConfirmButton
          onClick={handleUpload}
        >
          Upload
        </ConfirmButton>
        <CancelButton
          
          onClick={() => {
            setFile(null); // Clear the selected file
            setDragActive(false); // Reset drag active state
          }}
        >
          Cancel
        </CancelButton>{" "}
      </div>
    </div>
  );
}

export default Upload;
