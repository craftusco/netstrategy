import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import getPath from "@/utils/getPath";

gsap.registerPlugin(ScrollTrigger);

export default function CardsStatic({ data: images, labels = [],mt }) {
  if(!images)
    return (
      <></>
    )
  //! REFS ---
  const containerRef = useRef();
  const [index, setIndex] = useState(2);

  //! HANDLE MOUSE ENTER ----
  // Label & z-index card
  const handleMouseEnter = (event, i) => {
    // label scale & opacity
    gsap.to(event.currentTarget.lastChild, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "easeIn",
    });
    // card scale & z-index
    setIndex(i + 1);
    gsap.set(event.currentTarget, {
      zIndex: 99,
    });
    gsap.to(event.currentTarget, {
      scale: 1.03,
    });
  };

  // Get mouse position relative to parent element (card)
  const handleMouseMove = (event) => {
    const localX = event.pageX - event.currentTarget.offsetLeft;
    const localY = event.pageY - event.currentTarget.offsetTop;

    // update label position
    gsap.to(event.currentTarget.lastChild, {
      left: localX - event.currentTarget.lastChild.offsetWidth / 2,
      top: localY - event.currentTarget.lastChild.offsetHeight / 2,
      duration: 0.9,
      ease: "easeInOut",
    });
  };

  //! HANDLE MOUSE LEAVE ----
  // label scale & opacity
  const handleMouseLeave = (event, i) => {
    gsap.to(event.currentTarget.lastChild, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "easeIn",
    });
    // card scale & z-index
    gsap.set(event.currentTarget, {
      zIndex: i === 0 || i === 2 ? 1 : 2,
    });
    gsap.to(event.currentTarget, {
      scale: 1,
    });
  };

  // //! SCROLL ----
  // useEffect(() => {
  //   if (window.innerWidth > 820) {
  //     // Card scroll
  //     let cardTl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: ".cardListRef",
  //         start: "-400% top",
  //         end: "300% top",
  //         scrub: 1,
  //       },
  //     });
  //     let CardsCtx = gsap.context(() => {
  //       // Y enter
  //       cardTl.from(".cardListRef > div", {
  //         y: "150%",
  //         // duration: 0.1,
  //         ease: "power1.inOut",
  //         stagger: 0.05,
  //       });
  //       // Y exit
  //       cardTl.to(".cardListRef > div", {
  //         y: "-150%",
  //         ease: "power1.inOut",
  //         stagger: 0.05,
  //       });

  //       // Image scale
  //       gsap.from(".cardListRef > div img", {
  //         scale: 1.15,
  //         duration: 1,
  //         ease: "power1.inOut",
  //         stagger: 0.05,
  //         scrollTrigger: {
  //           trigger: ".cardListRef",
  //           start: "-100% top",
  //           end: "100% bottom",
  //           scrub: 1,
  //         },
  //       });
  //     }, containerRef.current);

  //     return () => CardsCtx.revert();
  //   }
  // }, []);

  return (
    <Container mt={mt} ref={containerRef}>
      {/* List */}
      <CardsList className="cardListRef">
        {images.map((img, i) => (
         <Card
            toShow={Boolean(labels[i])}
            key={i}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseMove={handleMouseMove}
            onMouseLeave={(e) => handleMouseLeave(e, i)}
          >
            <Image
              src={getPath(img.attributes.url)}
              alt={img?.attributes?.alternativeText ? img?.attributes?.alternativeText : labels[i]?.label ? labels[i].label : "persone in azienda"}
              fill
              sizes="100%"
            />
            <span className="label-hover">{ labels[i] ? labels[i].label : 'Who we are'}</span>
          </Card>
        ))}
      </CardsList>
      {/* Dots mobile */}
      <Dots index={index}>
        {images.map((_, i) => (
          <span key={i}></span>
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
  display: flex;
  justify-content: center;
  align-items: center;

  div:nth-child(1) {
    margin-right: -11rem;
    width: clamp(13.56rem, calc(9.33rem + 18.06vw), 31rem); // 217px → 496px
  }
  div:nth-child(2) {
    width: clamp(17rem, calc(10.93rem + 25.89vw), 42rem); // 272px → 672px
    z-index: 2;
  }
  div:nth-child(3) {
    margin-left: -11rem;
    width: clamp(13.56rem, calc(9.33rem + 18.06vw), 31rem); // 217px → 496px
  }
`;

// Card
const Card = styled.div`
  border-radius: 1.5rem;
  overflow: hidden;
  aspect-ratio: 3.25/4;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
  
  span.label-hover {
    position: fixed;
    top: 50%;
    left: 50%;
    display: none;
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({theme: { fontSizes }}) => fontSizes.size_57_100};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    text-transform: uppercase;
    user-select: none;

    @media (min-width: 651px) {
      display: inline-block;
      transform: scale(0);
      opacity: ${props => props.toShow === true ? 1 : 0} !important;
      /* display: none; */
    }
  }
`;

// Dots mobile
const Dots = styled.div`
  margin-top: 1.5rem;
  display: none;
  justify-content: center;
  column-gap: 0.5rem;

  /* @media (max-width: 768px) {
    display: flex;
  } */

  & span:nth-child(${(props) => props.index}) {
    background: ${({ theme: { colors } }) => colors.primaryColor};
    border-color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  span {
    border: 1px solid ${({ theme: { colors } }) => colors.greyColor};
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
  }
`;
