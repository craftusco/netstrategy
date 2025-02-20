import Contatti from "@/pages/contatti";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "./utils/CloseIcon";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter();
  if (router.asPath.includes("landing-nuove") || router.asPath.includes("contatti")) {
    return <></>;
  }
  //! REFS
  const dispatch = useDispatch();
  const [openContact, setOpenContact] = useState(false);
  const [isContactAnimating, setIsContactAnimating] = useState(true);
  const containerRef = useRef();
  const contattiIconRef = useRef();
  const fadeStateContact = useSelector(
    (state) => state.menuAndContact.value.contact.fade
  );
  const closeContact = useSelector(
    (state) => state.menuAndContact.value.contact.closeContact
  );

  //! CLOSE MENU IF LOGO IS CLICKED IN HOME ---
  useEffect(() => {
    router.pathname === "/" && setOpenContact(false);
  }, [closeContact]);

  //! EXPAND MENU ---
  useEffect(() => {
    setIsContactAnimating(false);

    if (openContact) {
      // ZIndex
      gsap.to(containerRef.current, {
        zIndex: 9999,
        opacity: 1,
        pointerEvents: "auto",
      });
      // Expand black container
      gsap.to(containerRef.current, {
        "--clip": `200% at
        calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)))
        calc(100vh - (clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem))`,
        duration: 1.2,
        ease: "easeInOut",
      });
      // Hide menu icon & show close icon
      gsap.to(".contactIconRef", {
        scale: 0,
        duration: 0.3,
        ease: "EaseIn",
      });
      gsap.to(".closeContactIconRef", {
        scale: 1,
        duration: 0.3,
        ease: "EaseIn",
        onComplete: () => {
          setTimeout(() => {
            setIsContactAnimating(true);
          }, 500);
        },
      });
    } else {
      // Close black container
      gsap.to(containerRef.current, {
        "--clip": `2.4rem at
          calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)))
          calc(100vh - (clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem))`,
        duration: 0.8,
        ease: "easeIn",
      });
      // Hide close icon & show menu icon
      gsap.to(".closeContactIconRef", {
        scale: 0,
        duration: 0.3,
        ease: "EaseIn",
      });
      gsap.to(".contactIconRef", {
        scale: 1,
        duration: 0.3,
        ease: "EaseIn",
        onComplete: () => {
          // ZIndex
          gsap.to(containerRef.current, {
            zIndex: -1,
          });
          setTimeout(() => {
            setIsContactAnimating(true);
          }, 500);
        },
      });
    }
  }, [openContact]);

  //! FADE IN/OUT ---
  useEffect(() => {
    fadeStateContact && document.documentElement.scrollTop != 0
      ? gsap.to(containerRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.5,
          ease: "easeIn",
        })
      : gsap.set(containerRef.current, {
          opacity: 0,
          pointerEvents: "none",
        });
  }, [fadeStateContact]);

  //! UNMOUNT WHEN ROUTE CHANGE
  useEffect(() => {
    const handleRouteChangedContact = () => {
      setOpenContact(false);
    };

    router.events.on("routeChangeComplete", handleRouteChangedContact);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangedContact);
    };
  }, [router]);

  //! dispatch fade out when reach the contact form page / fade out if in hero
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact");
      const sectionPosition = section.getBoundingClientRect().top;
      if (!openContact) {
        fadeStateContact && !(sectionPosition <= window.innerHeight)
          ? document.documentElement.scrollTop != 0
            ? gsap.to(contattiIconRef.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 0.5,
                ease: "easeIn",
              })
            : gsap.to(contattiIconRef.current, {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.5,
                ease: "easeIn",
              })
          : gsap.to(contattiIconRef.current, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.5,
              ease: "easeIn",
            });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadeStateContact, openContact]);

  //! COMPONENT
  return (
    <>
      <ContactIconContainer
        ref={contattiIconRef}
        className="no_highlights contactIconRef"
        onClick={() => {
          isContactAnimating && setOpenContact(true);
        }}
        onMouseEnter={() => dispatch(changeColor("scaleUp"))}
        onMouseLeave={() => dispatch(changeColor("scaleDown"))}
      >
        <svg  id="Livello_1" data-name="Livello 1" viewBox="0 0 77 77">
        <defs>
          <clipPath id="clippath">
            <rect className="cls-1" x="14.95" y="18.63" width="43.54" height="39.75"/>
          </clipPath>
        </defs>
        <g id="Raggruppa_796" data-name="Raggruppa 796">
          <g className="cls-2">
            <g id="Raggruppa_795" data-name="Raggruppa 795">
              <path id="Tracciato_63" data-name="Tracciato 63" className="cls-3" d="M56.42,29.53l-3.95,3.1c-3.22,2.53-6.44,5.07-9.65,7.6-1.37,1.3-3.53,1.29-4.88-.03-3.18-2.51-6.36-5.01-9.54-7.51-.27-.21-.57-.37-.98-.63-.6,.31-1.18,.67-1.73,1.06-.71,.67-.96,1.68-.66,2.61,.07,.36,.2,.71,.39,1.02,1.48,2.58,2.98,5.15,4.46,7.73,.41,.7,1.04,1.23,1.8,1.52,.64,.29,1.38,.24,1.97-.14,.51-.32,1.05-.61,1.58-.92,1.48-.93,3.4-.79,4.73,.36,.39,.3,.75,.65,1.07,1.03,1.61,1.87,2.85,4.03,3.64,6.37,.14,.52,.21,1.07,.19,1.61,0,.84-.48,1.6-1.22,1.99-5.23,3.08-10.3,2.63-15.2-.73-2.11-1.45-3.88-3.33-5.2-5.52-2.07-3.42-4.1-6.87-6-10.38-1.72-3.05-2.49-6.55-2.21-10.04,.25-4.2,2.56-8.02,6.17-10.18,.18-.11,.37-.2,.54-.31,1.09-.78,2.59-.63,3.51,.34,.99,.89,1.81,1.95,2.42,3.14,.49,.91,.94,1.86,1.43,2.77,.11,.14,.25,.23,.42,.28,.13,.02,.25,.03,.38,0,8.39,0,16.79,0,25.18,0,.45-.01,.89,.03,1.33,.13,1.27,.28,2.16,1.44,2.09,2.74,0,6.2-.03,12.4,.02,18.6,.05,1.58-1.18,2.9-2.75,2.95-.02,0-.05,0-.07,0-3.23,.04-6.46,.02-9.69,.01-.57,.02-1.04-.43-1.05-1s.43-1.04,1-1.05h0c.22-.02,.45-.01,.67-.01h8.49c.19,0,.38,0,.58-.02,.41,.02,.75-.3,.77-.71,0-.05,0-.1,0-.15,0-.85,0-1.7,0-2.55v-15.1h0Zm-20.05,26.77c1.81,.04,3.6-.37,5.21-1.2,1.45-.78,1.5-.94,.88-2.49-.69-1.64-1.61-3.18-2.72-4.57-.33-.43-.71-.82-1.14-1.16-.61-.65-1.62-.72-2.33-.17-.6,.34-1.17,.72-1.79,1.01-.48,.25-1,.41-1.54,.47-1.97,.17-3.85-.85-4.8-2.58-1.57-2.62-3.07-5.28-4.6-7.93-.18-.32-.33-.65-.45-1-.82-2.21,.12-4.68,2.19-5.79,.53-.25,1.02-.6,1.54-.88,.65-.33,1.01-1.05,.86-1.77-.04-.43-.13-.85-.27-1.26-.66-1.82-1.59-3.54-2.75-5.09-.33-.39-.7-.75-1.11-1.05-.17-.1-.37-.12-.56-.05-.49,.23-.96,.5-1.41,.82-2.88,2.04-4.59,5.34-4.59,8.87-.03,3.12,.78,6.2,2.36,8.89,1.69,3.03,3.45,6.02,5.22,9.01,.94,1.59,2.12,3.02,3.48,4.26,2.21,2.21,5.16,3.51,8.28,3.66m18.94-28.54H29.75c.15,1.01-.09,2.04-.65,2.89,.22,.16,.42,.3,.6,.44,3.13,2.46,6.26,4.92,9.38,7.38,1.06,.84,1.55,.83,2.63-.01l9.87-7.77,3.73-2.94"/>
            </g>
          </g>
        </g>
      </svg>
      </ContactIconContainer>
      <Container ref={containerRef}>
        <Contatti />
        {/* Icons */}
        <CloseIconContainer
          className="no_highlights closeContactIconRef"
          onMouseEnter={() => dispatch(changeColor("scaleUp"))}
          onMouseLeave={() => dispatch(changeColor("scaleDown"))}
          onClick={() => {
            isContactAnimating && setOpenContact(false);
          }}
        >
          <CloseIcon />
        </CloseIconContainer>
        {/* Content */}
      </Container>
    </>
  );
}

//! STYLE
const Container = styled.div`
  opacity: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: ${({ theme: { colors } }) => colors.blackColorV3};

  --clip: 2.4rem at
    calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)))
    calc(100vh - (clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem));
  clip-path: circle(var(--clip));
`;

const CloseIconContainer = styled.div`
  position: fixed;
  bottom: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem);
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  width: 4.8rem;
  height: 4.8rem;
  z-index: 999;
  scale: 0;
  cursor: pointer;
  overflow: hidden;
`;

const ContactIconContainer = styled.div`
  @media (max-width: 950px) {
    display: none;
  }
  position: fixed;
  bottom: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem);
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  width: 4.8rem;
  height: 4.8rem;
  z-index: 1200;
  cursor: pointer;
  overflow: hidden;
  background-color: #000;
  border-radius: 50%;
  svg {
    fill: #fff;
  }
`;
