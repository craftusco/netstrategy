import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef } from "react";
import splitText from "@/utils/splitText";
import PrimaryButton from "./utils/PrimaryButton";
import LayersList from "@/components/LayersList";
import ProjectStepsSlider from "@/components/ProjectStepsSlider";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import AccordionMobile from "./AccordionMobile";

gsap.registerPlugin(ScrollToPlugin);

export default function Layers({
  data,
  mt,
  noSlider = false,
  titleSmall = false,
}) {
  if (!data) return <></>;

  const containerRef = useRef();

  // useEffect(() => {
  //   let layersCtx = gsap.context(() => {
  //     gsap.from(".h2-container", {
  //       y: "30%",
  //       ease: "easeInOut",
  //       stagger: 0.2,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "0% bottom",
  //         end: "center bottom-=20%",
  //         scrub: 1.5,
  //       },
  //     });
  //     gsap.from(".layers-container-ref > div", {
  //       y: "100%",
  //       ease: "easeInOut",
  //       stagger: 0.2,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "0% bottom",
  //         end: "center center",
  //         scrub: 1.5,
  //       },
  //     });
  //   }, containerRef.current);

  //   return () => {
  //     layersCtx.revert();
  //   };
  // }, []);
  return (
    <Container mt={mt} ref={containerRef}>
      <Content
        withSubtitle={data.sottotitolo || data.titolo.length > 27}
        titleSmall={titleSmall}
      >
        {/* Heading */}
        <div className="h2-container">
          <div className="sticky-container">
            <h2>{data.sottotitolo ? data.titolo : splitText(data.titolo)}</h2>
            {data.sottotitolo && <p className="subtitle">{data.sottotitolo}</p>}
          </div>
        </div>
        {/* Layers */}
        <LayersContainer className="layers-container-ref" noSlider={noSlider}>
          <LayersList layers={data.livelli} />
          <ButtonContainer
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: "#contact",
                ease: "Power3.easeOut",
              });
            }}
          >
            <PrimaryButton textIsLong={data.bottone ? data.bottone.length > 22 : false}>
              {data.bottone ? data.bottone : "Contattaci"}
            </PrimaryButton>
          </ButtonContainer>
        </LayersContainer>
        {/* <ProjectStepsSlider data={data.livelli} noSlider={noSlider} /> */}
        <AccordionMobile data={data.livelli} showTitle={false} isRed={true} />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
`;

const Content = styled.div`
  ul {
    margin-left: 20px;
  }
  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    font-size: ${({ theme: { fontSizes }, withSubtitle, titleSmall }) =>
      withSubtitle
        ? titleSmall
          ? fontSizes.size_66_120
          : fontSizes.size_80_130
        : titleSmall
        ? fontSizes.size_66_120
        : fontSizes.size_83_250};
    line-height: ${({ theme: { fontSizes }, withSubtitle, titleSmall }) =>
      withSubtitle
        ? titleSmall
          ? fontSizes.size_66_120
          : fontSizes.size_80_130
        : titleSmall
        ? fontSizes.size_66_120
        : "0.91em"};
    span {
      display: block;
    }
  }

  @media (min-width: 1080px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.5rem;
    h2 {
      margin-top: 0;
    }
  }

  .h2-container {
    p.subtitle {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      margin-bottom: 3rem;
      margin-top: 2rem;
    }
  }

  .sticky-container {
    position: sticky;
    top: 7rem;
  }

  /* .h2-container{
    position: relative;
    h2{
      @media (min-width: 1080px) {
        position: absolute;
        top: -20px;
      }
    }
  } */
`;

const LayersContainer = styled.div`
  margin-top: clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem); // 32px → 68px;

  @media (min-width: 1080px) {
    margin-top: 0;
  }
  @media (max-width: 550px) {
    display: ${({ noSlider }) => (noSlider ? "block" : "none")};
  }
`;

const ButtonContainer = styled.div`
  margin-top: clamp(1.25rem, calc(0.82rem + 2.17vw), 3.5rem);
  @media (max-width: 800px) {
    text-align: center;
    margin-top: 3rem;
  }
`;
