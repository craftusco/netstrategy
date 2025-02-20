import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import getPath from "@/utils/getPath";

gsap.registerPlugin(ScrollTrigger);

export default function CardsSlider({ data: images, mt, labels = [] }) {
  if(!images)
  return (
    <></>
  )
  //! REFS ---
  const containerRef = useRef();
  const [index, setIndex] = useState(2);

  //! HANDLE SLIDE CHANGES
  const [slideStates, setSlideStates] = useState({
    is_prev: 1,
    is_active: 0,
    is_next: 2,
  });

  const slideChange = (i) => {
    setSlideStates({
        is_active: i,
        is_prev: i - 1 < 0 ? images.length - 1 : i - 1,
        is_next: i + 1 > images.length - 1 ? 0 : i + 1,
      })
  }

  const slideNext = () => {
    const newActive = slideStates.is_active + 1 > images.length - 1 ? 0 : slideStates.is_active + 1;
    const newPrev = newActive - 1 < 0 ? images.length - 1 : newActive - 1;
    const newNext = newActive + 1 > images.length - 1 ? 0 : newActive + 1;

    setSlideStates({
      is_active: newActive,
      is_prev: newPrev,
      is_next: newNext,
    })
  }

  const slidePrev = () => {
    const newActive = slideStates.is_active - 1 < 0 ? images.length - 1 : slideStates.is_active - 1;
    const newPrev = newActive - 1 < 0 ? images.length - 1 : newActive - 1;
    const newNext = newActive + 1 > images.length - 1 ? 0 : newActive + 1;

    setSlideStates({
      is_active: newActive,
      is_prev: newPrev,
      is_next: newNext,
    })
  }

  //! DETECT DRAG & DRAG DIRECTION
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [mouseStart, setMouseStart] = useState(null)
  const [mouseEnd, setMouseEnd] = useState(null)
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50 ;
  const onTouchStart = (e) => {
    if(windowWidth > 820) return;
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if(windowWidth > 820) return;
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) slideNext();
    if (isRightSwipe) slidePrev();
  }

  //! DETECT MOUSE DRAG & DRAG DIRECTION
  const minMouseDistance = 10;

  const onMouseDown = (e) => {
    if(windowWidth > 820) return;
    setMouseEnd(null); // otherwise the swipe is fired even with usual touch events
    setMouseStart(e.clientX);
  }
  const onMouseMove = (e) => {setMouseEnd(e.clientX);}
  const onMouseUp = () => {
    if (windowWidth > 820) return;
    if (!mouseStart || !mouseEnd) return
    const distance = mouseStart - mouseEnd
    const isLeftSwipe = distance > minMouseDistance
    const isRightSwipe = distance < -minMouseDistance
    if (isLeftSwipe) slideNext();
    if (isRightSwipe) slidePrev();
  }

  //! SET CURRENT PRINTING CARD CLASSES
  const getClasses = (i) => {
    if(slideStates.is_prev == i) return "is_prev";
    else if(slideStates.is_active == i) return "is_active";
    else if(slideStates.is_next == i) return "is_next";
    else return "is_not_visible";
  }

  const [windowWidth, setWindowWidth] = useState(null);
  // const [activeCardHeight, setActiveCardHeight] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      // const activeCard = document.querySelector(".cardListRef > .is_active");
      // if(!activeCard) return;
      // setActiveCardHeight(activeCard.offsetHeight)
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    // const activeCard = document.querySelector(".cardListRef > .is_active");
    // if(!activeCard) return;
    // setActiveCardHeight(activeCard.offsetHeight)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ! HANDLE MOUSE ENTER ----
  // Label & z-index card
  const handleMouseEnter = (event, i) => {
    if(windowWidth <= 820) return;
    if(!Boolean(labels[i])) return;
    // label scale & opacity
    gsap.to(event.currentTarget.lastChild, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "easeIn",
    });
  };
  // Get mouse position relative to parent element (card)
  const handleMouseMove = (event, i) => {
    if(windowWidth <= 820) return;
    if(!Boolean(labels[i])) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;

    // update label position
    gsap.to(event.currentTarget.lastChild, {
      left: localX,
      top: localY,
      zIndex: 9999,
      display: "block",
      duration: 0.9,
      ease: "easeInOut",
    });
  };

  // ! HANDLE MOUSE LEAVE ----
  // label scale & opacity
  const handleMouseLeave = (event, i) => {
    if(windowWidth <= 820) return;
    if(!Boolean(labels[i])) return;

    gsap.to(event.currentTarget.lastChild, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "easeIn",
    });
  };

  return (
    <Container mt={mt} ref={containerRef}>
      {/* List */}
      <CardsList className="cardListRef" >
        {images.map((img, i) => (
          <Card
            toShow={Boolean(labels[i])}
            key={i}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseMove={(e) => {onMouseMove(e), handleMouseMove(e, i);}}
            onMouseLeave={(e) => handleMouseLeave(e, i)}
            className={getClasses(i)}
            // onClick={() => {if(slideStates.is_active == i) return; slideChange(i)}}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown} onMouseUp={onMouseUp}
          >
            <Image
              src={getPath(img.attributes.url)}
              alt={img?.attributes?.alternativeText ? img?.attributes?.alternativeText : labels[i]?.label ? labels[i].label : "persone in azienda"}
              fill
              sizes="100%"
            />
            <MobileValues toShow={Boolean(labels[i])}>{ labels[i] ? labels[i].label : 'Who we are'}</MobileValues>
            <span className="value">{ labels[i] ? labels[i].label : 'Who we are'}</span>
          </Card>
        ))}
      </CardsList>
      {/* Dots mobile */}
      <Dots index={index}>
        {images.map((_, i) => (
          <span key={i} onClick={() => slideChange(i)} className={slideStates.is_active == i ? "is_active" : ""}></span>
        ))}
      </Dots>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};
  max-width: 85rem;
