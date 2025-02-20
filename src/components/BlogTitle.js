import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import moment from "moment";

gsap.registerPlugin(ScrollTrigger);

export default function BlogTitle({ date, title, mt, reverse = false }) {
  // Animations ---
  const containerRef = useRef();
  const h2Ref = useRef();
  const pRef = useRef();
  const numberRef = useRef();
  const d =  date ?  moment(date).format('MM.YY') : moment().format('MM.YY'); 

  useEffect(() => {
    const main = document.querySelector(".main");

    let numberedHeadingCtx = gsap.context(() => {
      gsap.from([numberRef.current, h2Ref.current, pRef.current], {
        y: "-50px",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          pinnedContainer: main,
          start: "-70% bottom",
          end: "center center",
          scrub: 1,
        },
      });
      gsap.to([numberRef.current, h2Ref.current, pRef.current], {
        y: "0",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          pinnedContainer: main,
          start: "-70% bottom",
          end: "center center",
          scrub: 1,
        },
      });
    }, containerRef.current);
    return () => numberedHeadingCtx.revert();
  }, []);

  return (
    <Container mt={mt} reverse={reverse} ref={containerRef}>
      <Title>
        <h2 ref={h2Ref}>{splitText(title)}</h2>
        {/* {data.paragraph ? (
          <ParagraphDesktop ref={pRef}>
            <p>
              <ReactMarkdown
                components={{
                  p: React.Fragment,
                }}
              >
                {data.paragraph}
              </ReactMarkdown>
            </p>
          </ParagraphDesktop>
        ) : null} */}
      </Title>
      <Number ref={numberRef}>{d}</Number>
      {/* {data.paragraph ? (
        <ParagraphMobile>
          <p>
            <ReactMarkdown
              components={{
                p: React.Fragment,
              }}
            >
              {data.paragraph}
            </ReactMarkdown>
          </p>
        </ParagraphMobile>
      ) : null} */}
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
    justify-content: space-between;
  }

  span {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    /* transform: translateY(100%); */

    span {
      display: block;
    }
  }
`;

const Number = styled.span`
  align-self: flex-end;
  /* transform: translateY(100%); */

  @media (min-width: 768px) {
    align-self: flex-start;
    width: ${(props) => (props.reverse ? "50%" : "auto")};
  }
`;

const ParagraphMobile = styled.div`
  margin-top: 1.5rem;
  width: 80%;
  /* transform: translateY(100%); */

  @media (min-width: 768px) {
    display: none;
  }
`;

const Title = styled.div`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

const ParagraphDesktop = styled.div`
  display: none;
  /* transform: translateY(100%); */

  @media (min-width: 768px) {
    margin-top: 4rem;
    display: block;
  }

  @media (min-width: 1500px) {
    width: 85%;
  }
`;
