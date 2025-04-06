import React, { useState } from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling
import { useLocation } from "react-router";
import Upload from "../components/Upload";

<<<<<<< HEAD
=======

import "@fontsource/montserrat/700.css"; // Montserrat for headers
import "@fontsource/rubik";              // Rubik
import "@fontsource/inter";    

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fff;
`;

// Left column (Recommended Outfit)
const LeftColumn = styled.div`
  flex: 5;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

// Right column (Try-on Section)
const RightColumn = styled.div`
  flex: 7;
  display: flex;
  /* FIX #2A: Center children horizontally */
  align-items: center; 
  flex-direction: column;
  box-sizing: border-box;
  background-color: #f8f8f8;
`;

// Title for recommended outfit
const RecommendedTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  color: #000;
  margin-bottom: 40px;
  margin-left: 60px;
`;

// Container holding the three stacked boxes
/*
const OutfitBoxes = styled.div`
  width: 280px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px; 
  margin-bottom: 20px;
`;
*/
const OutfitContainer = styled.div`

  width: 600px; 
  background-color: #f0f0f0;
  margin-left: 60px;
  margin-right: 60px;
  border-radius: 8px;
  /* FIX #1A: Increase padding for more space around edges */
  padding: 40px; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* FIX #1B: Increase gap for more space between boxes */
  gap: 40px; 
  margin-bottom: 20px;
`;

// Each recommended item box
const OutfitBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

// “Try Again” button
const TryAgainButton = styled.button`
  background-color: #2e266e;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: 60px;
  margin-top: 20px; /* pushes button to bottom if needed */

  &:hover {
    background-color: #5c53a0;
  }
`;

const RightTitle = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  color: #000;
  text-align: left;
  margin: 40px 60px 10px 60px;
`;
const GreenContainer = styled.div`
  width: 100%;
  height: 30%;
  background-color: #c4d6c3;
  margin: 0 auto;
  padding: 20px;
 
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: space-between;
`;

// Left side text in green container
const GreenText = styled.div`
  flex: 1;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  text-align: left;
  margin-left: 60px;
  color: #000;
  margin-right: 20px;
`;

// Right side upload in green container
const GreenUpload = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 60px;
`;

const TextContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  box-sizing: border-box;

`;
/*
// Top area on the right side for “Try on the clothes”
const TryOnHeader = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 24px;
  color: #000;
  margin: 40px 60px 20px 60px;
`;

// Green container for the upload area
const UploadSection = styled.div`
  background-color: #c4d6c3; 
  margin: 0 60px; 
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

// Larger gray box for the model preview
const ModelSection = styled.div`
  flex: 1;
  background-color: #ccc;
  margin: 20px 60px;
  border-radius: 8px;
`;
*/
// Larger gray box for model preview
const ModelContainer = styled.div`
  /* FIX #2B: Make it taller and center it horizontally */
  width: 60%;
  height: 500px; /* increased from 300px */
  background-color: #ccc;
  margin: 20px 60px;
  border-radius: 8px;
  height: 300px; /* Adjust as needed */
`;


// “I WANT TO TRY IT ON” button at the bottom of the right column
const TryOnButton = styled.button`
  background-color: #ff9f47; 
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin: 20px auto;
  align-self: flex-start;

  &:hover {
    background-color: #f57c00;
  }
`;
const SmallUploadContainer = styled.div`
  transform: scale(0.7);       /* shrink to 80% */
  transform-origin: top right; /* anchor the scale to top-right corner */
  margin-right: 60px;
`;
/*
>>>>>>> c7c255003587bbc3831f567face48e288bb2c530
const Container = styled.div`
  background-color: #e8e8e8;
  width: 100vw;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecommendBox = styled.div`
  width: 300px;
  height: 400px;
  background-color: #ccc; /* Gray */
`;

const FitBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: #ccc; /* Gray */
`;

const Header = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif; /* Using Montserrat font for the header */
`;

const BoxesContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const RecommendBoxContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Stack the header and box vertically */
`;

const FitBoxContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  
  flex-direction: column; /* Stack the header and box vertically */
`;

const RetryButton = styled.button`
  background-color: #ff9f47; /* Orange color */
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #f57c00; /* Darker orange on hover */
  }
`;

const FitButton = styled.button`
  background-color: #2E266E; /* Navy-ish color */
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    
    &:hover {
        background-color: #5C53A0; /* Lighter navy on hover */
    }
    `;

function Outcome() {

    const location = useLocation();
    const [modelUrl, setModelUrl] = useState(""); // State to hold the model URL if needed
    const { recommendedOutfit } = location.state || {}; // Get the recommended outfit from the state

    const handleRetry = () => {
    }

    const handleTryFit = () => { }

  return (
      <Container>
          <Upload bucket={"models"} /> {/* Keep the Upload component for uploading new outfits */}
      <BoxesContainer>
        <RecommendBoxContainer>
          <Header>YOUR RECOMMENDED OUTFIT FOR TODAY IS...</Header>

          {/* The FitButton can be used to trigger the try-on functionality */}
          {/* You can add an onClick handler to FitButton to implement the try-on feature */}
          {/* For now, it's just a placeholder */}
          <RecommendBox></RecommendBox>
          <RetryButton onClick={handleRetry}>Try Again!</RetryButton>
        </RecommendBoxContainer>
        <FitBoxContainer>
          <Header>Test the Fit!</Header>

          <FitBox />
          <FitButton onClick={handleTryFit}>See Fit</FitButton>
        </FitBoxContainer>
      </BoxesContainer>
    </Container>
  );
}

export default Outcome;
