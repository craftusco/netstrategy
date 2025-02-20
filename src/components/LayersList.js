import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger)

export default function LayersList({ layers, isFaq = false, isRed = false }) {
  const [activeListItem, setActiveListItem] = useState(null);
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

  return layers.map((el, i, arr) => (
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
      <div className="arrow">
        <svg
          className={activeListItem == i ? "active" : ""}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 61.957 61.592"
          style={(isRed) ? {stroke: '#fc1333'} : {stroke: '#000000'}}
        >
          <g
            id="Raggruppa_401"
            data-name="Raggruppa 401"
            transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
          >
            <path
              id="Tracciato_8"
              data-name="Tracciato 8"
              d="M0,43.811,21.905,21.905,0,0"
              transform="translate(30.318 0)"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6"
            />
            <line
              id="Linea_23"
              data-name="Linea 23"
              x1="51.974"
              transform="translate(0 22.155)"
              fill="none"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </g>
        </svg>
      </div>

      <div className="content">
        <h3 className={(activeListItem == i || notMounted) ? "active" : ""} style={(isRed) ? {color: '#fc1333'} : {color: 'inherit'}}>{el.titolo}</h3>
        <div className={(activeListItem == i || notMounted) ? "active text" : "text"}>
          <ReactMarkdown
            children={(isFaq) ? el.testo : el.paragrafo}
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

    </Layer>
  ));
}

const Layer = styled.div`
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV1};
  padding: 1.5rem 0;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  cursor: pointer;

  @media (max-width: 1080px) {
    padding-bottom: 1rem;
  }

  @media (min-width: 551px) {
    &.is_last {
      border: 0;
    }
  }

  &:first-child {
    padding-top: 0;
  }

  

  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_30};
    &.active {
      color: ${({ theme: { colors } }) => colors.primaryColor} !important;
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
      transform: rotate(270deg);
      stroke: ${({ theme: { colors } }) => colors.blackColorV1};
      width: 2rem;
      &.active {
        stroke: ${({ theme: { colors } }) => colors.primaryColor} !important;
        transform: rotate(270deg) translateX(-5px);
      }
    }
  }

  @media (min-width: 1080px) {
    &:last-child {
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV1};
    }
  }
`;
