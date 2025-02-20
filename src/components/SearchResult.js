import { gsap } from "gsap";
import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";
import RedLink from "./utils/RedLink";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";

export default function SearchResult({ image, altText, title, link }) {
  //! REFS ---
  const containerRef = useRef();
  const dispatch = useDispatch();

  //! HANDLE MOUSE ENTER ---
  const handleMouseEnter = (target) => {
    // Arrow svg
    gsap.to(target.lastChild, {
      stroke: "#fc1333",
      duration: 0.3,
      y: "50%",
      x: "-50%",
    });
    // Text
    gsap.to(target.lastChild.previousElementSibling, {
      color: "#fc1333",
      duration: 0.3,
    });
    // Image
    gsap.to(
      target.lastChild.previousElementSibling.previousElementSibling.firstChild,
      {
        scale: 1,
        duration: 0.3,
      }
    );
  };

  //! HANDLE MOUSE LEAVE ---
  const handleMouseLeave = (target) => {
    // Arrow svg
    gsap.to(target.lastChild, {
      stroke: "white",
      duration: 0.3,
      y: "0",
      x: "0",
    });
    // Text
    gsap.to(target.lastChild.previousElementSibling, {
      color: "white",
      duration: 0.3,
    });
    // Image
    gsap.to(
      target.lastChild.previousElementSibling.previousElementSibling.firstChild,
      {
        scale: 1.1,
        duration: 0.3,
      }
    );
  };

  //! COMPONENT ---
  return (
    <RedLink link={link} img={image}>
      <div
        onMouseEnter={() => {
          dispatch(changeColor("scaleUp"));
        }}
        onMouseLeave={() => {
          dispatch(changeColor("scaleDown"));
        }}
      >
        <Container
          ref={containerRef}
          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
        >
          <ImageContainer>
            <Image
              src={image}
              alt={altText ? altText : title ? `Copertina articolo ${title}` : "Copertina articolo"}
              fill
              sizes="100%"
            />
          </ImageContainer>
          <Title>{title}</Title>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="61.957"
            height="61.592"
            viewBox="0 0 61.957 61.592"
          >
            <g
              id="Raggruppa_497"
              data-name="Raggruppa 497"
              transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
            >
              <path
                id="Tracciato_8"
                data-name="Tracciato 8"
                d="M0,43.811,21.905,21.905,0,0"
                transform="translate(30.318 0)"
                fill="none"
                stroke="inherit"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
              />
              <line
                id="Linea_23"
                data-name="Linea 23"
                x1="51.974"
                transform="translate(0 22.155)"
                fill="none"
                stroke="inherit"
                strokeLinecap="round"
                strokeWidth="6"
              />
            </g>
          </svg>
        </Container>
      </div>
    </RedLink>
  );
}

//! STYLE ---
const Container = styled.div`
  border-top: 1px solid grey;
  padding-block: 2rem;

  svg {
    display: none;
    width: clamp(2.19rem, calc(1.77rem + 0.87vw), 2.81rem);
    height: clamp(2.19rem, calc(1.77rem + 0.87vw), 2.81rem);
    stroke: white;
  }

  @media (min-width: 768px) {
    display: flex;

    svg {
      display: block;
      margin-left: auto;
    }
  }
`;

const ImageContainer = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  height: 16rem;
  position: relative;

  @media (min-width: 768px) {
    width: 20rem;
  }

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    scale: 1.1;
  }
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  font-size: clamp(1.25rem, calc(1.19rem + 0.26vw), 1.5rem);
  font-family: ${({ theme: { fonts } }) => fonts.medium};

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 2rem;
    width: 40%;
  }
`;
