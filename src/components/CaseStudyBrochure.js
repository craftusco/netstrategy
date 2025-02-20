import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function CaseStudyBrochure({ title, paragraph, img, mt }) {

  //! COMPONENT
  return (
    <Container mt={mt} >
      <Title>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </Title>
      <ImageContainer>
        <Image src={img} alt="Caso di successo Palette" fill sizes="100%" quality={100} priority={true}/>
      </ImageContainer>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  max-width: 120rem;
  margin-inline: auto;
`;

// Title
const Title = styled.div`
  ${centerContent}
  position: relative;
  z-index: 100;
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
    margin-top: clamp(1.5rem, calc(0.89rem + 2.59vw), 4rem);
    max-width: 28rem;
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
    min-width: 35rem;
    height: 100%;
    display: block;
  }

  @media (min-width: 670px) {
    margin-top: calc(clamp(2rem, calc(0.14rem + 5.12vw), 6rem) * -1);
  }
`;
