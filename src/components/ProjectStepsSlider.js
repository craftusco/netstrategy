import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import React, { useEffect } from "react";
import PrimaryButton from "./utils/PrimaryButton";
import gsap from "gsap";

export default function ProjectStepsSlider({ data, noSlider = false }) {
  // const removeClonesH3 = () => {
  //   const clones = document.querySelectorAll('.splide__slide--clone');
  //   console.log(clones);
  //   clones.forEach((clone) => {
  //     let h3 = clone.querySelector('h3');
  //     if(h3) {
  //       console.log(h3.innerHTML, h3.parentElement, h3.nextSibling);
  //       const span = document.createElement('span');
  //       span.innerHTML = h3.innerHTML;
  //       const cloneP = h3.nextSibling;
  //       const cloneWrap = h3.parentElement;
  //       cloneWrap.innerHTML = '';
  //       cloneWrap.append(span, cloneP);
  //     }
  //   })
  // }

  return (
    <CarouselWrapper noSlider={noSlider}>
      <Splide
        aria-label="Project Steps Slider"
        options={{
          type: "loop",
          perPage: 1,
          focus: "center",
          arrows: false,
        }}
        // onMounted={() => {removeClonesH3()}}
        // onMove={() => {removeClonesH3()}}
      >
        {data.map((slide, idx) => (
          <SplideSlide key={idx}>
            <SlideWrapper>
              <span>{slide.titolo}</span>
              <ReactMarkdown children={slide.paragrafo} />
            </SlideWrapper>
          </SplideSlide>
        ))}
      </Splide>
      <ButtonContainer
        onClick={() => {
          gsap.to(window, {
            duration: 1,
            scrollTo: "#contact",
            ease: "Power3.easeOut",
          });
        }}
      >
        <PrimaryButton
          textIsLong={data.bottone ? data.bottone.length > 22 : false}
        >
          {data.bottone ? data.bottone : "Contattaci"}
        </PrimaryButton>
      </ButtonContainer>
    </CarouselWrapper>
  );
}

const SlideWrapper = styled.div`
  padding-right: 3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_18_38};
  span {
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
    margin-bottom: 1.5rem;
    &.active {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
    @media (max-width: 1280px) {
      margin-top: 0.5rem;
      line-height: 2.2rem;
    }
  }

  p {
    margin: 0;
    margin-bottom: 0.8rem;
    /* font-size: clamp(1.13rem,calc(0.82rem + 1.29vw),2.38rem); */
  }

  ul {
    padding-left: 24px;
    list-style-type: disc;
  }
`;

const CarouselWrapper = styled.div`
  display: ${({ noSlider }) => (noSlider ? "none" : "block")};
  @media (min-width: 551px) {
    display: none;
  }
  margin-top: clamp(4.38rem, calc(3.92rem + 1.94vw), 6.25rem);
  .splide__pagination--ltr {
    margin: 2rem 0;

    button.splide__pagination__page {
      all: unset;
      position: relative;
      display: block;
      width: 10px;
      height: 10px;
      opacity: 0.2;
      margin: 0 0.25rem;
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

const ButtonContainer = styled.div`
  margin-top: clamp(1.25rem, calc(0.82rem + 2.17vw), 3.5rem);
  @media (max-width: 800px) {
    text-align: center;
    margin-top: 3rem;
  }
`;
