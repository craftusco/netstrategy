import { centerContent } from "@/styles/mixins";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

export default function CaseStudyLogoDesignV2({
  mt,
  title,
  paragraph,
  imageBig,
  imageSmall,
}) {
  //! COMPONENT
  return (
    <Container mt={mt} id="logoDesign">
      {/* Side */}
      <RightSide>
        <h2>{title}</h2>
        <p>{paragraph}</p>
        <ImageContainerSmall>
          <Image
            priority={true}
            src={imageSmall}
            alt="Caso di successo - Logo Design"
            fill
            sizes="100%"
            quality={100}
          />
        </ImageContainerSmall>
      </RightSide>
      {/* Image */}
      <LeftSide>
        <ImageContainerBig>
          <Image
            priority={true}
            src={imageBig}
            alt="Caso di successo - Logo Design"
            fill
            sizes="100%"
            quality={100}
          />
        </ImageContainerBig>
      </LeftSide>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media (min-width: 1000px) {
    flex-direction: row-reverse;
    align-items: center;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
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
    margin-top: 1.5rem;
  }

  @media (min-width: 1000px) {
    width: 50%;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    width: 50%;
  }
`;

// Images
const ImageContainerSmall = styled.div`
  overflow: hidden;
  position: relative;
  margin-inline: auto;
  width: 100%;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const ImageContainerBig = styled.div`
  overflow: hidden;
  position: relative;
  width: 85%;
  margin-inline: auto;
  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1000px) {
    margin-left: 0;
  }
`;
