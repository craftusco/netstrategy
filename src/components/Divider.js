import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Divider({
  mt = "clamp(3rem,calc(3.64rem + 8.55vw),9.5rem)",
  isWhite = false,
  mb = true,
  words = ["Building", "Future", "Together"],
}) {
  //! REFS
  const containerRef = useRef();
  const spanRef_01 = useRef();
  const spanRef_02 = useRef();
  const spanRef_03 = useRef();

  // useEffect(() => {
  //   if (window.innerWidth >= 1280) {
  //     let dividerCtx = gsap.context(() => {
  //       gsap.from(
  //         [
  //           containerRef.current,
  //           spanRef_01.current,
  //           spanRef_02.current,
  //           spanRef_03.current,
  //         ],
  //         {
  //           y: "200%",
  //           ease: "easeInOut",
  //           stagger: 0.1,
  //           scrollTrigger: {
  //             trigger: containerRef.current,
  //             start: "-400% bottom",
  //             end: "center center",
  //             scrub: 1,
  //           },
  //         }
  //       );
  //     }, containerRef.current);
  //     return () => dividerCtx.revert();
  //   }
  // }, []);

  // Recalculate slider
  useEffect(() => {
    ScrollTrigger.refresh();
  });

  //! COMPONENT
  return (
    <Container mb={mb} mt={mt} ref={containerRef}>
      <Content white={isWhite}>
        {
          /*
            <span ref={spanRef_01}>{words[0]}</span>
            <span ref={spanRef_02}>{words[1]}</span>
            <span ref={spanRef_03}>{words[2]}</span>
          */
        }
      </Content>
    </Container>
  );
}


//! STYLE
const Container = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};
  margin-bottom: ${(props) =>
    props.mb && "clamp(1.50rem, calc(1.42rem + 2.69vw), 4.75rem)"};
`;

const Content = styled.div`
  border-top: 1px solid ${(props) => (props.white ? "white" : "black")};
  padding-top: clamp(0.63rem, calc(0.29rem + 1.42vw), 2rem); // 10px → 32px
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  text-transform: uppercase;
  color: ${(props) => (props.white ? "white" : "black")};
  @media (max-width: 500px) {
    span:nth-child(1) {
      display: none;
    }
  }
`;
