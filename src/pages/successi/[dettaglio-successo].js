import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import FullImage from "@/components/FullImage";
import Results from "@/components/Results";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
// import NextProject from "@/components/NextProject";
// import Services from "@/components/Services";
import StaticTitle from "@/components/utils/StaticTitle";
import React, { useState, useEffect, useRef } from "react";
import CaseStudyPalette from "@/components/CaseStudyPalette";
import CaseStudyBrochure from "@/components/CaseStudyBrochure";
import CasePrintedMedia from "@/components/CasePrintedMedia";
import CaseStudyTypography from "@/components/CaseStudyTypography";
import CaseStudySocialV1 from "@/components/CaseStudySocialV1";
import CaseStudySocialV2 from "@/components/CaseStudySocialV2";
import CaseStudyIconography from "@/components/CaseStudyIconography";
import CaseStudySlider from "@/components/CaseStudySlider";
import CaseStudyLogoDesignV1 from "@/components/CaseStudyLogoDesignV1";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CaseStudyLogoDesignV2 from "@/components/CaseStudyLogoDesignV2";
import CaseStudySoftwareBranding from "@/components/CaseStudySoftwareBranding";
import StepsLinks from "@/components/StepsLinks";
import CaseStudyWebsite from "@/components/CaseStudyWebsite";
import CaseStudyStorePromotion from "@/components/CaseStudyStorePromotion";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import getPath from "@/utils/getPath";
import CaseStudyRender from "@/components/CaseStudyRender";
import RestartVideoIcon from "@/components/utils/RestartVideoIcon";
import ToggleAudioIcons from "@/components/utils/ToggleAudioIcons";
// import videoHasAudio from "@/utils/videoHasAudio";
import ImageSlider from "@/components/ImageSlider";
import CaseStudySeoImgText from "@/components/CaseStudySeoImgText";
import RedLink from "@/components/utils/RedLink";
import ProjectSlider from "@/components/ProjectSlider";
import { useDispatch } from "react-redux";
import { updateSuccessSelected } from "../../../redux/filterSuccessesSlice";
import Head from "next/head";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import ShowcaseV2 from "@/components/ShowcaseV2";

// 1. Insight results -- successo.valori_successo - DONE 9
// 2. SEO results -- successo.seo_successo - DONE
// 3. logo design --
// 4. Palette 2
// 5. Typography 3
// 7. Iconography 8
// 8. Website 6
// 9. Social Media 7
// 10. products
// 11. Printed Media 5
// 12. Brochure 4

const orderedSteps = [
  {
    name: "Render 3D",
    anchor: "#render_3d",
    obj_name: "render_3d",
  },
  {
    name: "Insights results",
    anchor: "#insights_results",
    obj_name: "valori_successo",
  },
  {
    name: "Insights seo",
    anchor: "#insights_seo",
    obj_name: "seo_successo",
  },
  // {
  //   name: "Video Intervista",
  //   anchor: "#video_intervista",
  //   obj_name: "video_intervista",
  // },
  {
    name: "Logo design",
    anchor: "#logoDesign",
    obj_name: "logo_design",
  },
  {
    name: "Palette",
    anchor: "#palette",
    obj_name: "palette_colori",
  },
  {
    name: "Typography",
    anchor: "#typography",
    obj_name: "tipografia_fonts",
  },
  {
    name: "Iconography",
    anchor: "#iconography",
    obj_name: "iconografia",
  },
  {
    name: "Website",
    anchor: "#website",
    obj_name: "website",
  },
  {
    name: "Social media",
    anchor: "#social",
    obj_name: "social",
  },
  {
    name: "Products",
    anchor: "#products",
    obj_name: "products",
  },
  {
    name: "Printed Media",
    anchor: "#printedMedia",
    obj_name: "printed_media",
  },
  {
    name: "Software branding",
    anchor: "#softwareBranding",
    obj_name: "software_branding",
  },
  {
    name: "Brochure",
    anchor: "#brochure",
    obj_name: "brochure",
  },
  {
    name: "Store Promotion",
    anchor: "#storePromotion",
    obj_name: "store_promotion",
  },
];

