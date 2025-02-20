import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Smile from "./Smile";
import { useRouter } from "next/router";

export default function CustomCursor() {
  //! REFS ---
  const cursorRef = useRef();
  const smileRef = useRef();
  const router = useRouter();
  const [isCursorInsideViewport, setCursorInsideViewport] = useState(true);

  //! SCALE OUTSIDE THE VIEWPORT ---

  // useEffect(() => {
  //   const handleMouseLeave = () => {
  //     setCursorInsideViewport(false);
  //   };

  //   const handleMouseEnter = () => {
  //     setCursorInsideViewport(true);
  //   };

  //   document.addEventListener("mouseleave", handleMouseLeave);
  //   document.addEventListener("mouseenter", handleMouseEnter);

  //   return () => {
  //     document.removeEventListener("mouseleave", handleMouseLeave);
  //     document.removeEventListener("mouseenter", handleMouseEnter);
  //   };
  // }, []);

  //! MOUSE FOLLOW ---
  useEffect(() => {
    const updatePosition = (event) => {
      //! cursor
      const circleTarget = cursorRef.current;

      const circleCursorX = event.clientX;
      const circleCursorY = event.clientY;

      const circleTargetX =
        circleCursorX -
        circleTarget.getBoundingClientRect().width /
          2 /
          gsap.getProperty(circleTarget, "scale");
      const circleTargetY =
        circleCursorY -
        circleTarget.getBoundingClientRect().height /
          2 /
          gsap.getProperty(circleTarget, "scale");

      gsap.to(circleTarget, {
        x: circleTargetX,
        y: circleTargetY,
      });

      gsap.to(circleTarget, {
        delay: 0.7,
        opacity: 1,
      });

      //! smile
      const smileTarget = smileRef.current;
      gsap.to(circleTarget, {
        delay: 0.7,
        opacity: 1,
      });

      const smileTargetX = circleCursorX - 32.5;

      const smileTargetY = circleCursorY - 32.5;

      gsap.to(smileTarget, {
        x: smileTargetX,
        y: smileTargetY,
      });
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, [router.pathname]);

  //! COLOR/SCALE ---
  const customState = useSelector((state) => state.customCursor.value);

  useEffect(() => {
    switch (customState) {
      case "black":
        gsap.to(cursorRef.current, {
          background: "black",
        });
        break;
      case "primary":
        gsap.to(cursorRef.current, {
          background: "#fc1333",
        });
        break;
      case "transparent":
        gsap.to(cursorRef.current, {
          background: "transparent",
          duration: 0.2,
        });
        break;
      case "scaleUp":
        gsap.to(cursorRef.current, {
          scale: 2,
          ease: "power3.out",
        });
        break;
      case "scaleDown":
        gsap.to(cursorRef.current, {
          scale: 1,
          ease: "power3.out",
        });
        break;
      case "black&scaleUp":
        gsap.to(cursorRef.current, {
          scale: 2,
          background: "black",
          ease: "power3.out",
        });
        break;
      case "primary&scaleDown":
        gsap.to(cursorRef.current, {
          scale: 1,
          background: "#fc1333",
          ease: "power3.out",
        });
        break;
      case "smileUp":
        gsap.to(smileRef.current, {
          scale: 1,
          ease: "power3.out",
        });
        break;
      case "smileDown":
        gsap.to(smileRef.current, {
          scale: 0.0001,
          ease: "power3.out",
        });
        break;
    }
  }, [customState]);

  //! RESET STYLE IF PAGE IS CHANGED
  useEffect(() => {
    gsap.to(cursorRef.current, {
      scale: 1,
      ease: "power3.out",
    });
    gsap.to(cursorRef.current, {
      background: "#fc1333",
    });
  }, [router.asPath]);

  //! COMPONENT
  return (
    <>
      <Cursor ref={cursorRef}></Cursor>
      <SmileContainer ref={smileRef}>
        <Smile />
      </SmileContainer>
    </>
  );
}

//! STYLE ---
const Cursor = styled.div`
  opacity: 0;
  transform: scale(0.0001);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  position: fixed;
  z-index: 1000000;
  pointer-events: none;
  display: none;

  @media (min-width: 1000px) {
    display: block;
  }
`;

const SmileContainer = styled.div`
  transform: scale(0.0001);
  position: fixed;
  z-index: 10000;
  pointer-events: none;
  display: none;

  @media (min-width: 1000px) {
    display: block;
  }
`;
