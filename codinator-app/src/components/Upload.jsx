import React, { useState } from "react";
import drop from "./drop.png";
import "@fontsource/montserrat";
import "@fontsource/rubik/700.css";
import styled from "styled-components";

// Container for the whole upload section
const Container = styled.div`
  max-width: 600px;
  margin: 0;
  padding: 20px;
  text-align: left;
`;

// Title placed outside the upload box
const Title = styled.h2`
  font-family: Rubik, sans-serif;
  font-weight: medium;
  margin-top: 80px;
  margin-bottom: 10px;

`;

// White upload box container
const UploadBox = styled.div`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 465px;
  background-color: white;
  padding: 20px;
  margin-top: 10px; /* pushes box further down */
  height: 400px;    /* increased height for a longer box */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Drag and drop area with a grey background
const DragArea = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  background-color: #f0f0f0; /* corrected color */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;


  align-items: center;
`;

// Image styling
const DropImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 0px;
  
`;

// Paragraph styling
const Paragraph = styled.p`
  font-family: sans-serif;
  margin-bottom: 10px;
`;

// Button group container
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top:40px;
  color: #FFF;
  


  
  
`;

// Confirm and Cancel button styles
const ConfirmButton = styled.button`
  background-color: #000;
  color: white;
  height: 40px;
  width: 120px;
  border-radius: 20px;
  margin-right: 20px;
  
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  
  
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: black;
  height: 40px;
  width: 120px;
  border-radius: 20px;
  margin-right: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }

  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

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

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    setFile(null);
    alert("File uploaded successfully!");
  };

  return (
    <Container>
      {/* Header moved outside of the white upload box */}
      <Title>DROP YOUR CLOTHES HERE</Title>

      <UploadBox>
        <DragArea
          className={`upload-container ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <DropImage src={drop} alt="Drop here" />
          <Paragraph>
            Drag and drop your photo here, or click to browse. (jpg, jpeg, heic, png)
          </Paragraph>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload" style={{ cursor: "pointer", color: "blue" }}>
            Browse
          </label>
        </DragArea>
      </UploadBox>

      {file && (
        <div style={{ marginTop: "20px" }}>
          <p>Selected File: {file.name}</p>
        </div>
      )}

      <ButtonGroup>
        <ConfirmButton onClick={handleUpload}>Upload</ConfirmButton>
        <CancelButton
          onClick={() => {
            setFile(null);
            setDragActive(false);
          }}
        >
          Cancel
        </CancelButton>
      </ButtonGroup>
    </Container>
  );
}

export default Upload;
