import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import Heading from "@/components/Heading";
import Cards from "@/components/Cards";
import ProjectSlider from "@/components/ProjectSlider";
import Services from "@/components/Services";
import ImageSlider from "@/components/ImageSlider";
import WhatIsYourGoal from "@/components/WhatIsYourGoal";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import { useEffect, useState } from "react";
import styled from "styled-components";
import RedLink from "@/components/utils/RedLink";
import PrimaryButton from "@/components/utils/PrimaryButton";
import LatestArticle from "@/components/LatestArticle";
import { AbsoluteContainer, Column, Columns, HeadingDefault, HeadingSub, HideMb, Paragraph, RoundedThinButton } from "@/components/styled-components";
import Logo from "@/components/utils/Logo";
import getPath from '@/utils/getPath';
import HeroPages from "@/components/HeroPages";
import Head from "next/head";
import { useRouter } from "next/router";
import PushStructureData from "@/components/PushStructureData";


export async function getStaticProps() {
  const urls = [
      {
        name: 'page',
        url: `https://www.netstrategy.it/api/homepage?populate[pillars][populate][hero][populate][0]=video_mobile,video_meta_thumbnail,video,immagine_mobile,immagine&populate[immagini_servizi][fields][0]=url,alternativeText,name,ext&populate[articolo_blog][populate][0]=utente,categoria,video,immagine,immagine_mobile,meta_thumbnail,video_specialist&populate[header_servizi][populate][0]=*&populate[intro][populate][0]=bottone&populate[intro_media][populate][immagini][fields][0]=url,alternativeText,name,ext&populate[hero][populate][0]=immagine,immagine_mobile,video,video_mobile,video_meta_thumbnail&populate[divisore][populate][0]=*`,
      },
      {
        name: 'projects',
        url: `https://www.netstrategy.it/api/project-details?populate[thumbnail_success][populate][immagine][fields][0]=url,alternativeText,name,ext&populate[thumbnail_success][populate][immagine_mobile][fields][1]=url,alternativeText,name,ext&populate[categorie][populate][0]=*&filters[show_slider]=true&populate[thumbnail_success][populate][info_success][fields]`,
        transform: false,
      },
      {
        name: "categorie",
        url: `https://www.netstrategy.it/api/custom-categories`,
        transform: false,
      },
      {
        name: 'latest_article',
        url: `https://www.netstrategy.it/api/journal-details?sort=createdAt:desc&pagination[pageSize]=1&populate=immagine,immagine_home_page,utente,categoria`,
      }
    ];
    
    const staticData = await getStaticData(true);
    const data = await dataRequest(urls);
    return await { props: { data, staticData}};
}

export default function Home({data, staticData}) {

  const homepage = data.page.attributes;
  const projects = data.projects;
  const latestArticle = data.latest_article
  const divider = homepage.divisore 
    ? [homepage.divisore.sinistra, homepage.divisore.centro, homepage.divisore.destra] 
    : ['building', 'future', 'together'];

  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: staticData.contact.sottotitolo,
    paragraph: staticData.contact.paragrafo,
  }

  const [windowWidth, setWindowWidth] = useState(null);
  
  useEffect(() => {    
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} />
      </Head>
      <div className="homepage">
        {/* Home */}
        {
          <Hero data={homepage.hero} staticData={staticData}>
          {/* <DinamicTitle 
            names={homepage.lista_titoli}
          />*/}
          </Hero>
        }
        {/* Section */}
        <Divider words={divider} mt="4rem" />
        <Heading
          data={homepage.intro}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          is_culture
        />
        <div>
          {/* <a href='#' class='iubenda-cs-uspr-link'>Notice at Collection</a> */}
        </div>
        <Cards 
          data={homepage.intro_media.immagini.data} 
          labels={homepage.intro_media.labels} 
          mt="6rem"
        />
        {windowWidth <= 820 && <ButtonContainer
          btnAlign="center" >
          <RedLink link="/chi-siamo">
            <PrimaryButton>{homepage.intro.bottone.testo}</PrimaryButton>
          </RedLink>
        </ButtonContainer>}
        {/* Projects */}
        <Divider words={divider} />
        <ProjectSlider
          data={projects}
          staticData={staticData}
          titolo={staticData.progetti_slider_title}
          categorie={data.categorie}
          mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
        />
        {/* Services */}
        <Divider words={divider}/>
        <Heading
          data={homepage.header_servizi}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        <Services
          data={homepage.pillars.data}
          mt="clamp(2.00rem,calc(-0.18rem + 9.32vw),11.00rem)"
        />
        <ImageSlider
          data={homepage.immagini_servizi}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          big
        />
        {/* Journal */}
        <Divider words={divider} />
        {
          /*
          <BlogTitle
            date={homepage.articolo_blog.data.attributes.createdAt}
            title={staticData.blog_titolo}
            mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          />
          <Specialist
              data={homepage.articolo_blog.data.attributes}
              slug={homepage.articolo_blog.data.attributes.categoria.data.attributes.slug}
              staticData={staticData}
              mt="clamp(1.88rem, calc(1.72rem + 0.65vw), 2.5rem)"
            />
          */
        }
        <LatestArticle
          data={latestArticle}
          //slug={homepage.articolo_blog.data.attributes.categoria.data.attributes.slug}
          staticData={staticData}
          blogTitle={staticData.blog_titolo}
          mt="clamp(1.88rem, calc(1.72rem + 0.65vw), 2.5rem)"
        />
        {/* What is your goal */}
        <Divider words={divider} />
        <WhatIsYourGoal
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          data={staticData.obbiettivi}
        />
        {/* Form */}
        <Divider words={divider} />
        <ContactForm
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          formLayout=""
          formType="standard"
          headingCopy={headingCopy}
        />
        {/* Footer */}
        <Footer staticData={staticData}/>
      </div>
    </>
  );
}

const EventHero = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .wrapper {
    position: relative;
    z-index: 2;
  }

  .logo {
    position: absolute;
    left: 50px;
    top: 70px;
    z-index: 2;
  }

  h2 br {
    display: none;
  }

  .sub {
    br {
      display: block;
    }
  }

  @media screen and (max-width:767px) {
    &.event-hero {
      background-image: url('/assets/hero-nettalk-mobile.png') !important;
    }

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: rgba(0,0,0,0.3);
    }

    background-position: 85%;

    .logo {
      left: 20px;
      top: 40px;
    }

    .show-mb {
      display: block !important;
    }

    .sub {
      font-size: 20px;

      br {
        display: none !important;
      }
    }
  }
`

const ButtonContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`