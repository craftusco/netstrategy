import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import LpHeader from "@/components/LpHeader";
import PrimaryButton from "@/components/utils/PrimaryButton";
import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/bundle";
import Head from "next/head";
import getStaticData from "@/utils/getStaticData";
import Review from "@/components/Review";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import ImageSlider from "@/components/ImageSlider";
import splitText from "@/utils/splitText";
import Image from "next/image";
import getPath from "@/utils/getPath";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LpFooter from "@/components/LpFooter";

gsap.registerPlugin(ScrollToPlugin);

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

const timeline_image = {
  "data": {
      "id": 6197,
      "attributes": {
          "name": "Ecommerce-3_Netstrategy_.png",
          "alternativeText": null,
          "caption": null,
          "ext": ".png",
          "url": "/uploads/Ecommerce_3_Netstrategy_3827c6729f.png",
          "createdAt": "2023-10-04T15:26:05.506Z",
          "updatedAt": "2023-10-04T15:26:05.506Z"
      }
  }
}

export async function getStaticProps() {
  const staticData = await getStaticData();
  return { props: { staticData, pageName: "checklist-buyer-persona" } };
}

export default function LpBuyerPersona({ staticData }) {
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
        <title>Guida all'Identificazione del proprio Buyer Persona - NetStrategy</title>
        <meta name="description" content="Scarica ora la nostra checklist di 32 domande e scopri chi è il tuo cliente ideale: avvia la tua strategia di marketing con successo grazie a questo documento!"></meta>
      </Head>
      <LpHeader />
      <Hero>
        <h1>Guida all'identificazione del proprio buyer persona</h1>
        <div
          onClick={() =>
            gsap.to(window, {
              duration: 1,
              scrollTo: "#scarica-checklist",
              ease: "Power3.easeOut",
            })
          }
        >
          <PrimaryButton>Scarica la checklist</PrimaryButton>
        </div>
      </Hero>
      <ImageSlider
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        big
        onlyDraggable
        // data={slider_hero}
      />
      <Divider />
      <MethodContainer id="scarica-checklist">
        <div className="title">
          {splitText(
            `Scarica la nostra checklist di 32 domande e scopri chi è il tuo cliente ideale!`
          )}
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
            <div className="main_title">
              Identificare il Buyer Persona della propria azienda è un passo fondamentale per stabilire una strategia di marketing efficace. In particolare, definire il Buyer Persona è utile per:
            </div>
            <div className="timeline-item">
              <div className="title">Andare incontro ai bisogni e alle esigenze del target di riferimento</div>
            </div>
            <div className="timeline-item">
              <div className="title">Comprendere il processo decisionale di acquisto del consumatore</div>
            </div>
            <div className="timeline-item">
              <div className="title"> Riuscire ad accompagnare il potenziale cliente verso l’acquisto nel più breve tempo possibile</div>
            </div>
            <div
              className="timeline-cta"
              onClick={() =>
                gsap.to(window, {
                  duration: 1,
                  scrollTo: "#contact",
                  ease: "Power3.easeOut",
                })
              }
            >
              <PrimaryButton>Scarica la checklist</PrimaryButton>
            </div>
          </MethodTimeline>
        </Method>
      </MethodContainer>
      <Divider />
      <ContactForm headingCopy={{
        title: `Compila 
        il form`,
        subtitle: "E ottieni l'accesso alla checklist",
      }} submit_btn_name="Invia" formType="checklist_buyer_persona" campaign_name="checklist_buyer_persona"/>
      <ImageSlider
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        big
        onlyDraggable
        // data={slider_hero}
      />
      <Divider />
      <ReviewsSection id="testimonianze">
        <div className="title">
          <div className="title-wrapper">
            {splitText(`I risultati 
          del metodo 
          netstrategy`)}
          </div>
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
      <Footer staticData={staticData} minimal />
      <LpFooter />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_60_120};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_60_120};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    max-width: 90rem;
    margin: 2rem auto 3rem auto;
    padding: 0 1rem;
  }
`;

const Hero = styled.div`
  text-align: center;
`;

const MethodContainer = styled.div`
  ${centerContent}
  > .title {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_100};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_70_100};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    text-transform: uppercase;
    margin-bottom: 5rem;
    text-align: center;
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

  .main_title {
    padding-left: calc(25px + 1rem);
    /* font-family: ${({ theme: { fonts } }) => fonts.medium}; */
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_25};
    margin-bottom: 2rem;
  }

  .timeline-item {
    margin-bottom: 3rem;
    .title {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_25};
      color: ${({ theme: { colors } }) => colors.primaryColor};
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

  .timeline-cta {
    padding-left: calc(25px + 1rem);
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
