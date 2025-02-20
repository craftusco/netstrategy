import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import { centerContent } from "@/styles/mixins";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import RedLink from "./utils/RedLink";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/all";
import ToggleAudioIcons from "./utils/ToggleAudioIcons";
import RestartVideoIcon from "./utils/RestartVideoIcon";
import { ScrollToPlugin } from "gsap/all";
import getPath from "@/utils/getPath";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");
gsap.registerPlugin(ScrollTrigger);

const sampleObj = {
  slug: "articolo-di-test",
  createdAt: "2023-08-30T08:10:22.528Z",
  updatedAt: "2023-09-06T08:09:13.976Z",
  publishedAt: "2023-08-30T08:10:51.333Z",
  titolo: "articolo-di-test",
  paragrafo: "articolo-di-test",
  tag_title: "articolo-di-test",
  meta_description: "articolo-di-test",
  cover_image: null,
  original_date: "2023-08-30T22:00:00.000Z",
  immagine: {
    data: {
      id: 2067,
      attributes: {
        name: "andrea-romagna.jpg",
        alternativeText: null,
        caption: null,
        width: 875,
        height: 1094,
        formats: {
          large: {
            ext: ".jpg",
            url: "/uploads/large_andrea_romagna_e228e6f9a7.jpg",
            hash: "large_andrea_romagna_e228e6f9a7",
            mime: "image/jpeg",
            name: "large_andrea-romagna.jpg",
            path: null,
            size: 93.42,
            width: 800,
            height: 1000,
          },
          small: {
            ext: ".jpg",
            url: "/uploads/small_andrea_romagna_e228e6f9a7.jpg",
            hash: "small_andrea_romagna_e228e6f9a7",
            mime: "image/jpeg",
            name: "small_andrea-romagna.jpg",
            path: null,
            size: 22.85,
            width: 400,
            height: 500,
          },
          medium: {
            ext: ".jpg",
            url: "/uploads/medium_andrea_romagna_e228e6f9a7.jpg",
            hash: "medium_andrea_romagna_e228e6f9a7",
            mime: "image/jpeg",
            name: "medium_andrea-romagna.jpg",
            path: null,
            size: 50.32,
            width: 600,
            height: 750,
          },
          thumbnail: {
            ext: ".jpg",
            url: "/uploads/thumbnail_andrea_romagna_e228e6f9a7.jpg",
            hash: "thumbnail_andrea_romagna_e228e6f9a7",
            mime: "image/jpeg",
            name: "thumbnail_andrea-romagna.jpg",
            path: null,
            size: 3.81,
            width: 125,
            height: 156,
          },
        },
        hash: "andrea_romagna_e228e6f9a7",
        ext: ".jpg",
        mime: "image/jpeg",
        size: 101.53,
        url: "/uploads/andrea_romagna_e228e6f9a7.jpg",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-12T10:20:43.189Z",
        updatedAt: "2023-07-12T10:20:43.189Z",
      },
    },
  },
  utente: {
    data: {
      id: 17,
      attributes: {
        nome: "Andrea Romagna",
        createdAt: "2023-06-28T13:12:06.342Z",
        updatedAt: "2023-08-03T11:11:22.242Z",
        publishedAt: "2023-06-28T13:12:07.116Z",
        ruolo: "Project Manager",
        slug: "andrea-romagna",
        descrizione: null,
        email: null,
        url_profilo_linkedin: null,
        tag_title: "tetdt",
        meta_description: "testset",
        immagine: {
          data: {
            id: 2067,
            attributes: {
              name: "andrea-romagna.jpg",
              alternativeText: null,
              caption: null,
              width: 875,
              height: 1094,
              formats: {
                large: {
                  ext: ".jpg",
                  url: "/uploads/large_andrea_romagna_e228e6f9a7.jpg",
                  hash: "large_andrea_romagna_e228e6f9a7",
                  mime: "image/jpeg",
                  name: "large_andrea-romagna.jpg",
                  path: null,
                  size: 93.42,
                  width: 800,
                  height: 1000,
                },
                small: {
                  ext: ".jpg",
                  url: "/uploads/small_andrea_romagna_e228e6f9a7.jpg",
                  hash: "small_andrea_romagna_e228e6f9a7",
                  mime: "image/jpeg",
                  name: "small_andrea-romagna.jpg",
                  path: null,
                  size: 22.85,
                  width: 400,
                  height: 500,
                },
                medium: {
                  ext: ".jpg",
                  url: "/uploads/medium_andrea_romagna_e228e6f9a7.jpg",
                  hash: "medium_andrea_romagna_e228e6f9a7",
                  mime: "image/jpeg",
                  name: "medium_andrea-romagna.jpg",
                  path: null,
                  size: 50.32,
                  width: 600,
                  height: 750,
                },
                thumbnail: {
                  ext: ".jpg",
                  url: "/uploads/thumbnail_andrea_romagna_e228e6f9a7.jpg",
                  hash: "thumbnail_andrea_romagna_e228e6f9a7",
                  mime: "image/jpeg",
                  name: "thumbnail_andrea-romagna.jpg",
                  path: null,
                  size: 3.81,
                  width: 125,
                  height: 156,
                },
              },
              hash: "andrea_romagna_e228e6f9a7",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 101.53,
              url: "/uploads/andrea_romagna_e228e6f9a7.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2023-07-12T10:20:43.189Z",
              updatedAt: "2023-07-12T10:20:43.189Z",
            },
          },
        },
      },
    },
  },
  video: {
    data: {
      id: 3527,
      attributes: {
        name: "NetStrategy 08 Agenzia Lead Generation - Andrea - 12-04 con sottotitoli.mp4",
        alternativeText: null,
        caption: null,
        width: null,
        height: null,
        formats: null,
        hash: "Net_Strategy_08_Agenzia_Lead_Generation_Andrea_12_04_con_sottotitoli_db9e3eb813",
        ext: ".mp4",
        mime: "video/mp4",
        size: 5335.04,
        url: "/uploads/Net_Strategy_08_Agenzia_Lead_Generation_Andrea_12_04_con_sottotitoli_db9e3eb813.mp4",
        previewUrl: null,
        provider: "local",
        provider_metadata: null,
        createdAt: "2023-07-24T13:55:03.539Z",
        updatedAt: "2023-07-24T13:55:03.539Z",
      },
    },
  },
  categoria: {
    data: {
      id: 17,
      attributes: {
        createdAt: "2023-06-28T15:57:03.146Z",
        updatedAt: "2023-08-01T07:21:52.496Z",
        publishedAt: "2023-06-28T15:57:58.362Z",
        slug: "web-marketing",
        nome: "WEB MARKETING",
        tag_title:
          "Servizi Web Marketing su misura per far crescere la tua realtà",
        meta_description:
          "Oltre 10 anni di esperienza e più di 30 professionisti per dare concretezza alle tue idee. Scegli chi, con i giusti servizi di web marketing, sa creare valore per la tua azienda.",
        intro: {
          id: 41,
          paragrafo:
            "Se non promuovi efficacemente la tua attività sui canali online, probabilmente stai perdendo opportunità commerciali. I tuoi concorrenti ringraziano. È arrivato il momento di investire in una strategia di Web Marketing per elevare la visibilità della tua azienda, fare meglio dei competitor e allargare il tuo bacino di clienti.",
          titolo: "Allarga\ni tuoi\norizzonti",
          rovesciato: false,
          sottotitolo:
            "Pronto a diventare leader del tuo settore anche nel mercato digitale?",
          sottosopra: false,
          centra_verticalmente: false,
          allineamento_bottone: "right",
          allineamento_titolo: "initial",
          allinea_sotto: false,
          bottone: null,
        },
        hero: {
          id: 17,
          nome: "WEB MARKETING",
          caricamento_titolo: null,
          caricamento_sottotitolo: null,
          immagine: {
            data: {
              id: 1593,
              attributes: {
                name: "177- 0C6A0618 (1).jpg",
                alternativeText: null,
                caption: null,
                width: 5472,
                height: 3648,
                formats: {
                  large: {
                    ext: ".jpg",
                    url: "/uploads/large_177_0_C6_A0618_1_68919d6211.jpg",
                    hash: "large_177_0_C6_A0618_1_68919d6211",
                    mime: "image/jpeg",
                    name: "large_177- 0C6A0618 (1).jpg",
                    path: null,
                    size: 63.33,
                    width: 1000,
                    height: 667,
                  },
                  small: {
                    ext: ".jpg",
                    url: "/uploads/small_177_0_C6_A0618_1_68919d6211.jpg",
                    hash: "small_177_0_C6_A0618_1_68919d6211",
                    mime: "image/jpeg",
                    name: "small_177- 0C6A0618 (1).jpg",
                    path: null,
                    size: 22.93,
                    width: 500,
                    height: 333,
                  },
                  medium: {
                    ext: ".jpg",
                    url: "/uploads/medium_177_0_C6_A0618_1_68919d6211.jpg",
                    hash: "medium_177_0_C6_A0618_1_68919d6211",
                    mime: "image/jpeg",
                    name: "medium_177- 0C6A0618 (1).jpg",
                    path: null,
                    size: 41.46,
                    width: 750,
                    height: 500,
                  },
                  thumbnail: {
                    ext: ".jpg",
                    url: "/uploads/thumbnail_177_0_C6_A0618_1_68919d6211.jpg",
                    hash: "thumbnail_177_0_C6_A0618_1_68919d6211",
                    mime: "image/jpeg",
                    name: "thumbnail_177- 0C6A0618 (1).jpg",
                    path: null,
                    size: 7.86,
                    width: 234,
                    height: 156,
                  },
                },
                hash: "177_0_C6_A0618_1_68919d6211",
                ext: ".jpg",
                mime: "image/jpeg",
                size: 798.63,
                url: "/uploads/177_0_C6_A0618_1_68919d6211.jpg",
                previewUrl: null,
                provider: "local",
                provider_metadata: null,
                createdAt: "2023-06-28T16:37:10.766Z",
                updatedAt: "2023-06-28T16:37:10.766Z",
              },
            },
          },
          immagine_mobile: {
            data: null,
          },
          video: {
            data: null,
          },
        },
        intro_media: {
          id: 17,
          immagini: {
            data: [
              {
                id: 5253,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-1 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 5262,
                  height: 3508,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_1_1_3eab864e1b.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_1_1_3eab864e1b",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-1 (1).jpg",
                      path: null,
                      size: 50.64,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_1_1_3eab864e1b.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_1_1_3eab864e1b",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-1 (1).jpg",
                      path: null,
                      size: 17.83,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_1_1_3eab864e1b.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_1_1_3eab864e1b",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-1 (1).jpg",
                      path: null,
                      size: 32.96,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_1_1_3eab864e1b.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_1_1_3eab864e1b",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-1 (1).jpg",
                      path: null,
                      size: 6,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_1_1_3eab864e1b",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 332.9,
                  url: "/uploads/web_marketing_pillar_netstrategy_1_1_3eab864e1b.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.159Z",
                  updatedAt: "2023-07-28T09:05:26.159Z",
                },
              },
              {
                id: 5261,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-2 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 5472,
                  height: 3648,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_2_1_25eee6f8a4.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_2_1_25eee6f8a4",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-2 (1).jpg",
                      path: null,
                      size: 77.64,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_2_1_25eee6f8a4.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_2_1_25eee6f8a4",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-2 (1).jpg",
                      path: null,
                      size: 26.65,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_2_1_25eee6f8a4.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_2_1_25eee6f8a4",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-2 (1).jpg",
                      path: null,
                      size: 50.39,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_2_1_25eee6f8a4.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_2_1_25eee6f8a4",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-2 (1).jpg",
                      path: null,
                      size: 8.32,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_2_1_25eee6f8a4",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 503.24,
                  url: "/uploads/web_marketing_pillar_netstrategy_2_1_25eee6f8a4.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.789Z",
                  updatedAt: "2023-07-28T09:05:26.789Z",
                },
              },
              {
                id: 5265,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-3 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 6000,
                  height: 4000,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-3 (1).jpg",
                      path: null,
                      size: 71.83,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-3 (1).jpg",
                      path: null,
                      size: 23.79,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-3 (1).jpg",
                      path: null,
                      size: 44.92,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-3 (1).jpg",
                      path: null,
                      size: 7.88,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 674.83,
                  url: "/uploads/web_marketing_pillar_netstrategy_3_1_fb7ff2f9d9.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.938Z",
                  updatedAt: "2023-07-28T09:05:26.938Z",
                },
              },
            ],
          },
          labels: [],
        },
        collegamenti: {
          id: 239,
          titolo: "Altri spunti per approfondire il WEB MARKETING",
          immagini: {
            data: [
              {
                id: 5263,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-8 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 6000,
                  height: 4000,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_8_1_9151c085d7.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_8_1_9151c085d7",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-8 (1).jpg",
                      path: null,
                      size: 45.66,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_8_1_9151c085d7.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_8_1_9151c085d7",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-8 (1).jpg",
                      path: null,
                      size: 15,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_8_1_9151c085d7.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_8_1_9151c085d7",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-8 (1).jpg",
                      path: null,
                      size: 28.31,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_8_1_9151c085d7.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_8_1_9151c085d7",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-8 (1).jpg",
                      path: null,
                      size: 5.14,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_8_1_9151c085d7",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 596.68,
                  url: "/uploads/web_marketing_pillar_netstrategy_8_1_9151c085d7.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.853Z",
                  updatedAt: "2023-07-28T09:05:26.853Z",
                },
              },
              {
                id: 5267,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-5 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 5030,
                  height: 3353,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_5_1_98f1090f37.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_5_1_98f1090f37",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-5 (1).jpg",
                      path: null,
                      size: 94.88,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_5_1_98f1090f37.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_5_1_98f1090f37",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-5 (1).jpg",
                      path: null,
                      size: 30.71,
                      width: 500,
                      height: 334,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_5_1_98f1090f37.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_5_1_98f1090f37",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-5 (1).jpg",
                      path: null,
                      size: 58.46,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_5_1_98f1090f37.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_5_1_98f1090f37",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-5 (1).jpg",
                      path: null,
                      size: 9.73,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_5_1_98f1090f37",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 717.66,
                  url: "/uploads/web_marketing_pillar_netstrategy_5_1_98f1090f37.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:27.023Z",
                  updatedAt: "2023-07-28T09:05:27.023Z",
                },
              },
              {
                id: 5259,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-6 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 5472,
                  height: 3648,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_6_1_53c63b704e.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_6_1_53c63b704e",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-6 (1).jpg",
                      path: null,
                      size: 72.98,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_6_1_53c63b704e.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_6_1_53c63b704e",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-6 (1).jpg",
                      path: null,
                      size: 25.84,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_6_1_53c63b704e.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_6_1_53c63b704e",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-6 (1).jpg",
                      path: null,
                      size: 47.67,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_6_1_53c63b704e.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_6_1_53c63b704e",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-6 (1).jpg",
                      path: null,
                      size: 8.26,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_6_1_53c63b704e",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 469.01,
                  url: "/uploads/web_marketing_pillar_netstrategy_6_1_53c63b704e.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.659Z",
                  updatedAt: "2023-07-28T09:05:26.659Z",
                },
              },
              {
                id: 5255,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-7 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 3648,
                  height: 5472,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_7_1_4ee106f3de.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_7_1_4ee106f3de",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-7 (1).jpg",
                      path: null,
                      size: 47.45,
                      width: 667,
                      height: 1000,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_7_1_4ee106f3de.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_7_1_4ee106f3de",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-7 (1).jpg",
                      path: null,
                      size: 16.74,
                      width: 333,
                      height: 500,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_7_1_4ee106f3de.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_7_1_4ee106f3de",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-7 (1).jpg",
                      path: null,
                      size: 30.82,
                      width: 500,
                      height: 750,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_7_1_4ee106f3de.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_7_1_4ee106f3de",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-7 (1).jpg",
                      path: null,
                      size: 3.26,
                      width: 104,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_7_1_4ee106f3de",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 307.58,
                  url: "/uploads/web_marketing_pillar_netstrategy_7_1_4ee106f3de.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.244Z",
                  updatedAt: "2023-07-28T09:05:26.244Z",
                },
              },
              {
                id: 5257,
                attributes: {
                  name: "web-marketing-pillar-netstrategy-4 (1).jpg",
                  alternativeText: null,
                  caption: null,
                  width: 4752,
                  height: 3168,
                  formats: {
                    large: {
                      ext: ".jpg",
                      url: "/uploads/large_web_marketing_pillar_netstrategy_4_1_c78b61e3cb.jpg",
                      hash: "large_web_marketing_pillar_netstrategy_4_1_c78b61e3cb",
                      mime: "image/jpeg",
                      name: "large_web-marketing-pillar-netstrategy-4 (1).jpg",
                      path: null,
                      size: 79.12,
                      width: 1000,
                      height: 667,
                    },
                    small: {
                      ext: ".jpg",
                      url: "/uploads/small_web_marketing_pillar_netstrategy_4_1_c78b61e3cb.jpg",
                      hash: "small_web_marketing_pillar_netstrategy_4_1_c78b61e3cb",
                      mime: "image/jpeg",
                      name: "small_web-marketing-pillar-netstrategy-4 (1).jpg",
                      path: null,
                      size: 26.86,
                      width: 500,
                      height: 333,
                    },
                    medium: {
                      ext: ".jpg",
                      url: "/uploads/medium_web_marketing_pillar_netstrategy_4_1_c78b61e3cb.jpg",
                      hash: "medium_web_marketing_pillar_netstrategy_4_1_c78b61e3cb",
                      mime: "image/jpeg",
                      name: "medium_web-marketing-pillar-netstrategy-4 (1).jpg",
                      path: null,
                      size: 50.57,
                      width: 750,
                      height: 500,
                    },
                    thumbnail: {
                      ext: ".jpg",
                      url: "/uploads/thumbnail_web_marketing_pillar_netstrategy_4_1_c78b61e3cb.jpg",
                      hash: "thumbnail_web_marketing_pillar_netstrategy_4_1_c78b61e3cb",
                      mime: "image/jpeg",
                      name: "thumbnail_web-marketing-pillar-netstrategy-4 (1).jpg",
                      path: null,
                      size: 8.81,
                      width: 234,
                      height: 156,
                    },
                  },
                  hash: "web_marketing_pillar_netstrategy_4_1_c78b61e3cb",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 418.97,
                  url: "/uploads/web_marketing_pillar_netstrategy_4_1_c78b61e3cb.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2023-07-28T09:05:26.468Z",
                  updatedAt: "2023-07-28T09:05:26.468Z",
                },
              },
            ],
          },
        },
        heading_3: {
          id: 43,
          paragrafo: null,
          titolo: "News Web Marketing",
          rovesciato: false,
          sottotitolo: null,
          sottosopra: false,
          centra_verticalmente: false,
          allineamento_bottone: "right",
          allineamento_titolo: "initial",
          allinea_sotto: false,
          bottone: null,
        },
      },
    },
  },
  content: [],
  immagine_mobile: {
    data: null,
  },
};

export default function Specialist({
  data = sampleObj,
  mt,
  slug,
  staticData,
  btnIsScroll,
  showBtn = true,
}) {
  if (!data) return <></>;
  //! REFS ---
  const containerRef = useRef();
  const videoChildRed = useRef();
  const infoRef = useRef();
  const paragraphRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [opacityPause, setOpacityPause] = useState();
  //! SCROLL ----
  useEffect(() => {
    let SpecialistCtx = gsap.context(() => {
      // paragraph & cta
      gsap.from(paragraphRef.current, {
        y: "100%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      });
      // video Y
      gsap.from(`.videoRef`, {
        y: "50%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=10%",
          end: "-35% center",
          scrub: 1,
        },
      });
      // video scale
      gsap.from(`.videoRef > video`, {
        scale: "1",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          // markers: true,
        },
      });
      // info
      gsap.from([infoRef.current], {
        y: "500%",
        ease: "easeInOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
          // markers: true,
        },
      });
    }, containerRef.current);
    return () => {
      SpecialistCtx.revert();
    };
  }, []);

  const video = data.video_specialist?.data ? getPath(data.video_specialist?.data.attributes.url) : data.video.data
    ? getPath(data.video.data.attributes.url)
    : null;
  //! RESTART VIDEO ----
  const handleRestartClick = () => {
    if (videoChildRed.current) {
      videoChildRed.current.currentTime = 0;
      videoChildRed.current.play();
    }
  };

  useEffect(() => {

      gsap.utils.toArray(".specialist-video").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "-20% 100%",
            once: true,
            onEnter: () => {
                el.querySelector('source').setAttribute('src', el.querySelector('source').dataset.src);
                el.load();
                el.play();
            },
          },
        });
      });
   
  }, []);

  return (
    <Container mt={mt} ref={containerRef}>
      {/* Video */}
      <VideoContainer
        className="videoRef"
        onMouseEnter={() => setOpacityPause(true)}
        onMouseLeave={() => setOpacityPause(false)}
      >
        <video
          loop
          // autoPlay
          // preload="metadata"
          className="specialist-video"
          playsInline
          muted={isPlaying}
          ref={videoChildRed}
          title={
            data.titolo
              ? data.titolo
              : data.meta_name
              ? data.meta_name
              : "Un video dal nostro specialista"
          }
          description={data.meta_description ? data.meta_description : ""}
          duration={data.meta_duration ? data.meta_duration : ""}
          thumbnail={
            data.meta_thumbnail?.data ? getPath(data.meta_thumbnail.data.attributes.url) : ""
          }
          poster={
            data.cover_image
              ? data.cover_image
              : data.immagine && data.immagine?.data
              ? getPath(data.immagine.data.attributes.url)
              : ""
          }
        >
          <source data-src={video} />
        </video>
        {video && (
          <>
            <div
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
            >
              <ToggleAudioIcons
                bottom="9%"
                right="8%"
                isMutedTrigger={isPlaying}
              />
            </div>
            <div onClick={handleRestartClick}>
              <RestartVideoIcon
                onClick={() => {
                  setIsPlaying(!isPlaying);
                }}
                top="11%"
                left="7%"
              />
            </div>
          </>
        )}
      </VideoContainer>
      {/* Info */}
      <InfoContainer ref={infoRef}>
        <span>{data.utente.data && 'Meet'}</span>
        <span>{data.utente.data && data.utente.data.attributes.ruolo}</span>
        <span>{data.utente.data && data.utente.data.attributes.nome}</span>
      </InfoContainer>
      {/* Paragraph & cta */}
      <ParagraphContainer ref={paragraphRef} showBtn={showBtn}>
        {data.titolo && <h3>{data.titolo}</h3>}
        <p>{data.paragrafo}</p>
        {showBtn ? (
          btnIsScroll ? (
            <BtnContainerDesktop
              onClick={() => {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: "#contact",
                  ease: "Power3.easeOut",
                });
              }}
            >
              <PrimaryButton>{staticData.cta}</PrimaryButton>
            </BtnContainerDesktop>
          ) : (
            <BtnContainerDesktop>
              {/* data.meta_thumbnail?.data ? getPath(data.meta_thumbnail.data) : data.cover_image
          ? data.cover_image
          : data.immagine && data.immagine?.data
          ? getPath(data.immagine.data.attributes.url)
          : "" */}
              <RedLink
                img={data.meta_thumbnail?.data ? getPath(data.meta_thumbnail.data.attributes.url) : data.cover_image
                  ? data.cover_image
                  : data.immagine && data.immagine?.data
                  ? getPath(data.immagine.data.attributes.url)
                  : ""}
                link={getPath(`/${slug}/${data.slug}`, true)}
              >
                <PrimaryButton>{staticData.cta_blog}</PrimaryButton>
              </RedLink>
            </BtnContainerDesktop>
          )
        ) : (
          ""
        )}
      </ParagraphContainer>
      {showBtn ? (
        btnIsScroll ? (
          <BtnContainerMobile
            onClick={() => {
              gsap.to(window, {
                duration: 1,
                scrollTo: "#contact",
                ease: "Power3.easeOut",
              });
            }}
          >
            <PrimaryButton>{staticData.cta}</PrimaryButton>
          </BtnContainerMobile>
        ) : (
          <BtnContainerMobile>
            <RedLink img={video} link={getPath(`/${slug}/${data.slug}`, true)}>
              <PrimaryButton>{staticData.cta_blog}</PrimaryButton>
            </RedLink>
          </BtnContainerMobile>
        )
      ) : (
        ""
      )}
    </Container>
  );
}

