import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import RightArrow from "./utils/RightArrow";
import Image from "next/image";
import { createRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import calcTransform from "@/utils/calcTransform";
import { Flip, CustomEase } from "gsap/all";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { redScreenLoader } from "../../redux/animationsSlice";
import { ScrollTrigger } from "gsap/all";
import Link from "next/link";
import { changeColor } from "../../redux/customCursorSlice";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import getPath from "@/utils/getPath";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function WhatIsYourGoal({ mt, data }) {
  //! REFS ---
  const router = useRouter();
  const containerRef = useRef();
  const redBackImageFullRef = useRef();
  const myRefs = data.list.data.map(() => createRef());
  const dispatch = useDispatch();

  //! SCROLL ----
  useEffect(() => {
    let whatIsYourGoalCtx = gsap.context(() => {
      
      // heading
      gsap.from(`.titleRef > span`, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.titleRef`,
          start: "-50% bottom",
          end: "15% center",
          scrub: 1,
        },
      });
      
      // list item
      gsap.from(`.listRef > a`, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.listRef`,
          start: "0% bottom",
          end: "center center",
          scrub: 1.5,
        },
      });

    }, containerRef.current);
    return () => whatIsYourGoalCtx.revert();
  }, []);

  // useEffect(() => {
  //   ScrollTrigger.refresh();
  // });

  //! HANDLE MOUSE ENTER ----
  const handleMouseEnter = (e) => {
    // change custom cursor
    dispatch(changeColor("scaleUp"));
    // Red scale
    gsap.set(e.currentTarget.lastChild.previousElementSibling, {
      y: "-50%",
    });
    gsap.to(e.currentTarget.lastChild.previousElementSibling, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image container scale
    gsap.set(e.currentTarget.lastChild, {
      y: "-50%",
    });
    gsap.to(e.currentTarget.lastChild, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image scale
    gsap.to(e.currentTarget.lastChild.firstElementChild, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // text x axis
    gsap.to(
      e.currentTarget.firstElementChild.nextElementSibling.firstElementChild,
      {
        x: 0,
        duration: 0.7,
        ease: "easeIn",
      }
    );
  };

  //! HANDLE MOUSE LEAVE ----
  const handleMouseLeave = (e) => {
    // change custom cursor
    dispatch(changeColor("scaleDown"));
    // Red scale
    gsap.to(e.currentTarget.lastChild.previousElementSibling, {
      scale: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image container scale
    gsap.to(e.currentTarget.lastChild, {
      scale: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image scale
    gsap.to(e.currentTarget.lastChild.firstElementChild, {
      scale: 2,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // text x axis
    gsap.to(
      e.currentTarget.firstElementChild.nextElementSibling.firstElementChild,
      {
        x: calcTransform(
          "x",
          `calc((clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem) + clamp(1rem, calc(0.51rem + 2.07vw), 3rem)) * -1)`
        ),
        duration: 0.7,
        ease: "easeIn",
      }
    );
  };

  //! HANDLE CLICK TRANSITION ----
  const handleClick = (target, index, e, link, img) => {
    // Desktop
    if (window.innerWidth >= 1280) {
      // Prevent next link
      e.preventDefault();
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
      // Prevent next link
      dispatch(
        redScreenLoader({
          link: link,
          img: img,
        })
      );
    }
  };

  return (
    <Container mt={mt} ref={containerRef}>
      <h2 className="titleRef">{splitText(data.titolo)}</h2>
      {/* List */}
      <List className="listRef">
        {data.list.data.map((el, i) => (
          // <>
          // {console.log(el)}
          // </>
          // Item ---

          <ListItem
          href={getPath(`/${el.attributes.pillar}/${el.attributes.slug}`)}
            key={i}
            className="no_highlights"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) =>
              handleClick(
                e.currentTarget,
                i,
                e,
                getPath(`/${el.attributes.pillar}/${el.attributes.slug}`),
                getPath(el.attributes.immagine.data.attributes.url)
              )
            }
          >
            {/* index */}
            <Index>{(i + 1).toString().padStart(2, "0")}</Index>
            {/* text */}
            <TextContainer>
              <Text>
                <RightArrow />
                {el.attributes.goal_title}
              </Text>
            </TextContainer>
            {/* image */}
            <RedBackImage data-flip-id="red"></RedBackImage>
            <ImageContainer data-flip-id={i}>
              <Image
                src={getPath(el.attributes.immagine.data.attributes.url)}
                alt={el?.attributes?.immagine?.data?.attributes?.alternativeText ? el?.attributes?.immagine?.data?.attributes?.alternativeText : "Immagine di caricamento"}
                fill
                sizes="100%"
              />
            </ImageContainer>
          </ListItem>
        ))}
      </List>
      {/* Red full */}
      <RedBackImageFull
        data-flip-id="red"
        ref={redBackImageFullRef}
      ></RedBackImageFull>
      {/* images full */}
      {data.list.data.map((el, i) => (
        <ImageFull data-flip-id={i} ref={myRefs[i]} key={i}>
          <Image
            src={getPath(el.attributes.immagine.data.attributes.url)}
            alt={el?.attributes?.immagine?.data?.attributes?.alternativeText ? el?.attributes?.immagine?.data?.attributes?.alternativeText : "Immagine di caricamento"}
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
  ${centerContent};

  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;

    span {
      display: block;
    }
  }
`;

const List = styled.div`
  margin-top: 2rem; //
`;

// List item
const ListItem = styled.a`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding: clamp(1.25rem, calc(1.01rem + 1.04vw), 2.25rem) 0;
  display: flex;
  align-items: center;
  column-gap: clamp(1rem, calc(0.45rem + 2.33vw), 3.25rem);
  position: relative;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }
`;

const Index = styled.div`
  min-width: 1.25em;
`;

const TextContainer = styled.div`
  overflow-x: clip;

  @media (min-width: 1280px) {
    max-width: 60%;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  column-gap: clamp(1rem, calc(0.51rem + 2.07vw), 3rem);
  transform: translateX(
    calc(
      (
          clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem) +
            clamp(1rem, calc(0.51rem + 2.07vw), 3rem)
        ) * -1
    )
  );

  svg {
    stroke: ${({ theme: { colors } }) => colors.primaryColor};
    min-width: clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem);
    max-width: clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem);
    min-height: clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem);
    max-height: clamp(1.25rem, calc(0.95rem + 1.29vw), 2.5rem);
  }
`;

// Image
const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1.5rem; //
  position: absolute;
  top: 50%;
  right: 10%;
  width: clamp(22rem, calc(16rem + 7.5vw), 25rem);
  height: clamp(14rem, calc(8rem + 7.5vw), 17rem);
  display: none;
  transform: scale(0) translateY(-50%);
  z-index: 999;

  @media (min-width: 1280px) {
    display: block;
  }

  img {
    border-radius: 1.5rem; //
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    transform: scale(2);
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
  right: 10%;
  width: clamp(22rem, calc(16rem + 7.5vw), 25rem);
  height: clamp(14rem, calc(8rem + 7.5vw), 17rem);
  transform: scale(0);
  display: none;

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
