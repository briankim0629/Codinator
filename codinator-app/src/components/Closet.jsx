import React from "react";
import styled from "styled-components";
import "@fontsource/montserrat/700.css"; // Importing Montserrat font


const ClosetContainer = styled.div`
  flex: 1;
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
`;

const ClosetHeading = styled.h3`

  font-family: 'Montserrat', sans-serif;
  color: blue;
  `



function Closet ({ items })  {
  return (
    <div className="closet-container">
      <ClosetHeading>YOUR CLOSET</ClosetHeading>
      <ClosetContainer>
        {items && items.map((item, index) => (
          <div className="closet-item" key={index}>
            {item ? (
              <img src={item} alt={`Closet Item ${index}`} />
            ) : (
              <div className="placeholder">Empty</div>
            )}
          </div>
        ))}
      </ClosetContainer>
    </div>
  );
};

export default Closet;
