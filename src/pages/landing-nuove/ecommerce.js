import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { useForm } from "react-hook-form";
import ImageSlider from "@/components/ImageSlider";
import Divider from "@/components/Divider";
import Logo from "@/components/utils/Logo";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import getPath from "@/utils/getPath";
import Questionnaire from "@/components/Questionnaire";
import Image from "next/image";
import Specialist from "@/components/Specialist";
import LpFOoter from "@/components/LpFooter";
import React, { useEffect, useRef, useState } from "react";
import toSlugText from "@/utils/toSlugText";
import PrimaryButton from "@/components/utils/PrimaryButton";
import ReactMarkdown from "react-markdown";
import LpHeader from "@/components/LpHeader";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import DinamicDesktopImages from "@/components/DinamicImages";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Results from "@/components/Results";
import LpFooter from "@/components/LpFooter";
import Goals from "@/components/Goals";
import Layers from "@/components/Layers";
import JournalChapter from "@/components/JournalChapter";
import Arrow from "@/components/utils/Arrow";
import ToggleAudioIcons from "@/components/utils/ToggleAudioIcons";
import RestartVideoIcon from "@/components/utils/RestartVideoIcon";
import splitText from "@/utils/splitText";
import Review from "@/components/Review";
import Link from "next/link";
import mapImages from "@/components/utils/mapImages";
import FooterDinamicImages from "@/components/FooterDinamicImages";
import StaticImages from "@/components/StaticImages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/bundle";

import Head from "next/head";


gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

