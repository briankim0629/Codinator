import React from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling

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

    const handleRetry = () => {
    }

    const handleTryFit = () => { }

  return (
    <Container>
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
