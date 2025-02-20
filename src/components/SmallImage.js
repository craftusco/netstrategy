import styled from "styled-components";
import Image from "next/image";

export default function SmallImage({
  data: image,
  altText,
  mt,
  forceHeight = true,
  paddingInline = true,
}) {
  if (!image) return <></>;
  return (
    <Container mt={mt} paddingInline={paddingInline}>
      <ImageContainer forceHeight={forceHeight}>
        <Image
          src={image}
          alt={altText ? altText : "Immagine Piccola"}
          fill
          sizes="100%"
          priority={true}
        />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  /* margin-inline: ${(props) => (props.paddingInline ? "auto" : "0")}; */
  margin-inline: 0;
  display: flex;
  justify-content: flex-end;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  /* aspect-ratio: 4/3; */
  overflow: hidden;
  position: relative;

  img {
    border-radius: 1rem !important;
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