export async function getStaticProps() {
  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/landing-principale?populate=deep,5`,
    },
  ];
  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  if (data && !data.page)
    return {
      notFound: true,
    };

  return { props: { data, staticData, pageName: "landing" } };
}

export default function LpPrincipale({ data, staticData }) {
  const main = data.page.attributes;
  const {
    hero_titolo,
    bio_name,
    bio_desc,
    stats_desc,
    reviews_title,
    bio_links,
    video_meta,
    video,
    results,
    button,
    reviews,
    livelli,
    hero_slider,
    footer_slider,
    timeline_image,
  } = main;
  const [isPlaying, setIsPlaying] = useState(true);
  const videoChildRef = useRef();
  const handleRestartClick = () => {
    if (videoChildRef.current) {
      videoChildRef.current.currentTime = 0;
      videoChildRef.current.play();
    }
  };

  const certificazioni = mapImages(staticData.footer.certificazioni);

  const [bioIsActive, setBioIsActive] = useState(false);
  const [statsIsActive, setStatsIsActive] = useState(true);

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

  const [readMore, setReadMore] = useState(false);

  return (
    <Wrapper>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <SecondHeader>
        <span>
          22 commerce hanno già scelto netstrategy negli ultimi 90 giorni
        </span>
      </SecondHeader>
      <Banner>
        <DinamicDesktopImages mobileSmall={true} />
      </Banner>
      {/* <LpHeader /> */}
      <HeroLanding>
        <h1 className="title">{splitText(hero_titolo)}</h1>
        <HeroLandingContent>
          <Bio className={bioIsActive ? "active" : ""}>
            <div
              className="section-title"
              onClick={() => {
                setBioIsActive(!bioIsActive);
              }}
            >
              <Arrow color="#000" />
              SCOPRI LA BIO DI STEFANO
            </div>
            <Name>
              <div className="info">
                <svg width="218.49" height="34.652" viewBox="0 0 218.49 34.652">
                  <defs>
                    <clipPath id="clip-path">
                      <rect
                        id="Rettangolo_16"
                        dataname="Rettangolo 16"
                        width="218.49"
                        height="34.652"
                        fill="none"
                      />
                    </clipPath>
                  </defs>
                  <g
                    id="Raggruppa_29"
                    dataname="Raggruppa 29"
                    clipPath="url(#clip-path)"
                  >
                    <path
                      id="Tracciato_1"
                      dataname="Tracciato 1"
                      d="M59.681,35a3.746,3.746,0,0,0-3.008,2.022l-9.18,18.713h3.793a3.745,3.745,0,0,0,3.008-2.022L63.474,35Z"
                      transform="translate(-36.305 -26.755)"
                      fill="#fc1333"
                    />
                    <path
                      id="Tracciato_2"
                      dataname="Tracciato 2"
                      d="M10.916,70.046a3.746,3.746,0,0,0-3.008,2.022L0,88.2H3.793A3.745,3.745,0,0,0,6.8,86.175l7.909-16.129Z"
                      transform="translate(0 -53.545)"
                      fill="#fc1333"
                    />
                    <path
                      id="Tracciato_3"
                      dataname="Tracciato 3"
                      d="M108.465,0a3.746,3.746,0,0,0-3.008,2.022L95.02,23.293h3.793a3.745,3.745,0,0,0,3.008-2.022L112.258,0Z"
                      transform="translate(-72.635)"
                      fill="#fc1333"
                    />
                    <path
                      id="Tracciato_4"
                      dataname="Tracciato 4"
                      d="M219.412,41.8h3.536V24.584h-3.536Zm-3.482-10.77h10.5V28.283h-10.5Zm-6.061.449a2.878,2.878,0,0,1,1.292,2.162h-9.193a3.825,3.825,0,0,1,1.578-2.108,6.441,6.441,0,0,1,6.324-.054m-.136,7.343a6.077,6.077,0,0,1-2.815.585,6.432,6.432,0,0,1-2.625-.489,4.34,4.34,0,0,1-1.741-1.333,3.9,3.9,0,0,1-.775-1.877H214.67a8.616,8.616,0,0,0-.721-4.338,5.5,5.5,0,0,0-2.625-2.543,10.292,10.292,0,0,0-4.433-.843,11.388,11.388,0,0,0-4.556.843,6.887,6.887,0,0,0-3.033,2.434,6.607,6.607,0,0,0-1.088,3.822,6.423,6.423,0,0,0,1.115,3.808,6.984,6.984,0,0,0,3.1,2.407,11.773,11.773,0,0,0,4.57.829,10.819,10.819,0,0,0,3.916-.626,6.3,6.3,0,0,0,2.543-1.713,4.883,4.883,0,0,0,1.156-2.475h-3.427a2.79,2.79,0,0,1-1.455,1.509M179.384,24.2h-3.618V41.8h3.618V27.44l-1.142.463,14.225,13.9h3.617V24.2h-3.617v14.47l1.142-.462Z"
                      transform="translate(-134.359 -18.501)"
                      fill="#fc1333"
                    />
                    <path
                      id="Tracciato_5"
                      dataname="Tracciato 5"
                      d="M518.466,27.136l-5.249,11.505L509.1,46.331h3.672l9.477-19.194Zm-6.2,13.518,3.046-.544-5.848-12.974H505.71Zm-18.917-5a3.088,3.088,0,0,1-1.374-1.1,3,3,0,0,1-.49-1.727,2.98,2.98,0,0,1,1.877-2.9,5.1,5.1,0,0,1,2.067-.394,4.982,4.982,0,0,1,2.067.394,3.16,3.16,0,0,1,1.36,1.129,3.114,3.114,0,0,1,.49,1.768,3,3,0,0,1-.49,1.727,3.09,3.09,0,0,1-1.374,1.1,5.15,5.15,0,0,1-2.054.381,5.221,5.221,0,0,1-2.081-.381m10.159,10.681V44.952a4.306,4.306,0,0,0-.68-2.57,3.663,3.663,0,0,0-1.972-1.333,10.752,10.752,0,0,0-3.114-.394h-4.433a1.585,1.585,0,0,1-.925-.231.74.74,0,0,1-.326-.639q0-.68.829-.911a11.667,11.667,0,0,1,2.543-.286l-1.713-.3a11.413,11.413,0,0,0-2.638.082,4.06,4.06,0,0,0-1.9.748,1.968,1.968,0,0,0-.707,1.646,2.419,2.419,0,0,0,.218,1.02,2.108,2.108,0,0,0,.707.83,3.642,3.642,0,0,0,1.319.544,9.372,9.372,0,0,0,2.053.19h4.216a4.192,4.192,0,0,1,2.19.49,1.872,1.872,0,0,1,.8,1.741v.753Zm-4.175-8.41a5.6,5.6,0,0,0,2.543-1.931,5.1,5.1,0,0,0,.9-3.033,3.627,3.627,0,0,0-.5-1.918,5.473,5.473,0,0,0-1.319-1.469A9.129,9.129,0,0,0,499.21,28.5l.082.19a20.661,20.661,0,0,0,2.516.8,10.434,10.434,0,0,0,2.815.34V27.164l-6.827-.027q-.571-.136-1.156-.218a8.79,8.79,0,0,0-1.21-.082,9.713,9.713,0,0,0-3.93.734,5.829,5.829,0,0,0-2.57,2.067,5.514,5.514,0,0,0-.9,3.155,5.315,5.315,0,0,0,.925,3.155,5.643,5.643,0,0,0,2.6,1.972,11.686,11.686,0,0,0,7.779,0m-18.087-7.589a2.878,2.878,0,0,1,1.292,2.162h-9.193a3.827,3.827,0,0,1,1.578-2.108,6.442,6.442,0,0,1,6.324-.054m-.136,7.344a6.074,6.074,0,0,1-2.815.585,6.428,6.428,0,0,1-2.625-.49,4.34,4.34,0,0,1-1.741-1.333,3.894,3.894,0,0,1-.775-1.877h12.893a8.619,8.619,0,0,0-.721-4.338A5.5,5.5,0,0,0,482.7,27.68a10.289,10.289,0,0,0-4.433-.843,11.384,11.384,0,0,0-4.556.843,6.887,6.887,0,0,0-3.033,2.434,6.6,6.6,0,0,0-1.088,3.821,6.424,6.424,0,0,0,1.115,3.808,6.983,6.983,0,0,0,3.1,2.407,11.772,11.772,0,0,0,4.569.829,10.821,10.821,0,0,0,3.917-.625,6.3,6.3,0,0,0,2.543-1.714,4.885,4.885,0,0,0,1.156-2.475h-3.427a2.79,2.79,0,0,1-1.455,1.509m-19.715,2.978h3.536V23.437h-3.536Zm-3.482-10.771h10.5V27.136h-10.5Zm-5.793,7.29q0,.789.054,1.6t.19,1.877h3.291V27.136h-3.536Zm-7.684.517a4.09,4.09,0,0,1-1.673-1.51,4.221,4.221,0,0,1-.6-2.271,4.121,4.121,0,0,1,1.251-3.141,4.9,4.9,0,0,1,3.509-1.183,6.892,6.892,0,0,1,2.76.5,4.015,4.015,0,0,1,1.8,1.469,4.171,4.171,0,0,1,.639,2.353A3.994,3.994,0,0,1,449.7,37.69a6.523,6.523,0,0,1-2.774.544,5.433,5.433,0,0,1-2.489-.544m4.42,2.625a5.765,5.765,0,0,0,2.067-1.687,7.378,7.378,0,0,0,1.169-2.285,8.25,8.25,0,0,0,.381-2.434,9.455,9.455,0,0,0-.653-3.59,5.413,5.413,0,0,0-2.081-2.543,6.76,6.76,0,0,0-3.767-.938,8,8,0,0,0-3.794.884,6.805,6.805,0,0,0-2.652,2.462,7.548,7.548,0,0,0-.013,7.412,6.715,6.715,0,0,0,2.611,2.475,7.608,7.608,0,0,0,3.658.884,6.815,6.815,0,0,0,3.074-.639M437.5,26.837a4.753,4.753,0,0,0-2.094.435,4.912,4.912,0,0,0-1.523,1.129,6.676,6.676,0,0,0-1.006,1.442,8.308,8.308,0,0,0-.571,1.387,5.25,5.25,0,0,0-.218.966l.027,1.5a5.5,5.5,0,0,1,.952-1.632,5.552,5.552,0,0,1,4.433-2.013Zm-8.731,13.817H432.3V27.136h-3.536Zm-9.275,0h3.536V23.437H419.49Zm-3.481-10.771h10.5V27.136h-10.5Zm-18.4,6.365a5.535,5.535,0,0,0,.966,1.686,7.458,7.458,0,0,0,1.768,1.55,9.371,9.371,0,0,0,2.584,1.129,15.071,15.071,0,0,0,7.928-.231,5.29,5.29,0,0,0,2.557-1.836,4.733,4.733,0,0,0,.83-2.788,4.547,4.547,0,0,0-.49-2.2,4.058,4.058,0,0,0-1.4-1.482,8.306,8.306,0,0,0-2.176-.952,20.235,20.235,0,0,0-2.815-.585q-1.659-.245-2.774-.49a10.717,10.717,0,0,1-1.768-.517,2.149,2.149,0,0,1-.925-.639,1.4,1.4,0,0,1-.272-.857,1.8,1.8,0,0,1,1.129-1.768,6.918,6.918,0,0,1,2.87-.517,6.21,6.21,0,0,1,3.114.707,2.684,2.684,0,0,1,1.346,2.312h3.536a5.215,5.215,0,0,0-2-4.447,9.285,9.285,0,0,0-5.861-1.618,12.221,12.221,0,0,0-4.27.653,5.683,5.683,0,0,0-2.625,1.822,4.386,4.386,0,0,0-.884,2.72,3.914,3.914,0,0,0,.585,2.162,4.921,4.921,0,0,0,1.6,1.537,9.778,9.778,0,0,0,2.353,1.02,20.176,20.176,0,0,0,2.829.612q1.9.272,3.074.531a4.761,4.761,0,0,1,1.714.653,1.31,1.31,0,0,1,.544,1.129,2.026,2.026,0,0,1-.435,1.306,2.776,2.776,0,0,1-1.333.843,7.337,7.337,0,0,1-2.285.3,8.393,8.393,0,0,1-2.747-.421,5.067,5.067,0,0,1-1.972-1.17,2.793,2.793,0,0,1-.857-1.673h-3.672a3.82,3.82,0,0,0,.231,1.523"
                      transform="translate(-303.757 -17.355)"
                    />
                  </g>
                </svg>
                {splitText(bio_name)}
              </div>
              <ReactMarkdown children={bio_desc} />
            </Name>
            <Links>
              {bio_links.map(({ link, text }, i) =>
                link.startsWith("#") ? (
                  <Link
                    href={link}
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: "#testimonianze", offsetY: 100 },
                        ease: "Power3.easeOut",
                      });
                    }}
                  >
                    <Arrow color="#000" />
                    {text}
                  </Link>
                ) : (
                  <Link href={link} key={i} target="_blank">
                    <Arrow color="#000" />
                    {text}
                  </Link>
                )
              )}
            </Links>
          </Bio>
          <div className="video">
            <VideoContainer>
              <video
                loop
                autoPlay
                preload="auto"
                playsInline
                muted={isPlaying}
                ref={videoChildRef}
                title={
                  video_meta?.meta_name
                    ? video_meta.meta_name
                    : "Video fai crescere ecommerce"
                }
                description={
                  video_meta?.meta_description
                    ? video_meta?.meta_description
                    : ""
                }
                duration={
                  video_meta?.meta_duration ? video_meta?.meta_duration : ""
                }
                thumbnail={
                  video_meta.meta_thumbnail?.data
                    ? getPath(video_meta.meta_thumbnail.data?.attributes?.url)
                    : ""
                }
                poster={getPath(
                  video_meta.meta_thumbnail?.data?.attributes?.url
                )}
              >
                <source src={getPath(video.data.attributes.url)} />
              </video>
              <div
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
              >
                <ToggleAudioIcons
                  bottom="-30px"
                  right="-30px"
                  isMutedTrigger={isPlaying}
                />
              </div>
              <div onClick={handleRestartClick}>
                <RestartVideoIcon
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                  }}
                  top="-30px"
                  left="-30px"
                />
              </div>
            </VideoContainer>
            <div
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: button.link, offsetY: 100 },
                  ease: "Power3.easeOut",
                });
              }}
              className="video-btn-wrapper"
            >
              <PrimaryButton>{button.text}</PrimaryButton>
            </div>
          </div>
          <ReactMarkdown className="disclaimer" children={stats_desc} />
          <div className="r-wrap">
            <Stats className={statsIsActive ? "active" : ""}>
              <div
                className="section-title"
                onClick={() => {
                  setStatsIsActive(!statsIsActive);
                  setBioIsActive(false);
                }}
              >
                <Arrow color="#000" />
                SCOPRI I RISULTATI DI VENDITA
              </div>
              {results.map(({ figure, desc }, i) => (
                <Risultato key={i}>
                  <span className="figure">{figure}</span>
                  <span className="description">{desc} </span>
                </Risultato>
              ))}

              <div
                onClick={() => {
                  gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: button.link, offsetY: 100 },
                    ease: "Power3.easeOut",
                  });
                }}
                className="btn-wrapper"
              >
                <PrimaryButton>{button.text}</PrimaryButton>
              </div>
              <ReactMarkdown children={stats_desc} />
            </Stats>
            <BioT className={bioIsActive ? "active" : ""}>
              <div
                className="section-title"
                onClick={() => {
                  setBioIsActive(!bioIsActive);
                  setStatsIsActive(false);
                }}
              >
                <Arrow color="#000" />
                SCOPRI LA BIO DI STEFANO
              </div>
              <Name>
                <div className="info">{splitText(bio_name)}</div>
                <ReactMarkdown children={bio_desc} />
              </Name>
              <Links>
                {bio_links.map(({ link, text }, i) => (
                  <Link href={link} key={i}>
                    <Arrow color="#000" />
                    {text}
                  </Link>
                ))}
              </Links>
            </BioT>
            <div
              className="last-section-title"
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: "#testimonianze", offsetY: 100 },
                  ease: "Power3.easeOut",
                });
              }}
            >
              <Arrow color="#000" />
              SCOPRI LE TESTIMONIANZE
            </div>
            <div
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: button.link, offsetY: 100 },
                  ease: "Power3.easeOut",
                });
              }}
              className="r-wrap-btn-wrapper"
            >
              <PrimaryButton>{button.text}</PrimaryButton>
            </div>
          </div>
          <div
            className="last-section-title"
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: { y: "#testimonianze", offsetY: 100 },
                ease: "Power3.easeOut",
              });
            }}
          >
            <Arrow color="#000" />
            SCOPRI LE TESTIMONIANZE
          </div>
        </HeroLandingContent>
      </HeroLanding>
      <Certificazioni>
        <span className="cert-title">Certificazioni e riconoscimenti</span>
        <Desktop>
          <StaticImages imgs={certificazioni} />
        </Desktop>
        <Mobile>
          <FooterDinamicImages mt="2rem" imgs={certificazioni} />
        </Mobile>
      </Certificazioni>
      <ImageSlider data={hero_slider} mt="4rem" onlyDraggable />
      <Divider />
      <MethodContainer id="metodo-netstrategy">
        <div className="title">
          {splitText(`Come funziona il metodo 
        NetStrategy?`)}
        </div>
        <Method>
          <ImageContainer>
            <Image
              src={
                timeline_image.data
                  ? getPath(timeline_image.data.attributes.url)
                  : "/def1.webp"
              }
              fill
              sizes="100%"
              quality={100}
              alt={timeline_image?.data?.attributes?.alternativeText ? timeline_image?.data?.attributes?.alternativeText : "Immagine rappresentativa obiettivi"}
            />
          </ImageContainer>
          <MethodTimeline>
            <div className="timeline-item">
              <div className="title">Lavoriamo su visite e traffico</div>
              <div className="desc">
                Tramite strategie di SEO (posizionamento organico), SEM
                (posizionamento sponsorizzato) e attività di comunicazione
                efficace sui social (organici e sponsorizzati) moltiplichiamo
                esponenzialmente il volume di visite giornaliere che raggiunge
                il tuo sito eCommerce
              </div>
            </div>
            <div className="timeline-item">
              <div className="title">Miglioriamo il tasso di conversione</div>
              <div className="desc">
                Una volta incrementate le visite giornaliere del tuo eCommerce,
                dobbiamo trasformare queste visite in Clienti. Studiamo quindi
                il percorso di conversione dell’utente, capiamo in quali fasi
                abbandona l’acquisto ed ottimizziamo l’esperienza utente
                complessiva lato UX \ UI.
              </div>
            </div>
            <div className="timeline-item">
              <div className="title">Incrementiamo l’ordine medio</div>
              <div className="desc">
                A questo punto il tuo sito avrà visite e ordini da nuovi
                Clienti, ma probabilmente il valore unitario dell’ordine non
                sarà altissimo. Sfruttando i principi psicologici di scarsità,
                urgenza e riprova sociale forniamo una serie di stimoli
                all’utente per acquistare più prodotti nella stessa transazione.
              </div>
            </div>
            <div className="timeline-item">
              <div className="title">Fidelizziamo i clienti</div>
              <div className="desc">
                Acquisiti nuovi clienti (e clienti alto spendenti) è
                fondamentale mantenerli attivi e “caldi” per un prossimo
                riacquisto. Con azioni di marketing automation e customer
                loyalty instauriamo una relazione di fiducia con i clienti e
                manteniamo in loro un ricordo acceso del tuo eCommerce,
                stimolandoli sempre a nuove occasioni di contatto.
              </div>
            </div>
          </MethodTimeline>
        </Method>
      </MethodContainer>
      <Divider />
      <ReviewsSection id="testimonianze">
        <div className="title">
          <div className="title-wrapper">{splitText(reviews_title)}</div>
        </div>
        {windowWidth > 800 ? (
          <Reviews>
            {reviews.map((data, i) => (
              <Review key={i} data={data}></Review>
            ))}
          </Reviews>
        ) : (
          <>
            <Swiper
              spaceBetween={25}
              modules={[Pagination]}
              slidesPerView={1}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              draggable={true}
              grabCursor={true}
              loop={true}
              pagination={{
                enabled: true,
                clickable: true,
              }}
              onSlideChange={() => {
                setReadMore(false);
              }}
            >
              {reviews.map((data, i) => (
                <SwiperSlide key={i}>
                  <Review
                    data={data}
                    readMore={readMore}
                    handleChange={() => {
                      setReadMore(!readMore);
                    }}
                  ></Review>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </ReviewsSection>
      <DinamicDesktopImages />
      <Divider />
      <section id="perche-netstrategy">
        <Layers data={livelli} noSlider={true} titleSmall={true} />
      </section>
      <Divider />
      <ContactForm
        formType="landing"
        campaign_name="ecommerce"
        headingCopy={{
          title: `It's time
				to connect.`,
          subtitle: `Compila il modulo 
				per ricevere un'analisi di fattibilità gratuita.`,
        }}
      />
      <ImageSlider mt="4rem" data={footer_slider} onlyDraggable />
      {windowWidth < 600 && (
        <svg
          className="arrow-slider"
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
              strokeWidth="6"
            ></path>
            <line
              id="Linea_23"
              data-name="Linea 23"
              x1="51.974"
              transform="translate(0 22.155)"
              fill="none"
              strokeLinecap="round"
              strokeWidth="6"
            ></line>
          </g>
        </svg>
      )}
      <Footer staticData={staticData} minimal />
      <LpFooter />
    </Wrapper>
  );
}

