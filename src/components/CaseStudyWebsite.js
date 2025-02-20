import { centerContent } from "@/styles/mixins";
import getPath from "@/utils/getPath";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudyWebsite({
  mt,
  title,
  data,
  titleColor = grey,
  longText = null,
  direction = "ltr",
  showImgs = true,
  customVideo = null
}) {
  if (!data) return <></>;

  //! REFS
  // const [isSafari, setIsSafari] = useState();

  const videoSingoli = data.video_singolo.map((el) => {
    return {
      paragrafo: el.descrizione,
      video: el.video.data
        ? getPath(el.video.data.attributes.url)
        : "/freddo-prova1.mp4",
      altText: el?.video?.data?.attributes?.alternativeText
        ? el?.video?.data?.attributes?.alternativeText
        : "Risultato sito web caso di successo",
    };
  });

  const videoMultipli = data.video_multiplo.map((el) => {
    return {
      paragrafo: el.descrizione,
      video_mobile: el.video_mobile.data
        ? getPath(el.video_mobile.data.attributes.url)
        : "/freddo-prova1.mp4",
      altText_video_mobile: el?.video_mobile?.data?.attributes?.alternativeText
        ? el?.video_mobile?.data?.attributes?.alternativeText
        : "Risultato sito web caso di successo",
      video_desktop: el.video_desktop.data
        ? getPath(el.video_desktop.data.attributes.url)
        : "/freddo-prova1.mp4",
      altText_video_desktop: el?.video_desktop?.data?.attributes
        ?.alternativeText
        ? el?.video_mobile?.data?.attributes?.alternativeText
        : "Risultato sito web caso di successo",
    };
  });

  //! Video start when in viewport
  useEffect(() => {
    // Check for safari
    // let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    // setIsSafari(isSafari);

    // if (true) {
    gsap.utils.toArray(".websiteVideoRefs").forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "-20% 50%",
          onEnter: () => {
            el.firstElementChild.play();
          },
        },
      });
    });
    // }
  }, []);

  //! COMPONENT

  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Se su strapi compilato parametro longText fare grafica con video uno sotto l'altro (HVB) altrimenti la 'classica' grafica */}
      {longText == null ? (
        <Container mt={mt} titleColor={titleColor}>
          <h2>{title}</h2>
          {/* Content */}

          <Content>
            {videoSingoli.map(({ video, paragrafo, altText }, i) => (
              <Single key={i} reverse={data.reverse}>
                <MediaSingleContainer
                  className={
                    /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                      video
                    )
                      ? "websiteVideoRefs"
                      : null
                  }
                >
                  {/\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                    video
                  ) ? (
                    <video preload="auto" muted playsInline loop>
                      <source src={video} />
                    </video>
                  ) : (
                    <Image
                      src={video}
                      alt={
                        altText
                          ? altText
                          : "Risultato sito web caso di successo"
                      }
                      fill
                      sizes="100%"
                      priority={true}
                    />
                  )}
                </MediaSingleContainer>
                {paragrafo && <ReactMarkdown children={paragrafo} />}
              </Single>
            ))}
          </Content>
        </Container>
      ) : (
        <LongTextContainer mt={mt} titleColor={titleColor}>
          <LongTextTitle>
            {(direction == "ltr" && (
              <>
                <h2 className="title">{title}</h2>
                <p className="paragrafo">{longText}</p>
              </>
            )) || (
              <RtlContainer>
                <div className="paragrafo-column">
                  <p className="paragrafo">{longText}</p>
                </div>
                <h2 className="title">{title}</h2>
              </RtlContainer>
            )}
          </LongTextTitle>
          <LongTextContent>
            {
              (!customVideo) ?
                videoSingoli.map(({ video }, i) => (
                  <MediaSingleContainer
                    key={i}
                    className={
                      /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                        video
                      )
                        ? "websiteVideoRefs"
                        : null
                    }
                  >
                    <video preload="auto" muted playsInline loop>
                      <source src={video} />
                    </video>
                  </MediaSingleContainer>
                ))
              :
                <MediaSingleContainer
                  /*className={
                    /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                      video
                    )
                      ? "websiteVideoRefs"
                      : null
                  }*/
                >
                  <video preload="auto" muted playsInline loop autoPlay>
                    <source src={getPath(customVideo)} />
                  </video>
                </MediaSingleContainer>
            }
          </LongTextContent>
        </LongTextContainer>
      )}

      {/* Images menu juice - TO HIDE BASED ON PROP */}
      {
        (showImgs) &&
          <ImagesSection>
            {data.immagine_top &&
              data.immagine_top?.data &&
              (windowWidth >= 600 ? (
                <ImageContainer>
                  <Image
                    priority={true}
                    src={getPath(data.immagine_top.data.attributes.url)}
                    alt={
                      data?.immagine_top?.data?.attributes?.alternativeText
                        ? data?.immagine_top?.data?.attributes?.alternativeText
                        : "Risultato sito web caso di successo"
                    }
                    fill
                    sizes="100%"
                    quality={100}
                  />
                </ImageContainer>
              ) : (
                <ImageContainer>
                  <Image
                    priority={true}
                    src={getPath(data.immagine_top_mobile.data.attributes.url)}
                    alt={
                      data?.immagine_top_mobile?.data?.attributes?.alternativeText
                        ? data?.immagine_top_mobile?.data?.attributes
                            ?.alternativeText
                        : "Risultato sito web caso di successo"
                    }
                    fill
                    sizes="100%"
                    quality={100}
                  />
                </ImageContainer>
              ))}
          </ImagesSection>
      }
      {/*  */}
      {data.immagine_bottom && data.immagine_bottom?.data && (
        <div
          style={{ overflowX: "scroll" }}
          className="hideScrollbar immagine_bottom"
        >
          <ImagesSectionBottom>
            <ImageContainer>
              <Image
                priority={true}
                src={getPath(data.immagine_bottom.data.attributes.url)}
                alt={
                  data?.immagine_bottom?.data?.attributes?.alternativeText
                    ? data?.immagine_bottom?.data?.attributes?.alternativeText
                    : "Risultato sito web caso di successo"
                }
                fill
                sizes="100%"
                quality={100}
              />
            </ImageContainer>
          </ImagesSectionBottom>
        </div>
      )}

      {/* ------------------------ */}
      <Container>
        <Content>
          {/* Multiple */}
          {videoMultipli.map(
            (
              {
                video_desktop,
                video_mobile,
                paragrafo,
                altText_video_mobile,
                altText_video_desktop,
              },
              i
            ) => (
              <Multiple key={i} reverse_bottom={data.reverse_bottom}>
                <MediaMobileScrollable>
                  <MediaMultipleContainerMobile
                    className={
                      /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                        video_mobile
                      )
                        ? "websiteVideoRefs"
                        : null
                    }
                  >
                    {/\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                      video_mobile
                    ) ? (
                      <video preload="auto" muted playsInline loop>
                        <source src={video_mobile} />
                      </video>
                    ) : (
                      <Image
                        priority={true}
                        src={video_mobile}
                        alt={
                          altText_video_mobile
                            ? altText_video_mobile
                            : "Risultato sito web caso di successo"
                        }
                        fill
                        sizes="100%"
                      />
                    )}
                  </MediaMultipleContainerMobile>
                </MediaMobileScrollable>
                <MediaMultipleContainerDesktop
                  className={
                    /\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                      video_desktop
                    )
                      ? "websiteVideoRefs"
                      : null
                  }
                >
                  {/\.(mp4|avi|wmv|mov|flv|mkv|webm|vob|ogv|m4v|3gp|3g2|mpeg|mpg|m2v|svi|3gpp|3gpp2|mxf|roq|nsv|f4v|f4p|f4a|f4b)$/i.test(
                    video_desktop
                  ) ? (
                    <video preload="auto" muted playsInline loop>
                      <source src={video_desktop} />
                    </video>
                  ) : (
                    <Image
                      priority={true}
                      src={video_desktop}
                      alt={
                        altText_video_desktop
                          ? altText_video_desktop
                          : "Risultato sito web caso di successo"
                      }
                      fill
                      sizes="100%"
                    />
                  )}
                </MediaMultipleContainerDesktop>
                {paragrafo && <ReactMarkdown children={paragrafo} />}
              </Multiple>
            )
          )}
        </Content>
      </Container>
    </>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  h2 {
    color: ${({ titleColor, theme: { colors } }) =>
      titleColor === "red" ? colors.primaryColor : colors.greyColorV2};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    text-align: center;

    span {
      display: block;
    }

    @media (min-width: 1000px) {
      text-align: left;
    }
  }
