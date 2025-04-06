import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { createClient } from "@supabase/supabase-js";

import "@fontsource/montserrat/700.css"; // Importing Montserrat font for styling
import "@fontsource/rubik"; // Importing Rubik font for bold text
import "@fontsource/inter"; // Importing Lato font for category labels

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
  margin-left: -30px;
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
  overflow: hidden; 
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
    // Replace with your actual backend endpoint URL that returns the closet items.
    async function fetchImages() {
      const { data, error } = await supabase
        .from("image_text")
        .select("*");
      if (error) {
        console.error("Error fetching images:", error);
      } else {
        console.log("Fetched images from Supabase:", data);
        setClosetItems(data);
      }
    }
    fetchImages();
  }, []);

  // Helper function to determine tag color based on the image type.
  const getTagColor = (type) => {
    if (type === "Outerwear") return "#C0392B";
    if (type === "Top") return "#4C9A2A";
    if (type === "Bottom") return "#2E266E";
    return "#333";
  };


  return (
    <ClosetContainer>
      
      <HeaderRow>
        <Title>YOUR CLOSET</Title>
        <EditButton>Edit Closet</EditButton>
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