const SecondHeader = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.main};
  /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40}; */
  font-size: 21px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 10px 0;
  color: ${({ theme: { colors } }) => colors.whiteColor};
  background-color: ${({ theme: { colors } }) => colors.primaryColor};
  @media (max-width: 800px) {
    font-family: ${({ theme: { fonts } }) => fonts.main_light};
    letter-spacing: 1.5px;
    font-size: 17px;
  }
`;

const Wrapper = styled.div`
  overflow-x: hidden;
  .chapters-container {
    ${centerContent}
  }

  p {
    margin-top: 1.5rem;
  }

  .arrow-slider {
    stroke: red;
    width: 45px;
    rotate: 224deg;
    position: relative;
    left: 81vw;
    top: -62px;
    translate: 0;
    animation: anim 1s infinite;
    @keyframes anim {
      50% {
        translate: 20px;
      }
      100% {
        translate: 0;
      }
    }
  }
`;

const Banner = styled.div`
  > div {
    height: 55px !important;
  }
  /* display: none;
  @media (max-width: 800px) {
    display: block;
  } */
`;

const HeroLanding = styled.div`
  ${centerContent}
  margin-bottom: 7rem;
  margin-top: 1rem;
  .title {
    margin-bottom: 5rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    text-align: center;
    span {
      display: block;
    }
    @media (max-width: 800px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_40_70};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_40_70};
      margin-bottom: 3rem;
    }
  }
