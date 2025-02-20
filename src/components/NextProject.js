import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import React, { createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Flip } from "gsap/all";
import { redScreenLoader } from "../../redux/animationsSlice";
import { changeColor } from "../../redux/customCursorSlice";
import getPath from "@/utils/getPath";

export default function NextProject({ data, mt }) {
  if (!data || !data.data) return <></>;

  const nextStep = data.data[0];

  const router = useRouter();
  const redBackImageFullRef = useRef();
  const myRef = createRef();
  const dispatch = useDispatch();

  // MOUSE OVER ---
  const handleMouseOver = (target) => {
    // change custom cursor
    dispatch(changeColor("scaleUp"));
    // black bar
    gsap.to(target, {
      delay: 0.2,
      "--blackBarWidth": "100%",
      "--blackBarY": "-50%",
      duration: 1,
      ease: "easeIn",
    });
    // Red scale
    gsap.set(target.lastChild.previousElementSibling, {
      y: "-50%",
      x: "-50%",
    });
    gsap.to(target.lastChild.previousElementSibling, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image
    gsap.set(target.lastChild, {
      y: "-50%",
      x: "-0%",
    });
    gsap.to(target.lastChild, {
      delay: 0.2,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "easeIn",
    });
  };

  // MOUSE LEAVE ---
  const handleMouseLeave = (target) => {
    // change custom cursor
    dispatch(changeColor("scaleDown"));
    // black bar
    gsap.to(target, {
      delay: 0.2,
      "--blackBarWidth": 0,
      duration: 1,
      ease: "easeIn",
    });
    // Red scale
    gsap.to(target.lastChild.previousElementSibling, {
      scale: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image
    gsap.to(target.lastChild, {
      delay: 0.2,
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "easeIn",
    });
  };

  //! HANDLE CLICK TRANSITION ----
  const handleClick = (target, index, e, link, img) => {
    // Transition mobile
    if (window.innerWidth <= 1280) {
      dispatch(redScreenLoader({ link, img }));
    }
    // Desktop
    if (window.innerWidth > 1280) {
      // Red to full screen
      const redState = Flip.getState([
        e.currentTarget.lastChild.previousElementSibling,
        redBackImageFullRef.current,
      ]);

      gsap.set(target.lastChild.previousElementSibling, {
        display: "none",
      });
      gsap.set(redBackImageFullRef.current, {
        display: "block",
      });

      Flip.from(redState, {
        duration: 1,
        absolute: true,
        ease: "redEase",
      });

      // image to center
      const imageState = Flip.getState([target.lastChild, myRef.current]);

      gsap.set(target.lastChild, {
        display: "none",
      });
      gsap.set(myRef.current, {
        display: "block",
      });

      Flip.from(imageState, {
        duration: 1,
        absolute: true,
        ease: "redEase",
        // push to new page
        onComplete: () => {
          router.push(link);
        },
      });
    }
  };

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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const handleRouteChanged = () => {
      setIsMounted(false);
    };
    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <>
      {isMounted && (
        <Container mt={mt}>
          <Content>
            <span className="next-work">{splitText("NEXT WORK")}</span>
            <Item
              className="no_highlights"
              onMouseEnter={(e) => handleMouseOver(e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              onClick={(e) =>
                handleClick(
                  e.currentTarget,
                  1,
                  e,
                  getPath(`/successi/${nextStep.attributes.slug}`, true),
                  getPath(
                    nextStep.attributes.thumbnail_success.immagine.data
                      .attributes.url
                  )
                )
              }
            >
              <h3 className="project-name">
                {splitText(nextStep.attributes.thumbnail_success.title)}
              </h3>
              <RedBackImage data-flip-id="red"></RedBackImage>
              <ImageContainer data-flip-id={1}>
                <Image
                  src={getPath(
                    nextStep.attributes.thumbnail_success.immagine.data
                      .attributes.url
                  )}
                  alt={nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText ? nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText : "Immagine progetto"}
                  fill
                  sizes="100%"
                />
              </ImageContainer>
            </Item>
            {/* Red full */}
            <RedBackImageFull
              data-flip-id="red"
              ref={redBackImageFullRef}
            ></RedBackImageFull>
            <ImageFull data-flip-id={1} ref={myRef}>
              <Image
                src={getPath(
                  nextStep.attributes.thumbnail_success.immagine.data.attributes
                    .url
                )}
                quality={100}
                alt={nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText ? nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText : "Immagine progetto"}
                fill
                sizes="100%"
              />
            </ImageFull>
          </Content>
          {windowWidth < 1024 && (
            <ImageContainerMobile>
              <Image
                src={getPath(
                  nextStep.attributes.thumbnail_success.immagine.data.attributes
                    .url
                )}
                alt={nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText ? nextStep?.attributes?.thumbnail_success?.immagine?.data?.attributes?.alternativeText : "Immagine progetto"}
                fill
                sizes="100%"
                priority={true}
              />
            </ImageContainerMobile>
          )}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 65rem; */

  span.next-work {
    display: block;
    place-self: initial;
  }
  h3 {
    span {
      display: block;
    }
    &.project-name {
      span {
        color: ${({ theme: { colors } }) => colors.blackColorV3};
        transition: color 0.2s ease-in-out;
        @media (max-width: 1280px) {
          &:hover {
            color: ${({ theme: { colors } }) => colors.primaryColor};
          }
        }
      }
    }
  }

  span {
    line-height: 0.91em;
    text-transform: uppercase;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;
    place-self: end;
  }
`;

const Item = styled.div`
  width: fit-content;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;

  span {
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    line-height: 0.91em;
  }

  // Black bar
  --blackBarWidth: 0;
  --blackBarY: -50%;

  &::before {
    pointer-events: none;
    content: "";
    display: none;
    position: absolute;
    top: 50%;
    transform: scaleX(var(--blackBarWidth)) translateY(var(--blackBarY));
    width: 100%;
    height: clamp(1.75rem, calc(1rem + 1.1vw), 2.31rem);
    background: ${({ theme: { colors } }) => colors.primaryColor};

    @media (min-width: 1280px) {
      display: block;
    }
  }
`;

const ImageContainer = styled.div`
  pointer-events: none;
  opacity: 0;
  scale: 0;
  z-index: 99;
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 1.5rem;
  overflow: hidden;
  display: none;
  width: clamp(18rem, calc(12rem + 7.5vw), 21rem);
  height: clamp(18rem, calc(12rem + 7.5vw), 21rem);

  @media (min-width: 1280px) {
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

// Reds
const RedBackImage = styled.div`
  border-radius: 1.5rem; //
  background: ${({ theme: { colors } }) => colors.primaryColor};
  z-index: 98;
  border-radius: 1.5rem; //
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(18rem, calc(12rem + 7.5vw), 21rem);
  height: clamp(12rem, calc(6rem + 7.5vw), 15rem);
  transform: scale(0);
  display: none;
  opacity: 0;

  @media (min-width: 1280px) {
    display: block;
  }
`;

const RedBackImageFull = styled.div`
  display: none;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: ${({ theme: { colors } }) => colors.primaryColor};
`;

// Image full
const ImageFull = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999999;
  border-radius: 1rem;
  overflow: hidden;
  width: 40vw;
  height: 28vw;
  max-width: 48rem;
  max-height: 33rem;
  transform: translate(-50%, -50%);
  display: none;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Image container mobile
const ImageContainerMobile = styled.div`
  margin-top: clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  height: "clamp(18rem, calc(8.78rem + 39.35vw), 56rem)";
  overflow: hidden;
  border-radius: 1.25rem;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
