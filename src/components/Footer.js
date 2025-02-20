import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import RollRedLink from "./utils/RollRedLink";
import ArrowNav from "./utils/ArrowNav";
import NewsletterForm from "./NewsletterForm";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/all";
import { changeColor } from "../../redux/customCursorSlice";
import { useDispatch, useSelector } from "react-redux";
import StaticImages from "./StaticImages";
import getPath from "@/utils/getPath";
import moment from "moment";
import mapImages from "./utils/mapImages";
import FooterDinamicImages from "./FooterDinamicImages";
import { useRouter } from "next/router";
// import { updateRoutes } from "../../redux/routesSlice";

gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

let initLinks = [
  {
    object: "relation_culture",
    name: "Agenzia.",
    link: '/chi-siamo',
  },
  {
    object: "relation_case_study",
    name: "Successi.",
    link: '/successi',
  },
  {
    object: "relation_contatti",
    name: "Contatti.",
    link: '/contatti',
  },
  {
    object: "relation_nettalk",
    name: "Eventi.",
    link: '/nettalk',
  },
  {
    name: "Newsletter.",
  },
];

export default function Footer({
  staticData = null,
  isWhite = false,
  inSearchResults = false,
  showTitles = true,
  minimal = false,
  forLanding = false
}) {
  const foot = useSelector((state) => state.footerDataSlice.value);
  const [menu, setMenu] = useState(null);
  const [links, setLinks] = useState(initLinks);
  const router = useRouter();

  useEffect(() => {
    if (foot.menu) setMenu(foot.menu);

  }, [foot]);
  

  useEffect(() => {
    if (menu) {
      
      const pLinks = initLinks.map((element) => {
        if (Object.hasOwnProperty.call(element, "object")) {
          let start = menu[element.object].nome.charAt(0);

          const img =
            element.object == "relation_contatti"
              ? "/hello4.png"
              : getPath(
                  menu[element.object].relation.data.attributes?.hero?.immagine
                    ?.data?.attributes?.url
                );
          return {
            link: `/${menu[element.object].relation.data.attributes.slug}`,
            name: `${start.toUpperCase()}${menu[element.object].nome.slice(
              1
            )}.`,
            img,
          };
        }
        return {
          ...element,
        };
      });
      setLinks(pLinks);
    }
    
  }, [menu]);

  const fData = {
    copyright_iva: staticData?.footer?.copyright_iva,
    indirizzi: staticData?.footer?.indirizzi,
    claim: staticData?.footer?.claim,
    certificazioni: mapImages(staticData?.footer?.certificazioni),
  };
  //! REFS
  const news = useRef();
  const [isNewsOpen, setIsNewOpen] = useState(false);
  const dispatch = useDispatch();

  //! ON CLICK NEWSLETTER
  useEffect(() => {
    isNewsOpen
      ? gsap.to(news.current, {
          height: "auto",
          duration: 0.65,
          ease: "easeInOut",
        })
      : gsap.to(news.current, {
          height: "0",
          duration: 0.65,
          ease: "easeInOut",
        });
  }, [isNewsOpen]);

  //! Track window Width && set static data
  const [windowWidth, setWindowWidth] = useState(null);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    
    const regex = /#(.+)/; // Il punto indica qualsiasi carattere e il + indica uno o più caratteri dopo il cancelletto
    const match = router.asPath.match(regex);
    if(match && match.length > 0 && match[1] == 'newsletter'){
      setIsNewOpen(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerRef = useRef();

  // useEffect(() => {
  //   let FooterCtx = gsap.context(() => {
  //     gsap.from(".linksRef > div", {
  //       y: "50%",
  //       ease: "easeInOut",
  //       stagger: 0.2,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "0 bottom-=20%",
  //         end: "0 center+=15%",
  //         scrub: 1,
  //       },
  //     });
  //     gsap.from(".infoRef > div", {
  //       y: "50%",
  //       ease: "easeInOut",
  //       stagger: 0.2,
  //       duration: 1,
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "0 bottom-=20%",
  //         end: "0 center+=15%",
  //         scrub: 1,
  //       },
  //     });
  //   }, containerRef.current);
  //   return () => FooterCtx.revert();
  // });

  const [isMounted, setIsMounted] = useState(true);

    //! UNMOUNT WHEN ROUTE CHANGE
    // useEffect(() => {
    //     console.log('desmount', isMounted)
    //   setIsMounted(false)
    // }, [router]);

  // //! UNMOUNT WHEN ROUTE CHANGE
  useEffect(() => {
    const handleRouteChanged = () => {
        setIsMounted(true);
    };

    const handleRouteChangeStart = ()=>{
        setIsMounted(false);
    }

    router.events.on("routeChangeComplete", handleRouteChanged);
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.on('routeChangeStart', handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);

  //! COMPONENT

  return (
    <Container showTitles={showTitles} white={isWhite} ref={containerRef}>
      {/*//! Claim desktop */}
      {(!minimal && showTitles === true && forLanding === false) && (
        <ClaimDesktop>
          <span>{fData.claim}</span>
          <ArrowNav inSearchResults={inSearchResults} />
        </ClaimDesktop>
      )}
      {/*//! Links */}
      {(!minimal && showTitles === true && forLanding === false)&& (
        <LinksContainer>
          <ClaimMobile>{splitText(fData.claim)}</ClaimMobile>
          <Links className="linksRef">
            {links.map(({ name, link, img }, i) =>
              name === "Newsletter." ? (
                <div
                  onClick={() => setIsNewOpen(!isNewsOpen)}
                  onMouseEnter={() => {
                    dispatch(changeColor("scaleUp"));
                  }}
                  onMouseLeave={() => {
                    dispatch(changeColor("scaleDown"));
                  }}
                  key={i}
                >
                  <RollRedLink 
                    name={name} 
                    href={link} />
                </div>
              ) : (
                <div
                  onMouseEnter={() => {
                    dispatch(changeColor("scaleUp"));
                  }}
                  onMouseLeave={() => {
                    dispatch(changeColor("scaleDown"));
                  }}
                  key={i}
                >
                  <RollRedLink
                    img={img}
                    name={name}
                    key={i}
                    href={getPath(link, true)}
                    onMouseEnter={() => {
                      dispatch(changeColor("black&scaleUp"));
                      dispatch(changeColor("transparent"));
                    }}
                    onMouseLeave={() => {
                      dispatch(changeColor("primary&scaleDown"));
                      dispatch(changeColor("primary"));
                    }}
                  />
                </div>
              )
            )}
          </Links>
          {/*//! Newsletter */}
          <Newsletter  ref={news}>
            <NewsletterForm white={isWhite} />
          </Newsletter>
        </LinksContainer>
      )}
      {/*//! Info */}
      <Info showTitles={showTitles} className="infoRef" minimal={minimal}>
        <div>
          <span>©{moment().format("YYYY")}</span>
          <span>{splitText(fData.copyright_iva)}</span>
        </div>
        {fData.indirizzi?.map((el, i) => (
          <div key={i}>{splitText(el.testo)}</div>
        ))}
        <div>
          {staticData?.terms?.map((el, i, arr) => (
            <div key={i}>
              {el.link !== " " ? (
                <a href={el.link} target="_blank" rel="noopener">
                  {el.testo}
                </a>
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  className="iubenda-cs-preferences-link"
                >
                  Preferenze sui cookies
                </span>
              )}
            </div>
          ))}
          {windowWidth <= 1055 && (
            <div>
              <span>{fData.copyright_iva}</span>
              <span>©{moment().format("YYYY")}</span>
            </div>
          )}
        </div>
        {(!minimal && forLanding === false) && (
          <div>
            {staticData?.social?.map(({ testo, link }, i, arr) => (
              <React.Fragment key={i}>
                <a href={link} target="_blank" rel="noopener">
                  {testo}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
      </Info>
      {/*//! Certifications */}
      {!minimal && forLanding === false && (
        <div
          style={{
            padding: "clamp(4.00rem, calc(4.39rem + -1.93vw), 2.00rem) 0px",
          }}
        >
          {(windowWidth <= 1280 && isMounted) && (
            <FooterDinamicImages
              imgs={fData.certificazioni}
              dinamicDesktop={false}
              imgsWhite={isWhite}
              mt="0rem"
            />
          )}
          {(windowWidth > 1280) && (
            <StaticImages imgs={fData.certificazioni} imgsWhite={isWhite} />
          )}
        </div>
      )}
      {
        (forLanding === true) &&
          <div style={{margin: '50px 0px'}}></div>
      }
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => (props.showTitles ? "clamp(2rem, calc(0.06rem + 8.28vw), 10rem)" : "0px")} ;
  color: ${(props) => (props.white ? "white" : "black")};

  span {
    display: block;
  }
`;

const ClaimDesktop = styled.div`
  span {
    display: none;
  }

  padding-bottom: 2rem;
  position: relative;

  @media (min-width: 1056px) {
    span {
      display: block;
    }
  }
  @media (max-width: 650px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  border-top: 1px solid;

  @media (max-width: 1055px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
  }
`;

const Newsletter = styled.div`
  overflow: hidden;
  padding-bottom: 2rem;
  margin-top: -2rem;

  @media (max-width: 1055px) {
    grid-column: span 2;
  }
`;

const ClaimMobile = styled.div`
  display: none;

  @media (max-width: 1055px) {
    display: block;
    padding-block: 2rem;
  }
`;

const Links = styled.div`
  padding-block: 2rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  *:last-child {
    grid-column: -2;
  }

  a,
  span {
    display: block;
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1055px) {
    display: block;
  }

  @media (max-width: 400px) {
    font-size: 1.6rem;
  }
`;

const Info = styled.div`
  border-top:  ${(props) => (props.showTitles ? "1px solid" : "none")};
  /* border-top: 1px solid; */
  padding-top: 2rem;
  display: grid;
  grid-template-columns: ${({ minimal }) => minimal ? "repeat(4, 1fr)" : "repeat(6, 1fr)" };
  line-height: 1.5rem;
  position: relative;

  & div {
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }

  div:nth-child(4) {
    span {
      cursor: pointer;
    }
  }

  *:last-child {
    grid-column: -2;
  }

  @media (max-width: 1300px) {
    grid-template-columns: ${({ minimal }) => minimal ? "repeat(4, 1fr)" : "repeat(5, 1fr)" };
  }

  @media (max-width: 1055px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 1.5rem;
    column-gap: 1rem;

    div:first-child {
      display: none;
    }
  }
`;