`;

const Desktop = styled.div`
  display: block;
  @media (max-width: 1280px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  @media (max-width: 1280px) {
    display: block;
  }
`;

const Certificazioni = styled.div`
  .cert-title {
    ${centerContent};
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: 20px;
    color: ${({ theme: { colors } }) => colors.primaryColor};
    padding-bottom: 0.75rem;
  }
`;

const HeroLandingContent = styled.div`
  display: flex;
  gap: 5rem;

  .video {
    width: 42%;
    &-btn-wrapper {
      display: none;
      margin-top: 4rem;
      text-align: center;
      margin-bottom: 1.8rem;
      > button {
        padding: 27px 33px !important;
      }
    }
  }

  .r-wrap {
    width: 30%;
    &-btn-wrapper {
      display: none;
      > button {
        padding: 27px 33px !important;
      }
    }
  }

  .last-section-title {
    display: none;
  }

  @media (max-width: 1300px) {
    .video {
      order: 1;
      width: 50%;
    }
    .r-wrap {
      width: 50%;
      order: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-btn-wrapper {
        display: block;
        order: 4;
        margin-top: 2rem;
      }
      .last-section-title {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 20px;
        order: 4;
        border-bottom: 1px solid #000;
        padding-bottom: 0.5rem;
      }
    }
    padding-inline: 20px;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 0;
    .video {
      width: 100%;
      margin: 0 auto;
      order: 1;
      &-btn-wrapper {
        display: block;
        order: 2;
        > button {
          font-size: 1.1rem !important;
        }
      }
    }

    .r-wrap {
      width: 100%;
      order: 2;
      &-btn-wrapper {
        display: none;
      }
      .last-section-title {
        display: none;
      }
    }
    .last-section-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 20px;
      order: 4;
      border-bottom: 1px solid #000;
      padding-bottom: 0.5rem;
    }
  }
  .disclaimer {
    display: none;
    order: 2;
    p {
      font-size: 14px;
      line-height: 16px;
      margin-top: 0;
      margin-bottom: 2.5rem;
    }
    @media (max-width: 800px) {
      display: block;
    }
  }
