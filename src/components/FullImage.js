import styled from "styled-components";
import Image from "next/image";
import getPath from "@/utils/getPath";

export default function FullImage({
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
          src={getPath(image)}
          alt={altText ? altText : "Immagine"}
          fill
          sizes="100%"
          priority={true}
        />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  padding-left: ${(props) =>
    props.paddingInline
      ? "clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem)"
      : "0"};
  padding-right: ${(props) =>
    props.paddingInline
      ? "clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem)"
      : "0"};

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }
  max-width: 120rem;
  margin-inline: ${(props) => (props.paddingInline ? "auto" : "0")};
`;

const ImageContainer = styled.div`
  height: ${({ forceHeight }) =>
    forceHeight
      ? "clamp(18rem, calc(8.78rem + 39.35vw), 56rem);"
      : "initial"}; // 288px → 896px
  overflow: hidden;
  border-radius: clamp(0rem, calc(-0.3rem + 1.29vw), 1.25rem); // 0px → 20px
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
