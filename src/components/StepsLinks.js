import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef, useState } from "react";
import splitText from "@/utils/splitText";
import PrimaryButton from "./utils/PrimaryButton";
import LayersList from "@/components/LayersList";
import ProjectStepsSlider from "@/components/ProjectStepsSlider";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollToPlugin);

const data = {
  titolo: `Project 
  steps.`,
  sottotitolo: `Un approccio multicanale alla comunicazione`,
};

export default function StepsLinks({ mt, steps, sottotitolo }) {
  if (!data) return <></>;
  
  const containerRef = useRef();
  const [activeListItem, setActiveListItem] = useState(0);
  const handleClickRef = useRef(null);

  useEffect(() => {
    handleClickRef.current = (anchor) => {
      // console.log(window.document.getElementById("social"));
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: anchor, offsetY: "100" },
      });
    };
  }, []);

  const handleButtonClick = (anchor) => {
    handleClickRef.current(anchor); 
  };

  //! COMPONENT
  return (
    <Container mt={mt} ref={containerRef}>
      <Content>
        {/* Heading */}
        <div>
          <h2>{splitText(data.titolo)}</h2>
          <h3>{sottotitolo && splitText(sottotitolo)}</h3>
        </div>
        {/* Layers */}
        <LayersContainer>
          {steps.map(({ name, anchor }, i, arr) => (
            <Layer
              key={i}
              onClick={() => {
                setActiveListItem(i);
                handleButtonClick(anchor);
              }}
              className={i === arr.length - 1 ? "is_last" : ""}
            >
              <svg
                className={activeListItem == i ? "active" : ""}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 61.957 61.592"
              >
                <g
                  id="Raggruppa_401"
                  data-name="Raggruppa 401"
                  transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                >
                  <path
                    id="Tracciato_8"
                    data-name="Tracciato 8"
                    d="M0,43.811,21.905,21.905,0,0"
                    transform="translate(30.318 0)"
                    fill="none"
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
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                </g>
              </svg>
              <span className={activeListItem == i ? "title_h3 active" : "title_h3"}>{name}</span>
            </Layer>
          ))}
        </LayersContainer>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
`;

const Content = styled.div`
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
  
  & > div > h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    margin-top: clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem); // 32px → 68px;
  }
  
  @media (min-width: 1080px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 5rem;
    
    h2 {
      margin-top: 0;
    }
  }
`;

const LayersContainer = styled.div`
  margin-top: clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem); // 32px → 68px;

  @media (min-width: 1080px) {
    margin-top: 0;
  }
`;

// LAYER
const Layer = styled.div`
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV1};
  padding: 1.5rem 0; //
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  cursor: pointer;

  &:first-child {
    padding-top: 0;
  }

  &.is_last {
    border: 0;
  }

  & > span.title_h3 {
    text-transform: uppercase;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    &.active {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
    @media (max-width: 1280px) {
      margin-top: initial;
    }
  }

  svg {
    transition: transform 350ms;
    transform: rotate(270deg);
    stroke: ${({ theme: { colors } }) => colors.blackColorV1};
    width: clamp(2rem, calc(1.76rem + 1.04vw), 3rem);
    &.active {
      stroke: ${({ theme: { colors } }) => colors.primaryColor};
      transform: rotate(270deg) translateX(-5px);
    }
  }

  @media (min-width: 1080px) {
    &:last-child {
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV1};
    }
  }
`;
