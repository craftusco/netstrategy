import Cards from "@/components/Cards";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import Goals from "@/components/Goals";
import Heading from "@/components/Heading";
import HeroPages from "@/components/HeroPages";
import ImageSlider from "@/components/ImageSlider";
import TeamSlider from "@/components/TeamSlider";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import StaticTitle from "@/components/utils/StaticTitle";
import { useState, useEffect } from "react";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import DinamicDesktopImages from "@/components/DinamicImages";
import AziendeTestimonial from "@/components/AziendeTestimonial";
import ImpegnoSociale from "@/components/ImpegnoSociale";
import Head from "next/head";
import { useRouter } from "next/router";
import PushStructureData from "@/components/PushStructureData";

const loghiDocenze = [
  "/uploads/MFI_530b50ff0b.webp",
  "/uploads/HRC_50c6112af3.webp",
  "/uploads/THE_GLOBAL_SUMMIT_855946b539.webp",
  "/uploads/JETN_d4e5bf33c1.webp",
  "/uploads/AW_LAB_ae65fdd4f6.webp",
  "/uploads/UNITRENTO_8d37d113dd.webp",
  "/uploads/QUANTICO_BUSINESS_2df1b4dd23.webp",
];

const loghiEditoriali = [
  "/uploads/skymedia_b04d018d2f.webp",
  "/uploads/ansa_fb7d27406c.webp",
  "/uploads/apindustria_799e5711b2.webp",
  "/uploads/sole24ore_6f4e3f541f.webp",
  "/uploads/classeditori_ed8a47c5bc.webp",
  "/uploads/cameradicommercio_18c9c8ea5a.webp",
];

export async function getStaticProps() {
  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/culture?populate[hero][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[hero][populate][immagine_mobile][fields][0]=url,alternativeText,name,ext&populate[intro_media][populate][immagini][fields][0]=url,alternativeText,name,ext&populate[intro_media][populate][labels][populate][0]=*&populate[team][populate][creators][populate][0]=*&populate[team][populate][creators][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[team][populate][heading][populate][0]=*&populate[header_method][populare][0]=*&populate[header_experience][populare][0]=*&populate[header_servizi][populare][0]=*&populate[divisore][populare][0]=*&populate[media_method][populate][immagini][fields][0]=url,alternativeText,name,ext&populate[media_method][populate][labels][populate][0]=*&populate[services_media][populate][immagini][fields][0]=url,alternativeText,name,ext&populate[services_media][populate][labels][populate][0]=*&populate[intro][populate][0]=*&populate[content_experience][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[content_experience][populate][obbiettivi][populate][0]=icona&populate[content_experience][populate][loghi_aziende][populate][0]=*`,
    },
    {
      name: "projects",
      url: `https://www.netstrategy.it/api/project-details?populate[thumbnail_success][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[thumbnail_success][populate][immagine_mobile][fields][1]=url,alternativeText,name,ext&populate[categorie][populate][0]=*&filters[show_slider]=true`,
    },
    {
      name: "categorie",
      url: `https://www.netstrategy.it/api/custom-categories`,
      transform: false,
    },
    {
      name: "testimonials",
      url: "https://www.netstrategy.it/api/testimonials?populate=deep,5&sort=updatedAt:desc",
    },
  ];
  const staticData = await getStaticData();
  const data = await dataRequest(urls);
  return await { props: { data, staticData } };
}

export default function Culture({ data, staticData }) {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function testimonialsSplitText(string) {
    const newArr = [];
    string?.split(" ")?.forEach((el, idx, arr) => {
      if (idx == 0) {
        newArr.push(<span key={idx}>{el}</span>);
      } else if (idx == 1) {
        newArr.push(<span key={idx}>{el + " " + arr[arr.length - 1]}</span>);
      }
    });
    return newArr;
  }

  const culture = data.page.attributes;
  const divider = culture.divisore
    ? [
        culture.divisore.sinistra,
        culture.divisore.centro,
        culture.divisore.destra,
      ]
    : ["building", "future", "togheter"];

  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: staticData.contact.sottotitolo,
    paragraph: staticData.contact.paragrafo,
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} />
      </Head>
      <div>
        <HeroPages data={culture.hero} staticData={staticData}>
          <StaticTitle
            pretitle={
              culture.hero?.pretitle ? culture.hero?.pretitle : staticData.hero
            }
            title={culture.hero.nome}
          />
        </HeroPages>
        {/* Section */}
        <Divider words={divider} mt="4rem" />
        <Heading data={culture.intro} />
        {windowWidth > 820 ? (
          <ImageSlider
            data={culture.intro_media.immagini}
            mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
            big
          />
        ) : (
          <Cards
            data={culture.intro_media.immagini.data}
            mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
          ></Cards>
        )}
        <AziendeTestimonial
          mt="5rem"
          titolo="Collaborazioni editoriali"
          data={loghiEditoriali}
          widthLogos="11.5rem"
          heightLogos="6rem"
        />
        {/* Team slider */}
        <Divider words={divider} />
        <Heading
          data={culture.team.heading}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        <TeamSlider
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          data={culture.team.creators.data}
        />
        <AziendeTestimonial
          mt="5rem"
          titolo="Docenze universitarie di netstrategy"
          data={loghiDocenze}
          widthLogos="11.5rem"
          heightLogos="6rem"
        />
        {/* Section */}
        <Divider words={divider} />
        {/* Method */}
        <Heading
          data={culture.header_method}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        <Cards data={culture.media_method.immagini.data} mt="6rem" />
        {/* Goals */}
        <Divider words={divider} />
        <Heading
          data={culture.header_experience}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        <Goals
          data={culture.content_experience}
          mt="clamp(2.00rem, calc(-0.18rem + 9.32vw), 11.00rem)"
          number
        />
        {/* Testimonials */}

        {data.testimonials && (
          <>
            <Divider words={divider} />
            <HeadingSuccesses>
              <h2>
                {testimonialsSplitText(staticData.testimonial_slider_title)}
              </h2>
            </HeadingSuccesses>
            <TestimonialsSlider
              data={data.testimonials}
              mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
            />
            <DinamicDesktopImages mt={"4rem"} />
          </>
        )}

        {windowWidth > 820 ? (
          <ImageSlider
            data={culture.services_media.immagini}
            mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
            big
          />
        ) : (
          <Cards
            data={culture.services_media.immagini.data}
            mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
          ></Cards>
        )}

        {/* Impegno Sociale */}
        <Divider words={divider} />
        <ImpegnoSociale />
        <Divider words={divider} />
        {/* Form */}
        <ContactForm
          headingCopy={headingCopy}
          mt="clamp(2.00rem, calc(0.06rem + 4.28vw), 10.00rem)"
        />
        {/* Footer */}
        <Footer staticData={staticData} />
      </div>
    </>
  );
}

const HeadingSuccesses = styled.div`
  ${centerContent}
  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;
    position: relative;
    bottom: -1.4rem;
    > span {
      display: block;
    }
    @media (max-width: 700px) {
      bottom: 0;
      margin: 0;
      text-align: left;
      margin-bottom: clamp(2rem, calc(1.03rem + 4.14vw), 6rem);
    }
    @media (max-width: 600px) {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

