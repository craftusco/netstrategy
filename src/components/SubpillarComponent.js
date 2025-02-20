import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import Index from "@/components/Index";
import Specialist from "@/components/Specialist";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import List from "@/components/List";
import Goals from "@/components/Goals";
import CaseStudy from "@/components/CaseStudy";
import Layers from "@/components/Layers";
import Links from "@/components/Links";
import ImageSlider from "@/components/ImageSlider";
import ContactTitle from "@/components/utils/ContactTitle";
import { useState, useEffect } from "react";
import PrimaryButton from "@/components/utils/PrimaryButton";
import Cards from "@/components/Cards";
import ExtraText from "./ExtraText";
import AziendeTestimonial from "./AziendeTestimonial";
import Restyling from "./Restyling";
import DinamicDesktopImages from "./DinamicImages";
import TestimonialsSlider from "./TestimonialsSlider";
import gsap from "gsap";
import Review from "@/components/Review";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import splitText from "@/utils/splitText";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import SubpillarProjectSlider from "@/components/SubpillarProjectSlider";
import Head from "next/head";

import { usePathname } from "next/navigation";
import CertDinamicImages from "./CertDinamicImages";
import RedLinks from "./RedLinks";
import { Breadcrumb } from "./Breadcrumb";
import TeamSlider from "./TeamSlider";
import AccordionMobile from "./AccordionMobile";
import PushStructureData from "./PushStructureData";
import { useRouter } from "next/router";

