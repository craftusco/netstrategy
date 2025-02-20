import styled from "styled-components";
import Image from "next/image";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import { ScrollTrigger, Draggable } from "gsap/all";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import getPath from "@/utils/getPath";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export default function ImageSlider({
  data = fallbackData,
  mt,
  big = true,
  onlyDraggable = false,
  isLarge = true,
  classes,
  height
}) {
  //! REFS ---
  const containerRef = useRef();
  const sliderRef = useRef();
  const imagesRef = useRef([]);
  let mm = gsap.matchMedia();
  if (!data.data) return <></>;

  const [windowWidth, setWindowWidth] = useState(0);
  const [percentageEnd, setPercentageEnd] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(() => {
    //* set slider width
    let width = 0;
    data.data.forEach((e, i) => {
      width += i % 3 === 0 ? 410 : 720;
      width += 20; //margine
    });
    return width;
  });
  const [uniqueCode, setUniqueCode] = useState(0);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    //* generate random code for sliders
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let unique = "";
    for (let i = 0; i < 6; i++) {
      unique += chars[getRandomIntInclusive(0, chars.length - 1)];
    }
    setUniqueCode(unique);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      (isLarge === false) ?
        setPercentageEnd(sliderWidth - window.innerWidth + 650)
      :
        setPercentageEnd(sliderWidth - window.innerWidth + 50)
      setWindowWidth(window.innerWidth);

      // console.log("PERCENTAGE END", percentageEnd);
    });
    setWindowWidth(window.innerWidth);
    // setPercentageEnd(data.data.length * 470 - window.innerWidth + 50);
    let stickySection = document.querySelector(
      `[data-slider="sticky-${uniqueCode}"]`
    );

    window.addEventListener("scroll", () => {
      if (
        (windowWidth > 900 || window.innerWidth > 900) &&
        onlyDraggable == false
      ) {
        transform(stickySection);
      }
    });

    function transform(section) {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(
        `[data-slider="scroll-section-${uniqueCode}"]`
      );
      // let percentage =((window.scrollY - offsetTop) / window.innerHeight) * 100;
      // percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;

      const start = offsetTop;
      const end = offsetTop + sliderWidth - window.innerWidth;
      let newPercentage = window.scrollY - start;
      (isLarge === false) ?
        setPercentageEnd(sliderWidth - window.innerWidth + 650)
      :
        setPercentageEnd(sliderWidth - window.innerWidth + 50)
      // console.log(window.scrollY, start, percentageEnd, newPercentage);
      newPercentage =
        newPercentage < 0
          ? 0
          : newPercentage > percentageEnd
          ? percentageEnd
          : newPercentage;
      if (scrollSection) {
        scrollSection.style.transform = `translate3d(${-newPercentage}px, 0, 0)`;
      }
    }

    if (onlyDraggable) {
      let draggableSliderCtx = gsap.context(() => {
        Draggable.create(sliderRef.current, {
          type: "x",
          bounds: containerRef.current, // Limita il movimento all'interno del contenitore
          throwProps: true,
        });
      }, containerRef.current);
      return () => {
        draggableSliderCtx.revert();
      };
    } else {
      mm.add("(max-width: 900px)", () => {
        let draggableSliderCtx = gsap.context(() => {
          Draggable.create(sliderRef.current, {
            type: "x",
            bounds: containerRef.current, // Limita il movimento all'interno del contenitore
            throwProps: true,
          });
        }, containerRef.current);
        return () => {
          draggableSliderCtx.revert();
        };
      });
    }
  }, [percentageEnd]);

  useEffect(() => {
    setPercentageEnd(sliderWidth - window.innerWidth + 50);
  }, [data.data]);

  return (
    <Container ref={containerRef} mt={mt} className="hideScrollbar" big={big} >
      <Slider onlyDraggable={onlyDraggable} ref={sliderRef} className="imagesSliderRef">
        {data.data.map((e, i) => (
          <ImageContainer key={i} big={big} large={i % 3 === 0 ? false : true}>
            <Image
              src={getPath(e.attributes.url, true)}
              alt={e?.attributes?.alternativeText ? e?.attributes?.alternativeText : `Immagine ${i} slider di immagini`}
              fill
              sizes="100%"
              ref={(el) => (imagesRef.current[i] = el)}
            />
          </ImageContainer>
        ))}
      </Slider>
      {onlyDraggable != true 
      && <div
        className="sticky-container"
        style={{
          height: height ? height : sliderWidth * 0.55,
        }}
      >
        <div className="sticky" data-slider={`sticky-${uniqueCode}`}>
          <div
            className={`scroll-section`}
            data-slider={`scroll-section-${uniqueCode}`}
            // style={{
            //   width: sliderWidth - 80,
            // }}
          >
            {data.data.map((e, i) => (
              <ImageContainer
                key={i}
                big={big}
                large={(isLarge === true) ? (i % 3 === 0) ? false : true : true}
                className={classes}
              >
                <Image
                  src={getPath(e.attributes.url)}
                  alt={e?.attributes?.alternativeText ? e?.attributes?.alternativeText : `Immagine ${i} slider di immagini`}
                  fill
                  sizes="100%"
                  ref={(el) => (imagesRef.current[i] = el)}
                />
              </ImageContainer>
            ))}
          </div>
        </div>
      </div>}
    </Container>
  );
}