`;

const Name = styled.div`
  margin-bottom: 2rem;
  .info {
    svg {
      margin-bottom: 0.8rem;
    }

    span {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      text-transform: uppercase;
    }

    & span:last-child {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
    @media (max-width: 1300px) {
      display: none;
    }
  }

  span {
    display: block;
    line-height: 1.1em;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const Links = styled.div`
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

const Bio = styled.div`
  width: 28%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 1.25rem;
  .section-title {
    display: none;
  }

  @media (max-width: 1300px) {
    display: none;
  }

  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    order: 3;
    border-bottom: 1px solid #000;
    padding-bottom: 0.5rem;

    .section-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 20px;
    }

    ${Name}, ${Links} {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
      transition: all 600ms;
      user-select: none;
      pointer-events: none;
    }
    &.active {
      ${Name}, ${Links} {
        user-select: initial;
        pointer-events: initial;
        opacity: 1;
        max-height: 1000px;
      }
    }
  }
`;

const BioT = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 1.25rem;
  .section-title {
    display: none;
  }

  @media (max-width: 1300px) {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #000;
    padding-bottom: 0.5rem;

    .section-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 20px;
    }

    ${Name}, ${Links} {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
      transition: all 600ms;
      user-select: none;
      pointer-events: none;
    }
    &.active {
      ${Name}, ${Links} {
        user-select: initial;
        pointer-events: initial;
        opacity: 1;
        max-height: 1000px;
      }
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Risultato = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  .figure {
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_50_60};
    text-transform: uppercase;
  }
  .description {
    display: block;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: 20px;
    padding-bottom: 0.75rem;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.25rem;

  p {
    font-size: 14px;
    line-height: 16px;
    @media (max-width: 800px) {
      display: none;
    }
  }

  .section-title {
    display: none;
  }
  .btn-wrapper {
    margin-top: 2rem;
    > button {
      padding: 27px 33px !important;
    }
  }

  @media (max-width: 1300px) {
    width: 100%;
    order: 2;
    border-bottom: 1px solid #000;
    padding-bottom: 0.5rem;
    .btn-wrapper {
      display: none;
    }
    .section-title {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 20px;
    }

    ${Risultato}, p {
      opacity: 0;
      max-height: 0;
      transition: all 600ms;
      margin-top: 0;
      user-select: none;
      pointer-events: none;
    }
    &.active {
      .section-title {
        margin-bottom: 1.5rem;
      }
      ${Risultato}, p {
        opacity: 1;
        max-height: 1000px;
        user-select: initial;
        pointer-events: initial;
      }
      p {
        margin-block: 1.5rem;
      }
    }
  }

  @media (max-width: 800px) {
  }
`;

