import React, { useState, useRef } from 'react';
import { Heading, Container, Text, AspectRatio, Box, Progress } from '@chakra-ui/react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { HeadingDefault, LightTitle } from './styled-components';

const Timeline = ({ data }) => {
  const [progress, setProgress] = useState(0);
  const splideRef = useRef(null);

  if (!data || !Array.isArray(data.steps)) {
    return (
      <Text textAlign="center" color="gray.500">
        Nessun evento disponibile
      </Text>
    );
  }

  return (
    <Container maxW="120rem" mx="auto" py="50px" textAlign="center">
      {data?.pretitle && (
        <LightTitle textAlign="center" marginBottom="20px">
          {data?.pretitle}
        </LightTitle>
      )}
      {data?.title && (
        <HeadingDefault red textAlign="center" marginBottom="90px" mobile="margin-bottom: 50px;">
          {data?.title}
        </HeadingDefault>
      )}

      {/* Carosello Splide */}
      <Splide
        ref={splideRef}
        options={{
          type: 'slide',
          perPage: 3.5,
          gap: '30px',
          pagination: false,
          arrows: true,
          breakpoints: {
            640: { perPage: 1.5 },
            768: { perPage: 2.5 },
            1024: { perPage: 3.5 },
          },
        }}
        onMoved={(splide) => {
          const progressValue = (splide.index / (splide.length - 1)) * 100;
          setProgress(progressValue);
        }}>
        {data?.steps.map((step, i) => (
          <SplideSlide key={i} style={{ textAlign: 'left', maxWidth: '390px', display: 'flex', flexDirection: 'column' }}>
            <Box maxW="350px" display="flex" flexDirection="column" height="100%">
              <Heading
                maxW="267px"
                fontSize="30px"
                fontWeight="700"
                textAlign="left"
                color="#FC1333"
                mb="30px"
                minH="80px"
                display="flex"
                alignItems="center">
                {step?.title}
              </Heading>
              <AspectRatio maxW="350px" h="179px" mb="30px">
                <Image
                  src={step?.image?.data ? `https://www.netstrategy.it${step?.image?.data.attributes?.url}` : '/placeholder.svg'}
                  width={350}
                  height={179}
                  alt={step?.title}
                />
              </AspectRatio>
              <Text color="#000" fontSize="20px" flex="1">
                {step?.content}
              </Text>
            </Box>
          </SplideSlide>
        ))}
      </Splide>

      {/* Barra di progresso */}
      <Progress value={progress} size="sm" colorScheme="red" mt={4} />
    </Container>
  );
};

export default Timeline;
