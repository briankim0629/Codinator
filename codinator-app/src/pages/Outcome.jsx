import React from "react";
import styled from "styled-components";

// Container with a white background
const Container = styled.div`
  background-color: #fff;
  width: 100vw;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Larger gray box
const BigBox = styled.div`
  width: 300px;
  height: 400px;
  background-color: #ccc; /* Gray */
`;

// Smaller gray box
const SmallBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: #ccc; /* Gray */
`;

const Header = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 40px;
  text-align: center;
`;

const BoxesContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

function Outcome() {
  return (
    <Container>
      <Header>YOUR RECOMMENDED OUTFIT FOR TODAY IS...</Header>
      <BoxesContainer>
        <BigBox />
        <SmallBox />
      </BoxesContainer>
    </Container>
  );
}

export default Outcome;
