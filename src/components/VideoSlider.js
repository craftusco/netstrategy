import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import RestartVideoIcon from "./utils/RestartVideoIcon";
import ToggleAudioIcons from "./utils/ToggleAudioIcons";
import getPath from "@/utils/getPath";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";

gsap.registerPlugin(ScrollTrigger);

export default function CardsSlider({ data: videos, mt }) {
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
    // video behaviour on slide change
    videoRefs.current[slideStates.is_active].currentTime = 1;
    videoRefs.current[slideStates.is_active].pause();
    videoRefs.current[i].play();
    // update slide states
    setSlideStates({
      is_active: i,
      is_prev: i - 1 < 0 ? videos.length - 1 : i - 1,
      is_next: i + 1 > videos.length - 1 ? 0 : i + 1,
    });
  };

  const slideNext = () => {
    const newActive =
      slideStates.is_active + 1 > videos.length - 1
        ? 0
        : slideStates.is_active + 1;
    const newPrev = newActive - 1 < 0 ? videos.length - 1 : newActive - 1;
    const newNext = newActive + 1 > videos.length - 1 ? 0 : newActive + 1;
    videoRefs.current[newActive].play();
    videoRefs.current[newPrev].currentTime = 0;
    videoRefs.current[newPrev].pause();

    setSlideStates({
      is_active: newActive,
      is_prev: newPrev,
      is_next: newNext,
    });
  };

  const slidePrev = () => {
    const newActive =
      slideStates.is_active - 1 < 0
        ? videos.length - 1
        : slideStates.is_active - 1;
    const newPrev = newActive - 1 < 0 ? videos.length - 1 : newActive - 1;
    const newNext = newActive + 1 > videos.length - 1 ? 0 : newActive + 1;
    videoRefs.current[newActive].play();
    videoRefs.current[newNext].currentTime = 0;
    videoRefs.current[newNext].pause();

    setSlideStates({
      is_active: newActive,
      is_prev: newPrev,
      is_next: newNext,
    });
  };

  //! DETECT DRAG & DRAG DIRECTION
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    // if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
    if (isLeftSwipe) slideNext();
    if (isRightSwipe) slidePrev();
  };

  //! DETECT MOUSE DRAG & DRAG DIRECTION
  const minMouseDistance = 10;

  const onMouseDown = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.clientX);
  };
  const onMouseMove = (e) => setTouchEnd(e.clientX);
  const onMouseUp = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minMouseDistance;
    const isRightSwipe = distance < -minMouseDistance;
    // if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
    if (isLeftSwipe) slideNext();
    if (isRightSwipe) slidePrev();
  };

  //! SET CURRENT PRINTING CARD CLASSES
  const getClasses = (i) => {
    if (slideStates.is_prev == i) return "is_prev";
    else if (slideStates.is_active == i) return "is_active";
    else if (slideStates.is_next == i) return "is_next";
    else return "is_not_visible";
  };

  const [windowWidth, setWindowWidth] = useState(null);
  // const [activeCardHeight, setActiveCardHeight] = useState(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const activeCard = document.querySelector(".cardListRef > .is_active");
  //     if(!activeCard) return;
  //     setActiveCardHeight(activeCard.offsetHeight)
  //     setWindowWidth(window.innerWidth);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   setWindowWidth(window.innerWidth);

  //   const activeCard = document.querySelector(".cardListRef > .is_active");
  //   if(!activeCard) return;
  //   setActiveCardHeight(activeCard.offsetHeight)

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  //! Handle Video behaviour
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef([]);

  const handleRestartClick = (i) => {
    if (videoRefs.current[i]) {
      videoRefs.current[i].currentTime = 1;
      videoRefs.current[i].play();
    }
  };

  useEffect(() => {
    videoRefs.current[slideStates.is_active].play();
  }, []);

  useEffect(() => {
    let videoSliderCtx = gsap.context(() => {
      //video container
      gsap.from(".cardListRef", {
        y: "100%",
        ease: "easeInOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top bottom-=10%",
          scrub: 1.5,
        },
      });
      gsap.utils.toArray(".cardListRef > div").forEach((el) => {
        gsap.from(el.querySelector(":scope .slider-video"), {
          scale: 2,
          ease: "easeInOut",
          stagger: 0.1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top bottom-=10%",
            scrub: 1.5,
          },
        });
      });
    }, containerRef.current);
    return () => {
      videoSliderCtx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  });

  const dispatch = useDispatch();

  //! Change videos progress for initial black screen
  useEffect(() => {
    let targets = gsap.utils.toArray(".slider-video");

    targets.forEach((el) => {
      el.currentTime = 1;
    });
  }, []);
  

  //! COMPONENT
  return (
    <Container mt={mt} ref={containerRef}>
      {/* List */}
      {/* <CardsList className="cardListRef" height={activeCardHeight}> */}
      <CardsList className="cardListRef">
        {videos.map((video, i) => (
          <Card
            key={i}
            className={getClasses(i)}
            onClick={() => {
              if (slideStates.is_active == i) return;
              slideChange(i);
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseEnter={() => {
              if (slideStates.is_prev == i || slideStates.is_next == i)
                dispatch(changeColor("scaleUp"));
            }}
            onMouseLeave={() => {
              if (slideStates.is_prev == i || slideStates.is_next == i)
                dispatch(changeColor("scaleDown"));
            }}
          >
            <VideoContainer>
              <video
                loop
                preload="auto"
                playsInline
                muted={isMuted}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="slider-video"
                alt={video.video.data.attributes.alternativeText ? video.video.data.attributes.alternativeText : "Interviste partecipanti net talk"}
                title={video.video_meta?.meta_name? video.video_meta?.meta_name: "Interviste partecipanti net talk"}
                description={video.video_meta?.meta_description ? video.video_meta?.meta_description : ""}
                duration={video.video_meta?.meta_duration ? video.video_meta?.meta_duration : ""}
                thumbnail={video.video_meta?.meta_thumbnail?.data ? getPath(video.video_meta?.meta_thumbnail?.data) : ""}
              >
                <source src={getPath(video.video.data.attributes.url)} />
              </video>
            </VideoContainer>
            {slideStates.is_active == i && (
              <>
                <div
                  onClick={() => {
                    handleRestartClick(i);
                  }}
                >
                  <RestartVideoIcon top="-18px" left="-18px" />
                </div>
                <div
                  onClick={() => {
                    setIsMuted(!isMuted);
                  }}
                >
                  <ToggleAudioIcons
                    bottom="-18px"
                    right="-18px"
                    isMutedTrigger={isMuted}
                  />
                </div>
              </>
            )}
          </Card>
        ))}
      </CardsList>
      {/* Dots mobile */}
      <Dots index={index}>
        {videos.map((_, i) => (
          <span
            key={i}
            onClick={() => slideChange(i)}
            className={slideStates.is_active == i ? "is_active" : ""}
          ></span>
        ))}
      </Dots>
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent};
  /* margin-top: ${(props) => props.mt}; */
  margin-top: clamp(5rem, calc(1.47rem + 6.27vw), 9rem);
  max-width: 70rem;
  @media (max-width: 1080px) {
    margin-top: 3rem;
  }
  @media (max-width: 650px) {
    margin-top: 2rem;
  }
`;

// List
const CardsList = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  /* height: ${({ height }) => height + "px"}; */
  height: clamp(25rem, calc(2.53rem + 55.24vw), 48rem);
  @media (max-width: 650px) {
    height: clamp(21.88rem, calc(-0.55rem + 112.12vw), 45rem);
  }
  position: relative;
  /* padding: 18px 0; */
`;

// Card
const Card = styled.div`
  aspect-ratio: 3.25/4;
  width: 50%;
  position: absolute;
  transition: all 350ms ease;

  &.is_prev {
    transform: translateX(-5%) translateZ(-50px) scale(0.8);
    z-index: 1;
    cursor: pointer;
  }
  &.is_active {
    transform: translateX(50%) translateZ(0);
    z-index: 3;
  }
  &.is_next {
    transform: translateX(105%) translateZ(-50px) scale(0.8);
    z-index: 1;
    cursor: pointer;
  }
  &.is_not_visible {
    transform: translateX(50%) translateZ(0) scale(0.2);
    z-index: 0;
  }

  @media (max-width: 650px) {
    &.is_prev {
      transform: translateX(-2%) translateZ(-50px) translateY(8%) scale(0.9);
      width: 80%;
    }
    &.is_active {
      transform: translateX(7%) translateZ(0);
      width: 90%;
    }
    &.is_next {
      transform: translateX(30%) translateZ(-50px) translateY(8%) scale(0.9);
      width: 80%;
    }
    &.is_not_visible {
      transform: translateX(50%) translateZ(0) scale(0.2);
      z-index: 0;
    }
  }
`;

const VideoContainer = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 100%;

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

// Dots mobile
const Dots = styled.div`
  margin-top: 1.5rem;
  display: none;
  justify-content: center;
  column-gap: 0.5rem;

  @media (max-width: 650px) {
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