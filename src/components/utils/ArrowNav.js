import { useRef } from "react";
import styled from "styled-components";
import { ScrollToPlugin } from "gsap/all";
import { gsap } from "gsap";
import { changeColor } from "../../../redux/customCursorSlice";
import { useDispatch } from "react-redux";

gsap.registerPlugin(ScrollToPlugin);

export default function ArrowNav({ inSearchResults = false }) {
  //! REFS
  const containerRef = useRef();
  const dispatch = useDispatch();

  //! SCROLL TO TOP
  const handleArrowNav = () => {
    !inSearchResults
      ? gsap.to(window, { duration: 1, scrollTo: 0, ease: "Power3.easeOut" })
      : gsap.to(".menuContainerRef", {
          duration: 1,
          scrollTo: 0,
          ease: "Power3.easeOut",
        });
  };

  //! COMPONENT
  return (
    <Container
      ref={containerRef}
      onClick={handleArrowNav}
      onMouseEnter={() => dispatch(changeColor("scaleUp"))}
      onMouseLeave={() => dispatch(changeColor("scaleDown"))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="77"
        height="77"
        viewBox="0 0 77 77"
      >
        <g
          id="Raggruppa_309"
          dataname="Raggruppa 309"
          transform="translate(9320 -1209)"
        >
          <g
            id="Raggruppa_33"
            dataname="Raggruppa 33"
            transform="translate(-10991 1159)"
          >
            <circle
              id="Ellisse_2"
              dataname="Ellisse 2"
              cx="38.5"
              cy="38.5"
              r="38.5"
              transform="translate(1671 50)"
              fill="#242121"
            />
          </g>
          <g
            id="Raggruppa_308"
            dataname="Raggruppa 308"
            transform="translate(-11848.389 1319.5) rotate(-90)"
          >
            <path
              id="Tracciato_8"
              dataname="Tracciato 8"
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
              dataname="Linea 23"
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
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  cursor: pointer;
  width: 4.8rem;
  height: 4.8rem;
  z-index: 998;

  @media (max-width: 550px) {
    display: none;
  }
`;
