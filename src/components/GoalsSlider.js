import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import React from "react";
import splitText from "@/utils/splitText";

export default function GoalsSlider({ data }) {
  return (
    <Wrapper>
      <Splide
        aria-label="Goals Slider"
        options={{
          type: "loop",
          perPage: 1,
          focus: "center",
          arrows: false,
        }}
      >
        {data.map(({ argomento, titolo, paragrafo }, idx) => (
          <SplideSlide key={idx}>
            <Goal number={true} key={idx}>
              <span>{argomento}</span>
              <span className="title">{splitText(titolo)}</span>
              <p>
                <ReactMarkdown
                  components={{
                    p: React.Fragment,
                  }}
                >
                  {paragrafo}
                </ReactMarkdown>
              </p>
            </Goal>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @media (min-width: 601px) {
    display: none;
  }
  margin-top: clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  .splide__pagination--ltr {
    margin: 1rem 0;
    button.splide__pagination__page {
      all: unset;
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0 0.25rem;
      opacity: 0.2;
      border-radius: 50%;
      border: 1px solid ${({ theme: { colors } }) => colors.greyColor};
      cursor: pointer;
      transition: all 350ms ease;
      &.is-active {
        transform: scale(1.3);
        opacity: 1;
        border: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
        background-color: ${({ theme: { colors } }) => colors.primaryColor};
      }
    }
  }
`;

const Goal = styled.div`
  border-top: 1px solid;
  padding-top: 2rem;
  padding-bottom: clamp(1.5rem, calc(0.53rem + 4.14vw), 5.5rem); // 24px → 88px
  &:nth-child(3),
  &:nth-child(4) {
    border-bottom: 1px solid black;
  }

  & > span {
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  span.title {
    display: block;
    margin-top: clamp(2rem, calc(1.15rem + 3.62vw), 5.5rem); // 32px → 88px
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${(props) =>
      props.number
        ? "clamp(3.75rem, calc(3.00rem + 3.75vw), 7.50rem)"
        : "clamp(3.56rem, calc(2.91rem + 2.78vw), 6.25rem)"};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  p {
    margin-top: 1.5rem;
  }
`;
