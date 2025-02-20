import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import PrimaryButton from "./utils/PrimaryButton";
import RedLink from "./utils/RedLink";

gsap.registerPlugin(ScrollTrigger);

export default function RowHeading({ data, mt, reverse = false, isServicesHeading = false }) {
  // REFS ---
  const containerRef = useRef();
  const h2Ref = useRef();
  const pRef = useRef();

  // SCROLL ----
  // useEffect(() => {

  //   if (window.innerWidth >= 1280) {
  //     let RowHeadingCtx = gsap.context(() => {
  //       gsap.from([h2Ref.current, pRef.current], {
  //         y: "100%",
  //         ease: "easeInOut",
  //         stagger: 0.2,
  //         scrollTrigger: {
  //           trigger: containerRef.current,
  //           start: "-100% bottom",
  //           end: "center center",
  //           scrub: 1,
  //         },
  //       });
  //     }, containerRef.current);
  //     return () => RowHeadingCtx.revert();
  //   }
  // }, []);

  return (
    <Container mt={mt} ref={containerRef}>
      <Content reverse={reverse} isServicesHeading={isServicesHeading}>
        <h2 ref={h2Ref}>{splitText(data.title)}</h2>
        {data.paragraph ? (
          <p ref={pRef}>
            <ReactMarkdown
              components={{
                p: React.Fragment,
              }}
            >
              {data.paragraph}
            </ReactMarkdown>
          </p>
        ) : null}
      </Content>
      {data.cta ? (
        <ButtonContainer>
          <RedLink link={data.cta.link}>
            <PrimaryButton>{data.cta.text}</PrimaryButton>
          </RedLink>
        </ButtonContainer>
      ) : null}
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  p {
    width: 80%;
    margin-left: auto;
  }

  @media (min-width: 1080px) {
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
    column-gap: 5%;
    justify-content: ${(props) => (props.reverse ? props.isServicesHeading ? "space-between" : "flex-end" : "flex-start")};
    
    h2 {
      width: ${(props) => (props.isServicesHeading ? "" : "45%")};
    }

    p {
      width: 45%;
      margin-top: 9em;
      margin-left: 0;
    }
  }
`;

// Cta
const ButtonContainer = styled.div`
  margin-top: clamp(2rem, calc(1.76rem + 1.04vw), 3rem);
  display: flex;
  justify-content: center;

  @media (min-width: 1080px) {
    width: 95%;
    justify-content: flex-end;
  }
`;