// //! STYLE
const Slider = styled.div`
  padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  white-space: nowrap;
  overflow-x: unset;
  width: max-content;
  display: ${({onlyDraggable}) => onlyDraggable ? "block" : "none" };

  /* div {
    margin-right: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
  } */
`;

const Container = styled.div`
  margin-top: ${(props) => props.mt};

  .sticky-container {
    /* height: 600vh; */
    .sticky {
      overflow: hidden;
      position: sticky;
      top: 0;
      height: ${(props) =>
        props.big ? `calc(480px + 5rem)` : `calc(420px + 5rem)`};
      .scroll-section {
        margin-top: 5rem;
        position: absolute;
        top: 0;
        /* width: 600vw; */
        height: 100%;
        padding: 4rem;
        will-change: transform;
        display: flex;
        /* justify-content: space-between; */
        align-items: flex-start;
        padding: 0 clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
      }
    }
  }

  @media screen and (max-width: 900px) {
    overflow-x: hidden;
    ${Slider} {
      display: block;
    }
    .sticky-container {
      display: none;
    }
  }

  /* overflow-x: auto; */

  /* @media (min-width: 1280px) { */
  /* overflow-x: clip; */
  /* } */
`;

const ImageContainer = styled.div`
  height: ${(props) => (props.big ? `480px` : `420px`)};
  width: ${(props) => (props.large ? `720px` : `410px`)};
  overflow: hidden;
  display: inline-block;
  position: relative;
  margin-right: 20px;

  img {
    border-radius: 1rem;
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const fallbackData = {
  data: [
    {
      id: 5607,
      attributes: {
        name: "homepage_netstrategy_3.jpg",
        alternativeText: null,
        caption: null,
        width: 5472,
        height: 3648,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_homepage_netstrategy_3_73ffecb77b.jpg",
            hash: "large_homepage_netstrategy_3_73ffecb77b",
            mime: "image/jpeg",
            name: "large_homepage_netstrategy_3.jpg",
            path: null,
            size: 75.22,
            width: 1000,
            height: 667,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_homepage_netstrategy_3_73ffecb77b.jpg",
            hash: "small_homepage_netstrategy_3_73ffecb77b",
            mime: "image/jpeg",
            name: "small_homepage_netstrategy_3.jpg",
            path: null,
            size: 26.45,
            width: 500,
            height: 333,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_homepage_netstrategy_3_73ffecb77b.jpg",
            hash: "medium_homepage_netstrategy_3_73ffecb77b",
            mime: "image/jpeg",
            name: "medium_homepage_netstrategy_3.jpg",
            path: null,
            size: 48.52,
            width: 750,
            height: 500,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_homepage_netstrategy_3_73ffecb77b.jpg",
            hash: "thumbnail_homepage_netstrategy_3_73ffecb77b",
            mime: "image/jpeg",
            name: "thumbnail_homepage_netstrategy_3.jpg",
            path: null,
            size: 8.85,
            width: 234,
            height: 156,
          },
        },
        hash: "homepage_netstrategy_3_73ffecb77b",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 1910.66,
        url: "/uploads/homepage_netstrategy_3_73ffecb77b.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-28T13:42:09.924Z",
        updatedAt: "2023-07-28T13:42:09.924Z",
      },
    },
    {
      id: 5581,
      attributes: {
        name: "homepage_netstrategy_4.jpg",
        alternativeText: null,
        caption: null,
        width: 5446,
        height: 3631,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_homepage_netstrategy_4_fcc2323ee3.jpg",
            hash: "large_homepage_netstrategy_4_fcc2323ee3",
            mime: "image/jpeg",
            name: "large_homepage_netstrategy_4.jpg",
            path: null,
            size: 60.32,
            width: 1000,
            height: 666,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_homepage_netstrategy_4_fcc2323ee3.jpg",
            hash: "small_homepage_netstrategy_4_fcc2323ee3",
            mime: "image/jpeg",
            name: "small_homepage_netstrategy_4.jpg",
            path: null,
            size: 21.02,
            width: 500,
            height: 333,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_homepage_netstrategy_4_fcc2323ee3.jpg",
            hash: "medium_homepage_netstrategy_4_fcc2323ee3",
            mime: "image/jpeg",
            name: "medium_homepage_netstrategy_4.jpg",
            path: null,
            size: 38.79,
            width: 750,
            height: 500,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_homepage_netstrategy_4_fcc2323ee3.jpg",
            hash: "thumbnail_homepage_netstrategy_4_fcc2323ee3",
            mime: "image/jpeg",
            name: "thumbnail_homepage_netstrategy_4.jpg",
            path: null,
            size: 7.05,
            width: 234,
            height: 156,
          },
        },
        hash: "homepage_netstrategy_4_fcc2323ee3",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 887.99,
        url: "/uploads/homepage_netstrategy_4_fcc2323ee3.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-28T13:30:38.971Z",
        updatedAt: "2023-07-28T13:30:38.971Z",
      },
    },
    {
      id: 5583,
      attributes: {
        name: "homepage_netstrategy_9.jpg",
        alternativeText: null,
        caption: null,
        width: 5472,
        height: 3648,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_homepage_netstrategy_9_c2d18a6e00.jpg",
            hash: "large_homepage_netstrategy_9_c2d18a6e00",
            mime: "image/jpeg",
            name: "large_homepage_netstrategy_9.jpg",
            path: null,
            size: 101.17,
            width: 1000,
            height: 667,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_homepage_netstrategy_9_c2d18a6e00.jpg",
            hash: "small_homepage_netstrategy_9_c2d18a6e00",
            mime: "image/jpeg",
            name: "small_homepage_netstrategy_9.jpg",
            path: null,
            size: 33.93,
            width: 500,
            height: 333,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_homepage_netstrategy_9_c2d18a6e00.jpg",
            hash: "medium_homepage_netstrategy_9_c2d18a6e00",
            mime: "image/jpeg",
            name: "medium_homepage_netstrategy_9.jpg",
            path: null,
            size: 64.63,
            width: 750,
            height: 500,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_homepage_netstrategy_9_c2d18a6e00.jpg",
            hash: "thumbnail_homepage_netstrategy_9_c2d18a6e00",
            mime: "image/jpeg",
            name: "thumbnail_homepage_netstrategy_9.jpg",
            path: null,
            size: 10.18,
            width: 234,
            height: 156,
          },
        },
        hash: "homepage_netstrategy_9_c2d18a6e00",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 985.6,
        url: "/uploads/homepage_netstrategy_9_c2d18a6e00.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-28T13:31:15.536Z",
        updatedAt: "2023-07-28T13:31:15.536Z",
      },
    },
    {
      id: 5643,
      attributes: {
        name: "homepage_netstrategy_10.jpg",
        alternativeText: null,
        caption: null,
        width: 3648,
        height: 5472,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_homepage_netstrategy_10_da4eeb7a67.jpg",
            hash: "large_homepage_netstrategy_10_da4eeb7a67",
            mime: "image/jpeg",
            name: "large_homepage_netstrategy_10.jpg",
            path: null,
            size: 39.38,
            width: 667,
            height: 1000,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_homepage_netstrategy_10_da4eeb7a67.jpg",
            hash: "small_homepage_netstrategy_10_da4eeb7a67",
            mime: "image/jpeg",
            name: "small_homepage_netstrategy_10.jpg",
            path: null,
            size: 13.66,
            width: 333,
            height: 500,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_homepage_netstrategy_10_da4eeb7a67.jpg",
            hash: "medium_homepage_netstrategy_10_da4eeb7a67",
            mime: "image/jpeg",
            name: "medium_homepage_netstrategy_10.jpg",
            path: null,
            size: 25.14,
            width: 500,
            height: 750,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_homepage_netstrategy_10_da4eeb7a67.jpg",
            hash: "thumbnail_homepage_netstrategy_10_da4eeb7a67",
            mime: "image/jpeg",
            name: "thumbnail_homepage_netstrategy_10.jpg",
            path: null,
            size: 2.73,
            width: 104,
            height: 156,
          },
        },
        hash: "homepage_netstrategy_10_da4eeb7a67",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 375.4,
        url: "/uploads/homepage_netstrategy_10_da4eeb7a67.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-28T13:49:45.223Z",
        updatedAt: "2023-07-28T13:49:45.223Z",
      },
    },
    {
      id: 5621,
      attributes: {
        name: "homepage_netstrategy_7.jpg",
        alternativeText: null,
        caption: null,
        width: 4809,
        height: 3206,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_homepage_netstrategy_7_ceeec97f55.jpg",
            hash: "large_homepage_netstrategy_7_ceeec97f55",
            mime: "image/jpeg",
            name: "large_homepage_netstrategy_7.jpg",
            path: null,
            size: 76.03,
            width: 1000,
            height: 667,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_homepage_netstrategy_7_ceeec97f55.jpg",
            hash: "small_homepage_netstrategy_7_ceeec97f55",
            mime: "image/jpeg",
            name: "small_homepage_netstrategy_7.jpg",
            path: null,
            size: 24.69,
            width: 500,
            height: 333,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_homepage_netstrategy_7_ceeec97f55.jpg",
            hash: "medium_homepage_netstrategy_7_ceeec97f55",
            mime: "image/jpeg",
            name: "medium_homepage_netstrategy_7.jpg",
            path: null,
            size: 48.05,
            width: 750,
            height: 500,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_homepage_netstrategy_7_ceeec97f55.jpg",
            hash: "thumbnail_homepage_netstrategy_7_ceeec97f55",
            mime: "image/jpeg",
            name: "thumbnail_homepage_netstrategy_7.jpg",
            path: null,
            size: 7.75,
            width: 234,
            height: 156,
          },
        },
        hash: "homepage_netstrategy_7_ceeec97f55",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 903.07,
        url: "/uploads/homepage_netstrategy_7_ceeec97f55.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-28T13:43:39.082Z",
        updatedAt: "2023-07-28T13:43:39.082Z",
      },
    },
    {
      id: 1781,
      attributes: {
        name: "1X4A5586.jpg",
        alternativeText: null,
        caption: null,
        width: 3648,
        height: 5472,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_1_X4_A5586_697e145e57.jpg",
            hash: "large_1_X4_A5586_697e145e57",
            mime: "image/jpeg",
            name: "large_1X4A5586.jpg",
            path: null,
            size: 72.9,
            width: 667,
            height: 1000,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_1_X4_A5586_697e145e57.jpg",
            hash: "small_1_X4_A5586_697e145e57",
            mime: "image/jpeg",
            name: "small_1X4A5586.jpg",
            path: null,
            size: 24.37,
            width: 333,
            height: 500,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_1_X4_A5586_697e145e57.jpg",
            hash: "medium_1_X4_A5586_697e145e57",
            mime: "image/jpeg",
            name: "medium_1X4A5586.jpg",
            path: null,
            size: 46.56,
            width: 500,
            height: 750,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_1_X4_A5586_697e145e57.jpg",
            hash: "thumbnail_1_X4_A5586_697e145e57",
            mime: "image/jpeg",
            name: "thumbnail_1X4A5586.jpg",
            path: null,
            size: 4.22,
            width: 104,
            height: 156,
          },
        },
        hash: "1_X4_A5586_697e145e57",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 1369.11,
        url: "/uploads/1_X4_A5586_697e145e57.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-06-30T08:51:26.762Z",
        updatedAt: "2023-06-30T08:51:26.762Z",
      },
    },
  ],
};

//! =================================
//! BACKUP COMPONENTE
//! =================================
// import styled from "styled-components";
// import Image from "next/image";
// import { centerContent } from "@/styles/mixins";
// import { gsap } from "gsap";
// import { ScrollTrigger, Draggable } from "gsap/all";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import getPath from "@/utils/getPath";
// import { InertiaPlugin } from "gsap/InertiaPlugin";

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Draggable);
// gsap.registerPlugin(InertiaPlugin);

// const fallbackData = {data: [
//   {
//       "id": 5607,
//       "attributes": {
//           "name": "homepage_netstrategy_3.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 5472,
//           "height": 3648,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_homepage_netstrategy_3_73ffecb77b.jpg",
//                   "hash": "large_homepage_netstrategy_3_73ffecb77b",
//                   "mime": "image/jpeg",
//                   "name": "large_homepage_netstrategy_3.jpg",
//                   "path": null,
//                   "size": 75.22,
//                   "width": 1000,
//                   "height": 667
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_homepage_netstrategy_3_73ffecb77b.jpg",
//                   "hash": "small_homepage_netstrategy_3_73ffecb77b",
//                   "mime": "image/jpeg",
//                   "name": "small_homepage_netstrategy_3.jpg",
//                   "path": null,
//                   "size": 26.45,
//                   "width": 500,
//                   "height": 333
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_homepage_netstrategy_3_73ffecb77b.jpg",
//                   "hash": "medium_homepage_netstrategy_3_73ffecb77b",
//                   "mime": "image/jpeg",
//                   "name": "medium_homepage_netstrategy_3.jpg",
//                   "path": null,
//                   "size": 48.52,
//                   "width": 750,
//                   "height": 500
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_homepage_netstrategy_3_73ffecb77b.jpg",
//                   "hash": "thumbnail_homepage_netstrategy_3_73ffecb77b",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_homepage_netstrategy_3.jpg",
//                   "path": null,
//                   "size": 8.85,
//                   "width": 234,
//                   "height": 156
//               }
//           },
//           "hash": "homepage_netstrategy_3_73ffecb77b",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 1910.66,
//           "url": "/uploads/homepage_netstrategy_3_73ffecb77b.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-07-28T13:42:09.924Z",
//           "updatedAt": "2023-07-28T13:42:09.924Z"
//       }
//   },
//   {
//       "id": 5581,
//       "attributes": {
//           "name": "homepage_netstrategy_4.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 5446,
//           "height": 3631,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_homepage_netstrategy_4_fcc2323ee3.jpg",
//                   "hash": "large_homepage_netstrategy_4_fcc2323ee3",
//                   "mime": "image/jpeg",
//                   "name": "large_homepage_netstrategy_4.jpg",
//                   "path": null,
//                   "size": 60.32,
//                   "width": 1000,
//                   "height": 666
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_homepage_netstrategy_4_fcc2323ee3.jpg",
//                   "hash": "small_homepage_netstrategy_4_fcc2323ee3",
//                   "mime": "image/jpeg",
//                   "name": "small_homepage_netstrategy_4.jpg",
//                   "path": null,
//                   "size": 21.02,
//                   "width": 500,
//                   "height": 333
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_homepage_netstrategy_4_fcc2323ee3.jpg",
//                   "hash": "medium_homepage_netstrategy_4_fcc2323ee3",
//                   "mime": "image/jpeg",
//                   "name": "medium_homepage_netstrategy_4.jpg",
//                   "path": null,
//                   "size": 38.79,
//                   "width": 750,
//                   "height": 500
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_homepage_netstrategy_4_fcc2323ee3.jpg",
//                   "hash": "thumbnail_homepage_netstrategy_4_fcc2323ee3",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_homepage_netstrategy_4.jpg",
//                   "path": null,
//                   "size": 7.05,
//                   "width": 234,
//                   "height": 156
//               }
//           },
//           "hash": "homepage_netstrategy_4_fcc2323ee3",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 887.99,
//           "url": "/uploads/homepage_netstrategy_4_fcc2323ee3.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-07-28T13:30:38.971Z",
//           "updatedAt": "2023-07-28T13:30:38.971Z"
//       }
//   },
//   {
//       "id": 5583,
//       "attributes": {
//           "name": "homepage_netstrategy_9.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 5472,
//           "height": 3648,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_homepage_netstrategy_9_c2d18a6e00.jpg",
//                   "hash": "large_homepage_netstrategy_9_c2d18a6e00",
//                   "mime": "image/jpeg",
//                   "name": "large_homepage_netstrategy_9.jpg",
//                   "path": null,
//                   "size": 101.17,
//                   "width": 1000,
//                   "height": 667
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_homepage_netstrategy_9_c2d18a6e00.jpg",
//                   "hash": "small_homepage_netstrategy_9_c2d18a6e00",
//                   "mime": "image/jpeg",
//                   "name": "small_homepage_netstrategy_9.jpg",
//                   "path": null,
//                   "size": 33.93,
//                   "width": 500,
//                   "height": 333
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_homepage_netstrategy_9_c2d18a6e00.jpg",
//                   "hash": "medium_homepage_netstrategy_9_c2d18a6e00",
//                   "mime": "image/jpeg",
//                   "name": "medium_homepage_netstrategy_9.jpg",
//                   "path": null,
//                   "size": 64.63,
//                   "width": 750,
//                   "height": 500
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_homepage_netstrategy_9_c2d18a6e00.jpg",
//                   "hash": "thumbnail_homepage_netstrategy_9_c2d18a6e00",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_homepage_netstrategy_9.jpg",
//                   "path": null,
//                   "size": 10.18,
//                   "width": 234,
//                   "height": 156
//               }
//           },
//           "hash": "homepage_netstrategy_9_c2d18a6e00",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 985.6,
//           "url": "/uploads/homepage_netstrategy_9_c2d18a6e00.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-07-28T13:31:15.536Z",
//           "updatedAt": "2023-07-28T13:31:15.536Z"
//       }
//   },
//   {
//       "id": 5643,
//       "attributes": {
//           "name": "homepage_netstrategy_10.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 3648,
//           "height": 5472,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_homepage_netstrategy_10_da4eeb7a67.jpg",
//                   "hash": "large_homepage_netstrategy_10_da4eeb7a67",
//                   "mime": "image/jpeg",
//                   "name": "large_homepage_netstrategy_10.jpg",
//                   "path": null,
//                   "size": 39.38,
//                   "width": 667,
//                   "height": 1000
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_homepage_netstrategy_10_da4eeb7a67.jpg",
//                   "hash": "small_homepage_netstrategy_10_da4eeb7a67",
//                   "mime": "image/jpeg",
//                   "name": "small_homepage_netstrategy_10.jpg",
//                   "path": null,
//                   "size": 13.66,
//                   "width": 333,
//                   "height": 500
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_homepage_netstrategy_10_da4eeb7a67.jpg",
//                   "hash": "medium_homepage_netstrategy_10_da4eeb7a67",
//                   "mime": "image/jpeg",
//                   "name": "medium_homepage_netstrategy_10.jpg",
//                   "path": null,
//                   "size": 25.14,
//                   "width": 500,
//                   "height": 750
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_homepage_netstrategy_10_da4eeb7a67.jpg",
//                   "hash": "thumbnail_homepage_netstrategy_10_da4eeb7a67",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_homepage_netstrategy_10.jpg",
//                   "path": null,
//                   "size": 2.73,
//                   "width": 104,
//                   "height": 156
//               }
//           },
//           "hash": "homepage_netstrategy_10_da4eeb7a67",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 375.4,
//           "url": "/uploads/homepage_netstrategy_10_da4eeb7a67.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-07-28T13:49:45.223Z",
//           "updatedAt": "2023-07-28T13:49:45.223Z"
//       }
//   },
//   {
//       "id": 5621,
//       "attributes": {
//           "name": "homepage_netstrategy_7.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 4809,
//           "height": 3206,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_homepage_netstrategy_7_ceeec97f55.jpg",
//                   "hash": "large_homepage_netstrategy_7_ceeec97f55",
//                   "mime": "image/jpeg",
//                   "name": "large_homepage_netstrategy_7.jpg",
//                   "path": null,
//                   "size": 76.03,
//                   "width": 1000,
//                   "height": 667
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_homepage_netstrategy_7_ceeec97f55.jpg",
//                   "hash": "small_homepage_netstrategy_7_ceeec97f55",
//                   "mime": "image/jpeg",
//                   "name": "small_homepage_netstrategy_7.jpg",
//                   "path": null,
//                   "size": 24.69,
//                   "width": 500,
//                   "height": 333
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_homepage_netstrategy_7_ceeec97f55.jpg",
//                   "hash": "medium_homepage_netstrategy_7_ceeec97f55",
//                   "mime": "image/jpeg",
//                   "name": "medium_homepage_netstrategy_7.jpg",
//                   "path": null,
//                   "size": 48.05,
//                   "width": 750,
//                   "height": 500
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_homepage_netstrategy_7_ceeec97f55.jpg",
//                   "hash": "thumbnail_homepage_netstrategy_7_ceeec97f55",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_homepage_netstrategy_7.jpg",
//                   "path": null,
//                   "size": 7.75,
//                   "width": 234,
//                   "height": 156
//               }
//           },
//           "hash": "homepage_netstrategy_7_ceeec97f55",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 903.07,
//           "url": "/uploads/homepage_netstrategy_7_ceeec97f55.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-07-28T13:43:39.082Z",
//           "updatedAt": "2023-07-28T13:43:39.082Z"
//       }
//   },
//   {
//       "id": 1781,
//       "attributes": {
//           "name": "1X4A5586.jpg",
//           "alternativeText": null,
//           "caption": null,
//           "width": 3648,
//           "height": 5472,
//           "formats": {
//               "large": {
//                   "ext": ".jpg",
//                   "url": "/uploads/large_1_X4_A5586_697e145e57.jpg",
//                   "hash": "large_1_X4_A5586_697e145e57",
//                   "mime": "image/jpeg",
//                   "name": "large_1X4A5586.jpg",
//                   "path": null,
//                   "size": 72.9,
//                   "width": 667,
//                   "height": 1000
//               },
//               "small": {
//                   "ext": ".jpg",
//                   "url": "/uploads/small_1_X4_A5586_697e145e57.jpg",
//                   "hash": "small_1_X4_A5586_697e145e57",
//                   "mime": "image/jpeg",
//                   "name": "small_1X4A5586.jpg",
//                   "path": null,
//                   "size": 24.37,
//                   "width": 333,
//                   "height": 500
//               },
//               "medium": {
//                   "ext": ".jpg",
//                   "url": "/uploads/medium_1_X4_A5586_697e145e57.jpg",
//                   "hash": "medium_1_X4_A5586_697e145e57",
//                   "mime": "image/jpeg",
//                   "name": "medium_1X4A5586.jpg",
//                   "path": null,
//                   "size": 46.56,
//                   "width": 500,
//                   "height": 750
//               },
//               "thumbnail": {
//                   "ext": ".jpg",
//                   "url": "/uploads/thumbnail_1_X4_A5586_697e145e57.jpg",
//                   "hash": "thumbnail_1_X4_A5586_697e145e57",
//                   "mime": "image/jpeg",
//                   "name": "thumbnail_1X4A5586.jpg",
//                   "path": null,
//                   "size": 4.22,
//                   "width": 104,
//                   "height": 156
//               }
//           },
//           "hash": "1_X4_A5586_697e145e57",
//           "ext": ".jpg",
//           "mime": "image/jpeg",
//           "size": 1369.11,
//           "url": "/uploads/1_X4_A5586_697e145e57.jpg",
//           "previewUrl": null,
//           "provider": "local",
//           "provider_metadata": null,
//           "createdAt": "2023-06-30T08:51:26.762Z",
//           "updatedAt": "2023-06-30T08:51:26.762Z"
//       }
//   }
// ]}

// export default function ImageSlider({ data = fallbackData, mt, big = true, onlyDraggable = false }) {
//   //! REFS ---
//   const containerRef = useRef();
//   const sliderRef = useRef();
//   const imagesRef = useRef([]);
//   let mm = gsap.matchMedia();
//   if (!data.data) return <></>;

//   //! SCROLL ----
//   if(!onlyDraggable) {
//     useEffect(() => {
//       let imgSliderCtxDesktop, imgSliderCtxMobile, imgSliderCtxWideDesktop;
//       mm.add("(min-width: 901px) and (max-width: 2100px)", () => {
//         imgSliderCtxDesktop = gsap.context(() => {
//           if(sliderRef.current != null) {
//             const rect = sliderRef.current.getBoundingClientRect();
//             const outsideViewportWidth =
//             rect.left < 0
//             ?
//               rect.width + rect.left
//             :
//               rect.right > window.innerWidth
//               ? rect.width - (rect.right - window.innerWidth)
//               : 0;
//             gsap.to(sliderRef.current, {
//               // x: -(sliderRef.current.offsetWidth - outsideViewportWidth),
//               x: -Math.abs(sliderRef.current.clientWidth - containerRef.current.clientWidth),
//               ease: "none",
//               scrollTrigger: {
//                 trigger: containerRef.current,
//                 pin: true,
//                 scrub: 1,
//                 invalidateOnRefresh: true,
//                 start: "-29% top",
//                 id: "image-slider-st",
//                 // end: `+=${sliderRef.current.offsetWidth - outsideViewportWidth}`
//               },
//             });
//           }
//         }, containerRef.current);
//       })

//       mm.add("(max-width: 900px)", () => {
//         imgSliderCtxMobile = gsap.context(() => {
//           Draggable.create(sliderRef.current, {
//             type: "x",
//             bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//             throwProps: true,
//           });
//         }, containerRef.current);
//       })

//       mm.add("(min-width: 2100px)", () => {
//         imgSliderCtxWideDesktop = gsap.context(() => {
//           Draggable.create(sliderRef.current, {
//             type: "x",
//             bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//             throwProps: true,
//           });
//         }, containerRef.current);
//       })

//       return () => {
//         // ScrollTrigger.getById('image-slider-st').refresh()
//         if(ScrollTrigger.getById('image-slider-st')) ScrollTrigger.getById('image-slider-st').kill();
//         if(imgSliderCtxDesktop) imgSliderCtxDesktop.revert();
//         if(imgSliderCtxMobile) imgSliderCtxMobile.revert();
//         if(imgSliderCtxWideDesktop) imgSliderCtxWideDesktop.revert();
//       }

//     }, [data]);
//   } else {
//     useEffect(() => {
//       let imgSliderCtx = gsap.context(() => {
//         Draggable.create(sliderRef.current, {
//           type: "x",
//           bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//           throwProps: true,
//         });
//       }, containerRef.current);

//       return () => imgSliderCtx.revert();
//     }, [data])
//   }

//   const [windowWidth, setWindowWidth] = useState(null);
//   useEffect(() => {
//     const handleResize = () => {
//         setWindowWidth(window.innerWidth);
//         if(ScrollTrigger.getById('image-slider-st')) ScrollTrigger.getById('image-slider-st').refresh();
//     };

//     window.addEventListener('resize', handleResize);
//     setWindowWidth(window.innerWidth);

//     return () => {
//         window.removeEventListener('resize', handleResize);
//     };
//   }, []);
//   //TODO Image slider fa sballare i markers di ExtraSection (e probabilmente anche di altri componenti), è da sistemare https://greensock.com/forums/topic/30152-scrolltrigger-start-and-end-markers-go-to-right-place-only-after-resize-window/#comment-150519
//   return (
//     <Container ref={containerRef} mt={mt} className="hideScrollbar">
//       <Slider ref={sliderRef} className="imagesSliderRef">
//         {data.data.map((e, i) => (
//           <ImageContainer key={i} big={big} large={i % 3 === 0? false : true}>
//             {/* <img
//               src={getPath(e.attributes.url)}
//               alt="test"
//               ref={el => imagesRef.current[i] = el}
//             ></img> */}
//             <Image
//               src={getPath(e.attributes.url)}
//               alt="Slider di immagini"
//               fill
//               sizes="100%"
//               ref={el => imagesRef.current[i] = el}
//               priority={true}
//             />
//           </ImageContainer>
//         ))}
//       </Slider>
//     </Container>
//   );
// }

// //! STYLE
// const Container = styled.div`
//   margin-top: ${(props) => props.mt};
//   overflow-x: auto;

//   /* @media (min-width: 1280px) { */
//     /* overflow-x: clip; */
//   /* } */
// `;

// const Slider = styled.div`
//   padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
//   white-space: nowrap;
//   overflow-x: unset;
//   width: max-content;

//   div {
//     margin-right: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
//   }

// `;

// const ImageContainer = styled.div`
//   height: ${(props) =>
//     props.big
//       ? `clamp(18.00rem, calc(13.15rem + 20.71vw), 38.00rem)`
//       : `clamp(18rem, calc(14.6rem + 14.5vw), 32rem)`};
//   max-width: ${(props) =>
//     props.large
//       ? `50rem`
//       : `27rem`};
//   overflow: hidden;
//   display: inline-block;
//   position: relative;

//   img {
//     border-radius: 1rem;
//     object-fit: cover;
//     position: relative !important;
//     width: 100%;
//     height: 100%;
//     display: block;
//   }
// `;