`;

const LongTextContainer = styled.div`
  margin-top: ${(props) => props.mt};
  h2 {
    color: ${({ titleColor, theme: { colors } }) =>
      titleColor === "red" ? colors.primaryColor : colors.greyColorV2};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    text-align: center;

    span {
      display: block;
    }

    @media (min-width: 1000px) {
      text-align: left;
    }
  }
`;

const ImageContainer = styled.div`
  /* overflow: hidden; */
  max-width: 2500px;
  margin: auto;
  position: relative;
  margin: 30px 0px;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Content = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 3rem;

  & > div:nth-child(2) {
    order: 3;
  }

  @media (min-width: 1000px) {
    & > div:nth-child(even) {
      flex-direction: row;
    }

    & > div:nth-child(2) {
      order: 2;
    }
  }
`;

const LongTextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LongTextTitle = styled.div`
  ${centerContent}
  display: flex;
  align-items: center;
  margin-block: 3rem;

  .container-title {
    /* position: relative; */
  }
  .title {
    /* position: absolute; */
    margin-right: 100px;
    line-height: 0.75;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .paragrafo {
    width: 40%;
  }

  @media (max-width: 1600px) {
    .title {
      margin-right: 60px;
    }
    .paragrafo {
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 30px;
    margin-bottom: 30px;
    align-items: flex-start;
    .title {
      /* position: absolute; */
      margin-right: 0px;
      text-align: left;
    }
    .paragrafo {
      width: 100%;
    }
  }
`;

const RtlContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: center;

  @media (min-width: 1000px) {
    h2.title {
      text-align: right;
    }

    .paragrafo-column {
      margin-inline: auto !important;
    }

    .paragrafo {
      width: 100% !important;
      max-width: 60%;
      margin-inline: auto !important;
    }
  }

  @media (max-width: 999px) {
     {
      display: flex;
      flex-flow: column-reverse;
      gap: 1rem;
    }
  }
`;

const Single = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;

  @media (min-width: 1000px) {
    flex-direction: ${(props) => (props.reverse ? "row" : "row-reverse")};
    row-gap: 0;
    column-gap: 2rem;

    & > div {
      flex: auto;
      max-width: clamp(40rem, calc(1.96rem + 60.87vw), 75rem);
    }

    & > p {
      flex: 1;
      transform: translateY(25%);
    }
  }
`;

const MediaSingleContainer = styled.div`
  /* aspect-ratio: 16/9; */
  overflow: hidden;
  position: relative;

  video {
    object-fit: contain;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Multiple
const Multiple = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  order: 2;

  @media (min-width: 1000px) {
    flex-direction: ${({ reverse_bottom }) =>
      reverse_bottom ? "row-reverse" : "row"};
    row-gap: 0;
    column-gap: 2rem;

    & > div {
      flex: auto;
      max-width: clamp(40rem, calc(1.96rem + 60.87vw), 75rem);
    }

    & > p {
      flex: 1;
      transform: translateY(25%);
    }
  }
`;

const MediaMobileScrollable = styled.div`
  overflow-x: scroll;
  justify-content: center;

  @media (min-width: 1000px) {
    display: none;
  }
`;

const MediaMultipleContainerMobile = styled.div`
  overflow: hidden;
  position: relative;
  min-width: 45rem;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const MediaMultipleContainerDesktop = styled.div`
  overflow: hidden;
  position: relative;
  display: none;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1000px) {
    display: block;
  }
`;

// --
const ImagesSection = styled.div`
  margin-top: clamp(2rem, calc(1.03rem + 4.14vw), 6rem);

  @media (min-width: 600px) {
    ${centerContent}
  }
`;

const ImagesSectionBottom = styled.div`
  ${centerContent}
  margin-top: clamp(2rem, calc(1.03rem + 4.14vw), 6rem);
  min-width: max-content;

  & > div {
    min-width: 65rem;
  }
`;
