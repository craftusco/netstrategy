import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { createRef, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Flip } from "gsap/all";
import { useRouter } from "next/router";
import { changeColor } from "../../../redux/customCursorSlice";
import { redScreenLoader } from "../../../redux/animationsSlice";
import { updateSuccessSelected } from "../../../redux/filterSuccessesSlice";
import getPath from "@/utils/getPath";
import PageLoader from "./PageLoader";
import RedLink from "./RedLink";

export default function MenuNav({ data, setIsSidebarOpen, isSidebarOpen }) {
  if (!data) return;

  //! REFS
  const redBackImageFullRef = useRef();
  const myRefs = data.map(() => createRef());
  const router = useRouter();
  const dispatch = useDispatch();

  //! LINK MOUSE OVER ---
  const handleMouseOver = (target) => {
    if (window.innerWidth >= 1099) {
      // image
      gsap.set(target.lastChild, {
        y: "-50%",
        x: "-50%",
      });
      // red back
      gsap.set(target.firstChild, {
        y: "-47%",
        x: "-57%",
      });
      gsap.to([target.lastChild, target.firstChild], {
        delay: 0.2,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "easeIn",
      });
    }
  };

  //! LINK MOUSE LEAVE ---
  const handleMouseLeave = (target) => {
    if (window.innerWidth > 1099) {
      // image
      gsap.to(target.lastChild, {
        delay: 0.2,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "easeIn",
      });
      // red back
      gsap.to(target.firstChild, {
        delay: 0.2,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "easeIn",
      });
    }
  };

  //! ON CLICK TRANSITION ---
  const handleClick = (target, index, e, link, img) => {
    // resetto parametri filtri
    dispatch(
      updateSuccessSelected({
        total_values: 0,
        total: 0,
        total_categories: [],
        query: null,
      })
    );

    // prevent link next
    e.preventDefault();
    if (router.pathname !== link) {
      handleMouseOver(target);
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";
      // Scroll to top
      window.scrollTo(0, 0);
      // Transition mobile
      if (window.innerWidth <= 1000) {
        dispatch(redScreenLoader({ link, img }));
      }
      // Transition desktop
      if (window.innerWidth > 1000) {
        // Red to full screen
        const redState = Flip.getState([
          target.lastChild.previousElementSibling,
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
        const imageStateMenu = Flip.getState([
          target.lastChild,
          myRefs[index].current,
        ]);

        gsap.set(target.lastChild, {
          display: "none",
        });
        gsap.set(myRefs[index].current, {
          display: "block",
        });

        const to_hide = myRefs[index].current;

        Flip.from(imageStateMenu, {
          duration: 1,
          absolute: true,
          ease: "redEase",
          // push to new page
          onComplete: () => {
            router.push(link);
          },
        });
        
      }
    }
  };

  useEffect(() => {
    const handleRouteChanged = () => {

      document.querySelectorAll('.imageFull').forEach(el => {
         gsap.set(el, {
           opacity: "1",
           display: 'none',
           transform: "translate(-50%, -50%) scale(1,1)",
         });
       })

      document.querySelectorAll('.redBackImage').forEach(el => {
        gsap.set(el, {
          display: 'block',
          transform: "scale(0,0)",
        });
      })

      document.querySelectorAll('.backImage').forEach(el => {
        gsap.set(el, {
          display: 'block',
          transform: "scale(0,0)",

        });
      })
      
      gsap.set(redBackImageFullRef.current, {
        display: 'none',
        transform: "translate(-50%, -50%) scale(1, 1)",
      });

    };

    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);

  //! FADE IN/OUT
  const navRef = useRef();
  // const closeMenu = useSelector(
  //   (state) => state.menuAndContact.value.menu.closeMenu
  // );
  // const menu = useSelector((state) => state.menuAndContact.value.menu);
  // const contact = useSelector((state) => state.menuAndContact.value.contact);
    

  // useEffect(() => {
  //   let handleScroll = () => {
  //     document.documentElement.scrollTop > 0
  //       ? gsap.to(navRef.current, {
  //           opacity: 0,
  //           pointerEvents: "none",
  //           duration: 0.5,
  //         })
  //       : gsap.to(navRef.current, {
  //           opacity: 1,
  //           pointerEvents: "auto",
  //           duration: 0.5,
  //         });
  //   };

  //   let logoCtx = gsap.context(() => {
  //     document.addEventListener("scroll", handleScroll);
  //   }, navRef.current);
  //   return () => {
  //     logoCtx.revert();
  //     document.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  //! COMPONENT ---
  return (
    <>
      <Nav ref={navRef}>
        <ul className="ulRef no_highlights">
          {router.pathname != "/" && <li className="home">
            <RedLink link="/">HOME</RedLink>
          </li>}
          {data.map(({ name, number, img, link, video }, i) =>
            !link ? (
              <li
                data-number={number ? `(${number})` : ""}
                key={i}
                onMouseEnter={(e) => {
                  handleMouseOver(e.currentTarget);
                  dispatch(changeColor("scaleUp"));
                }}
                onMouseLeave={(e) => {
                  handleMouseLeave(e.currentTarget);
                  dispatch(changeColor("scaleDown"));
                }}
                onClick={(e) => {
                  setIsSidebarOpen(true);
                  handleMouseLeave(e.currentTarget);
                }}
              >
                <RedBackImage className="redBackImage" data-flip-id="red"></RedBackImage>
                {name}.
                <ImageContainer className="backImage" data-flip-id={i}>
                  <Image
                    src={img}
                    alt="Immagine di caricamento"
                    fill
                    sizes="100%"
                    quality={100}
                  />
                </ImageContainer>
              </li>
            ) : (
              <Link href={getPath(`${link}`, true)} key={i}>
                <li
                  data-number={number ? `(${number})` : ""}
                  onMouseEnter={(e) => {
                    handleMouseOver(e.currentTarget);
                    dispatch(changeColor("scaleUp"));
                  }}
                  onMouseLeave={(e) => {
                    handleMouseLeave(e.currentTarget);
                    dispatch(changeColor("scaleDown"));
                  }}
                  onClick={(e) => {
                    handleClick(e.currentTarget, i, e, link, img);
                    setIsSidebarOpen(false);
                  }}
                >
                  <RedBackImage className="redBackImage" data-flip-id="red"></RedBackImage>
                  {name}.
                  <ImageContainer className="backImage" data-flip-id={i}>
                    {false ? (
                      <video
                        loop
                        autoPlay
                        preload="auto"
                        playsInline
                        muted={true}
                        alt="preview"
                      >
                        <source src={video} />
                      </video>
                    ) : (
                      <Image
                        src={img}
                        alt="preview"
                        fill
                        sizes="100%"
                        quality={100}
                      />
                    )}
                  </ImageContainer>
                </li>
              </Link>
            )
          )}
        </ul>
      </Nav>
      {/*//! Red & images full for transition animation flip */}
      <RedBackImageFull data-flip-id="red" ref={redBackImageFullRef}>
        <span className="loader">
          <PageLoader></PageLoader>
        </span>
      </RedBackImageFull>
      {data.map(({ img, video }, i) => (
        <ImageFull className="imageFull" data-flip-id={i} ref={myRefs[i]} key={i}>
          {false ? (
            <video
              loop
              autoPlay
              preload="auto"
              playsInline
              muted={true}
              quality={100}
              alt="Video di caricamento"
              style={{ width: "100%" }}
            >
              <source src={video} />
            </video>
          ) : (
            <Image
              quality={100}
              src={img}
              alt="Immagine di caricamento"
              fill
              sizes="100%"
            />
          )}
        </ImageFull>
      ))}
    </>
  );
}

//! STYLE
const Nav = styled.div`
  opacity: 1;
  max-width: 1300px;
  
  @media (min-width: 1000px) {
    margin-block: auto;
  }
  @media (max-width: 950px) {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    row-gap: 0.6rem;

    li {
      font-family: ${({ theme: { fonts } }) => fonts.main};
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
      line-height: 0.8em;
      text-transform: uppercase;
      color: white;
      display: inline-block;
      position: relative;
      transition: color 0.2s ease-in;
      cursor: pointer;

      
      @media (max-width: 450px) {
        font-size: clamp(4.0625rem, -2.7734rem + 31.25vw, 5.3125rem);
      }

      @media (max-width: 1000px) {

        &:hover {
          color: ${({ theme: { colors } }) => colors.primaryColor};
        }
      }

      a {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }

      &::after {
        content: attr(data-number);
        font-size: clamp(0.81rem, calc(0.77rem + 0.19vw), 1rem);
        font-family: ${({ theme: { fonts } }) => fonts.medium};
        color: ${({ theme: { colors } }) => colors.greyColor};
        position: absolute;
        top: 0;
        line-height: 1em;
        display: none;

        @media (min-width: 1280px) {
          display: block;
          right: -0.5rem;
        }
      }
    }

    @media (min-width: 1000px) {
      & {
        flex-direction: row;
        flex-wrap: wrap;
        column-gap: 1.7rem;
      }
    }
  }

  .home {
    display: none;
    @media (max-width: 1000px) {
      margin-top: 1rem;
      display: block;
    }
  }
`;

const ImageContainer = styled.div`
  pointer-events: none;
  opacity: 0;
  z-index: 999;
  scale: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 1rem;
  overflow: hidden;
  width: clamp(16rem, calc(11.98rem + 5.85vw), 19rem);
  height: clamp(11rem, calc(6.98rem + 5.85vw), 14rem);
  transform-origin: 50% 50%;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const RedBackImage = styled.div`
  pointer-events: none;
  opacity: 0;
  z-index: 998;
  scale: 0;
  position: absolute;
  top: 54%;
  left: 55%;
  border-radius: 1rem;
  width: clamp(16rem, calc(11.98rem + 5.85vw), 19rem);
  height: clamp(11rem, calc(6.98rem + 5.85vw), 14rem);
  transform-origin: 50% 50%;
  background: ${({ theme: { colors } }) => colors.primaryColor};
`;

const ImageFull = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  border-radius: 1rem;
  overflow: hidden;
  transform: translate(-50%, -50%);
  display: none;

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

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const RedBackImageFull = styled.div`
  display: none;
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100dvh;
  /* transform-origin: 50% 50%; */
  background: ${({ theme: { colors } }) => colors.primaryColor};

  .loader {
    position: absolute;
    left: 50%;
    bottom: 15dvh;
    text-align: center;
    transform: translateX(-50%);

    @media (min-width: 1280px) {
      inset: initial;
      top: 50%;
      width: 25vw;
      right: 15vw;
      transform: translateX(50%) translateY(-15%);
    }
  }
`;
