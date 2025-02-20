import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import splitText from "@/utils/splitText";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import getPath from "@/utils/getPath";
import GoalsSlider from "./GoalsSlider";
import { gsap } from "gsap";

const fallbackData = {
  titolo: "Chi siamo in cifre",
  immagine: {
    data: {
      id: 4457,
      attributes: {
        name: "agenzia-seo-subpillar-netstrategy-4.jpg",
        alternativeText: null,
        caption: null,
        width: 5472,
        height: 3648,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_agenzia_seo_subpillar_netstrategy_4_0552279a05.jpg",
            hash: "large_agenzia_seo_subpillar_netstrategy_4_0552279a05",
            mime: "image/jpeg",
            name: "large_agenzia-seo-subpillar-netstrategy-4.jpg",
            path: null,
            size: 42.94,
            width: 1000,
            height: 667,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_agenzia_seo_subpillar_netstrategy_4_0552279a05.jpg",
            hash: "small_agenzia_seo_subpillar_netstrategy_4_0552279a05",
            mime: "image/jpeg",
            name: "small_agenzia-seo-subpillar-netstrategy-4.jpg",
            path: null,
            size: 15.87,
            width: 500,
            height: 333,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_agenzia_seo_subpillar_netstrategy_4_0552279a05.jpg",
            hash: "medium_agenzia_seo_subpillar_netstrategy_4_0552279a05",
            mime: "image/jpeg",
            name: "medium_agenzia-seo-subpillar-netstrategy-4.jpg",
            path: null,
            size: 28.55,
            width: 750,
            height: 500,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_agenzia_seo_subpillar_netstrategy_4_0552279a05.jpg",
            hash: "thumbnail_agenzia_seo_subpillar_netstrategy_4_0552279a05",
            mime: "image/jpeg",
            name: "thumbnail_agenzia-seo-subpillar-netstrategy-4.jpg",
            path: null,
            size: 5.73,
            width: 234,
            height: 156,
          },
        },
        hash: "agenzia_seo_subpillar_netstrategy_4_0552279a05",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 801.45,
        url: "/uploads/agenzia_seo_subpillar_netstrategy_4_0552279a05.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-26T07:33:28.216Z",
        updatedAt: "2023-07-26T07:33:28.216Z",
      },
    },
  },
  obbiettivi: [
    {
      id: 25,
      argomento: "Numero di progetti",
      titolo: "Progetti SEO sviluppati: +130",
      paragrafo:
        "Grazie alla passione, a un’elevata conoscenza e un continuo aggiornamento sulle dinamiche SEO, in oltre 10 anni abbiamo aiutato oltre 130 aziende a raggiungere i propri obiettivi.",
    },
    {
      id: 27,
      argomento: "Click e impression",
      titolo: "Traffico organico: +42%",
      paragrafo:
        "Il primo segnale che ci comunica che una strategia SEO sta avendo successo è proprio l’aumento dei contatti: Infatti, dopo un anno di strategia, la crescita media del traffico dei nostri progetti è di circa il 42%.",
    },
    {
      id: 29,
      argomento: "Tasso di conversione",
      titolo: "Conversioni eCommerce: +34%",
      paragrafo:
        "Così come la crescita dei contatti, anche l'aumento delle conversioni rappresenta un indicatore importante per valutare l'efficacia delle strategie SEO applicate da un’azienda. I nostri progetti SEO eCommerce registrano crescite attorno al 34% anno su anno.",
    },
    {
      id: 31,
      argomento: "Soddisfazione del cliente",
      titolo: "Tasso di rinnovo: 89%",
      paragrafo:
        "Quasi 9 clienti su 10 rinnovano un progetto SEO dopo i primi 12 mesi di collaborazione. Ciò, oltre a riempirci di entusiasmo, indica che le nostre attività portano vero valore alle aziende dei nostri clienti.",
    },
  ],
  loghi_aziende: {
    data: null,
  },
};

