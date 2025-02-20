import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef, useState } from "react";
import StaticTitle from "@/components/utils/StaticTitle";
import dataRequest from "@/utils/dataRequest";
import getStaticData from "@/utils/getStaticData";

//! Pass data
export async function getStaticProps() {
  const urls = [
    {
      name: "page",
      url: `https://www.netstrategy.it/api/politica-aziendale?populate=team[populate][*]`,
    }
  ];

  const innerData = await dataRequest(urls);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  const staticData = await getStaticData();

  return {
    props: {
      data: {
        page: {
          attributes: {
            tag_title: "Politica aziendale - NetStrategy",
            meta_description:
              "In quest'area informiamo e spieghiamo a tutti i nostri visitatori la nostra politica aziendale. Scoprila…",
            hero: {
              nome: "Politica aziendale",
              caricamento_titolo: null,
              caricamento_sottotitolo: null,
              immagine: {
                noPath: true,
                data: {
                  attributes: {
                    url: "/cookie.webp",
                  },
                },
              },
              immagine_mobile: { data: null },
              video: { data: null }
            },
            inner: innerData.page.attributes
          },
        },
      },
      staticData,
    },
  };
}

export default function PoliticaAziendale({ data, staticData }) {
  //! REFS

  //! COMPONENT
  // fetch data iubenda
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdn.iubenda.com/iubenda.js";
    const tag = document.getElementsByTagName("script")[0];
    tag.parentNode.insertBefore(s, tag);
  }, []);

  //! COMPONENT
  return (
    <>
      <HeroPages data={data.page.attributes.hero}>
        <StaticTitle title={data.page.attributes.inner.titolo} />
      </HeroPages>
      {/* Section */}
      <Divider mt="clamp(2.00rem, calc(1.64rem + 1.55vw), 3.50rem)" />
      <Policy id="policy">
        <ReactMarkdown>
          {data.page.attributes.inner.testo}
        </ReactMarkdown>
      </Policy>
      {/* Form */}
      <Divider />
      <ContactForm mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)" />
      {/* Footer */}
      <Footer staticData={staticData} />
    </>
  );
}

// Style
const Policy = styled.div`
  ${centerContent}
  // margin-top: clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem);

  @media (min-width: 1280px) {
    width: 80%;
  }

  p, ul, li {
    padding: 0 30px;
    //color: #595858;
    box-sizing: border-box;
    border: 0;
    font-style: normal;
    font-family: inherit;
    font-weight: normal;
    line-height: 25px;
    font-size: 18px;
    margin: 0;
    clear: both;
  }

  p, ul {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 50px;
  }

  li {
    padding-left: 0px;
  }

  #iubenda_policy.iubenda_fluid_policy .iub_container {
    margin-block: 0;
  }

  #iubenda_policy .iub_content {
    padding-bottom: 0;
  }
`;


const PDFLink = styled.div`
  ${centerContent}
  margin-top: clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem);
  padding-inline: calc(clamp(1rem,calc(0.48rem + 2.2vw),3.13rem) + 30px);
  font-family: 'PPNeueMontreal';
  font-size: 13px;

  &:hover {
    color: #fc1333;
  }

  @media (min-width: 1280px) {
    width: 80%;
  }
`;