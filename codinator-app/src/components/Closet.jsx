import React from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling
import "@fontsource/rubik"; // Importing Rubik font for bold text
import "@fontsource/inter"; // Importing Lato font for category labels

const ClosetContainer = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 0px;
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
  display: inline-block;
  width: 87px;
  height: 21px;
  flex-shrink: 0;
  padding: 5px 10px;
  color: #fff;
  font-family: Inter, sans-serif; /* Using Inter font for category labels */
  font-size: 14px;
  font-weight: 600;
  ${({ color }) => `
    background-color: ${color};
  `}
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
  width: 100%;
  aspect-ratio: 1; /* Keeps the square shape; works in modern browsers */
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  font-family: Inter, sans-serif; /* Using Inter font for category labels */

  justify-content: center;
  align-items: center;
  text-align: left;
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