export default function Goals({ data = fallbackData, mt, number = false }) {
  if (!data) return <></>;
  const containerRef = useRef();
  const goalsRef = useRef([]);
  const imageRef = useRef();
  //! Scroll animation
  useEffect(() => {
    let goalsCtx = gsap.context(() => {
      gsap.from(goalsRef.current, {
        y: "30%",
        ease: "easeInOut",
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0% bottom",
          end: "center bottom-=20%",
          scrub: 1.5,
        },
      });
      gsap.from(".goal-refs-class > *", {
        y: "30%",
        ease: "easeInOut",
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0% bottom",
          end: "center center",
          scrub: 1.5,
        },
      });
      // Image scale
      gsap.from(imageRef.current, {
        scale: 1.15,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-100% top",
          end: "100% bottom",
          scrub: 1,
        },
      });
    }, containerRef.current);

    return () => {
      goalsCtx.revert();
    };
  }, []);
  return (
    <Container mt={mt}>
      <Content>
        <ImageContainer>
          <Image
            ref={imageRef}
            src={getPath(data?.immagine?.data?.attributes?.url)}
            fill
            sizes="100%"
            quality={100}
            alt={data?.immagine?.data?.attributes?.alternativeText ? data?.immagine?.data?.attributes?.alternativeText : "Immagine rappresentativa obiettivi"}
          />
          {/* <img
            alt="test" 
            src={getPath(data.immagine.data.attributes.url)} 
          >
          </img> */}
        </ImageContainer>
        <GoalsContainer ref={containerRef}>
          {data.obbiettivi.map((el, i) => (
            <Goal
              className="goal-refs-class"
              number={number}
              key={i}
              ref={(el) => (goalsRef.current[i] = el)}
            >
              {el.argomento && <span>{el.argomento}</span>}
              {el.icona.data && (
                <IconContainer>
                  <Image
                    src={getPath(el.icona.data.attributes.url)}
                    alt={getPath(el.icona.data.attributes.alternativeText ? el.icona.data.attributes.alternativeText : `icona ${el.titolo}`)}
                    fill
                    sizes="100%"  
                  />
                </IconContainer>
              )}
              <h3 className="title">{splitText(el.titolo)}</h3>
              <p>
                <ReactMarkdown
                  components={{
                    p: React.Fragment,
                  }}
                >
                  {el.paragrafo}
                </ReactMarkdown>
              </p>
            </Goal>
          ))}
        </GoalsContainer>
        <GoalsSlider data={data.obbiettivi}></GoalsSlider>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  ${centerContent}/* @media (min-width: 768px) {
    p {
      width: 80%;
      margin-left: auto;
    }
  } */
`;

const Content = styled.div`
  @media (min-width: 1300px) {
    display: flex;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  display: none;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1300px) {
    display: block;
    width: 33%;
    max-height: clamp(35rem, calc(-2.7rem + 38.92vw), 44rem); // 560px → 704px
    position: sticky;
    top: 7rem;
  }
`;

const IconContainer = styled.div`
  overflow: hidden;
  position: relative;
  max-width: 7rem;

  img {
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`

const GoalsContainer = styled.div`
  display: grid;
  @media (max-width: 600px) {
    display: none;
  }

  @media (min-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 3rem;

    p {
      width: 100%;
      margin-left: 0;
    }
  }

  @media (min-width: 1300px) {
    width: 60%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 3rem;

    p {
      width: 100%;
      margin-left: 0;
    }

    /* & div:nth-child(1) > span {
      display: flex;
      align-items: center;
      column-gap: 1rem;
    }
      &:before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: black;
      }
    } */
  }
`;

const Goal = styled.div`
  border-top: 1px solid;
  padding-top: 2rem;
  padding-bottom: clamp(1.5rem, calc(0.53rem + 4.14vw), 5.5rem); // 24px → 88px
  /* &:nth-child(3),&:nth-child(4){
    border-bottom: 1px solid black;
  } */

  & > span {
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  span.title, h3.title {
    display: block;
    margin-top: clamp(2rem, calc(1.15rem + 3.62vw), 5.5rem); // 32px → 88px
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${(props) =>
      props.number
        ? "clamp(5.19rem, calc(2.65rem + 10.81vw), 15.63rem)"
        : "clamp(3.56rem, calc(2.91rem + 2.78vw), 6.25rem)"};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  p {
    margin-top: 1.5rem;
  }
`;
