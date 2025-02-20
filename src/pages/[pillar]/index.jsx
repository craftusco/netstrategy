import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import Cards from "@/components/Cards";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import Links from "@/components/Links";
import ImageSlider from "@/components/ImageSlider";
import ProjectSlider from "@/components/ProjectSlider";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import StaticTitle from "@/components/utils/StaticTitle";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import RedLinks from "@/components/RedLinks";
import { Breadcrumb } from "@/components/Breadcrumb";
import PushStructureData from "@/components/PushStructureData";
import Head from "next/head";
import { useRouter } from "next/router";


function testimonialsSplitText(string) {
  const newArr = [];
  string?.split(" ")?.forEach((el, idx, arr) => {
    if (idx == 0) {
      newArr.push(<span key={idx}>{`${el} `}</span>);
    } else if (idx == 1) {
      newArr.push(<span key={idx}>{el + " " + arr[arr.length - 1]}</span>);
    }
  });
  return newArr;
}

export async function getStaticPaths() {
  const response = await fetch(strapiGetDataFromQueryURL, { 
    method: 'POST',
    body: JSON.stringify({url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/pillars`})
  });

  const data = await response.json();

  const paths = data.data.map((pillar) => {
    return {
      params: { pillar: `${pillar.attributes.slug}` },
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
      name: "page",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/pillars?filters[slug]=${params.pillar}&populate=deep,3`,
    },
    {
      name: "list",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars?filters[pillar]=${params.pillar}&populate[categoria][populate][]=*&populate[immagine][fields][0]=url,alternativeText,name,ext&fields=slug,nome,pillar`,
    },
    {
      name: "list2",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/subpillars-2-0?filters[pillar]=${params.pillar}&populate[categoria][populate][]=*&fields=slug,nome,pillar`,
    },
    {
      name: "projects",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?populate=deep,3&filters[show_slider]=true`,
      transform: false,
    },
    {
      name: "testimonials",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/testimonials?populate=*&sort=updatedAt:desc`,
    },
    // {
    //   name: "articles",
    //   url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/journal-details?filters[categoria][slug]=${params.pillar}&populate=deep,2`,
    // },
    {
      name: "pillar_data",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/contenuti-subpillars?filters[pillar][slug]=${params.pillar}&populate=deep,2`,
    },
    {
      name: "categorie",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/categorie-subpillars`,
    },
    {
      name: "categorie_progetti",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/custom-categories`,
      transform: false,
    },
    
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  const list2Attrs = { attributes: data.list2 }

  //ONLY FOR LOCAL CHANGES TO SUBPILLAR 2.0
  //data.list.push(list2Attrs)
  /*if (data.page.slug === 'sem-adv') {
    data.list.splice(2, 0,
      {
        "id": 267,
        "attributes": {
            "slug": "agenzia-google-ads",
            "nome": "Agenzia Google Ads",
            "pillar": "sem-adv",
            "categoria": {
                "data": {
                    "id": 1,
                    "attributes": {
                        "nome": "Per agenzie",
                        "slug": "per-agenzie",
                        "createdAt": "2023-09-29T10:39:20.872Z",
                        "updatedAt": "2023-09-29T10:39:23.767Z",
                        "publishedAt": "2023-09-29T10:39:23.765Z"
                    }
                }
            },
            "immagine": {
                "data": null
            }
        }
      }
    )
  }*/
  //data.list.splice(2, 0, list2Attrs)

  if (data.page.length == 0)
    return {
      notFound: true,
    };

  data.categorie.unshift({
    id: null,
    attributes: {
      nome: "Altro",
      slug: "leftover",
    },
  });
  let categorizedList = [];

  let catTabs = []
  let catContent = []

  const fullList = (data.list2.length > 0) ? data.list.concat(data.list2) : [...data.list, {attributes: data.list2}]
  
  data.categorie.forEach((cat) => {
    const subpillars = fullList.filter(
      (subpillar) => {
        // if(cat.attributes.slug == "leftover") {
        //   return subpillar.attributes.categoria?.data == null;
        // } else {
        //   return subpillar.attributes.categoria?.data?.attributes.slug ===
        //   cat.attributes.slug
        // }
        return subpillar.attributes.categoria?.data?.attributes.slug ===
          cat.attributes.slug
      }
    );
    if (subpillars.length === 0) return;
    categorizedList.push({
      name: cat.attributes.nome,
      slug: cat.attributes.slug,
      subpillars,
    });

    catTabs.push({
      name: cat.attributes.nome,
      slug: cat.attributes.slug
    })
    catContent.push({
      subpillars
    })
  });

  data.categorizedList = categorizedList;

  data.catTabs = catTabs;
  data.catContent = catContent;

  data.breadcrumbLinks = [
    { href: "/", text: "Home" },
    { text: data.page.nome },
  ];

  return await {
    props: { data, staticData, pageName: "pillar"  },
  };
}

export default function Pillar({ data, staticData }) {
  const pillar = data.page;
  const projects = data.projects;
  const list = data.list;
  const testimonials = data.testimonials;
  // const articles = data.articles;
  const pillarData = data.pillar_data;
  const categorizedList = data.categorizedList

  const divider = pillarData.divisore
    ? [
        pillarData.divisore.sinistra,
        pillarData.divisore.centro,
        pillarData.divisore.destra,
      ]
    : ["building", "future", "togheter"];

  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: pillarData.form,
    paragraph: pillarData.paragrafo,
  };
  const [windowWidth, setWindowWidth] = useState(null);
  const HeadingSuccessesRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);

    gsap.from(HeadingSuccessesRef.current, {
      y: "25%",
      ease: "easeInOut",
      stagger: 1,
      duration: 10,
      scrollTrigger: {
        trigger: HeadingSuccessesRef.current,
        start: "5% bottom",
        end: "5% center",
        scrub: 1.5,
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} />
      </Head>
      <div>
        <HeroPages data={pillar.hero} staticData={staticData}>
          <StaticTitle pretitle={staticData.hero} title={pillar.hero.nome} />
        </HeroPages>
        {/* Breadcrumb */}
        <Breadcrumb links={data.breadcrumbLinks} />
        {/* Section */}
        <Divider words={divider} mt="4rem" />
        <Heading
          data={pillar.intro}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        <Cards
          data={pillar.intro_media.immagini.data}
          mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
        />
        {/* Links */}
        {/*<Links
          data={pillar.collegamenti}
          list={list}
          categorizedList={categorizedList}
          mt="clamp(2.00rem, calc(0.79rem + 5.18vw), 7.00rem)"
        />*/}
        <RedLinks
          data={pillar.collegamenti}
          list={list}
          categorizedList={categorizedList}
          catTabs={data.catTabs}
          catContent={data.catContent}
          mt="clamp(2.00rem, calc(0.79rem + 5.18vw), 7.00rem)"
        />
        <ImageSlider
          data={pillar.collegamenti.immagini}
          mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
        />
        {/* Successes */}
        <Divider words={divider} />
        <HeadingSuccesses ref={HeadingSuccessesRef}>
          <h2>{testimonialsSplitText(staticData.testimonial_slider_title)}</h2>
        </HeadingSuccesses>
        <TestimonialsSlider
          data={testimonials}
          mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
        />
        {/* Projects Slider Section */}
        <Divider words={divider} />
        <ProjectSlider
          data={projects}
          staticData={staticData}
          categorie={data.categorie_progetti}
          titolo={staticData.progetti_slider_title}
          mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
        />
        {/* News */}
        {/* {articles.length > 0 && (
          <>
            <Divider words={divider} />
            <HeadingSuccesses ref={HeadingSuccessesRef}>
              <h2>{pillar.heading_3.titolo}</h2>
            </HeadingSuccesses>
            <NewsSlider
              data={articles}
              staticData={staticData}
              mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
            />
          </>
        )} */}
        {/* Form */}
        <Divider words={divider} />
        <ContactForm
          headingCopy={headingCopy}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        />
        {/* Footer */}
        <Footer staticData={staticData} />
      </div>
    </>
  );
}

// Style
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
