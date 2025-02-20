import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import Image from "next/image";
import styled from "styled-components";

export default function ImageWithCaption({ data, mt }) {
  return (
    <Container mt={mt}>
      <ImageContainer>
        <Image src={data.img} alt={data.title ? data.title : "Immagine con copertina"} fill sizes="100%"/>
      </ImageContainer>
      <Text>
        <h3>{splitText(data.title)}</h3>
        <p>{data.paragraph}</p>
      </Text>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  @media (min-width: 1280px) {
    display: flex;
    column-gap: 6%;
  }
`;

const ImageContainer = styled.div`
  border-radius: clamp(1rem, calc(0.88rem + 0.52vw), 1.5rem); // 16px → 24px
  overflow: hidden;
  height: clamp(17rem, calc(11.42rem + 23.82vw), 40rem); // 272px → 640px

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1280px) {
    width: 44%;
  }
`;

const Text = styled.div`
  h3 {
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-weight: 100;
  }
  p {
    margin-top: clamp(2rem, calc(0.54rem + 6.21vw), 8rem); // 32px → 128px
    width: 80%;
    margin-left: auto;
  }

  @media (min-width: 1280px) {
    width: 50%;

    h3 {
      margin-top: 0;
    }
    p {
      width: 100%;
      margin-left: 0;
    }
  }
`;
