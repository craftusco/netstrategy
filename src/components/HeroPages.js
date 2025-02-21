import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logo from './utils/Logo';
import { centerContent } from '@/styles/mixins';
import Image from 'next/image';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';
import { menuAndContact } from '../../redux/Menu&ContactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import getPath from '@/utils/getPath';
import RestartVideoIcon from './utils/RestartVideoIcon';
import ToggleAudioIcons from './utils/ToggleAudioIcons';
import PageLoader from './utils/PageLoader';
gsap.registerPlugin(CustomEase);
CustomEase.create('redEase', '0.79, 0.14, 0.15, 1');

export default function HeroPages({
  data,
  children,
  staticData = { hero_intestazione: 'Building Future Together' },
  logo = 'black',
  imgOverlay,
  page = null,
  altText,
}) {
  //! REFS
  const redContainerRef = useRef();
  const redImageContainer = useRef();
  const redSpanName = useRef();
  const redSpanCounter = useRef();
  const playInRef = useRef();
  const containerRef = useRef();
  const heroContainerRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const timelineRef = useRef(null);

  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  //! MAIN ANIMATION
  useEffect(() => {
    let heroPagesCtx = gsap.context(() => {
      // Disable scroll
      document.querySelector('body').style.overflowY = 'hidden';
      // Scroll to top
      window.scrollTo(0, 0);

      // Mobile animations
      if (window.innerWidth < 1280) {
        let redTl = gsap.timeline({
          onComplete: () => {
            document.querySelector('body').style.overflowY = 'auto';
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
                },
              })
            );
            // If there is anchor scroll to anchor after the hero animation
            router.asPath === '/privacy-policy-e-cookies#policy' &&
              gsap.to(window, {
                duration: 0.5,
                scrollTo: { y: '#policy', offsetY: '30' },
              });
          },
        });
        timelineRef.current = redTl;
        // spans opacity 1
        redTl.to(redSpanName.current, {
          delay: 0.3,
          opacity: 1,
          duration: 0.5,
        });
        // span counter
        redTl.to(
          redSpanCounter.current,
          {
            duration: 0.3,
            opacity: 0.5,
          },
          '<'
        );
        //! stop mobile animation
        // red screen
        redTl.to(redContainerRef.current, {
          delay: 0.3,
          y: '-100vh',
          duration: 0.5,
        });
        //! end stop mobile animation
      }
      // Desktop animations
      // Red loader animation
      else {
        let redTl = gsap.timeline({
          onComplete: () => {
            document.querySelector('body').style.overflowY = 'auto';
            dispatch(
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
                  },
                })
              )
            );
            // If there is anchor scroll to anchor after the hero animation
            router.asPath === '/privacy-policy-e-cookies#policy' &&
              gsap.to(window, {
                duration: 0.5,
                scrollTo: { y: '#policy', offsetY: '30' },
              });
          },
        });
        timelineRef.current = redTl;
        // spans opacity 1
        redTl.to(redSpanName.current, {
          delay: 0.3,
          opacity: 1,
          duration: 0.5,
        });
        // span counter
        redTl.to(
          redSpanCounter.current,
          {
            // textContent: "+=100%",
            // roundProps: "textContent",
            duration: 0.3,
            opacity: 0.5,
            // ease: "easeInOut",
          },
          '<'
        );
        //! stop animation
        // spans opacity 0
        redTl.to([redSpanCounter.current, redSpanName.current], {
          delay: -0.5,
          opacity: '0',
          duration: 0.5,
        });
        // image
        redTl.to(redImageContainer.current, {
          delay: 0,
          position: 'absolute',
          // maxWidth: "100vw",
          // maxHeight: "100vh",
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          duration: 0.7,
          ease: 'redEase',
        });
        //! end stop animation

        // redTl.to(`#video`, {
        //   borderRadius: 0,
        //   duration: 1,
        //   delay: "-1.2",
        //   ease: "redEase",
        // });
        // Content text animation ---------------------------------------------
        redTl.to('.heroTitleRef > *', {
          delay: '-0.8',
          y: 0,
          duration: 0.8,
          ease: 'redEase',
        });
        // nav animation
        redTl.to(`.leftSideRef > *, .leftSideRef`, {
          delay: '-0.8',
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'redEase',
          stagger: 0.1,
        });
        redTl.to(`.navRef > *`, {
          delay: '-0.8',
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'redEase',
          stagger: 0.1,
        });
        redTl.to(playInRef.current, {
          delay: '-1.2',
          duration: 0.5,
          ease: 'easeInOut',
          opacity: 1,
        });
      }
    }, containerRef.current);
    return () => heroPagesCtx.revert();
  }, []);

  //! handle when route change for subpillars
  useEffect(() => {
    const handleRouteChange = () => {
      // Disable scroll
      document.querySelector('body').style.overflowY = 'hidden';
      // Scroll to top
      window.scrollTo(0, 0);
      timelineRef.current.restart();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  //! Video controls
  const heroPagesVideo = useRef();
  const redScreenVideo = useRef();
  const [isMuted, setIsMuted] = useState(true);

  const restartVideo = () => {
    if (heroPagesVideo.current) {
      heroPagesVideo.current.currentTime = 0;
      heroPagesVideo.current.play();
    }
    if (redScreenVideo.current) {
      redScreenVideo.current.currentTime = 0;
      redScreenVideo.current.play();
    }
  };

  //! handle resize
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      // if (window.innerWidth < 1280) {
      //   gsap.to(redContainerRef.current, {
      //     opacity: 0,
      //   });
      // } else {
      //   gsap.to(redContainerRef.current, {
      //     opacity: 1,
      //   });
      // }
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let staticImg = getPath('/transparent-fallback.webp');

  let img_desktop =
    data?.immagine && data?.immagine?.data
      ? getPath(data?.immagine?.data?.attributes?.url)
      : data?.cover_image;

  let img_mobile =
    data?.immagine_mobile && data?.immagine_mobile.data
      ? getPath(data?.immagine_mobile?.data?.attributes?.url)
      : img_desktop;

  img_desktop = img_desktop ? img_desktop : staticImg;
  img_mobile = img_mobile ? img_mobile : img_desktop;

  //! COMPONENENT ---
  return (
    <Container ref={containerRef}>
      {data?.video && data?.video.data ? (
        <VideoContainer>
          <video
            loop
            autoPlay
            preload="auto"
            playsInline
            muted={isMuted}
            quality={100}
            alt="Video di presentazione"
            ref={heroPagesVideo}
            title={data?.titolo ? data?.titolo : data?.meta_name ? data?.meta_name : ''}
            description={data?.meta_description ? data?.meta_description : ''}
            duration={data?.meta_duration ? data?.meta_duration : ''}
            thumbnail={data?.meta_thumbnail?.data ? getPath(data?.meta_thumbnail?.data) : ''}
          >
            <source src={getPath(data?.video.data?.attributes.url)} />
          </video>
        </VideoContainer>
      ) : (
        <MobileBackground imgOverlay={imgOverlay}>
          <MobileImageContainer
            imgOverlay={imgOverlay}
            ref={redImageContainer}
            className="imageRef"
          >
            <Image
              quality={100}
              src={img_mobile}
              alt={
                data?.immagine?.data?.attributes?.alternativeText
                  ? data?.immagine?.data?.attributes?.alternativeText
                  : altText
                  ? altText
                  : 'Immagine di presentazione sezione sito web'
              }
              fill
              sizes="100%"
              priority
            />
          </MobileImageContainer>
        </MobileBackground>
      )}
      {/* Red screen loader */}
      <RedContainer className='redContainer' ref={redContainerRef}>
        <RedContent>
          <span className="page-name" style={{ textTransform: 'uppercase' }} ref={redSpanName}>
            {data?.nome}
          </span>
          {data?.video && data?.video.data ? (
            <ImageContainer ref={redImageContainer} className="imageRef">
              <video
                loop
                autoPlay
                preload="auto"
                playsInline
                muted={isMuted}
                quality={100}
                alt="Video di presentazione"
                ref={redScreenVideo}
              >
                <source src={getPath(data?.video.data?.attributes.url)} />
              </video>
            </ImageContainer>
          ) : (
            <ImageContainer imgOverlay={imgOverlay} ref={redImageContainer} className="imageRef">
              <Image
                quality={100}
                src={img_desktop}
                alt={
                  data?.immagine?.data?.attributes?.alternativeText
                    ? data?.immagine?.data?.attributes?.alternativeText
                    : altText
                    ? altText
                    : 'Immagine di presentazione sezione sito web'
                }
                fill
                sizes="100%"
                priority
                // priority={true}
              />
            </ImageContainer>
          )}
          <span className="counter" ref={redSpanCounter}>
            <PageLoader></PageLoader>
          </span>
        </RedContent>
      </RedContainer>
      {/* Hero */}
      {/* Header */}
      <Header>
        <LeftSide className="leftSideRef">
          <Logo fadeScroll />
        </LeftSide>
      </Header>
      {/* <RightSide logo={logo} className="leftSideRef">
        {data?.spanHeader}
      </RightSide> */}
      <LittleTittle className="leftSideRef">{staticData.hero_intestazione}</LittleTittle>
      {/* Content */}
      <HeroContainer ref={heroContainerRef}>
        {/* content */}
        <Content page={page}>
          <ContentChildren className="heroTitleRef">{children}</ContentChildren>
          {data?.video?.data && !router.pathname.includes('nettalk') && (
            <VideoControls>
              <div className="restartIcon" onClick={restartVideo}>
                <RestartVideoIcon isAbsolute={false} />
              </div>
              <div
                className="muteIcon"
                onClick={() => {
                  setIsMuted(!isMuted);
                }}
              >
                <ToggleAudioIcons isAbsolute={false} isMutedTrigger={isMuted} />
              </div>
            </VideoControls>
          )}
        </Content>
      </HeroContainer>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  position: relative;
  @media (min-width: 1280px) {
    height: 100dvh;
  }
`;

// Red loader screen
const RedContainer = styled.div`
  /* ${centerContent}; */
  background: ${({ theme: { colors } }) => colors.primaryColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 99;
  overflow: hidden;
`;

const RedContent = styled.div`
  ${centerContent};
  height: 100dvh;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  place-items: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  color: white;

  & > span {
    display: inline-block;
    opacity: 0;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 4.3rem;
    line-height: 4rem;
    font-family: ${({ theme: { fonts } }) => fonts.main};

    &.page-name {
      top: 18dvh;
      text-align: center;
      transform: translateX(-50%) translateY(-50%);

      @media (max-width: 450px) {
        font-size: 3rem;
        line-height: 2.8rem;
      }
    }
    &.counter {
      bottom: 15dvh;
      text-align: center;
    }
    @media (min-width: 1280px) {
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: 1fr;
      inset: initial;
      top: 50%;
      width: 25vw;
      &.page-name {
        text-align: left;
        top: 50%;
        left: 15vw;
        transform: translateX(-50%) translateY(-50%);
      }
      &.counter {
        right: 15vw;
        transform: translateX(50%) translateY(-15%);
      }
    }
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 1rem;
  overflow: hidden;
  transform: translate(-50%, -50%);
  ${({ imgOverlay }) => (imgOverlay ? 'filter: brightness(0.7)' : '')};
  aspect-ratio: 3 / 2;
  width: calc(60vw - (clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 4));
  @media (min-width: 1280px) {
    width: calc(50vw - (clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 4));
  }
  @media (max-width: 700px) {
    width: calc(80vw - (clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 4));
  }
  @media (max-width: 400px) {
    width: calc(90vw - (clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 4));
  }
  /* @media (max-width: 30rem) {
    width: calc(100vw - clamp(2rem, calc(0.96rem + 4.4vw), 6.26rem));
  } */

  img,
  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Hero
const Header = styled.header`
  ${centerContent};
  width: 100%;
  transform: translateX(-50%);
  left: 50%;
  height: 7.8rem;
  display: flex;
  align-items: center;
  margin-top: 0px;
  svg {
    fill: ${(props) => props.logo};
  }

  span {
    display: none;
  }
  z-index: 50;
  position: relative;

  @media (min-width: 1280px) {
    height: 4.8rem;
    margin-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
    position: absolute;
    z-index: 999;

    span {
      display: inline-block;
    }
  }
`;

const HeroContainer = styled.div`
  position: relative;

  @media (min-width: 1280px) {
    height: 100vh;
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  div,
  span {
    flex: 1;
  }

  svg {
    fill: black;
  }

  span {
    display: none;
  }

  @media (min-width: 1280px) {
    svg {
      fill: white;
    }

    span {
      display: inline-block;
    }

    div,
    span {
      opacity: 0;
      transform: translateY(-300%);
    }
  }
`;

const Content = styled.div`
  margin-top: 1rem; //
  height: calc(100vh - 7.8rem);
  @media (max-width: 600px) {
    height: ${({ page }) => (page === 'blog' ? 'calc(60vh - 7.8rem)' : '')};
  }
  @media (max-width: 600px) {
    height: ${({ page }) => (page != 'blog' ? 'calc(80vh - 7.8rem)' : '')};
  }
  /* min-height: 30rem; */
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;

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
    height: 100dvh;
    z-index: 996;

    img {
      display: none;
    }
  }
`;

const ContentChildren = styled.div`
  ${centerContent}
  padding-left: 0;
  padding-right: 0;
  transform: translateX(-50%);
  left: 50%;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;

    & > * {
      transform: translateY(120%);
    }
  }
`;

const MobileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center; */
  ${({ imgOverlay }) =>
    imgOverlay ? 'filter: brightness(0.7)' : ''}/* @media (min-width: 1280px) {
    display: none;
  } */
`;

const MobileImageContainer = styled.div`
  img {
    object-fit: cover;
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LittleTittle = styled.span`
  z-index: 999;
  position: absolute;
  top: 73px;
  right: 160px;
  transform: translateX(-65%);
  display: none;
  color: white;
  @media (min-width: 1280px) {
    display: block;
    opacity: 0;
    transform: translateY(-200%);
  }
`;

const RightSide = styled.span`
  color: ${(props) => props.logo};
  @media (min-width: 1280px) {
    opacity: 0;
    transform: translateY(-200%);
  }
`;

const VideoControls = styled.div`
  display: flex;
  gap: 0.75rem;
  position: absolute;
  bottom: 10rem;
  right: 8rem;
  @media (max-width: 800px) {
    bottom: 15rem;
    left: 1rem;
  }
`;