//! STYLE ---
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  display: grid;
  row-gap: 2.5rem;
  column-gap: 2rem;

  @media (min-width: 1280px) {
    grid-template-columns: 1fr auto 1fr;
    place-items: center;

    & div:nth-child(1) {
      order: 2;
    }

    & div:nth-child(2) {
      order: 1;
    }

    & div:nth-child(3) {
      order: 3;
    }
  }
`;

const VideoContainer = styled.div`
  width: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem);
  height: clamp(21.56rem, calc(18.06rem + 14.95vw), 36rem);
  aspect-ratio: 1 / 1;
  justify-self: center;
  position: relative;
  border-radius: 50%;
  @media (max-width: 550px) {
    width: 100%;
    height: 100%;
  }

  video {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative !important;
    display: block;
  }
`;

const InfoContainer = styled.div`
  span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
  }

  & span:first-child {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  span {
    display: block;
    line-height: 1.1em;
  }
`;

const ParagraphContainer = styled.div`
  width: ${({ showBtn }) => (showBtn ? "100%" : "100%")};
  /* text-align: ${({ showBtn }) => (showBtn ? "initial" : "right")}; */
  margin-left: auto;
  font-family: ${(props) => props.theme.fonts.regular};

  h3 {
    color: ${(props) => props.theme.colors.primaryColor};
    margin-bottom: 30px;
    font-size: ${(props) => props.theme.fontSizes.size_16_25};
  }

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1280px) {
    width: 85%;
    margin: 0 auto;
  }

  @media (min-width: 1455px) {
    width: 70%;
  }
`;

const BtnContainerMobile = styled.div`
  margin-top: clamp(0rem, calc(-0.83rem + 3.54vw), 2rem); // 0px → 32px
  display: flex;
  justify-content: center;

  @media (min-width: 1280px) {
    display: none;
  }
`;

const BtnContainerDesktop = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: inline-block;
    margin-top: clamp(1.25rem, calc(1.01rem + 1.2vw), 2.5rem);
  }
`;

const MuteIconContainer = styled.div``;
