import React from "react";
import Image from "next/image";
import styled from "styled-components";

export default function StaticImages({ imgs, imgsWhite }) {
  const arrayImages = imgs ? [...imgs] : [];
  return (
    <Container>
      {arrayImages.map((e, i) => (
        <ImageContainer key={i}>
          <Image
            sizes="100%"
            alt={e}
            key={i}
            src={e}
            fill
            style={{
              filter: imgsWhite ? "invert(100%)" : "opacity(.8)",
            }}
          />
        </ImageContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 4rem;
  img {
    position: relative !important;
    object-fit: contain;
    max-width: 7.5rem;
    min-width: 6.5rem;
    /* height: 100px; */
    max-height: 5rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
`;
