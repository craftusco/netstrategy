import React, { use, useRef } from "react";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import { Splide, SplideSlide } from '@splidejs/react-splide';
// import '@splidejs/react-splide/css/core';
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import "swiper/css/bundle";
import RedLink from "./utils/RedLink";
import getPath from "@/utils/getPath";
import SimplePlayIcon from "./utils/SimplePlayIcon";
import SimpleCloseIcon from "./utils/SimpleCloseIcon";

gsap.registerPlugin(ScrollToPlugin);

export default function TestimonialsSlider({ data = null, mt, pillar = null }) {
  // console.log('slide.attributes', data)

  if (!data) return <></>;
  const [showTopGrad, setShowTopGrad] = useState(false);
  const [showBottomGrad, setShowBottomGrad] = useState(true);
  const [openDesc, setOpenDesc] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  const [isJavaScriptEnabled, setIsJavaScriptEnabled] = useState(false);

  useEffect(() => {
    setIsJavaScriptEnabled(true); // Se JavaScript è disabilitato, imposta lo stato su false
  }, []);

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

  const containerRef = useRef();
  //! Scroll animation
  useEffect(() => {
    let testimSliderCtx = gsap.context(() => {
      gsap.from(".slider-ref > *", {
        y: "30%",
        ease: "easeInOut",
        stagger: 1,
        duration: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "5% bottom",
          end: "5% bottom-=20%",
          scrub: 1.5,
        },
      });
    }, containerRef.current);

    return () => {
      testimSliderCtx.revert();
    };
  }, []);

  const scrollDown = () => {
    const pEl = document.querySelector(".swiper-slide-active .p-wrapper");
    // pEl.scrollTop = pEl.scrollHeight;
    gsap.to(pEl, {
      duration: 2,
      scrollTo: pEl.scrollHeight,
      ease: "Power1.easeInOut",
    });
  };

  /*const handleScroll = (e) => {
    //allo scroll valuto se deve vedersi o no la freccetta per fare scroll down, se sono a fine scroll si nasconde
    const scrollOffset =
      e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
    const scrollTop = e.currentTarget.scrollTop;
    const scrollDownArrow = document.querySelector(
      ".swiper-slide-active .scroll-down-arrow"
    );
    scrollDownArrow.style.opacity = scrollOffset == scrollTop ? "0" : "1";

    // if (e.currentTarget.scrollHeight == e.currentTarget.offsetHeight) return;
    // const minScroll = 0;
    // const maxScroll = e.currentTarget.scrollHeight - e.currentTarget.offsetHeight;
    // if(e.currentTarget.scrollTop > minScroll) {
    //   setShowTopGrad(true)
    // }
    // if(e.currentTarget.scrollTop >= maxScroll) {
    //   setShowBottomGrad(false);
    // }
    // if(e.currentTarget.scrollTop < maxScroll) {
    //   setShowBottomGrad(true);
    // }
    // if(e.currentTarget.scrollTop == minScroll) {
    //   setShowTopGrad(false);
    // }
    // const parentEl = e.currentTarget.parentElement;
  };*/

  const handleSlideChange = (e) => {
    setActiveIndex(e.activeIndex);
    setOpenDesc(false);
    document.querySelectorAll(".review").forEach((el) => {
      el.scrollTop = 0;
    });
  };

  const handleSlideClick = (el, e) => {
    const isScrollDownArrow = e.target.classList.contains("scroll-down-arrow");
    const isLinkArrow = e.target.classList.contains("link");
    if (!(el.activeIndex == activeIndex)) return;
    if (isScrollDownArrow) {
      scrollDown();
      return;
    }
    if (isLinkArrow) return;
    setOpenDesc(!openDesc);
  };

  const handleTransitionEnd = (e) => {
    if (e.target.classList.contains("scroll-down-arrow")) return;
    const scrollDownArrow = document.querySelector(
      ".swiper-slide-active .scroll-down-arrow"
    );
    const pEl = document.querySelector(".swiper-slide-active .p-wrapper");
    const scrollOffset = pEl.scrollHeight - pEl.offsetHeight;
    scrollDownArrow.style.opacity = scrollOffset == pEl.scrollTop ? "0" : "1";
  };
  
  const stopHtmlVideo = () => {
    const video = document.getElementById('video');
    if (typeof(video) != 'undefined' && video != null) {
      video.pause();
      video.currentTime = 0;
    }
  }

  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoPlayingIndex, setVideoPlayingIndex] = useState(false)
  const [showAllText, setShowAllText] = useState(false)

  return (
    <Slider ref={containerRef}>
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 300,
          modifier: 1,
          slideShadows: false,
        }}
        loop={true}
        slidesPerView={1}
        grabCursor={true}
        centeredSlides={true}
        spaceBetween={-100}
        slideToClickedSlide={true}
        preventClicksPropagation={true}
        pagination={{
          enabled: true,
          el: ".custom-slider-pagination",
          clickable: true,
        }}
        breakpoints={{
          700: {
            slidesPerView: 2,
          },
          1100: {
            slidesPerView: 3,
          },
        }}
        onSlideChange={(e) => {handleSlideChange(e); setVideoPlaying(false)}}
        /*onClick={(el, e) => {
          handleSlideClick(el, e);
        }}*/
      >
        {data.map((slide, i) => {
          const slideLink =
            slide.attributes.successo_link.data != null
              ? getPath(
                  `/successi/${slide.attributes.successo_link.data.attributes.slug.trim()} `,
                  true
                )
              : null;

          

          /*const playHtmlVideo = () => {
            setTimeout(() => {
              const video = document.getElementById('video');
              video.play();
            }, 300)
          }*/

          return (
            <SwiperSlide key={i} className="slider-ref">
              {({ isPrev, isNext, isActive }) => (
                <>
                  <SlideWrapper
                    className={
                      isActive || !isJavaScriptEnabled
                        ? ""
                        : isPrev || isNext
                        ? "light-blur"
                        : "blur"
                    }
                    style={
                      (slide.attributes.foto_mobile.data) ? ( (windowWidth < 767) ? {backgroundImage: getPath(slide.attributes.foto_mobile.data.attributes.url) /* mobile */} : {backgroundImage: getPath(slide.attributes.foto.data.attributes.url)} ) : ''
                    }
                  >
                    {
                      (videoPlaying && videoPlayingIndex == i) ?
                        <Video>
                          <VideoContainer>
                            <div className="close-icon" onClick={() => { setVideoPlaying(false) }}>
                              <SimpleCloseIcon />
                            </div>
                            {
                              (windowWidth < 767) ?
                                <video
                                  id="video"
                                  autoPlay
                                  playsInline
                                >
                                  <source src={(slide.attributes.slider_video_mobile.data !== null) && getPath(slide.attributes.slider_video_mobile.data.attributes.url)} type="video/mp4" />
                                </video> //mobile
                              : 
                              <video
                                id="video"
                                autoPlay
                                playsInline
                              >
                                <source src={(slide.attributes.slider_video_mobile.data !== null) && getPath(slide.attributes.slider_video.data.attributes.url)} type="video/mp4" />
                              </video>
                            }
                          </VideoContainer>
                        </Video>
                      : ''
                    }
                    {slide.attributes.foto.data && (
                      (windowWidth < 767) ?
                          <Image
                          fill
                          sizes="100%"
                          className="testimonial"
                          src={getPath(slide.attributes.foto_mobile.data.attributes.url)} //mobile
                          alt={
                            slide.attributes.foto.data.attributes.alternativeText
                              ? slide.attributes.foto.data.attributes
                                  .alternativeText
                              : `Testimonial ${i}`
                          }
                        />
                      :
                        <Image
                          fill
                          sizes="100%"
                          className="testimonial"
                          src={getPath(slide.attributes.foto.data.attributes.url)}
                          alt={
                            slide.attributes.foto.data.attributes.alternativeText
                              ? slide.attributes.foto.data.attributes
                                  .alternativeText
                              : `Testimonial ${i}`
                          }
                        />  
                    )}
                    <Desc
                      windowWidth={windowWidth}
                    >
                      <div>
                        <div className="top-wrapper">
                          <img
                            src={slide.attributes.logo.data && getPath(slide.attributes.logo.data.attributes.url)} //getPath(slide.attributes.foto.data.attributes.url)
                            alt={
                              slide.attributes.foto.data.attributes.alternativeText
                                ? slide.attributes.foto.data.attributes
                                    .alternativeText
                                : `Testimonial ${i}`
                            }
                            className="author-logo"
                          />
                          <p className="pills">
                            {
                              (slide.attributes.pillars.data && slide.attributes.subpillars.data) &&
                                slide.attributes.pillars.data.map((pillar, i, row) => {
                                  return(
                                    <span>{ pillar.attributes.nome } {(i + 1 !== row.length) ? '| ' : ''}</span>
                                  )
                                })
                            }
                          </p>
                        </div>
                        <PWrapper
                          className="p-wrapper"
                          showTopGrad={showTopGrad}
                          showBottomGrad={showBottomGrad}
                        >
                          {
                            (pillar) ?
                              (pillar == 'sem-adv') && <p className={`review ${(showAllText) ? 'mobile' : ''}`}> {(slide.attributes.testo_pillar_sem_adv) ? slide.attributes.testo_pillar_sem_adv : slide.attributes.testo} </p>
                            : <p className={`review ${(showAllText) ? 'mobile' : ''}`}> {slide.attributes.testo} </p>
                          }
                          <ReadMore onClick={() => {showAllText ? setShowAllText(false) : setShowAllText(true)}}>Leggi di {showAllText ? 'meno' : 'più'}</ReadMore>
                        </PWrapper>
                        <div className="bottom-wrapper">
                          <div className="author-info">
                            {slide.attributes.nome && (
                              <span className="author-name">{slide.attributes.nome}</span>
                            )}
                            {slide.attributes.posizione && (
                              <span>{slide.attributes.posizione}</span>
                            )}
                            {slide.attributes.azienda && (
                              <span>{slide.attributes.azienda}</span>
                            )}
                          </div>
                          {slideLink ?
                            <>
                              <div className="success-cta">
                                <RowRedLink
                                img={
                                  slide.attributes.successo_link.data != null &&
                                  getPath(
                                    slide.attributes.successo_link.data.attributes
                                      .thumbnail_success?.immagine.data.attributes
                                      .url
                                  )
                                }
                                link={slideLink}
                                >
                                  <span>Vai al caso di successo</span>
                                  <div className="link">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 61.957 61.592"
                                    >
                                      <g
                                        id="Raggruppa_401"
                                        data-name="Raggruppa 401"
                                        transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                                      >
                                        <path
                                          id="Tracciato_8"
                                          data-name="Tracciato 8"
                                          d="M0,43.811,21.905,21.905,0,0"
                                          transform="translate(30.318 0)"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="5"
                                        />
                                        <line
                                          id="Linea_23"
                                          data-name="Linea 23"
                                          x1="51.974"
                                          transform="translate(0 22.155)"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeWidth="5"
                                        />
                                      </g>
                                    </svg>
                                  </div>
                                </RowRedLink>
                              </div>
                            </>
                          : <div style={{marginTop: '110px'}}></div>}
                        </div>
                      </div>
                    </Desc>
                    {
                      (slide.attributes.slider_video.data && slide.attributes.slider_video_mobile.data) &&
                        <div className="play-icon" onClick={() => { setVideoPlaying(true); setVideoPlayingIndex(i) }}>
                          <SimplePlayIcon />
                        </div>
                    }
                  </SlideWrapper>
                </>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="custom-slider-pagination"></div>
    </Slider>
  );
}

const RowRedLink = styled(RedLink)`
  display: inline-flex;
  align-items: center;
  gap: 0px;
`;

const arrowDownAnimate = keyframes`
  20% {
    transform: translateY(2px);
  }
  40% {
    transform: translateY(10px);
  }
  60% {
    transform: translateY(5px);
  }
  80% {
    transform: translateY(10px);
  }
`;

const Slider = styled.div`
  margin-top: -4px;

  @media (min-width: 700px) {
    ${centerContent}
  }

  .swiper {
  }
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    width: 120px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      270deg,
      rgba(2, 0, 36, 0) 20%,
      rgb(255 255 255) 40%
    );
    z-index: 30;
    @media (max-width: 700px) {
      display: none;
    }
  }
  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 120px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 0) 20%,
      rgb(255 255 255) 40%
    );
    z-index: 30;
    @media (max-width: 700px) {
      display: none;
    }
  }
  .swiper-slide {
    //aspect-ratio: 4 / 3;
    width: 1024px;
    height: 700px;

    @media screen and (max-width:767px) {
      height: 700px;
    }

    @media (min-width: 1100px) {
      //aspect-ratio: 4 / 3;
    }
    & > * {
      @media (max-width: 700px) {
        margin: 0 15px;
      }
    }
  }

  .custom-slider-pagination {
    text-align: center;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    @media (min-width: 700px) {
      display: none;
    }
    .swiper-pagination-bullet {
      margin: 0;
      background-color: ${({ theme: { colors } }) => colors.whiteColor};
      border: 1px solid ${({ theme: { colors } }) => colors.greyColor};
      width: 12px;
      height: 12px;
      &-active {
        background-color: ${({ theme: { colors } }) => colors.primaryColor};
        border: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
        scale: 1.3;
      }
    }
  }

  img.testimonial {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bottom-wrapper {
    position: absolute;
    bottom: 70px;
  }

  .top-wrapper {
    position: absolute;
    top: 70px;
  }
`;
const SlideWrapper = styled.div`
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  @media (min-width: 1100px) {
    margin: 0 -330px;
  }
  &.blur {
    filter: blur(10px);
  }
  &.light-blur {
    filter: blur(6px);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      180deg,
      rgba(2, 0, 36, 0) 0%,
      rgba(25, 22, 22, 1) 100%
    );
    height: 15%;
    width: 100%;
  }

  .play-icon {
    position: absolute;
    bottom: 70px;
    right: 64px;
    z-index: 99;

    @media screen and (max-width:767px) {
      right: 2rem;
      bottom: 60px;
    }
  }

  .close-icon {
    position: absolute;
    top: 40px;
    right: 64px;
    z-index: 99;

    @media screen and (max-width:767px) {
      top: unset;
      right: 40px;
      bottom: 40px;
    }
  }

  .pills {
    opacity: 0.67;
    font-size: 24px;
    margin-top: 15px;

    @media screen and (max-width:767px) {
      font-size: 18px;
      padding-right: 2rem;
    }
  }
`;
const Logo = styled.img`
  &.logo {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    width: 12rem;
    z-index: 10;
  }
`;

const DownArrow = styled.div`
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  transition: opacity 350ms ease;
  animation: ${arrowDownAnimate} 1.5s infinite ease-in-out;
  svg {
    width: 2rem;
    stroke: ${({ theme: { colors } }) => colors.whiteColor};
    transform: rotate(315deg) translate(-5px, 5px);
    pointer-events: none;
    user-select: none;
  }
`;

/*const CloseIcon = styled.div`
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 1.7rem;
  right: 1.7rem;
  transition: transform 700ms ease, opacity 500ms ease;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? "1" : "0")};
  transform: ${({ isActive }) =>
    isActive ? "translateY(0)" : "translateY(-1rem)"};
  svg {
    width: 1.5rem;
    stroke: ${({ theme: { colors } }) => colors.whiteColor};
    pointer-events: none;
    user-select: none;
  }
`;*/

const Desc = styled.div`
  position: absolute;
  //background-color: ${({ theme: { colors } }) => colors.blackColorV3};
  inset: 0;
  z-index: 20;
  color: ${({ theme: { colors } }) => colors.whiteColor};
  display: flex;
  //flex-direction: column;
  //justify-content: space-between;
  align-items: center;
  gap: 2rem;
  overflow: hidden;
  transition: all 1.3s ease;
  padding: 0 4rem;
  //padding-top: ${({ isActive }) => (isActive ? "4rem" : "0")};
  //padding-bottom: ${({ isActive, windowWidth }) =>
    isActive ? (windowWidth < 550 ? "3rem" : "2rem") : "0"};
  //max-height: ${({ isActive }) => (isActive ? "2000px" : "0")};

  .author-info {
    height: ${({ windowWidth }) => (windowWidth < 550 ? "auto" : "15%")};
    //margin-bottom: ${({ windowWidth }) => (windowWidth < 550 ? "0" : "-1rem")};
    margin-top: 30px;
    span {
      display: block;
      text-transform: uppercase;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
    }

    .author-name {
      font-size: 28px;
      font-weight: 100;

      @media screen and (max-width:767px) {
        font-size: 20px;
      }
    }

    @media screen and (max-width:767px){
      margin-top: 0px;
    }
  }

  .author-logo {
    max-width: 250px;

    @media screen and (max-width:767px) {
      max-width: 180px !important;
      height: auto;
    }
  }

  .success-cta {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_14_20};
    color: #ffffff;
    background-color: ${({ theme: { colors } }) => colors.primaryColor};
    display: inline-block;
    border-radius: 50px;
    padding-left: 35px;
    padding-right: 10px;
    text-transform: uppercase;
    margin-top: 30px;
    
    cursor: pointer;
    span {
      transition: all 350ms ease;
    }

    @media screen and (max-width:767px) {
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-right: 2rem;
      padding: 0px;
      width: 66px;
      height: 66px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      span {
        display: none;
      }
    }

    @media (min-width: 500px) {
      &:hover {
        span {
          transform: translateX(5px);
        }
        .link {
          transform: scale(1.1);
        }
      }
    }
    .link {
      //background-color: ${({ theme: { colors } }) => colors.blackColorV1};
      border-radius: 50%;
      width: 70px;
      aspect-ratio: 1/1;
      display: grid;
      place-items: center;
      transition: all 350ms ease;

      @media (max-width: 400px) {
        width: 36px;
      }
      svg {
        width: 1.5rem;
        @media (max-width: 400px) {
          width: 1.5rem;
        }
        stroke: #ffffff;
        transform: rotate(180deg) translate(-5px, 5px);
        pointer-events: none;
        user-select: none;
      }
    }
  }
  .scroll-down-arrow {
    width: 4rem;
    aspect-ratio: 1 / 1;
    background-color: ${({ theme: { colors } }) => colors.blackColorV1};
    position: absolute;
    display: grid;
    place-items: center;
    bottom: 45%;
    @media (max-width: 440px) {
      bottom: 20%;
    }
    right: 3rem;
    border-radius: 50%;
    transition: opacity 350ms ease;
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};
    animation: ${arrowDownAnimate} 1.5s infinite ease-in-out;
    cursor: pointer;
    svg {
      width: 2rem;
      stroke: ${({ theme: { colors } }) => colors.whiteColor};
      transform: rotate(315deg) translate(-5px, 5px);
      pointer-events: none;
      user-select: none;
    }
  }

  @media screen and (max-width:767px) {
    padding: 0 2rem;
  }
`;

const PWrapper = styled.div`
  @media screen and (min-width:767px) {
    max-width: 50%;
    margin-bottom: 70px;
  }

  @media screen and (max-width:767px) {
    margin-bottom: 30px;
    p {
      margin-top: 110px;
      margin-bottom: 0.5rem !important;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 5; /* number of lines to show */
              line-clamp: 5; 
      -webkit-box-orient: vertical;

      &.mobile {
        -webkit-line-clamp: initial; /* number of lines to show */
        line-clamp: initial;
        max-height: 235px;
        overflow-y: auto;
        margin-top: 0px !important;
      }
    }
  }

  position: relative;
  height: ${({ windowWidth }) => (windowWidth < 550 ? "100%" : "70%")};
  overflow: auto;
  line-height: 28px;
  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    p {
      margin-bottom: 1rem;
    }
  }
  p/* The above code is a comment in JavaScript. It is not doing anything, but it is used to provide
  information or explanations about the code to other developers. */
  .review {
    /* max-height: 400px;
    overflow: auto; */
    height: ${({ windowWidth }) => (windowWidth < 550 ? "auto" : "100%")};
    padding-bottom: ${({ windowWidth }) => (windowWidth < 550 ? "2rem" : "0")};
    @media (max-width: 550px) {
      flex-grow: 1;
    }
  }
`;

const Video = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  z-index: 200;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  justify-self: center;
  border-radius: 30px;
  @media (max-width: 550px) {
    width: 100%;
    height: 100%;
  }

  video {
    border-radius: 30px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative !important;
    display: block;
  }
`;

const ReadMore = styled.span`
  @media screen and (min-width:767px) {
    display: none;
  }

  color: #fc1333;
`