const VideoContainer = styled.div`
  /* width: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem); */
  /* height: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem); */
  aspect-ratio: 1 / 1;
  justify-self: center;
  position: relative;
  /* @media (max-width: 550px) {
    width: 100%;
    height: 100%;
  } */

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative !important;
    display: block;
    border-radius: 1rem;
  }
`;

const MethodContainer = styled.div`
  ${centerContent}
  > .title {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_80_130};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_80_130};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    margin-bottom: 5rem;
    span {
      display: block;
    }
    @media (max-width: 1400px) {
      width: 100%;
      span {
        display: inline;
      }
    }
    @media (max-width: 800px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      margin-bottom: 3rem;
    }
  }

  video {
    border-radius: 1rem;
  }
`;

const Method = styled.div`
  @media (min-width: 1300px) {
    display: flex;
    justify-content: space-between;
    gap: 5rem;
  }
`;

const ImageContainer = styled.div`
  display: none;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    aspect-ratio: 3 / 4;
  }

  @media (min-width: 1300px) {
    display: block;
    width: 33%;
    max-height: clamp(35rem, calc(-2.7rem + 38.92vw), 44rem); // 560px → 704px
    position: sticky;
    top: 7rem;
  }
`;

const MethodTimeline = styled.div`
  margin-left: 1.75rem;
  counter-reset: timeline;
  border-left: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  /* border-image: linear-gradient(180deg, rgba(2,0,36,0) 25%, rgba(2,0,35,1) 27%, rgba(6,6,13,1) 85%, rgba(6,6,13,0) 100%);*/
  border-image: linear-gradient(
      180deg,
      rgba(252, 19, 51, 0) 0%,
      rgba(252, 19, 51, 1) 10%,
      rgba(252, 19, 51, 1) 75%,
      rgba(6, 6, 13, 0) 92%
    )
    1 100%;

  .timeline-item {
    margin-bottom: 3rem;
    .title {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_35_50};
      color: ${({ theme: { colors } }) => colors.primaryColor};
      margin-bottom: 1rem;
      counter-increment: timeline;
      position: relative;
      padding-left: calc(25px + 1rem);

      &::before {
        content: "0" counter(timeline) "";
        position: absolute;
        top: 50%;
        left: 0;
        display: inline-block;
        font-size: ${({ theme: { fontSizes } }) => fontSizes.size_22_25};
        background-color: ${({ theme: { colors } }) => colors.primaryColor};
        color: ${({ theme: { colors } }) => colors.whiteColor};
        border-radius: 50%;
        aspect-ratio: 1 / 1;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
      }
    }
    .desc {
      padding-left: calc(25px + 1rem);
      font-family: ${({ theme: { fonts } }) => fonts.medium};
    }
  }
  @media (min-width: 1300px) {
    width: 60%;
  }
`;

