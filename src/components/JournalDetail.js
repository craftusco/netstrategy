import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import HeroPages from "@/components/HeroPages";
import JournalChapter from "@/components/JournalChapter";
import DetailedTitle from "@/components/utils/DetailedTitle";
import { useState, useEffect } from "react";
import styled from "styled-components";
import toSlugText from "@/utils/toSlugText";
import { centerContent } from "@/styles/mixins";
import ShareLinks from "@/components/utils/ShareLinks";
import React from "react";
import BlogContentIndex from "@/components/BlogContentIndex";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Links from "@/components/Links";
import moment from "moment";
import BlogBreadcrumbs from "./BlogBreadcrumbs";
import BlogContactBtns from "./BlogContactBtns";
import { Breadcrumb } from "./Breadcrumb";
import Head from "next/head";
import PushStructureData from "./PushStructureData";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// let articoloFakeData = {
//   hero: {
//     video: "/video1.mp4",
//     titolo: "19.04.23",
//     sottotitolo: `Lancio di un prodotto sul mercato: cosa
//     fare prima, durante e dopo`,
//     info: [
//       {
//         subtitle: `CATEGORIA: WEB MARKETING`,
//       },
//       {
//         author: `STEFANO ROBBI`,
//         // subtitle: `When
//         // From 08:00
//         // to 18:00`,
//       },
//     ],
//     spanHeader: "Building future together",
//     loader: {
//       span: `Welcome in NetStrategy`,
//       text: `Building
//       future
//       together`,
//     },
//     span: "07.07.22",
//     subtitle: `Lancio di un prodotto sul mercato: cosa
//     fare prima durante e dopo`,
//     name: `19.04.23`,
//     img: "/jou2.jpg",
//     linksHeader: [
//       { name: "Connect", link: "https://www.instagram.com" },
//       { name: "Services", link: "https://www.Linkedin.com" },
//       { name: "Projects", link: "https://www.Youtube.com" },
//       { name: "Culture", link: "https://www.Youtube.com" },
//     ],
//     menu: {
//       footer: {
//         copy: "©2023",
//         social: [
//           { name: "Instagram", link: "https://www.instagram.com" },
//           { name: "LinkedIn", link: "https://www.Linkedin.com" },
//           { name: "Youtube", link: "https://www.Youtube.com" },
//         ],
//         policy: {
//           name: "Privacy & Cookie Policy",
//           link: "privacy-cookie-policy",
//         },
//       },
//       text_1: `We are a branding and digital design agency building products, services, and eCommerce experiences that turn cultural values.`,
//       text_2: `We are a branding and digital design agency building products, services, and eCommerce experiences that turn cultural values.`,
//       pillars: [
//         {
//           name: `Web marketing`,
//           link: "/web-marketing",
//         },
//         {
//           name: `Comunicazione`,
//           link: "/comunicazione",
//         },
//         {
//           name: `E-Commerce`,
//           link: "/ecommerce",
//         },
//         {
//           name: `Website`,
//           link: "/website",
//         },
//         {
//           name: `Seo`,
//           link: "/seo",
//         },
//         {
//           name: `Social`,
//           link: "/social",
//         },
//         {
//           name: `Inbound`,
//           link: "/inbound",
//         },
//         {
//           name: `Crm`,
//           link: "/crm",
//         },
//       ],
//       nav: [
//         {
//           name: `Culture`,
//           number: "28",
//           img: "/test2.jpg",
//           link: "/culture",
//         },
//         {
//           name: `Services`,
//           number: "35",
//           img: "/test.jpg",
//         },
//         {
//           name: `Projects`,
//           number: "14",
//           link: "/projects",
//           img: "/proj.jpg",
//         },
//         {
//           name: `Events`,
//           number: "21",
//           link: "/events",
//           img: "/talk.jpg",
//         },
//         {
//           name: `Journal`,
//           number: "47",
//           link: "/journal",
//           img: "/test6.jpg",
//         },
//         {
//           name: `Connect`,
//           number: "15",
//           link: "/connect",
//           img: "/test5.jpg",
//         },
//       ],
//       copy: "©2023",
//       social: [
//         { name: "Instagram", link: "https://www.instagram.com" },
//         { name: "Linkedin", link: "https://www.Linkedin.com" },
//         { name: "Youtube", link: "https://www.Youtube.com" },
//       ],
//       social: [
//         { name: "Privacy", link: "privacy" },
//         { name: "Cookie Policy", link: "cookie-policy" },
//       ],
//     },
//   },
//   heading: {
//     title: `It's
//     time to
//     rank`,
//     subtitle: `Con i nostri servizi di Web
//     Marketing ti aiutiamo a lasciare
//     un segno. Un segno indelebile.`,
//     paragraph: `Pronto a diventare leader del tuo settore anche nel mercato digitale?
//     Se non promuovi efficacemente la tua attività sui canali online, probabilmente stai perdendo opportunità commerciali. I tuoi concorrenti ringraziano. È arrivato il momento di investire in dei servizi di Web Marketing, per elevare la visibilità della tua azienda, fare meglio della concorrenza e allargare il tuo bacino di clienti.
//     Pronto a diventare leader del tuo settore anche nel mercato digitale? Se non promuovi efficacemente la tua attività sui canali online, probabilmente stai perdendo opportunità commerciali. I tuoi concorrenti ringraziano. `,
//   },
//   chapters: [
//     {
//       title: `Esempi strategie di marketing: scopri quali sono le migliori per la tua azienda.`,
//       paragraph: `Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo. Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo.

