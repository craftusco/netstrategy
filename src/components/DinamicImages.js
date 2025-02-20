import React from "react";
import { centerContent } from "@/styles/mixins";
import LogosCarousel from "./LogosCarousel";
import styled from "styled-components";
import getPath from "@/utils/getPath";

const certifications2 = [
  "/loghi/eis_2.webp",
  "/loghi/giustiwings_2.webp",
  "/loghi/leb.it_2.webp",
  "/loghi/lhh-recruitment.webp",
  "/loghi/simba_2.webp",
  "/loghi/verallia_2.webp",
  "/loghi/zonzini_2.webp",
  "/loghi/Anteo_NetStrategy_2.webp",
  "/loghi/Aworld_NetStrategy_2.webp",
  "/loghi/cicalia_NetStrategy.webp",
  "/loghi/Cormidi_NetStrategy_2.webp",
  "/loghi/Forigo_NetStrategy_2.webp",
  "/loghi/Freddo_NetStrategy_2.webp",
  "/loghi/hvb_NetStrategy.webp",
  "/loghi/Juice_NetStrategy_2.webp",
  "/loghi/L'Arena_NetStrategy_2.webp",
  "/loghi/MFI_NetStrategy_2.webp",
  "/loghi/Pulimav_NetStrategy_2.webp",
  "/loghi/Stampaprint_NetStrategy_2.webp",
  "/loghi/TopTuning_NetStrategy_2.webp",
];

export default function DinamicDesktopImages({
  mt,
  imgs = null,
  custom_duration = null,
  dinamicDesktop = true,
  imgsWhite = false,
  mobileSmall = false,
  widthLogos = "6.5rem",
  heightLogos = "4rem"
}) {
  const arrayImages = imgs ? [...imgs] : certifications2;

  /*while (arrayImages.length < 50 && arrayImages.length > 0) {
    arrayImages.forEach((el) => {
      arrayImages.push(el);
    });
  }

  let duration = (1 / arrayImages.length) * (1000 + arrayImages.length * 100);
  duration = duration > 150 ? 150 : duration;
  duration = custom_duration ? custom_duration : duration;
  duration = `${duration}s`;*/

  return (
    <Container mt={mt} mobileSmall={mobileSmall}>
      {
        /*
          <Slider
            duration={duration}
            className="banners"
            dinamicDesktop={dinamicDesktop}
            imgsWhite={imgsWhite}
            mobileSmall={mobileSmall}
            widthLogos={widthLogos}
            heightLogos={heightLogos}
          >
            {arrayImages.map((e, i) => (
              <Image
                sizes="100%"
                alt={"Logo azienda"}
                key={i}
                src={getPath(e)}
                fill
                style={{ filter: imgsWhite ? "invert(100%)" : "opacity(.8)" }}
                // priority
              />
            ))}
          </Slider>
        */
      }
      <LogosCarousel logos={arrayImages} width={widthLogos} height={heightLogos} />
    </Container>
  );
}

const Container = styled.div`
  /* margin-top: ${(props) => props.mt}; */

  margin-top: ${({ mobileSmall, mt }) => mobileSmall ? "0" : mt ? mt : "2rem"};

  @media (min-width: 1250px) {
    margin-top: 0;
    margin-top: ${(props) => props.mt ? props.mt : "0"};
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
    min-height: 100px;
    max-width: ${({ mobileSmall }) => mobileSmall ? "4.5rem" : "7.5rem"};
    min-width: ${({ mobileSmall, widthLogos }) => mobileSmall ? "3.5rem" : widthLogos};
    max-height: ${({ mobileSmall, heightLogos }) => mobileSmall ? "2rem" : heightLogos};
  }
`;

// margin-top: 4rem;
//     height: 100px;
