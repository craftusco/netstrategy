import { centerContent } from "@/styles/mixins";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import Heading from "./Heading";
import toSlugText from "@/utils/toSlugText";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { HeadingDefault } from "./styled-components";
import LayersList from "./LayersList";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function AccordionMobile({mt, data, title, showTitle = true, isFaq = false, isRed = false}) {
  if(!data || data.length === 0) return;

  const [activeChap, setActiveChap] = useState(0);
  const chapters = useRef([]);

  //* GO to next chapter on click
  const nextChapt = (e, chapTitle, i) => {
    e.preventDefault();
    gsap.to(window, {duration: 1, scrollTo: {y: `#${toSlugText(chapTitle)}`,  offsetY: 100}, ease:'Power3.easeOut'});
    setActiveChap(i);
  }

  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);


    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  //TODO Image slider fa sballare i markers, è da sistemare https://greensock.com/forums/topic/30152-scrolltrigger-start-and-end-markers-go-to-right-place-only-after-resize-window/#comment-150519
  return (
      (windowWidth <= 767) && (
        <Container >
          {data.length === 1 ? 
            <Heading data={
              {
                titolo: data[0].titolo,
                paragrafo: data[0].testo
              }
            }/>
          : 
            <ContentWrapper>
              <TextSection>
                {/* title */}
                {
                  (showTitle) && <HeadingDefault red mobile="font-size: clamp(5.19rem,calc(2.65rem + 10.81vw),15.63rem);">{title}</HeadingDefault>
                }
                <div style={{marginTop: '50px'}}>
                  <LayersList layers={data} isFaq={isFaq} isRed={false} />
                </div>
                {/*data.map((chapter, i) => (
                  <Text className={activeChap === i ? 'active' : ''} id={toSlugText(chapter.titolo)} ref={(el) => {chapters.current[i] = el}} key={i}>
                    <h3>{chapter.titolo}</h3>
                    <article>
                      <ReactMarkdown
                        children={chapter.testo}
                      />
                    </article>
                  </Text>
                ))*/}
              </TextSection>
            </ContentWrapper>
        }
        </Container>
      )
  )
}

// Style
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  @media (max-width: 1080px) {
    margin-top: ${(props) => props.mt};
  }

`;

const ContentWrapper = styled.div`
  ${centerContent}
  margin-bottom: clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem);
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`

const TitleSection = styled.div`
  display: none;
  @media (min-width: 1080px) {
    display: block;
    width: 50%;
  }
`

const TextSection = styled.div`
  @media (min-width: 1080px) {
    width: 50%;
  }
  span {
    font-size: clamp(1.56rem,calc(1.31rem + 1.25vw),2.81rem);
    line-height: clamp(1.56rem,calc(1.31rem + 1.25vw),2.81rem);
    font-family: NeueMontreal-Medium;
    display: inline-block;
    @media (min-width: 1080px) {
      display: none;
    }
  }
`


const Title = styled.div`
  position: sticky;
  top: 7rem;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    display: block;
    border-bottom: 1px solid;
    padding-bottom: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px
  }

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    max-width: 550px;

    @media (min-width: 1080px) {
      span {
        display: block;
      }
    }
  }

  /* @media (min-width: 1080px) {
    width: 50%;
  } */
`;

// const TitleWrapper = styled.div`
//   h2 {
//     margin-bottom: 2rem;
//   }
//   @media (min-width: 1080px) {
//     position: sticky;
//     top: 7rem;
//   }

// `

const Text = styled.div`
  font-size: clamp(1rem,calc(0.86rem + 0.58vw),1.56rem);
  line-height: 1.35em;
  margin-bottom: 4rem;
  position: relative;
  &::before {
    content: '';
    width: 30px;
    aspect-ratio: 1 / 1;
    position: absolute;
    color: red;
    top: 0;
    left: -35px;
    opacity: 0;
    transition: opacity 350ms ease;
    background-image: url('/red_arrow.svg');
    background-size: contain;
    display: none;
    @media (min-width: 1080px) {
      display: block;
    }
  }

  &.active {  
    &::before {
      opacity: 1;
    }
  }

  h3 {
    font-size: clamp(1.25rem,calc(1.15rem + 0.50vw),1.75rem);
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  /* p { 
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_25};
    line-height: 1.35em;
    margin-bottom: 1rem;
  } */

  img {
    max-width: 100%;
    border-radius: 0.5rem;
  }

  a {
    text-decoration: underline;
  }

  ul, ol {
    padding-left: 24px;
    margin-bottom: 1rem;
  }

  /* @media (min-width: 1080px) {
    width: 50%;
  } */
`;

const IndexList = styled.ul`
  display: none;
  @media (min-width: 1080px) {
    display: block;
  }
  list-style-type: none;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
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
`