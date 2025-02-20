import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

const possibleSections = [
  "specialist",
  "elenco",
  "offerta",
  "obbiettivi",
  "restyling",
  "project_detail",
  "livelli",
  "extra",
  "collegamenti",
];

export default function Index({ data, title, subpillarData, mt }) {
  //mi genero i link alle varie sezioni della subpillar sulla base di quali section sono state popolate su strapi e quali no
  const dest = possibleSections.filter((section, i) => {
    if(Array.isArray(subpillarData[section])) {
      return subpillarData[section].length === 0 ? false : true;
    } else if (typeof subpillarData[section]?.data == "undefined") {
      return subpillarData[section] == null ? false : true;
    } else{
      return subpillarData[section].data == null ? false : true;
    }
  });
  dest.push("contact"); //la section "contact" c'è sempre di default 
  // const dest = []
  const indexLinksRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    let indexCtx = gsap.context(() => {
      gsap.from(indexLinksRef.current, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=10%",
          end: "top bottom-=30%",
          scrub: 1.5,
        },
      });

    }, containerRef.current);


    return () => {
      indexCtx.revert();
    }
  }, [])

  const handleIndexClick = (e, dest) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: { y: dest, offsetY: 80 }, ease: 'Power3.easeOut' });
  }
  const index = data.split("\n");

  return (
    <Container mt={mt} ref={containerRef}>
      <h3>
        <span>{title}</span>
      </h3>
      <ListContainer>
        <List>
          {dest.map((e, i) => (
            <a
              key={i}
              onClick={(e) => { handleIndexClick(e, `#${dest[i]}`) }}
              href={`#${dest[i]}`}
              ref={(el) => { indexLinksRef.current[i] = el }}
            >{index[i] ? index[i] : "It's time to connect"}</a>
          ))}
        </List>
      </ListContainer>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent};
  margin-top: ${(props) => props.mt};

  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    color: ${({ theme: { colors } }) => colors.blackColorV3};
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.blackColorV3};
    width: 100%;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    @media (max-width: 1024px) {
      margin-bottom: 1rem;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const List = styled.div`
  margin-top: clamp(1rem, calc(0.42rem + 2.47vw), 2rem); // 16px → 32px
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 0.25rem; 
  width: calc(40% + 20vw);

  @media (max-width: 768px) {
    margin-top: 0;
    width: 100%;
  }
  
  a {
    cursor: pointer;
    transition: color 300ms;
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_28}; */
    font-size: clamp(1.13rem, calc(1.08rem + 0.25vw), 1.38rem);
    line-height: clamp(1.38rem, calc(1.33rem + 0.25vw), 1.63rem);
    color: ${({ theme: { colors } }) => colors.blackColorV3};
    border-bottom: 2px solid ${({ theme: { colors } }) => colors.blackColorV3};

    @media (max-width: 768px) {
      margin-top: 0;
      width: 100%;
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.blackColorV3};
    }

    width: 100%;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;

    &:hover {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }

  @media (min-width: 1024px) {
    margin-top: 0;
  }

  a:last-child {
    border-bottom: none;
  }
`;
