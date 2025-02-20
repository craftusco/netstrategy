import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../../redux/customCursorSlice";

export default function ToggleAudioIcons({isAbsolute = true, top = "initial", right = "initial", bottom = "initial", left = "initial", isMutedTrigger}) {
  //! REFS ---
  const dispatch = useDispatch();
  const playRef = useRef();
  const pauseRef = useRef();
  const containerRef = useRef();
  const [isMuted, setIsMuted] = useState(true);

  //! SET MUTE STATE FROM PARENT
  useEffect(() => {
    setIsMuted(isMutedTrigger);
  }, [isMutedTrigger]);

  //! HANDLE CLICK ---
  useEffect(() => {
    let playIconCtx = gsap.context(() => {
      !isMuted
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
  }, [isMuted]);

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
      coordinates={{top, right, bottom, left}}
      isAbsolute={isAbsolute}
    >
      <Play
        ref={playRef}
        onClick={() => setIsMuted(false)}
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
            id="Raggruppa_770"
            dataname="Raggruppa 770"
            transform="translate(-1205 -7987)"
          >
            <g id="PLAYER" transform="translate(1205 7987)">
              <g id="Raggruppa_769" dataname="Raggruppa 769">
                <circle
                  id="Ellisse_2"
                  dataname="Ellisse 2"
                  cx="45"
                  cy="45"
                  r="45"
                  fill="#fc1333"
                />
              </g>
            </g>
            <path
              id="Tracciato_63"
              dataname="Tracciato 63"
              d="M21.371,11.52l2.868,2.869m0,0,2.868,2.869M24.24,14.389l2.868-2.869M24.24,14.389l-2.868,2.869M7.986,9.608,14,3.59a.956.956,0,0,1,1.632.677V24.512A.956.956,0,0,1,14,25.188L7.986,19.17H5.131a2.484,2.484,0,0,1-2.47-1.726,11.567,11.567,0,0,1,0-6.108,2.485,2.485,0,0,1,2.47-1.728Z"
              transform="translate(1235.32 8017.611)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </Play>
      <Pause
        ref={pauseRef}
        onClick={() => setIsMuted(true)}
        onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
        onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="90"
          viewBox="0 0 90 90"
        >
          <g id="PLAYER" transform="translate(-1851 -274)">
            <g
              id="Raggruppa_769"
              dataname="Raggruppa 769"
              transform="translate(1851 274)"
            >
              <circle
                id="Ellisse_2"
                dataname="Ellisse 2"
                cx="45"
                cy="45"
                r="45"
                fill="#fc1333"
              />
              <path
                id="Tracciato_62"
                dataname="Tracciato 62"
                d="M22.23,6.066a10.663,10.663,0,0,1,0,15.08M19.089,9.208a6.22,6.22,0,0,1,0,8.8M7.581,9.163l5.592-5.592A.889.889,0,0,1,14.69,4.2V23.012a.889.889,0,0,1-1.516.628L7.581,18.048H4.928a2.31,2.31,0,0,1-2.3-1.6,10.752,10.752,0,0,1,0-5.677,2.309,2.309,0,0,1,2.3-1.6Z"
                transform="translate(31.199 31.394)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokewnejoin="round"
                strokeWidth="1.5"
              />
            </g>
          </g>
        </svg>
      </Pause>
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

const Play = styled.div`
  cursor: pointer;

  svg {
    width: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
    height: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
  }
`;

const Pause = styled.div`
  cursor: pointer;
  display: none;

  svg {
    width: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
    height: clamp(3.13rem, calc(2.82rem + 1.29vw), 4.38rem);
  }
`;
