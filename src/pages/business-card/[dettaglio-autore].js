import Footer from "@/components/Footer";
import Logo from "@/components/utils/Logo";
import { centerContent } from "@/styles/mixins";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { menuAndContact } from "../../../redux/Menu&ContactSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { gsap } from "gsap";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import getPath from "@/utils/getPath";
import AziendeTestimonial from "@/components/AziendeTestimonial";
import Link from "next/link";
import Arrow from "@/components/utils/Arrow";
import { useRouter } from "next/router";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import Head from "next/head";

const loghi = [
  "/uploads/MFI_530b50ff0b.webp",
  "/uploads/HRC_50c6112af3.webp",
  "/uploads/THE_GLOBAL_SUMMIT_855946b539.webp",
  "/uploads/JETN_d4e5bf33c1.webp",
  "/uploads/AW_LAB_ae65fdd4f6.webp",
  "/uploads/UNITRENTO_8d37d113dd.webp",
  "/uploads/QUANTICO_BUSINESS_2df1b4dd23.webp",
];

const bio_links = [
  {
    text: "Profilo docente @ Milano Fashion Institute",
    link: "https://www.milanofashioninstitute.com/it/faculty/stefano-robbi/",
  },
  {
    text: "Profilo relatore @ Global Summit eCommerce",
    link: "https://gedsummit.it/agenda/psicologia-e-tecnica-di-conversione-nelle-commerce-esempi-concreti-di-strategie-avanzate",
  },
  {
    text: "Scopri i Successi di NetStrategy",
    link: "https://www.netstrategy.it/successi",
  },
  {
    text: "Scopri la sede e il team di NetStrategy",
    link: "https://www.netstrategy.it/chi-siamo",
  },
];

