import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Logo from "./utils/Logo";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import splitText from "@/utils/splitText";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/all";
import { useDispatch, useSelector } from "react-redux";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import { ScrollToPlugin } from "gsap/all";
import PlayIcon from "./utils/PlayIcon";
import getPath from "@/utils/getPath";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function HeroHome({
  data,
  children,
  staticData = { hero_intestazione: "Building future together" },
  logo = "white",
}) {
  //! REFS ---
  const counter = useRef();
  const containerRef = useRef();
  const whiteContainerRef = useRef();
  const whiteSpanRef = useRef();
  const heroContainerRef = useRef();
  const dispatch = useDispatch();
  const [opacityPause, setOpacityPause] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  //! ANIMATION ----
  useEffect(() => {
    let HeroHomeCtx = gsap.context(() => {
      let whiteTl = gsap.timeline({
        onComplete: () => {
          document.querySelector("body").style.overflowY = "auto";
          dispatch(
            menuAndContact({
              menu: {
                ...menu,
                fade: true,
                mount: true,
                white: false,
              },
              contact: {
                ...contact,
                fade: true,
                closeContact: null,
              },
            })
          );
        },
      });
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";
      // Scroll to top
      window.scrollTo(0, 0);
      // from the bottom enter
      whiteTl.to(whiteContainerRef.current, {
        y: "0",
        duration: 1,
        ease: "power1.inOut",
      });
      // stagger children enter
      whiteTl.to(
        [counter.current, whiteSpanRef.current, ".whiteTitleRef > span"],
        {
          y: "0",
          duration: 0.5,
          ease: "power1.inOut",
          stagger: 0.1,
        },
        "<"
      );
      // span counter
      whiteTl.to(counter.current, {
        textContent: `${"+=100".padStart(3, "0")}`,
        roundProps: "textContent",
        duration: 0.3,
        ease: "power1.inOut",
      });

      // from the bottom exit
      whiteTl.to(whiteContainerRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power1.inOut",
      });
      // stagger children exit
      whiteTl.to(
        [counter.current, whiteSpanRef.current, ".whiteTitleRef > span"],
        {
          y: "-100%",
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.1,
        },
        "<"
      );

      // HERO
      // from the bottom enter
      if (window.innerWidth < 1280) {
        whiteTl.to(
          heroContainerRef.current,
          {
            y: "-100%",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
        whiteTl.to(
          containerRef.current,
          {
            height: "100vh",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      } else {
        whiteTl.to(
          heroContainerRef.current,
          {
            y: "-100%",
            duration: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      }
      // image
      // whiteTl.from(
      //   ".imageRef",
      //   {
      //     bottom: "-100%",
      //     duration: 1,
      //     ease: "redEase",
      //   },
      //   "<"
      // );
      // whiteTl.from(".imageRef > img", {
      //   delay: "-1.4",
      //   scale: 1.3,
      //   duration: 1.3,
      //   ease: "easeIn",
      // });
      // // image parallax --
      // whiteTl.to(".imageRef", {
      //   scale: 1.2,
      //   scrollTrigger: {
      //     trigger: ".imageRef > img",
      //     ease: "redEase",
      //     scrub: true,
      //   },
      // });

      // whiteTl.to(".imageRef", {
      //   scale: 1.05,
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: 'top top',
      //     end: '100% top',
      //     scrub: 1,
      //     pin: true,
      //     pinSpacing: false
      //   },
      // });
    }, containerRef.current);

    return () => HeroHomeCtx.revert();
  }, []);

  //! COMPONENT ----
  return (
    <Container ref={containerRef}>
      {/* White screen loader */}
      <WhiteContainer ref={whiteContainerRef}>
        <WhiteContent>
          <Counter ref={counter}></Counter>
          <div>
            <Span ref={whiteSpanRef}>{data.caricamento_sottotitolo}</Span>
            <WhiteText className="whiteTitleRef">
              {splitText(data.caricamento_titolo)}
            </WhiteText>
            <noscript>
              <Span ref={whiteSpanRef}>{data.caricamento_sottotitolo}</Span>
              <WhiteText className="whiteTitleRef" style={{ transform: 'translateY(-400px) translateX(-350px)' }}>
                {splitText(data.caricamento_titolo)}
              </WhiteText>
            </noscript>
          </div>
        </WhiteContent>
      </WhiteContainer>
      {/* Hero */}
      <HeroContainer ref={heroContainerRef}>
        {/* header */}
        <Header>
          <Logo color="black" fadeScroll />
        </Header>
        <LittleTittle>{staticData.hero_intestazione}</LittleTittle>
        {/* content */}
        <Content>
          {data.video ? (
            <Video className="videoRef">
              {/* <PlayIconContainer
                onMouseEnter={() => setOpacityPause(true)}
                onMouseLeave={() => setOpacityPause(false)}
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                <PlayIcon opacity={opacityPause} />
              </PlayIconContainer> */}
              <video
                // style={{ height: "100%" }}
                loop
                autoPlay
                preload="auto"
                playsInline
                muted={!isPlaying}
                className="desktop"
              >
                <source src={getPath(data.video?.data?.attributes.url)} />
                <img
                  src="/def1.webp"
                  loading="lazy"
                  title="Your browser does not support the <video> tag"
                  alt="Your browser does not support the <video> tag"
                ></img>
              </video>
              <video
                // style={{ height: "100%" }}
                loop
                autoPlay
                preload="auto"
                playsInline
                muted={!isPlaying}
                className="mobile"
              >
                <source
                  src={getPath(data.video_mobile?.data?.attributes.url)}
                />
                <img
                  src="/def1.webp"
                  title="Your browser does not support the <video> tag"
                  alt="Your browser does not support the <video> tag"
                  ></img>
              </video>
            </Video>
          ) : (
            <ImageContainer className="imageRef">
              <Image
                quality={100}
                priority={true}
                src={getPath(data.immagine.data.attributes.url)}
                alt={data?.immagine?.data?.attributes?.url ? data?.immagine?.data?.attributes?.url : "Immagine sezione sito web"}
                fill
                sizes="100%"
              />
            </ImageContainer>
          )}
          <ContainerChildren>
            <ContentChildren>{children}</ContentChildren>
          </ContainerChildren>
        </Content>
      </HeroContainer>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  height: 100vh;
  overflow: hidden;
`;

// White loader screen
const WhiteContainer = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  ${centerContent}
  height: 100svh;
  transform: translateY(100%);

  @media (min-width: 1280px) {
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
`;

const LittleTittle = styled.span`
  z-index: 99;
  position: absolute;
  top: 73px;
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  transform: translateX(-65%);
  display: none;
  @media (min-width: 1280px) {
    display: block;
  }
`;

const WhiteContent = styled.div`
  height: 100%;
  display: flex;
  padding-top: 3rem;
  padding-bottom: 3rem;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1280px) {
    flex-direction: row;
    height: max-content;

    & > div {
      width: 50%;
    }
  }
`;

const Counter = styled.span`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  text-transform: uppercase;
  line-height: 0.91em;
  transform: translateY(100%);
`;

const WhiteText = styled.span`
  display: block;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  text-transform: uppercase;
  line-height: 0.91em;
  margin-top: 0.5rem;

  span {
    display: block;
    transform: translateY(100%);
  }
`;

const Span = styled.span`
  font-size: 1rem;
  transform: translateY(100%);
`;

// Hero
const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const Header = styled.header`
  ${centerContent}
  padding-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  height: 6.8rem;
  display: flex;
  align-items: center;

  span {
    display: none;
  }
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (min-width: 1280px) {
    height: 7.5rem;
    span {
      margin-right: 100px;
      display: inline-block;
      color: black;
    }
  }
`;

const Video = styled.div`
  height: 100vh;
  position: relative;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left;
    &.mobile {
      display: none;
    }
    &.desktop {
      display: block;
    }
    @media screen and (max-width: 864px) {
      object-position: bottom;
      &.mobile {
        display: block;
      }
      &.desktop {
        display: none;
      }
    }
  }
`;

// Content
const Content = styled.div`
  margin-top: 0;
  height: 100vh;
  min-height: 30rem;
  border-radius: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  @media (min-width: 1280px) {
    height: 100vh;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;

  @media (min-width: 1280px) {
    position: absolute !important;
    width: 100vw;
    height: 100vh;
    top: 0;
  }
  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const PlayIconContainer = styled.div``;

const ContainerChildren = styled.div`
  margin-top: 1rem; //
  height: 90svh;
  min-height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    filter: brightness(75%);
  }

  @media (min-width: 1280px) {
    margin-top: 0;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100svh;
    z-index: 996;

    img {
      display: none;
    }
  }
`;

const ContentChildren = styled.div`
  ${centerContent}
  position: absolute;
  width: 100%;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  transform: translateX(-50%);
  left: 50%;

  @media (min-width: 1280px) {
    bottom: 3rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;
