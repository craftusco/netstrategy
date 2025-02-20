import splitText from "@/utils/splitText";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { dataContext } from "@/pages/contatti";
import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";
import { useRouter } from "next/router";
import Footer from "./Footer";

gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function ContactFirstScreen({ data, isAnimating, staticData, crawlerData = {} }) {
  const [array, setArray] = useState([]);
  //! REFS
  const { dataCtx, setDataCtx } = useContext(dataContext);
  const containerRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (data && data.categorie_form) {
      const arr = data && data.categorie_form ? data.categorie_form : [];
      const obj = {
        nome: data ? data.team_cta : "",
      };
      arr.push(obj);
      setArray(arr);
    }
  }, [data]);

  //! ON LOAD ANIMATION
  useEffect(() => {
    let ContactFirstCtx = gsap.context(() => {
      // Text
      isAnimating &&
        array.length > 0 &&
        gsap.to(`.h2Ref > span`, {
          y: 0,
          duration: 1,
          ease: "redEase",
          stagger: 0.05,
        }) &&
        gsap.to(`.pRef > span`, {
          delay: 0.2,
          y: 0,
          duration: 1.5,
          ease: "redEase",
          stagger: 0.045,
        }) &&
        // Pills
        gsap.to(`.pillref`, {
          delay: 0.2,
          y: 0,
          duration: 1,
          ease: "redEase",
          stagger: 0.04,
        });
    }, containerRef.current);
    return () => ContactFirstCtx.revert();
  }, [isAnimating, array]);

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

  //! COMPONENT
  return (
    <Container ref={containerRef} className="hideScrollbar">
      <Text>
        {router.pathname == "/contatti" ? (
          // se data non è ancora presente ( perché è una chiamata api ) metto un <h1> statico per screaming frog
          <h1 className="h2Ref">
            <span>{data ? data.landing_title : crawlerData.h1}</span>
          </h1>
        ) : (
          <span className="h2Ref">
            <span>{data ? data.landing_title : ""}</span>
          </span>
        )}

        <p className="pRef">{data ? splitText(data.landing_subtitle) : ""}</p>
      </Text>
      {/* Pills */}
      <PillsContainer>
        {array.map((e, i, arr) => (
          <PillContainer key={i}>
            <Pill
              onMouseEnter={() => {
                dispatch(changeColor("scaleUp"));
              }}
              onMouseLeave={() => {
                dispatch(changeColor("scaleDown"));
              }}
              key={i}
              className="no_highlights pillref"
              onClick={(e) => {
                i === arr.length - 1
                  ? setDataCtx({
                      clicked: "joinUs",
                      contactData: {
                        info_1: e.currentTarget.textContent,
                      },
                    })
                  : setDataCtx({
                      clicked: "services",
                      contactData: {
                        info_1: e.currentTarget.textContent,
                      },
                    });
              }}
            >
              {e.nome}
            </Pill>
          </PillContainer>
        ))}
      </PillsContainer>
      <ContainerFooter>
        <div className="pillref">

          <NFooter>
            <div className="box no-mobile">
              <img width={33} height={33} src="/contatti/position.svg" alt="share"></img>
              <div>
                <div className="box-child">   
                  {
                    staticData?.footer?.indirizzi?.map((el, i) => (
                      <div key={i}>
                        {el.testo && el.testo.match(/([\s\S]+)\n\+([\s\S]+)/) && el.testo.match(/([\s\S]+)\n\+([\s\S]+)/).length > 0
                        ? el.testo.match(/([\s\S]+)\n\+([\s\S]+)/)[1]
                        : '--'}
                      </div>
                    ))
                  }
                  <noscript>
                    <div>
                      Via Carlo Cipolla snc, 37045, Legnago (VR)
                    </div>
                    <div>
                      Via San Raffaele 1, 20121, Milano (MI)
                    </div>
                  </noscript>
                </div>
              </div>
            </div>
            <a href="tel:390442321391" className="box decoration">
              <img width={33} height={33} src="/contatti/phone.svg" alt="share"></img>
              <div className="box-child">
                <div>
                  Telefono: +39 0442 321 391
                </div>
                <div>
                  Lun - ven 9:00 - 18:00
                </div>
              </div>
            </a>
            <a rel="noopener noreferrer" href="https://wa.link/oskh5c" target="_blank" className="box decoration">
            {/* <a href="https://wa.me/message/TSO5FGTUTY7DH1" target="_blank" className="box decoration"> */}
              <img width={33} height={33} src="/contatti/whatsapp.svg" alt="share"></img>
              <div className="box-child">
                <div>                
                  WhatsApp: +39 +39 328 256 20 16
                  {/* WhatsApp: +39 389 993 53 96 */}
                </div>
                <div>
                  Lun - ven 9:00 - 18:00
                </div>
              </div>
            </a>
          </NFooter>
          {/* FOOTER */}
          {/* <ContainerContFooter> */}
            <ContFooter> 
              <Footer showTitles={false} isWhite inSearchResults staticData={staticData}/>
            </ContFooter>
          {/* </ContainerContFooter> */}

        </div>
      </ContainerFooter>
    </Container>
  );
}

