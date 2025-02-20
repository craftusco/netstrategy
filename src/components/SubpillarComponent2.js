import React, { useRef } from "react";
import Cards from "@/components/Cards";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { useState, useEffect } from "react";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import AziendeTestimonial from "@/components/AziendeTestimonial";
import Image from "next/image";
import { Container, HeadingDefault, HCenteredContent, LightTitle, Paragraph, RoundedThinButton, RoundedThinLightButton, AbsoluteContainer, Columns, Column, HeadingSub, LineDivider, FixedScrollableContainer, BackgroundImgContainer, HideMb, ShowMb, MobileHorizontalScroll, Wrapper } from "@/components/styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import GoogleReview from "@/components/GoogleReview";
import Quote from "@/components/Quote";
import getPath from "@/utils/getPath";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel, useTab, useMultiStyleConfig, Show } from '@chakra-ui/react'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Logo from "@/components/utils/Logo";
import ReactMarkdown from "react-markdown";
import parse from 'html-react-parser';
import RedLink from "@/components/utils/RedLink";
import HeroPages from "@/components/HeroPages";
import RedLinks from "@/components/RedLinks";
import DinamicDesktopImages from "./DinamicImages";
import SubpillarProjectSlider from "./SubpillarProjectSlider";
import Subpillar2Faq from "./Subpillar2Faq";
import { Breadcrumb } from "./Breadcrumb";
import Timeline from "./Timeline";

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


