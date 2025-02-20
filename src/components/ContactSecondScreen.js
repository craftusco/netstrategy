import splitText from "@/utils/splitText";
import { gsap } from "gsap";
import { useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { dataContext } from "@/pages/contatti";
import BackIcon from "./utils/BackIcon";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";

export default function ContactSecondScreen({ data }) {
  const containerRef = useRef();
  const { dataCtx, setDataCtx } = useContext(dataContext);
  const dispatch = useDispatch();

  const array =
    data && data.posizioni_lavorative ? data.posizioni_lavorative : [];

  useEffect(() => {
    containerRef.current.addEventListener("scroll", () => {
      if(containerRef.current.scrollTop != 0) {
        gsap.to('.headerRef', {
          duration: 0.5,
          opacity: 0,
        });
      } else {
        gsap.to('.headerRef', {
          duration: 0.5,
          opacity: 1,
        });
      }
    })
  }, [])
  return (
    <Container ref={containerRef} className="hideScrollbar">
      <Text>
        <span className="title">{data && data.team_title}</span>
        <p>{data && splitText(data.team_subtitle)}</p>
      </Text>
      {/* Pills */}
      <PillsContainer>
        {array.map((e, i) => (
          <Pill
            onMouseEnter={() => {
              dispatch(changeColor("scaleUp"));
            }}
            onMouseLeave={() => {
              dispatch(changeColor("scaleDown"));
            }}
            key={i}
            className="no_highlights"
            onClick={(e) => {
              setDataCtx({
                clicked: "joinForm",
                contactData: {
                  ...dataCtx.contactData,
                  info_2: e.currentTarget.textContent,
                },
              });
            }}
          >
            {e.nome}
          </Pill>
        ))}
      </PillsContainer>
    </Container>
  );
}

// Style
const Container = styled.div`
  margin-top: clamp(2rem, calc(2.49rem + -2.07vw), 0rem);
  max-height: 100vh;
  overflow-y: scroll;
`;

const Text = styled.div`
  width: 90%;
  text-align: center;
  margin-inline: auto;

  span.title {
    display: block;
    color: white;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  p {
    margin-top: 1.5rem; //
    color: white;
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20}; */
    text-transform: uppercase;

    @media (min-width: 550px) {
      span {
        display: block;
      }
    }
  }
`;

// Pill container
const PillsContainer = styled.div`
  margin: clamp(3rem, calc(2.76rem + 1.04vw), 4rem) auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);

  @media (min-width: 1000px) {
    flex-direction: row;
    justify-content: center;
    width: 70%;
    flex-wrap: wrap;
    column-gap: 2rem;
  }
`;

// Pill
const Pill = styled.div`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  color: white;
  padding: clamp(1rem, calc(0.76rem + 1.04vw), 2rem)
    clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  border-radius: 999px;
  border: 1px solid #555555;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background: white;
    color: black;
  }
`;
