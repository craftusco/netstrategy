import { gsap } from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/all";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function ScrollProgressBar({ steps }) {
  //! REFS
  const containerRef = useRef();
  const contentRef = useRef();

  //! SCROLL
  useEffect(() => {
    let ScrollProgressBarCtx = gsap.context(() => {
      // Refs
      let targets = gsap.utils.toArray(".redRef");
      let anchorsRefs = [];

      steps.forEach(({ name, anchor }) => {
        let tmp = document.querySelector(anchor);
        anchorsRefs.push(tmp);
      });

      // Fade in/out
      const contentElement = contentRef.current;

      // Animation 1: Fade in when the scrollbar reaches element B
      gsap.fromTo(
        contentElement,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5, // Adjust the duration as needed
          scrollTrigger: {
            trigger: anchorsRefs[0],
            start: "-50% top",
            end: "+=10",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation 2: Fade out when the scrollbar reaches element C
      gsap.fromTo(
        contentElement,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5, // Adjust the duration as needed
          scrollTrigger: {
            trigger: anchorsRefs[anchorsRefs.length - 1],
            start: "bottom top",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Red fill
      for (let i = 0; i < steps.length; i++) {
        gsap.to(targets[i], {
          width: "100%",
          scrollTrigger: {
            trigger: anchorsRefs[i],
            start: "top 100",
            scrub: true,
            // markers: true,
          },
        });
      }
    }, containerRef.current);
    return () => {
      ScrollProgressBarCtx.revert();
    };
  }, [steps]);

  //! Set opacity to 0 in the first load
  useEffect(() => {
    const contentElement = contentRef.current;
    gsap.set(contentElement, { opacity: 0 });
  }, [steps]);

  //! HANDLE SCROLL ON CLICK
  let handleClick = (anchor) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: anchor, offsetY: "110" },
    });
  };

  //! UNMOUNT WHEN ROUTE CHANGE
  // const router = useRouter();

  // useEffect(() => {
  //   // const handleRouteStartContact = () => {
  //   //   setIsMounted(false);
  //   //   // ScrollTrigger.refresh();
  //   // };

  //   const handleRouteCompleteContact = () => {
  //     ScrollTrigger.refresh();
  //   };

  //   // router.events.on("hashChangeStart", handleRouteStartContact);
  //   router.events.on("routeChangeComplete", handleRouteCompleteContact);

  //   return () => {
  //     // router.events.off("hashChangeStart", handleRouteStartContact);
  //     router.events.off("routeChangeComplete", handleRouteCompleteContact);
  //   };
  // }, [router]);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 3000);
  }, [steps]);

  //! COMPONENT
  return (
    <div ref={containerRef}>
      <Wrapper ref={contentRef}>
        <Container>
          <Content>
            {steps.map(({ name, anchor }, i) => (
              <Step key={i} onClick={() => handleClick(anchor)}>
                <span>{name}</span>
                <Line>
                  <Red className="redRef"></Red>
                </Line>
              </Step>
            ))}
          </Content>
        </Container>
      </Wrapper>
    </div>
  );
}

//! COMPONENT
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  height: 120px;
  z-index: 999;
  opacity: 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: calc(
    clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 2
  ); // 16px → 50px
  padding-right: calc(
    clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * 2
  ); // 16px → 50px
`;

const Content = styled.div`
  width: 75vw;
  margin-inline: auto;
  display: flex;
`;

const Step = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: uppercase;
  color: #a3a3a3;
  font-size: clamp(0.56rem, calc(0.06rem + 0.78vw), 1rem);
  cursor: pointer;
`;

const Line = styled.div`
  margin-top: 0.75rem;
  background: #d1d1d1;
  height: 7px;
  width: 100%;
  overflow: hidden;
`;

const Red = styled.div`
  background: ${({ theme: { colors } }) => colors.primaryColor};
  width: 0;
  height: 100%;
`;
