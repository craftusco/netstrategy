import ContactForm from '@/components/ContactForm';
import Divider from '@/components/Divider';
import Heading from '@/components/Heading';
import HeroPages from '@/components/HeroPages';
import Footer from '@/components/Footer';
import Event from '@/components/Event';
import styled from 'styled-components';
import { centerContent } from '@/styles/mixins';
import ImageSlider from '@/components/ImageSlider';
import TalkHeading from '@/components/TalkHeading';
import SplittedTitle from '@/components/utils/SplittedTitle';
import Talk from '@/components/utils/Talk';
import PrimaryButton from '@/components/utils/PrimaryButton';
import Cards from '@/components/Cards';
import DinamicImages from '@/components/DinamicImages';
import VideoSlider from '@/components/VideoSlider';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import getStaticData from '@/utils/getStaticData';
import dataRequest from '@/utils/dataRequest';
import { strapiGetDataFromQueryURL } from '@/utils/proxyUrl';
import Head from 'next/head';
import PushStructureData from '@/components/PushStructureData';
import { useRouter } from 'next/router';

gsap.registerPlugin(ScrollTrigger);

let sData = {
  heading2: {
    title: `Memories.`,
    subtitle: `Rivivi con noi i momenti più memorabili degli ultimi NetTalk.`,
  },
  heading3: {
    title: `Feedback.`,
    subtitle: `Ascolta l’esperienza diretta dei partecipanti ai NetTalk. 
    Guarda ora le video-interviste.`,
  },
};

// const getStaticAgenda = async () => {
//   const toPaginate = 3;
//   const toEditPage = 2;

// let query =`https://www.netstrategy.it/api/talk-details`;
//   query += `?pagination[pageSize]=${toPaginate}`;
//   query += `&pagination[page]=${toEditPage}`;
//   query += `&sort[0]=data%3Adesc`;
//   query += `&populate=deep,3`;

//   const response = await fetch(strapiGetDataFromQueryURL, {
//     method: 'POST',
//     body: JSON.stringify({ url: query }),
//   });
//   return await response.json();
// };

export async function getStaticProps() {
  const urls = [
    {
      name: 'page',
      url: `https://www.netstrategy.it/api/talk?populate=deep,5`,
    },
    {
      name: 'list',
      url: `https://www.netstrategy.it/api/talk-details?pagination[pageSize]=3&pagination[page]=1&populate=deep,3&sort[0]=data%3Adesc`,
      just_fetch: true,
    },
    {
      name: 'agenda',
      url: `https://www.netstrategy.it/api/talk-details?pagination[pageSize]=3&pagination[page]=1&sort[0]=data%3Adesc&populate=deep,3`,
    }
  ];

  const staticData = await getStaticData();
  const data = await dataRequest(urls);

  return await { props: { data, staticData } };
}

export default function index({ data, staticData }) {
  const talk = data.page.attributes;
  
  const [list, setList] = useState(data.agenda ?? []);
  const [toPaginate, setToPaginate] = useState(3);
  const [total, setTotal] = useState(data.list.meta.pagination.total);
  const [page, setPage] = useState(1);
  const divider = talk.divisore
    ? [talk.divisore.sinistra, talk.divisore.centro, talk.divisore.destra]
    : ['building', 'future', 'togheter'];

  //! scroll animation
  const headingTalkListRef = useRef();
  const talkListContainerRef = useRef();

  const getArticles = async () => {
    let toEditPage = page + 1;
    setPage(toEditPage);

    let query = `https://www.netstrategy.it/api/talk-details`;
    query += `?pagination[pageSize]=${toPaginate}`;
    query += `&pagination[page]=${toEditPage}`;
    query += `&sort[0]=data%3Adesc`;
    query += `&populate=deep,3`;

    const response = await fetch(strapiGetDataFromQueryURL, {
      method: 'POST',
      body: JSON.stringify({ url: query }),
    });
    const events = await response.json();

    let arr = [];

    if (events.data) {
      arr = list.concat(events.data);
    } else {
      arr = list;
    }
    setList(arr);
  };

  const getData = () => {
    getArticles();
  };

  useEffect(() => {
    // setList(data.list.data);

    let NetTalkCtx = gsap.context(() => {
      //event agenda heading
      gsap.from(headingTalkListRef.current, {
        y: '100%',
        ease: 'easeInOut',
        scrollTrigger: {
          trigger: talkListContainerRef.current,
          start: 'top bottom',
          end: 'top bottom-=10%',
          scrub: 1.5,
        },
      });
      gsap.utils.toArray('.event-container-ref')?.forEach((el) => {
        gsap.from(el.querySelectorAll(':scope > div > *'), {
          y: '100%',
          ease: 'easeInOut',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top bottom-=10%',
            scrub: 2,
          },
        });
      });
    }, talkListContainerRef.current);
    return () => NetTalkCtx.revert();
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  });

  const router = useRouter();

  return (
    <>
      <Head>
        <PushStructureData page={data.page} router={router} />
      </Head>
      <div>
        <HeroPages data={talk.hero} staticData={staticData}>
          <SplittedTitle firstHalf="Net" secondHalf="Talk" />
        </HeroPages>
        {/* Section */}
        <Divider words={divider} mt="4rem" />
        <Heading data={talk.intro} mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
        <Divider />
        {/* Talks list */}
        <TalkList ref={talkListContainerRef}>
          <HeadingTalkList ref={headingTalkListRef}>
            <h2>
              <span>
                <Talk color={'black'} theme={false} secondPart="alks"></Talk>
              </span>
              <span className="uppercase">Agenda.</span>
            </h2>
          </HeadingTalkList>
          <div className="bordered-container"></div>

          {/* LISTA EVENTI */}

          {list.map((d, i) => (
            <Event data={d.attributes} key={i} />
          ))}
        </TalkList>
        {total > page * toPaginate && (
          <CenteredContent className='load-more--button agenda-content'>
            <div className="bordered-container"></div>
            <div onClick={() => getData()}>
              <PrimaryButton>
                <Plus>+</Plus>
              </PrimaryButton>
            </div>
          </CenteredContent>
        )}
        {/* Feedback */}
        <Divider words={divider} />
        <TalkHeading
          mt="clamp(3.00rem, calc(2.51rem + 2.07vw), 4.00rem)"
          data={sData.heading3}
          talk
        />
        {/* Video Slider */}
        <VideoSlider data={talk.video_slider} mt="clamp(3.13rem, calc(1.92rem + 6.02vw), 9.38rem)" />
        {/* Image slider */}
        <DinamicImages mt="clamp(5.00rem, calc(6.21rem + -5.18vw), 0.00rem)" />

        <Divider words={divider} />
        <TalkHeading
          mt="clamp(2.8em, calc(2.2rem + 2.07vw), 4.00rem)"
          data={sData.heading2}
          reverse={true}
          talk
        />
        {/* </DinamicImages> */}
        <ImageSlider
          data={talk.immagini_slider.immagini}
          mt="clamp(2rem, calc(1.03rem + 4.14vw), 6rem)"
        />
        {/* Form */}
        <Divider words={divider} />
        <ContactForm mt="clamp(2.8rem, calc(2.2rem + 2.07vw), 4.00rem)" />
        {/* Footer */}
        <Footer staticData={staticData} />
      </div>
    </>
  );
}

// Style
const HeadingTalkList = styled.div`
  ${centerContent}
  margin-top: clamp(3.00rem,calc(2.51rem + 3.07vw),7.00rem);
  margin-bottom: 2rem;
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

    @media (min-width: 780px) {
      span {
        display: inline-block;
      }
      .uppercase {
        margin-left: 20px;
      }
    }
  }
`;

// List
const TalkList = styled.div`
  ${centerContent}
  margin-top: clamp(1.50rem, calc(1.40rem + 0.48vw), 2.00rem);
  .bordered-container {
    width: 100%;
    border-top: 1px solid black;
  }
  @media (min-width: 1024px) {
    .bordered-container {
      display: none;
    }
  }
`;

const CenteredContent = styled.div`
  ${centerContent}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(4rem, calc(0.06rem + 5.5vw), 7rem);
  flex-direction: column;
  .bordered-container {
    width: 100%;
    border-top: 1px solid black;
    padding-top: clamp(1.25rem, calc(1.49rem + -1.2vw), 0rem);
  }
  @media (min-width: 1024px) {
    .bordered-container {
      display: none;
    }
  }
`;

const Plus = styled.div`
  padding: 0px 80px;
  font-size: 40px;
  line-height: 0;
`;
