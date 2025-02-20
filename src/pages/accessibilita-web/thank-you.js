import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import Footer from "@/components/Footer";
import Logo from "@/components/utils/Logo";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NewsletterForm from "@/components/NewsletterForm";

gsap.registerPlugin(ScrollToPlugin);

//! GET DATA WITH NEXT JS METHODS
export async function getStaticProps(context) {
  //! BLACK VERSION
  // const { query } = context;
  // const { v } = query;
  // const blackVersion = v === "2";
  
  const blackVersion = false;

  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/thank-you-page?populate=deep,5`,
    },
    {
      name: "projects",
      url: `https://www.netstrategy.it/api/project-details?populate=deep,5&filters[show_slider]=true`,
      transform: false,
    },
    {
      name: "categorie",
      url: `https://www.netstrategy.it/api/custom-categories`,
      transform: false,
    },
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  if (data && !data.page)
    return {
      notFound: true,
    };

  return await { props: { data, staticData, blackVersion } };
}

//! COMPONENT
export default function ContactFormThankYou({
  data,
  staticData,
  blackVersion,
}) {
  //! REFS
  const thankYou = data.page.attributes;
  const formData = useSelector((state) => state.formSlice.value.data);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const heroThankYouRef = useRef();
  const formNewsletter = useRef();

  const goToSection = (e, dest) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: {y: dest, offsetY: 100}, ease: "Power3.easeOut" });
  };

  //! SHOW MENU ICON AND ALLOW SCROLL
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("body").style.overflowY = "auto";
    }, 2000);
    //! ANIMATION
    gsap.to(heroThankYouRef.current, {
      bottom: 0,
      duration: 1,
      ease: "easeIn",
    });
    gsap.to(formNewsletter.current, {
      bottom: 0,
      duration: 1,
      ease: "easeIn",
    });
  }, []);

  //! JSX
  return (
    <Wrapper className="thank-you" blackVersion={false}>
      <Head>
        <title>Thank you!</title>
        <meta name="robots" content="noindex,nofollow"></meta>
      </Head>
      <Header>
        <Logo color={blackVersion ? "white" : "black"} fadeScroll />
      </Header>
      <HeroThankYou ref={heroThankYouRef}>
        <Text blackVersion={false}>
          <h2>Thank you!</h2>
          <p>La nostra guida gratuita sull’accessibilità dei siti web sta per arrivare nella tua casella email.</p>
          <br></br>
          <p style={{fontSize: '25px', lineHeight: '1.2', marginTop: '20px', color: '#000000'}}>Se desideri ricevere altri aggiornamenti o approfondimenti, iscriviti alla nostra newsletter.<br></br>Ti terremo sempre informato!</p>
        </Text>
      </HeroThankYou>
      <div ref={formNewsletter} style={{width: '100%', maxWidth: '1500px', margin: 'auto', position: 'relative', bottom: '-100vh', padding: '0px 20px'}}>
        <NewsletterForm white={false} />
      </div>
      <Footer isWhite={false} staticData={staticData} forLanding={true}/>
    </Wrapper>
  );
}

// const Container = styled.div`
//   margin-top: ${(props) => props.mt};
//   ${centerContent}
//   color: ${(props) => (props.white ? "white" : "black")};
// `;

//! STYLE
const Wrapper = styled.div`
  background: ${(props) =>
    props.blackVersion && props.theme.colors.blackColorV2};
`;

const Header = styled.header`
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

const HeroThankYou = styled.div`
  position: relative;
  bottom: -100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;

  @media screen and (max-width: 767px) {
    p {
      font-size: 17px !important;
    }
  }
`;
const Text = styled.div`
  text-align: center;
  margin-inline: auto;
  user-select: none;
  color: ${(props) =>
    !props.blackVersion ? props.theme.colors.primaryColor : "white"};

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  p {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
    max-width: 48rem;
    margin: 0 auto;

    @media (min-width: 550px) {
      span {
        display: block;
      }
    }
  }

  svg {
    width: 5.75rem;
    margin-top: 2rem;
    animation: arrowDownAnimate 2s infinite ease-in-out;
    cursor: pointer;
    color: ${(props) =>
      !props.blackVersion ? props.theme.colors.primaryColor : "white"};

    @media (max-width: 350px) {
      width: 2.75rem;
    }
  }

  @keyframes arrowDownAnimate {
    20% {
      transform: translateY(15px);
    }
    40% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(8px);
    }
    80% {
      transform: translateY(0px);
    }
  }
`;
const Container = styled.div`
  ${centerContent}
`;
const PageHeading = styled.div`
  display: flex;
  @media (max-width: 875px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  color: ${(props) =>
    !props.blackVersion ? props.theme.colors.primaryColor : "white"};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;


  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    max-width: 50rem;
  }

  svg {
    width: 5.75rem;
    margin-top: 2rem;
    animation: arrowDownAnimate 2s infinite ease-in-out;
    cursor: pointer;
    @media (max-width: 875px) {
      display: none;
    }
  }
`;
const Image = styled.div`
  .image-wrapper {
    max-height: 30rem;
    border-radius: 20px;
    aspect-ratio: 6 / 4;
    overflow: hidden;
    position: relative;
    bottom: -25%;
    right: 22%;
    @media (max-width: 875px) {
      max-height: 20rem;
      top: -60px;
      right: initial;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const FeebackWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const ImageWrapper = styled.div`
  width: 50%;
  @media (max-width: 875px) {
    width: 40%;
  }
  @media (max-width: 1200px) {
    display: none;
  }

  div.img {
    border-radius: 20px;
    max-height: 50rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const PostCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 6rem 0;
`;
const PostCard = styled.div`
  border: 4px solid ${({ theme: { colors } }) => colors.primaryColor};
  color: ${(props) =>
    !props.blackVersion ? props.theme.colors.primaryColor : "white"};
  max-width: 60rem;
  @media (max-width: 60rem) {
    border-inline: none;
  }
  padding: 4rem 5rem 3rem 5rem;
  @media (max-width: 600px) {
    padding: 3rem 4rem 2rem 4rem;
  }
  display: flex;
  flex-direction: column;

  h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
    font-weight: 100;
    width: 70%;
    margin-right: auto;
    margin-bottom: 2rem;
    @media (max-width: 500px) {
      margin-right: 0;
      width: 100%;
    }

    span {
      display: block;
    }
  }
  p {
    width: 70%;
    margin-left: auto;
    color: ${(props) =>
    !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
    @media (max-width: 500px) {
      margin-right: 0;
      width: 100%;
    }
  }
`;
