import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Draggable, ScrollTrigger } from "gsap/all";
import RedLink from "./utils/RedLink";
import SubpillarProjectSlide from "./SubpillarProjectSlide";
import getPath from "@/utils/getPath";
import dataRequest from "@/utils/dataRequest";
import Heading from "./Heading";
import ProjectsFilter from "./ProjectsFilter";
import { useSelector } from "react-redux";
import PageLoader from "./utils/PageLoader";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

export default function SubpillarProjectSlider({
  data,
  staticData,
  mt,
  isWhite = false,
  titolo = "Successi.",
  categorie,
  hideBtn = false
}) {
  //! REFS ---
  const ctaRef = useRef();
  const projectListRef = useRef();
  const containerRef = useRef();
  const [response, setResponse] = useState("");

  const urls = [
    {
      name: "project",
      url: `https://www.netstrategy.it/api/project?populate=deep,3`,
    },
  ];

  const fetchData = async () => {
    const d = await dataRequest(urls);
    setResponse(d);
  };
  useEffect(() => {
    fetchData().catch(console.error);
  }, []);


const obj = {};
  const array = [];

  data.forEach(el => {
    if(el?.attributes?.categorie?.data[0]?.id){
      if(!obj.hasOwnProperty(el?.attributes?.categorie?.data[0]?.id)){
        obj[el?.attributes?.categorie?.data[0]?.id] = [];
      }

      obj[el?.attributes?.categorie?.data[0]?.id].push(el);

    }
  })
  
  Array(2).fill(0).forEach((_, i)=>{
    Object.values(obj).forEach((el, index)=>{
      if(el[i]){
        array.push(el[i]);
      }
    })
  })

  const orderedData = array;

  const img_project =
    response && response.project.attributes.hero.immagine.data.attributes.url;

  //! SLIDER ANIMATION

  const [windowWidth, setWindowWidth] = useState(0);
  const [percentageEnd, setPercentageEnd] = useState(0);
  let mm = gsap.matchMedia();
  const [filteredSuccessi, setFilteredSuccessi] = useState(orderedData);
  const [isLoading, setIsLoading] = useState(false);
  //const progetti = [filteredSuccessi, orderedData].find(el => el != null);
  const progetti = data;
  
  useEffect(() => {
    window.addEventListener("resize", () => {
      setPercentageEnd(filteredSuccessi.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - window.innerWidth + 50);
      setWindowWidth(window.innerWidth);

      // console.log("PERCENTAGE END", percentageEnd);
    });
    setWindowWidth(window.innerWidth);
    // setPercentageEnd(filteredSuccessi.length * 470 - window.innerWidth + 50);
    let stickySection = document.querySelector(".sticky-proj");

    window.addEventListener("scroll", () => {
      if (windowWidth > 900 || window.innerWidth > 900) {
        transform(stickySection);
      }
    });

    function transform(section) {
      const offsetTop = section.parentElement.offsetTop;
      const scrollSection = section.querySelector(".scroll-section-proj");
      // let percentage =((window.scrollY - offsetTop) / window.innerHeight) * 100;
      // percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;

      const start = offsetTop;
      const end = offsetTop + progetti.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - window.innerWidth;
      
      
      let newPercentage = window.scrollY - start;
      setPercentageEnd(progetti.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - window.innerWidth + 50);
    

      newPercentage =
        newPercentage < 0
          ? 0
          : newPercentage > percentageEnd
          ? percentageEnd
          : newPercentage;

      scrollSection.style.transform = `translate3d(${-newPercentage}px, 0, 0)`;
    }

    mm.add("(max-width: 900px)", () => {
      let draggableSliderCtx = gsap.context(() => {
        Draggable.create(projectListRef.current, {
          type: "x",
          bounds: containerRef.current, // Limita il movimento all'interno del contenitore
          throwProps: true,
        });
      }, containerRef.current);

      return () => {
        draggableSliderCtx.revert();
      };
    });
  }, [percentageEnd]);

  const selectedCategory = useSelector(
    (state) => state.filterSuccessesSlice.value
  );

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      const filter =
        !selectedCategory.query || selectedCategory.query?.id == "all"
          ? ""
          : `filters[categorie][id][$in]=${selectedCategory.query.id}`;
      const res = await fetch(strapiGetDataFromQueryURL, { 
        method: 'POST',
        body: JSON.stringify({url: `https://www.netstrategy.it/api/project-details?${filter}&populate=deep,3&pagination[limit]=-1`})
      });
      const { data } = await res.json();
      setFilteredSuccessi(data);
      setIsLoading(false)
    }
    if (selectedCategory.query?.id && selectedCategory.query?.id != "all") {
      getData();
    } else {
      setFilteredSuccessi(orderedData);
    }
  }, [selectedCategory.query]);

  useEffect(() => {
    setPercentageEnd(progetti.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - window.innerWidth + 50);
  }, [progetti]);

  //! COMPONENT
  return (
    <Container mt={mt} ref={containerRef}>
      <ProjectHeading>
        <div className="titolo">
          <Heading
            data={{ titolo }}
            centerContainer={false}
            mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          />
        </div>
        <div className="filtri">
          {
            /*
              <ProjectsFilter
                categories={categorie}
                showLayoutOptions={false}
                fromProjectSlider={true}
              />
            */
          }
        </div>
      </ProjectHeading>
      {isLoading && <PageLoader mt="2rem" color="red"/>}
      <div
        className="sticky-container"
        style={{
          height: (progetti.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - 80) - 450,
        }}
      >
        <div className="sticky-proj">
          <div
            className="scroll-section-proj"
            style={{
              width: (progetti.length * ((450 + 15) < (windowWidth * 0.8) ? (450 + 15) : (windowWidth * 0.8)) - 80) - 450, 
            }}
          >
            {progetti.map(
              (project, i) =>
                project.attributes.thumbnail_success && (
                  <SubpillarProjectSlide
                    iswhite={isWhite}
                    key={i}
                    img={getPath(
                      project.attributes.thumbnail_success.immagine.data
                        .attributes.url
                    )}
                    altText={project?.attributes?.thumbnail_success?.immagine?.data
                      ?.attributes?.alternativeText}
                    title={project.attributes.thumbnail_success.nome}
                    description={
                      project.attributes.thumbnail_success.description
                    }
                    category={
                      project.attributes.categorie?.data[0]?.attributes.nome
                    }
                    link={getPath(`/successi/${project.attributes.slug}`, true)}
                    metrics={project.attributes.thumbnail_success.info_success}
                  />
                )
            )}
          </div>
        </div>
      </div>

      <Content className="projectsListRef" ref={projectListRef}>
        {progetti.map(
          (project, i) =>
            project.attributes.thumbnail_success && (
              <SubpillarProjectSlide
                iswhite={isWhite}
                key={i}
                img={getPath(
                  project.attributes.thumbnail_success.immagine.data.attributes
                    .url
                )}
                altText={project?.attributes?.thumbnail_success?.immagine?.data
                  ?.attributes?.alternativeText}
                title={project.attributes.thumbnail_success.nome}
                description={project.attributes.thumbnail_success.description}
                category={
                  project.attributes.categorie?.data[0]?.attributes.nome
                }
                link={getPath(`/successi/${project.attributes.slug}`, true)}
                metrics={project.attributes.thumbnail_success.info_success}
              />
            )
        )}
      </Content>

      {
        (!hideBtn) && <ButtonContainer ref={ctaRef} className={(windowWidth > 900) ? 'desktop-button' : ''}>
                <RedLink img={getPath(img_project)} link={getPath("/successi", true)}>
                  <PrimaryButton>{staticData.progetti_slider_cta}</PrimaryButton>
                </RedLink>
              </ButtonContainer>
      }
    </Container>
  );
}