const ReviewsSection = styled.div`
  ${centerContent}
  display: flex;
  gap: 3rem;

  .swiper-pagination {
    text-align: center;
    /* margin-top: 1.5rem; */
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    .swiper-pagination-bullet {
      margin: 0;
      background-color: ${({ theme: { colors } }) => colors.whiteColor};
      border: 1px solid ${({ theme: { colors } }) => colors.greyColor};
      width: 10px;
      height: 10px;
      &-active {
        background-color: ${({ theme: { colors } }) => colors.primaryColor};
        border: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
        scale: 1.3;
      }
    }
  }

  @media (max-width: 1400px) {
    flex-wrap: wrap;
  }
  > .title {
    width: 40%;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_80_130};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_80_130};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    .title-wrapper {
      font-family: inherit;
      position: sticky;
      top: 7rem;
    }
    span {
      display: block;
    }
    @media (max-width: 1400px) {
      width: 100%;
      span {
        display: inline;
      }
    }
    @media (max-width: 800px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    }
  }
  margin-bottom: 4rem;
`;
const Reviews = styled.div`
  width: 60%;
  @media (max-width: 1400px) {
    width: 100%;
  }
`;

const Consultente = styled.div`
  ${centerContent}
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
      margin-bottom: 2.5rem;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-family: ${({ theme: { fonts } }) => fonts.main};
      text-transform: uppercase;
    }
    .subtitle {
      margin-bottom: 2.5rem;
      p {
        max-width: 600px;
        font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_25};
        line-height: ${({ theme: { fontSizes } }) => fontSizes.size_22_28};
        font-family: ${({ theme: { fonts } }) => fonts.medium};
        margin-bottom: 1rem;
      }
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

const TestimonialsTitle = styled.h2`
  ${centerContent}
  margin-bottom: 3rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
  line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  text-transform: uppercase;
  text-align: center;
  max-width: 1000px;
