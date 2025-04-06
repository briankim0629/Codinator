import React from "react";
import styled from "styled-components";

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

const SmallBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: #ccc; /* Gray */
`;

const Header = styled.h1`
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
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

function Outcome() {
  return (
    <Container>
      <BoxesContainer>
        <RecommendBoxContainer>
          <Header>YOUR RECOMMENDED OUTFIT FOR TODAY IS...</Header>

          <RecommendBox></RecommendBox>
        </RecommendBoxContainer>
        <SmallBox />
      </BoxesContainer>
    </Container>
  );
}

export default Outcome;
