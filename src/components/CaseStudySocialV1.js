import { centerContent } from "@/styles/mixins";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gsap } from "gsap";

export default function CaseStudySocialV1({
  mt,
  title,
  paragraph,
  image,
  images,
}) {
  //! REFS
  const imageContainerRef = useRef();
  const containerRef = useRef();

  //! CETNER GRID IMAGES
  useEffect(() => {
    let caseStudySocialCtx = gsap.context(() => {
      gsap.set(imageContainerRef.current, { scrollLeft: "200" });
    }, containerRef.current);
    return () => caseStudySocialCtx.revert();
  });

  //! COMPONENT
  return (
    <Container mt={mt}  ref={containerRef}>
      <Title>
        <h2>{title}</h2>
      </Title>
      {/* Images */}
      <ImageContainer>
        <Image priority={true} src={image} alt="Caso di successo - Social" fill sizes="100%" quality={100}/>
        {/* Text mobile */}
        <TextDesktop>
          <p>{paragraph}</p>
        </TextDesktop>
      </ImageContainer>
      {/* Text mobile */}
      <TextMobile>
        <p>{paragraph}</p>
      </TextMobile>
      {/* Images grid */}
      <Grid ref={imageContainerRef}>
        {images.map((e, i) => (
          <ImageGridContainer key={i}>
            <Image priority={true} src={e} alt="Caso di successo - Social" fill sizes="100%" quality={100}/>
          </ImageGridContainer>
        ))}
      </Grid>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  max-width: 120rem;
  margin-inline: auto;
`;

const Title = styled.div`
  ${centerContent}
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

  @media (min-width: 768px) {
    h2 {
      text-align: left;
    }
  }
`;

// Text mobile
const TextMobile = styled.div`
  ${centerContent}
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

// Text mobile
const TextDesktop = styled.div`
  position: absolute;
  bottom: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  color: white;
  max-width: 30rem;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

// Image big
const ImageContainer = styled.div`
  margin-top: 1.5rem;
  overflow: hidden;
  position: relative;
  /* height: clamp(35rem, calc(27.23rem + 33.14vw), 67rem); */
  border-radius: 1.5rem 1.5rem 0 0;
  margin-left: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem);
  margin-right: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem);

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Grid
const Grid = styled.div`
  ${centerContent}
  margin-top: clamp(1.5rem, calc(0.65rem + 3.62vw), 5rem);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  overflow-x: scroll;
`;

// Grid images
const ImageGridContainer = styled.div`
  overflow: hidden;
  position: relative;
  min-width: 15rem;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
