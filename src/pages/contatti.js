import React, { useEffect, useRef, useState, createContext } from "react";
import Logo from "@/components/utils/Logo";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import Image from "next/image";
import BackIcon from "@/components/utils/BackIcon";
import ContactFirstScreen from "@/components/ContactFirstScreen";
import ContactSecondScreen from "@/components/ContactSecondScreen";
import { useSelector, useDispatch } from "react-redux";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import { useRouter } from "next/router";
import { CustomEase, Flip } from "gsap/all";
// import ContactThankYouScreen from "@/components/ContactThankYouScreen";
import ContactForm from "@/components/ContactForm";
import { changeColor } from "../../redux/customCursorSlice";
import dataRequest from "@/utils/dataRequest";
import getStaticData from "@/utils/getStaticData";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

//! Context to pass data between screens
export const dataContext = createContext();

export default function Contatti() {
  // api dati dinamici
  const urls = [
    {
      name: "contatti",
      url: `https://www.netstrategy.it/api/contatti?populate=deep,4`,
    },
  ];

  const [response, setResponse] = useState("");
  const [staticData, setStaticData] = useState("");
  const [contatti, setContatti] = useState("");
  
  // definisco dei dati statici in attesa della chiamata API (per google)
  const crawlerData = {
    h1: 'HELLO.',
  }

  const fetchData = async () => {
    const d = await dataRequest(urls);
    const s = await getStaticData();
    setStaticData(s);
    setResponse(d);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (response && response.contatti.attributes) {
      setContatti(response.contatti.attributes);
    }
  }, [response]);

  const headingCopy = {
    title: staticData ? staticData.contact.titolo : "",
    subtitle: staticData ? "" : "",
    paragraph: staticData ? staticData.contact.paragrafo : "",
  };

  const joinCopy = {
    title: contatti ? contatti.join_us_title : "",
    subtitle: "",
    paragraph: contatti ? contatti.join_us_subtitle : "",
  };
  //! REFS
  const containerRef = useRef();
  const screenContainerRef = useRef();
  const redImageContainer = useRef();
  const redContainerRef = useRef();
  const redSpanName = useRef();
  const redSpanCounter = useRef();
  const wrapperRef = useRef();
  const redImageFullContainer = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const closeContact = useSelector(
    (state) => state.menuAndContact.value.contact.closeContact
  );
  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isContatti, setIsContatti] = useState(false);
  //! State for context to pass data between screens
  const [dataCtx, setDataCtx] = useState({
    clicked: null,
    back: null,
    contactData: {
      info_1: null,
      info_2: null,
    },
  });

  //! Show or hide back icon
  useEffect(() => {
    dataCtx.back !== null && dataCtx.back !== "back_once"
      ? gsap.to(".backIconRef", {
          scale: 1,
          duration: 0.3,
          ease: "EaseIn",
        })
      : gsap.to(".backIconRef", {
          scale: 0,
          duration: 0.3,
          ease: "EaseIn",
        });
  }, [dataCtx.back]);

  //! slide screens
  useEffect(() => {
    // console.log(dataCtx);
    dataCtx.clicked === "services" &&
      gsap.to(screenContainerRef.current, {
        x: "-100%",
        duration: 0.5,
        ease: "easeInOut",
      });
    dataCtx.clicked === "joinUs" &&
      gsap.to(screenContainerRef.current, {
        x: "-100vw",
        duration: 0.5,
        ease: "easeInOut",
      });
    dataCtx.clicked === "joinForm" &&
      gsap.to(screenContainerRef.current, {
        x: "-200vw",
        duration: 0.5,
        ease: "easeInOut",
      });
    dataCtx.back === "back_once" &&
      gsap.to(screenContainerRef.current, {
        x: "0",
        duration: 0.5,
        ease: "easeInOut",
      });
    dataCtx.back === "back_twice" &&
      gsap.to(screenContainerRef.current, {
        x: "-100vw",
        duration: 0.5,
        ease: "easeInOut",
      });

    dataCtx.clicked === "thank_you" &&
      gsap.to(screenContainerRef.current, {
        x: "-300vw",
        duration: 0.5,
        ease: "easeInOut",
      });
  }, [dataCtx.clicked, dataCtx.back]);

  //! MAIN INITIAL ANIMATION FLIP
  useEffect(() => {
    setIsContatti(document.URL.split("/").includes("contatti"));

    let contattiCtx = gsap.context(() => {
      if (window.innerWidth >= 1280) {
        // opacity image to black
        gsap.to(redImageContainer.current.firstChild, {
          opacity: 0,
          duration: 0.6,
          ease: "easeIn",
        });

        const state = Flip.getState(
          [redImageContainer.current, containerRef.current],
          { props: "borderRadius" }
        );

        gsap.to(redImageContainer.current, {
          delay: 0.6,
          duration: 0,
          display: "none",
        });
        gsap.to(containerRef.current, {
          delay: 0.6,
          duration: 0,
          display: "block",
        });

        gsap.delayedCall(0.6, () => {
          Flip.from(state, {
            duration: 1.4,
            ease: "redEase",
            scale: true,
          });
        });
      }
      // Header Y
      gsap.to(`.headerRef > *`, {
        delay: 1.2,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "redEase",
        stagger: 0.1,
        onStart: () => {
          setIsAnimating(true);
        },
        onComplete: () => {
          // Show menu
          dispatch(
            menuAndContact({
              menu: {
                ...menu,
                fade: true,
                mount: true,
                white: router.pathname === "/contatti" ? true : false,
              },
              contact: {
                ...contact,
                fade: false,
              },
            })
          );
        },
      });
    }, wrapperRef.current);
    return () => {
      setIsContatti(false);
      contattiCtx.revert();
    };
  }, []);
  
  useEffect(() => {
    const thirdScreen = document.getElementById('contatti-third-screen');
    thirdScreen.addEventListener("scroll", () => {
      if(thirdScreen.scrollTop != 0) {
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
    <div ref={wrapperRef}>

      {/*//! Red screen loader */}
      <RedContainer className="red-container" ref={redContainerRef}>
        <RedContent>
          <span ref={redSpanName}></span>
          <ImageContainer ref={redImageContainer} data-flip-id="flip-id">
            <Image
              quality={100}
              placeholder="blur"
              blurDataURL="/hello4.png"
              src="/hello4.png"
              alt="Caricamento immagine contatti"
              fill
              sizes="100%"
            />
            <Black></Black>
          </ImageContainer>
          <span ref={redSpanCounter}></span>
        </RedContent>
      </RedContainer>
      {/* //! container */}
      <Container className="contatti-container" ref={containerRef} data-flip-id="flip-id">
        {/* Icons */}
        <BackIconContainer
          onMouseEnter={() => {
            dispatch(changeColor("scaleUp"));
          }}
          onMouseLeave={() => {
            dispatch(changeColor("scaleDown"));
          }}
          className="no_highlights backIconRef"
          onClick={() => {
            dataCtx.clicked === "services" &&
              setDataCtx({
                ...dataCtx,
                back: "back_once",
              });
            dataCtx.clicked === "joinUs" &&
              setDataCtx({
                ...dataCtx,
                back: "back_once",
              });
            dataCtx.clicked === "joinForm" &&
              setDataCtx({
                ...dataCtx,
                back: "back_twice",
              });
            dataCtx.back === "back_twice" &&
              setDataCtx({
                ...dataCtx,
                back: "back_once",
              });
          }}
        >
          <BackIcon />
        </BackIconContainer>
        {/* Content */}
        {/* header */}
        <Header className="headerRef">
          <div
            style={{ zIndex: 2000 }}
            onClick={() => {
              dispatch(
                menuAndContact({
                  menu: {
                    ...menu,
                    fade: true,
                    mount: true,
                  },
                  contact: {
                    fade: true,
                    closeContact: !closeContact,
                  },
                })
              );
            }}
          >
            <Logo color="white" />
          </div>
          <span>{staticData?.hero_intestazione}</span>
        </Header>
        <Content>
          {/* Screens ----- */}
          <dataContext.Provider value={{ dataCtx, setDataCtx }}>
            <ScreenContainer ref={screenContainerRef}>
              {/* PRIMO SLIDE */}
              <ContactFirstScreen 
                data={contatti} 
                isAnimating={isAnimating} 
                staticData={staticData} 
                crawlerData={crawlerData}
              />
              {/* SECONDO SLIDE (POSIZIONE LAVORATIVE) */}
              {dataCtx.clicked !== "services" && (
                <ContactSecondScreen data={contatti} />
              )}
              {dataCtx.clicked === "joinForm" ? (
                <>
                  {/* TERZO SLIDE */}
                  {/* join form */}
                  <ContactThirdScreen className="hideScrollbar" id="contatti-third-screen">
                    <ContactForm
                      mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
                      formLayout="centered"
                      formType="file"
                      isWhite={true}
                      headingCopy={joinCopy}
                      from="contatti"
                      notH2={true}
                      // data={contatti}
                    />
                  </ContactThirdScreen>
                </>
              ) : (
                <>
                  {/* service form */}
                  <ContactThirdScreen className="hideScrollbar" id="contatti-third-screen">
                    <ContactForm
                      mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
                      formLayout="centered"
                      isWhite={true}
                      headingCopy={headingCopy}
                      from="contatti"
                      notH2={true}
                      // data={contatti}
                    />
                  </ContactThirdScreen>
                </>
              )}
              {/* <ContactThankYouScreen
                data={{
                  title: "Thank You",
                  paragraph: `simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry’s standard dummy text ever`,
                }}
              /> */}
              <></>
            </ScreenContainer>
          </dataContext.Provider>
        </Content>
      </Container>
    </div>
  );
}

//! STYLE
const Container = styled.div`
  background: ${({ theme: { colors } }) => colors.blackColorV3};
  min-height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
  display: none;
  overflow: hidden;

  @media (max-width: 1280px) {
    display: block;
  }
`;

const Content = styled.div`
  /* ${centerContent} */
  width: 100%;
  overflow: hidden;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const BackIconContainer = styled.div`
  position: absolute;
  bottom: calc(12% - 2vw);
  transform: translateY(50%);
  left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  cursor: pointer;
  width: 4.8rem;
  height: 4.8rem;
  z-index: 999;
  transform: scale(0);
  @media (max-width: 950px) {
    bottom: 50px;
    left: 5px;
    width: 60px;
    height: 60px;
    svg{
      width: 60px;
      height: 60px;
    }
  }
`;

// Header
const Header = styled.header`
  padding-inline: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  margin-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  /* height: 4.8rem; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: calc(100% - (4.8rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)));

  & > * {
    opacity: 0;
    transform: translateY(-200%);
  }

  span {
    display: none;
  }

  @media (min-width: 1280px) {
    span {
      display: inline-block;
    }
  }
`;

const ScreenContainer = styled.div`
  display: flex;
  max-width: 300%;
  align-items: center;

  & > div {
    min-width: 100vw;
  }
`;

//! red
// Red loader screen
const RedContainer = styled.div`
  background: ${({ theme: { colors } }) => colors.primaryColor};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const RedContent = styled.div`
  ${centerContent};
  height: 100svh;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  place-items: center;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  color: white;

  & > span {
    opacity: 0;
  }

  @media (min-width: 1280px) {
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr;
  }
`;

const ImageContainer = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  max-width: 30rem;
  height: 70vw;
  max-height: 23rem;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 2;
  }

  @media (min-width: 1280px) {
    width: 40vw;
    height: 28vw;
    max-width: 48rem;
    max-height: 33rem;
  }
`;

const Black = styled.div`
  background: ${({ theme: { colors } }) => colors.blackColorV3};
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
  left: 0;
`;

//! Third screen contact
const ContactThirdScreen = styled.div`
    max-height: 100dvh;
  /* max-height: 85vh; */
  overflow-y: scroll;
  /* @media (min-width: 950px) {
    max-height: 100vh;
  } */
`;

//! Footer
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  bottom: 80px;
  left: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  right: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  border-top: 1px solid #3f3f3f;
  border-bottom: 1px solid #3f3f3f;
  padding: 1rem 8rem;
  margin-top: ${(props) => (props.isSearching ? "auto" : "0")};
  background-color: ${({ theme: { colors } }) => colors.blackColorV3};
  color: ${({ theme: { colors } }) => colors.whiteColor};
  
  .box{
    display: flex;
    white-space: nowrap;
    align-items: center;
    gap: 20px;
  }
  .box-child{
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 550px) {
    margin: 0rem 12rem;
    padding: 1rem 5rem;
    flex-direction: row;
  }
`;

const Privacy = styled.div`
  position: absolute;
  left: 15px;
  bottom: 10px;
  a,
  span {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    color: ${({ theme: { colors } }) => colors.greyColor};
  }

  @media (min-width: 950px) {
    bottom: 15px;
  }

  @media (min-width: 550px) {
    & {
      border: 0px;
      padding: 0px;
    }
  }
`