const reviews = [
  {
    id: 1,
    titolo: "VisureItalia",
    desc: "Il team di NetStrategy ha focalizzato le attività verso obiettivi chiari e precisi, strutturando un audit SEO e fornendoci assistenza continua. Ci esponeva in anticipo la strategia da condurre nel tempo, verificando e monitorando costantemente i dati per portarci a raggiungere i nostri obiettivi.",
    autore: "Paolo Baita",
    posizione: "Amministratore  ",
    rating: "5.0",
    sito: "https://www.visureitalia.it",
    profile_image: {
      data: {
        id: 1773,
        attributes: {
          url: "/uploads/foto_recensioni_NS_Paolo_Baita_Visure_Italia_a9698249a4.jpg",
          alternativeText: null,
          name: "foto-recensioni-NS-Paolo-Baita-Visure-Italia.jpg",
          ext: ".jpg",
        },
      },
    },
    logo: {
      data: {
        id: 6097,
        attributes: {
          url: "/uploads/visure_italia_Net_Strategy_e1644f3ccf.png",
          alternativeText: null,
          name: "visure italia_NetStrategy.png",
          ext: ".png",
        },
      },
    },
  },
  {
    id: 3,
    titolo: "TopTuning",
    desc: "La strategia delineata da NetStrategy ha permesso alla nostra azienda di crescere notevolmente, sia in termini di fatturato che di customer base. Ogni anno il risultato che raggiungiamo cresce e a doppia cifra rispetto all'anno precedente. E noi continuiamo a confermare piena fiducia a NetStrategy.",
    autore: "Anthony Fois",
    posizione: "Amministratore",
    rating: "5.0",
    sito: "https://www.toptuning.it/it",
    profile_image: {
      data: {
        id: 1775,
        attributes: {
          url: "/uploads/foto_recensioni_NS_Anthony_Fois_Top_Tuning_0300890d46.jpg",
          alternativeText: null,
          name: "foto-recensioni-NS-Anthony-Fois-TopTuning.jpg",
          ext: ".jpg",
        },
      },
    },
    logo: {
      data: {
        id: 6131,
        attributes: {
          url: "/uploads/Top_Tuning_Net_Strategy_91b0b5b0a0.webp",
          alternativeText: null,
          name: "TopTuning_NetStrategy.webp",
          ext: ".webp",
        },
      },
    },
  },
  {
    id: 5,
    titolo: "LinkResearchTools",
    desc: "NetStrategy is LRT Certified Professionals and we are proud to welcome its to the club. With this case-study, NetStrategy delivered very useful information about today's market and I think every SEO can learn from his findings. ",
    autore: "Christoph C. Cemper",
    posizione: "Amministratore",
    rating: "5.0",
    sito: "https://www.linkresearchtools.com/",
    profile_image: {
      data: {
        id: 1779,
        attributes: {
          url: "/uploads/foto_recensioni_NS_Christoph_C_Cemper_Link_Research_Tools_b0c7124c2e.jpg",
          alternativeText: null,
          name: "foto-recensioni-NS-Christoph-C-Cemper-Link-Research-Tools.jpg",
          ext: ".jpg",
        },
      },
    },
    logo: {
      data: {
        id: 6101,
        attributes: {
          url: "/uploads/Link_Research_Tools_Net_Strategy_e23d125f94.png",
          alternativeText: null,
          name: "LinkResearchTools_NetStrategy.png",
          ext: ".png",
        },
      },
    },
  },
  {
    id: 7,
    titolo: "Dr. & Arch. Michele Perlini",
    desc: "NetStrategy lavora con noi da molti anni e tutto il team con cui siamo entrati in contatto è caratterizzato da una serietà e passione per il proprio lavoro difficilmente riscontrabile altrove. Per noi è fondamentale il risultato che riescono mensilmente ad ottenere per il nostro portale, grazie alla preparazione e al continuo aggiornamento.",
    autore: "Michele Perlini",
    posizione: "Amministratore",
    rating: "5.0",
    sito: "https://arcstudioperlini.com/",
    profile_image: {
      data: {
        id: 1785,
        attributes: {
          url: "/uploads/foto_recensioni_NS_Michele_Perini_Architetto_41cf9c770d.jpg",
          alternativeText: null,
          name: "foto-recensioni-NS-Michele-Perini-Architetto.jpg",
          ext: ".jpg",
        },
      },
    },
    logo: {
      data: {
        id: 6103,
        attributes: {
          url: "/uploads/michele_perlini_Net_Strategy_6764d3ba17.png",
          alternativeText: null,
          name: "michele perlini_NetStrategy.png",
          ext: ".png",
        },
      },
    },
  },
  {
    id: 9,
    titolo: "Cicalia",
    desc: "Cicalia è il primo supermercato online d'Italia che garantisce prodotti sempre freschi e una consegna rapida in tutto il Paese. Per iniziare questa nuova avventura ci serviva un appoggio forte ma soprattutto d'esperienza. Per questo ci sentiamo di ringraziare NetStrategy per la professionalità dimostrata e l'affidabilità che in tutti questi mesi non è mai venuta a mancare.",
    autore: "Simone Gotti",
    posizione: "Co-founder",
    rating: "5.0",
    sito: "https://www.cicalia.com/it/",
    profile_image: {
      data: {
        id: 1801,
        attributes: {
          url: "/uploads/foto_recensioni_NS_Simone_Gotti_Cicalia_f95b256a24.jpg",
          alternativeText: null,
          name: "foto-recensioni-NS-Simone-Gotti-Cicalia.jpg",
          ext: ".jpg",
        },
      },
    },
    logo: {
      data: {
        id: 6107,
        attributes: {
          url: "/uploads/cicalia_Net_Strategy_de675783a6.webp",
          alternativeText: null,
          name: "cicalia_NetStrategy.webp",
          ext: ".webp",
        },
      },
    },
  },
];