//! STYLE


const ContFooter = styled.div`
  display: none;
  @media (max-width: 950px) {
    position: absolute;
    left: 0;
    right: 0;
    /* height: 500px; */
    /* bottom: 0%; */
    display: block;
  }
`;


const Container = styled.div`
  margin-top: clamp(2rem, calc(2.49rem + -2.07vw), 0rem);
  max-height: 100vh;
  overflow-y: scroll;
`;

const Text = styled.div`
  text-align: center;
  width: 90%;
  margin-inline: auto;
  color: white;
  margin-top: 5rem;
  @media (min-width: 950px) {
    margin-top: 1rem;
  }

  h1 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    height: 0.91em;
    overflow: hidden;

    & > span {
      transform: translateY(100%);
      display: block;
    }
  }

  span.h2Ref {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    height: 0.91em;
    overflow: hidden;

    & > span {
      transform: translateY(100%);
      display: block;
    }
  }

  p {
    margin-top: 2rem; //
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20}; */
    text-transform: uppercase;
    overflow: hidden;

    & > span {
      transform: translateY(200%);
    }

    /* @media (min-width: 550px) { */
    span {
      display: block;
    }
    /* } */
  }
`;

// Pills container
const PillsContainer = styled.div`
  margin: clamp(3rem, calc(2.76rem + 1.04vw), 4rem) auto 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
  min-height: 300px;

  @media (min-width: 1000px) {
    margin-bottom: 5rem;
    flex-direction: row;
    justify-content: center;
    max-width: 1400px;
    padding: 0 2rem;
    flex-wrap: wrap;
    column-gap: 2rem;
    min-height: auto;
  }
`;

const ContainerFooter = styled.div`
  .pillref{
    transform: translateY(150%);
  }
`

// Pill Container
const PillContainer = styled.div`
  overflow: hidden;
  max-width: 80vw;

  :last-child > div {
    border: 0;
    background: ${({ theme: { colors } }) => colors.blackColorV2};

    &:hover {
      background: white;
      color: black;
    }
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
  transition: background 0.3s ease-in;
  cursor: pointer;

  transform: translateY(150%);

  &:hover {
    background: white;
    color: black;
  }
`;

//! NFooter
const NFooter = styled.div`


  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* position: absolute; */
  bottom: 5px;
  left: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  right: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  border-top: 1px solid #3f3f3f;
  border-bottom: 1px solid #3f3f3f;
  margin-top: ${(props) => (props.isSearching ? "auto" : "0")};
  background-color: ${({ theme: { colors } }) => colors.blackColorV3};
  color: ${({ theme: { colors } }) => colors.whiteColor};
  padding: 2rem;
  gap: 20px;

  .box{
    display: flex;
    /* white-space: nowrap; */
    align-items: center;
    gap: 20px;
    &.decoration:hover{
      text-decoration: underline;
    }
  }
  .box-child{
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 850px) {
    
    .no-mobile{
      display: none;;
    } 
    
  }

  @media (min-width: 850px) {

    margin: 0rem clamp(1rem, -15rem + 25vw, 15rem);
    padding: 1rem 5rem;
    flex-direction: row;
    padding: 1rem clamp(1rem, -9.286rem + 16.071vw, 10rem);
    gap: 0px;
  }
`;

