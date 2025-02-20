import styled from "styled-components";
import Image from "next/image";
import RightArrow from "./utils/RightArrow";
import { centerContent } from "@/styles/mixins";
import { useDispatch } from "react-redux";
import { changeColor } from "@/../redux/customCursorSlice";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useMemo, useRef } from "react";
import getPath from "@/utils/getPath";

gsap.registerPlugin(ScrollTrigger);

export default function JournalPost({ article, isLast }) {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const redArrowRef = useRef();
  const imageRef = useRef();
  const handleMouseEnter = () => {
    let journalPostCtx = gsap.context(() => {
      gsap.to(redArrowRef.current, {
        y: "2%",
        x: "20%",
        duration: 0.3,
      });
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.3,
      });
    }, containerRef.current);

    return () => journalPostCtx.revert();
  };
  const handleMouseLeave = () => {
    let journalPostCtx = gsap.context(() => {
      gsap.to(redArrowRef.current, {
        y: "0",
        x: "0",
        duration: 0.3,
      });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.3,
      });
    }, containerRef.current);

    return () => journalPostCtx.revert();
  };

  return (
    <Container
      className="no_highlights"
      onMouseEnter={() => {
        dispatch(changeColor("scaleUp"));
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        dispatch(changeColor("scaleDown"));
        handleMouseLeave();
      }}
      ref={containerRef}
    >
      <Content className="content">
        <ImageContainer>
          <Image
            ref={imageRef}
            src={
              article.immagine?.data
                ? getPath(article.immagine.data.attributes.url)
                : article.cover_image
                ? article.cover_image
                : "/cookie.webp"
            }
            alt={article?.immagine?.data?.attributes?.alternativeText ? article?.immagine?.data?.attributes?.alternativeText : 
              article.titolo
                ? `immagine articolo  ${article.titolo}`
                : "immagine articolo"
            }
            fill
            sizes="100%"
          />
        </ImageContainer>
        <Text>
          <Number>
            <RedArrow ref={redArrowRef} src="/red_arrow.svg" />
            {/* <RightArrow /> */}
            <span>{article.date_2}</span>
            {/* <span>Feb/n.08</span> */}
          </Number>
          <h2>{article.titolo}</h2>
          <ChaptersPreview>
            {article.content.map(
              (chap, i) =>
                i < 4 && (
                  <li className={i === 0 ? "active" : ""} key={i}>
                    <span className="dot">●</span> {chap.title}
                  </li>
                )
            )}
            {article.content.length > 4 && (
              <li>
                <span className="dot">●</span> ...
              </li>
            )}
            <p className="read-more">Leggi l'articolo</p>
          </ChaptersPreview>
          <Category>{article.categoria.data.attributes.nome}</Category>
          {/* <State>applied — {article.date_2}</State> */}
        </Text>
      </Content>
    </Container>
  );
}

const RedArrow = styled.img``;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1.25rem;
  aspect-ratio: 4 / 2.9;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const Container = styled.div`
  ${centerContent}
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }
`;

const Content = styled.div`
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding-top: clamp(2rem, calc(0.97rem + 4.4vw), 6.25rem);
  padding-bottom: clamp(2rem, calc(0.97rem + 4.4vw), 6.25rem);

  @media (min-width: 1024px) {
    display: flex;
    column-gap: clamp(1.25rem, calc(0.18rem + 1.67vw), 2.19rem); // 20px → 35px
  }
`;

const Text = styled.div`
  margin-top: 1rem; //
  /* text-transform: uppercase; */
  display: flex;
  flex-direction: column;
  row-gap: 0.7rem;

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-weight: 100;
    margin-bottom: 1.5rem;
    text-transform: lowercase;
    &:first-letter {
      text-transform: uppercase;
    }
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    width: 60%;
    row-gap: 0.4rem;
    h3 {
      margin-bottom: 0px;
    }
  }
`;

const Number = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  display: flex;
  /* justify-content: space-between; */
  align-items: center;

  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }
  img {
    margin-bottom: -5px;
    width: 25px;
    margin-right: 5px;
  }

  @media (min-width: 1024px) {
    img {
      margin-bottom: -15px;
      width: 45px;
      margin-right: 25px;
    }
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      display: inline-block;
      width: clamp(1.88rem, calc(1.16rem + 1.12vw), 2.5rem); // 30px → 40px
    } */
    /* svg{
      fill: red;
    } */
  }
`;

const State = styled.div`
  font-size: clamp(0.75rem, calc(0.69rem + 0.26vw), 1rem); // 12px → 36px

  @media (min-width: 1024px) {
    margin-top: auto;
  }
`;

const ChaptersPreview = styled.ul`
  list-style-type: none;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
  margin-bottom: 1rem;
  overflow: auto;
  padding-right: 10px;
  li {
    transition: color 200ms;
    /* margin-bottom: 0.25rem; */
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
  .read-more {
    margin-top: 1.5rem;
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_25};
`;
