{/* <MobileContentIndex>
        <h5>Indice dei contenuti</h5>
        <ul>
          {data.chapters.map((chap, i) => (
            <li key={i} onClick={(e) => {handleIndexClick(e, `#${toSlugText(chap.title)}`)}}>
              <a href={`#${toSlugText(chap.title)}`}></a>• {chap.title}
            </li>
          ))}
        </ul>
      </MobileContentIndex> */}

import styled from "styled-components";
import AllFilterIcon from "./utils/AllFilterIcon";
import { centerContent } from "@/styles/mixins";
import { useState, useRef} from "react";
import toSlugText from "@/utils/toSlugText";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import BlogContactBtns from "./BlogContactBtns";

gsap.registerPlugin(ScrollToPlugin)

export default function BlogContentIndex({chapters, activeChapter, onIndexClick}) {

  const [showFilters, setShowFilters] = useState(false);
  const filterContainers = useRef();
  const height = filterContainers.current && filterContainers.current.offsetHeight; 

  const nextChapt = (e, index, chapTitle) => {
    e.preventDefault();
    gsap.to(window, {duration: 1, scrollTo: {y: `#${toSlugText(chapTitle)}`,  offsetY: 450}, ease:'Power3.easeOut'});
    setShowFilters(false)
    onIndexClick(index);
  }

  return (
    <Container className="bci-container-ref">
      <Content className="bci-content-ref">
        <span onClick={()=>setShowFilters(!showFilters)} className="filter">
          <AllFilterIcon  />
          Indice dei contenuti
        </span>
      </Content>
      <Filters filterHeight={height} showFilters={showFilters}>
        <ul ref={filterContainers} className="filter-containers">
          {chapters.map((chap, index) => (
            <li 
              onClick={(e) => nextChapt(e, index, chap.title)}
              className={activeChapter === index ? "active": ""}
              key={index}
            >
              <a href={`#${toSlugText(chap.title)}`}><span className="dot">●</span> {chap.title}</a>
            </li>
        ))}
        </ul>
      </Filters>
      <BlogContactBtns />
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  margin-top: 20px;
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: ${({ theme: { colors } }) => colors.whiteColor};

  @media (min-width: 1081px) {
    display: none;
  }

`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: calc(20px + 2.5vw);
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  transition: padding-top 350ms ease;

  span {
    display: flex;
    column-gap: clamp(0.5rem, calc(0.38rem + 0.52vw), 1rem); // 8px → 16px
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    position: relative;
    width: inherit;
    padding: clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem) 0px;

    &:first-child::after {
      content: attr(data-number);
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-family: inherit;
      font-size: 0.75rem;
      position: absolute;
      top: -0.5em;
      right: -1em;
    }
  }

  @media (min-width: 1080px) {
    justify-content: flex-end;
    padding: clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem) clamp(3rem, calc(3rem + 5vw), 7rem);
    border: none;

    .filter{
      display: none;
    }
    
  }
`;

const Filters = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: ${props => props.showFilters ? `${props.filterHeight}px` : `0px`};
  border-bottom: 1px solid ${({showFilters, theme: {colors}}) => showFilters ? colors.primaryColor : "transparent"};
  transition: all 300ms linear;
  .filter-containers{
    position: absolute;
    list-style-type: none;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
    padding: clamp(2rem,calc(1.88rem + 0.52vw),2.5rem) 0px;
    li {
      transition: color 200ms;
      margin-bottom: 0.25rem;
      cursor: pointer;
      &.active {
        color: ${({ theme: { colors } }) => colors.primaryColor};
      }

      text-indent: -13px;
      margin-left: 13px;
      .dot {
        font-size: 10px;
        position: relative;
        bottom: 4px;
      }
    }
  }
  @media (min-width: 1080px) {
    display: block;
    height: 100%;
    .filter-containers{
      position: relative;
    }
  }
`;