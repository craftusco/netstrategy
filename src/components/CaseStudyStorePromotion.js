import { centerContent } from "@/styles/mixins";
import React from "react";
import styled from "styled-components";
import FullImage from "./FullImage";
import Image from "next/image";
import getPath from "@/utils/getPath";

export default function CaseStudyStorePromotion({ mt, title, data }) {
  if (!data) return <></>;
  //! COMPONENT
  return (
    <Container mt={mt}>
      <h2>{title}</h2>
      {/* Video */}
      <MainVideoContainer>
        <video preload="auto" autoPlay muted playsInline loop>
          <source src={getPath(data.video_1.data.attributes.url)} />
        </video>
      </MainVideoContainer>
      <p>{data.paragrafo_1}</p>
      {/* Images */}
      <FullImage
        mt="0"
        data={data.immagine_1.data.attributes.url}
        altText={data.immagine_1.data?.attributes?.alternativeText}
        paddingInline={false}
      />
      <SecondImage>
        <img src={getPath(data.immagine_2.data.attributes.url)} alt={data.immagine_2.data?.attributes?.alternativeText ? data.immagine_2.data?.attributes?.alternativeText : "Esempio promozione in store"} />
      </SecondImage>
      {/* Last section video mobile */}
      <LastSection>
        <p>{data.paragrafo_2}</p>
        {/* Mobile */}
        <VideoMobileScrollable>
          <VideoContainerMobile>
            <video preload="auto" autoPlay muted playsInline loop>
              <source src={getPath(data.video_2_mobile.data.attributes.url)} />
            </video>
          </VideoContainerMobile>
        </VideoMobileScrollable>
        {/* Desktop */}
        <VideoContainerDesktop>
          <video preload="auto" autoPlay muted playsInline loop>
            <source src={getPath(data.video_2.data.attributes.url)} />
          </video>
        </VideoContainerDesktop>
      </LastSection>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  display: flex;
  flex-direction: column;
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

    span {
      display: block;
    }
  }

  & > p {
    ${centerContent}
    margin-top: clamp(2.00rem, calc(1.27rem + 3.11vw), 5.00rem);
    max-width: 45rem;
    margin-left: auto;
    margin-right: 0;
  }
`;

// Main video
const MainVideoContainer = styled.div`
  ${centerContent}
  overflow: hidden;
  position: relative;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Second image
const SecondImage = styled.div`
  margin-inline: auto;
  margin-top: 1.5rem;
  overflow: hidden;
  position: relative;
  ${centerContent}

  img {
    border-radius: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem);
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    margin-top: 5rem;
    margin-left: 0;
    margin-right: auto;
    padding-left: 0;
    max-width: 105rem;
    /* aspect-ratio: 16/9; */

    img {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

// Third section
const LastSection = styled.div`
  margin-top: clamp(2rem, calc(1.27rem + 3.11vw), 5rem);

  p {
    ${centerContent}
    max-width: 45rem;
  }

  @media (min-width: 1000px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    row-gap: 0;
    column-gap: 2rem;
  }
`;

// Mobile
const VideoMobileScrollable = styled.div`
  ${centerContent}
  margin-top: 2rem;
  display: flex;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const VideoContainerMobile = styled.div`
  overflow: hidden;
  position: relative;


  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Desktop
const VideoContainerDesktop = styled.div`
  overflow: hidden;
  position: relative;
  display: none;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1000px) {
    display: block;
  }
`;
