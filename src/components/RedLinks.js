import { centerContent } from "@/styles/mixins";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import getPath from "@/utils/getPath";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { redScreenLoader } from "../../redux/animationsSlice";
import Arrow from "./utils/Arrow";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useTab, useMultiStyleConfig } from '@chakra-ui/react'
import { AbsoluteContainer, BackgroundColored, CustomHeading, MobileHorizontalScroll, Paragraph, Wrapper } from "./styled-components";
import Head from "next/head";
import { usePathname } from 'next/navigation';

export default function RedLinks({ data, list, mt, categorizedList, isBlogPost = false, catTabs, catContent }) {
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

  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    return (
      <CustomTabInner>
        <div class={`selector ${(isSelected) && 'active'}`}>
          <Paragraph color="#fff" marginTop="10px" display="flex" uppercase {...tabProps}>
              {
                (isSelected) && <div className="icon-arrow"><Arrow color={'#fff'} /></div>
              }
              <div className="icon-text">{tabProps.children}</div>
          </Paragraph>
        </div>
      </CustomTabInner>
    )
  })

  const [tabIndex, setTabIndex] = useState(0)
  const count = useRef(0)

  const pathname = usePathname()

  useEffect(() => {
    setTabIndex(0)
    count.current = 0
  }, [pathname])

  const handleTabClick = (i, el) => {
    setTabIndex(i)
    count.current = i

    if (windowWidth <= 767) {
        document.querySelector('.horizontal-tab-scroll').scrollTo({
            left: document.querySelector(`.horizontal-tab-scroll .single-tab:nth-child(${(i == 0) ? '1' : i})`).offsetLeft,
            behavior: "smooth"
        })
    }
  }

  return (
    <>
      <Head>
        <style>
            {
                `
                    @-webkit-keyframes fade-in-bottom {
                        0% {
                            -webkit-transform: translateY(50px);
                                    transform: translateY(50px);
                            opacity: 0;
                        }
                        100% {
                            -webkit-transform: translateY(0);
                                    transform: translateY(0);
                            opacity: 1;
                        }
                        }
                        @keyframes fade-in-bottom {
                        0% {
                            -webkit-transform: translateY(50px);
                                    transform: translateY(50px);
                            opacity: 0;
                        }
                        100% {
                            -webkit-transform: translateY(0);
                                    transform: translateY(0);
                            opacity: 1;
                        }
                    }

                    .fade-in-bottom {
                        -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                                animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                    }

                    .chakra-tabs__tablist div:focus-visible {
                      outline: 0px !important;
                    }
                `
            }
        </style>
      </Head>
      <BackgroundColored marginTop={mt} color="#fc1333" paddingTop="50px" paddingBottom="40px" paddingLeft="60px" paddingRight="60px" mobile="padding-left: 0px; padding-right: 0px;">
        <Container id="collegamenti" ref={containerRef} isBlogPost={isBlogPost}>
          <CustomHeading color="#fff !important" fontSize="25px !important">
            {data?.titolo
              ? data.titolo
            : `ALTRI SPUNTI DI APPROFONDIMENTO`}
          </CustomHeading>          
          <Tabs variant='unstyled' index={tabIndex}>
            {
              (windowWidth > 767) ?
              <TabList>
                {catTabs.map((cat, i) => {
                  return(
                    <div className="single-tab" key={i}>
                        <CustomTab onClick={() => {handleTabClick(i, cat)}}>
                          {cat.name}
                        </CustomTab>
                    </div>
                  )
                })}
              </TabList>
              :
                <MobileHorizontalScroll style={{marginTop: '15px'}} className='horizontal-tab-scroll'>
                  <TabList>
                    {catTabs.map((cat, i) => {
                      return(
                        <div className="single-tab" key={i}>
                            <CustomTab onClick={() => {handleTabClick(i, cat)}}>
                              {cat.name}
                            </CustomTab>
                        </div>
                      )
                    })}
                  </TabList>
                </MobileHorizontalScroll>
            }
            
            <Wrapper marginTop="40px" paddingLeft="30px" paddingRight="30px" mobile="padding-left: 0px; padding-right: 0px; margin-top: 20px;">
              <TabPanels>
                {catContent.map((el, i) => (
                  <>
                    <TabPanel key={i}>
                      {
                        el.subpillars.map((el, i, arr) => {
                          return(
                            <>
                              <React.Fragment>
                                {el.attributes.slug != router.query.subpillar && (
                                  <TabContent>
                                    <Paragraph className="tab-text fade-in-bottom" display="block" fontSize="18px" marginLeft="15px" marginRight="15px" mobile="margin-left: 0px; margin-right: 0px;">
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
                                          style={{display: 'block'}}
                                        >
                                          <span>{el.attributes.nome}</span>
                                        </Link>
                                        <div className="tab-hover"></div>
                                    </Paragraph>
                                  </TabContent>
                                )}
                              </React.Fragment>
                            </>
                          )
                        })
                      }
                    </TabPanel>
                  </>
                ))}
              </TabPanels>
            </Wrapper>
          </Tabs>
        </Container>
      </BackgroundColored>
    </>
  );
}

const CustomTabInner = styled.div`
  margin-right: 30px;
  cursor: pointer;
  
  .selector {
    opacity: 0.4;
    transition: all .3s ease;
    position: relative;

    &::after {
      position: absolute;
      bottom: 0px;
      width: 0%;
      height: 2px;
      content: '';
      display: block;
      background-color: #fff;
      transition: all .3s ease;
    }

    &:hover {
      opacity: 1;
    }

    .icon-arrow, icon-text {
      transition: all .3s ease;
    }

    .icon-arrow {
      height: 33px;
      transform: scale(0.7);
    }
  }

  .active {
    opacity: 1;

    &::after {
      width: 100%;
    }
  }

  @media screen and (max-width:767px) {
    text-wrap: nowrap;
    margin-right: 20px;
  }
`

const TabContent = styled.div`
  padding: 5px 15px;
  cursor: pointer;
  transition: all .3s ease;
  display: inline-block;
  width: 100%;
  max-width: 350px;
  position: relative;

  div {
    position: relative;
    z-index: 2;
  }

  span {
    color: #ffffff;
    transition: all .3s ease;
    text-transform: capitalize;
  }

  &::after {
    position: absolute;
    content: '';
    top: 0px;
    left: 0px;
    width: 90%;
    height: 100%;
    z-index: 0;
    border-radius: 50px;
  }

  &:hover {
    &::after {
      background: #fff;
    }

    span {
      color: #000000;
    }
  }

  @media screen and (max-width:767px) {
    max-width: max-content;
    display: block;
    margin-left: -15px;

    &::after {
      width: 100%;
    }
  }
`

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
