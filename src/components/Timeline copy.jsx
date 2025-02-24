import React, { useState, useEffect, useRef } from "react";
import { Heading, Text, AspectRatio, Box, Flex } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HeadingDefault, LightTitle } from "./styled-components";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

const Timeline = ({ data }) => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    const progressBar = progressRef.current;
    const sections = gsap.utils.toArray(".timeline-item");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        start: "top top",
        end: () => `+=${timeline.offsetWidth}`,
        onUpdate: (self) => {
          setProgress(self.progress * 100);
          progressBar.style.width = `${self.progress * 100}%`;
        },
      },
    });
  }, []);

  if (!data || !Array.isArray(data.steps)) {
    return <Text textAlign="center" color="gray.500">Nessun evento disponibile</Text>;
  }

  return (
    <Container textAlign="center">
      {/* Titoli */}
      {data?.pretitle && <LightTitle textAlign="center" marginBottom="20px">{data.pretitle}</LightTitle>}
      {data?.title && <HeadingDefault red textAlign="center" marginBottom="90px" mobile="margin-bottom: 50px;">{data.title}</HeadingDefault>}

      {/* Timeline Scroll */}
      <Flex ref={timelineRef} gap="50px" overflow="hidden" className="timeline-wrapper">
        {data?.steps.map((step, i) => (
          <Box key={i} className="timeline-item" w="calc(100% / 3.5)" display="flex" flexDirection="column" height="100%">
            {/* Titolo */}
            <Heading fontSize="30px" fontWeight="700" textAlign="left" color="#FC1333" mb="30px" minH="80px" display="flex" alignItems="center">
              {step?.title}
            </Heading>

            {/* Immagine */}
            <AspectRatio w="100%" maxW="390px" h="179px" borderRadius="10px" mb="30px">
              <Image
                src={step?.image?.data ? `https://www.netstrategy.it${step.image.data.attributes?.url}` : "/placeholder.svg"}
                width={350}
                height={179}
                style={{ borderRadius: "10px" }}
                alt={step?.title}
              />
            </AspectRatio>

            {/* Contenuto */}
            <Text color="#000" fontSize="20px" letterSpacing="0.4px" flex="1">{step?.content}</Text>
          </Box>
        ))}
      </Flex>

      {/* Progress Bar */}
      <Box position="sticky" top="0" width="100%" height="10px" bg="gray.200" mt={6} className="progress-wrapper">
        <Box ref={progressRef} height="100%" width="0%" bg="red.500" className="progress-bar" />
      </Box>

      {/* Dots Indicator */}
      <Flex justifyContent="center" mt={4} className="dots-container">
        {Array.from({ length: data.steps.length }).map((_, index) => (
          <Box key={index} className={`dot ${index <= (progress / 100) * (data.steps.length - 1) ? "active" : ""}`} />
        ))}
      </Flex>
    </Container>
  );
};

export default Timeline;

const Container = styled.div`
  padding: 60px 0;
  margin-left: 120px; 
  .timeline-wrapper {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 50px 0;
    -webkit-overflow-scrolling: touch;
    gap: 30px;
    position: relative;
    overflow: hidden;
    scroll-snap-type: x mandatory; 
  }

  .timeline-item {
    flex: 0 0 calc(100% / 3.5); 
    margin: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    scroll-snap-align: start; /* Ensure it snaps properly */
  }

  .progress-wrapper {
    position: sticky;
    top: 0; /* Fix progress bar to the top of the screen */
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #ccc; /* Ensure visibility */
  }

  .dot {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #ccc;
    transition: background-color 0.3s;
  }

  .dot.active {
    background-color: #FC1333;
  }

  @media screen and (max-width: 900px) {
    .timeline-wrapper {
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      gap: 20px;
      scroll-snap-type: y mandatory; /* Snap vertically on mobile */
      flex-direction: column; /* Stack items vertically */
    }

    .timeline-item {
      flex: 0 0 100%; /* Each item takes full width */
      scroll-snap-align: center; /* Center the item in view */
    }

    .sticky-container {
      display: none;
    }
  }
`;
