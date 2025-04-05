import React from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling
import "@fontsource/rubik"; // Importing Rubik font for bold text
import "@fontsource/inter"; // Importing Lato font for category labels

const ClosetContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 40px;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h2`
  color: #2d2f92; 
  margin: 0;
  font-size: 40px;
  font-family: "Montserrat", sans-serif;
  color: var(--Blue, #2E266E);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
`;

const EditButton = styled.button`
  background-color: #2E266E; /* Same navy-ish color */
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-family: Rubik;

  &:hover {
    background-color: #5C53A0; /* Lighter hover color */
  }
`;

const CategoryRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryLabel = styled.span`
  display: flex;
  align-items: center;     /* Vertically centers the text */
  justify-content: flex-start;  /* Align text to the left */
  min-width: 87px;
  height: 32px;            /* Increase height for better balance */
  padding: 0 12px;         /* Horizontal padding only */
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  ${({ color }) => `background-color: ${color};`}
`;
const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  left: -10px; /* negative left to push it out */
  background-color: ${({ color }) => color || "#333"};
  color: white;
  font-family: Inter, sans-serif;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 2;
`;

const ItemsContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  max-height: 400px; /* Adjust as needed */
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns, adjust as needed */
  gap: 20px;
`;

const ClosetItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter, sans-serif;
  color: #999;
`;

function Closet() {
  return (
    <ClosetContainer>
      
      <HeaderRow>
        <Title>YOUR CLOSET</Title>
        <EditButton>Edit Closet</EditButton>
      </HeaderRow>

      
      <CategoryRow>
        <CategoryLabel color="#C0392B">Outerwear</CategoryLabel>
        <CategoryLabel color="#4C9A2A">Top</CategoryLabel>
        <CategoryLabel color="#2d2f92">Bottom</CategoryLabel>
      </CategoryRow>

      
      
      <ItemsContainer>
        <ItemsGrid>
          <ClosetItem>Outerwear</ClosetItem>
          <ClosetItem>Top</ClosetItem>
          <ClosetItem>Bottom</ClosetItem>
          <ClosetItem>Outerwear</ClosetItem>
          <ClosetItem>Top</ClosetItem>
          <ClosetItem>Bottom</ClosetItem>
        </ItemsGrid>
      </ItemsContainer>
    </ClosetContainer>
  );
}
/*Need to edit Item container to take in image, and have appropriate tags  */
export default Closet;