//       Lorem Ipsum is simply dummy text of the printing and typesetting industry. **Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.** It has survived not only five centuries, but also the leap into Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//       industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
//       `,
//     },
//     {
//       title: `Test capitolo 2 di marketing: scopri quali sono le migliori per la tua azienda.`,
//       paragraph: `Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo. Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo.

//       industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
//       Lorem Ipsum is simply dummy text of the printing and typesetting industry. **Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.** It has survived not only five centuries, but also the leap into Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//     },
//     {
//       title: `Conclusione di marketing: scopri quali sono le migliori per la tua azienda.`,
//       paragraph: `Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo. Sono ancora molte le aziende che non pianificano accuratamente le proprie strategie di marketing lasciando al caso o all’inerzia l’evoluzione della propria impresa. In altri casi, invece, l’imprenditore o l’amministratore di una società si cimenta nell’implementazione di alcune idee o bozze di strategia, ma con il grande dubbio sull’efficacia della stessa nel medio e lungo periodo.

//       industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
//       Lorem Ipsum is simply dummy text of the printing and typesetting industry. **Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.** It has survived not only five centuries, but also the leap into Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
//     },
//   ],
//   imageSlider: ["/test3.jpg", "/test.jpg", "/test3.jpg", "/test.jpg"],
//   imagesGrid: ["/test2.jpg", "/test.jpg", "/test3.jpg", "/test.jpg"],
//   fullImage: "/test4.jpg",
//   news: {
//     title: `News Seo`,
//     news: [
//       {
//         img: "/test2.jpg",
//         title:
//           "Product Review Update Google: tutto quello che devi sapere sul nuovo aggiornamento",
//       },
//       {
//         img: "/test.jpg",
//         title: "Trend Marketing 2023: ecco i 4 principali secondo NetStrategy",
//       },
//       {
//         img: "/test3.jpg",
//         title:
//           "Analisi SEO competitors: come si svolge e quali dati ti servono?",
//       },
//       {
//         img: "/test2.jpg",
//         title:
//           "Product Review Update Google: tutto quello che devi sapere sul nuovo aggiornamento",
//       },
//       {
//         img: "/test.jpg",
//         title: "Trend Marketing 2023: ecco i 4 principali secondo NetStrategy",
//       },
//       {
//         img: "/test3.jpg",
//         title:
//           "Analisi SEO competitors: come si svolge e quali dati ti servono?",
//       },
//     ],
//   },
//   links: {
//     title: `Altri spunti per approfondire il web marketing:`,
//     links: [
//       {
//         name: `Agenzia Digital Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Agenzia Lead Generation`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Agenzia Web Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Agenzia Web Marketing Verona`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Consulente Google Ads`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Consulenza Web Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Formazione Web Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Preventivo Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Preventivo Web Marketing`,
//         link: `seo/marketing`,
//       },
//       {
//         name: `Web Agency`,
//         link: `seo/marketing`,
//       },
//     ],
//   },
// };

// export async function getStaticPaths() {
//   const response = await fetch(
//     "https://www.netstrategy.it/api/journal-details?pagination[limit]=-1&populate=deep,1&fields[0]=slug",
//     {
//       method: "GET",
//       headers,
//     }
//   );