export async function getStaticPaths() {
  const response = await fetch(strapiGetDataFromQueryURL, { 
    method: 'POST',
    body: JSON.stringify({url: 'https://www.netstrategy.it/api/creators?pagination[limit]=-1&populate=deep,1&fields[0]=slug'})
  });

  const { data } = await response.json();
  const paths = data.map((autore) => {
    return {
      params: {
        "dettaglio-autore": autore.attributes.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const urls = [
    {
      name: "autore",
      url: `https://www.netstrategy.it/api/creators?populate=deep,5&filters[slug]=${params["dettaglio-autore"]}`,
    }
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  if (
    !data.autore
  ) {
    return {
      notFound: true,
    };
  }

  return { props: { data, staticData, pageName: "author" } };
}

export default function authorDetail({ data, staticData }) {
  const autore = data.autore;

  //! REFS
  const router = useRouter();
  const dispatch = useDispatch();
  const containerRef = useRef();

  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);
  //! FADE IN MENU
  useEffect(() => {
    let authorDetailCtx = gsap.context(() => {
      // Disable scroll
      document.querySelector("body").style.overflowY = "hidden";
      // Scroll to top
      window.scrollTo(0, 0);
      // logo
      gsap.to(`.logoRef`, {
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      gsap.to(`.logoRef`, {
        opacity: 1,
        delay: 1,
        duration: 1,
        ease: "easeInOut",
      });
      //left side initial reset
      gsap.to(`.leftSideRef > h1`, {
        y: "25%",
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      gsap.to(`.leftSideRef > div`, {
        y: "14%",
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      // left side
      gsap.to(`.leftSideRef > *`, {
        y: "0",
        opacity: 1,
        delay: 1,
        duration: 0.7,
        ease: "easeInOut",
      });
      // rightside reset
      gsap.to(`.rightSideRef > h3`, {
        y: "50%",
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      gsap.to(`.rightSideRef > p`, {
        y: "20%",
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      gsap.to(`.rightSideRef > .bio_links`, {
        y: "20%",
        opacity: 0,
        duration: 0,
        ease: "easeInOut",
      });
      // right side
      gsap.to(`.rightSideRef > *`, {
        y: "0",
        opacity: 1,
        delay: 1,
        duration: 0.8,
        ease: "easeInOut",
        onComplete: () => {
          document.querySelector("body").style.overflowY = "auto";
          dispatch(
            menuAndContact({
              menu: {
                ...menu,
                fade: true,
                mount: true,
              },
              contact: {
                ...contact,
                fade: true,
              },
            })
          );
        },
      });
    }, containerRef.current);
    return () => authorDetailCtx.revert();
  }, []);

  //! scroll animation
  useEffect(() => {
    let authorDetailCtx = gsap.context(() => {
      gsap.utils.toArray(".blog-list-ref > a > *").forEach((el) => {
        gsap.from(el, {
          y: "100%",
          ease: "easeInOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top-=100% bottom",
            end: "top-=100% bottom",
            scrub: 1.5,
            once: true,
          },
        });
      });
    }, ".blog-list-ref");
    return () => authorDetailCtx.revert();
  }, []);
      {}
  //! COMPONENT
  return (
    <div ref={containerRef}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      {/* Header */}
      <Header className="logoRef">
        <Logo color="black" fadeScroll />
      </Header>
      {/* Author */}
      <Author >
        <LeftSide className="leftSideRef">
          <h1>Contatti</h1>
          <ImageContainer>
            <Image
              src={getPath(autore?.immagine?.data?.attributes?.url)}
              alt={autore?.immagine?.data?.attributes?.alternativeText ? autore?.immagine?.data?.attributes?.alternativeText : `${autore.nome} ${autore.ruolo}`}
              fill
              sizes="100%"
            />
          </ImageContainer>
        </LeftSide>
        <RightSide className="rightSideRef">
          <h3>{autore.nome}</h3>
          <h3>{autore.ruolo}</h3>
          <p>{autore.descrizione}</p>
          <Social>
            <a href={autore.url_profilo_linkedin} target="_blank">
              <img src="/linkedin.svg" alt="linkedin icon link"/>
            </a>
            <a href={`mailto:${autore.email}`}>
              <img src="/mail.svg" alt="mail icon link"/>
            </a>
            {autore.phone && 
              <a  href={`tel:${autore.phone}`}>
                <img width={25} height={25} src="/contatti/b-phone.svg" alt="share"></img>
              </a>
            }
          </Social>
          {
            autore.email == 'robbi@netstrategy.it' && 
            <Links className="bio_links">
              {bio_links.map(({ link, text }, i) => (
                <Link
                  href={link}
                  target="_blank"

                  key={i}
                >
                  {/* onClick={(e) => {
                    if (link.startsWith("#")) return;
                    e.preventDefault();
                    gsap.to(window, {
                      duration: 1,
                      scrollTo: { y: "#testimonianze", offsetY: 100 },
                      ease: "Power3.easeOut",
                    });
                  }} */}
                  <Arrow color="#000" />
                  {text}
                </Link>
              ))}
            </Links>
          }
        </RightSide>
      </Author>
      {/* Loghi */}
      {router.asPath.includes('stefano-robbi') && <AziendeTestimonial
        mt="5rem"
        titolo="Docente in varie università e formatore ad eventi di livello internazionale"
        data={loghi}
        widthLogos="11.5rem" heightLogos="6rem"
      />}

      {/* Footer */}
      <Footer staticData={staticData} />
    </div>
  );
}

//! STYLE

// Header
const Header = styled.header`
  /* opacity: 1; */
  ${centerContent}
  padding-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  height: 6.8rem;
  display: flex;
  align-items: center;

  span {
    display: none;
  }
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (min-width: 1280px) {
    height: 7.5rem;
    span {
      margin-right: 100px;
      display: inline-block;
      color: black;
    }
  }
`;

// Author
const Author = styled.div`
  ${centerContent}
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    z-index: 2;
    position: relative;
  }

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: center;
    column-gap: clamp(3rem, calc(-4.94rem + 14.12vw), 12rem);
  }
`;

// Left side author
const LeftSide = styled.div`
  @media (min-width: 900px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }

  & > h1 {
    /* transform: translateY(25%); */
    opacity: 1;
  }

  & > div {
    /* transform: translateY(14%); */
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  margin-top: calc(clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem) * -1);
  /* z-index: -1; */
  width: clamp(19rem, calc(17.06rem + 8.28vw), 27rem);
  height: clamp(23rem, calc(19.84rem + 13.46vw), 36rem);
  overflow: hidden;
  display: inline-block;
  position: relative;

  img {
    border-radius: 1.5rem;
    object-fit: cover;
    /* position: relative !important; */
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 900px) {
    margin-left: clamp(0rem, calc(-13.24rem + 23.53vw), 15rem);
  }
`;



// Right side author
const RightSide = styled.div`
  width: 88%;
  place-self: end;
  margin-top: 1.5rem;

  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    /* transform: translateY(50%); */
    opacity: 1;
  }

  h3:first-child {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  p {
    margin-top: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
    /* transform: translateY(20%); */
    opacity: 1;
  }

  @media (min-width: 900px) {
    place-self: center;
    width: 45%;
    margin-top: 0;
  }
`;

const Social = styled.div`
  margin-top: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
  display: flex;
  align-items: center;
  column-gap: 1rem;

  a:first-child img {
    width: 1.25rem;
    height: 1.25rem;
  }

  a:nth-child(2) img {
    width: 2rem;
    height: 2rem;
  }

  transform: translateY(-20%);
  opacity: 0;
`;

const Links = styled.div`
  margin-top: 2rem;
  svg {
    width: 24px;
  }
  a {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }
`;
