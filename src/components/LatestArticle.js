import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import { centerContent } from "@/styles/mixins";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import RedLink from "./utils/RedLink";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/all";
import { ScrollToPlugin } from "gsap/all";
import getPath from "@/utils/getPath";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import BlogTitle from "@/components/BlogTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");
gsap.registerPlugin(ScrollTrigger);

export default function LatestArticle({
  data,
  mt,
  slug,
  staticData,
  btnIsScroll,
  showBtn = true,
  blogTitle = ''
}) {

  if (!data) return <></>;
  //! REFS ---
  const containerRef = useRef();
  const infoRef = useRef();
  const paragraphRef = useRef();
  //const [latestArticle, setLatestArticle] = useState({attributes: {}})
  //! SCROLL ----
  useEffect(() => {
    let SpecialistCtx = gsap.context(() => {
      // paragraph & cta
      gsap.from(paragraphRef.current, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      });
      // video Y
      gsap.from(`.videoRef`, {
        y: "50%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=10%",
          end: "-35% center",
          scrub: 1,
        },
      });
      // video scale
      gsap.from(`.videoRef > video`, {
        scale: "1",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          // markers: true,
        },
      });
      // info
      gsap.from([infoRef.current], {
        y: "500%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      });
    }, containerRef.current);
    return () => {
      SpecialistCtx.revert();
    };
  }, []);

  useEffect(() => {
      gsap.utils.toArray(".specialist-video").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "-20% 100%",
            once: true,
            onEnter: () => {
                el.querySelector('source').setAttribute('src', el.querySelector('source').dataset.src);
                el.load();
                el.play();
            },
          },
        });
      });
   
  }, []);

  return (
    <>
      <BlogTitle
        date={data.createdAt}
        title={blogTitle}
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
      />
      <Container ref={containerRef}>
        {/* Video data.attributes.cover_image */}
        <div><Image width={550} height={550} src={getPath(data?.immagine_home_page?.data?.attributes?.url)} className="img-full-rounded" alt={data.titolo} style={{maxWidth: '100%', height: 'auto'}} /></div>
        {/* Info */}
        <InfoContainer ref={infoRef}>
          <span>Autore</span>
          <span><a href={`/author/${data?.utente?.data?.attributes?.slug}`}>{data?.utente?.data?.attributes?.nome}</a></span>
        </InfoContainer>
        {/* Paragraph & cta */}
        <ParagraphContainer ref={paragraphRef} showBtn={showBtn}>
          {data.titolo && <h3>{data.titolo}</h3>}
          <ReactMarkdown>{data.riassunto_home_page}</ReactMarkdown>
          {showBtn ? (
            btnIsScroll ? (
              <BtnContainerDesktop
                onClick={() => {
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: "#contact",
                    ease: "Power3.easeOut",
                  });
                }}
              >
                <PrimaryButton>{staticData.cta}</PrimaryButton>
              </BtnContainerDesktop>
            ) : (
              <BtnContainerDesktop>
                {/* data.meta_thumbnail?.data ? getPath(data.meta_thumbnail.data) : data.cover_image
            ? data.cover_image
            : data.immagine && data.immagine?.data
            ? getPath(data.immagine.data.url)
            : "" */}
                <RedLink
                  img={getPath(data.immagine?.data?.attributes?.url)}
                  link={getPath(`/${data?.categoria?.data?.attributes?.slug}/${data.slug}`, true)}
                >
                  <PrimaryButton>{staticData.cta_blog}</PrimaryButton>
                </RedLink>
              </BtnContainerDesktop>
            )
          ) : (
            ""
          )}
        </ParagraphContainer>
        {showBtn ? (
          btnIsScroll ? (
            <BtnContainerMobile
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: "#contact",
                  ease: "Power3.easeOut",
                });
              }}
            >
              <PrimaryButton>{staticData.cta}</PrimaryButton>
            </BtnContainerMobile>
          ) : (
            <BtnContainerMobile>
              <RedLink img={getPath(data.immagine?.data?.attributes?.url)} link={getPath(`/${data?.categoria?.data?.attributes?.slug}/${data.slug}`, true)}>
                <PrimaryButton>{staticData.cta_blog}</PrimaryButton>
              </RedLink>
            </BtnContainerMobile>
          )
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  display: grid;
  row-gap: 2.5rem;
  column-gap: 2rem;

  .img-full-rounded {
    border-radius: 50%;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 1fr auto 1fr;
    place-items: center;

    & div:nth-child(1) {
      order: 2;
    }

    & div:nth-child(2) {
      order: 1;
    }

    & div:nth-child(3) {
      order: 3;
    }
  }
`;

const VideoContainer = styled.div`
  width: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem);
  height: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem);
  aspect-ratio: 1 / 1;
  justify-self: center;
  position: relative;
  border-radius: 50%;
  @media (max-width: 550px) {
    width: 100%;
    height: 100%;
  }

  video {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative !important;
    display: block;
  }
`;

const InfoContainer = styled.div`
  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
  }

  & span:first-child {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  span {
    display: block;
    line-height: 1.1em;
  }
`;

const ParagraphContainer = styled.div`
  width: ${({ showBtn }) => (showBtn ? "100%" : "100%")};
  /* text-align: ${({ showBtn }) => (showBtn ? "initial" : "right")}; */
  margin-left: auto;
  font-family: ${(props) => props.theme.fonts.regular};

  h3 {
    color: ${(props) => props.theme.colors.primaryColor};
    margin-bottom: 30px;
    font-size: ${(props) => props.theme.fontSizes.size_16_25};
  }

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1280px) {
    width: 85%;
    margin: 0 auto;
  }

  @media (min-width: 1455px) {
    width: 70%;
  }
`;

const BtnContainerMobile = styled.div`
  margin-top: clamp(0rem, calc(-0.83rem + 3.54vw), 2rem); // 0px → 32px
  display: flex;
  justify-content: center;

  @media (min-width: 1280px) {
    display: none;
  }
`;

const BtnContainerDesktop = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: inline-block;
    margin-top: clamp(1.25rem, calc(1.01rem + 1.2vw), 2.5rem);
  }
`;

const MuteIconContainer = styled.div``;
