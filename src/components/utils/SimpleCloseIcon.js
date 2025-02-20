import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../../redux/customCursorSlice";

export default function SimpleCloseIcon({ opacity }) {
  //! REFS ---
  const dispatch = useDispatch();
  const playRef = useRef();
  const pauseRef = useRef();
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  //! HANDLE CLICK ---
  useEffect(() => {
    let playIconCtx = gsap.context(() => {
      isPlaying
        ? gsap.set(playRef.current, {
            display: "none",
          }) &&
          gsap.set(pauseRef.current, {
            display: "block",
          })
        : gsap.set(pauseRef.current, {
            display: "none",
          }) &&
          gsap.set(playRef.current, {
            display: "block",
          });
    }, containerRef.current);
    return () => playIconCtx.revert();
  }, [isPlaying]);

  //! OPACITY PAUSE ICON ---
  useEffect(() => {
    !opacity && isPlaying
      ? gsap.to(pauseRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "easeInOut",
        })
      : gsap.to(pauseRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "easeInOut",
        });
  }, [opacity]);

  //! HANDLE MOUSE ENTER ---
  const handleMouseEnter = (target) => {
    gsap.to(target, {
      scale: 1.05,
      duration: 0.2,
      ease: "easeInOut",
    });
  };

  //! HANDLE MOUSE LEAVE ---
  const handleMouseLeave = (target) => {
    gsap.to(target, {
      scale: 1,
      duration: 0.2,
      ease: "easeInOut",
    });
  };

  return (
    <Container
      ref={containerRef}
      onMouseEnter={() => dispatch(changeColor("black"))}
      onMouseLeave={() => dispatch(changeColor("primary"))}
    >
      <Play
        ref={playRef}
        onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113 113">
          <g id="PLAYER" transform="translate(-1653 -32)">
            <circle
              id="Ellisse_2"
              dataname="Ellisse 2"
              cx="38.5"
              cy="38.5"
              r="38.5"
              transform="translate(1671 50)"
              fill="#fc1333"
            />
            <g
              id="Raggruppa_20"
              dataname="Raggruppa 20"
              transform="translate(1.5 3.5)"
            >
              <line
                id="Linea_1"
                dataname="Linea 1"
                x2="17"
                transform="translate(1702 91.021) rotate(-45)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
              <line
                id="Linea_2"
                dataname="Linea 2"
                x2="17"
                transform="translate(1702 79) rotate(45)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
            <g
              id="Ellisse_4"
              dataname="Ellisse 4"
              transform="translate(1653 32)"
              fill="none"
              stroke="#fc1333"
              strokeWidth="1"
            >
              <circle cx="56.5" cy="56.5" r="56.5" stroke="none" />
              <circle cx="56.5" cy="56.5" r="46" fill="none" />
            </g>
          </g>
        </svg>
      </Play>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  z-index: 99;
`;

const Play = styled.div`
  cursor: pointer;

  /* transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  } */

  svg {
    height: clamp(5.5rem, calc(5.01rem + 2.07vw), 7.5rem);
  }
`;

const Pause = styled.div`
  cursor: pointer;
  display: none;
  /* transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  } */

  svg {
    height: clamp(5.5rem, calc(5.01rem + 2.07vw), 7.5rem);
  }
`;
