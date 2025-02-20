import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function CaseStudyIconography({ mt, title, paragraph, image }) {
  //! COMPONENT
  return (
    <Container mt={mt} >
      <Text>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </Text>
      {/* Image */}
      <ImageContainer>
        <Image priority={true} src={image} alt={`Caso di successo ${title} Iconography`} fill sizes="100%" />
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

const Text = styled.div`
  ${centerContent}

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
    margin-top: 2rem;
    max-width: 45rem;
  }
`;

// Image
const ImageContainer = styled.div`
  /* height: clamp(21rem, calc(7.89rem + 55.92vw), 75rem); */
  position: relative;
  margin-top: 4rem;
  overflow: hidden;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;

    @media (max-width: 768px) {
      transform: scale(1.3);
    }
  }
`;