export async function getStaticPaths() {
  const response = await fetch(strapiGetDataFromQueryURL, {
    method: "POST",
    body: JSON.stringify({
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?pagination[limit]=-1&populate=deep,1&fields[0]=slug`,
    }),
  });

  const { data } = await response.json();
  //creating an array of objects
  const paths = data.map((el) => {
    return {
      params: {
        "dettaglio-successo": `${el.attributes.slug.trim()}`,
      },
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
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?populate=deep,4&filters[slug]=${params["dettaglio-successo"]}`,
    },
    {
      name: "list",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?pagination[limit]=-1&populate=deep,1&fields[0]=slug&sort[0]=createdAt%3Aasc`,
    },
    {
      name: "successi",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project?populate=deep,4`,
    },
    {
      name: "categorie",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/custom-categories`,
      transform: false,
    },
    {
      name: "projects",
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/project-details?populate=deep,5&filters[show_slider]=true`,
      transform: false,
    },
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);
  const index = data.list.findIndex(
    (el) => el.attributes.slug == params["dettaglio-successo"]
  );
  const toFindIndex = index + 1 == data.list.length ? 0 : index + 1;
  const nextUrl = data.list[toFindIndex].attributes.slug;
  const query = `https://www.netstrategy.it/api/project-details?populate=deep,5&filters[slug]=${nextUrl}`;
  const fetching = await fetch(strapiGetDataFromQueryURL, {
    method: "POST",
    body: JSON.stringify({ url: query }),
  });
  const response = await fetching.json();
  const nextStep = response;

  if (data.page.length == 0)
    return {
      notFound: true,
    };

  let steps = orderedSteps.filter((el) => {
    if (Object.hasOwnProperty.call(data.page, el.obj_name)) {
      if (!data.page[el.obj_name]) return false;
      if (
        Array.isArray(data.page[el.obj_name]) &&
        data.page[el.obj_name].length == 0
      )
        return false;
      // if(el.obj_name == 'render_3d' && !data.page[el.obj_name].data) return false;

      return true;
    }
    return false;
  });

  steps.forEach((step) => {
    if (step.obj_name === "website" && data.page?.website.titolo) {
      step.name =
        data.page?.website.titolo != "Website."
          ? (step.name = data.page?.website.titolo)
          : "Website";
    } else if (step.obj_name === "social" && data.page?.social.titolo) {
      step.name =
        data.page?.social.titolo != "Social."
          ? (step.name = data.page?.social.titolo)
          : "Social media";
    } else if (step.obj_name === "valori_successo") {
      step.name = data.page.heading_valori.titolo;
    } else if (step.obj_name === "seo_successo") {
      step.name = data.page.heading_seo.titolo;
    } else {
    }
  });

  return await {
    props: { data, staticData, steps, nextStep, pageName: "successi" },
  };
}

export default function ProjectDetail({ data, staticData, steps, nextStep }) {
  const [mediaValori, setMediaValori] = useState([]);
  const [mediaSeo, setMediaSeo] = useState([]);
  const [mediaSocial, setMediaSocial] = useState([]);
  const [mediaPrintedMedia, setPrintedMedia] = useState([]);
  const [mediaProducts, setMediaProducts] = useState([]);
  const successo = data.page;
  const successi = data.successi;
  const mapImages = (images) => {
    if (!images || !images.data) return [];

    return images.data.map((el) => {
      return getPath(el.attributes.url);
    });
  };

  useEffect(() => {
    setMediaValori(mapImages(successo.valori_successo_media));
    setMediaSeo(mapImages(successo.seo_successo_media));
    setMediaSocial(mapImages(successo.social?.immagini));
    setPrintedMedia(mapImages(successo.printed_media?.immagini));
    setMediaProducts(mapImages(successo.products?.immagini));
  }, [successo]);

  const videoInterview = useRef();
  const [isMuted, setIsMuted] = useState(true);

  const restartVideo = () => {
    if (videoInterview.current) {
      videoInterview.current.currentTime = 0;
      videoInterview.current.play();
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (successo.categorie.data[0]) {
      dispatch(
        updateSuccessSelected({
          query: {
            name: successo.categorie.data[0].attributes.nome,
            id: successo.categorie.data[0].id,
            count: 0,
          },
        })
      );
    }
  }, []);

  // +---------------+
  // | Configuration |
  // +---------------+
  // logo design config
  const extraLayout = successo?.logo_design?.extra_layout ?? false;
  const logoDesignTitleColor = successo?.logo_design?.title_color ?? false;
  const logoDesignDescriptionColor =
    successo?.logo_design?.description_color ?? false;
  const logoDesignBackgroundColor =
    successo?.logo_design?.background_color ?? false;
  const logoDesignfluidMobileImage =
    successo?.logo_design?.fluid_mobile_image ?? false;

  // template exceptions
  if (successo.slug == "aworld") {
    steps = steps.filter((e, i) => {
      if (!["#insights_results", "#insights_seo"].includes(e.anchor)) {
        return e;
      }
    });
  }

  successo?.printed_media?.titolo
    ? (orderedSteps.find((e) => e.obj_name == "printed_media").name =
        successo.printed_media.titolo)
    : null;

  
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      {!["ecommerce", "seo"].includes(
        successo.categorie.data[0].attributes.nome.toLowerCase()
      ) && <ScrollProgressBar steps={steps} />}
      <HeroPages data={successo.thumbnail_success} staticData={staticData}>
        <StaticTitle title={successo.thumbnail_success.nome}></StaticTitle>
      </HeroPages>

      {successo.is_new_layout && (
        <ShowcaseV2 data={successo} />
      )}

      <CoreBusiness>
        <p>
          <span className="title">Core Business: </span>
          {successo.core_business}
        </p>
        <p>
          <span className="title">
            <RedLink
              link={getPath("/successi")}
              img={getPath(
                successi.attributes.hero.immagine.data?.attributes.url
              )}
            >
              Vedi tutti i casi di successo
            </RedLink>
          </span>
        </p>
      </CoreBusiness>
      {successo?.heading_1 && (
        <>
          <Divider mt="4rem" />
          <Heading
            data={successo.heading_1}
            mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          />
        </>
      )}
      {/* Section */}
      {successo?.heading_2 && (
        <>
          <Divider />
          <Heading
            data={successo.heading_2}
            mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          />
        </>
      )}
      {successo?.heading_3 && (
        <>
          <Divider />
          <Heading
            data={successo.heading_3}
            mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
          />
        </>
      )}

    {!["ecommerce", "seo"].includes(
      successo.categorie.data[0].attributes.nome.toLowerCase()
    ) &&
      successo.slug !== "aworld" && successo.is_new_layout === false && (
        <>
          <Divider />
          <StepsLinks
            sottotitolo={successo.project_description}
            steps={steps}
            mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
          />
        </>
      )}

      {/* valori di successo (insight) */}
      {successo.valori_successo && successo.valori_successo.length > 0 && (
        <>
          <Divider mt="clamp(2.00rem, calc(1.64rem + 1.55vw), 3.50rem)" />

          <div id="insights_results">
            <Heading
              data={successo.heading_valori}
              mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            />
            <Results
              data={successo.valori_successo}
              mt="clamp(2rem, calc(1.51rem + 2.07vw), 4rem)"
              valueType={successo.tipologia_elenco_valori} //può essere "piccolo" o "grande"
            />

            {mediaValori.length > 0 && (
              <>
                <CaseStudySlider
                  mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                  images={mediaValori}
                  initialImage="/initialInsightResult2.png"
                />
              </>
            )}
          </div>
        </>
      )}

      {/* slider immagini */}
      {successo.slider_insights && (
        <ImageSlider mt="5rem" data={successo.slider_insights} />
      )}

      {/* valori di successo (seo) */}
      {successo.seo_successo && successo.seo_successo.length > 0 && (
        <>
          <Divider />
          <div id="insights_seo">
            <Heading
              data={successo.heading_seo}
              mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            />
            <Results
              data={successo.seo_successo}
              mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
              valueType={successo.tipologia_elenco_seo} //può essere "piccolo" o "grande"
            />

            {mediaSeo.length > 0 && (
              <>
                <CaseStudySlider
                  mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                  images={mediaSeo}
                  initialImage="/initialSeoResult2.png"
                />

                {successo.slug !== "aworld" && <Divider />}

                {successo.slug == "aworld" && (
                  <>
                    <Divider />
                    <StepsLinks
                      sottotitolo={successo.project_description}
                      steps={steps}
                      mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
                    />
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* VIDEO TESTIMONIANZA */}
      {successo.video_intervista && (
        <>
          {successo.heading_intervista && (
            <Heading
              data={successo.heading_intervista}
              mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            />
          )}
          <VideoContainer
            id="video_intervista"
            withHeading={successo.heading_intervista}
          >
            <video
              /* The above code is setting various attributes for a video element in JavaScript. */
              preload="auto"
              autoPlay
              playsInline
              loop
              muted={isMuted}
              ref={videoInterview}
            >
              <source
                src={getPath(
                  successo.video_intervista.video.data.attributes.url
                )}
              />
            </video>
            <VideoControls>
              <div className="restartIcon" onClick={restartVideo}>
                <RestartVideoIcon isAbsolute={false} />
              </div>
              <div
                onClick={() => {
                  setIsMuted(!isMuted);
                }}
              >
                <ToggleAudioIcons
                  onClick={() => {
                    setIsMuted(!isMuted);
                  }}
                  isAbsolute={false}
                  isMutedTrigger={isMuted}
                />
              </div>
            </VideoControls>
          </VideoContainer>
          <Divider />
        </>
      )}

      {/* LINKS
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */}

      {successo.concept_branding && successo.concept_branding.length > 0 && (
        <Results
          data={successo.concept_branding}
          mt="clamp(2rem, calc(1.51rem + 2.07vw), 4rem)"
          valueType="piccolo"
        />
      )}

      {successo.media_1 && (
        <FullImage
          forceHeight={false}
          data={successo.media_1?.data?.attributes?.url}
          altText={successo.media_1?.data?.attributes?.alternativeText}
          mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
        />
      )}

      {/* LINKS
      ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */}

      {/* <Divider />

      <StepsLinks
        sottotitolo={successo.project_description}
        steps={steps}
        mt="clamp(2.5rem, calc(1.29rem + 5.18vw), 7.5rem)"
      /> */}
      {/* {successo.video_intervista && (
        <>
          <VideoContainer id="video_intervista">
            <video
              preload="auto"
              autoPlay
              playsInline
              loop
              muted={isMuted}
              ref={videoInterview}
            >
              <source
                src={getPath(
                  successo.video_intervista.video.data.attributes.url
                )}
              />
            </video>
            <VideoControls>
              <div className="restartIcon" onClick={restartVideo}>
                <RestartVideoIcon isAbsolute={false} />
              </div>
              <div
                onClick={() => {
                  setIsMuted(!isMuted);
                }}
              >
                <ToggleAudioIcons
                  onClick={() => {
                    setIsMuted(!isMuted);
                  }}
                  isAbsolute={false}
                  isMutedTrigger={isMuted}
                />
              </div>
            </VideoControls>
          </VideoContainer>
          <Divider />
        </>
      )} */}

      {/* Palette */}
      {successo.render_3d && (
        <div id="render_3d">
          <CaseStudyRender
            version={successo.tipologia_design}
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Render 3D."
            paragraph={successo.render_3d.descrizione}
            video={getPath(successo.render_3d.video.data.attributes.url)}
          />
          <Divider />
        </div>
      )}
      

      {successo.logo_design && (
        <>
          {/* extra_layout implementation */}
          {extraLayout ? (
            <div id="logoDesign">
              <CaseStudyLogoDesignV1
                mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                title={successo.logo_design.titolo}
                paragraph={successo.logo_design.paragrafo}
                imageD={getPath(
                  successo.logo_design.immagine_1?.data?.attributes?.url
                )}
                imageM={getPath(
                  successo.logo_design.immagine_2?.data?.attributes?.url
                )}
                colorSettings={{
                  title: logoDesignTitleColor,
                  description: logoDesignDescriptionColor,
                  background: logoDesignBackgroundColor,
                }}
                mobileImageSize={logoDesignfluidMobileImage ? "100%" : "20rem"}
              />
            </div>
          ) : (
            <>
              {successo.tipologia_design === "V1" ? (
                <div id="logoDesign">
                  <CaseStudyLogoDesignV1
                    mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                    title={successo.logo_design.titolo}
                    paragraph={successo.logo_design.paragrafo}
                    imageD={getPath(
                      successo.logo_design.immagine_1?.data?.attributes?.url
                    )}
                    imageM={getPath(
                      successo.logo_design.immagine_2?.data?.attributes?.url
                    )}
                  />
                </div>
              ) : (
                <div id="logoDesign">
                  <CaseStudyLogoDesignV2
                    mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                    title={successo.logo_design.titolo}
                    paragraph={successo.logo_design.paragrafo}
                    imageSmall={getPath(
                      successo.logo_design.immagine_1?.data?.attributes?.url
                    )}
                    imageBig={getPath(
                      successo.logo_design.immagine_2?.data?.attributes?.url
                    )}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Palette */}
      {successo.palette_colori && (
        <div id="palette">
          <CaseStudyPalette
            version={successo.tipologia_design}
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Palette."
            paragraph={successo.palette_colori.descrizione}
            img={getPath(successo.palette_colori?.media?.data?.attributes?.url)}
          />
        </div>
      )}

      {/* Typography */}
      {successo.tipografia_fonts && successo.tipografia_fonts.length > 0 && (
        <div id="typography">
          <CaseStudyTypography
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Typography."
            fonts={successo.tipografia_fonts}
          />
        </div>
      )}

      {/* Iconography */}
      {successo.iconografia && (
        <div id="iconography">
          <CaseStudyIconography
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Iconography."
            paragraph={successo.iconografia.descrizione}
            image={getPath(successo?.iconografia?.media?.data?.attributes?.url)}
          />
        </div>
      )}
      {/* Website */}
      {successo.website && (
        <div id="website">
          <CaseStudyWebsite
            mt={
              successo.website.long_text
                ? "clamp(4.00rem,calc(3.35rem + 3.62vw),9.5rem)"
                : "clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            }
            title={
              successo.website.titolo ? successo.website.titolo : "Website."
            }
            data={successo.website}
            titleColor={
              successo.website.colore_titolo
                ? successo.website.colore_titolo
                : "grey"
            }
            longText={successo.website.long_text}
          />
        </div>
      )}

      {/* SEO Text Image Paragraph*/}
      {successo?.seo_img_text && (
        <CaseStudySeoImgText
          mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
          title={
            successo?.seo_img_text.titolo
              ? successo?.seo_img_text.titolo
              : "Social."
          }
          titleColor="red"
          paragraph={successo?.seo_img_text.paragrafo}
          media={getPath(
            successo?.seo_img_text?.immagine?.data?.attributes?.url
          )}
          medias={mediaSocial}
        />
      )}
      {/* Social Media */}
      {successo.social && (
        <>
          {successo.tipologia_design === "V1" ? (
            <div id="social">
              <CaseStudySocialV1
                mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                title={
                  successo?.social.titolo ? successo?.social.titolo : "Social."
                }
                paragraph={successo.social.paragrafo}
                image={getPath(
                  successo?.social?.immagine?.data?.attributes?.url
                )}
                images={mediaSocial}
              />
            </div>
          ) : (
            <div id="social">
              <CaseStudySocialV2
                mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                title={
                  successo?.social.titolo ? successo?.social.titolo : "Social."
                }
                paragraph={successo.social.paragrafo}
                image={getPath(
                  successo?.social?.immagine?.data?.attributes?.url
                )}
              />
            </div>
          )}
        </>
      )}

      {/* Products */}
      {successo.products && (
        <div id="products">
          <CasePrintedMedia
            version={successo.tipologia_design}
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Products."
            paragraph={successo?.products?.paragrafo}
            img={mediaProducts}
          />
        </div>
      )}
      {/* Printed Media */}
      {successo.printed_media &&
        (() => {
          const printed_media_title =
            steps.find((e) => e.obj_name === "printed_media")?.name ??
            "Printed Media";
          return (
            <div id="printedMedia">
              {successo.slug == "aworld" ? (
                <CaseStudyWebsite
                  mt={
                    successo.website.long_text
                      ? "clamp(4.00rem,calc(3.35rem + 3.62vw),9.5rem)"
                      : "clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                  }
                  title={`${printed_media_title}.`}
                  data={successo.website}
                  titleColor={
                    successo.website.colore_titolo
                      ? successo.website.colore_titolo
                      : "grey"
                  }
                  longText={successo.printed_media.paragrafo}
                  direction="rtl"
                  showImgs={false}
                  customVideo={successo.printed_media.immagini.data[0].attributes.url}
                />
              ) : (
                <CasePrintedMedia
                  version={successo.printed_media.tipologia_design}
                  mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
                  title={`${printed_media_title}.`}
                  paragraph={successo.printed_media.paragrafo}
                  img={mediaPrintedMedia}
                  blackOrWhite={successo.printed_media.text_color}
                  extraMedia={successo.printed_media.extra_media}
                />
              )}
            </div>
          );
        })()}
      {/* Brochure */}
      {successo.brochure && (
        <div id="brochure">
          <CaseStudyBrochure
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title="Brochure."
            paragraph={successo.brochure.descrizione}
            img={getPath(successo?.brochure?.media?.data?.attributes?.url)}
          />
        </div>
      )}

      {/* Software Branding */}
      {successo.software_branding && (
        <div id="softwareBranding">
          <CaseStudySoftwareBranding
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title={`Software 
          branding.`}
            p1={successo.software_branding.paragrafo_1}
            p2={successo.software_branding.paragrafo_2}
            img1={getPath(
              successo?.software_branding?.media_1?.data?.attributes?.url
            )}
            img2={getPath(
              successo?.software_branding?.media_2?.data?.attributes?.url
            )}
          />
        </div>
      )}

      {/* Store Promotion */}
      {successo.store_promotion && (
        <div id="storePromotion">
          <CaseStudyStorePromotion
            mt="clamp(4.00rem, calc(3.15rem + 3.62vw), 7.50rem)"
            title={`Store promotion.`}
            data={successo.store_promotion}
          />
        </div>
      )}

      {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  */}

      {/* Slider Progetti */}
      <ProjectSlider
        data={data.projects}
        staticData={staticData}
        titolo={staticData.progetti_slider_title}
        categorie={data.categorie}
        mt="clamp(2.00rem, calc(1.03rem + 4.14vw), 6.00rem)"
      />

      {/* Services Section */}
      {/* <ServicesSubtitle>Approfondisci i servizi</ServicesSubtitle>
      <Services
        data={successi.attributes.pillars.data}
        mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
      /> */}
      {/* Section */}
      {/* <Divider />
      <NextProject
        data={nextStep}
        mt="clamp(2rem, calc(1.45rem + 2.33vw), 4.25rem)"
      /> */}
      {/* Form */}
      <Divider />
      <ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
      {/* Footer */}
      <Footer staticData={staticData} />
    </div>
  );
}

const VideoContainer = styled.div`
  position: relative;
  ${centerContent}
  margin-top: ${({ withHeading }) =>
    withHeading
      ? "clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
      : "clamp(4.00rem, calc(3.51rem + 4.07vw), 6.00rem)"};
  max-height: clamp(15rem, calc(4.08rem + 46.6vw), 60rem) !important;
  max-width: 80rem;

  video {
    object-fit: cover;
    object-position: bottom;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    border: 1px solid black;
  }
`;

const CoreBusiness = styled.div`
  display: flex;
  justify-content: space-between;
  ${centerContent}
  margin-top: clamp(1.75rem, calc(1.37rem + 1.62vw), 3.31rem);
  margin-bottom: calc(clamp(0.88rem, calc(0.77rem + 0.45vw), 1.31rem) * -1);
  @media screen and (max-width: 850px) {
    flex-direction: column;
  }

  p,
  a {
    display: block;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_28};
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    .title {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }
`;

// const ServicesSubtitle = styled.span`
//   ${centerContent}
//   display: block;
//   font-size: 19px;
//   margin-top: 5rem;
//   text-transform: uppercase;
//   color: ${({ theme: { colors } }) => colors.primaryColor};
// `;

const VideoControls = styled.div`
  display: flex;
  gap: 0.75rem;
  position: absolute;
  bottom: 0;
  transform: translateY(45%);
  right: 7%;
`;
