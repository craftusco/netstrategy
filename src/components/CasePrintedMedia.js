import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import getPath from "@/utils/getPath";

export default function CasePrintedMedia({
  title,
  paragraph,
  blackOrWhite,
  img,
  mt,
  version,
  extraMedia = [],
}) {
  if (!img || img.length == 0) return;

  //! COMPONENTS
  return (
    <Container mt={mt}>
      <Text version={version}>
        <h2>{title}</h2>
      </Text>
      <ParagraphDesktopV2 version={version}>
        <p>{paragraph}</p>
      </ParagraphDesktopV2>
      <Images>
        <ImageContainer>
          {img[0].endsWith(".mp4") || img[0].endsWith(".mov") ? (
            <video
              controls
              src={img[0]}
              alt="Printed Media - Caso di successo netstrategy"
              style={{ width: "100%" }}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <>
              <Image
                priority={true}
                src={img[0]}
                alt="Printed Media - Caso di successo netstrategy"
                fill
                sizes="100%"
                quality={100}
              />
              <ParagraphDesktopV1 version={version} textColor={blackOrWhite}>
                <p>{paragraph}</p>
              </ParagraphDesktopV1>
            </>
          )}
        </ImageContainer>
        <ParagraphMobile>
          <p>{paragraph}</p>
        </ParagraphMobile>
        {/* --- */}
        {img.slice(1).map((el, i) => (
          <ImageContainer key={i}>
            <Image
              priority={true}
              src={el}
              alt="Printed Media - Caso di successo netstrategy"
              fill
              sizes="100%"
              quality={100}
            />
          </ImageContainer>
        ))}
        {extraMedia.map((el, i) => (
          <ExtraMedia key={i}>
            <div className="container-data">
              <div className="data">
                <div className="titolo">{el.titolo}</div>
                <div className="paragrafo">{el.paragrafo}</div>
              </div>
            </div>
            <div className="img">
              <ImageContainer key={i}>
                <Image
                  priority={true}
                  src={getPath(el.immagine?.data?.attributes.url)}
                  alt="Printed Media - Caso di successo netstrategy"
                  fill
                  sizes="100%"
                  quality={100}
                />
              </ImageContainer>
            </div>
          </ExtraMedia>
        ))}
      </Images>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  max-width: 120rem;
  margin-inline: auto;
`;

/* Title */
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

  @media (min-width: 768px) {
    h2 {
      text-align: ${(props) => (props.version === "V1" ? "right" : "center")};
    }
  }
`;

const ParagraphMobile = styled.div`
  ${centerContent}
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ParagraphDesktopV1 = styled.div`
  ${centerContent}
  position: absolute;
  bottom: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  color: ${(props) => (props.textColor == null ? "white" : props.textColor)};
  max-width: 40rem;
  display: none;

  @media (min-width: 768px) {
    display: ${(props) => (props.version === "V1" ? "block" : "none")};
  }
`;

const ParagraphDesktopV2 = styled.div`
  ${centerContent}
  max-width: 40rem;
  display: ${(props) => (props.version === "V1" ? "none" : "block")};
`;

// Image
const Images = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  row-gap: clamp(2rem, calc(1.03rem + 4.14vw), 6rem);
`;

// Extra Media
const ExtraMedia = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  height: 650px;
  .container-data,
  .img {
    width: 50%;
  }

  .container-data {
    background-color: #fbf9f8;
    display: flex;
    align-items: center;
    padding: 6rem;
    .data {
      .titolo {
        font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
        line-height: 1;
        margin-bottom: 30px;
      }
    }
  }

  @media (max-width: 1000px) {
    height: auto;
    margin-top: 0;
    flex-direction: column;
    .container-data,
    .img {
      width: 100%;
    }
    .container-data {
      background-color: #fbf9f8;
      display: flex;
      align-items: center;
      padding: 1.5rem;
      .data {
        /* text-align: center; */
        .titolo {
          font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
          line-height: 1;
          margin-bottom: 15px;
        }
      }
    }
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
