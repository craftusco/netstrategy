import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import Talk from "./utils/Talk";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function TalkHeading({ data, mt, reverse = false, talk = true}) {

  const containerRef = useRef();
  useEffect(() => {
    let TalkHeadingCtx = gsap.context(() => {
      gsap.from(['.left-side', '.right-side'], {
        y: "50%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "0% bottom",
          end: "center center",
          scrub: 1.5,
        },
      });
    }, containerRef.current);
    return () => TalkHeadingCtx.revert();
  }, []);
  return (
    <Container mt={mt} reverse={reverse} ref={containerRef}>
      <div className="left-side">
        {talk === true &&
          <div className="marker-title">
            <Talk color="black" theme={false}></Talk>
          </div>
        }
        <h2 className="title">
          {data.title}
        </h2>
      </div>
      <h2 className="right-side">
        {splitText(data.subtitle)}
      </h2>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
 
  .left-side{
    text-align: center;
    .title{
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
      font-family: ${({ theme: { fonts } }) => fonts.main};
      text-transform: uppercase;
      line-height: .4;
    }
  }
  .right-side{
    margin: 30px 0px;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    text-align: center;
    
    @media (min-width: 1080px) {
      text-align: initial;
      width: 40%;
    }
  }


  @media (min-width: 1080px) {
    flex-direction: ${({ reverse }) => reverse ? "row-reverse" : "row" };
    justify-content: space-between;

    .left-side {
      width: 50%;
      text-align: start;
      width: auto;
      margin: none;
      text-align: left;
    }

    .right-side {
      margin: unset;
      span {
        display: block;
      }
    }
  }
`