import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger)

export default function Subpillar2Faq({ layers }) {
  const [activeListItem, setActiveListItem] = useState(0);
  const router = useRouter();

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [activeListItem])

  const [notMounted, setnotMounted] = useState(true);

  useEffect(() => {
    setnotMounted(false);
  }, [])

  useEffect(() => {
    
    const handleRouteChanged = () => {
      setnotMounted(false);
    };

    const handleRouteChangeStart = ()=>{
      setnotMounted(true);
    }

    router.events.on("routeChangeComplete", handleRouteChanged);
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);

  return layers.map(({ domanda, risposta }, i, arr) => (
    <Layer
      key={i}
      className={i === arr.length - 1 ? "is_last" : ""}
      onClick={() => {
        if (i === activeListItem) {
          setActiveListItem(null);
        } else {
          setActiveListItem(i);
        }
      }}
    >
      <div className="content">
        <h3 style={{fontSize: '24px'}} className={(activeListItem == i || notMounted) ? "active" : ""}>{domanda}</h3>
        <div className={(activeListItem == i || notMounted) ? "active text" : "text"}>
          <ReactMarkdown
            children={risposta}
            components={{
              a: ({ node, href, ...props }) => {
                if (href.startsWith('#')) {
                  return (
                    <a
                      onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault();
                        gsap.to(window, {
                          duration: 1,
                          scrollTo: { y: href, offsetY: 100 },
                          ease: "Power3.easeOut",
                        });
                      }}
                      {...props}
                    ></a>
                  );
                } else {
                  return <a href={href} {...props} target="_blank" onClick={e => e.stopPropagation()}></a>;
                }
              },
            }}
          />
        </div>
      </div>

      <div className={(activeListItem == i || notMounted) ? "active arrow" : "arrow"}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
      </div>

    </Layer>
  ));
}

const Layer = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 1.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  cursor: pointer;
  position: relative;

  @media (max-width: 1080px) {
    padding-bottom: 0.5rem;
  }

  @media (min-width: 551px) {
    &.is_last {
      border: 0;
    }
  }

  @media screen and (max-width: 767px) {
    h3 {
      font-size: 20px !important;
    }
  }

  &:first-child {
    padding-top: 0;
  }

  p, ul {
    margin-bottom: 0px !important;
  }

  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_30};
    &.active {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
    @media (max-width: 1280px) {
      margin-top: initial;
    }
  }

  div.text {
    /* width: 100%; */
    opacity: 0;
    max-height: 0;
    transition: all 800ms ease-in-out, margin-top 300ms ease-in-out;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_paragraph};
    line-height: clamp(1.56rem, calc(1.49rem + 0.32vw), 1.88rem);
    pointer-events: none;

    &.active {
      margin-top: 0.8rem;
      opacity: 1;
      max-height: 1000px;
      a {
        pointer-events: all;
      }
    }

    p {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    ul, ol {
      margin-bottom: 1.5rem
    }

    a {
      text-decoration: underline;
    }

  }

  .arrow {
    svg {
      transition: transform 350ms;
      stroke: ${({ theme: { colors } }) => colors.blackColorV1};
      width: 1.7rem;
      margin-top: 5px;
      position: absolute;
      right: 0px;
    }

    &.active {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  @media (min-width: 1080px) {
    &:last-child {
      border-bottom: 1px solid #e2e2e2;
    }
  }
`;
