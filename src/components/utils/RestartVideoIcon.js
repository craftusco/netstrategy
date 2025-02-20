import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../../redux/customCursorSlice";

export default function RestartVideoIcon({isAbsolute = true, top = "initial", right = "initial", bottom = "initial", left = "initial"}) {
  //! REFS ---
  const dispatch = useDispatch();

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
      onMouseEnter={() => dispatch(changeColor("black"))}
      onMouseLeave={() => dispatch(changeColor("primary"))}
      coordinates={{top, right, bottom, left}}
      isAbsolute={isAbsolute}
    >
      <Restart
        onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          viewBox="0 0 90 90"
        >
          <g
            id="Raggruppa_771"
            dataname="Raggruppa 771"
            transform="translate(-1248 -7923)"
          >
            <circle
              id="Ellisse_2"
              dataname="Ellisse 2"
              cx="45"
              cy="45"
              r="45"
              transform="translate(1248 7923)"
              fill="#fc1333"
            />
            <path
              id="Tracciato_64"
              dataname="Tracciato 64"
              d="M10.333,17.667,3,10.333m0,0L10.333,3M3,10.333H17.667a7.333,7.333,0,1,1,0,14.667H14"
              transform="translate(1279 7954)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokewnejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </Restart>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  z-index: 99;
  position: ${({isAbsolute}) => {return isAbsolute ? "absolute" : "initial"}};
  top: ${({coordinates}) => coordinates.top};
  right: ${({coordinates}) => coordinates.right};
  bottom: ${({coordinates}) => coordinates.bottom};
  left: ${({coordinates}) => coordinates.left};
  -webkit-transform: translate3d(0,0,0);
`;

const Restart = styled.div`
  cursor: pointer;

  svg {
    width: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
    height: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
  }
`;