export default function SubpillarComponent({ data, staticData, breadcrumbLinks }) {

  // const staticData = useSelector((state) => state.staticDataSlice.value)
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

  /* button default */
  data.page.intro.bottone = {
    // testo: `${subpillar?.pre_titolo ? subpillar.pre_titolo : staticData.hero}. Contattaci!`,
    testo: `Contattaci`,
    is_contact: true,
    url: "#",
  };

  const subpillar = data.page;
  const list = data.list;
  const pillarData = data.pillar_data;
  const divider = pillarData.divisore
    ? [
        pillarData.divisore.sinistra,
        pillarData.divisore.centro,
        pillarData.divisore.destra,
      ]
    : ["building", "future", "togheter"];
  const testimonials = data.testimonials;

  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: subpillar.form_sottotitolo
      ? subpillar.form_sottotitolo
      : pillarData.form,
    paragraph: subpillar.form,
  };

  function testimonialsSplitText(string) {
    const newArr = [];
    const arr = string.split(" ");
    const spliced = arr.splice(0, 1);
    newArr.push(<span key={1}>{`${spliced} `}</span>);
    newArr.push(<span key={2}>{arr.join(" ")}</span>);
    return newArr;
  }

  // RECENSIONI
  const [readMore, setReadMore] = useState(false);

  // AB Testing

  // let slug_exceptions = [
  //   '/crm/email-marketing',
  //   '/social/social-media-marketing-agency',
  //   '/inbound-marketing/agenzia-content-marketing',
  //   '/ecommerce/agenzia-prestashop',
  //   '/seo/agenzia-seo-milano',
  // ];

  // let isException = false;
  // const pathname = usePathname();
  // if (slug_exceptions.includes(pathname)) {
  //   isException = true;
  // }

  // AB Testing

  let teamSliderData = data.culture.attributes.team.creators.data

  teamSliderData = teamSliderData.filter(el => { return el.attributes.ruolo == 'SEO Specialist' || el.attributes.ruolo == 'Head of SEO' })

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} pillarData={data?.pillar_data} />
        <style>
          {
            `
              @-webkit-keyframes slide-in-bottom {
                0% {
                  -webkit-transform: translateY(1000px);
                          transform: translateY(1000px);
                  opacity: 0;
                }
                100% {
                  -webkit-transform: translateY(0);
                          transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes slide-in-bottom {
                0% {
                  -webkit-transform: translateY(1000px);
                          transform: translateY(1000px);
                  opacity: 0;
                }
                100% {
                  -webkit-transform: translateY(0);
                          transform: translateY(0);
                  opacity: 1;
                }
              }

              .slide-in-bottom {
                -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s both;
                        animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s both;
              }
            `
          }
        </style>
      </Head>
      <LinkContainer>
        <BntSubpillar className="slide-in-bottom hidden-mb" onClick={(e) => {
          e.preventDefault();
          // location.href = "#contact";
          // document.getElementById("contact").scrollIntoView()
          gsap.to(window, {
            duration: .1,
            scrollTo: "#contact",
            ease: "Power3.easeOut",
          })
        }}>
          <div className='subpillar-btn left'>
            {subpillar?.pre_titolo ? subpillar.pre_titolo : staticData.hero}
          </div>
          <div className='subpillar-btn right'>
            Contattaci
          </div>
        </BntSubpillar>
        <HeroPages data={subpillar} staticData={staticData}>
          <ContactTitle
            pretitle={
              subpillar?.pre_titolo ? subpillar.pre_titolo : staticData.hero
            }
            title={subpillar.nome}
          />
        </HeroPages>
        {/* Breadcrumb */}
        <Breadcrumb links={breadcrumbLinks} />
        {/* Section */}
        <Divider words={divider} mt="4rem" />
        <Heading
          data={subpillar.intro}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          headingH3={true}
        />

        <>
          <CertDinamicImages mt={"4rem"} />

          <Cards
            data={subpillar.intro.media.data}
            labels={subpillar.intro.labels}
            mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
          />

          <DinamicDesktopImages mt={"4rem"} />
          {/* Index */}
          <Index
            title={staticData.index}
            data={subpillar.indice}
            subpillarData={subpillar}
            mt="clamp(4.38rem, calc(1.64rem + 11.65vw), 15.63rem)"
          />
        </>

        {/* Specialist */}
        <section id="specialist">
          <Divider words={divider} />
          <HeadingSpecialist>
            <h2>{staticData.specialist_titolo}</h2>
          </HeadingSpecialist>
          <Specialist
            data={subpillar.specialist.data?.attributes}
            mt="clamp(1.88rem, calc(1.72rem + 0.65vw), 2.5rem)"
            btnIsScroll
            staticData={staticData}
          />
        </section>
        {/* Team (SOLO PER SUBPILLAR AGENZIA SEO) */}
        {
          (data.page.slug === 'agenzia-seo') &&
            <TeamSlider
              mt="90px"
              data={teamSliderData}
              oneRow={true}
            />
        }
        {/* List */}
        {subpillar.elenco && (
          <>
            <Divider words={divider} />
            <List
              data={subpillar.elenco}
              mt="clamp(4.38rem, calc(1.64rem + 11.65vw), 15.63rem)"
            />
          </>
        )}
        {/* Offer */}
        {subpillar?.offerta && (
          <section id="offerta">
            <Divider words={divider} />
            <Heading
              data={subpillar.offerta}
              mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
            />
            <ImageSlider
              data={subpillar.offerta.media}
              mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
            />
          </section>
        )}
        {/* {windowWidth < 1300 && (
          <FullImage
            data={"/def11.webp"}
            mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
          />
        )} */}
        {/* Goals */}
        <section id="obbiettivi">
          {
            (subpillar?.obbiettivi) &&
              <>
                <Divider words={divider} />
                <HeadingGoals mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)">
                  <h2>{subpillar.obbiettivi && subpillar.obbiettivi.titolo}</h2>
                </HeadingGoals>
                <Goals
                  data={subpillar.obbiettivi}
                  mt="clamp(1rem, calc(0.18rem + 3.5vw), 4.38rem)"
                />
              </>
          }
        </section>
        {/* Aziende che ci hanno scelto */}
        {subpillar.obbiettivi && subpillar.obbiettivi?.loghi_aziende?.data && (
          <AziendeTestimonial
            mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
            titolo={subpillar.obbiettivi.titolo_loghi}
            data={subpillar.obbiettivi.loghi_aziende.data}
          />
        )}
        {/* Esempi Restyling*/}
        {subpillar.restyling && subpillar.restyling_heading && (
          <section id="restyling">
            <Divider words={divider} />
            <Restyling
              heading={subpillar.restyling_heading}
              data={subpillar.restyling}
            />
          </section>
        )}

        {/*testimonials && (
          <>
            <section id="restyling">
              <Divider words={divider} mt="4rem" />
              <HeadingSuccesses>
                <h2>
                  {testimonialsSplitText(staticData.testimonial_slider_title)}
                </h2>
              </HeadingSuccesses>
              <TestimonialsSlider
                data={testimonials}
                mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
              />
              <DinamicDesktopImages mt={"4rem"} />
            </section>
          </>
        )*/}

        {testimonials && (
          <>
            <section id="restyling">
              <Divider words={divider} mt="4rem" />
              <HeadingSuccesses>
                <h2>
                  {testimonialsSplitText(staticData.testimonial_slider_title)}
                </h2>
              </HeadingSuccesses>
              <TestimonialsSlider
                data={testimonials}
                mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
              />
              <DinamicDesktopImages mt={"4rem"} />
            </section>
          </>
        )}

        {/* Case study */}
        {
          (pillarData.pillar.data.attributes.slug !== 'crm') && 
            <section id="project_detail">
              <Divider words={divider} />
              {/*<CaseStudy
                data={subpillar.project_detail.data.attributes.thumbnail_success}
                btnText={subpillar.bottone_project_detail}
                mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
              />*/}
              {
                <SubpillarProjectSlider
                  data={data.projects}
                  staticData={staticData}
                  titolo={staticData.progetti_slider_title}
                  categorie={data.categorie}
                  mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
                />
              }
            </section>
        }
        {/* Layers */}
        {subpillar?.livelli != null && (
          <section id="livelli">
            <Divider words={divider} />
            {/* Servizi */}
            <Layers
              data={subpillar.livelli}
              mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
            />

            {/* Links */}
            <ImageSlider
              data={subpillar.collegamenti.immagini}
              mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
            />
            {subpillar.livelli && subpillar.livelli?.loghi_aziende?.data && (
              <AziendeTestimonial
                mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
                titolo={subpillar.livelli.titolo_loghi}
                data={subpillar.livelli.loghi_aziende.data}
              />
            )}
          </section>
        )}
        {/* Sezione Extra - FAQ */}
        {(subpillar.extra != null || subpillar.extra.length > 0) && (
          (windowWidth > 767) ?
            <section id="extra">
              <Divider words={divider} />
              <ExtraText
                data={subpillar.extra}
                title={subpillar.titolo_extra}
                // mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
              />
            </section>
          : 
            <section id="extra">
              <Divider words={divider} />
              <AccordionMobile
                data={subpillar.extra}
                title={subpillar.titolo_extra}
                isFaq={true}
                // mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
              />
            </section>
        )}
        {windowWidth < 551 && (
          <div
            className="contactUs"
            style={{
              textAlign: "center",
              marginTop: "4rem",
              marginBottom: "4rem",
            }}
            onClick={() =>
              gsap.to(window, {
                duration: 1,
                scrollTo: "#contact",
                ease: "Power3.easeOut",
              })
            }
            // TODO: aspettare componente button con proprietà is_contact da strapi per farlo diventare button scroll a contactform
          >
            <PrimaryButton>Contattaci</PrimaryButton>
          </div>
        )}
        {
          /*<Links
            data={subpillar.collegamenti}
            list={list}
            categorizedList={data.categorizedList}
            mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
          />*/
        }
        <RedLinks
          data={subpillar.collegamenti}
          list={list}
          categorizedList={data.categorizedList}
          catTabs={data.catTabs}
          catContent={data.catContent}
          mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
        />
        <Divider words={divider} />

        {/* Reviews */}
        {subpillar.show_testimonials && (
          <>
            <ReviewsSection id="testimonianze">
              <div className="title">
                <div className="title-wrapper">
                  {splitText(`I risultati 
                del metodo 
                netstrategy`)}
                </div>
              </div>
              {windowWidth > 800 ? (
                <div style={{ width: "50%", margin: "auto" }}>
                  <Swiper
                    spaceBetween={25}
                    modules={[Pagination, Autoplay]}
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
                    autoplay={{
                      delay: 3500, // ritardo in millisecondi tra le transizioni automatiche
                      disableOnInteraction: false, // continua l'autoplay anche dopo l'interazione dell'utente
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
                </div>
              ) : (
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
              )}
            </ReviewsSection>

            <Divider words={divider} />
          </>
        )}

        {/* Form */}
        <ContactForm
          headingCopy={headingCopy}
          mt="clamp(3.00rem, calc(1.30rem + 7.25vw), 10.00rem)"
        />
        {/* Footer */}
        <Footer staticData={staticData} />
      </LinkContainer>
    </>
  );
}

