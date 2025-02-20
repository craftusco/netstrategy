import styled from "styled-components";
import PlayIcon from "./utils/PlayIcon";
import PrimaryButton from "./utils/PrimaryButton";
import { centerContent } from "@/styles/mixins";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import RedLink from "./utils/RedLink";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");
gsap.registerPlugin(ScrollTrigger);

export default function SpecialistExpandable({ data, mt }) {
  //! REFS ---
  const containerRef = useRef();
  const infoRef = useRef();
  const paragraphRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [opacityPause, setOpacityPause] = useState();

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
          start: "-100% bottom",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      });
      // video Y
      gsap.from(`.videoRef`, {
        y: "200%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-100% bottom",
          end: "-35% center",
          scrub: 1,
          // markers: true,
        },
      });
      // video scale
      gsap.from(`.videoRef > video`, {
        scale: "1.5",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "-100% bottom",
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
          start: "-100% bottom",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      });
    }, containerRef.current);
    return () => SpecialistCtx.revert();
  }, []);

  //! VIDEO EXPAND ----
  const handleVideoExpand = () => {
    const videoState = Flip.getState([".videoRef", ".videoFullRef"], {
      props: "borderRadius",
    });

    gsap.set(".videoRef", {
      opacity: 0,
    });
    gsap.set(".videoFullRef", {
      display: "block",
    });

    Flip.from(videoState, {
      duration: 0.7,
      ease: "power3.out",
    });
  };
  // Reverse
  const handleVideoExpandReverse = () => {
    const videoState = Flip.getState([".videoRef", ".videoFullRef"], {
      props: ["borderRadius"],
    });

    gsap.set(".videoRef", {
      opacity: 0,
    });
    gsap.set(".videoFullRef", {
      display: "block",
    });

    Flip.to(videoState, {
      duration: 0.4,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(".videoFullRef", {
          display: "none",
        });
        gsap.set(".videoRef", {
          opacity: 1,
        });
      },
    });
  };

  return (
    <Container mt={mt} ref={containerRef}>
      {/* Video */}
      <VideoContainer
        data-flip-id="video-id"
        className="videoRef"
        onMouseEnter={() => setOpacityPause(true)}
        onMouseLeave={() => setOpacityPause(false)}
      >
        <video loop autoPlay preload="auto" playsInline muted={isPlaying}>
          <source src="/video1.mp4" />
        </video>
        <PlayIconContainer
          onClick={() => {
            setIsPlaying(!isPlaying);
            handleVideoExpand();
          }}
        >
          <PlayIcon opacity={opacityPause} />
        </PlayIconContainer>
      </VideoContainer>
      {/* Info */}
      <InfoContainer ref={infoRef}>
        <span>Meet</span>
        <span>Julia Green</span>
        <span>Marketing Specialist</span>
      </InfoContainer>
      {/* Paragraph & cta */}
      <ParagraphContainer ref={paragraphRef}>
        <p>
          Ipsum has been the industry’s standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type.
        </p>
        <BtnContainerDesktop>
          <RedLink link={data.cta.link}>
            <PrimaryButton text={data.cta.text} />
          </RedLink>
        </BtnContainerDesktop>
      </ParagraphContainer>
      <BtnContainerMobile>
        <RedLink link={data.cta.link}>
          <PrimaryButton text={data.cta.text} />
        </RedLink>
      </BtnContainerMobile>
      {/* Video full */}
      <VideoContainerFull
        className="videoFullRef"
        data-flip-id="video-id"
        onClick={handleVideoExpandReverse}
      >
        <video loop autoPlay preload="auto" playsInline muted>
          <source src="/video1.mp4" />
        </video>
      </VideoContainerFull>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  display: grid;
  row-gap: 2rem;
  position: relative;

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
  justify-self: center;
  overflow: hidden;
  position: relative;
  border-radius: 50%;

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
  width: 100%;
  margin-left: auto;

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
    margin-top: clamp(2rem, calc(-4rem + 7.5vw), 5rem);
  }
`;

const PlayIconContainer = styled.div``;

// Video container full

const VideoContainerFull = styled.div`
  width: 90vw;
  height: 45vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  overflow: hidden;
  display: none;
  z-index: 997;

  video {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative !important;
    display: block;
  }
`;
