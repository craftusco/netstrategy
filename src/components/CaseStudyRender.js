import { centerContent } from "@/styles/mixins";
import React from "react";
import styled from "styled-components";

export default function CaseStudyRender({
  title,
  video,
  paragraph,
  mt,
}) {
  //! COMPONENT
  return (
    <Container mt={mt} version="V1" >
      {/* Text */}
      <Text >
        <h2>{title}</h2>
      </Text>
      {/* Image */}
      <ImageContainer>
        <video preload="auto" autoPlay muted playsInline loop>
          <source src={video} />
        </video>
      </ImageContainer>
      <Description>
        <div>
          {paragraph}
        </div>
      </Description>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent};
  row-gap: 2rem;

  @media (min-width: 1000px) {
    column-gap: 5%;
  }
`;

// Text
const Text = styled.div`

  h2 {
    color: ${({ theme: { colors } }) => colors.greyColorV2};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    text-align: center;
    span {
      display: block;
    }
  }

  p {
    margin-top: clamp(1.5rem, calc(0.89rem + 2.59vw), 4rem);
  }

 
`;

// Image
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  margin-top: 30px;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

`;

const Description = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: ${({ theme: { fonts } }) => fonts.main};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
  line-height: 1.4;
  margin-top: 40px;

  @media (min-width: 1000px) {
    margin-top: 80px;
    > div{
      width: 500px;
    }
  }
`