//! STYLE

const ButtonContainer = styled.div`
  ${centerContent}
  display: flex;
  justify-content: center;

  &.desktop-button {
    margin-top: -120px;
    position: relative;
    z-index: 200;
  }
`;

const Content = styled.div`
  /* ${centerContent} */
  padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
  display: none;
  /* column-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px */
  overflow-x: unset;
  width: max-content;
`;

const Container = styled.div`
  .sticky-container {
    /* height: 600vh; */
    .sticky-proj {
      overflow: hidden;
      position: sticky;
      top: 0;
      height: 90vh;
      .scroll-section-proj {
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

    .sticky-container {
      display: none;
    }
    ${Content} {
      display: flex;
    }
    ${ButtonContainer} {
      margin-top: clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem); // 32px → 68px;
    }
  }
`;

const ProjectHeading = styled.div`
  ${centerContent}
  display: flex;
  align-items: center;
  > div {
    width: 50%;
  }
  @media screen and (max-width: 1024px) {
    display: block;
    > div {
      width: 100%;
    }
  }
`;

//! ================================
//! BACKUP COMPONENTE
//! ================================

// import styled from "styled-components";
// import PrimaryButton from "./utils/PrimaryButton";
// import { centerContent } from "@/styles/mixins";
// import { gsap } from "gsap";
// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Draggable, ScrollTrigger } from "gsap/all";
// import RedLink from "./utils/RedLink";
// import ProjectSlide from "./ProjectSlide";
// import getPath from "@/utils/getPath";
// import dataRequest from "@/utils/dataRequest";

// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(Draggable);

// export default function ProjectSlider({ data, staticData, mt, isWhite = false }) {
//   //! REFS ---
//   const ctaRef = useRef();
//   const projectListRef = useRef();
//   const containerRef = useRef();
//   const [response, setResponse] = useState("");
//   let mm = gsap.matchMedia();

//   //! SCROLL ----
//   useEffect(() => {
//     let projectSliderCtxDesktop, projectSliderCtxMobile, projectSliderCtxWideDesktop, firefoxProjectCtx;
//     //controllo se sono su firefox, in caso lascio solo draggable, scrolltrigger da problemi
//     if(/^((?!chrome|android|safari).)*firefox/i.test(navigator.userAgent)) {
//       firefoxProjectCtx = gsap.context(() => {
//         Draggable.create(projectListRef.current, {
//           type: "x",
//           bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//           throwProps: true,
//         });
//       }, containerRef.current);
//     } else {
//       mm.add(
//         "(min-width: 901px) and (max-width: 2100px)",
//         () => {
//           projectSliderCtxDesktop = gsap.context(() => {
//             // Image scale
//             gsap.from(".projectsListRef > div img", {
//               scale: 1.25,
//               duration: 1,
//               ease: "power1.inOut",
//               stagger: 0.05,
//               scrollTrigger: {
//                 trigger: projectListRef.current,
//                 start: "-10% bottom",
//                 end: "center center",
//                 scrub: 1,
//               },
//             });
//             // Y enter
//             gsap.from(`.projectsListRef > div:nth-child(even)`, {
//               y: "-10%",
//               duration: 0.8,
//               ease: "power1.inOut",
//               stagger: 0.05,
//               scrollTrigger: {
//                 trigger: projectListRef.current,
//                 invalidateOnRefresh: true,
//                 start: "-10% bottom",
//                 end: "center center",
//                 scrub: 1,
//               },
//             });
//             if(projectListRef.current != null) {
//             // Horizontal scroll
//             const rect = projectListRef.current.getBoundingClientRect();

//             const outsideViewportWidth =
//               rect.left < 0
//                 ? rect.width + rect.left
//                 : rect.right > window.innerWidth
//                 ? rect.width - (rect.right - window.innerWidth)
//                 : 0;
//               gsap.to(projectListRef.current, {
//                 x: (projectListRef.current.offsetWidth - outsideViewportWidth) * -1,
//                 // x: -Math.abs(projectListRef.current.clientWidth - containerRef.current.clientWidth),
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: containerRef.current,
//                   pin: true,
//                   scrub: 1,
//                   start: "-3% top",
//                   invalidateOnRefresh: true,
//                   id: 'project-slider-st',
//                   anticipatePin: true,
//                   end: `+=${projectListRef.current.offsetWidth - outsideViewportWidth}`
//                   // end: `+=${projectListRef.current.offsetWidth - containerRef.current.clientWidth}`
//                 },
//               });
//               // Image exit
//               gsap.to(projectListRef.current.children, {
//                 y: "-50%",
//                 duration: 0.8,
//                 ease: "power1.inOut",
//                 stagger: 0.05,
//                 scrollTrigger: {
//                   trigger: projectListRef.current,
//                   start: "70% top",
//                   end: "300% top",
//                   scrub: 1,
//                 },
//               });
//             }
//             // Cta exit
//             // exitTl.to(ctaRef.current, {
//             //   y: "-100%",
//             //   duration: 0.8,
//             //   ease: "power1.inOut",
//             //   scrollTrigger: {
//             //     trigger: ".projectsListRef",
//             //     start: "80% top",
//             //     end: "250% top",
//             //     scrub: 1,
//             //   },
//             // });
//           }, containerRef.current);
//         },
//         containerRef.current
//       );
//     }
//     mm.add("(max-width: 900px)", () => {
//       projectSliderCtxMobile = gsap.context(() => {
//         Draggable.create(projectListRef.current, {
//           type: "x",
//           bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//           throwProps: true,
//         });
//       }, containerRef.current);
//     })

