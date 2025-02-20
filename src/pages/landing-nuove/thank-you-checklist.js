import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import PrimaryButton from "@/components/utils/PrimaryButton";
import LpHeader from "@/components/LpHeader";
import Head from "next/head";

gsap.registerPlugin(ScrollToPlugin);

export default function LpThankYou({ data, staticData, blackversion = false }) {
  return (
    <Wrapper className="thank-you" blackversion={blackversion}>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <LpHeader />
      <HeroThankYou>
        <Text blackversion={blackversion}>
          <h2>Thank You!</h2>
          <p>Qui troverai la checklist di 32 domande per scoprire chi è il tuo cliente ideale:</p>
          <div onClick={() => {
            document.getElementById('guida_buyer_persona').click();
          }}>
            <PrimaryButton>Scarica il contenuto</PrimaryButton>
          </div>
          <a style={{display: "none"}} id="guida_buyer_persona" href="/media/contenuti_premium/guida_all_identificazione_del_proprio_buyer_persona.pdf" download="Guida all'identificazione del proprio Buyer Persona.pdf"></a>
        </Text>
      </HeroThankYou>
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
    max-width: 60rem;
    margin: 0 auto;
    margin-bottom: 5rem;

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
