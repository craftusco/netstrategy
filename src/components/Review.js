import getPath from "@/utils/getPath";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

export default function Review({
  data: { titolo, desc, autore, posizione, rating, sito, profile_image, logo },
  readMore,
  handleChange,
}) {
  return (
    <Container>
      <ImageWrapper>
        <Image
          src={getPath(profile_image?.data?.attributes?.url)}
          fill
          sizes="100%"
          alt={profile_image?.data?.attributes?.alternativeText ? profile_image?.data?.attributes?.alternativeText : "foto profilo cliente"}
        ></Image>
      </ImageWrapper>
      <Content>
        <Head>
          <ImageContainer>
            <Image
              src={getPath(logo?.data?.attributes?.url)}
              fill
              sizes="100%"
              alt={logo?.data?.attributes?.alternativeText ? logo?.data?.attributes?.alternativeText :"logo azienda recensione"}
            ></Image>
          </ImageContainer>
          <span className="title">{titolo}</span>
        </Head>
        <Text readMore={readMore}>
          <ReactMarkdown children={desc} />
          {!readMore && (
            <span
              onClick={() => {
                handleChange();
              }}
            >
              leggi di più
            </span>
          )}
        </Text>
        <Foot>
          <div className="info">
            <span>
              {autore.toUpperCase()} - {posizione}
            </span>
            <span>
              <a href={sito} target="_blank">
                {sito}
              </a>
            </span>
          </div>
          <div className="rating">
            <div className="rating-box">
              <span>{rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16.687"
                height="15.992"
                viewBox="0 0 16.687 15.992"
              >
                <path
                  id="Poligono_1"
                  data-name="Poligono 1"
                  d="M8.344,0l2.5,5.369,5.841.74-4.294,4.058L13.5,15.992,8.344,13.131,3.187,15.992l1.107-5.826L0,6.108l5.841-.74Z"
                  fill="#fc1333"
                />
              </svg>
            </div>
          </div>
        </Foot>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  padding: 3.5rem 2rem 2rem 2rem;
  border-radius: 25px;
  border: 2px solid ${({ theme: { colors } }) => colors.primaryColor};
  margin-bottom: 2rem;
  @media (min-width: 800px) {
    /* min-height: 345px; */
    /* align-items: center; */
  }
  @media (max-width: 750px) {
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    margin-bottom: 3.5rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 170px;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    height: initial !important;
    object-fit: cover;
    position: relative !important;
    display: block;
  }
`;

const Content = styled.div``;

const Head = styled.div`
  display: flex;
  .title {
    flex-grow: 1;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_22_25};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_22_28};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }
  @media (max-width: 750px) {
    display: block;
    .title {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  max-width: 150px;
  height: 70px;
  position: absolute;
  right: 30px;
  top: 20px;
  overflow: hidden;
  @media (max-width: 750px) {
    position: relative;
    right: initial;
    top: initial;
    margin-bottom: 0.5rem;
  }
  img {
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Text = styled.div`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  line-height: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
  margin-bottom: 2rem;
  span {
    display: none;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    @media (max-width: 750px) {
      display: block;
    }
  }

  p {
    margin-bottom: 0;
    font-family: ${({ theme: { fonts } }) => fonts.regular};
    @media (max-width: 750px) {
      margin-bottom: 0;
      overflow: ${({ readMore }) => (readMore ? "initial" : "hidden")};
      display: ${({ readMore }) => (readMore ? "block" : "-webkit-box")};
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
`;

const Foot = styled.div`
  .info {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    span {
      display: block;
      &:first-child {
        color: ${({ theme: { colors } }) => colors.primaryColor};
      }
      a {
        font-family: ${({ theme: { fonts } }) => fonts.medium};
      }
    }
  }
  .rating {
    color: ${({ theme: { colors } }) => colors.whiteColor};
    background-color: ${({ theme: { colors } }) => colors.blackColorV1};
    padding: 5px 10px;
    border-radius: 20px;
    span {
      font-family: ${({ theme: { fonts } }) => fonts.medium};
    }
    svg {
      width: 12px;
    }
    &-box {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    @media (max-width: 750px) {
      position: absolute;
      top: 2rem;
      right: 20px;
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
