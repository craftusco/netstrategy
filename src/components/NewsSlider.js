import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import Arrow from "./utils/Arrow";
import { ScrollTrigger, Draggable } from "gsap/all";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import RedLink from "./utils/RedLink";
import { changeColor } from "../../redux/customCursorSlice";
import { useDispatch } from "react-redux";
import getPath from "@/utils/getPath";
import dataRequest from "@/utils/dataRequest";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

export default function NewsSlider({ data: slides, staticData, mt }) {
  let array = slides.length > 1 ? slides : [slides];
  if (array.length == 1) {
    const obj = {};
    obj.attributes = array[0];
    array = [obj];
  }

  if (slides.length == 0) return <></>;
  //! REFS ---
  const containerRef = useRef();
  const sliderRef = useRef();
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");

  //! DRAGGABLE ----
  useEffect(() => {
    let newsSliderCtx = gsap.context(() => {
      Draggable.create(sliderRef.current, {
        type: "x",
        bounds: containerRef.current, // Limita il movimento all'interno del contenitore
        throwProps: true,
      });
      // gsap.from('.slider-ref-class > *', {
      //   y: "50%",
      //   ease: "easeInOut",
      //   stagger: 0.1,
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "0% bottom",
      //     end: "center bottom-=20%",
      //     scrub: 1.5,
      //   },
      // })
    }, containerRef.current);
    return () => newsSliderCtx.revert();
  }, []);

  const urls = [
    {
      name: 'blog',
      url: `https://www.netstrategy.it/api/journal?populate=deep,4`,
    }
  ];
  const fetchData = async () => {
    const d = await dataRequest(urls);
    setResponse(d);
  };
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);
  const img_blog = response && response.blog.attributes.hero.immagine.data.attributes.url;
  // console.log(array)
  return (
    <Wrapper>
      <Container mt={mt} ref={containerRef}>
        <Slider ref={sliderRef} className="slider-ref-class">
          {array.map((e, i) => (
            <Slide
              className="no_highlights"
              onMouseEnter={() => dispatch(changeColor("scaleUp"))}
              onMouseLeave={() => dispatch(changeColor("scaleDown"))}
              key={i}
            >
              <RedLink 
                img={e.attributes.immagine?.data ? getPath(`${e.attributes.immagine.data.attributes.url}`) : e.attributes.cover_image} 
                link={getPath(`/${e.attributes.categoria.data.attributes.slug}/${e.attributes.slug}`, true)}
              >
                <ImageContainer>
                  <Image
                    src={e.attributes.immagine?.data ? getPath(`${e.attributes.immagine.data.attributes.url}`) : e.attributes.cover_image}
                    alt={e?.attributes?.immagine?.data?.attributes?.alternativeText ? e?.attributes?.immagine?.data?.attributes?.alternativeText : e?.attributes?.cover_image_altText ? e?.attributes?.cover_image_altText :  "Immagini di articoli news"}
                    fill
                    sizes="100%"
                  />
                </ImageContainer>
                <Info>
                  <div>
                    <ArrowContainer>
                      <Arrow />
                    </ArrowContainer>
                    {/* <InfoMobile>{`${e.attributes.titolo.substring(
                      0,
                      28
                    )}...`}</InfoMobile> */}
                    <InfoDesktop>{e.attributes.titolo}</InfoDesktop>
                  </div>
                </Info>
              </RedLink>
            </Slide>
          ))}
        </Slider>
        <ButtonContainer>
          <RedLink img={getPath(img_blog)} link={getPath("/blog", true)}>
            <PrimaryButton>{staticData.blog_slider_cta}</PrimaryButton>
          </RedLink>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
}

//! STYLE
const Wrapper = styled.div`
  ${centerContent};
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: ${(props) => props.mt};
`;

const Slider = styled.div`
  width: max-content;
  white-space: nowrap;
  text-align: center;

  div + div {
    margin-left: clamp(1rem, calc(0.88rem + 0.52vw), 1.5rem); // 16px → 24px
  }
`;

const Slide = styled.div`
  display: inline-block;
  cursor: pointer;

  p {
    font-family: inherit;
  }
`;

const ImageContainer = styled.div`
  height: clamp(18rem, calc(14.6rem + 14.5vw), 32rem); // 288px → 512px
  display: inline-block;
  position: relative;

  img {
    border-radius: 1rem;
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Info = styled.div`
  margin-top: clamp(1.25rem, 1.07rem + 0.78vw, 2rem);
  display: flex;

  div {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    display: flex;
    text-align: left;
    column-gap: clamp(0.63rem, calc(0.47rem + 0.65vw), 1.25rem);
    flex-grow: 1;
    width: 0;
    white-space: normal;
  }
`;

// const InfoMobile = styled.p`
//   @media (min-width: 1000px) {
//     display: none;
//   }
// `;

const InfoDesktop = styled.p`
  /* display: none;

  @media (min-width: 1000px) {
    display: block;
  } */
`;

const ButtonContainer = styled.div`
  margin-top: clamp(2rem, calc(1.03rem + 4.14vw), 6rem); // 32px → 96px;
  display: flex;
  justify-content: center;
`;

const ArrowContainer = styled.div`
  min-width: clamp(1.25rem, calc(1.19rem + 0.26vw), 1.5rem);
  min-height: clamp(1.25rem, calc(1.19rem + 0.26vw), 1.5rem);
  max-width: clamp(1.25rem, calc(1.19rem + 0.26vw), 1.5rem);
  max-height: clamp(1.25rem, calc(1.19rem + 0.26vw), 1.5rem);

  stroke: black;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;
