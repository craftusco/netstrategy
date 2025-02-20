import styled from "styled-components";
import Heading from "./Heading";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import getPath from "@/utils/getPath";

export default function Restyling({ heading, data }) {
  return (
    <Container>
      <Heading data={heading} />
      {data.loghi.data != null && (
        <LogosWrapper>
          <Logos>
            {data?.loghi.data.map((logo, i) => (
              <Logo key={i}>
                {logo.attributes.ext == ".mp4" ? (
                  <video preload="auto" autoPlay muted playsInline loop>
                    <source src={getPath(logo.attributes.url)} />
                  </video>
                ) : (
                  <Image
                    src={getPath(logo.attributes.url)}
                    alt={logo?.attributes?.alternativeText ? logo?.attributes?.alternativeText : "logo prima"}
                    fill
                    sizes="100%"
                    priority={true}
                    quality={100}
                  />
                )}
              </Logo>
            ))}
          </Logos>
        </LogosWrapper>
      )}
    </Container>
  );
}

const Container = styled.div``;

const LogosWrapper = styled.div`
  ${centerContent}
`;

const Logos = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-inline: 1rem;
`;

const Logo = styled.div`
  width: calc(100% / 2 - 1rem);
  @media (max-width: 780px) {
    width: 100%;
    padding: 0.5rem;
  }
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
