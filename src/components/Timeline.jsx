import React, { useState, useEffect, useRef } from "react";
import { Heading, Container, Text, AspectRatio, Box, Flex } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HeadingDefault, LightTitle } from "./styled-components";

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
    <Container maxW="120rem" py="50px" textAlign="center">
      {/* Titoli */}
      {data?.pretitle && <LightTitle textAlign="center" marginBottom="20px">{data.pretitle}</LightTitle>}
      {data?.title && <HeadingDefault red textAlign="center" marginBottom="90px" mobile="margin-bottom: 50px;">{data.title}</HeadingDefault>}

      {/* Timeline Scroll */}
      <Flex ref={timelineRef} gap="50px" overflow="hidden" className="timeline-wrapper">
        {data?.steps.map((step, i) => (
          <Box key={i} className="timeline-item" w="380px" display="flex" flexDirection="column" height="100%">
            {/* Titolo */}
            <Heading fontSize="30px" fontWeight="700" textAlign="left" color="#FC1333" mb="30px" minH="80px" display="flex" alignItems="center">
              {step?.title}
            </Heading>

            {/* Immagine */}
            <AspectRatio maxW="350px" h="179px" borderRadius="10px" mb="30px">
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
      <Box position="relative" width="100%" height="10px" bg="gray.200" mt={6} className="progress-wrapper">
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
