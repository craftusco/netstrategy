import React from "react";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import styled from "styled-components";

const certifications2 = [
  "/certificazioni/lrt-associate.webp",
  "/certificazioni/FMP_Badges_Dark_RGB_medium2.webp",
  "/certificazioni/GA-certified2.webp",
  "/certificazioni/Hubspot-partner.webp",
  "/certificazioni/Partner-RGB2.webp",
  "/certificazioni/sky_partner_badge.webp",
];


export default function FooterDinamicImages({
  mt = "5rem",
  imgs = null,
  custom_duration = null,
  dinamicDesktop = true,
  imgsWhite = false,
}) {
  const arrayImages = imgs ? [...imgs] : certifications2;

  while (arrayImages.length < 50 && arrayImages.length > 0) {
    arrayImages.forEach((el) => {
      arrayImages.push(el);
    });
  }

  let duration = (1 / arrayImages.length) * (1000 + arrayImages.length * 100);
  duration = duration > 150 ? 150 : duration;
  duration = custom_duration ? custom_duration : duration;
  duration = `${duration}s`;

  return (
    <Container mt={mt}>
      <Slider
        duration={duration}
        className="banners"
        dinamicDesktop={dinamicDesktop}
        imgsWhite={imgsWhite}
      >
        {arrayImages.map((e, i) => (
          <Image
            sizes="100%"
            alt={e}
            key={i}
            src={e}
            fill
            style={{ filter: imgsWhite ? "invert(100%)" : "opacity(.8)" }}
          />
        ))}
      </Slider>
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};

  @media (min-width: 1250px) {
    margin-top: 0;
  }

  position: relative;
  overflow: hidden;
  height: clamp(4.38rem, calc(3.93rem + 1.88vw), 6.25rem);
  /* height: clamp(6.25rem, calc(5.05rem + 6.02vw), 12.5rem); bruno */
  @media (min-width: 992px) {
    height: 100px;
  }
  width: 100%;
  &:hover {
    .banners {
      animation-play-state: paused;
    }
  }
`;

const Slider = styled.div`
  ${centerContent}
  display: flex;
  justify-content: space-around;
  column-gap: 100px;
  @media (max-width: 600px) {
    column-gap: 60px;
  }
  align-items: center;
  /* overflow: hidden; */
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: nowrap;

  animation: bannermove ${(props) => props.duration} linear infinite;

  @media (min-width: 1280px) {
    animation-play-state: ${(props) => !props.dinamicDesktop && "paused"};
  }

  /* rotateZ to prevent firefox snappy animation */
  @keyframes bannermove {
    0% {
      transform: rotateZ(0.001deg) translate(0, -50%);
    }
    25% {
      transform: rotateZ(0.001deg) translate(-100%, -50%);
    }
    50% {
      transform: rotateZ(0.001deg) translate(0, -50%);
    }
    75% {
      transform: rotateZ(0.001deg) translate(-100%, -50%);
    }
    100% {
      transform: rotateZ(0.001deg) translate(-0%, -50%);
    }
  }

  img {
    object-fit: contain;
    position: relative !important;
    filter: opacity(0.8);
    max-width: 7.5rem;
    min-width: 6.5rem;
    min-height: 75px;
    max-height: 4rem;
  }
`;

// margin-top: 4rem;
//     height: 100px;
