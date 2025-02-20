import React from "react";
import styled from "styled-components";
import RightArrow from "./RightArrow";

export default function ReadMoreButton() {
  return (
    <Container>
      <RightArrow />
      <span>Leggi di più</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: clamp(0.81rem, calc(0.69rem + 0.52vw), 1.31rem); // 13px → 21px
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-family: u.$medium;
  
  svg {
    width: clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem); // 32px → 40px
    stroke: ${({ theme: { colors } }) => colors.primaryColor};
    transition: all 350ms ease;
  }

  &:hover svg {
    transform: translateX(7px);
  }
`;