`;

// List
const CardsList = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  //fix tablet styles
  /* height: ${({height}) => height + "px" }; */
  position: relative;
  height: clamp(25.00rem, calc(2.53rem + 55.24vw), 55.00rem);
  @media (max-width: 820px) {
    height: clamp(21.88rem, calc(-0.55rem + 112.12vw), 45.00rem);
  }
  @media (max-width: 820px) and (min-width: 650px) {
    width: 80%;
    height: clamp(34.38rem, calc(-1.47rem + 88.24vw), 43.75rem);
  }
`;

// Card
const Card = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 3.25/4;
  width: 50%;
  position: absolute;
  transition: all 350ms ease;

  &.is_prev {
    transform: translateX(-5%) translateZ(-50px) scale(0.8);
    z-index: 2;
    @media (min-width: 821px) {
      &:hover {
        z-index: 4;
        transform: translateX(-5%) translateZ(-50px) scale(0.85);
      }
    }
  }
  &.is_active {
    transform: translateX(50%) translateZ(0);
    z-index: 3;
  }
  &.is_next {
    transform: translateX(105%) translateZ(-50px) scale(0.8);
    z-index: 2;
    @media (min-width: 821px) {
      &:hover {
        z-index: 4;
        transform: translateX(105%) translateZ(-50px) scale(0.85);
      }
    }
  }
  &.is_not_visible {
    transform: translateX(50%) translateZ(0) scale(0.2);
    z-index: 0;
  }

  @media (max-width: 820px) {
    &.is_prev {
      transform: translateX(-2%) translateZ(-50px) translateY(8%) scale(0.9);
      width: 80%;
      //fix tablet styles
      @media (max-width: 820px) and (min-width: 650px) {
        transform: translateX(14%) translateZ(-50px) translateY(8%) scale(0.9);
      }
    }
    &.is_active {
      transform: translateX(7%) translateZ(0);
      width: 90%;
      //fix tablet styles
      @media (max-width: 820px) and (min-width: 650px) {
        transform: translateX(19%) translateZ(0);
      }
    }
    &.is_next {
      transform: translateX(30%) translateZ(-50px) translateY(8%) scale(0.9);
      width: 80%;
      //fix tablet styles
      @media (max-width: 820px) and (min-width: 650px) {
        transform: translateX(42%) translateZ(-50px) translateY(8%) scale(0.9);
      }
    }
    &.is_not_visible {
      transform: translateX(50%) translateZ(0) scale(0.2);
      z-index: 0;
    }
  }

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  span.value {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({theme: { fontSizes }}) => fontSizes.size_57_100};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    text-transform: uppercase;
    user-select: none;
    opacity: ${props => props.toShow === true ? 1 : 0} !important;

    @media (min-width: 1280px) {
      display: inline-block;
      transform: scale(0);
      opacity: 0;
    }
  }
`;

// Dots mobile
const Dots = styled.div`
  margin-top: 1.5rem;
  display: none;
  justify-content: center;
  column-gap: 0.5rem;

  @media (max-width: 820px) {
    display: flex;
  }

  /* &span:nth-child(${(props) => props.index}) {
    background: ${({ theme: { colors } }) => colors.primaryColor};
    border-color: ${({ theme: { colors } }) => colors.primaryColor};
  } */

  span {
    display: block;
    cursor: pointer;
    border: 1px solid ${({ theme: { colors } }) => colors.greyColor};
    width: 12px;
    height: 12px;
    opacity: 0.2;
    border-radius: 999px;
    transition: all 350ms ease;
    &.is_active {
      scale: 1.2;
      opacity: 1;
      background: ${({ theme: { colors } }) => colors.primaryColor};
      border-color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }
`;

const MobileValues = styled.div`
  display: none;
  /* background: white; */
  font-family: ${({ theme: { fonts } }) => fonts.main};
  font-size: ${({theme: { fontSizes }}) => fontSizes.size_57_100};
  color: ${({ theme: { colors } }) => colors.primaryColor};
  text-transform: uppercase;
  user-select: none;
  opacity: ${props => props.toShow === true ? 1 : 0} !important;
  @media (max-width: 820px) {
    position: absolute;
    display: block;
    bottom: 1rem;
    right: 1rem;
  }
`