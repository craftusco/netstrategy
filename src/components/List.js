import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect } from "react";
import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function List({ data, mt }) {
  const [activeListItem, setActiveListItem] = useState(1);
  if(!data)
    return (
      <></>
    )
  let mm = gsap.matchMedia();

  useEffect(() => {
  mm.add(
    "(min-width: 481px)",
    () => {
      let subpillarList = gsap.context(() => {
        gsap.utils.toArray('.list-container-ref > div').forEach(el => {
          gsap.from(el, {
            y: "100%",
            ease: "easeInOut",
            scrollTrigger: {
              trigger: el,
              start: "top-=100% bottom-=10%",
              end: "top-=100% bottom-=20%",
              scrub: 1.5,
            },
          });
        });
      }, '.list-container-ref');
      return () => subpillarList.revert();

    })
  }, []);

  return (
    <Container mt={mt} id="elenco">
      <h2>
        {data.titolo}
      </h2>
      <ListContainer className="list-container-ref list-container">
        {data.elenco.map(({ titolo, paragrafo }, i) => (
          <ListItem onClick={() => {setActiveListItem(i)}} key={i}>
            <ListTitle>
              <span>{(++i).toString().padStart(3, "00")}</span>
              <svg
                className={activeListItem === i ? "active" : ""}
                xmlns="http://www.w3.org/2000/svg"
                width="61.957"
                height="61.592"
                viewBox="0 0 61.957 61.592"
              >
                <g
                  id="Raggruppa_497"
                  data-name="Raggruppa 497"
                  transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                >
                  <path
                    id="Tracciato_8"
                    data-name="Tracciato 8"
                    d="M0,43.811,21.905,21.905,0,0"
                    transform="translate(30.318 0)"
                    fill="none"
                    stroke="inherit"
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
                    stroke="inherit"
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                </g>
              </svg>
            </ListTitle>
            <ListItemText className="list-item-text">
              <h3>{titolo}</h3>
              <div className={activeListItem == i ? "active text" : "text"}>
                  <ReactMarkdown children={paragrafo} />
              </div>
              {/* <p className={activeListItem === i ? "active" : ""}>
                <ReactMarkdown
                  components={{
                    p: React.Fragment,
                  }}
                >
                  {paragrafo}
                </ReactMarkdown>
              </p> */}
            </ListItemText>
          </ListItem>
        ))}
      </ListContainer>
    </Container>
  );
}

// Style
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  ${centerContent}

  h2 {
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    @media (min-width: 992px) {
      padding: 0px clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem);
    }
  }
`;

const ListContainer = styled.div`
  margin-top: clamp(2rem, calc(0.73rem + 5.44vw), 7.25rem); // 32px → 116px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
  
  @media (min-width: 992px) {
    border-top: none;
    padding: 0px 30px;
    margin-top: 0px;
  }
`;

const ListTitle = styled.div `
  svg {
    display: none;
    stroke: ${({ theme: { colors } }) => colors.blackColorV3};
    transition: all 300ms ease;
  }
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%; 

    svg {
      display: block;
      &.active {
        stroke: ${({ theme: { colors } }) => colors.primaryColor};
        transform: translateY(0.5rem);
      }
    }
  }


`

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid;
  padding: 35px 0px;
  row-gap: 1rem;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 3rem clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem);
    row-gap: 3rem;
    flex-direction: row;
    gap: 3rem;
  }

  @media (max-width: 992px) {
    align-items: flex-start;
  }

  &:last-child {
    border: 0;
  }

  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    line-height: 0.91em;
  }

  
`;

const ListItemText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 75%;
  margin-left: auto;

  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0;
    row-gap: 0rem;
  }
 
  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_22_28};
    font-family: ${({ theme: { fonts } }) => fonts.regular};
    letter-spacing: 1px;

    @media (min-width: 481px) and (max-width: 992px) {
      margin-bottom: 1.5rem;
    }
  }
  div {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    line-height: 1.4em;
    transition: max-height 800ms ease-in-out, opacity 600ms ease-in-out 200ms, padding 500ms ease-in-out;
    transition-delay: padding ;
    max-height: 1000px;

    p {
      margin-bottom: 1.5rem;
    }

    @media (max-width: 480px) {
      opacity: 0;
      max-height: 0;
      
      &.active {
        opacity: 1;
        height: initial;
        max-height: 1000px;
        margin-top: 1rem;
        /* padding-bottom: 3rem; */
      }
    }
  }
`;