`;

const RisultatiTitle = styled.div`
  ${centerContent}

  display: flex;

  & > * {
    width: 50%;
  }

  .title {
    h3 {
      margin-bottom: 2.5rem;
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-family: ${({ theme: { fonts } }) => fonts.main};
      text-transform: uppercase;
      max-width: 400px;
    }
  }

  .subtitle {
    p {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      margin-bottom: 3rem;
    }
  }

  @media (max-width: 1080px) {
    flex-wrap: wrap;
    & > * {
      width: 100%;
    }
  }
`;

const Risultati = styled.div`
  ${centerContent}
`;

const Quickstart = styled.div`
  ${centerContent}
  margin-top: 2rem;

  display: flex;

  & > * {
    width: 50%;
  }

  .title {
    h3 {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_35_50};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      max-width: 600px;
      margin-bottom: 3rem;
    }
  }

  .subtitle {
    p {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_25};
      line-height: ${({ theme: { fontSizes } }) => fontSizes.size_22_28};
      font-family: ${({ theme: { fonts } }) => fonts.medium};
      margin-bottom: 1rem;
      max-width: 600px;
      &:last-of-type {
        margin-bottom: 3rem;
      }
    }
  }

  @media (max-width: 1080px) {
    flex-wrap: wrap;
    & > * {
      width: 100%;
    }
  }
`;

// Goals
const HeadingGoals = styled.div`
  ${centerContent}
  /* margin-top: ${(props) => props.mt}; */

  h2 {
    margin-top: clamp(0rem, calc(-1.03rem + 4.4vw), 4.25rem);
    margin-bottom: clamp(0rem, calc(-1.03rem + 4.4vw), 4.25rem);
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_66_120};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    max-width: 1000px;
  }
`;

const BlogBtnWrapper = styled.div`
  ${centerContent}
`;

const Spacer = styled.div`
  width: 100%;
  @media (min-width: 1250px) {
    margin-bottom: 5rem;
  }
`;
