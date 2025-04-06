import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #b7e6c1; /* Mint color */
  width: 100%;
  min-height: 30vh; /* or whatever height you want */
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h3`
  margin-right: 20px;
  color: #000;
  font-family: sans-serif;
  align-self: flex-start; /* Aligns the title to the left */
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 20px;
  align-self: flex-start;
`;

const StyleButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 14px;

  &:hover {
    background-color: #333; /* Slightly lighter black on hover */
  }
`;

const StartButton = styled.button`
  background-color: #ff9f47;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  cursor: pointer;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background-color: #f57c00; /* Darker orange on hover */
  }
`;

function StyleSelection() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const styles = ["formal", "casual", "athletic", "any"];
  const navigate = useNavigate();

  const handleStart = async () => {
      try {
          if (!selectedStyle) {
              setSelectedStyle("any"); // Reset the selected style if no style is selected
          }
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-rec`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ style: selectedStyle }),
        }
      );
      if (response.ok) {
          setSelectedStyle(""); // Reset the selected style after starting
          const outfitData = await response.json();
          console.log("Outfit data received:", outfitData);
        navigate("/outcome", { state: { outfits: outfitData } });
      }
    } catch (error) {
      console.error("Error during style selection:", error);
      alert("An error occurred while starting. Please try again.");
      return;
    } finally {
      // Optionally, you can reset the selected style here if needed
      setSelectedStyle("");
    }
  };

  const handleStyleChange = (style) => {
    if (selectedStyle === style) {
      setSelectedStyle("");
      return;
    }
    setSelectedStyle(style);
  };

  return (
    <Container>
      <Title>Choose your desired style</Title>

      <ButtonGroup>
        {styles.map((style) => (
          <StyleButton
            key={style}
            onClick={() => handleStyleChange(style)}
            style={
              selectedStyle === style
                ? { backgroundColor: "#5c53a0", color: "#fff" }
                : {}
            }
          >
            {style}
          </StyleButton>
        ))}
      </ButtonGroup>

      <StartButton onClick={handleStart}>START</StartButton>
    </Container>
  );
}

export default StyleSelection;
