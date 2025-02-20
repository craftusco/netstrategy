import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import CategoriesFilter from "./utils/CategoriesFilter";
import AllFilterIcon from "./utils/AllFilterIcon";
import { useRef, useState } from "react";

export default function JournalFilter({ categories = []}) {

  const [showFilters, setShowFilters] = useState(false);
  const filterContainers = useRef();
  const height = filterContainers.current && filterContainers.current.offsetHeight; 

  return (
    <Container>
      <ContentDesktop>
        <Title>
          welcome to our journal {/* — it’s time to share. */}
        </Title>
        <div onClick={()=>setShowFilters(!showFilters)} className="filter" data-number={12}>
          <AllFilterIcon  />
          All
        </div>
        <Filters filterHeight={height} showFilters={showFilters}>
        <div ref={filterContainers} className="filter-containers">
          <CategoriesFilter categories={categories}/>
        </div>
      </Filters>
      </ContentDesktop>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  padding-top: clamp(2rem, calc(1.27rem + 3.11vw), 3rem); // 32px → 48px
  
  .filter {
    display: flex;
    column-gap: clamp(0.5rem, calc(0.38rem + 0.52vw), 1rem); // 8px → 16px
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    position: relative;

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
  @media (min-width: 1024px) {
    .filter {
      display: none;
    }
  }
`;
const Filters = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: ${props => props.showFilters ? `${props.filterHeight}px` : `0px`};
  transition: all 300ms linear;
  .filter-containers{
    position: absolute
  }
  @media (min-width: 1024px) {
    display: block;
    height: 100%;
    .filter-containers{
      position: relative;
    }
  }
`;
const Title = styled.div`
  margin-bottom: clamp(1rem, calc(.27rem + 3.11vw), 2rem);
  font-size: 17px;
`;

const ContentDesktop = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  justify-content: space-between;
  text-transform: uppercase;
`;
