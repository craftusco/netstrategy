import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { useForm } from "react-hook-form";
import ImageSlider from "@/components/ImageSlider";
import Divider from "@/components/Divider";
import Logo from "@/components/utils/Logo";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import getPath from "@/utils/getPath";
import Questionnaire from "@/components/Questionnaire";
import Image from "next/image";
import Specialist from "@/components/Specialist";
import LpFooter from "@/components/LpFooter";
import { useEffect, useRef, useState } from "react";
import toSlugText from "@/utils/toSlugText";
import PrimaryButton from "@/components/utils/PrimaryButton";
import LpHeader from "@/components/LpHeader";
import Footer from "@/components/Footer";
import splitText from "@/utils/splitText";
import Head from "next/head";

gsap.registerPlugin(ScrollToPlugin);

export async function getStaticProps() {
  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/landing-thank-you?populate=deep,55`,
    },
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  if (data && !data.page)
    return {
      notFound: true,
    };

  return { props: { data, staticData, pageName: "landing"  } };
}

export default function LpThankYou({ data, staticData, blackversion = false }) {
  if (!data) return <></>;

  const thankYou = data.page.attributes;
  const {
    hero_title,
    hero_subtitle,
    titolo_questionario,
    specialist_title,
    specialist,
    slider_questionario,
    slider_hero
  } = thankYou;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");

  const goToSection = (e, dest) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: dest, offsetY: 100 },
      ease: "Power3.easeOut",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    document.querySelector("body").style.overflowY = "auto";
  }, [])

  return (
    <Wrapper className="thank-you" blackversion={blackversion}>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LpHeader />
      <HeroThankYou>
        <Text blackversion={blackversion}>
          <h2>{hero_title}</h2>
          <p>{splitText(hero_subtitle)}</p>
          <a
            onClick={(e) => {
              goToSection(e, "#info");
            }}
            href="#feedback"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="107.762"
              height="124.162"
              viewBox="0 0 107.762 124.162"
            >
              <g
                id="Raggruppa_763"
                data-name="Raggruppa 763"
                transform="matrix(0.017, 1, -1, 0.017, 101.422, 2.204)"
              >
                <path
                  id="Tracciato_8"
                  data-name="Tracciato 8"
                  d="M0,0,49.154,49.154,0,98.309"
                  transform="translate(68.033 0)"
                  fill="none"
                  stroke={blackversion ? "white" : "#fc1333"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="6"
                />
                <line
                  id="Linea_23"
                  data-name="Linea 23"
                  x1="116.628"
                  transform="translate(0 48.595)"
                  fill="none"
                  stroke={blackversion ? "white" : "#fc1333"}
                  strokeLinecap="round"
                  strokeWidth="6"
                />
              </g>
            </svg>
          </a>
        </Text>
      </HeroThankYou>
      <ImageSlider
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        big
        onlyDraggable
        data={slider_hero}
      />
      <Divider mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)" />
      <section id="info">
        <SpecialistTitle>{specialist_title}</SpecialistTitle>
        <Specialist data={specialist.data?.attributes} staticData={staticData} btnIsScroll showBtn={false} />
      </section>
      <Divider mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)" />
      <FeebackWrapper id="feedback">
        <FeedbackTitle>
          <h3>{titolo_questionario}</h3>
        </FeedbackTitle>
        <Questionnaire />
      </FeebackWrapper>
      <ImageSlider
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        big
        onlyDraggable
        data={slider_questionario}
      />
      <LpFooter />
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
    props.blackversion && props.theme.colors.blackColorV2};
`;
const HeroThankYou = styled.div`
  position: relative;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding-inline: 1rem; */
  ${centerContent}
`;
const Text = styled.div`
  text-align: center;
  margin-inline: auto;
  user-select: none;
  color: ${(props) =>
    !props.blackversion ? props.theme.colors.primaryColor : "white"};

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
    /* max-width: 48rem; */
    margin: 0 auto;

    @media (min-width: 550px) {
      span {
        display: block;
        margin-bottom: 0.2rem;
      }
    }
  }

  svg {
    width: 5.75rem;
    margin-top: 2rem;
    animation: arrowDownAnimate 2s infinite ease-in-out;
    cursor: pointer;
    color: ${(props) =>
      !props.blackversion ? props.theme.colors.primaryColor : "white"};

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

const Consultente = styled.div`
  ${centerContent}
  margin-top: 10rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  & > * {
    width: 50%;
  }

  @media (max-width: 1080px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
  @media (min-width: 1081px) {
    margin-bottom: 20rem;
  }
  .text {
    .title {
      max-width: 520px;
      margin-bottom: 2rem;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_50_70};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_50_70};
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-family: ${({ theme: { fonts } }) => fonts.main};
      text-transform: uppercase;
    }
    .subtitle {
      max-width: 600px;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
    }
  }

  .image {
    position: relative;
    .img_vertical {
      margin-top: 1.5rem;
      margin-left: auto;
      border-radius: 1rem;
      overflow: hidden;
      aspect-ratio: 3 / 4;
      max-width: 450px;
      @media (max-width: 1080px) {
        max-width: initial;
        aspect-ratio: initial;
        max-height: 550px;
      }
    }

    .img_horizontal {
      margin-left: auto;
      border-radius: 1rem;
      overflow: hidden;
      aspect-ratio: 7 / 5;
      max-width: 500px;
      position: absolute;
      top: 75%;
      right: 15%;
      @media (max-width: 1080px) {
        display: none;
      }
    }
    img {
      object-fit: cover;
      position: relative !important;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
`;

const SpecialistTitle = styled.h2`
  ${centerContent}
  margin-bottom: 3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_100};
  line-height: ${({ theme: { fontSizes } }) => fontSizes.size_70_100};
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  text-transform: uppercase;
  text-align: center;
  max-width: 1000px;
`;
const FeebackWrapper = styled.div`
  ${centerContent}
  display: flex;
  & > * {
    width: 50%;
  }
  @media (max-width: 1080px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;

const FeedbackTitle = styled.div`
  h3 {
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    max-width: 500px;
    @media (max-width: 1080px) {
      display: none;
    }
  }
`;
