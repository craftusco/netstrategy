import styled from "styled-components";
import { changeColor } from "../../redux/customCursorSlice";
import { useDispatch } from "react-redux";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "./utils/CloseIcon";
import Link from "next/link";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import { useRouter } from "next/router";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import getPath from "@/utils/getPath";
import PageLoader from "./utils/PageLoader";

export default function RedSidebarMenu({
  data,
  pillars,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  if (!pillars) return;

  //! REFS ---
  const dispatch = useDispatch();
  const router = useRouter();

  //! OPEN/CLOSE SIDEBAR ---
  const sidebarContainerRef = useRef();
  const sidebarRef = useRef();
  const redScreenRef = useRef();
  const closeIconSidebarRef = useRef();
  const [image, setImage] = useState("/transparent-fallback.webp");

  const handleOpenSidebar = () => {
    // scale icon to 1
    gsap.to(closeIconSidebarRef.current, {
      scale: "1",
      duration: 0.5,
      ease: "easeIn",
    });
    // show sidebar
    gsap.to(sidebarRef.current, {
      x: "0",
      duration: 0.5,
      ease: "easeIn",
    });
    if (window.innerWidth >= 1000) {
      // move nav item to the left
      gsap.to(
        `.ulRef > *`,
        {
          x: "-80px",
          duration: 0.5,
          ease: "easeIn",
          stagger: 0.02,
        },
        "<"
      );
    }
  };
  const handleCloseSidebar = () => {
    // scale icon to 0
    gsap.to(closeIconSidebarRef.current, {
      scale: "0",
      duration: 0.5,
      ease: "easeIn",
    });
    // hide sidebar
    gsap.to(sidebarRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "easeIn",
    });
    if (window.innerWidth >= 1000) {
      // move nav item to the right
      gsap.to(
        `.ulRef > *`,
        {
          x: "0",
          duration: 0.5,
          ease: "easeIn",
          stagger: 0.02,
        },
        "<"
      );
    }
  };

  useEffect(() => {
    isSidebarOpen ? handleOpenSidebar() : handleCloseSidebar();
  }, [isSidebarOpen]);

  //! CLICK TRANSITION RED ---
  const handleClick = (e, link, img) => {
    // Prevent link next
    e.preventDefault();
    setImage(img);
    if (router.asPath !== link) {
      gsap.to(window, { duration: 1, scrollTo: 0 });
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";

      // Sidebar to left
      gsap.to(sidebarRef.current, {
        delay: 0.1,
        x: "-100vw",
        duration: 1,
        ease: "Power3.easeOut",
      });

      const menuContainer = document.querySelector(
        "[class*='Menu__Container']"
      );
      gsap.to(menuContainer, {
        scrollTo: {
          y: 0,
        },
        duration: 0.8,
        ease: "Power3.easeOut",
      });
      // Screen to left then push to new page
      gsap.to(redScreenRef.current, {
        delay: 0.1,
        x: "0",
        duration: 1,
        ease: "Power3.easeOut",
        onComplete: () => {
          router.push(link);
        },
      });

    }
  };

  useEffect(() => {
    const handleRouteChanged = () => {
      gsap.to(redScreenRef.current, {
        x: "100%",
      });
    };

    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);
  // gsap.to(redScreenRef.current, {
  //   display: 'none',
  // })

  //! COMPONENENT ---
  return (
    <SidebarContainer
      ref={sidebarContainerRef}
      onMouseEnter={() => dispatch(changeColor("black"))}
      onMouseLeave={() => dispatch(changeColor("primary"))}
    >
      <Sidebar ref={sidebarRef}>
        {/* icons */}
        <CloseIconSidebarContainer
          ref={closeIconSidebarRef}
          className="no_highlights"
          onClick={() => setIsSidebarOpen(false)}
        >
          <CloseIcon />
        </CloseIconSidebarContainer>
        <SidebarContent>
          {/* pillar */}
          <ul>
            {pillars.map(({ name, link, img }, i) => (
              <React.Fragment key={i}>
              <li>
                <Link
                  href={getPath(`${link}`, true)}
                  onClick={(e) => handleClick(e, link, img)}
                >
                  {`${(++i).toString().padStart(2, "0")}. ${name}`}
                </Link>
              </li>
              </React.Fragment>
            ))}
          </ul>
          {/* <span>{data?.sottotitolo}</span> */}
        </SidebarContent>
      </Sidebar>
      {/* RedScreen */}
      <RedScreenContainer ref={redScreenRef}>
        <RedScreenContent>
          <span></span>
          <RedScreenImageContainer>
            <Image src={image} alt="Immagine di caricamento" fill sizes="100%" quality={100} priority/>
          </RedScreenImageContainer>
          <span className="loader"><PageLoader></PageLoader></span>
        </RedScreenContent>
      </RedScreenContainer>
    </SidebarContainer>
  );
}

//! STYLE ---
const SidebarContainer = styled.div``;

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  z-index: 999;
  right: -2px;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  width: clamp(20.5rem, calc(19.1rem + 5.95vw), 26.25rem);
  height: 100%;
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(100vw);
`;

const SidebarContent = styled.div`
  height: 100%;
  color: white;
  height: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ul {
    margin-block: auto;
    list-style: none;
    line-height: 3rem;
    
    li {
      line-height: 3rem;
      a {
        text-transform: uppercase;
        font-family: ${({ theme: { fonts } }) => fonts.medium};
        font-size: 1.25rem;
        transition: color 0.3s ease-in;

        &:hover {
          color: black;
        }
      }
    }
  }

  & > span {
    margin-top: auto;
  }
`;

// Close icon sidebar
const CloseIconSidebarContainer = styled.div`
  position: absolute;
  top: 2rem;
  z-index: 1000;
  right: calc(clamp(20.5rem, calc(19.1rem + 5.95vw), 26.25rem) - 2.4rem);
  @media (max-width: 340px) {
    right: calc(clamp(16.5rem, calc(16.1rem + 5.95vw), 26.25rem) - 2.4rem);
  }
  width: 4.8rem;
  height: 4.8rem;
  scale: 1;
  cursor: pointer;
`;

//! Redscreen
const RedScreenContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  z-index: 999;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  transform: translateX(100%);
`;

const RedScreenContent = styled.div`
  ${centerContent};
  height: 100dvh;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  place-items: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  color: white;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr;
  }
  
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

const RedScreenImageContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  aspect-ratio: 3 / 2;
  width: calc(60vw - (clamp(1rem,calc(0.48rem + 2.2vw),3.13rem) * 4));
  @media (min-width: 1280px) {
    width: calc(50vw - (clamp(1rem,calc(0.48rem + 2.2vw),3.13rem) * 4));
  }
  @media (max-width: 700px) {
    width: calc(80vw - (clamp(1rem,calc(0.48rem + 2.2vw),3.13rem) * 4));
  }
  @media (max-width: 400px) {
    width: calc(90vw - (clamp(1rem,calc(0.48rem + 2.2vw),3.13rem) * 4));
  }
`;
