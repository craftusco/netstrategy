import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

var defaultColors = {
  title: "#525252",
  description: "#fff",
  background: "#000",
};

export default function CaseStudyLogoDesignV1({
  mt,
  title,
  paragraph,
  imageD,
  imageM,
  colorSettings = defaultColors,
  mobileImageSize = "20rem",
}) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  colorSettings = Object.entries(colorSettings).reduce((acc, [key, value]) => {
    if (typeof value === "string" && hexRegex.test(value)) {
      acc[key] = value;
    } else {
      acc[key] = defaultColors[key];
    }
    return acc;
  }, {});
  //! COMPONENT
  return (
    <Container mt={mt}>
      <Content bgCol={colorSettings.background}>
        {/* Text */}
        <Text
          titleColor={colorSettings.title}
          descriptionColor={colorSettings.description}
        >
          <h2>{title}</h2>
          <p>{paragraph}</p>
        </Text>
        {/* Image Desktop */}
        <ImageContainerDesktop>
          <Image
            priority={true}
            src={imageD}
            alt="Caso di successo - Logo Design"
            fill
            sizes="100%"
            quality={100}
          />
        </ImageContainerDesktop>
        {/* Image Mobile */}
        <ImageContainerMobile mobileImageSize={mobileImageSize}>
          <Image
            priority={true}
            src={imageM}
            alt="Caso di successo - Logo Design"
            fill
            sizes="100%"
            quality={100}
          />
        </ImageContainerMobile>
      </Content>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  padding-left: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  padding-right: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  max-width: 120rem;
  margin-inline: auto;
`;

const Content = styled.div`
  background: ${(props) => props.bgCol};
  border-radius: 1.25rem;
  padding-top: clamp(4rem, calc(3.51rem + 2.07vw), 6rem);
  padding-bottom: clamp(6rem, calc(5.27rem + 3.11vw), 9rem);
`;

// Text
const Text = styled.div`
  padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  h2 {
    color: ${(props) => props.titleColor};
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
    color: ${(props) => props.descriptionColor};
    max-width: 35rem;
  }

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    row-gap: 0;
    column-gap: 2rem;
  }
`;

// Image Desktop
const ImageContainerDesktop = styled.div`
  overflow: hidden;
  position: relative;
  margin-top: 8rem;
  width: clamp(40rem, calc(1.33rem + 80.56vw), 98rem);

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Image Mobile
const ImageContainerMobile = styled.div`
  overflow: hidden;
  position: relative;
  margin-top: 3rem;
  display: none;
  max-width: ${(props) => props.mobileImageSize};
  margin-inline: auto;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;
