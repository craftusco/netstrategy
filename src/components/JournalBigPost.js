import styled from "styled-components";
import Image from "next/image";
import splitText from "@/utils/splitText";
import { centerContent } from "@/styles/mixins";

export default function JournalBigPost() {
  return (
    <Container className="no_highlights">
      <HeadingContainer>
        <Heading>
          <h2>
            {splitText(`Product
                how to make
                it better`)}
          </h2>
          <span>Feb/n°004.23</span>
        </Heading>
      </HeadingContainer>
      <ImageWrapper>
        <ImageContainer>
          <Image src="/test2.jpg" alt="Immagine Articolo" fill sizes="100%"/>
        </ImageContainer>
      </ImageWrapper>
    </Container>
  );
}

// Style
const Container = styled.div`
  max-width: 120rem;
  margin-inline: auto;
  cursor: pointer;
  transition: all 0.2s ease-in;
  padding-bottom: clamp(2rem, calc(0.97rem + 4.4vw), 6.25rem);

  &:hover {
    background: #f6f6f6;
  }
`;

const HeadingContainer = styled.div`
  padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
`;

const Heading = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};

  & > span {
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: clamp(1.05rem, calc(0.7rem + 1.5vw), 2.5rem); // 16.8px → 30.00px
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  h2 {
    margin-bottom: 1rem;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ImageWrapper = styled.div`
  ${centerContent}
  margin-top: 1.5rem;
  padding-left: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  padding-right: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
`;

const ImageContainer = styled.div`
  height: clamp(27rem, calc(19.96rem + 30.03vw), 56rem); // 432px → 896px
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