export default function SubpillarComponent2({ data, staticData, dataSubpillar }) {
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

  //RANDOM SPECIALIST IMAGES
  const [randomImg, setRandomImg] = useState(0)
  const [specialistsImgs, setSpecialistImgs] = useState(data.culture.attributes.team.creators.data)
    
    //AUTOMATIC TAB ROLLING
    const [tabIndex, setTabIndex] = useState(0)
    const count = useRef(0)
    useEffect(() => {
        
            /*setInterval(() => {
                count.current = count.current + 1;
                setTabIndex(count.current)


                if (count.current >= document.querySelectorAll('.tabs span').length) {
                    setTabIndex(0)
                    count.current = 0
                }
            }, 7000);*/
        
    }, [count])

    const handleTabClick = (i, el) => {
        setTabIndex(i)
        count.current = i

        if (windowWidth <= 767) {
            document.querySelector('.horizontal-tab-scroll').scrollTo({
                left: document.querySelector('.horizontal-tab-scroll span:nth-child('+ el.id +')').offsetLeft - 80,
                behavior: "smooth"
            })
        }
    }

    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        //ON SCROLL FADE EFFECT FOR SUCCESSES
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".layer-story-box",
                scrub: true,
                pin: false,
                start: "top top",
                endtrigger: 'bottom',
                markers: false
            }
        });

        tl.from(
            ".layer-story-content-wrapper",
                {autoAlpha: 0.2, stagger: 0.5 },
            0
            ).to(
            ".layer-story-content-wrapper",
            {
                autoAlpha: 1,
                stagger: 0.5
            },
            1
        );

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
        
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }, [])

  useEffect(() => {
    setTimeout(() => {
        setSpecialistImgs(specialistsImgs.sort(() => 0.5 - Math.random()))
        setRandomImg((randomImg) => randomImg + 1)
    }, 8000)
  }, [randomImg])

  //CUSTOM TABS CHAKRA UI
  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <RoundedThinLightButton __css={styles.tab} {...tabProps} className={isSelected && 'active'}>
        {tabProps.children}
      </RoundedThinLightButton>
    )
  })

  //EDITORIAL LOGOS
  const loghiEditoriali = [
    "/assets/loghi-citazioni/logo-adnkronos.svg",
    "/assets/loghi-citazioni/logo-larena.svg",
    "/assets/loghi-citazioni/logo-tpi.svg",
    "/assets/loghi-citazioni/logo-feedaty.svg",
    "/assets/loghi-citazioni/logo-insidemarketing.svg",
    "/assets/loghi-citazioni/logo-opencart.svg",
    "/assets/loghi-citazioni/logo-activecampaign.svg",
    "/assets/loghi-citazioni/logo-oct8ne.svg",
    "/assets/loghi-citazioni/logo-eshoppingadvisor.svg",
    "/assets/loghi-citazioni/logo-systeme.svg",
    "/assets/loghi-citazioni/apindustria-logo.svg",
    "/assets/loghi-citazioni/cameradicommercio-logo.svg",
  ];

  const loghiEditoriali1 = [
    "/assets/loghi-citazioni/logo-adnkronos.svg",
    "/assets/loghi-citazioni/logo-larena.svg",
    "/assets/loghi-citazioni/logo-tpi.svg",
    "/assets/loghi-citazioni/logo-feedaty.svg",
    "/assets/loghi-citazioni/logo-insidemarketing.svg",
    "/assets/loghi-citazioni/logo-opencart.png"
  ];

  const loghiEditoriali2 = [
    "/assets/loghi-citazioni/logo-activecampaign.svg",
    "/assets/loghi-citazioni/logo-oct8ne.png",
    "/assets/loghi-citazioni/logo-eshoppingadvisor.png",
    "/assets/loghi-citazioni/logo-systeme.png",
    "/assets/loghi-citazioni/logo-apindustria.png",
    "/assets/loghi-citazioni/logo-cameradicommercio.png"
  ]

  //CUSTOMERS LOGOS
  const customersLogos1 = [
    "/loghi/eis_2.webp",
    "/loghi/giustiwings_2.webp",
    "/loghi/leb.it_2.webp",
    "/loghi/lhh-recruitment.webp",
    "/loghi/simba_2.webp"
  ];

  const customersLogos2 = [
    "/loghi/verallia_2.webp",
    "/loghi/zonzini_2.webp",
    "/loghi/Anteo_NetStrategy_2.webp",
    "/loghi/Aworld_NetStrategy_2.webp",
    "/loghi/cicalia_NetStrategy.webp"
  ];

  const customersLogos3 = [
    "/loghi/Cormidi_NetStrategy_2.webp",
    "/loghi/Forigo_NetStrategy_2.webp",
    "/loghi/Freddo_NetStrategy_2.webp",
    "/loghi/hvb_NetStrategy.webp",
    "/loghi/Juice_NetStrategy_2.webp"
  ]

  const customersLogos4 = [
    "/loghi/L'Arena_NetStrategy_2.webp",
    "/loghi/MFI_NetStrategy_2.webp",
    "/loghi/Pulimav_NetStrategy_2.webp",
    "/loghi/Stampaprint_NetStrategy_2.webp",
    "/loghi/TopTuning_NetStrategy_2.webp"
  ]

  const allCustomersLogos = customersLogos1.concat(customersLogos2, customersLogos3, customersLogos4)

  //CATEGORIES LINKS
  data.categories.unshift({
    id: null,
    attributes: {
      nome: "Altro",
      slug: "leftover",
    },
  });
  
  let categorizedList = [];

  let catTabs = []
  let catContent = []

  data.categories.forEach((cat) => {
    const subpillars = data.list.filter((subpillar) => {
      if (cat.attributes.slug == "leftover") {
        return subpillar.attributes.categoria?.data == null;
      } else {
        return (
          subpillar.attributes.categoria?.data?.attributes.slug ===
          cat.attributes.slug
        );
      }
    });
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

  const orderedSubpillarDataArr = Object.keys(dataSubpillar)
  .map(key => ({ key, ...dataSubpillar[key] }))
  .filter(item => item.ordinamento !== undefined) 
  .sort((a, b) => a.ordinamento - b.ordinamento);

  const subpillarData = dataSubpillar
  const subpillarDataArr = orderedSubpillarDataArr
  
  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: subpillarData.titolo_form_contatti,
    paragraph: subpillarData.paragrafo_form_contatti,
  };

  const testimonials = data.testimonials

  if (subpillarData.testimonianze.id_primo_testimonial) {
    testimonials.sort((a, b) => { 
        if (a.id == subpillarData.testimonianze.id_primo_testimonial) return -1
        if (b.id == subpillarData.testimonianze.id_primo_testimonial) return 1

        return testimonials
    })
  }

  const breadcrumbLinksSubpillar = [
    { href: "/", text: "Home" },
    { href: '/' + data?.pillar_data?.pillar?.data?.attributes?.slug, text: data?.pillar_data?.pillar?.data?.attributes?.nome },
    { text: subpillarData.hero.pretitolo },
  ];

  const timelineData = dataSubpillar?.content?.find(
    (item) => item.__component === "subpillars2.timeline-orizzontale"
  );
  

  return (
    <>
        <Head>
            <style>
                {
                    `
                        body {
                            overflow-y: scroll !important;
                        }

                        @-webkit-keyframes fade-in-bottom {
                            0% {
                                -webkit-transform: translateY(50px);
                                        transform: translateY(50px);
                                opacity: 0;
                            }
                            100% {
                                -webkit-transform: translateY(0);
                                        transform: translateY(0);
                                opacity: 1;
                            }
                            }
                            @keyframes fade-in-bottom {
                            0% {
                                -webkit-transform: translateY(50px);
                                        transform: translateY(50px);
                                opacity: 0;
                            }
                            100% {
                                -webkit-transform: translateY(0);
                                        transform: translateY(0);
                                opacity: 1;
                            }
                        }

                        .fade-in-bottom {
                            -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                                    animation: fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
                        }

                        .splide__pagination {
                            bottom: -30px !important;
                        }

                        .splide__pagination li button {
                            margin: 0px 3px;
                        }

                        .splide__pagination li button.is-active {
                            background: #fc1333;
                            opacity: 1;
                            border-radius: 20px;
                            width: 20px;
                            margin: 0px 5px;
                        }

                        .p-margin p {
                            margin-bottom: 10px;
                        }

                        @media screen and (max-width:767px) {
                            .mw-full-mb {
                                max-width: 100% !important;
                            }
                        }

                        @media screen and (max-height:850px) and (min-width:767px) {
                            .custom-hero {
                                padding-top: 50px !important;
                                height: auto !important;
                            }

                            .custom-hero .absolute-container {
                                position: relative !important;
                            }

                            .custom-hero .centered-content {
                               margin-bottom: 50px !important;
                            }
                        }
                    `
                }
            </style>
        </Head>

        <div style={{display: 'none'}}>
            <HeroPages data={''} staticData={staticData}>
            </HeroPages>
        </div>
        {/* Output sezioni */}
        {
            subpillarDataArr.map((section) => {

                {/* Hero */}
                if (section.key === 'hero') {
                    return (
                        <>
                            <Container relative fullScreen allCentered maxWidth='none' className='custom-hero'>
                                <div>
                                    <HideMb>
                                        <AbsoluteContainer left='46px' top='50px' mobile='left: 0px;'>
                                            <Logo color="black" fadeScroll /> 
                                        </AbsoluteContainer>
                                    </HideMb>
                                    <Container hCentered mobile='margin: 0px;'>
                                        <Breadcrumb isSubpillar2 links={breadcrumbLinksSubpillar} />
                                    </Container>
                                    <HeadingDefault fontSize='95px' as='h1' textAlign='center' mobile='font-size: 50px; padding-left: 10px; padding-right: 10px;'>
                                        {parse(section.titolo)}
                                    </HeadingDefault>
                                    <Paragraph marginTop='20px' mobile='font-size: 18px; padding-left: 10px; padding-right: 10px;' textAlign='center' style={{maxWidth: '1030px'}} marginLeft="auto" marginRight="auto">
                                        <ReactMarkdown unwrapDisallowed>
                                            {(windowWidth > 767) ? section.paragrafo : section.paragrafo_mobile}
                                        </ReactMarkdown>
                                    </Paragraph>
                                    <HCenteredContent marginBottom='250px' mobile='margin-bottom: 80px;' className='centered-content'>
                                        <a href="#richiedi-consulenza">
                                            <RoundedThinButton margin='auto' marginTop='30px'>{section.testo_cta}</RoundedThinButton>
                                        </a>
                                    </HCenteredContent>
                                    <HideMb>
                                        <AbsoluteContainer bottom='0px' hCentered className='absolute-container'>
                                            <div>
                                                <HCenteredContent>
                                                    {
                                                        section.pulsanti.map((el) => {
                                                            return(
                                                                <a key={el.id} href={el.link}>
                                                                    <RoundedThinLightButton margin='0px 20px' fixedWidth>{el.testo}</RoundedThinLightButton>
                                                                </a>
                                                            )
                                                        })
                                                    }
                                                </HCenteredContent>
                                                {/* Certifications */}
                                                <LineDivider marginTop='50px' condensed />
                                                <Container marginTop='30px' marginBottom='30px'>
                                                    <Columns keepMb vCentered template='auto auto auto' gap='0px'>
                                                        <Column marginRight='70px'>
                                                            <LightTitle fontSize='20px'>{subpillarData.hero.titolo_certificati}</LightTitle>
                                                        </Column>
                                                        <Column column='2 / span 2'>
                                                            <Columns vCentered template='auto auto auto auto auto auto' gap='35px'>
                                                                {
                                                                    section.certificati.map((el, i) => {
                                                                        return(
                                                                            <Column>
                                                                                <img src={getPath(el.immagine.data.attributes.url)} style={{ width: '100%', maxWidth: '150px' }} />
                                                                            </Column>
                                                                        )
                                                                    })
                                                                }
                                                            </Columns>
                                                        </Column>
                                                    </Columns>
                                                </Container>
                                                <LineDivider condensed />
                                            </div>
                                        </AbsoluteContainer>
                                    </HideMb>
                                    <ShowMb>
                                        <AbsoluteContainer bottom='0px' hCentered>
                                            <MobileHorizontalScroll>
                                                {
                                                    section.pulsanti.map((el) => {
                                                        return(
                                                            <a key={el.id} href={el.link}>
                                                                <RoundedThinLightButton margin='0px 10px 0px 0px'>{el.testo}</RoundedThinLightButton>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </MobileHorizontalScroll>
                                        </AbsoluteContainer>
                                    </ShowMb>
                                </div>
                            </Container>
                            {/* Mobile Certifications */}
                            <ShowMb>
                                <LineDivider mobile='margin-top: 70px; margin-bottom: 30px;' condensed />
                                <Container>
                                    <LightTitle fontSize='22px' marginBottom='30px' mobile='font-size: 18px;'>{subpillarData.hero.titolo_certificati}</LightTitle>
                                    <MobileHorizontalScroll verticalCenter>
                                        {
                                            subpillarData.hero.certificati.map((el, i) => {
                                                return(
                                                    <img key={el.id} src={getPath(el.immagine.data.attributes.url)} style={(i === 0) ? { width: '100%', maxHeight: '70px', margin: '0px 10px' } : { width: '100%', maxHeight: '100px', margin: '0px 10px' }} />
                                                )
                                            })
                                        }
                                    </MobileHorizontalScroll>
                                </Container>
                                <LineDivider mobile='margin-top: 30px; margin-bottom: 30px;' condensed />
                            </ShowMb>
                        </>
                    )
                } else if (section.key === 'perche') {
                    return (
                        <>
                            {/* Why us */}
                            <Container marginTop='70px' marginBottom='120px' mobile='margin-bottom: 50px;' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()}>
                                <LightTitle marginBottom='20px' textAlign='center'>{section.pretitolo}</LightTitle>
                                <HeadingDefault red textAlign='center'>{section.titolo}</HeadingDefault>
                                <Paragraph marginTop='20px' textAlign='center'>
                                    <ReactMarkdown>
                                        {(windowWidth > 767) ? section.paragrafo : section.paragrafo_mobile}
                                    </ReactMarkdown>
                                </Paragraph>
                            </Container>
                            {/* Stats */}
                            <Container marginBottom='40px' maxWidth='1200px' mobile='display: block; max-width: 350px; margin: auto;'>
                                <Columns template='1fr 1fr 1fr' gap='90px'>
                                    {
                                        section.colonne.map((el) => {
                                            return(
                                                <Column key={el.id} mobile='margin-bottom: 50px;'>
                                                    <HideMb>
                                                        <Image width={50} height={53} src={getPath(el.icona?.data?.attributes?.url)} alt="Icon" />
                                                        <HeadingSub as='h3' marginTop='30px' fontWeight='700'>{el.titolo}</HeadingSub>
                                                    </HideMb>
                                                    <ShowMb>
                                                        <Columns keepMb template='0.3fr 1fr' vCentered gap='0px'>
                                                            <Column>
                                                                <Image width={50} height={53} src={getPath(el.icona?.data?.attributes?.url)} alt="Icon" />
                                                            </Column>
                                                            <Column>
                                                                <HeadingSub as='h3' fontSize='24px' fontWeight='700'>{el.titolo}</HeadingSub>
                                                            </Column>
                                                        </Columns>
                                                    </ShowMb>
                                                    <Paragraph marginTop='20px' fontSize='18px'>
                                                        <ReactMarkdown>
                                                            {el.testo}
                                                        </ReactMarkdown>
                                                    </Paragraph>
                                                </Column>
                                            )
                                        })
                                    }
                                </Columns>
                            </Container>

                            {/* Img carousel */}
                            {windowWidth > 820 ? (
                                <ImageSlider
                                data={section.foto}
                                big
                                mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
                                height={800}
                                />
                            ) : (
                                <Cards
                                data={section.foto.data}
                                ></Cards>
                            )}

                            <LineDivider marginTop='8rem' marginBottom='8rem' condensed />
                        </>
                    )
                } else if (section.key === 'recensioni') {
                    return (
                        <>
                            {/* Reviews */}
                            <Container maxWidth='1651px' marginBottom='70px' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()} relative>
                                <div>
                                    <LightTitle textAlign='center' marginBottom='20px'>{section.pretitolo}</LightTitle>
                                    <HeadingDefault red textAlign='center' marginBottom='90px' mobile='margin-bottom: 20px;'>
                                        {parse(section.titolo)}
                                    </HeadingDefault>
                                    <HideMb>
                                        <AbsoluteContainer right='0px' top='45px'>
                                            <a href="https://www.google.com/search?sca_esv=0a650f077e31c052&tbm=lcl&q=NetStrategy+Recensioni&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDc0MDUyNjMzsrQ0NbQ0N7A0NdjAyPiKUcwvtSS4pCixJDW9UiEoNTk1rzgzPy9zESsOCQD-v3PpTQAAAA&rldimm=17105236629951970950&hl=it-IT&sa=X&ved=2ahUKEwjGjMuQg_-IAxU3lf0HHb63PGEQ9fQKegQIMRAF&biw=1746&bih=853&dpr=1.1#lkt=LocalPoiReviews" target="_blank">
                                                <Image src="/assets/agenzia-google-ads/reviews-badge.png" width={222} height={97} alt="Review badge" />
                                            </a>
                                        </AbsoluteContainer>
                                    </HideMb>
                                    <ShowMb>
                                        <Image src="/assets/agenzia-google-ads/reviews-badge.png" width={222} height={97} alt="Review badge" style={{margin: 'auto', display: 'block', marginBottom: '50px'}} />
                                    </ShowMb>
                                    <Splide
                                    options={ {
                                        //type: 'loop',
                                        perPage: 4,
                                        gap: '30px',
                                        breakpoints: {
                                            991: {
                                                perPage: 2
                                            },
                                            668: {
                                                perPage: 2
                                            },
                                            580: {
                                                perPage: 1
                                            }
                                        },
                                        //focus: 'center',
                                        arrows: false,
                                        pagination: true,
                                        pauseOnHover: false,
                                        autoplay: true
                                    } }>
                                        {
                                            section.carosello.map((el) => {
                                                return(
                                                    <SplideSlide key={el.id} style={{paddingTop: '10px'}}>
                                                        <GoogleReview>
                                                            <AbsoluteContainer padding='0px 15px 0px 0px' bg='#ffffff' maxWidth='180px' flex top='-10px' left='0px'>
                                                                {
                                                                    (el.stelle === 'cinque') ?
                                                                        //5
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'quattro e mezzo') ?
                                                                        //4.5
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-half-solid.png" alt="Verified" width={34} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'quattro') ?
                                                                        //4
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'tre e mezzo') ?
                                                                        //3.5
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-half-solid.png" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'tre') ?
                                                                        //3
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'due e mezzo') ?
                                                                        //2.5
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-half-solid.png" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'due e mezzo') ?
                                                                        //2
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : (el.stelle === 'una e mezzo') ?
                                                                        //1.5
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                            <Image src="/assets/star-half-solid.png" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                    : 
                                                                        //1
                                                                        <>
                                                                            <Image src="/assets/star-solid.svg" alt="Verified" width={104} height={20} />
                                                                        </>
                                                                }
                                                            </AbsoluteContainer>
                                                            <Paragraph fontSize='16px' lineHeight='24px'>
                                                                <ReactMarkdown>
                                                                    {el.testo}
                                                                </ReactMarkdown>
                                                            </Paragraph>
                                                            {
                                                                /*
                                                                    <Paragraph fontSize='16px' lineHeight='24px'>
                                                                        <span className="read-more">Leggi di più</span>
                                                                    </Paragraph>
                                                                */
                                                            }
                                                            <div>
                                                                <LineDivider />
                                                                <Columns vCentered keepMb template='0.3fr auto'>
                                                                    <Column>
                                                                        <img src={getPath(el.foto.data.attributes.url)} alt={el.nome_e_cognome} style={{maxWidth: '45px'}} />
                                                                    </Column>
                                                                    <Column>
                                                                        <Paragraph fontSize='18px'>
                                                                            <b>{el.nome_e_cognome}</b>
                                                                            <img src="/assets/agenzia-google-ads/review-verified.png" alt="Verified" style={{marginLeft: '10px', marginBottom: '7px'}} />
                                                                        </Paragraph>
                                                                        <Paragraph lineHeight='20px' fontSize='16px' color='rgba(0, 0, 0, .5)'>
                                                                            {el.data}
                                                                        </Paragraph>
                                                                    </Column>
                                                                </Columns>
                                                            </div>
                                                        </GoogleReview>
                                                    </SplideSlide>
                                                )
                                            })
                                        }
                                    </Splide>
                                </div>
                            </Container>
                            
                            <LineDivider marginTop='8rem' marginBottom='8rem' condensed />
                        </>
                    )
                } else if (section.key === 'chi_siamo') {
                    return (
                        <>
                            {/* About */}
                            <Container maxWidth='1651px' marginBottom='70px' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()}>
                                <LightTitle textAlign='center' marginBottom='20px'>{section.pretitolo}</LightTitle>
                                <HeadingDefault red textAlign='center' marginBottom='90px' mobile='margin-bottom: 50px;'>
                                    {section.titolo}
                                </HeadingDefault>
                                <HideMb>
                                    <Columns template='2fr 2fr 3fr' vCentered gap='120px'>
                                        <Column style={{zIndex: '1'}}>
                                            <Image layout="responsive" width={360} height={460} src={getPath(section.foto.data.attributes.url)} alt={section.nome_e_cognome} style={{borderRadius: '30px'}} /> 
                                        </Column>
                                        <Column>
                                            <Quote>
                                                <Paragraph>
                                                    <ReactMarkdown>
                                                        {section.testo}
                                                    </ReactMarkdown>
                                                </Paragraph>
                                                <Paragraph red italic fontSize='16px' marginTop='10px' marginBottom='30px'>- {section.nome_e_cognome}</Paragraph>
                                                <AbsoluteContainer left='-135px' style={{width: '169%', zIndex: '0'}}>
                                                    <LineDivider red />
                                                </AbsoluteContainer>
                                                <HeadingDefault as='p' red fontSize='50px' marginTop='50px'>{section.ruolo}</HeadingDefault>
                                            </Quote>
                                        </Column>
                                        <Column column='3 / span 2'>
                                            <Columns template='auto auto auto auto' vCentered gap='10px'>
                                                {
                                                    specialistsImgs.map((el, i) => {
                                                        return(
                                                            (i <= 7) &&
                                                                <Column key={i}>
                                                                    <BackgroundImgContainer width='214px' height='183px' brRadius='30px' bgImg={`url(${getPath(el.attributes.immagine.data.attributes.url)})`} />
                                                                </Column>
                                                        ) 
                                                    })
                                                }
                                            </Columns>
                                        </Column>
                                    </Columns>
                                </HideMb>
                                {/* Mobile */}
                                <ShowMb>
                                    <Image layout="responsive" width={100} height={100} src={getPath(section.foto_mobile.data.attributes.url)} alt={section.nome_e_cognome} style={{borderRadius: '50%', marginBottom: '30px', width: '100%', maxWidth: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} /> 
                                    <Quote>
                                        <Paragraph italic mobile='font-size: 16px; line-height: 18px;'>
                                            <ReactMarkdown>
                                                {section.testo}
                                            </ReactMarkdown>
                                        </Paragraph>
                                        <Paragraph red italic fontSize='16px' marginTop='10px'>- {section.nome_e_cognome}</Paragraph>
                                        <LineDivider red mobile='margin: 20px auto;' />
                                        <HeadingDefault as='p' red mobile='font-size: 30px;' marginBottom='60px'>{section.ruolo}</HeadingDefault>
                                    </Quote>
                                    <MobileHorizontalScroll justifyCenter style={{marginLeft: '-30px', marginRight: '-30px'}}>
                                        <Columns keepMb template='auto auto auto auto' hCentered gap='10px'>
                                            {
                                                specialistsImgs.map((el, i) => {
                                                    return(
                                                        (i <= 7) &&
                                                            <Column key={i}>
                                                                <BackgroundImgContainer width='108px' height='92px' brRadius='20px' bgImg={`url(${getPath(el.attributes.immagine.data.attributes.url)})`} />
                                                            </Column>
                                                    ) 
                                                })
                                            }
                                        </Columns>
                                    </MobileHorizontalScroll>
                                </ShowMb>
                            </Container>

                            <LineDivider marginTop='8rem' marginBottom='8rem' condensed />
                        </>
                    )
                } else if (section.key === 'metodo') {
                    return (
                        <>
                            {/* Method */}
                            <Container maxWidth='1651px' marginBottom='70px' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()}>
                                <LightTitle textAlign='center' marginBottom='20px'>{section.pretitolo}</LightTitle>
                                <HeadingDefault red textAlign='center' marginBottom='50px'>
                                    {section.titolo}
                                </HeadingDefault>
                                <Tabs variant='unstyled' index={tabIndex}>
                                    <Columns template='1fr 2.5fr' vCentered gap='120px'>
                                        <Column rAlignment>
                                            <TabList>
                                                <div className="mw-full-mb" style={{maxWidth: '290px'}}>
                                                    {
                                                        (windowWidth > 767) &&
                                                            <HideMb>
                                                                <div className="tabs">
                                                                    {
                                                                        section.tabs.map((el, i) => {
                                                                            return(
                                                                                <CustomTab key={el.id} marginBottom='20px' inlineBlock margin='0px 20px' style={{width: '100%'}} onClick={() => {handleTabClick(i)}}>{el.nome}</CustomTab>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </HideMb>
                                                    }
                                                    <ShowMb>
                                                        <MobileHorizontalScroll style={{maxWidth: '100vw'}} className='horizontal-tab-scroll'>
                                                            {
                                                                section.tabs.map((el, i) => {
                                                                    return(
                                                                        <CustomTab key={el.id} marginBottom='20px' inlineBlock fixedWidth margin='0px 10px' onClick={() => {handleTabClick(i, el)}}>{el.nome}</CustomTab>
                                                                    )
                                                                })
                                                            }
                                                        </MobileHorizontalScroll>
                                                    </ShowMb>
                                                </div>
                                            </TabList>
                                        </Column>

                                        <Column>
                                            <TabPanels>
                                                {
                                                    section.tabs.map((el) => {
                                                        return(
                                                            <TabPanel className="fade-in-bottom" key={el.id}>
                                                                {
                                                                (el.mostra_immagine) ?
                                                                    <Columns template='1fr 1fr' vCentered gap='120px'>
                                                                        <Column mobile='padding-left: 50px; padding-right: 50px; padding-top: 20px; img {max-width: 215px; margin: auto; display: block;}'>
                                                                            <Image layout="responsive" width={483} height={662} src={getPath(el.immagine.data.attributes.url)} alt={el.nome} />
                                                                        </Column>
                                                                        <Column>
                                                                            <HeadingSub as='h3' fontSize='40px' marginBottom='10px' mobile='font-size: 22px; margin-top: 30px;'>{el.titolo}</HeadingSub>
                                                                            <Container maxWidth='300px' mobile='margin: 0px; max-width: unset;' margin='0px'>
                                                                                <Paragraph className='p-margin'>
                                                                                    <ReactMarkdown>
                                                                                        {el.testo}
                                                                                    </ReactMarkdown>
                                                                                </Paragraph>
                                                                            </Container>
                                                                        </Column>
                                                                    </Columns>
                                                                :
                                                                    <Columns template='0fr 1fr' vCentered gap='110px'>
                                                                        <Column></Column>
                                                                        <Column>
                                                                            <HeadingSub as='h3' fontSize='40px' marginBottom='10px' mobile='font-size: 22px; margin-top: 30px;'>{el.titolo}</HeadingSub>
                                                                            <Container mobile='margin: 0px; max-width: unset;' margin='0px'>
                                                                                <Paragraph className='p-margin'>
                                                                                    <ReactMarkdown>
                                                                                        {el.testo}
                                                                                    </ReactMarkdown>
                                                                                </Paragraph>
                                                                            </Container>
                                                                        </Column>
                                                                    </Columns>
                                                                }
                                                                
                                                            </TabPanel>
                                                        )
                                                    })
                                                }
                                            </TabPanels>
                                        </Column>
                                    </Columns>
                                </Tabs>
                            </Container>
                        </>
                    )
                } else if (section.key === 'testimonianze') {
                    return (
                        <>
                            {/* Testimonials */}
                            <LineDivider marginTop='0rem' marginBottom='30px' mobile='margin-bottom: 30px;' condensed />

                            <Container maxWidth='1325px'>
                                <LightTitle fontSize='18px'>PARLANO DI NOI</LightTitle>
                                <HideMb>
                                    <AziendeTestimonial
                                        mt="0rem"
                                        data={loghiEditoriali}
                                        widthLogos="9.0rem"
                                        heightLogos="6rem"
                                    />
                                </HideMb>
                                {/* Mobile */}
                                <ShowMb style={{marginTop: '20px'}}>
                                    <Splide
                                    style={{marginBottom: '20px'}}
                                    options={ {
                                        type: 'loop',
                                        perPage: 2,
                                        //focus: 'center',
                                        arrows: false,
                                        pagination: false,
                                        pauseOnHover: false,
                                        autoplay: true
                                    } }>
                                    {loghiEditoriali1.map((e, i) => {
                                        return(
                                        <SplideSlide key={i}>
                                            <ImgContainer>
                                            <Image
                                                sizes="100%"
                                                alt={"Logo azienda"}
                                                key={i}
                                                src={e} //getPath(e)
                                                fill
                                                style={{
                                                    filter: `grayscale(100%)`,
                                                    minWidth: '5.0rem',
                                                    maxHeight: '6rem'
                                                }}
                                                // priority
                                            />
                                            </ImgContainer>
                                        </SplideSlide>
                                        )
                                    })}
                                    </Splide>
                                    <Splide
                                    options={ {
                                        type: 'loop',
                                        perPage: 2,
                                        //focus: 'center',
                                        arrows: false,
                                        pagination: false,
                                        pauseOnHover: false,
                                        autoplay: true
                                    } }>
                                    {loghiEditoriali2.map((e, i) => {
                                        return(
                                        <SplideSlide key={i}>
                                            <ImgContainer>
                                            <Image
                                                sizes="100%"
                                                alt={"Logo azienda"}
                                                key={i}
                                                src={e} //getPath(e)
                                                fill
                                                style={{
                                                    filter: `grayscale(100%)`,
                                                    minWidth: '5.0rem',
                                                    maxHeight: '6rem'
                                                }}
                                                // priority
                                            />
                                            </ImgContainer>
                                        </SplideSlide>
                                        )
                                    })}
                                    </Splide>
                                </ShowMb>
                            </Container>

                            <LineDivider marginTop='30px' marginBottom='8rem' mobile='margin-top: 30px;' condensed />
                            
                            {/* Testimonial slider */}
                            <Container maxWidth='1500px' marginBottom='130px' id={subpillarData.testimonianze.pretitolo.replaceAll(' ', '-').toLowerCase()}>
                                <LightTitle textAlign='center' marginBottom='20px'>{subpillarData.testimonianze.pretitolo}</LightTitle>
                                <HeadingDefault red textAlign='center' marginBottom='50px'>
                                    {subpillarData.testimonianze.titolo}
                                </HeadingDefault>

                                <TestimonialsSlider
                                    data={testimonials}
                                    pillar="sem-adv"
                                    mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
                                />
                            </Container>
                        </>
                    )
                } else if (section.key === 'successi') {
                    return (
                        <>
                            {/* Clients */}
                            {
                            (subpillarData.layout_una_riga_loghi_parlano_di_noi) ?
                                <>
                                <Container maxWidth='1651px'>
                                    <LightTitle fontSize='18px' marginBottom='2rem'>ABBIAMO CONQUISTATO LA FIDUCIA DI</LightTitle>
                                    <DinamicDesktopImages mt={"4rem"} />
                                </Container>
                                </>
                            :
                                <Container maxWidth='1651px'>
                                <LightTitle fontSize='18px' marginBottom='2rem'>ABBIAMO CONQUISTATO LA FIDUCIA DI</LightTitle>

                                <HideMb>
                                    {/* 1 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false,
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos1.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '11.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 2 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos2.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '11.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 3 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos3.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '11.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 4 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                    >
                                        {customersLogos4.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '11.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                </HideMb>

                                <ShowMb>
                                    {/* 1 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false,
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos1.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '8.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 2 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos2.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '8.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 3 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                        style={{marginBottom: '20px'}}
                                    >
                                        {customersLogos3.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '8.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                    {/* 4 */}
                                    <Splide
                                        options={ {
                                            type: 'region',
                                            perPage: 5,
                                            breakpoints: {
                                                991: {
                                                    perPage: 4
                                                },
                                                767: {
                                                    perPage: 2
                                                }
                                            },
                                            //focus: 'center',
                                            arrows: false,
                                            pagination: false,
                                            pauseOnHover: false,
                                            autoplay: false,
                                            drag: false
                                        } }
                                    >
                                        {customersLogos4.map((e, i) => {
                                            return(
                                            <SplideSlide key={i}>
                                                <ImgContainer>
                                                    <Image
                                                        sizes="100%"
                                                        alt={"Logo azienda"}
                                                        key={i}
                                                        src={e} //getPath(e)
                                                        fill
                                                        style={{
                                                            filter: `grayscale(100%)`,
                                                            minWidth: '8.0rem',
                                                            maxHeight: '4rem'
                                                        }}
                                                        // priority
                                                    />
                                                </ImgContainer>
                                            </SplideSlide>
                                            )
                                        })}
                                    </Splide>
                                </ShowMb>
                                
                                </Container>
                            }

                            <div className="layer-story-box">

                            <LineDivider marginTop='5rem' marginBottom='5rem' condensed />

                            {/* Successes */}
                            {
                            (section.stile_carosello) ?
                                <>
                                <LightTitle textAlign='center' marginBottom='20px' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()}>{section.pretitolo}</LightTitle>
                                <HeadingDefault red textAlign='center' marginBottom='-50px'>
                                    {section.titolo}
                                </HeadingDefault>
                                <SubpillarProjectSlider
                                    data={data.projects}
                                    staticData={staticData}
                                    titolo=''
                                    categorie={data.categorie}
                                    hideBtn={true}
                                />
                                </>
                                
                            :
                                <Container maxWidth='1100px' marginBottom='70px' id={section.pretitolo.replaceAll(' ', '-').toLowerCase()}>
                                    <LightTitle textAlign='center' marginBottom='20px'>{section.pretitolo}</LightTitle>
                                    <HeadingDefault red textAlign='center' marginBottom='50px'>
                                        {section.titolo}
                                    </HeadingDefault>
                                    <HeadingSub as='p' textAlign='center' marginBottom='20px'>{parse(section.sottotitolo)}</HeadingSub>
                                    <Paragraph textAlign='center' marginBottom='50px'>
                                        <ReactMarkdown>
                                            {section.testo}
                                        </ReactMarkdown>
                                    </Paragraph>
                                    <HideMb>
                                        <div style={{paddingTop: '50px'}}>
                                            {
                                                section.successi.data.map((el, i) => {
                                                    return(
                                                        (i !== 0) ?
                                                            <div className="layer-story-content-wrapper" key={i}>
                                                                <Columns template='0.7fr 2.3fr 0.5fr' vCentered gap='80px' paddingLeft='50px' paddingRight='50px'>
                                                                    <Column>
                                                                        <Image layout="responsive" width={144} height={109} src={getPath(el.attributes?.logo_cliente?.data?.attributes?.url)} alt="Logo" style={{filter: 'grayscale(100%)'}} />
                                                                    </Column>
                                                                    <Column>
                                                                        <LightTitle marginBottom='10px' fontSize='18px'>{el.attributes.project_description}</LightTitle>
                                                                        <HeadingDefault as='h3' red fontSize='50px' marginBottom='10px'>
                                                                            {el.attributes.thumbnail_success.nome}
                                                                        </HeadingDefault>
                                                                        <HeadingSub as='p' marginBottom='20px'>{el.attributes.thumbnail_success.description}</HeadingSub>
                                                                        <a href={'/successi/' + el.attributes.slug} target="_blank">
                                                                            <RoundedThinLightButton inlineBlock className="active">
                                                                                scopri di più
                                                                                <span className="icon">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 61.957 61.592"
                                                                                    >
                                                                                        <g
                                                                                        id="Raggruppa_401"
                                                                                        data-name="Raggruppa 401"
                                                                                        transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                                                                                        >
                                                                                        <path
                                                                                            id="Tracciato_8"
                                                                                            data-name="Tracciato 8"
                                                                                            d="M0,43.811,21.905,21.905,0,0"
                                                                                            transform="translate(30.318 0)"
                                                                                            fill="none"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="5"
                                                                                        />
                                                                                        <line
                                                                                            id="Linea_23"
                                                                                            data-name="Linea 23"
                                                                                            x1="51.974"
                                                                                            transform="translate(0 22.155)"
                                                                                            fill="none"
                                                                                            strokeLinecap="round"
                                                                                            strokeWidth="5"
                                                                                        />
                                                                                        </g>
                                                                                    </svg>
                                                                                </span>
                                                                            </RoundedThinLightButton>
                                                                        </a>
                                                                    </Column>
                                                                    <Column>
                                                                        <BackgroundImgContainer width='120px' height='120px' brRadius='50%' bgImg={`url(${getPath(el.attributes.thumbnail_success.immagine.data.attributes.url)})`} />
                                                                    </Column>
                                                                </Columns>
                                                                <LineDivider marginTop='30px' marginBottom='30px' />
                                                            </div>
                                                        :
                                                            <>
                                                                <Columns template='0.7fr 2.3fr 0.5fr' vCentered gap='80px' paddingLeft='50px' paddingRight='50px'>
                                                                    <Column>
                                                                        <Image layout="responsive" width={144} height={109} src={getPath(el.attributes?.logo_cliente?.data?.attributes?.url)} alt="Logo" style={{filter: 'grayscale(100%)'}} />
                                                                    </Column>
                                                                    <Column>
                                                                        <LightTitle marginBottom='10px' fontSize='18px'>{el.attributes.project_description}</LightTitle>
                                                                        <HeadingDefault as='h3' red fontSize='50px' marginBottom='10px'>
                                                                            {el.attributes.thumbnail_success.nome}
                                                                        </HeadingDefault>
                                                                        <HeadingSub as='p' marginBottom='20px'>{el.attributes.thumbnail_success.description}</HeadingSub>
                                                                        <a href={'/successi/' + el.attributes.slug} target="_blank">
                                                                            <RoundedThinLightButton inlineBlock className="active">
                                                                                scopri di più
                                                                                <span className="icon">
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 61.957 61.592"
                                                                                    >
                                                                                        <g
                                                                                        id="Raggruppa_401"
                                                                                        data-name="Raggruppa 401"
                                                                                        transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                                                                                        >
                                                                                        <path
                                                                                            id="Tracciato_8"
                                                                                            data-name="Tracciato 8"
                                                                                            d="M0,43.811,21.905,21.905,0,0"
                                                                                            transform="translate(30.318 0)"
                                                                                            fill="none"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="5"
                                                                                        />
                                                                                        <line
                                                                                            id="Linea_23"
                                                                                            data-name="Linea 23"
                                                                                            x1="51.974"
                                                                                            transform="translate(0 22.155)"
                                                                                            fill="none"
                                                                                            strokeLinecap="round"
                                                                                            strokeWidth="5"
                                                                                        />
                                                                                        </g>
                                                                                    </svg>
                                                                                </span>
                                                                            </RoundedThinLightButton>
                                                                        </a>
                                                                    </Column>
                                                                    <Column>
                                                                        <BackgroundImgContainer width='120px' height='120px' brRadius='50%' bgImg={`url(${getPath(el.attributes.thumbnail_success.immagine.data.attributes.url)})`} />
                                                                    </Column>
                                                                </Columns>
                                                                <LineDivider marginTop='30px' marginBottom='30px' />
                                                            </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </HideMb>
                                    {/* Mobile */}
                                    <ShowMb>
                                        <Wrapper paddingTop='50px' mobile='padding-top: 30px;'>
                                            {
                                                section.successi.data.map((el, i) => {
                                                    return(
                                                        <div key={i}>
                                                            <Image layout="responsive" width={144} height={109} src={getPath(el.attributes?.logo_cliente?.data?.attributes?.url)} alt="Logo" style={{width: '100%', maxWidth: '210px', filter: 'grayscale(100%)', marginLeft: '-23px'}} />
                                                            <HideMb>
                                                                <LightTitle marginBottom='10px' fontSize='20px !important' marginTop='-20px'>{el.attributes.project_description}</LightTitle>
                                                            </HideMb>
                                                            <HeadingDefault as='h3' red fontSize='50px !important' marginBottom='10px'>
                                                                {el.attributes.thumbnail_success.nome}
                                                            </HeadingDefault>
                                                            <HeadingSub as='p' marginBottom='20px' fontSize='20px !important'>{el.attributes.thumbnail_success.description}</HeadingSub>
                                                            <a href={'/successi/' + el.attributes.slug} target="_blank">
                                                                <RoundedThinLightButton inlineBlock className="active" mobile='padding: 10px 30px;'>
                                                                    scopri di più
                                                                    <span className="icon">
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 61.957 61.592"
                                                                        >
                                                                            <g
                                                                            id="Raggruppa_401"
                                                                            data-name="Raggruppa 401"
                                                                            transform="matrix(-0.719, 0.695, -0.695, -0.719, 73.105, 20.179)"
                                                                            >
                                                                            <path
                                                                                id="Tracciato_8"
                                                                                data-name="Tracciato 8"
                                                                                d="M0,43.811,21.905,21.905,0,0"
                                                                                transform="translate(30.318 0)"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="5"
                                                                            />
                                                                            <line
                                                                                id="Linea_23"
                                                                                data-name="Linea 23"
                                                                                x1="51.974"
                                                                                transform="translate(0 22.155)"
                                                                                fill="none"
                                                                                strokeLinecap="round"
                                                                                strokeWidth="5"
                                                                            />
                                                                            </g>
                                                                        </svg>
                                                                    </span>
                                                                </RoundedThinLightButton>
                                                            </a>
                                                            <LineDivider marginTop='30px' marginBottom='30px' mobile='margin-top: 30px; margin-bottom: 30px;' />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Wrapper>
                                    </ShowMb>
                                </Container>
                            }
                            </div>
                        </>
                    )
                } else if (section.key === 'FAQ') {
                    return (
                        <>
                            {/* FAQ */}
                            <Container maxWidth='1000px' id={section.sottotitolo.replaceAll(' ', '-').toLowerCase()} mobile='margin-top: 70px;'>
                                <LightTitle fontSize='18px' marginBottom='2rem' textAlign='center'>{section.sottotitolo}</LightTitle>
                                <HeadingDefault red textAlign='center' marginBottom='50px'>
                                    {section.titolo}
                                </HeadingDefault>
                                <Subpillar2Faq layers={section.domande} />
                            </Container>
                        </>
                    )
                }

            })
        }

        <RedLinks
          data=''
          list={data.list}
          categorizedList={data.categorizedList}
          catTabs={data.catTabs}
          catContent={data.catContent}
          mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
        />
        {/* Timeline here */}
        {timelineData && <Timeline data={timelineData} />}
        <LineDivider marginTop='5rem' marginBottom='5rem' condensed />
        
        {/* Form */}
        <div id="richiedi-consulenza">
            <ContactForm
            headingCopy={headingCopy}
            mt="clamp(2.00rem, calc(0.06rem + 4.28vw), 10.00rem)"
            />
        </div>

        {/* Footer */}
        <Footer staticData={staticData} />
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

const OverflowVisibile = styled.div`
    div {
        overflow: visible;
    }
`
//NEW
const ImgContainer = styled.div`
  img {
    object-fit: contain;
    position: relative !important;
    filter: opacity(0.8);
    min-height: 100px;
    max-width: 7.5rem;
    display: block;
    margin: auto;
  }

  @media screen and (max-width:767px) {
    img {
        min-height: 60px !important;
    }
  }
`

const RowRedLink = styled(RedLink)`
  display: inline-flex;
  align-items: center;
  gap: 0px;
`;