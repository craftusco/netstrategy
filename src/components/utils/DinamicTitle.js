import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import typeWriter from "@/utils/typeWriterText";

export default function DinamicTitle({ names }) {

  const containerRef = useRef();
  const titleRef = useRef();
  const values = names.split("\n");
  
  useEffect(() => {
    setTimeout(() => {
      titleRef.current.innerHTML = '';
      typeWriter(titleRef.current, values);
    }, 1000)
  }, []);

  return (
    <Text ref={containerRef}>
      <Title ref={titleRef}>Netstrategy</Title>
      <IndicatorContainer>
        <Indicator></Indicator>
      </IndicatorContainer>
    </Text>
  );
}

const Text = styled.div`
  width: 100%;
  bottom: 4rem;
  z-index: 1000;
  display: flex;
  @media (min-width: 1280px) {
    bottom: 2rem;
  }

  /* @media (max-width: 600px) {
    bottom: 7rem;
  } */
`;

const Title = styled.span`
  text-transform: uppercase;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_60_250};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  color: ${({ theme: { colors } }) => colors.primaryColor};
  line-height: 0.91em;
  display: inline-block;

  span {
    display: block;
  }
`;

const IndicatorContainer = styled.div`
  display: block;
  width: calc(3px + 0.3vw);
  margin-left: 10px;
  padding: 0.5vw 0px;
  display: flex;
`;

const Indicator = styled.div`
  flex: 1;
  animation: blink 0.85s infinite;
  background-color:  ${(props) => props.theme.colors.primaryColor} ;
  will-change: opacity;
  @keyframes blink {
    0% {
      /* background-color: transparent; */
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
