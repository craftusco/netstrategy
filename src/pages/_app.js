import Theme from "../styles/theme";
import GlobalStyle from "../styles/globalStyles";
import "../styles/fonts.css";
import "../styles/app.css";
import { store } from "redux/store";
import { Provider } from "react-redux";
import RedScreenLoader from "@/components/RedScreenLoader";
import CustomCursor from "@/components/utils/CustomCursor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import Menu from "@/components/Menu";
import IconLogo from "@/components/IconLogo";
import Contact from "@/components/Contact";
import dataRequest from "@/utils/dataRequest";
import getPath from "@/utils/getPath";
import Head from "next/head";
import TagManagerInitializer from "../lib/gtm";
import structuredData from "@/components/StructuredData";
import { usePathname } from "next/navigation";

gsap.config({
  nullTargetWarn: false,
});

export default function App({ Component, pageProps }) {
  // METTO DEI LINK STATICI IN MODO TALE CHE VENGANO PARSATI DA GOOGLE PRIMA DI PRENDERSI DA STRAPI I DATI DINAMICI CON LE CHIAMATE API
  let static_menu_links = [
    {
      name: "Agenzia",
      link: "/chi-siamo",
      video: false,
      img: "/transparent-fallback.webp",
      number: "",
    },
    {
      name: "servizi",
      number: "",
      img: "/transparent-fallback.webp",
      link: false,
    },
    {
      name: "successi",
      link: "/successi",
      video: false,
      img: "/transparent-fallback.webp",
      number: "",
    },
    {
      name: "eventi",
      link: "/nettalk",
      video: true,
      img: "/transparent-fallback.webp",
      number: "",
    },
    {
      name: "blog",
      link: "/blog",
      video: false,
      img: "/transparent-fallback.webp",
      number: "",
    },
    {
      name: "contatti",
      link: "/contatti",
      video: false,
      img: "/transparent-fallback.webp",
      number: "",
    },
  ];

  let static_pillar_links = [
    {
      img: "/transparent-fallback.webp",
      link: "/seo",
      name: "SEO",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/ecommerce",
      name: "ECOMMERCE",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/social",
      name: "SOCIAL",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/siti",
      name: "WEBSITE",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/crm",
      name: "crm",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/comunicazione",
      name: "comunicazione",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/inbound-marketing",
      name: "INBOUND MKTG",
    },
    {
      img: "/transparent-fallback.webp",
      link: "/web-marketing",
      name: "WEB MARKETING",
    },
  ];

  // if(data.hasOwnProperty('checkbox_privacy_2') == false){
  let page = null;

  if (pageProps?.data) {
    if (pageProps?.data?.page && pageProps?.data?.page.length !== 0) {
      page = pageProps?.data?.page?.attributes
        ? pageProps.data.page.attributes
        : pageProps.data.page
        ? pageProps.data.page
        : pageProps.data.autore
        ? pageProps.data.autore
        : null;
    } else {
      page = pageProps?.data?.subpillar2
    }
  }

  const router = useRouter();
  const [data, setData] = useState({});
  const [links, setLinks] = useState(static_menu_links);
  const [pillars, setPillars] = useState(static_pillar_links);
  const pathname  = usePathname()

  // per la pagina contatti metto meta-title e meta-description statici perchè essendo la pagina stata inclusa anche come compenente
  // non si riesco a passare dati da pageProps
  const contattiMeta = {
    title: "Vuoi concretizzare le tue aspirazioni? Contatta NetStrategy",
    description: `Se ambisci a raggiungere grandi risultati, hai bisogno di un Partner che sia all'altezza della tua ambizione. 
    Contattaci e scopriamo cosa possiamo fare insieme.`,
  };

  const urls = [
    {
      name: "menu",
      url: `https://www.netstrategy.it/api/menu?populate=deep,5`,
    },
    {
      name: "projects",
      url: `https://www.netstrategy.it/api/project-details?populate=deep,1&fields[]=id&pagination[limit]=1`,
      just_fetch: true,
    },
    {
      name: "nettalks",
      url: `https://www.netstrategy.it/api/talk-details?populate=deep,1&fields[]=id&pagination[limit]=1`,
      just_fetch: true,
    },
    {
      name: "blogs",
      url: `https://www.netstrategy.it/api/journal-details?populate=deep,1&fields[]=id&pagination[limit]=1`,
      just_fetch: true,
    },
  ];

  const fetchData = async () => {
    const d = await dataRequest(urls);
    setData(d);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (data.menu && data.menu.attributes) {
      const array = [];

      for (const key in data.menu.attributes) {
        if (Object.hasOwnProperty.call(data.menu.attributes, key)) {
          const element = data.menu.attributes[key];

          if (!element.hasOwnProperty("nome")) continue;

          const obj = {};

          obj.name = element.nome;

          if (element.relation) {
            obj.link = `/${element.relation.data.attributes.slug}`;
            obj.video = element.relation.data.attributes.hero?.video.data
              ? getPath(
                  element.relation.data.attributes.hero?.video.data.attributes
                    .url
                )
              : false;
            obj.img = element.relation.data.attributes.hero?.immagine.data
              ? getPath(
                  element.relation.data.attributes.hero?.immagine.data
                    .attributes.url
                )
              : false;
          }

          switch (key) {
            case "relation_culture":
              obj.number =
                element.relation.data.attributes.team.creators.data.length;
              obj.link = `/${element.relation.data.attributes.slug}`;
              obj.img = getPath(
                element.relation.data.attributes.hero.immagine.data.attributes
                  .url
              );
              break;

            case "relation_pillars":
              obj.number = element.pillars.data.length;
              obj.img = getPath(element.immagine.data.attributes.url);
              obj.link = false;
              const pills = [];

              element?.pillars?.data.forEach((el) => {
                const obj_pillar = {};
                obj_pillar.img = getPath(
                  el.attributes.hero.immagine.data.attributes.url
                );
                obj_pillar.link = `/${el.attributes.slug}`;
                obj_pillar.name = el.attributes.hero.nome;
                pills.push(obj_pillar);
              });

              setPillars(pills);
              break;

            case "relation_case_study":
              obj.number = data.projects.meta.pagination.total;
              break;

            case "relation_nettalk":
              obj.number = data.nettalks.meta.pagination.total;
              break;

            case "relation_contatti":
              obj.number = "";
              obj.img = "/hello4.png";
              break;

            case "relation_blog":
              obj.number = data.blogs.meta.pagination.total;
              break;
          }
          array.push(obj);
        }
      }

      setLinks(array);
    }
  }, [data]);

  const canonical = router.asPath ? router.asPath.split("?")[0] : router.asPath;

  return (
    <div>
      <Head>
        {
          
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  structuredData(
                    `https://netstrategy.it${router.asPath}`,
                    page?.tag_title,
                    page?.meta_description,
                    page?.updatedAt,
                    page
                  )
                ),
              }}
            ></script>
          
        }
        {/* <meta name="robots" content="noindex,nofollow" /> */}
        <link rel="canonical" href={`https://www.netstrategy.it${canonical}`} />
        <title>
          {router.asPath == "/contatti" ? contattiMeta.title : page?.tag_title}
        </title>
        <meta
          name="description"
          content={
            router.asPath == "/contatti"
              ? contattiMeta.description
              : page?.meta_description
          }
          key="desc"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <GlobalStyle />
        <Theme>
          <CustomCursor />
          {/* <ReactLenis root options={{ lerp: 0.05 }}> */}
          <main className="main" id="smooth-wrapper">
            <div id="smooth-content">
              <TagManagerInitializer pageName={pageProps.pageName} />
              <Component {...pageProps} />
            </div>
          </main>
          {/* </ReactLenis> */}
          <RedScreenLoader />
          {
            (pathname !== '/accessibilita-web') &&
                <>
                  <IconLogo />
                  <Contact />
                  <Menu data={data.menu?.attributes} links={links} pillars={pillars} />
                </>
          }
        </Theme>
        {/* </PersistGate> */}
      </Provider>
    </div>
  );
}