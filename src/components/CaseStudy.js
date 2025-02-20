import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import Image from "next/image";
import ReadMoreButton from "./utils/ReadMoreButton";
import { centerContent } from "@/styles/mixins";
import RedLink from "./utils/RedLink";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import getPath from "@/utils/getPath";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function CaseStudy({ data, mt, btnText = null }) {
  if (!data) return <></>;
  const containerRef = useRef();
  useEffect(() => {
    let caseStudyCtx = gsap.context(() => {
      gsap.from(".case-study-content-ref > *", {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top bottom-=20%",
          scrub: 1.5,
        },
      });
    }, containerRef.current);

    return () => {
      caseStudyCtx.revert();
    };
  }, []);
  return (
    <Container mt={mt} ref={containerRef} id="case-study">
      <span className="subtitle">
        Storie di successo:
      </span>
      {/* Heading */}
      <h2>
        <span>{data.title}</span>
      </h2>
      <Content className="case-study-content-ref">
        <ImageContainer>
          <Image
            src={getPath(data.immagine.data.attributes.url)}
            alt={`Caso di successo ${data.title}`}
            fill
            sizes="100%"
          />
        </ImageContainer>
        {/* Info */}
        <Info>
          <InfoContent>
            {/* Results */}
            <Results>
              {data.info_success.map(({ valore, nome }, i) => (
                <Risultato key={i}>
                  <span className="figure">{valore}</span>
                  <span className="description">{nome}</span>
                </Risultato>
              ))}
            </Results>
            {/* Pm */}
            {data.utente?.data && <Pm>
              <PmImageContainer>
                <Image
                  src={
                    data.utente.data.attributes.immagine
                      ? getPath(
                          data.utente.data.attributes.immagine?.data.attributes
                            .url
                        )
                      : ""
                  }
                  alt={`Project manager ${
                    data.utente.data.attributes.nome
                      ? data.utente.data.attributes.nome
                      : ""
                  }`}
                  fill
                  sizes="100%"
                />
              </PmImageContainer>
              <PmText>
                {/* utente */}
                <span>Meet</span>
                <span>{data.utente.data.attributes.nome}</span>
                <span>{data.utente.data.attributes.ruolo}</span>
              </PmText>
            </Pm>}
          </InfoContent>
          {/* Btns */}
          <Buttons>
            <RedLink
              link={"/successi"}
              img={getPath(
                "/uploads/successi_netstrategy_header_b79d5bf26c.jpg"
              )}
            >
              <ReadMoreButton />
            </RedLink>
            <div
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: "#contact",
                  ease: "Power3.easeOut",
                });
              }}
            >
              <PrimaryButton>{btnText ? btnText : "Contattaci"}</PrimaryButton>
            </div>
          </Buttons>
        </Info>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}

  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_180};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  span.subtitle {
    display: block;
    /* font-size: clamp(1rem, calc(0.94rem + 0.26vw), 1.25rem); */
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    max-width: 80%;
    margin-bottom: 0.5rem;
  }
`;

const Content = styled.div`
  @media (min-width: 1450px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  margin-top: 1.5rem; //
  border-radius: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  overflow: hidden;
  height: clamp(16.5rem, calc(10.19rem + 26.93vw), 42.5rem); // 264px → 680px
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1450px) {
    order: 2;
    width: 59%;
  }
`;

const Info = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  row-gap: clamp(2rem, calc(1.15rem + 3.62vw), 5.5rem); // 32px → 88px
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};

  @media (min-width: 1450px) {
    width: 39%;
    align-self: end;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  row-gap: clamp(2rem, calc(1.15rem + 3.62vw), 5.5rem);
  gap: 2rem;

  @media (min-width: 1450px), (max-width: 650px) {
    flex-direction: column;
  }
`;

const Results = styled.div`
  flex-grow: 1;
  max-width: 450px;

  ul {
    list-style-type: none;
    /* margin-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px */
    li {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
      position: relative;
      font-family: ${({ theme: { fonts } }) => fonts.medium};

      span {
        font-size: calc(
          ${({ theme: { fontSizes } }) => fontSizes.size_16_20} * 1.75
        );
        font-weight: 700;
        font-family: inherit;
        color: ${({ theme: { colors } }) => colors.primaryColor};
        margin-right: 0.3rem;
        margin-left: 0.5rem;
      }
    }
  }
`;

const Pm = styled.div`
  display: flex;
  align-items: center;
  column-gap: clamp(1rem, calc(0.88rem + 0.52vw), 1.5rem); // 16px → 24px
`;

const PmImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: clamp(6rem, calc(5.51rem + 2.07vw), 8rem); // 96px → 128px
  height: clamp(6rem, calc(5.51rem + 2.07vw), 8rem); // 96px → 128px
  position: relative;

  img {
    object-fit: cover;
    object-position: top;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const PmText = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  text-transform: uppercase;

  & span:nth-child(1) {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  span {
    display: block;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1080px) {
    padding-right: 50px;
  }
  @media (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;
    row-gap: 1.5rem;
  }
`;

const Risultato = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  .figure {
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_50_60};
    text-transform: uppercase;
  }
  .description {
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: 20px;
    padding-bottom: 0.75rem;
  }
`;
