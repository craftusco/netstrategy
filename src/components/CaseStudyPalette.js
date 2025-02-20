import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function CaseStudyPalette({
  title,
  paragraph,
  img,
  mt,
  version,
}) {
  //! COMPONENT
  return (
    <Container mt={mt} version="V1" >
      {/* Text */}
      <Text version="V1">
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </Text>
      {/* Image */}
      <ImageContainer>
        <Image src={img} alt="Caso di successo - Palette" fill sizes="100%" quality={100} priority={true} />
      </ImageContainer>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  @media (min-width: 1000px) {
    flex-direction: ${(props) =>
      props.version === "V1" ? "row-reverse" : "row"};
    row-gap: 0;
    justify-content: center;
    column-gap: 5%;
  }
`;

// Text
const Text = styled.div`
  display: ${(props) => (props.version === "V1" ? "unset" : "flex")};
  flex-direction: ${(props) => (props.version === "V1" ? "unset" : "column")};
  justify-content: ${(props) =>
    props.version === "V1" ? "unset" : "space-between"};

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
  }

  @media (min-width: 1000px) {
    width: 50%;

    p {
      width: 80%;
    }
  }
`;

// Image
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;

  img {
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1000px) {
    width: 40%;
  }
`;
