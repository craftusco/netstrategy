import React, { createRef, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Flip, CustomEase } from "gsap/all";
import { redScreenLoader } from "../../redux/animationsSlice";
import { changeColor } from "../../redux/customCursorSlice";
import getPath from "@/utils/getPath";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
// gsap.registerPlugin(ScrollTrigger);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function Services({ data: services, mt }) {
  if (!services) return <></>;

  //! REFS ---
  const router = useRouter();
  // const containerRef = useRef();
  const redBackImageFullRef = useRef();
  const myRefs = services.map(() => createRef());
  const dispatch = useDispatch();

  //! MOUSE OVER ---
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
      x: "-50%",
    });
    gsap.to(target.lastChild, {
      delay: 0.2,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "easeIn",
    });
  };

  //! MOUSE LEAVE ---
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
    // Desktop
    if (window.innerWidth >= 1280) {
      // Prevent next link
      e.preventDefault();
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";
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
      const imageState = Flip.getState([
        target.lastChild,
        myRefs[index].current,
      ]);

      gsap.set(target.lastChild, {
        display: "none",
      });

      gsap.set(myRefs[index].current, {
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
    // Mobile
    else {
      dispatch(redScreenLoader({ link, img }));
    }
  };

  //! ANIMATIONS
  const itemRefs = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    let servicesCtx = gsap.context(() => {
      gsap.from(itemRefs.current, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0% bottom",
          end: "center center",
          scrub: 1.5,
        },
      });
    }, containerRef.current);
    return () => servicesCtx.revert();
  }, []);

  return (
    <Container mt={mt} ref={containerRef}>
      {services.map((el, i) => (
        <Item
          key={i}
          className="no_highlights"
          onMouseEnter={(e) => handleMouseOver(e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          onClick={(e) =>
            handleClick(
              e.currentTarget,
              i,
              e,
              getPath(`/${el.attributes.slug}`),
              getPath(el.attributes.hero.immagine.data.attributes.url)
            )
          }
          ref={(el) => (itemRefs.current[i] = el)}
        >
          <a href={getPath(`/${el.attributes.slug}`)}>
            {el.attributes.hero.nome}.
          </a>
          <RedBackImage data-flip-id="red"></RedBackImage>
          <ImageContainer data-flip-id={i}>
            <Image
              src={getPath(el.attributes.hero.immagine.data.attributes.url)}
              alt={el?.attributes?.hero?.immagine?.data?.attributes?.alternativeText ? el?.attributes?.hero?.immagine?.data?.attributes?.alternativeText : "Immagine di caricamento"}
              fill
              sizes="100%"
            />
          </ImageContainer>
        </Item>
      ))}
      {/* Red full */}
      <RedBackImageFull
        data-flip-id="red"
        ref={redBackImageFullRef}
      ></RedBackImageFull>
      {/* Images full */}
      {services.map((el, i) => (
        <ImageFull data-flip-id={i} ref={myRefs[i]} key={i}>
          <Image
            src={getPath(el.attributes.hero.immagine.data.attributes.url)}
            alt={el?.attributes?.hero?.immagine?.data?.attributes?.alternativeText ? el?.attributes?.hero?.immagine?.data?.attributes?.alternativeText : "Immagine di caricamento"}
            fill
            sizes="100%"
            quality={100}
          />
        </ImageFull>
      ))}
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  display: flex;
  flex-direction: column;
  height: fit-content;

  @media (min-width: 1100px) {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: clamp(0.63rem, calc(0.32rem + 1.29vw), 1.88rem);
  }
`;

// Item
const Item = styled.div`
  position: relative;
  text-transform: uppercase;
  cursor: pointer;

  a {
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_60_250};
    line-height: 0.91em;

    @media (max-width: 1280px) {
      &:hover {
        color: ${({ theme: { colors } }) => colors.primaryColor};
        transition: color 0.2s ease-in-out;
      }
    }
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
  left: 50%;
  border-radius: 1.5rem;
  overflow: hidden;
  display: none;
  width: clamp(18rem, calc(12rem + 7.5vw), 21rem);
  height: clamp(12rem, calc(6rem + 7.5vw), 15rem);

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
  z-index: 999999;
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
