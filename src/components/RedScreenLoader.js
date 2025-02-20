import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import { CustomEase } from "gsap/all";
import { redScreenLoader } from "redux/animationsSlice";
import { useRouter } from "next/router";
import PageLoader from "./utils/PageLoader";

gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function RedScreenLoader() {
  //! REFS
  const containerRef = useRef();
  const router = useRouter();
  const [data, setData] = useState({ name: "", img: "" });
  const redScreenValue = useSelector((state) => state.animations.value);
  const dispatch = useDispatch();

  //! FETCH DATA
  useEffect(() => {


    if (redScreenValue.link !== "" && router.pathname !== redScreenValue.link) {
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";

      setData({
        img: redScreenValue.img,
      });

      startAnimation();
    }
  }, [redScreenValue.link]);
  //! SCREEN UP
  const startAnimation = () => {
    // change style if destination is homepage or author
    if (
      redScreenValue.link === "/" ||
      redScreenValue.link.includes("/author") ||
      redScreenValue.link.includes("thank-you")
    ) {
      gsap.set(containerRef.current, {
        background: "white",
      });
      gsap.set(".imageLoaderRef", {
        display: "none",
        // opacity: "0",
      });
    }

    // change style if destination is connect on mobile
    if (redScreenValue.link === "/contatti" && window.innerWidth <= 1280) {
      gsap.set(containerRef.current, {
        background: "#191616",
      });
      gsap.set(".imageLoaderRef", {
        display: "none",
        // opacity: "0",
      });
    }

    // change style if destination is thank you page black
    if (redScreenValue.link === "/contact-form-thank-you?v=2") {
      gsap.set(containerRef.current, {
        background: "#191616",
      });
      gsap.set(".imageLoaderRef", {
        display: "none",
        // opacity: "0",
      });
    }

    // Push to the new page if isn't already the current one
    gsap.to(containerRef.current, {
      // delay: 0.5,
      height: "100dvh",
      duration: .5,
      // duration: 0.5,
      ease: "redEase",
      onComplete: () => {
        router.push(redScreenValue.link);
      },
    });
  };

  // When route is changed hide red component
  useEffect(() => {
    const handleRouteChangeLoader = (url) => {
      gsap.set(containerRef.current, {
        height: "0",
      });
      // reset normal style after animation is complete
      gsap.set(containerRef.current, {
        background: "#fc1333",
      });
      gsap.set(".imageLoaderRef", {
        display: "block",
        // opacity: "1",
      });

      // reset redScreenValue to default value
      dispatch(redScreenLoader({ link: "", img: "" }));
    };

    router.events.on("routeChangeComplete", handleRouteChangeLoader);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeLoader);
    };
  }, [router.pathname, redScreenValue.link]);

  
  //! COMPONENT
  return (
    <Container ref={containerRef}>
      <Content>
        <span className="page-name">{data.name}</span>
        <ImageContainer className="imageLoaderRef">
          <Image
            src={data.img ? data.img : "/transparent-fallback.webp"}
            // const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+BAwAEnDPH3QABJQAAAABJRU5ErkJggg==';
            fill
            sizes="100%"
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,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"
         
          />
        </ImageContainer>
        <span className="loader"><PageLoader></PageLoader></span>
      </Content>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  background: ${({ theme: { colors } }) => colors.primaryColor};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  z-index: 100000;
  overflow: hidden;
`;

const Content = styled.div`
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

  span {
    text-transform: uppercase;
    font-size: 4.3rem;
    line-height: 4rem;
    font-family: ${({ theme: { fonts } }) => fonts.main};
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

const ImageContainer = styled.div`
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

// // Fetch data from API
// export async function getServerSideProps() {
//   const res = await fetch(
//     `https://pixabay.com/api/?key=22501807-81742da2f5607a13b0b2aff8c&q=workout&image_type=photo`
//   );
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }
