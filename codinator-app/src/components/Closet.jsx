import React, { useEffect, useState } from "react";
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
  width: 170px;
  
  text-align: center;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;

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
  height: 28px;            /* Increase height for better balance */
  padding: 0 12px;         /* Horizontal padding only */
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 600;
    border-radius: 5px; /* Rounded corners for the label */
  font-style: normal;
  ${({ color }) => `background-color: ${color};`}
`;
const CategoryTag = styled.div`
  position: absolute;
  top: 10px;
  
  left: -10px; /* negative left to push it out */
  background-color: ${({ color }) => color || "#333"};
  color: white;
  min-width: 87px;
  height: 14px;  
  font-family: Inter, sans-serif;
  font-size: 12px;
  text-align: left;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 2;
`;

const ItemsContainer = styled.div`
  background-color: #E8E8E8;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 60px;
  overflow-y: auto;
  max-height: 500px; /* Adjust as needed */
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto); /* 3 columns, adjust as needed */
  gap: 40px;
`;

const ClosetItem = styled.div`
  position: relative;
  width: 80%;
  aspect-ratio: 1;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: visible; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter, sans-serif;
  color: #999;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Closet() {
  /*
  const closetItems = [
    { category: "Outerwear", image: "https://via.placeholder.com/150", tagColor: "#C0392B" },
    { category: "Top", image: "https://via.placeholder.com/150", tagColor: "#4C9A2A" },
    { category: "Bottom", image: "https://via.placeholder.com/150", tagColor: "#2E266E" },
    { category: "Outerwear", image: "https://via.placeholder.com/150", tagColor: "#C0392B" },
    { category: "Top", image: "https://via.placeholder.com/150", tagColor: "#4C9A2A" },
    { category: "Bottom", image: "https://via.placeholder.com/150", tagColor: "#2E266E" },
  ];
  */
  const [closetItems, setClosetItems] = useState([]);

  useEffect(() => {
    async function fetchClosetItems() {
      const categories = ["Tops", "Bottoms", "Outerwear"];
      try {
        // Fetch items for each category from your backend
        const fetchPromises = categories.map((category) =>
          fetch(
            `${process.env.REACT_APP_BACKEND_URL}/get-clothing-items?category=${category}`
          ).then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch items for ${category}`);
            }
            return res.json();
          })
        );
        const results = await Promise.all(fetchPromises);
        // Flatten the array of arrays into one array
        const combinedItems = results.flat();
        console.log("Fetched closet items:", combinedItems);
        setClosetItems(combinedItems);
      } catch (error) {
        console.error("Error fetching closet items:", error);
      }
    }
    fetchClosetItems();
  }, []);


  // Helper function to determine tag color based on the image type.
  const getTagColor = (type) => {
    if (type === "Outerwear") return "#C0392B";
    if (type === "Tops") return "#4C9A2A";
    if (type === "Bottoms") return "#2E266E";
    return "#333";
  };


  return (
    <ClosetContainer>
      
      <HeaderRow>
        <Title>YOUR CLOSET</Title>
        
      </HeaderRow>

      
      <CategoryRow>
        <CategoryLabel color="#C0392B">Outerwear</CategoryLabel>
        <CategoryLabel color="#4C9A2A">Top</CategoryLabel>
        <CategoryLabel color="#2E266E">Bottom</CategoryLabel>
      </CategoryRow>

      
      
      <ItemsContainer>
        <ItemsGrid>
          {closetItems.map((item, index) => (
              <ClosetItem key={index}>
                <CategoryTag color={getTagColor(item.types)}>{item.types}</CategoryTag>
                <img src={item.image_url} alt={item.types} />
              </ClosetItem>
            ))}
        </ItemsGrid>
      </ItemsContainer>
    </ClosetContainer>
  );
}
/*Need to edit Item container to take in image, and have appropriate tags  */
export default Closet;
