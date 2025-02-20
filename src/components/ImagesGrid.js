import styled from "styled-components";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import getPath from "@/utils/getPath";

export default function ImagesGrid({ mt, data: images }) {
  if (!images) return <></>;
  return (
    <Container mt={mt}>
      {images.map((image, i) => (
        <ImageContainer key={i}>
          <Image src={getPath(image.attributes.url)} alt={image?.attributes?.alternativeText ? image?.attributes?.alternativeText : `Immagine ${i} Griglia di immagini`} fill sizes="100%"/>
        </ImageContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  ${centerContent}
  display: grid;
  row-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(
      2,
      calc(clamp(33rem, calc(1rem + 50vw), 61rem) / 2)
    );
    column-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px

    div:nth-child(1) {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
    div:nth-child(2) {
      grid-column: 3 / span 2;
    }
  }
`;

const ImageContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  max-height: clamp(25rem, calc(19.84rem + 22.03vw), 33.94rem); // 400px → 543px
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1024px) {
    max-height: max-content;
  }
`;
