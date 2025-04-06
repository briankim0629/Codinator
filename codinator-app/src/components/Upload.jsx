import React, { useEffect, useState } from "react";
import drop from "./drop.png";
import "@fontsource/montserrat";
import "@fontsource/rubik/700.css";
import styled from "styled-components";

// Container for the whole upload section
const Container = styled.div`
  max-width: ${({ variant }) => (variant === "small" ? "300px" : "600px")};

  margin: 0;
  padding: 20px;
  text-align: left;
`;

// Title placed outside the upload box
const Title = styled.h2`
  font-family: Rubik, sans-serif;
  font-weight: medium;
  margin-top: ${({ variant }) =>
    variant === "small" ? "5px" : "10px"}; /* FIXED */
  margin-bottom: ${({ variant }) =>
    variant === "small" ? "5px" : "10px"}; /* FIXED */
  font-size: ${({ variant }) =>
    variant === "small" ? "18px" : "24px"}; /* FIXED */
`;

// White upload box container
const UploadBox = styled.div`
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: ${({ variant }) =>
    variant === "small"
      ? "250px"
      : "465px"}; /* FIXED: For small variant, width is 250px */
  background-color: white;
  padding: ${({ variant }) =>
    variant === "small"
      ? "10px"
      : "20px"}; /* FIXED: Reduced padding for small variant */
  margin-top: 10px;
  /* FIXED: Reduced height for small variant from '150px' to '80px' to make it shorter */
  height: ${({ variant }) => (variant === "small" ? "130px" : "400px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Drag and drop area with a grey background
const DragArea = styled.div`
  border: 2px dashed #ccc;
  padding: ${({ variant }) =>
    variant === "small" ? "10px" : "20px"}; /* FIXED */
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  background-color: #f0f0f0; /* corrected color */
  flex: ${({ variant }) => (variant === "small" ? "0" : "1")};
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
`;

// Image styling
const DropImage = styled.img`
  width: ${({ variant }) =>
    variant === "small" ? "40px" : "60px"}; /* FIXED */
  height: ${({ variant }) =>
    variant === "small" ? "40px" : "60px"}; /* FIXED */
  margin-bottom: 0px;
`;

// Paragraph styling
const Paragraph = styled.p`
  font-family: sans-serif;
  margin-bottom: ${({ variant }) =>
    variant === "small" ? "5px" : "10px"}; /* FIXED */
  font-size: ${({ variant }) =>
    variant === "small" ? "10px" : "14px"}; /* FIXED */
`;

// Button group container
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: ${({ variant }) =>
    variant === "small" ? "10px" : "20px"}; /* FIXED */
  color: #fff;
`;

// Confirm and Cancel button styles
const ConfirmButton = styled.button`
  background-color: #000;
  color: white;
  height: ${({ variant }) =>
    variant === "small" ? "35px" : "40px"}; /* FIXED */
  width: ${({ variant }) =>
    variant === "small" ? "100px" : "120px"}; /* FIXED */
  border-radius: 20px;
  margin-right: 20px;

  text-align: center;
  font-family: Montserrat;
  font-size: ${({ variant }) =>
    variant === "small" ? "14px" : "16px"}; /* FIXED */
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
  height: ${({ variant }) =>
    variant === "small" ? "35px" : "40px"}; /* FIXED */
  width: ${({ variant }) =>
    variant === "small" ? "100px" : "120px"}; /* FIXED */
  border-radius: 20px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  text-align: center;
  font-family: Montserrat;
  font-size: ${({ variant }) =>
    variant === "small" ? "14px" : "16px"}; /* FIXED */
  font-style: normal;
  font-weight: 600;
`;

function Upload({ bucket, variant, title }) {
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

  // Reset drag state when the component unmounts)

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("files", file);
    formData.append("bucket", bucket); // Append the bucket name to FormData
    try {
      const endpoint =
        typeof variant === "string" && variant === "small"
          ? "/upload-model"
          : "/upload-multiple";
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${endpoint}`, // Use the correct endpoint based on the bucket
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const data = await response.json();
      setFile(null);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
      setFile(null);
      return;
    }
  };
  useEffect(() => {}, [file]);

  return (
    <Container variant={variant}>
      {/* Header moved outside of the white upload box */}
      <Title variant={variant}>{title || "DROP YOUR CLOTHES HERE"}</Title>

      <UploadBox variant={variant}>
        <DragArea
          variant={variant}
          className={`upload-container ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <DropImage variant={variant} src={drop} alt="Drop here" />
          <Paragraph variant={variant}>
            Drag and drop your photo here, or click to browse. (jpg, jpeg, heic,
            png)
          </Paragraph>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            style={{ cursor: "pointer", color: "blue" }}
          >
            Browse
          </label>
        </DragArea>
      </UploadBox>

      {file && (
        <div style={{ marginTop: variant === "small" ? "10px" : "20px" }}>
          <p>Selected File: {file.name}</p>
        </div>
      )}

      <ButtonGroup variant={variant}>
        <ConfirmButton variant={variant} onClick={handleUpload}>
          Upload
        </ConfirmButton>
        <CancelButton
          variant={variant}
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
