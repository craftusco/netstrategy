import { centerContent } from "@/styles/mixins";
import getPath from "@/utils/getPath";
import Image from "next/image";
import React, { useEffect } from "react";
import styled from "styled-components";

export default function CaseStudyTypography({ mt, title, fonts }) {
  //! COMPONENT
  return (
    <Container mt={mt}>
      <h2>{title}</h2>
      <Content>
        {fonts.map(({ immagine_desktop, immagine_mobile }, i) => (
          <Item key={i}>
            {/* Dekstop */}
            <ImageContainerDesktop>
              <Image
                priority={true}
                src={getPath(immagine_desktop.data.attributes.url)}
                alt={immagine_desktop?.data?.attributes?.alternativeText ? immagine_desktop?.data?.attributes?.alternativeText : "Caso di successo risultato tipografia scelta"}
                fill
                sizes="100%"
                quality={100}
              />
            </ImageContainerDesktop>
            {/* Mobile */}
            <ImageContainerMobile>
              <Image
                priority={true}
                src={getPath(immagine_mobile.data.attributes.url)}
                alt={immagine_mobile?.data?.attributes?.alternativeText ? immagine_mobile?.data?.attributes?.alternativeText : "Caso di successo risultato tipografia scelta"}
                fill
                sizes="100%"
                quality={100}
              />
            </ImageContainerMobile>
          </Item>
        ))}
      </Content>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  max-width: 120rem;
  margin-inline: auto;

  h2 {
    ${centerContent}
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
`;

const Content = styled.div`
  margin-top: 2rem;
`;

const Item = styled.div`
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const ImageContainerDesktop = styled.div`
  overflow: hidden;
  position: relative;
  display: none;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    display: block;
  }
`;

const ImageContainerMobile = styled.div`
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
