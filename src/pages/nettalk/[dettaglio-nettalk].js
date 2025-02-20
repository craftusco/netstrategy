import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import TalkHeading from "@/components/TalkHeading";
import ImageSlider from "@/components/ImageSlider";
import Heading from "@/components/Heading";
import Specialist from "@/components/Specialist";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import EventProgram from "@/components/EventProgram";
import DetailedTitle from "@/components/utils/DetailedTitle";
import Talk from "@/components/utils/Talk";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import getStaticData from "@/utils/getStaticData";
import dataRequest from "@/utils/dataRequest";
import moment from "moment";
import { strapiGetDataFromQueryURL } from "@/utils/proxyUrl";
import Head from "next/head";
import PushStructureData from "@/components/PushStructureData";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

const sData = {
  heading2: {
    title: `Memories`,
    subtitle: `Rivivi con noi i momenti più memorabili degli ultimi NetTalk.`,
  },
};

export async function getStaticPaths() {
  const response = await fetch(strapiGetDataFromQueryURL, { 
    method: 'POST',
    body: JSON.stringify({url: 'https://www.netstrategy.it/api/talk-details?pagination[limit]=-1&populate=deep,1&fields[0]=slug'})
  });

  const { data } = await response.json();
  //creating an array of objects
  const paths = data.map((el) => {
    return {
      params: {
        "dettaglio-nettalk": `${el.attributes.slug.trim()}`,
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
      url: `https://www.netstrategy.it/api/talk-details?populate=deep,5&filters[slug]=${params["dettaglio-nettalk"]}`,
    },
    {
      name: "index",
      url: `https://www.netstrategy.it/api/talk?populate=deep,5`,
    },
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  if (data.page.length == 0)
    return {
      notFound: true,
    };

  return await { props: { data, staticData, pageName: "nettalk" } };
}

export default function eventDetail({ data, staticData }) {
  const event = data.page;
  const image_slider = data.index.attributes.immagini_slider.immagini;

  const getFormattedDate = (d) => {
    const date = moment(d);
    const day = date.format("DD");
    const month = date.format("MMM.");
    const year = date.format("YYYY");
    return `${day}
    ${month}
    ${year}`;
  };

  const getTime = (start, end) => {
    const s = moment(start, "h:m").format("HH:mm");
    const e = moment(end, "h:m").format("HH:mm");
    return `DALLE ${s}
    ALLE ${e}`;
  };

  event.intro.titolo = getFormattedDate(event.data);

  const infoDetailTitle = {
    titolo: event.titolo,
    sottotitolo: event.sottotitolo,
    info: [
      {
        titolo: "",
        sottotitolo: `WELCOME IN OUR TALK
        IT'S TIME TO CONNECT`,
      },
      {
        titolo: "dove",
        sottotitolo: event.locazione,
      },
      {
        titolo: "quando",
        sottotitolo: getTime(event.orario_inizio, event.orario_fine),
      },
    ],
  };

  const headingCopy = {
    title: staticData.contact.titolo,
    subtitle: data.index.attributes.form_titolo,
    paragraph: data.index.attributes.form_paragrafo,
  };

  useEffect(() => {
    let eventDetailProgram = gsap.context(() => {
      // //event agenda heading
      // gsap.from(headingTalkListRef.current, {
      //   y: "100%",
      //   ease: "easeInOut",
      //   scrollTrigger: {
      //     trigger: talkListContainerRef.current,
      //     start: "top bottom",
      //     end: "top bottom-=10%",
      //     scrub: 1.5,
      //   },
      // });
      gsap.utils.toArray(".program-container-ref")?.forEach((el) => {
        gsap.from(el.querySelectorAll(":scope > div > *"), {
          y: "100%",
          ease: "easeInOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%",
            end: "top center",
            scrub: 2,
          },
        });
      });
    });
    return () => eventDetailProgram.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  });

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} pillarData={{
          pillar: {
            data: {
              attributes: {
                nome: 'nettalk'
              }
            }
          }
        }} />
      </Head>
      <div>
        <HeroPages staticData={staticData} data={event.hero}>
          <DetailedTitle data={infoDetailTitle} />
        </HeroPages>
        <Divider mt="4rem" />
        <Heading data={event.intro} />
        {event.specialist.data && (
          <>
            <Divider />
            <HeadingTalkList>
              <h2>
                <span>
                  <Talk color={"black"} theme={false} secondPart="alk"></Talk>
                </span>
                <span className="uppercase">present.</span>
              </h2>
            </HeadingTalkList>
            <Specialist
              data={event?.specialist?.data?.attributes}
              slug="blog"
              staticData={{ cta: "Iscriviti" }}
              mt="clamp(1.88rem, calc(1.72rem + 0.65vw), 2.5rem)"
              btnIsScroll={true}
            />
          </>
        )}
        <Divider />
        <HeadingTalkList>
          <h2>
            <span>
              <Talk color={"black"} theme={false} secondPart="alk"></Talk>
            </span>
            <span className="uppercase">program.</span>
          </h2>
        </HeadingTalkList>
        <EventProgram data={event.programma} notPast={event.data && moment().diff(moment(event.data), "days") < 0} mt="3rem" />
        <Divider />
        <TalkHeading
          mt="clamp(3rem,calc(3.64rem + 8.55vw),9.5rem)"
          data={sData.heading2}
          reverse={true}
        />
        <ImageSlider
          data={image_slider}
          mt="clamp(2.00rem, calc(-5.98rem + 10.64vw), 7.19rem)"
        />
        {event.data && moment().diff(moment(event.data), "days") < 0 && (
          <>
            <Divider />
            {
              (data.page.form_tag) ?
                <>
                <ContactForm
                  formTag={data.page.form_tag}
                  headingCopy={headingCopy}
                  formType="evento"
                  mt="clamp(3rem,calc(3.64rem + 8.55vw),9.5rem)"
                  date={event.data}
                  eventName={`${infoDetailTitle.titolo} - ${infoDetailTitle.sottotitolo}`}
                />
                </>
              :
                <ContactForm
                  formTag='evento'
                  headingCopy={headingCopy}
                  formType="evento"
                  mt="clamp(3rem,calc(3.64rem + 8.55vw),9.5rem)"
                  date={event.data}
                  eventName={`${infoDetailTitle.titolo} - ${infoDetailTitle.sottotitolo}`}
                />
            }
          </>
        )}

        <Footer staticData={staticData} />
      </div>
    </>
  );
}
// Style
// Feedback
// Style
const HeadingTalkList = styled.div`
  ${centerContent}
  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    line-height: 0.91em;
    text-align: center;
    display: block;
    width: fit-content;
    margin: auto;
    > span {
      display: block;
    }

    & > span:nth-child(2) {
      text-transform: uppercase;
    }

    @media (min-width: 1280px) {
      span {
        display: inline-block;
      }
      .uppercase {
        margin-left: 40px;
      }
    }
  }
`;
