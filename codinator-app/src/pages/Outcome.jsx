import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling
import { useLocation } from "react-router-dom";
import Upload from "../components/Upload";

import "@fontsource/montserrat/700.css"; // Montserrat for headers
import "@fontsource/rubik"; // Rubik
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
  text-align: left;
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
  width: 350px;
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
  transform: scale(0.7); /* shrink to 80% */
  transform-origin: top right; /* anchor the scale to top-right corner */
  margin-right: 60px;
`;
/*
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
  background-color: #ccc; 
`;

const FitBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: #ccc; 
`;

const Header = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif; 
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
  flex-direction: column; /
`;

const FitBoxContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  
  flex-direction: column; /
`;

const RetryButton = styled.button`
  background-color: #ff9f47; 
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    background-color: #f57c00; 
  }
`;

const FitButton = styled.button`
  background-color: #2E266E; 
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    
    &:hover {
        background-color: #5C53A0; 
    `;
*/

function Outcome() {
    
  const [modelUrl, setModelUrl] = useState(""); // State to hold the model URL if needed
  const location = useLocation();
    const [modelUploaded, setModelUploaded] = useState(false);
    const [ohNo, setOhNo] = useState(""); // State to track if the model upload failed

  const { outfits } = location.state || {};
    console.log(outfits);
    useEffect(() => {
      setModelUrl(outfits ? outfits["final_codi"] : ""); // Set the model URL from the outfits prop
    // console.log("Recommended Outfit:", outfits);
  }, []);
  useEffect(() => {
    if (modelUploaded) { // When upload is successful
      // FIX: Wait 5 seconds before calling handleTryOn
      const timer = setTimeout(() => {
        handleTryOn();
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timer if component unmounts or modelUploaded changes
    }
  }, [modelUploaded]);

  const handleRetry = () => {
    // Your logic for re-running the outfit recommendation
    console.log("Retrying outfit recommendation...");
  };

  // Example: function for the “I WANT TO TRY IT ON” button
  const handleTryOn = async () => {
    // Helper function to call the /wear-clothes endpoint
    const fetchWearClothes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wear-clothes`, {
          method: "POST",
          // You can include additional request data here if needed
        });
        if (!response.ok) {
          throw new Error("Failed to process wear-clothes endpoint");
        }
        const data = await response.json();
        console.log("Wear clothes response:", data);
        setModelUrl(data.final_codi); // Update the model URL state with the dressed image
      } catch (error) {
        console.error("Error calling wear-clothes:", error);
        alert("Error trying on clothes. Please try again.");
      }
    };
  setTimeout(() => {
    fetchWearClothes();
  }, 5000);
    // FIX: If the user has uploaded a model picture, wait 5 seconds before fetching.
    // if (modelUploaded) {
    //   setTimeout(() => {
    //     fetchWearClothes();
    //   }, 5000);
    // } else {
    //   // If no upload, call immediately (backend should return mannequin result)
    //   //fetchWearClothes();
    //   console.log("No model picture uploaded, using default mannequin image.");
    //   setModelUrl(outfits["final_codi"]);  
    // }
  };

  return (
    <PageContainer>
      <LeftColumn>
        <RecommendedTitle>
          {" "}
          YOUR RECOMMENDED OUTFIT FOR TODAY IS...
        </RecommendedTitle>

        {/* The FitButton can be used to trigger the try-on functionality */}
        {/* You can add an onClick handler to FitButton to implement the try-on feature */}
        {/* For now, it's just a placeholder */}
        <OutfitContainer>
          {/* You can map over an array if you have multiple items in recommendedOutfit */}
          <OutfitBox>
            {outfits ? (
              <img
                src={outfits["image_url-top"]}
                alt={"Top Outfit"}
                style={{ width: "100%", height: "100%", borderRadius: "6px" }}
              />
            ) : (
              <p>No outfit available</p>
            )}
          </OutfitBox>

          <OutfitBox>
            {outfits ? (
              <img
                src={outfits["image_url-bottom"]}
                alt={"Bottom Outfit"}
                style={{ width: "100%", height: "100%", borderRadius: "6px" }}
              />
            ) : (
              <p>No outfit available</p>
            )}
          </OutfitBox>
        </OutfitContainer>

        <TryAgainButton onClick={handleRetry}>Try Again!</TryAgainButton>
      </LeftColumn>
      <RightColumn>
        {/* Green area with the Upload component */}
        <GreenContainer>
          <TextContainer>
            <RightTitle>TRY ON THE CLOTHES</RightTitle>
            <GreenText>
              <p style={{ margin: 0 }}>
                If you have not uploaded your picture of yourself, a mannequin
                would be used for your clothes.
              </p>
              <p style={{ margin: 0 }}>
                If you have uploaded your photo, just press "I WANT TO TRY IT
                ON"
              </p>
            </GreenText>
          </TextContainer>
          {/* You can display instructions or heading here */}
          <GreenUpload>
            <Upload
              bucket="models"
              variant="small"
              title="DROP YOUR PICTURE HERE"
              onUploadSuccess={(url) => {
                setModelUrl(url);
                setModelUploaded(true); // Mark that the model has been uploaded
              }}
            />
          </GreenUpload>
        </GreenContainer>

        {/* Larger gray area for model preview */}
        <ModelContainer>
          {modelUrl ? (
            <img
              src={modelUrl}
              alt={"Sample Fit"}
              style={{ width: "100%", height: "100%", borderRadius: "6px" }}
            ></img>
          ) : null}
        </ModelContainer>

        {/* Possibly display an image or 3D model here */}

        {/* Button at the bottom for "I WANT TO TRY IT ON" */}
        <TryOnButton onClick={handleTryOn}>I WANT TO TRY IT ON</TryOnButton>
      </RightColumn>
    </PageContainer>
  );
}

export default Outcome;
