import { centerContent } from "@/styles/mixins";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getPath from "@/utils/getPath";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { redScreenLoader } from "../../redux/animationsSlice";
import Arrow from "./utils/Arrow";

export default function Links({ data, list, mt, categorizedList, isBlogPost = false }) {
  let array = list.length > 1 ? list : [list];
  if (array.length == 1) {
    const obj = {};
    obj.attributes = array[0];
    array = [obj];
  }

  if (list.length == 0) return <></>;
  // return;
  if (!list) return <></>;

  const containerRef = useRef();
  // //! Scroll animation
  // useEffect(() => {
  //   let linksCtx = gsap.context(() => {
  //     gsap.from(".link-container-ref > a", {
  //       y: "200%",
  //       ease: "easeInOut",
  //       stagger: 0.5,
  //       duration: 10,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "5% bottom-=10%",
  //         end: "5% center+=25%",
  //         scrub: 1.5,
  //       },
  //     });
  //     // gsap.to(".link-container-ref > a", {
  //     //   y: "-100%",
  //     //   ease: "easeInOut",
  //     //   stagger: 0.5,
  //     //   duration: 10,
  //     //   scrollTrigger: {
  //     //     trigger: containerRef.current,
  //     //     start: "5% top",
  //     //     end: "5% 10%",
  //     //     scrub: 1.5,
  //     //     markers: true,
  //     //   },
  //     // });
  //   }, containerRef.current);

  //   return () => {
  //     linksCtx.revert();
  //   };
  // }, [array]);

  const handleLink = (e, link, img) => {
    // Prevent link next
    e.preventDefault();
    e.stopPropagation();
    if (router.pathname !== link) {
      // Disable scroll
      dispatch(redScreenLoader({ link, img }));
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [activeGroup, setActiveGroup] = useState(categorizedList.map((cat, i) => i));

  const [windowWidth, setWindowWidth] = useState(null);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    if (window.innerWidth < 900) {
      setActiveGroup([]);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container id="collegamenti" mt={mt} ref={containerRef} isBlogPost={isBlogPost}>
      <h3>
        {data?.titolo
          ? data.titolo
          : `ALTRI SPUNTI DI APPROFONDIMENTO`}
      </h3>
      {categorizedList.map((cat, i) =>
        /*
          cat.slug == "leftover" ? (
            <>
              <div
                className={
                  (activeGroup.includes(i) ? "active link-group" : "link-group")
                }
                key={i}
                onClick={() => {
                  if (activeGroup.includes(i)) {
                    setActiveGroup((oldArray) =>
                      oldArray.filter((groupIndex) => groupIndex != i)
                    );
                  } else {
                    setActiveGroup((oldArray) => [...oldArray, i]);
                  }
                }}
              >
                <div className="title">
                  <Arrow />
                  <span>{cat.name}</span>
                </div>
                <LinksContainer className="link-container-ref hideable" key={i}>
                  {cat.subpillars.map((el, i, arr) => (
                    <React.Fragment key={i}>
                      {el.attributes.slug != router.query.subpillar && (
                        <Link
                          onClick={(e) => {
                            handleLink(
                              e,
                              getPath(
                                `/${el.attributes.pillar.trim()}/${
                                  el.attributes.slug
                                }`
                              ),
                              getPath(el?.attributes?.immagine?.data?.attributes?.url)
                            );
                          }}
                          href={getPath(
                            `/${el.attributes.pillar.trim()}/${el.attributes.slug}`
                          )}
                        >
                          <span>{el.attributes.nome}</span>
                          {i == arr.length - 1 ? "" : <div className="dot">●</div>}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </LinksContainer>
              </div>
            </>
          ) : (
            <div
              className={
                (activeGroup.includes(i) ? "active link-group" : "link-group")
              }
              key={i}
              onClick={() => {
                if (activeGroup.includes(i)) {
                  setActiveGroup((oldArray) =>
                    oldArray.filter((groupIndex) => groupIndex != i)
                  );
                } else {
                  setActiveGroup((oldArray) => [...oldArray, i]);
                }
              }}
            >
              <div className="title">
                <Arrow />
                <span>{cat.name}</span>
              </div>
              <LinksContainer className="link-container-ref hideable">
                {cat.subpillars.map((el, i, arr) => (
                  <React.Fragment key={i}>
                    {el.attributes.slug != router.query.subpillar && (
                      <Link
                        onClick={(e) => {
                          handleLink(
                            e,
                            getPath(
                              `/${el.attributes.pillar.trim()}/${
                                el.attributes.slug
                              }`,
                              true
                            ),
                            getPath(
                              el?.attributes?.immagine?.data?.attributes?.url
                            )
                          );
                        }}
                        href={getPath(
                          `/${el.attributes.pillar.trim()}/${el.attributes.slug}`,
                          true
                        )}
                      >
                        <span>{el.attributes.nome}</span>
                        {i == arr.length - 1 ? "" : <div className="dot">●</div>}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </LinksContainer>
            </div>
          )
        */
        <div
          className={
            (activeGroup.includes(i) ? "active link-group" : "link-group")
          }
          key={i}
          onClick={() => {
            if (activeGroup.includes(i)) {
              setActiveGroup((oldArray) =>
                oldArray.filter((groupIndex) => groupIndex != i)
              );
            } else {
              setActiveGroup((oldArray) => [...oldArray, i]);
            }
          }}
        >
          <div className="title">
            <Arrow />
            <span>{cat.name}</span>
          </div>
          <LinksContainer className="link-container-ref hideable">
            {cat.subpillars.map((el, i, arr) => (
              <React.Fragment key={i}>
                {el.attributes.slug != router.query.subpillar && (
                  <Link
                    onClick={(e) => {
                      handleLink(
                        e,
                        getPath(
                          `/${el.attributes.pillar.trim()}/${
                            el.attributes.slug
                          }`,
                          true
                        ),
                        getPath(
                          el?.attributes?.immagine?.data?.attributes?.url
                        )
                      );
                    }}
                    href={getPath(
                      `/${el.attributes.pillar.trim()}/${el.attributes.slug}`,
                      true
                    )}
                  >
                    <span>{el.attributes.nome}</span>
                    {i == arr.length - 1 ? "" : <div className="dot">●</div>}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </LinksContainer>
        </div>
      )}
    </Container>
  );
}

const LinksContainer = styled.div`
  &.hideable {
    max-height: 0;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    overflow: hidden;
  }
  margin-top: 10px; // 24px → 40px
  /* margin-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px */
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  row-gap: 0.65rem;
  text-transform: uppercase;
  align-items: center;
  transition: opacity 350ms ease, max-height 600ms ease,
    padding-bottom 350ms ease;
  @media (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .container-link {
    display: flex;
    align-items: center;
  }

  a{
    @media (min-width: 950px) {
      width: 25%;
      text-transform: capitalize;
      font-family: ${({ theme: { fonts } }) => fonts.regular} !important;
      font-size: 25px !important; 
      /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_18_38}; */

    }
  }
  .dot {
    font-size: 0.65rem;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    padding-inline: 1rem;
    text-decoration: none;
    @media (max-width: 500px) {
      color: #f1f1f1;
    }
    @media (min-width: 950px) {
      display: none;
    }
  }

  &:hover {
    > a,
    > .dot {
      opacity: 0.5;
    }
    > a:hover {
      opacity: 1;
    }
  }
  a {
    text-decoration: none;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_18_38};
    font-family: ${({ theme: { fonts } }) => fonts.regular};
    line-height: 1em;
    display: flex;
    position: relative;
    transition: all 100ms ease-in;
    &:hover {
      /* color: ${({ theme: { colors } }) => colors.primaryColor}; */
      span {
        text-decoration: underline;
        text-decoration-thickness: 4px;
        text-underline-offset: 0px;
        text-decoration-skip-ink: none;
        text-decoration-color: #fc1333;
      }
    }
  }
  
`;

const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  h3 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_18_38};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
  }

  .link-group {
    padding-top: 2rem;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV3};
    &:last-child {
      border-bottom: ${({isBlogPost, theme: {colors}}) => isBlogPost ? 'none' : `1px solid ${colors.blackColorV3}`}
    }
    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      color: ${({ theme: { colors } }) => colors.blackColorV3};
      font-size: clamp(1.13rem, calc(0.82rem + 1.29vw), 2.38rem);
      text-transform: uppercase;
      margin-bottom: 1.25rem;

      cursor: pointer;
      svg {
        stroke: ${({ theme: { colors } }) => colors.blackColorV3};
        transition: all 350ms ease;
      }
    }
    &.active {
      .title {
        color: ${({ theme: { colors } }) => colors.primaryColor};
      }
      svg {
        transform: translate(3px, 3px);
        stroke: ${({ theme: { colors } }) => colors.primaryColor};
      }
      ${LinksContainer} {
        &.hideable {
          max-height: 1000px;
          opacity: 1;
          padding-bottom: 2rem;
          user-select: initial;
          pointer-events: initial;
        }
      }
    }
    @media (max-width: 600px) {
      padding-top: 1.5rem;
      .title {
        margin-bottom: 0.25rem;
      }
    }
  }
`;


async function newValuePromise(url) {
  let d = "";
  await toDataURL(url).then((dataUrl) => {
    d = dataUrl;
  });
  return await d;
}

function toDataURL(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}
