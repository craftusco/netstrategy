import styled from "styled-components";
import AllFilterIcon from "./utils/AllFilterIcon";
import ListFilterIcon from "./utils/ListFilterIcon";
import GridFilterIcon from "./utils/GridFilterIcon";
import { centerContent } from "@/styles/mixins";
import CategoriesFilter from "./utils/CategoriesFilter";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateData } from "../../redux/listSlice";

export default function ProjectsFilter({
  categories = [],
  isGrid = true,
  showLayoutOptions = true,
  fromProjectSlider = false,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const filterContainers = useRef();
  const height =
    filterContainers.current && filterContainers.current.offsetHeight;
  const dispatch = useDispatch();
  return (
    <Container>
      <Content showLayoutOptions={showLayoutOptions}>
        <span
          onClick={() => setShowFilters(!showFilters)}
          className="filter"
          data-number={36}
        >
          <AllFilterIcon />
          All
        </span>
        {/* {showLayoutOptions && (
          <>
            <span onClick={() => dispatch(updateData("row"))}>
              <ListFilterIcon />
              List
            </span>
            <span onClick={() => dispatch(updateData("grid"))}>
              <GridFilterIcon />
              Grid
            </span>
          </>
        )} */}
      </Content>
      <Filters filterHeight={height} showFilters={showFilters}>
        <div ref={filterContainers} className="filter-containers">
          <CategoriesFilter
            categories={categories}
            isGrid={isGrid}
            showCount={showLayoutOptions}
            fromProjectSlider={fromProjectSlider}
          />
        </div>
      </Filters>
    </Container>
  );
}

const Container = styled.div`
  /* ${centerContent} */
  margin-top: 20px;
  @media (min-width: 1024px) {
    margin-top: 0px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  gap: calc(20px + 2.5vw);
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding: clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem) 0px;
  span {
    display: flex;
    column-gap: clamp(0.5rem, calc(0.38rem + 0.52vw), 1rem); // 8px → 16px
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    position: relative;

    &:first-child::after {
      content: ${({ showLayoutOptions }) =>
        showLayoutOptions ? "attr(data-number)" : ""};
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-family: inherit;
      font-size: 0.75rem;
      position: absolute;
      top: -0.5em;
      right: -1em;
    }
  }

  @media (min-width: 1024px) {
    justify-content: flex-end;
    padding: clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem) clamp(3rem, calc(3rem + 5vw), 7rem);

    border: none;

    .filter {
      display: none;
    }
  }
`;

const Filters = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  height: ${(props) => (props.showFilters ? `${props.filterHeight}px` : `0px`)};
  transition: all 300ms linear;
  .filter-containers {
    position: absolute;
  }
  @media (min-width: 1024px) {
    display: block;
    height: 100%;
    .filter-containers {
      position: relative;
    }
  }
`;
