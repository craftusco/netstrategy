import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function CaseStudySoftwareBranding({
  mt,
  title,
  p1,
  img1,
  p2,
  img2,
}) {
  //! COMPONENT
  return (
    <Container mt={mt} >
      <h2>{splitText(title)}</h2>
      <Item>
        <LeftSide>
          <p>{p1}</p>
        </LeftSide>
        {/* Image */}
        <RightSide>
          <ImageContainer>
            <Image
              src={img1}
              alt="Caso di successo - Branding"
              fill
              sizes="100%"
              quality={100}
              priority={true}
            />
          </ImageContainer>
        </RightSide>
      </Item>
      <Item>
        <LeftSide>
          <p>{p2}</p>
        </LeftSide>
        {/* Image */}
        <RightSide>
          <ImageContainer>
            <Image
              src={img2}
              alt="Caso di successo - Branding"
              fill
              sizes="100%"
              quality={100}
              priority={true}
            />
          </ImageContainer>
        </RightSide>
      </Item>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  h2 {
    color: ${({ theme: { colors } }) => colors.greyColorV2};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  p {
    max-width: 45rem;
  }
`;

const Item = styled.div`
  margin-top: 3rem;

  @media (min-width: 1000px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 3rem;
  }
`;

// Right
const LeftSide = styled.div`
  @media (min-width: 1000px) {
    width: 50%;
  }
`;

// Right
const RightSide = styled.div`
  @media (min-width: 1000px) {
    width: 50%;
  }
`;

// Image
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
