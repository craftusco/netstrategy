import React, { useEffect, useRef } from "react";
import ContactIcon from "./ContactIcon";
import styled from "styled-components";
import { useLenis } from "@studio-freight/react-lenis";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

export default function ContactNav() {
  //! REFS
  const fadeState = useSelector((state) => state.menuAndContact.value.contact);
  const containerRef = useRef();

  //! SCROLL TO CONTACT
  const lenis = useLenis();

  const handleArrowNav = () => {
    lenis.scrollTo("#contact");
  };

  //! FADE IN/OUT ---
  useEffect(() => {
    fadeState &&
      gsap.to(containerRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "easeIn",
      });
  }, [fadeState]);

  return (
    <ContactIconContainer ref={containerRef} onClick={handleArrowNav}>
      <ContactIcon />
    </ContactIconContainer>
  );
}

const ContactIconContainer = styled.div`
  position: fixed;
  cursor: pointer;
  bottom: calc(clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem)); // 24px → 40px;
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  width: 4.8rem;
  height: 4.8rem;
  z-index: 998;
  opacity: 0;
`;
