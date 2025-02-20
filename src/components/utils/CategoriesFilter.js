import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccessSelected } from "../../../redux/filterSuccessesSlice";
import { useRouter } from "next/router";
import { changeColor } from "../../../redux/customCursorSlice";
import toSlugText from "@/utils/toSlugText";

gsap.registerPlugin(ScrollTrigger);

const category = [
  {
    id: 1,
    name: "ALL",
    count: 2,
  },
  {
    id: 2,
    name: "BRANDING",
    count: 1,
  },
  {
    id: 3,
    name: "DIGITAL",
    count: 7,
  },
  {
    id: 4,
    name: "EXPERIENCE",
    count: 8,
  },
  {
    id: 5,
    name: "BRANDING",
    count: 1,
  },
  {
    id: 6,
    name: "DIGITAL",
    count: 7,
  },
  {
    id: 7,
    name: "EXPERIENCE",
    count: 8,
  },
  {
    id: 8,
    name: "EXPERIENCE",
    count: 8,
  },
  {
    id: 15,
    name: "BRANDING",
    count: 1,
  },
];

export default function CategoriesFilter({
  categories = [],
  isGrid = true,
  showCount,
  fromProjectSlider = false,
}) {
  const dispatch = useDispatch();
  const [cats, setCats] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const containerRef = useRef();
  const catRefs = useRef([]);
  const selectedCategory = useSelector(
    (state) => state.filterSuccessesSlice.value
  );
  useEffect(() => {
    let cates = categories.length > 0 ? categories : category;

    if (cates.length > 0) {
      let total = 0;

      cates = cates.map((el) => {
        total += el.count;

        return {
          name: el.nome,
          id: el.id,
          count: el.count,
        };
      });

      cates.unshift({
        id: "all",
        name: "ALL",
        count:
          selectedCategory.total_values != 0
            ? selectedCategory.total_values
            : total,
      });

      setCats(cates);
      setActiveCategory({
        id: "all",
        name: "ALL",
      });

      dispatch(
        updateSuccessSelected({
          total_categories: cates,
        })
      );
    }
  }, [selectedCategory.total_values]);

  const changeCategory = (category) => {
    setActiveCategory(category);
    dispatch(
      updateSuccessSelected({
        query: category,
        pagination: selectedCategory.entry_value,
      })
    );
  };

  //!animate on scroll && reset filters on first load
  useEffect(() => {
    let CategoriesFilterCtx = gsap.context(() => {
      // heading
      gsap.from(catRefs.current, {
        y: "50%",
        ease: "easeInOut",
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top-=20% bottom-=10%",
          end: "top-=20% bottom-=20%",
          scrub: 1,
        },
      });
    }, containerRef.current);

    dispatch(updateSuccessSelected({ query: null }));
    return () => CategoriesFilterCtx.revert();
  }, []);

  //! check if existing category in query param
  const router = useRouter();
  useEffect(() => {
    if (router.query.filter) {
      let {
        nome: name,
        id,
        count,
      } = categories.filter(
        (cat) =>
          cat.nome.toLowerCase().replace(" ", "-") === router.query.filter
      )[0];
      setActiveCategory({ name, id, count });
      changeCategory({ name, id, count });
    } else if (selectedCategory.query) {
      setActiveCategory(selectedCategory.query);
    }
  }, [selectedCategory.query]);
  return (
    <CategoriesContainer ref={containerRef}>
      {cats.map((e, i) => (
        <Category
          fromProjectSlider={fromProjectSlider}
          isActive={activeCategory && activeCategory.id == e.id}
          showCount={showCount}
          onClick={() => {
            if (
              isGrid &&
              router.pathname != "/blog" && !fromProjectSlider
            ) {
              gsap.to(window, {
                duration: 1,
                scrollTo: { y: `#${toSlugText(e.name)}`, offsetY: 100 },
                ease: "Power3.easeOut",
              });
            } else {
              changeCategory(e);
            }
          }}
          key={i}
          ref={(el) => (catRefs.current[i] = el)}
          onMouseEnter={() => {
            dispatch(changeColor("scaleUp"));
          }}
          onMouseLeave={() => {
            dispatch(changeColor("scaleDown"));
          }}
        >
          <span className="title">
            {e.name}
            {i != cats.length - 1 ? "," : ""}
          </span>
          <span className="count">{e.count.toString().padStart(2, "0")}</span>
        </Category>
      ))}
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  padding: 20px;
  row-gap: 1rem;
  column-gap: 2rem;
  @media (min-width: 1024px) {
    /* padding-bottom: 20px; */
    border-bottom: 1px solid ${(props) => props.theme.colors.primaryColor};
    /* padding-right: 0px; */
    column-gap: 18px;
    justify-content: flex-start;
    row-gap: 0px;
    border: 1px solid ${(props) => props.theme.colors.primaryColor};
  }
`;

const Category = styled.span`
  text-transform: uppercase;
  position: relative;
  font-size: ${(props) => props.theme.fontSizes.size_16_20};
  color: ${(props) => props.isActive && props.theme.colors.primaryColor};
  cursor: pointer;
  .title {
    letter-spacing: 0.5px;
    font-family: NeueMontreal-Medium;
  }
  .count {
    display: ${({ showCount }) => (showCount ? "initial" : "none")};
    position: absolute;
    font-size: 11px;
    top: 0;
    right: -15px;
  }
  @media (min-width: 1024px) {
    font-size: ${({fromProjectSlider, theme: {fontSizes}}) => fromProjectSlider ? fontSizes.size_20_40 : fontSizes.size_25_50};
    .count {
      font-size: 12px;
    }
  }
`;
