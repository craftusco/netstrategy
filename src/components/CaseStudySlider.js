import { centerContent } from "@/styles/mixins";
import { Draggable, InertiaPlugin } from "gsap/all";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export default function CaseStudySlider({ mt, images, initialImage }) {
  if (images.length == 0) return <></>;

  //! REFS
  const containerRef = useRef();
  const imageContainerRef = useRef();
  const sliderRef = useRef();
  let mm = gsap.matchMedia();

  //! DRAGGABLE ----
  useEffect(() => {
    // mm.add("(min-width: 800px)", () => {
    let caseStudySliderCtx = gsap.context(() => {
      Draggable.create(sliderRef.current, {
        type: "x",
        bounds: containerRef.current, // Limita il movimento all'interno del contenitore
        throwProps: true,
        inertia: true,
      });
    }, containerRef.current);
    return () => caseStudySliderCtx.revert();
    // });
  }, []);

  //! Add static first image of the array
  // if (images[0] !== initialImage) {
  //   images.unshift(initialImage);
  // }

  //! COMPONENT
  return (
    <Wrapper>
      <Container ref={containerRef}>
        <Slider mt={mt} ref={sliderRef}>
          {images.map((e, i) => (
            <ImageContainer ref={imageContainerRef} key={i}>
              <Image
                src={e}
                alt="Caso di successo"
                fill
                sizes="100%"
                quality={100}
                priority={true}
              />
              {i != images.length - 1 && (
                <Arrow
                  onClick={() => {
                    gsap.to(containerRef.current, {
                      duration: 0.5,
                      scrollTo: {
                        x: imageContainerRef.current.offsetWidth * (i+1),
                        offsetX: "0",
                      },
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="77"
                    height="77"
                    viewBox="0 0 77 77"
                  >
                    <g
                      id="Raggruppa_412"
                      data-name="Raggruppa 412"
                      transform="translate(1286 9320) rotate(90)"
                    >
                      <g
                        id="Raggruppa_33"
                        data-name="Raggruppa 33"
                        transform="translate(-10991 1159)"
                      >
                        <circle
                          id="Ellisse_2"
                          data-name="Ellisse 2"
                          cx="38.5"
                          cy="38.5"
                          r="38.5"
                          transform="translate(1671 50)"
                          fill="#fc1333"
                        />
                      </g>
                      <g
                        id="Raggruppa_308"
                        data-name="Raggruppa 308"
                        transform="translate(-11848.389 1319.5) rotate(-90)"
                      >
                        <path
                          id="Tracciato_8"
                          data-name="Tracciato 8"
                          d="M76.8,2558.639l8.389,8.389-8.389,8.389"
                          transform="translate(-3.188 -0.139)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                        />
                        <line
                          id="Linea_23"
                          data-name="Linea 23"
                          x1="19.904"
                          transform="translate(62 2566.793)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                      </g>
                    </g>
                  </svg>
                </Arrow>
              )}
            </ImageContainer>
          ))}
          {/* Arrow */}
        </Slider>
      </Container>
    </Wrapper>
  );
}

//! STYLE
const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  overflow: hidden;

  /* @media (max-width: 800px) {
    overflow-x: scroll;
  } */
`;

const Slider = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};
  display: flex;
  column-gap: 1rem;
  min-width: max-content;
`;

// Image
const ImageContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: clamp(24rem, calc(18.42rem + 23.82vw), 47rem);

  img {
    /* object-fit: cover; */
    position: relative !important;
    width: auto !important;
    height: 100%;
    display: block;
  }
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 6rem;
  /* right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); */
  /* left: calc(100vw - 6rem); */

  @media (min-width: 800px) {
    display: none;
  }
`;
