import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "./utils/MenuIcon";
import Logo from "./utils/Logo";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import CloseIcon from "./utils/CloseIcon";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/all";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import RedSidebarMenu from "./RedSidebarMenu";
import LensIcon from "./utils/LensIcon";
import MenuNav from "./utils/MenuNav";
import SearchResultsList from "./SearchResultsList";
import Divider from "./Divider";
import ContactForm from "./ContactForm";
// import { LenisProvider, LenisElement } from "@studio-freight/react-lenis";
import { changeColor } from "../../redux/customCursorSlice";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import { updatePagination } from "../../redux/paginationMenuSlice";
import getStaticData from "@/utils/getStaticData";
import { updateStaticData } from "../../redux/staticDataSlice";
import { updateFooterData } from "../../redux/footerDataSlice";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";

gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function Menu({ data, links, pillars }) {
  const router = useRouter();
  if(router.asPath.split("/").includes('landing-nuove') || router.asPath.split("/").includes('eventi')) {
    return (<></>)
  }

  //! REFS ---
  const [openMenu, setOpenMenu] = useState('never');
  const containerRef = useRef();
  const [isMenuAnimating, setIsMenuAnimating] = useState(true);
  const menuIconRef = useRef();
  const closeMenuIconRef = useRef();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const closeMenu = useSelector(
    (state) => state.menuAndContact.value.menu.closeMenu
  );
  const [articles, setArticles] = useState([]);
  const [time, setTime] = useState([]);

  // REDUX STATES
  const paginated = useSelector((state) => state.paginationMenuSlice.value);
  const staticData = useSelector((state) => state.staticDataSlice.value);
  const isWhite = useSelector((state) => state.menuAndContact.value.menu.white);
  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  useEffect(()=>{
    if(openMenu === true){
      document.querySelector('body').style.overflow = 'hidden'
    }else if(openMenu === false ){
      document.querySelector('body').style.overflow = 'auto'
    }
  }, [openMenu])



  //! CLOSE MENU IF LOGO IS CLICKED IN HOME ---
  useEffect(() => {
    router.pathname === "/" && setOpenMenu(false);
  }, [closeMenu]);

  //! FADE IN/OUT & UNMOUNT ---
  const fadeState = useSelector(
    (state) => state.menuAndContact.value.menu.fade
  );

  useEffect(() => {
    setIsSidebarOpen(false);

    fadeState && setIsMounted(true);

    fadeState
    ? gsap.to(containerRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "easeIn",
      })
    : gsap.set(containerRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });

  }, [fadeState, isMounted]);

  //! EXPAND MENU ---
  useEffect(() => {
    setIsMenuAnimating(false);

    if (openMenu === true) {
      // ZIndex
      gsap.set(containerRef.current, {
        zIndex: 3000,
      });
      // Expand black container
      gsap.to(containerRef.current, {
        "--clip": `200% at calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem))) calc(clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem)`,
        duration: 1.2,
        ease: "easeInOut",
      });
      // Hide menu icon & show close icon
      gsap.to(menuIconRef.current, {
        scale: 0,
        duration: 0.3,
        ease: "EaseIn",
      });
      gsap.to(closeMenuIconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "EaseIn",
        onComplete: () => {
          setTimeout(() => {
            setIsMenuAnimating(true);
          }, 500);
        },
      });
    } else {
      // Close black container
      gsap.to(containerRef.current, {
        "--clip": `2.4rem at calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem))) calc(clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem)`,
        duration: 0.8,
        ease: "easeIn",
      });
      // Hide close icon & show menu icon
      gsap.to(closeMenuIconRef.current, {
        scale: 0,
        duration: 0.3,
        ease: "EaseIn",
      });
      gsap.to(menuIconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "EaseIn",
        onComplete: () => {
          // ZIndex
          gsap.to(containerRef.current, {
            zIndex: -1,
          });
          setTimeout(() => {
            setIsMenuAnimating(true);
          }, 500);
        },
      });
    }
  }, [openMenu]);

  useEffect(() => {
    if (data) {
      dispatch(updateFooterData({ menu: data }));
    }
  }, [data]);

  //! IS SEARCHING ---
  const [searchValue, setSearchValue] = useState({
    isSearching: false,
    value: "",
  });

  //! UNMOUNT WHEN ROUTE CHANGE
  useEffect(() => {
    const handleRouteChanged = () => {
      setIsMounted(false);
      dispatch(
        menuAndContact({
          menu: {
            ...menu,
            fade: false,
            mount: false,
          },
          contact: {
            ...contact,
            fade: false,
          },
        })
      );
      setOpenMenu('never');
    };

    router.events.on("routeChangeComplete", handleRouteChanged);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChanged);
    };
  }, [router]);

  // SETTO STATIC DATA A REDUX
  const setStaticData = async () => {
    const s = await getStaticData();
    dispatch(updateStaticData(s));
    dispatch(updateFooterData({ static_data: s }));
  };

  useEffect(() => {
    if (!staticData) {
      setStaticData();
    }
  }, []);

  // FILTRO ARTICOLI + PAGINAZIONE
  const filterArticles = async (q) => {
    const query = `https://www.netstrategy.it/api/journal-details?filters[$or][0][slug][$contains]=${q}&filters[$or][1][titolo][$contains]=${q}&filters[$or][2][categoria][slug][$contains]=${q}&filters[$or][3][categoria][hero][nome][$contains]=${q}&filters[$or][4][utente][nome][$contains]=${q}&populate=deep,4&sort[0]=titolo%3Aasc&pagination[pageSize]=${paginated.pagination}`;
    const response = await fetch(strapiGetDataFromQueryURL, { 
      method: 'POST',
      body: JSON.stringify({url: query})
    });
    const art = await response.json();
    dispatch(updatePagination({ total: art.meta.pagination.total }));
    setArticles(art.data);
  };

  const search = async (e) => {
    dispatch(updatePagination({ pagination: paginated.entry_value }));
    clearInterval(time);
    setSearchValue({
      value: e.target.value,
      isSearching: searchValue.isSearching,
    });

    setTime(
      setTimeout(async () => {
        await filterArticles(e.target.value).then(() => {
          setSearchValue({
            isSearching: e.target.value !== "" ? true : false,
            value: e.target.value,
          });
        });
      }, 300)
    );
  };

  useEffect(() => {
    if (paginated.pagination != paginated.entry_value) {
      filterArticles(searchValue.value);
    }
  }, [paginated.pagination]);

  //! COMPONENT ---
  return (
    // <>
    //     {isMounted && (
    <>
    {isMounted && (

      <MenuIconContainer
        ref={menuIconRef}
        className="no_highlights"
        onClick={() => {
          isMenuAnimating && setOpenMenu(true);
        }}
        onMouseEnter={() => dispatch(changeColor("scaleUp"))}
        onMouseLeave={() => dispatch(changeColor("scaleDown"))}
      >
        <MenuIcon isWhite={isWhite} />
      </MenuIconContainer>
    )}
        
        <Container ref={containerRef} className="menuContainerRef hideScrollbar">
          {/* Icons */}
          <CloseIconContainer
            ref={closeMenuIconRef}
            onMouseEnter={() => dispatch(changeColor("scaleUp"))}
            onMouseLeave={() => dispatch(changeColor("scaleDown"))}
            className="no_highlights"
            onClick={() => {
              isMenuAnimating && setOpenMenu(false);
              setSearchValue({
                isSearching: false,
                value: "",
              });
            }}
          >
            <CloseIcon />
          </CloseIconContainer>
          {/*//! Content */}
          <ContentWrapper>
            <Content isSearching={searchValue.isSearching}>
              {/*//! Header */}
              <Header>
                <LogoContainer
                  onClick={() => {
                    dispatch(
                      menuAndContact({
                        menu: {
                          ...menu,
                          closeMenu: !closeMenu,
                        },
                        contact: {
                          ...contact,
                        },
                      })
                    );
                  }}
                >
                  <Logo color="white" />
                </LogoContainer>
                <span className="spanRef">{data?.sottotitolo}</span>
                <SearchBar>
                  {searchValue.value ? (
                    <Cross
                      onClick={() => {
                        setSearchValue({
                          isSearching: false,
                          value: "",
                        }),
                          dispatch(updatePagination({ total: 0 }));
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Cross>
                  ) : (
                    <LensIcon />
                  )}
                  <input
                    type="text"
                    placeholder="Cerca nel sito"
                    value={searchValue.value}
                    onChange={(e) => search(e)}
                  />
                </SearchBar>
                <span>{staticData?.hero_intestazione}</span>
              </Header>
              {/*//! Nav */}
              {!searchValue.isSearching ? (
                // isMounted && (
                  <MenuNav
                    data={links}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                // )
              ) : (
                <SearchResultsList
                  articles={articles}
                  value={searchValue.value}
                />
              )}
              {/*//! Footer */}
              {/* {!searchValue.isSearching && (
                <FooterMenu
                  className="footerRef"
                  isSearching={searchValue.isSearching}
                >
                  <span>©{moment().format("YYYY")}</span>
                  <div className="socials">
                    {staticData?.social?.map(({ testo, link }, i, arr) => (
                      <React.Fragment key={i}>
                        <a href={link} target="_blank">
                          {testo}
                        </a>
                        {i < arr.length - 1 && <span> — </span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="preferenze">
                    {staticData?.terms?.map((el, i, arr) => (
                      <div key={i}>
                        {el.link !== " " ? (
                          <a href={el.link} target="_blank">
                            {el.testo}
                          </a>
                        ) : (
                          <span style={{cursor: 'pointer'}} className='iubenda-cs-preferences-link'>  
                            {el.testo}
                          </span>
                        )}
                        {i < arr.length - 1 && <span> — </span>}
                      </div>
                    ))}
                  </div>
                </FooterMenu>
              )} */}
            </Content>
            {/*//! Red sidebar */}
            <RedSidebarMenu
              data={data}
              pillars={pillars}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </ContentWrapper>
          {/*//! Form & Footer */}
          {searchValue.isSearching && (
            <React.Fragment>
              <Divider mt="3rem" isWhite />
              <ContactForm
                mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
                isWhite
              />
              {/* <Footer isWhite inSearchResults staticData={staticData}/> */}
            </React.Fragment>
          )}
        </Container>
    </>
    // )}
    // </>
  );
}

const ContentWrapper = styled.div`
  position: relative;
`;

//! STYLE ---
const Container = styled.div`
  opacity: 0;
  pointer-events: none;
  background: ${({ theme: { colors } }) => colors.blackColorV2};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: -1;
  --clip: 2.4rem at
    calc(100% - (2.4rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)))
    calc(clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) + 2.4rem);
  clip-path: circle(var(--clip));
`;

const MenuIconContainer = styled.div`
  position: fixed;
  top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem);
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  width: 4.8rem;
  height: 4.8rem;
  z-index: 3000;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
`;

const CloseIconContainer = styled.div`
  position: fixed;
  top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem);
  right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  width: 4.8rem;
  height: 4.8rem;
  z-index: 999;
  scale: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
`;

const Content = styled.div`
  ${centerContent}
  padding-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  padding-bottom: 2.5rem;
  min-height: ${(props) => (props.isSearching ? "initial" : "100svh")};
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  position: relative;
`;

const Header = styled.header`
  height: 4.8rem;
  width: calc(100% - (4.8rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)));
  align-items: center;
  color: #ffffff;
  font-size: 1rem;
  justify-content: space-between;

  @media (min-width: 758px) {
    display: flex;
  }

  & span:nth-child(2) {
    width: 25%;
    display: none;

    @media (min-width: 1280px) {
      display: inline-block;
    }
  }

  & span:nth-child(4) {
    display: none;

    @media (min-width: 1280px) {
      display: inline-block;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 20rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid white;
  position: relative;

  input {
    width: 100%;
    outline: none;
    background: transparent;
    font-size: 1rem;
    border: 0;
    color: ${({ theme: { colors } }) => colors.primaryColor};

    text-align: right;

    &::placeholder {
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      color: white;
      opacity: 0.5;
    }
  }
`;

const Cross = styled.div`
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }
`;

const LogoContainer = styled.div`
  svg {
    fill: white;
  }
`;

const FooterMenu = styled.div`
  border-top: 1px solid #3f3f3f;
  padding-top: 2rem;
  margin-top: ${(props) => (props.isSearching ? "auto" : "0")};

  a,
  span {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    color: ${({ theme: { colors } }) => colors.greyColor};
  }

  a:hover,
  span.spanLink:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .preferenze {
    display: flex;
    @media (max-width: 450px) {
      flex-direction: column;
    }
  }

  @media (min-width: 800px) {
    display: flex;
    justify-content: space-between;
    border: 0;
    padding: 0;
    align-items: center;
    padding-top: 0.75rem;
  }
`;