//     mm.add("(min-width: 2100px)", () => {
//       projectSliderCtxWideDesktop = gsap.context(() => {
//         Draggable.create(projectListRef.current, {
//           type: "x",
//           bounds: containerRef.current, // Limita il movimento all'interno del contenitore
//           throwProps: true,
//         });
//       }, containerRef.current);
//     })

//     return () => {
//       if(ScrollTrigger.getById('project-slider-st')) ScrollTrigger.getById('project-slider-st').kill();
//       if(projectSliderCtxDesktop) projectSliderCtxDesktop.revert()
//       if(projectSliderCtxMobile) projectSliderCtxMobile.revert()
//       if(projectSliderCtxWideDesktop) projectSliderCtxWideDesktop.revert()
//       if(firefoxProjectCtx) firefoxProjectCtx.revert()
//     }

//   }, [data]);

//   const urls = [
//     {
//       name: "project",
//       url: `https://www.netstrategy.it/api/project?populate=deep,3`,
//     },
//   ];

//   const fetchData = async () => {
//     const d = await dataRequest(urls);
//     setResponse(d);
//   };
//   useEffect(() => {
//     fetchData().catch(console.error);
//   }, []);

//   const img_project =
//     response && response.project.attributes.hero.immagine.data.attributes.url;

//   // Recalculate slider
//   // useEffect(() => {
//   //   ScrollTrigger.refresh();
//   // });
//   // useEffect(() => {
//   //   ScrollTrigger.refresh();
//   // }, [data]);
//   // useEffect(() => {
//   //   const handleResize = () => {
//   //       if(ScrollTrigger.getById('project-slider-st')) ScrollTrigger.getById('project-slider-st').refresh();
//   //   };

//   //   window.addEventListener('resize', handleResize);

//   //   return () => {
//   //       window.removeEventListener('resize', handleResize);
//   //   };
//   // }, []);

//   //! COMPONENT
//   return (
//     <Container mt={mt} ref={containerRef}>
//       <Content className="projectsListRef" ref={projectListRef}>
//         {data.map(
//           (project, i) =>
//             project.attributes.thumbnail_success && (
//               <ProjectSlide
//                 iswhite={isWhite}
//                 key={i}
//                 img={getPath(
//                   project.attributes.thumbnail_success.immagine.data.attributes.url
//                 )}
//                 title={project.attributes.thumbnail_success.nome}
//                 description={project.attributes.thumbnail_success.description}
//                 link={getPath(`/successi/${project.attributes.slug}`)}
//               />
//             )
//         )}
//       </Content>
//       <ButtonContainer ref={ctaRef}>
//         <RedLink img={getPath(img_project)} link={getPath("/successi")}>
//           <PrimaryButton>{staticData.progetti_slider_cta}</PrimaryButton>
//         </RedLink>
//       </ButtonContainer>
//     </Container>
//   );
// }

// //! STYLE
// const Container = styled.div`
//   overflow-x: hidden;

//   @media (min-width: 901px) {
//     overflow-x: clip;
//   }
// `;

// const Content = styled.div`
//   /* ${centerContent} */
//   padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
//   padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
//   display: flex;
//   column-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px
//   overflow-x: unset;
//   width: max-content;
// `;

// const ButtonContainer = styled.div`
//   ${centerContent}
//   margin-top: clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem); // 32px → 68px;
//   display: flex;
//   justify-content: center;
// `;
