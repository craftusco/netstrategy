import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Divider from "@/components/Divider";
import HeroPages from "@/components/HeroPages";
import styled from "styled-components";
import { centerContent } from "@/styles/mixins";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React, { useEffect, useRef, useState } from "react";
import StaticTitle from "@/components/utils/StaticTitle";
import getStaticData from "@/utils/getStaticData";

//! Pass data
export async function getStaticProps() {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  const staticData = await getStaticData();

  return {
    props: {
      data: {
        page: {
          attributes: {
            tag_title: "Privacy Policy & Cookies - NetStrategy",
            meta_description:
              "In quest'area informiamo e spieghiamo a tutti i nostri visitatori le modalità e le finalità dei dati che trattiamo nonché una serie di altre informazioni. Scoprile…",
            hero: {
              nome: "Privacy & Cookie",
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
              video: { data: null },
            },
          },
        },
      },
      staticData,
    },
  };
}

export default function PrivacyPolicyCookies({ data, staticData }) {
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
        <StaticTitle title={data.page.attributes.hero.nome} />
      </HeroPages>
      {/* Section */}
      <Divider mt="clamp(2.00rem, calc(1.64rem + 1.55vw), 3.50rem)" />
      {/* Policy */}
      <PDFLink><a href="/informativa-privacy-net-strategy-web-e-clienti.pdf">A questo link puoi scaricare l'informativa privacy completa di NetStrategy in PDF.</a></PDFLink>
      <Policy id="policy">
        <a
          href="https://www.iubenda.com/privacy-policy/15544918"
          className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
          title="Privacy Policy"
        >
          Privacy Policy
        </a>
        <a
          href="https://www.iubenda.com/privacy-policy/15544918/cookie-policy"
          className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe iub-body-embed"
          title="Cookie Policy"
        >
          Cookie Policy
        </a>
        <p>
          Il servizio viene garantito negli orari di lavoro, ovvero dal Lunedì
          al Venerdì dalle ore 9.00 alle ore 13.00 e dalle ore 14.00 alle ore
          18.00, escluse le giornate festive, prefestive e le chiusure
          aziendali.
        </p>
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

  p {
    padding: 0 30px;
    color: #595858;
    box-sizing: border-box;
    border: 0;
    font-style: normal;
    font-family: inherit;
    font-weight: normal;
    line-height: 19px;
    font-size: 11px;
    margin: 0;
    clear: both;
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