const LinkContainer = styled.div`
  & div > p a:not(:hover) {
    color: #fc1333;
    text-decoration: none;
  }
`;

const HeadingSpecialist = styled.div`
  ${centerContent}
  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;
    text-transform: uppercase;

    @media (min-width: 768px) {
      text-align: center;
    }
  }
`;

// Goals
const HeadingGoals = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  h2 {
    margin-top: clamp(0rem, calc(-1.03rem + 4.4vw), 4.25rem);
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;
    text-transform: uppercase;
  }
`;

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

const BntSubpillar = styled.div`
  position: fixed;
  top: 90vh;
  z-index: 2999;
  left: 46px;

  @media screen and (max-width:767px) {
    position: absolute;
    left: 10px;
    right: 10px;
    top: 69vh;

    &.hidden-mb {
      display: none !important;
    }
  }

  @media screen and (min-width:2180px) {
    left: 185px;
    top: 92vh;
  }

  @media screen and (min-width:2320px) {
    left: 260px;
    top: 93vh;
  }

  @media screen and (min-width:2610px) {
    left: 400px;
    top: 93vh;
  }

  display: flex;
  .subpillar-btn{
    cursor: pointer !important;
    background-color: ${({ theme: { colors } }) => colors.blackColorV3};
    color: ${({ theme: { colors } }) => colors.whiteColor};
    padding: 0.85rem 1.2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left{
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .right{
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  @media screen and (max-width: 1080px) {
    margin-top: 15px;
  }
`