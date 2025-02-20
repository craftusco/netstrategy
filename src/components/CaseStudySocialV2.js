import { centerContent } from "@/styles/mixins";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export default function CaseStudySocialV2({
  mt,
  title,
  paragraph,
  image,
  titleColor = "grey",
}) {
  //! COMPONENT
  return (
    <Container mt={mt}>
      <Text titleColor={titleColor}>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </Text>
      {/* Images */}
      <ImageContainer>
        {image.includes(".mp4") ? (
          <video>
            <source src={image}></source>
          </video>
        ) : (
          <Image
            priority={true}
            src={image}
            alt="Caso di successo - Social"
            fill
            sizes="100%"
          />
        )}
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

// Text
const Text = styled.div`
  ${centerContent}
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  h2 {
    color: ${({ titleColor, theme: { colors } }) =>
      titleColor === "red" ? colors.primaryColor : colors.greyColorV2};
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

  @media (min-width: 1000px) {
    flex-direction: row;
    row-gap: 0;
    column-gap: 5rem;
    align-items: center;
  }
`;

// Image
const ImageContainer = styled.div`
  margin-top: 1.5rem;
  position: relative;
  /* height: clamp(27rem, calc(15.35rem + 49.71vw), 75rem); */

  img {
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
  video {
    width: 100%;
  }
`;