//   const { data } = await response.json();
//   //creating an array of objects
//   const paths = data.map((el) => {
//     return {
//       params: {
//         "dettaglio-blog": `${el.attributes.slug.trim()}`,
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const urls = [
//     {
//       name: "page",
//       url: `https://www.netstrategy.it/api/journal-details?populate=deep,4&filters[slug]=${params["dettaglio-blog"]}`,
//     },
//     {
//       name: "list",
//       url: "https://www.netstrategy.it/api/journal-details?pagination[limit]=-1&populate=deep,1&fields[0]=slug&sort[0]=createdAt%3Aasc",
//     },
//   ];

//   const staticData = await getStaticData();
//   const data = await dataRequest(urls);

//   if (data.page.length == 0)
//     return {
//       notFound: true,
//     };

//   return { props: { data, staticData, pageName: 'dettaglio-blog' }};
// }

export default function JournalDetail({ data, staticData, breadcrumbLinks }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);

  const articolo = data.page;
  const articleDate = articolo.updatedAt
  const heroData = {
    titolo: moment(articleDate).format("DD.MM.YY"),
    sottotitolo: articolo.titolo,
    info: [
      {
        titolo: "",
        sottotitolo: articolo.categoria.data.attributes.nome,
      },
      {
        author: articolo?.utente?.data?.attributes.nome,
        slug: articolo?.utente?.data?.attributes.slug,
      },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (ScrollTrigger.getById("chapters-st"))
        ScrollTrigger.getById("chapters-st").refresh();
    };

    window.addEventListener("resize", handleResize);

    setWindowWidth(window.innerWidth);

    // setactive chap on scroll
    
    const chapters = gsap.utils.toArray(".chapter-ref");

    // FIX TEMPORANEO
    // chapters.forEach((chap, index) => {
    //   // ScrollTrigger.create({
    //   //   trigger: chap,
    //   //   start: "top 50%",
    //   //   end: "top 50%",
        
        
        
    //   //   // markers: true,
    //   //   // toggleClass: { targets: "[class*='JournalChapter__Container']", className: "active" }
    //   //   onEnter: () => {
    //   //     setActiveChapter(index);
    //   //   },
    //   //   onEnterBack: () => {
    //   //     setActiveChapter(index === 0 ? 0 : index - 1);
    //   //   },
    //   //   id: "chapters-st",
    //   // });
    // });
    // end setactive chap on scroll
    ScrollTrigger.create({
      trigger: ".bci-container-ref",
      // markers: true,
      start: "top-=100px top",
      end: "bottom bottom",
      // toggleClass: { targets: "[class*='JournalChapter__Container']", className: "active" }
      onEnter: () => {
        const BlogIndex = document.querySelector(".bci-content-ref");
        if (!BlogIndex) return;
        BlogIndex.style.paddingTop = "1.4rem";
        BlogIndex.style.borderTopWidth = "0";
      },
      onEnterBack: () => {
        const BlogIndex = document.querySelector(".bci-content-ref");
        if (!BlogIndex) return;
        BlogIndex.style.paddingTop = "0rem";
        BlogIndex.style.borderTopWidth = "1px";
      },
      onRefresh: (scrollTrigger) => {
        if (scrollTrigger.progress == 0) return;
        // console.log("SCROLL PROGRESS" , scrollTrigger.progress);
        const BlogIndex = document.querySelector(".bci-content-ref");
        if (!BlogIndex) return;
        BlogIndex.style.paddingTop = "1.4rem";
        BlogIndex.style.borderTopWidth = "0";
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleIndexClick = (e, dest) => {
  //   e.preventDefault();
  //   gsap.to(window, { duration: 1, scrollTo: dest, ease: "Power3.easeOut" });
  // };

  const nextChapt = (e, index, chapTitle) => {
    // document.getElementById(toSlugText(chapTitle)).scrollIntoView();
    // console.log(`#${toSlugText(chapTitle)}`);
    e.preventDefault();
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${toSlugText(chapTitle)}`, offsetY: 100 },
      ease: "Power3.easeOut",
    });
    // onIndexClick(index);
  };

  // useEffect(() => {
  //   let chaptersListCtx = gsap.context(() => {
  //     gsap.utils.toArray('[class*="JournalChapter__Container"] > div:first-child').forEach((el, index) => {
  //       gsap.from(el, {
  //         scrollTrigger: {
  //           trigger: el,
  //           start: "top-=100% bottom",
  //           end: "top-=100% bottom",
  //           scrub: 1.5,
  //           onEnter: () => { setActiveChapter(index)},
  //           onEnterBack: () => { setActiveChapter(index - 1)},
  //           markers: true
  //         },
  //         y: "100%",
  //         ease: "easeInOut",
  //         duration: 0.2,
  //       });
  //     });
  //   }, '.chapters-container');
  //   return () => chaptersListCtx.revert();
  // }, []);

  const imageFromBlogIndex = data.blog_index_data.attributes.hero
    .immagine_mobile.data
    ? data.blog_index_data.attributes.hero.immagine_mobile.data.attributes.url
    : data.blog_index_data.attributes.hero.immagine.data.attributes.url;
  //! COMPONENT

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} pillarData={data?.pillar_data} />
      </Head>
      <div>
        <HeroPages data={articolo} staticData={staticData} imgOverlay page="blog">
          <DetailedTitle
            data={heroData}
            activeChapter={activeChapter}
          ></DetailedTitle>
        </HeroPages>
        {/* Breadcrumb */}
        <Breadcrumb links={breadcrumbLinks} isBlog={true} />
        <BlogContentIndex
          chapters={articolo.content}
          activeChapter={activeChapter}
          onIndexClick={(childIndex) => setActiveChapter(childIndex)}
        />
        <BlogBreadcrumbs
          category={articolo.categoria.data.attributes.nome}
          imageFromBlogIndex={imageFromBlogIndex}
        />
        <ChaptersContainer>
          <Title>
            <TitleWrapper>
              {/* {articolo.titolo && <h2>{articolo.titolo}</h2>} */}
              {/* <ShareLinks align="left" /> */}
              <ContentIndexWrapper>
                <ContentIndex>
                  <span className="title">Indice dei contenuti</span>
                  <ul>
                    {articolo.content.map((chap, index) => (
                      <li
                        onClick={(e) => nextChapt(e, index, chap.title)}
                        className={activeChapter === index ? "active" : ""}
                        key={index}
                      >
                        <a href={`#${toSlugText(chap.title)}`}>
                          <span className="dot">●</span> {chap.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </ContentIndex>
              </ContentIndexWrapper>
              <BlogContactBtns />
            </TitleWrapper>
          </Title>
          <Chapters>
            {articolo.content.map((chapter, index, chapters) => (
              <React.Fragment key={index}>
                <JournalChapter
                  chapter={chapter}
                  mt="clamp(4.13rem, calc(3.31rem + 3.5vw), 7.5rem)"
                  isFirst={index === 0 ? true : false}
                  isLast={index === articolo.content.length - 1 ? true : false}
                  chapters={chapters}
                  activeChapter={activeChapter}
                  onIndexClick={(childIndex) => setActiveChapter(childIndex)}
                  firstParagrafo={articolo.paragrafo}
                />
                {index == chapters.length - 1 && windowWidth > 1080 && (
                  <ContainerShareLinks>
                    <ShareLinks title="It's time to share" align="right" />
                  </ContainerShareLinks>
                )}
              </React.Fragment>
            ))}
          </Chapters>
        </ChaptersContainer>
        {/* <List data={data.list_blog} mt="clamp(2rem, calc(0.91rem + 4.66vw), 6.5rem)" /> */}
        <Links
          list={data.list}
          categorizedList={data.categorizedList}
          mt="clamp(4.5rem, calc(3.29rem + 7.18vw), 9.5rem)"
          isBlogPost
        />
        <Divider mt="clamp(2.00rem, calc(0.06rem + 8.28vw), 10.00rem)" />
        <ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
        {/* <Divider mt="clamp(2.00rem, calc(0.06rem + 8.28vw), 10.00rem)" />
        <Heading data={{title: "News Seo."}}/> */}
        {/* <NewsSlider
          data={data.news.news}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        /> */}
        {/* <Links
          data={data.links}
          mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
        /> */}
        <Footer staticData={staticData} />
      </div>
    </>
  );
}

const ContainerShareLinks = styled.div`
  ${centerContent}
  margin-top: 4rem;
`;

const Title = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  gap: 2rem;

  & > span {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    display: block;
    border-bottom: 1px solid;
    padding-bottom: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px
  }

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    max-width: 580px;

    @media (min-width: 1080px) {
      span {
        display: block;
      }
    }
  }

  @media (min-width: 1080px) {
    width: 50%;
  }
  @media (max-width: 1080px) {
    margin-bottom: 3rem;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    display: none;
  }
`;

const TitleWrapper = styled.div`
  position: sticky;
  top: 8rem;
  h2 {
    @media (max-width: 1080px) {
      font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }
  margin-top: 4rem;
`;

const ContentIndexWrapper = styled.div`
  flex-grow: 1;

  @media (max-width: 1080px) {
    display: none;
  }

  span.title {
    display: block;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_25};
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
  ul {
    list-style-type: none;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_22};
    margin-bottom: 4rem;
    max-height: calc(30vh - 25px);
    overflow: auto;
    padding-right: 10px;
    li {
      transition: color 200ms;
      /* margin-bottom: 0.25rem; */
      cursor: pointer;
      &.active {
        color: ${({ theme: { colors } }) => colors.primaryColor};
      }

      text-indent: -13px;
      margin-left: 13px;
      .dot {
        font-size: 10px;
        position: relative;
        bottom: 4px;
      }
    }
  }
`;

const ContentIndex = styled.div`
  max-width: 80%;
`;

const Chapters = styled.div`
  & article a:not(:hover) {
    color: #fc1333;
    text-decoration: none;
  }
`;

const ChaptersContainer = styled.div`
  ${centerContent}
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;

  & > * {
    width: 50%;
  }

  @media (max-width: 1080px) {
    & > * {
      width: 100%;
    }
  }
`;
