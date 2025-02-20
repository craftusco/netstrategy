/** @type {import('next').NextConfig} */

const CompressionPlugin = require('compression-webpack-plugin');

// method to adjust urls that may have accented / latin characters to avoid unnecessary chains of redirects :)
const WEBSITE_DOMAIN = process.env.DOMAIN || 'https://www.netstrategy.it';

const URLEncoder = (urlArray) => {
  try {
    return urlArray.map((obj) => {
      // check for source presence
      if (!obj?.source) return obj;

      let encodedSource = new URL(obj.source, WEBSITE_DOMAIN) ?? obj.source;

      if (encodedSource instanceof URL) {
        encodedSource = encodedSource.pathname;
      }

      obj.source = encodedSource;

      return obj;
    });
  } catch (error) {
    return urlArray;
  }
};

const nextConfig = {
  // assetPrefix: '/',
  reactStrictMode: false,
  // env: {
  //   TOKEN: process.env.TOKEN,
  // },
  // compress: false,
  // output: 'export',
  transpilePackages: ['gsap'],

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        protocol: 'http',
        hostname: '**.netstrategy.it',
        hostname: 'pixabay.com',
        hostname: 'http://localhost:3000/',
        hostname: 'https://netstrategy.it/uploads/photo_1670272502972_cccb4b96c4f4_fcdb354fe2.jpeg',
        hostname: 'www.netstrategy.it',
        hostname: 'netstrategy.it',
        // hostname: "www.netstrategy.it",
        pathname: '**',
      },
    ],
    domains: ['www.netstrategy.it'],
  },
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js$|\.css$|\.html$/,
      })
    );
    return config;
  },
  experimental: {
    appDir: false,
  },
  // experimental: {
  //   modern: true,
  // },
  // "browserslist": [
  //   "last 2 versions",
  //   "> 0.75%",
  //   "not ie 11",
  //   "not dead"
  // ],
  //! Redirect
  redirects: async () => {
    const redirectsArr = [
      {
        source: '/web-marketing/digital-agency-ecco-tutto-cio-che-puo-fare-per-la-tua-azienda',
        destination: '/web-marketing/digital-agency',
        permanent: true,
      },
      {
        source: '/web-marketing/digital-agency-ecco-quali-risultati-ti-permette-di-raggiungere',
        destination: '/web-marketing/digital-agency',
        permanent: true,
      },
      {
        source: '/comunicazione/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/crm/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/crm/chatbot-sito',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/crm/reminder-e-follow-up-automatici',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/crm/up-selling-e-cross-selling',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/ecommerce/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/hubspot/bando-digital-transformation-per-pmi-cosa-puoi-fare',
        destination: '/crm/bando-digital-transformation-per-pmi-cosa-puoi-fare',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-call-to-action-come-iniziare-ad-usarle-da-oggi',
        destination: '/crm/hubspot-call-to-action-come-iniziare-ad-usarle-da-oggi',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-content-strategy-crea-contenuti-brillanti-per-la-tua-azienda',
        destination: '/crm/hubspot-content-strategy-crea-contenuti-brillanti-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        destination: '/crm/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-e-inbound-marketing-storia-di-un-grande-amore',
        destination: '/crm/hubspot-e-inbound-marketing-storia-di-un-grande-amore',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-in-italiano-scopri-come-ottenerlo-subito',
        destination: '/crm/hubspot-in-italiano-scopri-come-ottenerlo-subito',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-landing-page-inizia-a-realizzarle-a-partire-da-oggi',
        destination: '/crm/hubspot-landing-page-inizia-a-realizzarle-a-partire-da-oggi',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-lead-flows-come-sfruttarli-per-generare-nuovi-contatti',
        destination: '/crm/hubspot-lead-flows-come-sfruttarli-per-generare-nuovi-contatti',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-marketing-come-e-perche-utilizzarlo-per-la-tua-strategia',
        destination: '/crm/hubspot-marketing-come-e-perche-utilizzarlo-per-la-tua-strategia',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        destination: '/crm/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        destination: '/crm/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        destination: '/crm/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        destination: '/crm/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        destination: '/crm/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        permanent: true,
      },
      {
        source: '/hubspot/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        destination: '/crm/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        permanent: true,
      },
      {
        source: '/hubspot/netstrategy-diventa-silver-partner-hubspot',
        destination: '/crm/netstrategy-diventa-silver-partner-hubspot',
        permanent: true,
      },
      {
        source: '/inbound-marketing/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/lavora-con-noi',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/obiettivi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/aumentare-vendite-ecommerce',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/comunicazione-social',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/consulenza-immagine-aziendale',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/sviluppo-nuovo-progetto',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/sviluppo-rete-commerciale',
        destination: '/',
        permanent: true,
      },
      {
        source: '/preventivo',
        destination: '/web-marketing/preventivo',
        permanent: true,
      },
      {
        source: '/seo/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/seo-copywriting',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/social-media-marketing/10-statistiche-social-per-il-marketing-e-non-solo',
        destination: '/social/10-statistiche-social-per-il-marketing-e-non-solo',
        permanent: true,
      },
      {
        source: '/social-media-marketing/7-spunti-di-twitter-marketing',
        destination: '/social/7-spunti-di-twitter-marketing',
        permanent: true,
      },
      {
        source: '/social-media-marketing/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        destination: '/social/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        destination: '/social/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente',
        destination: '/social/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        destination:
          '/social/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        permanent: true,
      },
      {
        source: '/social-media-marketing/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        destination: '/social/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        destination:
          '/social/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        permanent: true,
      },
      {
        source: '/social-media-marketing/come-ottimizzare-i-video-di-youtube-la-guida-completa',
        destination: '/social/come-ottimizzare-i-video-di-youtube-la-guida-completa',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-pubblicizzare-il-proprio-canale-di-youtube-ecco-7-metodi-infallibili',
        destination:
          '/social/come-pubblicizzare-il-proprio-canale-di-youtube-ecco-7-metodi-infallibili',
        permanent: true,
      },
      {
        source: '/social-media-marketing/come-pubblicizzare-tua-azienda',
        destination: '/social/come-pubblicizzare-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        destination: '/social/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/social-media-marketing/facebook-personal-branding-istruzioni-per-luso',
        destination: '/social/facebook-personal-branding-istruzioni-per-luso',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        destination: '/social/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/il-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network',
        destination:
          '/social/il-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienti',
        destination:
          '/social/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/instagram-b2b-le-strategie-di-successo-per-trovare-nuovi-clienti-per-la-tua-azienda',
        destination:
          '/social/instagram-b2b-le-strategie-di-successo-per-trovare-nuovi-clienti-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/instagram-per-le-aziende-la-guida-completa-con-statistiche',
        destination: '/social/instagram-per-le-aziende-la-guida-completa-con-statistiche',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/investimento-facebook-ads-come-ottenere-risultati-migliori-con-lo-stesso-budget',
        destination:
          '/social/investimento-facebook-ads-come-ottenere-risultati-migliori-con-lo-stesso-budget',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        destination: '/social/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/management-social-media-come-realizzare-un-profilo-social-vincente',
        destination: '/social/management-social-media-come-realizzare-un-profilo-social-vincente',
        permanent: true,
      },
      {
        source: '/social-media-marketing/nuova-nata-in-casa-youtube-community-la-social-feature',
        destination: '/social/nuova-nata-in-casa-youtube-community-la-social-feature',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/quale-social-guida-alla-scelta-tra-i-6-social-network-piu-famosi-in-italia',
        destination:
          '/social/quale-social-guida-alla-scelta-tra-i-6-social-network-piu-famosi-in-italia',
        permanent: true,
      },
      {
        source: '/social-media-marketing/sai-come-usare-twitter-per-la-tua-azienda',
        destination: '/social/sai-come-usare-twitter-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-marketing-con-le-immagini-instagram-o-pinterest',
        destination: '/social/social-marketing-con-le-immagini-instagram-o-pinterest',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        destination: '/social/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        destination: '/social/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-media-strategy-come-diventare-virali-in-6-step',
        destination: '/social/social-media-strategy-come-diventare-virali-in-6-step',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/start-up-di-successo-5-aspetti-da-non-sottovalutare-per-far-crescere-la-propria-creatura',
        destination:
          '/social/start-up-di-successo-5-aspetti-da-non-sottovalutare-per-far-crescere-la-propria-creatura',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/strategie-commerciali-per-start-up-come-acquisire-nuovi-clienti',
        destination: '/social/strategie-commerciali-per-start-up-come-acquisire-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/strategie-di-marketing-su-instagram-42-consigli-per-renderle-vincenti',
        destination:
          '/social/strategie-di-marketing-su-instagram-42-consigli-per-renderle-vincenti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/trend-social-network-tutte-le-tecniche-per-una-strategia-vincente',
        destination: '/social/trend-social-network-tutte-le-tecniche-per-una-strategia-vincente',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/vendere-su-facebook-alcune-strategie-e-idee-per-ottenere-risultati',
        destination: '/social/vendere-su-facebook-alcune-strategie-e-idee-per-ottenere-risultati',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/vendere-su-instagram-ecco-tutti-i-consigli-per-renderlo-possibile',
        destination: '/social/vendere-su-instagram-ecco-tutti-i-consigli-per-renderlo-possibile',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        destination: '/social/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        permanent: true,
      },
      {
        source: '/social-media-marketing/youtube-per-aziende-7-consigli-di-youtube-marketing',
        destination: '/social/youtube-per-aziende-7-consigli-di-youtube-marketing',
        permanent: true,
      },
      {
        source: '/social/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/business-cards/mattiam',
        destination: '/business-card/mattia-mella',
        permanent: true,
      },
      {
        source: '/business-cards/stefanor',
        destination: '/business-card/stefano-robbi',
        permanent: true,
      },
      {
        source: '/business-cards/alessiam',
        destination: '/business-card/alessia-maggiolo',
        permanent: true,
      },
      {
        source: '/business-cards/andrear',
        destination: '/business-card/andrea-romagna',
        permanent: true,
      },
      {
        source: '/business-cards/eleonorab',
        destination: '/business-card/eleonora-bertolotto',
        permanent: true,
      },
      {
        source: '/business-cards/giovannib',
        destination: '/business-card/giovanni-buoso',
        permanent: true,
      },
      {
        source: '/business-cards/gloriam',
        destination: '/business-card/gloria-marangoni',
        permanent: true,
      },
      {
        source: '/business-cards/lorenzot',
        destination: '/business-card/lorenzo-teti',
        permanent: true,
      },
      {
        source: '/business-cards/sophied',
        destination: '/business-card/sophie-de-cock',
        permanent: true,
      },
      {
        source:
          '/successi/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche-in-meno-di-12-mesi',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source: '/lp/guida-all-identificazione-del-proprio-buyer-persona',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/obiettivi-smart-lista-di-esempi-che-anche-la-tua-azienda-puo-applicare',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inbound-marketing/&t=6s',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/buon-s-natale-da-netstrategy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ecommerce/which-cms-for-ecommerce-is-best-suited-to-your-business-find-out',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-ottimizzare-i-video-di-youtube-la-guida-completa/feed',
        destination: '/social/come-ottimizzare-i-video-di-youtube-la-guida-completa',
        permanent: true,
      },
      {
        source: '/web-marketing/email-marketing-cos-e-e-a-cosa-serve-ecco-cosa-devi-sapere/feed',
        destination: '/web-marketing/email-marketing-cos-e-e-a-cosa-serve-ecco-cosa-devi-sapere',
        permanent: true,
      },
      {
        source:
          '/successi/juice-apple-premium-reseller-329-di-visite-organiche-e-472-di-tasso-di-conversione-in-3-anni-di-attivita',
        destination: '/successi/juice-ha-consolidato-la-sua-presenza-digitale-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/successi/visureitalia-168-di-entrate-nellultimo-anno-per-aumentare-le-vendite-di-un-ecommerce-serve-il-coraggio-di-cambiare-rotta',
        destination:
          '/successi/visureitalia-i-risultati-conquistati-dallecommerce-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/news/boston-inbound-2017-la-nostra-esperienza-tra-strategie-di-inbound-marketing-e-michelle-obamaclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/successi/cicalia-da-0-a-300-000-visite-al-mese-in-soli-3-anni',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/successi/ferrari-costruzioni-meccaniche-37429-di-lead-e-613-di-viste-organiche-in-un-anno-e-mezzo-di-strategia',
        destination: '/successi/ferrari-costruzioni-meccaniche-un-design-completamente-rinnovato',
        permanent: true,
      },
      {
        source: '/web-marketing/web-agency-la-guida-step-by-step-verso-la-scelta-migliore',
        destination:
          '/web-marketing/migliori-web-agency-la-lista-completa-e-la-guida-per-la-scelta',
        permanent: true,
      },
      {
        source: '/comunicazione/restyling-sito-web',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/successi/mecmar-oltre-590-nuovi-contatti-in-soli-8-mesi-di-strategia',
        destination: '/successi/mecmar-seo-numeri-concreti-visibilita-e-brand-awareness',
        permanent: true,
      },
      {
        source: '/uploads/businessman_watching_financial_report_laptop_83f689b932.jpg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/uploads/woman_using_phone_car_6290c30f1b.jpg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/landing-nuove/www.visureitalia.it',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/6-idee-finanziamenti-startup',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cs/c',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        destination: '/sem-adv/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        permanent: true,
      },
      {
        source: '/social/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/seo/identikit-di-una-landing-page-efficace',
        destination: '/sem-adv/identikit-di-una-landing-page-efficace',
        permanent: true,
      },
      {
        source: '/web-marketing/pubblicita-su-google-3-modi-per-essere-visibili-online',
        destination: '/sem-adv/pubblicita-su-google-3-modi-per-essere-visibili-online',
        permanent: true,
      },
      {
        source: '/web-marketing/consulente-google-ads',
        destination: '/sem-adv/consulente-google-ads',
        permanent: true,
      },
      {
        source: '/social/gestione-social',
        destination: '/sem-adv/gestione-social',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/campagna-pubblicitaria-online-scopri-come-strutturarla-al-meglio',
        destination: '/sem-adv/campagna-pubblicitaria-online-scopri-come-strutturarla-al-meglio',
        permanent: true,
      },
      {
        source: '/web-marketing/sfruttare-il-google-advertising-come-e-perche',
        destination: '/sem-adv/sfruttare-il-google-advertising-come-e-perche',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/increase-brand-reputation-how-inbound-marketing-can-help-you',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/indicizzazione-seo-cose-e-come-funziona.html',
        destination: '/seo/indicizzazione-seo-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/web-marketing/4-consigli-per-pubblicizzare-la-tua-startupclass=',
        destination: '/web-marketing/4-consigli-per-pubblicizzare-la-tua-startup',
        permanent: true,
      },
      {
        source: '/web-marketing/3-esempi-content-marketing-strategy-successo.html',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/digital-transformation-in-b2b-5-mistakes-not-to-be-made',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-online-per-aziende-nel-settore-agricolo-5-strategie-per-vendere-allesteroclass=',
        destination:
          '/web-marketing/marketing-online-per-aziende-nel-settore-agricolo-5-strategie-per-vendere-allestero',
        permanent: true,
      },
      {
        source: '/lp-seo-lp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-media-marketing-le-tendenze-del-2018-e-oltreclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing02',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/netstrategy-diventa-silver-partner-hubspotclass=',
        destination: '/crm/netstrategy-diventa-silver-partner-hubspot',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/ecommerce-marketing-automation-strategies-to-sell-more',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/portfolio/tailors-ties',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/dalla-vendita-allaiuto-linbound-sales-con-dan-tyre',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/seo/whats-new-for-netstrategy-link-research-tool-associate-certification',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/boston-inbound-2017-our-experience-between-inbound-marketing-strategies-and-michelle-obama',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/seo/come-superare-i-tuoi-competitor-nel-settore-del-wellness-3-idee-a-cui-non-avevi-pensatoclass=',
        destination:
          '/seo/come-superare-i-tuoi-competitor-nel-settore-del-wellness-3-idee-a-cui-non-avevi-pensato',
        permanent: true,
      },
      {
        source: '/news/netcomm-forum-2017-crescita-ecommerce-nel-mercato-italianoclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/link-popularity/aumentare-link-popularity',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/does-it-make-sense-to-talk-about-inbound-marketing-for-e-commerce',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/ecommerce/does-it-make-sense-to-talk-about-inbound-marketing-for-e-commerce',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/do-you-want-a-record-breaking-social-media-strategy-learn-from-buzzfeed',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media/social-management',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ecommerce/conclusione',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/albergatore-quante-stelle-ha-il-tuo-hotel-marketing.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/training/web-marketing-course',
        destination: '/web-marketing/formazione',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/confirmed-google-removes-ads-from-right-side-of-desktop',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/immagine-aziendale-comecomunicarla-con-l-inbound-marketing',
        destination:
          '/inbound-marketing/immagine-aziendale-come-comunicarla-con-l-inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/successi/ortomec-15640-new-users-and-162-requests-for-quotation-in-12-months-of-communication-strategy',
        destination:
          '/successi/ortomec-diventa-punto-di-riferimento-online-nel-suo-settore-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/en/successi/juice-apple-premium-reseller-329-organic-visits-and-472-conversion-rate-in-3-years-of-activity',
        destination: '/successi/juice-apple-premium-reseller-un-nuovo-modo-di-comunicare-il-brand',
        permanent: true,
      },
      {
        source:
          '/en/successi/bravi-farmacie-40000-new-visits-in-less-than-2-years-thanks-to-an-advanced-seo-strategy',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/seo-en/identikit-of-an-effective-landing-page',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/ecommerce/how-to-choose-the-right-web-marketing-agency-for-your-ecommerce',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/successivisureitalia-i-risultati-conquistati-dallecommerce-grazie-a-netstrategy',
        destination:
          '/successi/visureitalia-i-risultati-conquistati-dallecommerce-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/lancio-di-un-prodotto-sul-mercato-',
        destination:
          '/web-marketing/lancio-di-un-prodotto-sul-mercato-cosa-fare-prima-durante-e-dopo',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/google-posiziona-la-pagina-sbagliata-del-tuo-sito-ecco-le-soluzioni',
        destination: '/seo/google-posiziona-la-pagina-sbagliata-del-tuo-sito-ecco-le-soluzioni',
        permanent: true,
      },
      {
        source: '/successi/[dettaglio-successo]',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/quoteold',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/ecommerce/prestashop-vs-shopify-qual-è-la-piattaforma-giusta-per-il-tuo-e-commerce',
        destination:
          '/ecommerce/prestashop-vs-shopify-qual-e-la-piattaforma-giusta-per-il-tuo-e-commerce',
        permanent: true,
      },
      {
        source: '/ecommerce/gestione-ecommerce',
        destination: '/ecommerce/gestione-ecommerce-a-cosa-devi-prestare-attenzione',
        permanent: true,
      },
      {
        source:
          '/web-marketing/digital-transformation-le-opportunità-di-crescita-per-la-tua-azienda',
        destination:
          '/web-marketing/digital-transformation-le-opportunita-di-crescita-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/consulting',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/it/social-media-marketing/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente',
        destination: '/social/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente',
        permanent: true,
      },
      {
        source: '/non-categorizzato/posizionamento-organico-cosa-si-intende-e-come-si-migliora',
        destination: '/seo/posizionamento-organico-cosa-si-intende-e-come-si-migliora',
        permanent: true,
      },
      {
        source: '/social-media-marketing/esempi-di-strategia-',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2020/09/inbound-Marketing-Path.jpg.webp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-quale-scelta-per-la-tua-azienda',
        destination: '/web-marketing/servizi-di-web-marketing-di-quali-avresti-piu-bisogno-2',
        permanent: true,
      },
      {
        source: '/ecommerce/black-friday-ecommerce-trasformare-i-super-sconti-in-opportunità',
        destination: '/ecommerce/black-friday-ecommerce-trasformare-i-super-sconti-in-opportunita',
        permanent: true,
      },
      {
        source: '/author/sara-maira',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/seo/seo-audit',
        destination: '/seo/seo-audit-le-tecniche-per-analizzare-il-tuo-sito-dalla-a-alla-z',
        permanent: true,
      },
      {
        source: '/seo/seo-audit',
        destination: '/seo/seo-audit-le-tecniche-per-analizzare-il-tuo-sito-dalla-a-alla-z',
        permanent: true,
      },
      {
        source:
          '/ecommerce/prestashop-o-magento-qual-è-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punticlass=',
        destination:
          '/ecommerce/prestashop-o-magento-qual-e-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punti',
        permanent: true,
      },
      {
        source: '/social-media-marketing/esempi-di-strategia-social-3-aziende-da-cui-trarre-',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source: '/seo/sai-come-usare-twitter-per-la-tua-azienda',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/facebook-ads-come-acquisire-nuovi-clienti-e-aumentare-le-venditeclass=',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/inbound-marketing/zmot-scopri-cose-lo-',
        destination: '/inbound-marketing/zmot-scopri-cose-lo-zero-moment-of-truth-di-google',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2023/01/realizzazione-ecommerce-netstrategy-header.png.webp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/non-categorizzato/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/non-categorizzato/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        destination: '/social/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        permanent: true,
      },
      {
        source: '/wp-content/plugins/revslider/public/assets/css/rs6.css',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda',
        destination:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/non-categorizzato/gestione-ecommerce-a-cosa-devi-prestare-attenzione',
        destination: '/ecommerce/gestione-ecommerce-a-cosa-devi-prestare-attenzione',
        permanent: true,
      },
      {
        source: '/non-categorizzato/facebook-personal-branding-istruzioni-per-luso',
        destination: '/social/facebook-personal-branding-istruzioni-per-luso',
        permanent: true,
      },
      {
        source: '/communication',
        destination: '/comunicazione',
        permanent: true,
      },
      {
        source:
          '/it/netstrategy/www/seo/come-scrivere-meta-title-e-meta-description-la-guida-completa.html',
        destination: '/seo/come-scrivere-meta-title-e-meta-description-la-guida-completa',
        permanent: true,
      },
      {
        source: '/web-marketing/fidelizzazione',
        destination:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla',
        permanent: true,
      },
      {
        source:
          '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-webclass=',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source:
          '/it/social-media-marketing/come-pubblicizzare-il-proprio-canale-di-youtube-ecco-7-metodi-infallibili',
        destination:
          '/social/come-pubblicizzare-il-proprio-canale-di-youtube-ecco-7-metodi-infallibili',
        permanent: true,
      },
      {
        source: '/case-study/page/2',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/migliorare-il-sito-aziendale-scopri-7-consigli-utili-con-esempi-concreti',
        destination:
          '/web-marketing/migliorare-il-sito-aziendale-scopri-7-consigli-utili-con-esempi-concreti',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/la-tua-comunicazione-aziendale-non-e-efficace-scopri-cosa-possiamo-fare-per-te',
        destination:
          '/comunicazione/la-tua-comunicazione-aziendale-non-e-efficace-scopri-cosa-possiamo-fare-per-te',
        permanent: true,
      },
      {
        source: '/non-categorizzato/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        destination: '/crm/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        permanent: true,
      },
      {
        source: '/non-categorizzato/ottimizzare-siti-web',
        destination: '/seo/ottimizzare-siti-web',
        permanent: true,
      },
      {
        source: '/en/contatti',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/startup',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/successiortomec-diventa-punto-di-riferimento-online-nel-suo-settore-grazie-a-netstrategy',
        destination:
          '/successi/ortomec-diventa-punto-di-riferimento-online-nel-suo-settore-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/successicicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source: '/successisporttechs-crescono-i-numeri-dell-ecommerce-con-netstrategy',
        destination: '/successi/sporttechs-crescono-i-numeri-dell-ecommerce-con-netstrategy',
        permanent: true,
      },
      {
        source: '/successitop-tuning-in-alto-sulla-serp-di-google-con-netstrategy',
        destination: '/successi/top-tuning-in-alto-sulla-serp-di-google-con-netstrategy',
        permanent: true,
      },
      {
        source: '/successilarena-in-prima-posizione-su-google-grazie-a-netstrategy',
        destination: '/successi/larena-in-prima-posizione-su-google-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/successimilano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source: '/non-categorizzato/fiere-digitali-la-tua-azienda-e-davvero-pronta-a-partecipare',
        destination: '/web-marketing/fiere-digitali-la-tua-azienda-e-davvero-pronta-a-partecipare',
        permanent: true,
      },
      {
        source:
          '/uncategorized/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        destination:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/non-categorizzato/google-bert',
        destination: '/seo/google-bert',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        destination: '/inbound-marketing/inbound-marketing-significato-metodi-strumenti-benefici',
        permanent: true,
      },
      {
        source: '/preventivo-seo',
        destination: '/seo/preventivo-seo',
        permanent: true,
      },
      {
        source: '/comunicazione/come-far-crescere-un-brand-4-idee-degli-esperti-netstrategy',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/website/creation-of-websites',
        destination: '/siti/realizzazione-siti-web',
        permanent: true,
      },
      {
        source: '/web-marketing/come-innovare-la-tua-azienda-nel-settore-agricolo-3-suggerimenti',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/social/formazione',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/successiprontodiploma-oltre-2900-conversioni-sul-portale-grazie-a-netstrategy',
        destination:
          '/successi/prontodiploma-oltre-2900-conversioni-sul-portale-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/google-amp-cosa-sono-le-accelerated-mobile-pages-e-perche-sfruttarle',
        destination:
          '/ecommerce/google-amp-cosa-sono-le-accelerated-mobile-pages-e-perche-sfruttarle',
        permanent: true,
      },
      {
        source: '/non-categorizzato/ecommerce-marketing-automation-strategie-per-vendere-di-piu',
        destination: '/ecommerce/ecommerce-marketing-automation-strategie-per-vendere-di-piu',
        permanent: true,
      },
      {
        source:
          '/successicelebriamo-il-successo-e-la-semplicita-una-nuova-comunicazione-per-pulimav-in-occasione-dei-ventanni-di-attivita',
        destination:
          '/successi/celebriamo-il-successo-e-la-semplicita-una-nuova-comunicazione-per-pulimav-in-occasione-dei-ventanni-di-attivita',
        permanent: true,
      },
      {
        source: '/[pillar]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/google-analytics-cosè-come-funziona-la-guida-completa',
        destination: '/web-marketing/google-analytics-cose-come-funziona-la-guida-completa',
        permanent: true,
      },
      {
        source: '/successiferrari-costruzioni-meccaniche-un-design-completamente-rinnovato',
        destination: '/successi/ferrari-costruzioni-meccaniche-un-design-completamente-rinnovato',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/partecipare-alle-fiere-ecco-come-non-sprecare-migliaia-e-migliaia-di-euro',
        destination:
          '/web-marketing/partecipare-alle-fiere-ecco-come-non-sprecare-migliaia-e-migliaia-di-euro',
        permanent: true,
      },
      {
        source:
          '/successi/bravi-farmacie-40-000-nuove-visite-in-meno-di-2-anni-grazie-a-una-strategia-di-advanced-seo',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/successimecmar-seo-numeri-concreti-visibilita-e-brand-awareness',
        destination: '/successi/mecmar-seo-numeri-concreti-visibilita-e-brand-awareness',
        permanent: true,
      },
      {
        source:
          '/successianteo-aumenta-del-50-per-cento-le-vendite-dei-biglietti-in-un-anno-di-strategia',
        destination:
          '/successi/anteo-aumenta-del-50-per-cento-le-vendite-dei-biglietti-in-un-anno-di-strategia',
        permanent: true,
      },
      {
        source: '/successijuice-ha-consolidato-la-sua-presenza-digitale-grazie-a-netstrategy',
        destination: '/successi/juice-ha-consolidato-la-sua-presenza-digitale-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/why-your-website-is-your-best-commercial',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/whatsapp',
        destination: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona',
        permanent: true,
      },
      {
        source: '/successisporttechs-piu-80-per-cento-di-fatturato-in-7-mesi-di-strategia',
        destination: '/successi/sporttechs-piu-80-per-cento-di-fatturato-in-7-mesi-di-strategia',
        permanent: true,
      },
      {
        source: '/en/web-marketing',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/successimec-ecco-i-risultati-raggiunti-dal-team-di-seo-specialist-di-netstrategy',
        destination:
          '/successi/mec-ecco-i-risultati-raggiunti-dal-team-di-seo-specialist-di-netstrategy',
        permanent: true,
      },
      {
        source:
          '/successifreddo-arredamenti-sceglie-netstrategy-per-il-rebranding-un-nuovo-modo-di-comunicare-lazienda',
        destination:
          '/successi/freddo-arredamenti-sceglie-netstrategy-per-il-rebranding-un-nuovo-modo-di-comunicare-lazienda',
        permanent: true,
      },
      {
        source: '/siti/preventivo-sito-web',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source:
          '/successiper-gardenstone-una-presenza-online-solida-grazie-alla-seo-di-netstrategy',
        destination:
          '/successi/per-gardenstone-una-presenza-online-solida-grazie-alla-seo-di-netstrategy',
        permanent: true,
      },
      {
        source:
          '/successistampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source:
          '/successicugola-aumenta-gli-acquisti-in-un-solo-anno-di-strategia-marketing-ecommerce',
        destination:
          '/successi/cugola-aumenta-gli-acquisti-in-un-solo-anno-di-strategia-marketing-ecommerce',
        permanent: true,
      },
      {
        source: '/successijuice-apple-premium-reseller-un-nuovo-modo-di-comunicare-il-brand',
        destination: '/successi/juice-apple-premium-reseller-un-nuovo-modo-di-comunicare-il-brand',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perché-la-vendita-porta-a-porta-non-funziona-più-scopri-5-motivi',
        destination:
          '/inbound-marketing/perche-la-vendita-porta-a-porta-non-funziona-piu-scopri-5-motivi',
        permanent: true,
      },
      {
        source:
          '/it/social-media-marketing/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        destination: '/social/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        permanent: true,
      },
      {
        source: '/nettalk-15',
        destination: '/nettalk',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/funnel-di-acquisizione-quali-step-per-assicurarsi-la-fiducia-dellutente',
        destination:
          '/inbound-marketing/funnel-di-acquisizione-quali-step-per-assicurarsi-la-fiducia-dellutente',
        permanent: true,
      },
      {
        source: '/successi/cicalia',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/vendere-vino-online-aprire-un-ecommerce-di-vino-e-la-strada-giusta',
        destination:
          '/ecommerce/vendere-vino-online-aprire-un-ecommerce-di-vino-e-la-strada-giusta',
        permanent: true,
      },
      {
        source: '/it/social-media-marketing/social-media-strategy-come-diventare-virali-in-6-step',
        destination: '/social/social-media-strategy-come-diventare-virali-in-6-step',
        permanent: true,
      },
      {
        source: '/case-study/strategia-inbound-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/seo-ecommerce',
        destination: '/seo/guida-definitiva-alla-seo-per-ecommerce',
        permanent: true,
      },
      {
        source: '/non-categorizzato/funnel-di-marketing-5-azioni-per-aumentare-le-vendite-nel-2019',
        destination:
          '/web-marketing/funnel-di-marketing-5-azioni-per-aumentare-le-vendite-nel-2019',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-google',
        destination:
          '/seo/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-google',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-web-come-scegliere-la-migliore',
        destination:
          '/web-marketing/migliori-web-agency-la-lista-completa-e-la-guida-per-la-scelta',
        permanent: true,
      },
      {
        source: '/non-categorizzato/google-analytics-cose-come-funziona-la-guida-completa',
        destination: '/web-marketing/google-analytics-cose-come-funziona-la-guida-completa',
        permanent: true,
      },
      {
        source: '/hubspot',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-nella-moda-quali-sono-le-migliori-0',
        destination: '/web-marketing/strategie-di-marketing-nella-moda-quali-sono-le-migliori',
        permanent: true,
      },
      {
        source: '/[pillar]/[subpillar]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/successes',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/seo/novita-per-netstrategy-acquisito-il-certificato-di-link-research-tool-associateclass=',
        destination:
          '/seo/novita-per-netstrategy-acquisito-il-certificato-di-link-research-tool-associate',
        permanent: true,
      },
      {
        source: '/nettalk/[dettaglio-nettalk]',
        destination: '/nettalk',
        permanent: true,
      },
      {
        source: '/inbound-marketing/come-ottimizzare-la-qualità-dei-contatti-b2b-online',
        destination: '/inbound-marketing/come-ottimizzare-la-qualita-dei-contatti-b2b-online',
        permanent: true,
      },
      {
        source: '/en/case-studies',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/inbound-marketing-how-to-choose-the-right-technology-and-the-right-partner',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/portfolio',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/seo/link-building-what-is-it-here-are-4-tactics-to-get-links',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/wellness-idee-strategie-marketing-acquisire-clienti-2018class=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/pokemon-go-brilliant-app-between-social-and-local',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/social-media-marketing/facebook-personal-branding-istruzioni-per-lusoclass=',
        destination: '/social/facebook-personal-branding-istruzioni-per-luso',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/digital-marketing-what-is-it-create-your-strategy-and-find-customers-online',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/how-to-identify-the-right-influencer-for-your-marketing-activity',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-training',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing/strategic-web-marketing-what-do-you-need-to-implement-it',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/cookie-e-privacy',
        destination: '/privacy-policy-e-cookies',
        permanent: true,
      },
      {
        source: '/web-marketing/sem',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-call-to-action-how-to-start-using-them-from-today',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/marketing-in-the-age-of-speech-recognition-siri-cortana-and-google-assistant',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/google-mobilegeddon-does-it-touch-pcdesktop-reseaches-too',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/sfruttare-il-google-advertising-come-e-perche.html',
        destination: '/sem-adv/sfruttare-il-google-advertising-come-e-perche',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/inbound-marketing-hubspot',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-appear-on-google-some-infallible-methods',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/seo/seo-services',
        destination: '/seo/servizi-seo-ottieni-la-massima-visibilita-con-il-partner-giusto',
        permanent: true,
      },
      {
        source: '/seo/in-arrivo-google-penguin-4-0-ecco-come-prepararsi',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/seo-agency',
        destination: '/seo/agenzia-seo',
        permanent: true,
      },
      {
        source: '/inbound-marketing/come-trovare-nuovi-clienti-per-la-tua-azienda-nel-2018',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing/pokemon-go-brilliant-app-between-social-and-local',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/formazione01',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/guida-alle-buyers-personas-cosa-sono-e-come-crearle-passo-dopo-passo',
        destination:
          '/inbound-marketing/guida-ai-buyer-persona-cosa-sono-e-come-crearli-passo-dopo-passo',
        permanent: true,
      },
      {
        source: '/ecommerce/ottimizzare-immagini-11-cose-che-devi-sapere.html',
        destination: '/ecommerce/ottimizzare-immagini-11-cose-che-devi-sapere',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/lead-nurturing-with-hubspot-everything-you-should-know',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/marketing-automation-strategy-avoid-wasting-your-salespeope',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/settore-wellness-5-caratteristiche-per-un-sito-web-di-successoclass=',
        destination: '/seo/settore-wellness-5-caratteristiche-per-un-sito-web-di-successo',
        permanent: true,
      },
      {
        source: '/web-marketing/cosa-sono-le-start-up-differenza-tra-italia-e-stati-uniticlass=',
        destination: '/web-marketing/cosa-sono-le-start-up-differenza-tra-italia-e-stati-uniti',
        permanent: true,
      },
      {
        source: '/case-study/case-study-il-successo-di-un-agriturismo-del-garda-con-netstrategy',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/4-tactics-to-acquire-leads-with-inbound-marketing',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/6-clues-to-understand-if-an-inbound-agency-knows-how-to-add-value-and-minimize-the-risk-to-your-business',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ecommerce/cliente-ecommerce-chi-e-cosa-vuole-in-5-punti',
        destination: '/ecommerce/chi-sono-i-clienti-del-tuo-sito-ecommerce',
        permanent: true,
      },
      {
        source: '/seo/primi-su-google-come-ottenere-massima-visibilita-sui-motori-di-ricerca',
        destination: '/seo/primi-su-google',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-digital-marketing-o-freelance-guida-alla-scelta-migliore',
        destination: '/web-marketing/agenzia-digital-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/guida-rapida-al-content-marketing-come-farlo-funzionare-4-mosse',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source:
          '/web-marketing/gdpr-2018-come-influenzera-il-digital-marketing-come-puo-divenire-unopportunita-per-la-tua-azienda',
        destination: '/sem-adv/campagna-pubblicitaria-online-scopri-come-strutturarla-al-meglio',
        permanent: true,
      },
      {
        source: '/inbound-marketing/smarketing-cosa-succede-quando-sales-e-marketing-collaborano',
        destination: '/inbound-marketing/buyers-journey-il-processo-decisionale-dellutente',
        permanent: true,
      },
      {
        source: '/crm/hubspot-marketing-come-e-perche-utilizzarlo-per-la-tua-strategia',
        destination: '/crm/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        permanent: true,
      },
      {
        source:
          '/seo/aggiornamento-algoritmico-di-google-dellestate-2018-chi-ne-beneficia-e-chi-viene-penalizzato',
        destination: '/seo/aggiornamento-algoritmo-google ',
        permanent: true,
      },
      {
        source: '/crm/hubspot-e-inbound-marketing-storia-di-un-grande-amore',
        destination: '/inbound-marketing/strategia-di-inbound-marketing-come-avere-successo-online',
        permanent: true,
      },
      {
        source:
          '/web-marketing/tendenze-digital-marketing-ottieni-piu-risultati-con-queste-strategie',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/web-marketing/strategia-digitale-rendi-smart-la-tua-azienda-con-netstrategy',
        destination:
          '/inbound-marketing/strumenti-per-aumentare-il-fatturato-ecco-tutto-cio-di-cui-necessiti',
        permanent: true,
      },
      {
        source: '/seo/guida-seo-il-posizionamento-su-google-per-principianti',
        destination: '/seo/seo-e-sem-marketing-quale-strategia-per-raggiungere-la-1-posizione',
        permanent: true,
      },
      {
        source:
          '/web-marketing/mobile-engagement-shopping-e-micro-moments-la-guida-di-google-per-catturare-i-consumatori',
        destination:
          '/inbound-marketing/conversion-funnel-scopri-come-convertire-i-visitatori-del-tuo-sito-in-clienti',
        permanent: true,
      },
      {
        source: '/uploads/177_0_C6_A0618_1_68919d6211.jpg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/media/2022/11/ant-rozetsky-HXOllTSwrpM-unsplash-scaled.jpg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/business-cards/elisav',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/ecommerce/author/giada-ruggero',
        destination: '/ecommerce ',
        permanent: true,
      },
      {
        source: '/ecommerce/contenuti-duplicati.html',
        destination: '/ecommerce/contenuti-duplicati ',
        permanent: true,
      },
      {
        source: '/email/guida-all-identificazione-del-proprio-buyer-persona',
        destination:
          '/inbound-marketing/guida-ai-buyer-persona-cosa-sono-e-come-crearli-passo-dopo-passo',
        permanent: true,
      },
      {
        source: '/en/author/mattia-mella',
        destination: '/author/stefano-robbi ',
        permanent: true,
      },
      {
        source: '/en/case-study/page/1',
        destination: '/successi ',
        permanent: true,
      },
      {
        source:
          '/en/case-study/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche-in-meno-di-12-mesi',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source: '/en/case-study-old',
        destination: '/successi ',
        permanent: true,
      },
      {
        source: '/en/chatbot-site',
        destination:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore ',
        permanent: true,
      },
      {
        source: '/en/consulenza-marketing/consulenza-seo',
        destination: '/seo/consulenza ',
        permanent: true,
      },
      {
        source: '/en/crm-implementation',
        destination: '/crm/implementazione-crm',
        permanent: true,
      },
      {
        source: '/en/digitization-expo-events',
        destination: '/ ',
        permanent: true,
      },
      {
        source: '/en/ecommerce/3-things-you-need-to-know-to-sell-online-on-amazon',
        destination: '/ecommerce/3-cose-che-devi-sapere-per-vendere-online-su-amazon',
        permanent: true,
      },
      {
        source: '/en/ecommerce/abandoned-cart-recovery-some-strategies-to-sell-more',
        destination:
          '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-piu ',
        permanent: true,
      },
      {
        source: '/en/ecommerce/e-commerce-management-heres-what-you-need-to-pay-attention-to',
        destination: '/ecommerce/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commercee',
        permanent: true,
      },
      {
        source: '/en/ecommerce/mobile-commerce-how-online-shopping-from-smartphones-is-evolving',
        destination:
          '/ecommerce/mobile-commerce-come-si-sta-evolvendo-lo-shopping-online-da-smartphone',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/increase-sales-with-google-shopping-and-its-product-listing-ads',
        destination:
          '/ecommerce/aumenta-le-vendite-con-google-shopping-e-i-suoi-product-listing-ad',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/online-promotion-what-to-do-when-opening-e-commerce-is-not-enough',
        destination: '/ecommerce/promozione-online-cosa-fare-quando-aprire-l-e-commerce-non-basta',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-marketing-how-and-why-to-use-it-for-your-strategy',
        destination: '/crm/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-partner-italy-how-to-choose-the-right-agency',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-smart-content-how-to-customize-your-sites-content',
        destination: '/crm/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-vs-mailchimp-which-email-marketing-solution',
        destination: '/crm/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        permanent: true,
      },
      {
        source: '/en/hubspot/netstrategy-becomes-silver-partner-hubspot',
        destination: '/crm/netstrategy-diventa-silver-partner-hubspot',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/call-for-digital-transformation-for-smes-what-can-you-do',
        destination: '/inbound-marketing/hubspot-cosa-come-funziona-perche-adottarlo',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-newsletter-impress-your-contacts-right-now',
        destination: '/crm/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/4-tactics-to-acquire-leads-with-inbound-marketing',
        destination: '/inbound-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/buyer-persona-what-are-they-and-how-to-build-them-step-by-step',
        destination:
          '/inbound-marketing/guida-ai-buyer-persona-cosa-sono-e-come-crearli-passo-dopo-passo',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/buyers-journey-the-users-decision-making-process',
        destination:
          '/inbound-marketing/buyers-journey-hubspot-cose-e-perche-e-fondamentale-comprenderlo',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/seo-inbound-marketing-what-are-the-differences',
        destination: '/inbound-marketing/seo-e-inbound-marketing-quali-differenze',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/the-power-of-call-to-action-what-they-are-and-how-to-make-them-effective',
        destination:
          '/inbound-marketing/il-potere-delle-call-to-action-cosa-sono-e-come-renderle-efficaci',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/lead-generation-marketing-the-art-of-acquiring-new-contacts',
        destination:
          '/inbound-marketing/lead-generation-marketing-larte-di-acquisire-nuovi-contatti',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/why-should-a-start-up-rely-on-a-marketing-agency',
        destination:
          '/inbound-marketing/perche-una-start-up-dovrebbe-affidarsi-ad-unagenzia-di-marketing',
        permanent: true,
      },
      {
        source: '/en/lead-generation-agency',
        destination: '/web-marketing/lead-generation',
        permanent: true,
      },
      {
        source: '/en/news/cicalia-tra-i-best-shop-of-itqf-a-successful-targeted-netstrategy',
        destination:
          '/web-marketing/cicalia-tra-i-best-shop-di-itqf-un-successo-targato-netstrategy',
        permanent: true,
      },
      {
        source: '/en/objectives/1st-on-google',
        destination: '/seo/primi-su-google',
        permanent: true,
      },
      {
        source: '/en/objectives/communicate-on-social-media',
        destination: '/social/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/en/portfolio/assospa',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/portfolio/isolmantova',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/quote',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/quote-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/seo/blog',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/optimizing-websites-the-guide-to-reaching-1-position',
        destination: '/seo/seo-e-sem-marketing-quale-strategia-per-raggiungere-la-1-posizione',
        permanent: true,
      },
      {
        source: '/en/seo/seo-analysis-who-when-how-and-why-everything-you-need-to-know',
        destination: '/seo/analisi-seo-chi-quando-come-e-perche-tutto-cio-che-ce-da-sapere',
        permanent: true,
      },
      {
        source: '/en/seo/seo-b2b',
        destination: '/seo/b2b-seo-ecco-come-acquisire-nuovi-clienti-con-google',
        permanent: true,
      },
      {
        source: '/en/seo/seo-copywriting',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-techniques-here-are-the-ones-that-work-in-2018',
        destination: '/seo/imparare-seo-online',
        permanent: true,
      },
      {
        source: '/en/seo/seo-training',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-blog/cart-abandonment',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-blog/confirmed-google-removes-ads-from-right-side-of-desktop',
        destination: '/seo/google-rimuove-annunci-adwords-parte-destra-dello-schermo',
        permanent: true,
      },
      {
        source: '/en/seo-blog/improve-google-positioning-here-are-some-strategies',
        destination: '/seo/posizionamento-sul-motore-di-ricerca-come-puoi-migliorarlo',
        permanent: true,
      },
      {
        source: '/en/seo-blog/mobile-only-indexing-by-march-2021-google-will-consider-mobile-only',
        destination: '/seo/mobile-only-indexing-da-marzo-2021-google-considerera-solo-il-mobile',
        permanent: true,
      },
      {
        source: '/en/seo-en/link-audit-avoid-penalty-and-evaluate-backlinks-in-4-steps',
        destination: '/seo/link-audit-evitare-la-penalizzazione-e-valutare-i-backlink-in-4-mosse',
        permanent: true,
      },
      {
        source: '/en/seo-en/promoting-websites-on-the-internet-heres-how',
        destination:
          '/web-marketing/come-promuovere-il-proprio-sito-aziendale-per-incrementarne-la-visibilita-online',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/seo-activities-how-many-are-there-and-which-ones-might-serve-you-the-most',
        destination: '/seo/attivita-seo-quante-sono-e-quali-potrebbero-servirti-di-piu',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-in-websites-8-benefits-for-your-business-and-as-many-statistics',
        destination:
          '/seo/seo-nei-siti-web-8-benefit-per-la-tua-attivita-e-altrettante-statistiche',
        permanent: true,
      },
      {
        source: '/en/social-media/blog',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/advertising-on-facebook-heres-how-to-reach-new-customers',
        destination: '/sem-adv/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/instagram-b2b-the-successful-strategies-to-find-new-customers-for-your-business',
        destination:
          '/social/instagram-b2b-le-strategie-di-successo-per-trovare-nuovi-clienti-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/linkedin-for-business-the-best-tactics-to-succeed',
        destination: '/social/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/new-born-in-the-youtube-house-community-the-social-feature',
        destination: '/social/nuova-nata-in-casa-youtube-community-la-social-feature',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/social-media-marketer-how-can-it-grow-your-business',
        destination: '/social/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/social-media-marketer-in-che-modo-può-far-crescere-la-tua-azienda',
        destination: '/social/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/how-to-acquire-customers-on-the-internet-here-are-3-tips-you-can-apply-today',
        destination:
          '/social/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/instagram-for-business-the-complete-guide-with-stats',
        destination: '/social/instagram-per-le-aziende-la-guida-completa-con-statistiche',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/marketing-strategies-on-instagram-42-tips-to-make-them-successful',
        destination:
          '/social/strategie-di-marketing-su-instagram-42-consigli-per-renderle-vincenti',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/selling-on-facebook-some-strategies-and-ideas-to-get-results',
        destination:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita',
        permanent: true,
      },
      {
        source: '/en/strategies-digital',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/successi/cicalia-from-0-to-300000-visits-per-month-in-just-3-years',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/en/successi/ferrari-costruzioni-meccaniche-374-29-of-leads-and-61-3-of-organic-views-in-a-year-and-a-half-of-strategy',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/training/11-coaching',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/training/in-company-training',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/web-marketing/b2b-digital-marketing-the-best-strategy-for-your-company',
        destination:
          '/web-marketing/marketing-digitale-b2b-la-migliore-strategia-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/come-innovare-la-tua-azienda-nel-settore-agricolo-3-suggerimenti',
        destination: '/web-marketing/come-internazionalizzare-la-tua-azienda-del-settore-agricolo',
        permanent: true,
      },
      {
        source: '/en/web-marketing/digital-agency-here-are-the-results-it-allows-you-to-achieve',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/digital-fairs-is-your-company-really-ready-to-participate',
        destination: '/web-marketing/fiere-digitali-la-tua-azienda-e-davvero-pronta-a-partecipare',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/dynamic-retargeting-what-is-it-how-does-that-work-why-is-this-important',
        destination: '/web-marketing/retargeting-dinamico-cose-come-funziona-perche-e-importante',
        permanent: true,
      },
      {
        source: '/en/web-marketing/email-marketing-examples-heres-how-to-get-to-the-sale',
        destination: '/web-marketing/email-marketing-esempi-come-arrivare-alla-vendita',
        permanent: true,
      },
      {
        source: '/en/web-marketing/lead-generation-here-how-to-find-new-customers',
        destination: '/web-marketing/lead-generation-ecco-come-trovare-nuovi-clienti',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-funnel-5-strategies-to-increase-sales-and-profits',
        destination:
          '/web-marketing/funnel-di-marketing-5-azioni-per-aumentare-le-vendite-nel-2019',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-strategies-which-choice-for-your-company',
        destination:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/sales-kpis-learn-how-to-measure-the-effectiveness-of-your-sales-force',
        destination:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-agency-how-to-choose-the-best',
        destination:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-agency-the-guide-step-by-step-to-the-best-choice',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-agency',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-strategies-which-is-best-for-your-company',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/sem',
        destination: '/sem-adv',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/advertising-on-google-3-ways-to-be-visible-online',
        destination: '/sem-adv/pubblicita-su-google-3-modi-per-essere-visibili-online',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-internationalize-your-farm-in-the-agricultural-sector',
        destination: '/web-marketing/come-internazionalizzare-la-tua-azienda-del-settore-agricolo',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/marketing-strategies-which-choice-for-your-company',
        destination:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/participating-in-fairs-heres-how-not-to-waste-thousands-and-thousands-of-euros',
        destination:
          '/web-marketing/partecipare-alle-fiere-ecco-come-non-sprecare-migliaia-e-migliaia-di-euro',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/youtube-campaign-get-more-visibility-with-video-ads',
        destination:
          '/web-marketing/campagna-youtube-ottieni-maggiore-visibilita-con-gli-annunci-video',
        permanent: true,
      },
      {
        source: '/en/website-restyling',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/en-us/en/seo-blog-old',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/formazione/corsi-web-marketing/corso-social-media-marketing',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/formazione/in-company-training',
        destination: '/',
        permanent: true,
      },
      {
        source: '/formazione/webinar',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/lp/ecommerce-aumentare-vendite',
        destination: '/ecommerce/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        permanent: true,
      },
      {
        source: '/lp-bf/checklist-digital-transformation-sr',
        destination:
          '/web-marketing/esempi-digital-transformation-spunti-per-innovare-la-tua-azienda-oggi',
        permanent: true,
      },
      {
        source: '/lp-bf/strategie-marketing-ev',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/sales@company.com',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seo/author/alessandro-agnoli',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/author/sara-maira/page/1',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/author/stefano-robbi/page/2',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/page/1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/page/2',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/page/3',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/page/4',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/page/5',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/seo-2016-falsi-miti-da-dimenticare-parte-2.html',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/social-media-marketing/author/alessandro-agnoli',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-media-marketing-cosè-e-come-puoi-',
        destination: '/social/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/web-marketing/author/alessandro-agnoli',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/author/letizia-poltronieri',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/author/sara-stabili',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/page/4',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-googleclass=',
        destination:
          '/seo/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-google',
        permanent: true,
      },
      {
        source: '/wp-content/themes/twentytwentyone/assets/js/polyfills.js',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2021/10/inbound-marketing-1568x1045.jpg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/successi/gardenstone-1118-nuovi-contatti-dal-sito-un-un-solo-anno-di-strategia',
        destination:
          '/successi/per-gardenstone-una-presenza-online-solida-grazie-alla-seo-di-netstrategy',
        permanent: true,
      },
      {
        source: '/case-study/gardenstone',
        destination:
          '/successi/per-gardenstone-una-presenza-online-solida-grazie-alla-seo-di-netstrategy',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/creare-sito-ecommer00ce',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/ecommerce/page/1',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/consulting-marketing/consulting-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/siti/preventivo-realizzazione-sito',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source: '/inbound-marketing/comunicazione',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-pubblicizzare-la-tua-azienda-su-google-la-guida-completaclass=',
        destination: '/web-marketing/come-pubblicizzare-la-tua-azienda-su-google-la-guida-completa',
        permanent: true,
      },
      {
        source: '/news/come-pianificare-il-lancio-della-tua-start-up-sul-mercatoclass=',
        destination: '/web-marketing/come-pianificare-il-lancio-della-tua-start-up-sul-mercato',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/mattia-mella',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/pubblicità-outdoor-porta-allesterno-la-tua-strategia-online',
        destination: '/web-marketing/pubblicita-outdoor-porta-allesterno-la-tua-strategia-online',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        destination: '/ecommerce/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        permanent: true,
      },
      {
        source: '/seo/posizionamento-seo-29-risposte-alle-tue-domande',
        destination: '/seo/migliorare-posizionamento-google-ecco-alcune-strategie',
        permanent: true,
      },
      {
        source: '/agenzia-seo-milano',
        destination: '/seo/agenzia-seo-milano',
        permanent: true,
      },
      {
        source: '/ecommerce/quale-cms-per-ecommerce-e-più-adatto-alla-tua-azienda',
        destination: '/ecommerce/quale-cms-per-ecommerce-e-piu-adatto-alla-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/ecommerce/cosa-accomuna-i-siti-ecommerce-di-successo-7-elementi-fondamentaliclass=',
        destination:
          '/ecommerce/cosa-accomuna-i-siti-ecommerce-di-successo-7-elementi-fondamentali',
        permanent: true,
      },
      {
        source: '/inbound-marketing/differenze-tra-inbound-e-',
        destination:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/web-marketing/pubblicita-online-come-e-perche-puo-divenire-la-m',
        destination:
          '/web-marketing/pubblicita-online-come-e-perche-puo-divenire-la-mossa-vincente-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/case-study/mec-strategia-web-marketing',
        destination:
          '/successi/mec-ecco-i-risultati-raggiunti-dal-team-di-seo-specialist-di-netstrategy',
        permanent: true,
      },
      {
        source: '/it/social-media-marketing/page/4',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/come-pubblicizzare-tua-aziendaclass=',
        destination: '/social/come-pubblicizzare-tua-azienda',
        permanent: true,
      },
      {
        source: '/lp-bf/hubspot-scelta-fg',
        destination: '/crm/hubspot-marketing-come-e-perche-utilizzarlo-per-la-tua-strategia',
        permanent: true,
      },
      {
        source: '/case-study/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing-online',
        destination: '/web-marketing/formazione ',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo/seo-ecommerce',
        destination: '/seo/guida-definitiva-alla-seo-per-ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/successi/bevande-a-domicilio-400-di-visite-organiche-con-una-strategia-a-lungo-termine',
        destination: '/successi ',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        destination: '/crm/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        permanent: true,
      },
      {
        source: '/web-marketing/5-consigli-per-pubblicizzare-la-tua-startup',
        destination: '/web-marketing/servizi-di-web-marketing-di-quali-avresti-piu-bisogno-2',
        permanent: true,
      },
      {
        source: '/news/cicalia-tra-i-best-shop-di-itqf-un-successo-targato-netstrategy',
        destination:
          '/web-marketing/cicalia-tra-i-best-shop-di-itqf-un-successo-targato-netstrategy',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/social-media-marketing-agency',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/en/formation/web-marketing-course',
        destination: '/web-marketing/formazione ',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/duplicated-content-ecommerce',
        destination: '/ecommerce/contenuti-duplicati ',
        permanent: true,
      },
      {
        source: '/en/privacy-policy-e-cookies',
        destination: '/',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo/google-penguin-penalizzazione',
        destination: '/seo/link-audit-evitare-la-penalizzazione-e-valutare-i-backlink-in-4-mosse',
        permanent: true,
      },
      {
        source: '/seo/facebook-personal-branding-istruzioni-per-luso',
        destination: '/social/facebook-personal-branding-istruzioni-per-luso',
        permanent: true,
      },
      {
        source: '/seo/seo-marketing',
        destination: '/seo/5-segreti-di-seo-marketing-alla-portata-di-tutti',
        permanent: true,
      },
      {
        source: '/seo/servizi-seo',
        destination: '/seo/servizi-seo-ottieni-la-massima-visibilita-con-il-partner-giusto',
        permanent: true,
      },
      {
        source: '/ecommerce/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-sales-2',
        destination: '/inbound-marketing/inbound-sales',
        permanent: true,
      },
      {
        source: '/web-marketing/webmarketing-cose-come-puo-divenire-il-tuo-punto-di-forza',
        destination: '/web-marketing/campagne-di-web-marketing-7-mosse-per-avere-successo',
        permanent: true,
      },
      {
        source: '/en/email/60-minuti-consulenza',
        destination: '/inbound-marketing/consulenza-inbound-marketing',
        permanent: true,
      },
      {
        source: '/ecommerce/servizio-clienti-ecommerce-come-renderlo-il-',
        destination:
          '/ecommerce/servizio-clienti-ecommerce-come-renderlo-il-punto-di-forza-del-tuo-negozio',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/reparto-marketing-e-vendite-3-problemi-frequenti-e-come-risolverliclass=',
        destination:
          '/inbound-marketing/reparto-marketing-e-vendite-3-problemi-frequenti-e-come-risolverli',
        permanent: true,
      },
      {
        source: '/seo/9-1-suggerimenti-di-web-marketing-per-il-tuo-ristorante',
        destination: '/web-marketing/9-1-suggerimenti-di-web-marketing-per-il-tuo-ristorante',
        permanent: true,
      },
      {
        source: '/web-marketing/marketing-automation-definizione-problemi-strategie',
        destination: '/inbound-marketing/marketing-automation-definizione-problemi-strategie',
        permanent: true,
      },
      {
        source: '/ecommerce/e-commerce-2020-in-italia-e-nel-mondo-',
        destination:
          '/ecommerce/e-commerce-2020-in-italia-e-nel-mondo-quale-futuro-dopo-il-covid-19',
        permanent: true,
      },
      {
        source: '/strategie-digitali',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ecommerce/e-commerce-2020-',
        destination:
          '/ecommerce/e-commerce-2020-in-italia-e-nel-mondo-quale-futuro-dopo-il-covid-19',
        permanent: true,
      },
      {
        source: '/chatbot-sito',
        destination:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore',
        permanent: true,
      },
      {
        source: '/crm/chatbot',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/sem-specialist',
        destination: '/sem-adv/consulente-google-ads ',
        permanent: true,
      },
      {
        source: '/web-marketing/fiere-di-settore-investimento-di-marketing-sempre-efficaceclass=',
        destination: '/web-marketing/fiere-di-settore-investimento-di-marketing-sempre-efficace',
        permanent: true,
      },
      {
        source:
          '/it/social-media-marketing/management-social-media-come-realizzare-un-profilo-social-vincente',
        destination: '/social/management-social-media-come-realizzare-un-profilo-social-vincente',
        permanent: true,
      },
      {
        source:
          '/web-marketing/7-caratteristiche-di-un-sito-web-di-successo-nel-settore-agricoloclass=',
        destination:
          '/web-marketing/7-caratteristiche-di-un-sito-web-di-successo-nel-settore-agricolo',
        permanent: true,
      },
      {
        source: '/formazione/consulente-seo',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/ecommerce/guida-definitiva-alla-seo-per-ecommerce',
        destination: '/seo/guida-definitiva-alla-seo-per-ecommerce ',
        permanent: true,
      },
      {
        source: '/en/seo/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo',
        destination: '/seo/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo ',
        permanent: true,
      },
      {
        source: '/en/seo-en/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo',
        destination: '/seo/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/digital-marketing-per-lautomotive-ecco-alcune-tattiche-e-strategie',
        destination:
          '/web-marketing/digital-marketing-per-lautomotive-ecco-alcune-tattiche-e-strategie',
        permanent: true,
      },
      {
        source: '/seo/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo.html',
        destination: '/seo/rich-snippet-di-google-cosa-sono-e-perche-contano-in-seo',
        permanent: true,
      },
      {
        source: '/restyling-sito-web',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/seo/growth-hacking-per-startup-cosè-e-come-funzionaclass=',
        destination: '/seo/growth-hacking-per-startup-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/ecommerce/preventivo-realizzazione-sito',
        destination: '/ecommerce/preventivo-ecommerce-come-scegliere-il-migliore',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2023/02/NetStrategy-preventivo-siti-web-header.png.webp',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-identificare-il-giusto-influencer-per-la-tua-attività-di-marketingclass=',
        destination:
          '/social/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/lead-generation-ecco-come-trovare-nuovi-clienti',
        destination: '/web-marketing/lead-generation-ecco-come-trovare-nuovi-clienti',
        permanent: true,
      },
      {
        source: '/contatti/agenzia-seo-milano',
        destination: '/seo/agenzia-seo-milano',
        permanent: true,
      },
      {
        source: '/ecommerce/3-cose-che-devi-sapere-per-vendere-online-su-amazonclass=',
        destination: '/ecommerce/3-cose-che-devi-sapere-per-vendere-online-su-amazon',
        permanent: true,
      },
      {
        source: '/en/seo/seo-specialist',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/web-marketing/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/privacy-policy-cookies',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/campagne-sem-come-e-perché-realizzare-annunci-di-qualità',
        destination: '/web-marketing/campagne-sem-come-e-perche-realizzare-annunci-di-qualita',
        permanent: true,
      },
      {
        source: '/social/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        destination: '/sem-adv/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/strategie-di-lead-generation',
        destination: '/web-marketing/lead-generation-ecco-come-trovare-nuovi-clienti',
        permanent: true,
      },
      {
        source: '/web-marketing/come-farsi-pubblicità-su-internet-6-strategie-che-potresti-seguire',
        destination:
          '/web-marketing/come-farsi-pubblicita-su-internet-6-strategie-che-potresti-seguire',
        permanent: true,
      },
      {
        source:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilità-del-tuo-negozio-e-commerce',
        destination:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilita-del-tuo-negozio-e-commerce',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-misurare-i-risultati-della-tua-attività-di-marketing-ecco-le-metriche',
        destination:
          '/web-marketing/come-misurare-i-risultati-della-tua-attivita-di-marketing-ecco-le-metriche',
        permanent: true,
      },
      {
        source: '/contatti/agenzia-seo-verona',
        destination: '/seo/agenzia-seo-verona',
        permanent: true,
      },
      {
        source: '/en/formazione/consulente-seo',
        destination: '/seo/consulente-seoo',
        permanent: true,
      },
      {
        source: '/web-marketing/web-agency-verona-netstrategy-e-il-partner-ideale-per-te',
        destination: '/web-marketing/agenzia-web-marketing-verona',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/e-commerce',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/non-categorizzato/migliorare-posizionamento-google-ecco-alcune-strategie',
        destination: '/seo/posizionamento-sul-motore-di-ricerca-come-puoi-migliorarlo',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2020/11/Marketing-digitale.jpg.webp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/seo-blog/page/1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/objectives/increase-ecommerce-sales',
        destination: '/ecommerce/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/sara-stabili',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/author/elisa-ventura',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/web-marketing/raccogli-i-contatti-alle-fiere-ma-poi...-come-li-trasformi-in-clienti',
        destination:
          '/web-marketing/raccogli-i-contatti-alle-fiere-ma-poi-come-li-trasformi-in-clienti',
        permanent: true,
      },
      {
        source: '/digital-economy/whatsapp-su-pc-cose-come-si-scarica-e-perche-e-piu-comodo ',
        destination: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/ecommerce-website',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/communication/restyling-of-the-site',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/customer-value-management',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/web-marketing/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-google',
        destination:
          '/seo/seo-come-scegliere-le-giuste-keywords-per-posizionare-la-tua-azienda-su-google',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing/corso-seo',
        destination: '/seo/formazione',
        permanent: true,
      },
      {
        source: '/en/work-with-us',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/crm-software',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/en/contact',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2023/02/Statistiche-eCommerce-2023-5-1024x683.jpg.webp',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/web-marketing/realtà-aumentata-cosè-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business',
        destination:
          '/web-marketing/realta-aumentata-cose-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/author/robbi-stefano',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/case-study/page/1',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/preventivo/peventivo-seo',
        destination: '/seo/preventivo-seo',
        permanent: true,
      },
      {
        source: '/ecommerce/statistiche-e-commerce-2019-in-italia-quali-sono-le-ten',
        destination: '/ecommerce/statistiche-e-commerce-2019-in-italia-quali-sono-le-tendenze',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/marketing-non-è-pubblicità-3-errori-di-marketing-che-la-tua-azienda-oggi-può-evitare',
        destination:
          '/inbound-marketing/marketing-non-e-pubblicita-3-errori-di-marketing-che-la-tua-azienda-oggi-puo-evitare',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-marketing',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing-in-azienda',
        destination: '/web-marketing/formazione',
        permanent: true,
      },
      {
        source: '/social-media-marketing/author/giulia-montin',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/cos-è-l-inbound-marketing-definizione-e-significato-in-italiano',
        destination:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        permanent: true,
      },
      {
        source: '/web-marketing/real-time-marketing-cosè-e-come-creare-campagne-super-efficaci',
        destination:
          '/web-marketing/real-time-marketing-cose-e-come-creare-campagne-super-efficaci',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/do-you-know-how-to-use-twitter-for-your-business-discover-the-success-stories',
        destination: '/social/sai-come-usare-twitter-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/web-marketing/come-internazionalizzare-la-tua-azienda-del-settore-agricoloclass=',
        destination: '/web-marketing/come-internazionalizzare-la-tua-azienda-del-settore-agricolo',
        permanent: true,
      },
      {
        source: '/news/iliad-riaccende-la-guerra-tra-le-compagnie-telefoniche',
        destination: '/web-marketing/iliad-riaccende-la-guerra-tra-le-compagnie-telefoniche',
        permanent: true,
      },
      {
        source:
          '/ecommerce/vantaggi-ecommerce-8-benefici-immediati-rispetto-al-negozio-tradizionaleclass=',
        destination:
          '/ecommerce/vantaggi-ecommerce-8-benefici-immediati-rispetto-al-negozio-tradizionale',
        permanent: true,
      },
      {
        source: '/web-marketing/business-plan-per-start-upclass=',
        destination: '/web-marketing/business-plan-per-start-up',
        permanent: true,
      },
      {
        source: '/portfolio/magicphone',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2020/06/ecommerce-2020-3.png.webp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seo/agenzia-seo-quale-scegliere-tra-le-migliaia-in-italia',
        destination: '/seo/web-agency-seo-come-scegliere-quella-giusta-per-il-tuo-progetto',
        permanent: true,
      },
      {
        source: '/consulenza-seo',
        destination: '/seo/consulenza',
        permanent: true,
      },
      {
        source:
          '/seo/ricerca-su-google-e-food-trends-3-suggerimenti-per-la-food-industry-e-non-solo',
        destination:
          '/web-marketing/ricerca-su-google-e-food-trends-3-suggerimenti-per-la-food-industry-e-non-solo',
        permanent: true,
      },
      {
        source: '/case-study/cicalia',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/seo/aggiornamento-dellalgoritmo-di-google-del-12-marzo-2019-ecco-le-caratteristiche',
        destination: '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-ce-da-sapere',
        permanent: true,
      },
      {
        source: '/seo/analisi-seo-chi-quando-come-e-perché-tutto-ciò-che-cè-da-sapere',
        destination: '/seo/analisi-seo-chi-quando-come-e-perche-tutto-cio-che-ce-da-sapere',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        destination: '/social/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        destination: '/social/come-creare-una-pagina-aziendale-di-successo-su-facebook',
        permanent: true,
      },
      {
        source:
          '/2018/02/01/whatsapp-arriva-metodo-utilizzare-la-chat-un-numero-telefono-fisso-296706',
        destination:
          '/web-marketing/whatsapp-business-come-utilizzarlo-da-numero-fisso-ed-altre-info-tecniche',
        permanent: true,
      },
      {
        source: '/seo/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        destination: '/ecommerce/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        permanent: true,
      },
      {
        source: '/non-categorizzato/funnel-di-vendita-cose-e-perche-realizzarlo',
        destination: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo',
        permanent: true,
      },
      {
        source: '/non-categorizzato/piano-marketing-vino-cosa-fa-davvero-la-differenza',
        destination: '/web-marketing/piano-marketing-vino-cosa-fa-davvero-la-differenza',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/strumenti-per-aumentare-il-fatturato-ecco-tutto-ciò-di-cui-necessiti',
        destination:
          '/inbound-marketing/strumenti-per-aumentare-il-fatturato-ecco-tutto-cio-di-cui-necessiti',
        permanent: true,
      },
      {
        source:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-venditaclass=',
        destination:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita',
        permanent: true,
      },
      {
        source: '/ecommerce/vendere-online-7-errori-da-non-commettereclass=',
        destination: '/ecommerce/vendere-online-7-errori-da-non-commettere',
        permanent: true,
      },
      {
        source: '/conversion-rate-optimization',
        destination: '/ecommerce/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        permanent: true,
      },
      {
        source: '/seo/5-lezioni-sul-web-marketing-del-vino-lesempio-californiano',
        destination: '/web-marketing/5-lezioni-sul-web-marketing-del-vino',
        permanent: true,
      },
      {
        source: '/web-marketing/piano-di-marketing-come-realizzarne-uno-efficace',
        destination:
          '/web-marketing/piano-di-marketing-in-8-video-ti-spieghiamo-come-realizzarne-uno-efficace',
        permanent: true,
      },
      {
        source: '/en/it-projects',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/web-marketing/retargeting-dinamico-cosè-come-funziona-perché-è-importante',
        destination: '/web-marketing/retargeting-dinamico-cose-come-funziona-perche-e-importante',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing01',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source:
          '/news/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspotclass=',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/agenzia-seo-verona',
        destination: '/seo/agenzia-seo-verona',
        permanent: true,
      },
      {
        source: '/business-cards',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/digitalizzazione-dei-processi-di-vendita-cosè-3-esempi-pratici',
        destination:
          '/web-marketing/digitalizzazione-dei-processi-di-vendita-cose-3-esempi-pratici',
        permanent: true,
      },
      {
        source: '/realizzazione-siti-web',
        destination: '/siti',
        permanent: true,
      },
      {
        source: '/it/social-media-marketing',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/inbound-marketing/funnel-di-vendita-cosè-e-perché-realizzarloclass=',
        destination: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo',
        permanent: true,
      },
      {
        source: '/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/ecommerce/google-amp-cosa-sono-le-accelerated-mobile-pages-e-perche-sfruttarle.html',
        destination:
          '/ecommerce/google-amp-cosa-sono-le-accelerated-mobile-pages-e-perche-sfruttarle',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-media-marketing-le-tendenze-del-2018-e-oltre',
        destination: '/social/trend-social-network-tutte-le-tecniche-per-una-strategia-vincente',
        permanent: true,
      },
      {
        source: '/non-categorizzato/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        destination: '/crm/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        permanent: true,
      },
      {
        source: '/author/giulia-montin',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/servizi-sem',
        destination: '/sem-adv',
        permanent: true,
      },
      {
        source: '/blog/2',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/case-study/mec-in-1-position-on-google-in-italy-and-in-many-other-countries-thanks-to-netstrategy',
        destination:
          '/successi/mec-ecco-i-risultati-raggiunti-dal-team-di-seo-specialist-di-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/15-spunti-per-realizzare-un-sito-web-efficace',
        destination: '/web-marketing/15-idee-per-un-sito-web-efficace',
        permanent: true,
      },
      {
        source: '/web-marketing/customer-relationship-management-benefici-del-crmclass=',
        destination: '/web-marketing/customer-relationship-management-benefici-del-crm',
        permanent: true,
      },
      {
        source: '/author/elisa-ventura',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/formation/course-web-marketing-online',
        destination: '/web-marketing/formazione',
        permanent: true,
      },
      {
        source: '/en/seo/3-techniques-for-effective-search-engine-positioning',
        destination: '/seo/3-tecniche-per-un-posizionamento-efficace-nei-motori-di-ricerca',
        permanent: true,
      },
      {
        source: '/en/marketing-consulting',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/author/robbi-stefano',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/ecommerce/prestashop-o-magento-qual-è-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punti',
        destination:
          '/ecommerce/prestashop-o-magento-qual-e-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed.html',
        destination: '/social/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        permanent: true,
      },
      {
        source: '/author/sara-stabili',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/ecommerce/come-scegliere-agenzia-web-marketing-per-il-tuo-ecommerceclass=',
        destination: '/ecommerce/come-scegliere-agenzia-web-marketing-per-il-tuo-ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/statistiche-e-commerce-2018-in-ita-',
        destination:
          '/ecommerce/statistiche-e-commerce-2018-in-italia-scopri-su-cosa-puntare-per-avere-il-negozio-online-perfetto',
        permanent: true,
      },
      {
        source: '/consulenza-marketing/consulenza-web-marketing',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/consulenza-marketing/consulenza-ecommerce',
        destination: '/ecommerce/consulenza',
        permanent: true,
      },
      {
        source: '/en/communication',
        destination: '/comunicazione',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/examples-of-social-strategy-3-companies-to-draw-inspiration-from',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source: '/inbound-marketing/funnel-di-vendita-cosè-e-perché-realizzarlo',
        destination: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo',
        permanent: true,
      },
      {
        source: '/author/elisa',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/author/admin_ns',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/consulenza-marketing/consulenza-social-media-marketing',
        destination: '/social/consulenza',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-call-to-action-how-to-start-using-them-from-today',
        destination: '/crm/hubspot-call-to-action-come-iniziare-ad-usarle-da-oggi',
        permanent: true,
      },
      {
        source: '/case-study',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-è-la-strada-giusta-per-la-tua-azienda',
        destination:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/case-study/juice-apple-premium-reseller-strategia-web-marketing',
        destination: '/successi/juice-ha-consolidato-la-sua-presenza-digitale-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/casi-di-successo',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/news/i-nostri-dati-venduti-su-facebook-e-di-nuovo-scandalo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/up-selling-and-cross-selling',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/en/case-study/ferrari-costruzioni-meccaniche-61.3-organic-visits-and-347.29-leads-in-a-year-and-a-half-of-strategy',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/en/case-study/juice-apple-premium-reseller-329-organic-visits-and-472-conversion-rate-in-3-years-of-activity',
        destination: '/successi/juice-ha-consolidato-la-sua-presenza-digitale-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/en/case-study/larena-255-of-organic-visits-post-audit-advanced-seo',
        destination: '/successi/larena-in-prima-posizione-su-google-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/inbound-marketing/zmot-scopri-cose-lo-zero-moment-of-truth-di-googleclass=',
        destination: '/inbound-marketing/zmot-scopri-cose-lo-zero-moment-of-truth-di-google',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/funnel-di-conversione-scopri-tutti-i-suoi-segreti-in-questa-guida',
        destination:
          '/inbound-marketing/funnel-di-conversione-scopri-tutti-i-suoi-segreti-in-questa-guida',
        permanent: true,
      },
      {
        source: '/lp-bf/scelta-partner-mktg-sr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp-bf/sales-processo-vendita-fg',
        destination: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo',
        permanent: true,
      },
      {
        source: '/seo/posizionamento-siti-internet-ecco-una-ckecklist-per-migliorarlo',
        destination: '/seo/posizionamento-sul-motore-di-ricerca-come-puoi-migliorarlo',
        permanent: true,
      },
      {
        source: '/news/come-pianificare-il-lancio-della-tua-start-up-sul-mercato',
        destination: '/web-marketing/come-pianificare-il-lancio-della-tua-start-up-sul-mercato',
        permanent: true,
      },
      {
        source: '/web-marketing/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/chi-siamo',
        permanent: true,
      },
      {
        source: '/non-categorizzato/piano-marketing-ecommerce-come-costruirlo-in-5-semplici-mosse',
        destination: '/ecommerce/piano-marketing-ecommerce-come-costruirlo-in-5-semplici-mosse',
        permanent: true,
      },
      {
        source: '/en/seo/seo-consultant',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/sem',
        destination: '/sem-adv',
        permanent: true,
      },
      {
        source: '/web-marketing/hubspot-cosa-come-funziona-perche-adottarlo',
        destination: '/inbound-marketing/hubspot-cosa-come-funziona-perche-adottarlo',
        permanent: true,
      },
      {
        source: '/en/web-marketing/conversion-rate-optimization',
        destination: '/ecommerce/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        permanent: true,
      },
      {
        source: '/seo/posizionamento-seo-2',
        destination: '/seo/migliorare-posizionamento-google-ecco-alcune-strategie',
        permanent: true,
      },
      {
        source: '/seo/servizi-seo-ottieni-la-massima-visibilita-con-il-partner-giusto-2',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/corso-seo-online',
        destination: '/seo/formazione',
        permanent: true,
      },
      {
        source: '/lp-bf/seo-1-posizione-sr',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2021/10/blog-ecommerce-index.png.webp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/obiettivi/primi-su-google',
        destination: '/seo/primi-su-google',
        permanent: true,
      },
      {
        source: '/seo/un-nuovo-look-per-la-media-delle-ricerche-sul-keyword-planner-di-adwords',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/author/michela-aru',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/news/bando-digital-transformation-per-pmi-cosa-puoi-fare',
        destination: '/crm/bando-digital-transformation-per-pmi-cosa-puoi-fare',
        permanent: true,
      },
      {
        source: '/seo/seo-wordpress-la-guida-definitiva-per-raggiungere-la-prima-posizione',
        destination: '/seo/indicizzare-un-sito-wordpress-tutti-i-consigli-di-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/conclusione',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/non-categorizzato/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        destination: '/ecommerce/come-aumentare-il-tasso-di-conversione-del-tuo-e-commerce-oggi',
        permanent: true,
      },
      {
        source:
          '/en/seo/difference-between-seo-and-sem-why-it-is-essential-to-understand-it-for-the-good-of-your-business',
        destination: '/seo/seo-sem-differenze-e-significato',
        permanent: true,
      },
      {
        source:
          '/web-marketing/ridurre-i-costi-aziendali-come-aumentare-l-efficacia-del-reparto-commercialeclass=',
        destination:
          '/web-marketing/ridurre-i-costi-aziendali-come-aumentare-l-efficacia-del-reparto-commerciale',
        permanent: true,
      },
      {
        source: '/web-marketing/consulenza-web-marketing',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/news/il-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network',
        destination:
          '/social/il-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/management-social-media-come-realizzare-un-profilo-social-vincente',
        destination: '/social/management-social-media-come-realizzare-un-profilo-social-vincente',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/mobile-commerce-come-si-sta-evolvendo-lo-shopping-online-da-smartphone',
        destination:
          '/ecommerce/mobile-commerce-come-si-sta-evolvendo-lo-shopping-online-da-smartphone',
        permanent: true,
      },
      {
        source: '/non-categorizzato/ecommerce-marketing-la-guida-dalla-a-alla-z-verso-la-crescita',
        destination: '/ecommerce/ecommerce-marketing-la-guida-dalla-a-alla-z-verso-la-crescita',
        permanent: true,
      },
      {
        source: '/en/digital-marketing-quote',
        destination: '/',
        permanent: true,
      },
      {
        source: '/non-categorizzato/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        destination: '/crm/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/inbound-marketing-per-le-startup-come-non-far-fallire-la-propria-strategia',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/seo/seo-wordpress-3',
        destination: '/seo/seo-wordpress',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2016/07/Snippet-Esempio.jpg.webp',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/cicalia-among-the-itqf-best-shops-a-netstrategy-success',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source: '/agenzia-seo',
        destination: '/seo/agenzia-seo',
        permanent: true,
      },
      {
        source: '/promozione-siti/promozione-su-internet',
        destination: '/seo/promozione-su-internet',
        permanent: true,
      },
      {
        source: '/web-marketing/marketing-per-start-up-la-guida-definitivaclass=',
        destination: '/web-marketing/marketing-per-start-up-la-guida-definitiva',
        permanent: true,
      },
      {
        source: '/seo/seo-specialist',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/kpi-sales-performance',
        destination:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita',
        permanent: true,
      },
      {
        source: '/ecommerce/progetto-cicalia-supermercato-online-marketing-strategico-e-web',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source: '/social-media-marketing/strategie',
        destination: '/social/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/en/contacts',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing-new',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/seo/seo-consultant',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/web-marketing/fiere-digitali-la-tua-azienda-è-davvero-pronta-a-partecipare',
        destination: '/web-marketing/fiere-digitali-la-tua-azienda-e-davvero-pronta-a-partecipare',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/marketing-non-e-pubblicita-3-errori-di-marketing-che-la-tua-azienda-oggi-puo-evitare',
        destination:
          '/inbound-marketing/marketing-non-e-pubblicita-3-errori-di-marketing-che-la-tua-azienda-oggi-puo-evitare',
        permanent: true,
      },
      {
        source:
          '/web-marketing/pubblicità-online-come-e-perché-può-divenire-la-mossa-vincente-per-la-tua-azienda',
        destination:
          '/web-marketing/pubblicita-online-come-e-perche-puo-divenire-la-mossa-vincente-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/non-categorizzato/seo-sem-differenze-e-significato',
        destination: '/seo/seo-sem-differenze-e-significato',
        permanent: true,
      },
      {
        source: '/preventivo/realizzazione-sito-web',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source:
          '/it/social-media-marketing/social-media-marketer-in-che-modo-può-far-crescere-la-tua-azienda',
        destination: '/social/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        destination: '/sem-adv/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        permanent: true,
      },
      {
        source: '/seo/seo-sem-differenze-e-significatoclass=',
        destination: '/seo/seo-sem-differenze-e-significato',
        permanent: true,
      },
      {
        source: '/seo/formazione-seo',
        destination: '/seo/formazione',
        permanent: true,
      },
      {
        source: '/web-marketing/marketing-automation-come-farne-buon-investimento-per-azienda',
        destination: '/inbound-marketing/marketing-automation-definizione-problemi-strategie',
        permanent: true,
      },
      {
        source: '/uncategorized/seo-sem-differenze-e-significato',
        destination: '/seo/seo-sem-differenze-e-significato',
        permanent: true,
      },
      {
        source: '/author-sitemap.xml',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social-media-marketing/10-statistiche-social-per-il-',
        destination: '/social/10-statistiche-social-per-il-marketing-e-non-solo',
        permanent: true,
      },
      {
        source: '/non-categorizzato/nuova-nata-in-casa-youtube-community-la-social-feature',
        destination: '/social/nuova-nata-in-casa-youtube-community-la-social-feature',
        permanent: true,
      },
      {
        source: '/en/communication/brand-identity',
        destination: '/social/10-statistiche-social-per-il-marketing-e-non-solo',
        permanent: true,
      },
      {
        source: '/web-marketing/trattativa-commerciale.-5-step-inbound-per-chiuderla-con-successo',
        destination:
          '/web-marketing/trattativa-commerciale-5-step-inbound-per-chiuderla-con-successo',
        permanent: true,
      },
      {
        source: '/lp-bf/sito-restyling-aa',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/seo/lp-seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/case-study/ferrari-costruzioni-meccaniche-strategia-web-marketing',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-online-non-importa-quanto-sei-grande-ti-farà-crescere-ancora',
        destination:
          '/web-marketing/marketing-online-non-importa-quanto-sei-grande-ti-fara-crescere-ancora',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/why-your-website-is-your-best-commercial',
        destination: '/inbound-marketing/perche-il-tuo-sito-web-e-il-tuo-miglior-commerciale',
        permanent: true,
      },
      {
        source: '/en/agenzia-web-marketing',
        destination: '/web-marketing/agenzia-web-marketing',
        permanent: true,
      },
      {
        source: '/en/social-media',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/case-study/forigo-roter-italia-strategia-di-inbound-marketing',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/inbound-marketing/come-puoi-dare-supporto-al-tuo-reparto-commercialeclass=',
        destination: '/inbound-marketing/come-puoi-dare-supporto-al-tuo-reparto-commerciale',
        permanent: true,
      },
      {
        source: '/lp-bf/scelta-partner-ecommerce-sr',
        destination: '/ecommerce/quale-cms-per-ecommerce-e-piu-adatto-alla-tua-azienda',
        permanent: true,
      },
      {
        source: '/ecommerce/agenzia-ecommerce',
        destination: '/ecommerce/come-scegliere-agenzia-web-marketing-per-il-tuo-ecommerce',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/realta-aumentata-cose-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business',
        destination:
          '/web-marketing/realta-aumentata-cose-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business',
        permanent: true,
      },
      {
        source: '/non-categorizzato/rebranding-perche-rinnovare-limmagine-della-tua-azienda',
        destination: '/comunicazione/rebranding-perche-rinnovare-limmagine-della-tua-azienda',
        permanent: true,
      },
      {
        source: '/eventi',
        destination: '/nettalk',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/oggi-puoi-battere-la-tua-concorrenza-ma-devi-fare-qualcosa-di-diverso-scoprilo-qui',
        destination:
          '/inbound-marketing/oggi-puoi-battere-la-tua-concorrenza-ma-devi-fare-qualcosa-di-diverso-scoprilo-qui',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/mondiali-di-calcio-2018-le-campagne-marketing-delle-grandi-aziende-dellevento',
        destination:
          '/web-marketing/mondiali-di-calcio-2018-le-campagne-marketing-delle-grandi-aziende-dellevento',
        permanent: true,
      },
      {
        source: '/non-categorizzato/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source: '/seo/seo-b2b',
        destination: '/seo/b2b-seo-ecco-come-acquisire-nuovi-clienti-con-google',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/il-potere-delle-call-to-action-cosa-sono-e-come-renderle-efficaciclass=',
        destination:
          '/inbound-marketing/il-potere-delle-call-to-action-cosa-sono-e-come-renderle-efficaci',
        permanent: true,
      },
      {
        source: '/seo-copywriting',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/web-marketing/google-analytics-cos',
        destination: '/web-marketing/google-analytics-cose-come-funziona-la-guida-completa',
        permanent: true,
      },
      {
        source: '/web-marketing/cosa-sono-le-start-up-',
        destination: '/web-marketing/cosa-sono-le-start-up-differenza-tra-italia-e-stati-uniti',
        permanent: true,
      },
      {
        source: '/web-marketing/cosa-sono-le-start-up-differenza-tra-italia-',
        destination: '/web-marketing/cosa-sono-le-start-up-differenza-tra-italia-e-stati-uniti',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/advertising-on-facebook-how-it-works-and-how-to-make-the-most-of-it',
        destination: '/sem-adv/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/advertising-on-facebook-how-it-works-and-how-to-make-the-most-of-it',
        destination: '/sem-adv/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/web-marketing/campagna-youtube-ottieni-maggiore-visibilità-con-gli-annunci-video',
        destination:
          '/web-marketing/campagna-youtube-ottieni-maggiore-visibilita-con-gli-annunci-video',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/cos-è-l-inbound-marketing-definizione-e-significato-in-italianoclass=',
        destination:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        permanent: true,
      },
      {
        source: '/inbound-marketing/funnel-di-vendita-cos',
        destination: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo',
        permanent: true,
      },
      {
        source: '/inbound-marketing/immagine-aziendale-come-',
        destination:
          '/inbound-marketing/immagine-aziendale-come-comunicarla-con-l-inbound-marketing',
        permanent: true,
      },
      {
        source: '/seo/seo-services',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/visibilità-su-google-61-tattiche-per-conquistare-la-1-posizione',
        destination: '/seo/visibilita-su-google-61-tattiche-per-conquistare-la-1-posizione',
        permanent: true,
      },
      {
        source: '/seo/indicizzazione-seo-cose-e-come-funzionaSe',
        destination: '/seo/indicizzazione-seo-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/non-categorizzato/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source: '/non-categorizzato/tecniche-seo-ecco-come-farsi-trovare-su-google',
        destination: '/seo/seo-migliora-subito-il-tuo-ranking-con-queste-tecniche',
        permanent: true,
      },
      {
        source: '/news/come-acquistare-unazienda-gli-elementi-da-non-sottovalutare',
        destination: '/web-marketing/come-acquistare-unazienda-gli-elementi-da-non-sottovalutare',
        permanent: true,
      },
      {
        source: '/uncategorized/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source: '/en/website/website-creation-quote',
        destination: '/siti/realizzazione-siti-web',
        permanent: true,
      },
      {
        source: '/non-categorizzato/comunicare-il-vino-su-quale-strategia-puntare',
        destination: '/comunicazione/comunicare-il-vino-su-quale-strategia-puntare',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-nella-moda-',
        destination: '/web-marketing/strategie-di-marketing-nella-moda-quali-sono-le-migliori',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/creare-sito-e-commerce',
        destination: '/ecommerce/realizzazione-ecommerce',
        permanent: true,
      },
      {
        source: '/web-marketing/time-to-market-start-upclass=',
        destination: '/web-marketing/time-to-market-start-up',
        permanent: true,
      },
      {
        source: '/en/seo/seo-agency-milan',
        destination: '/seo/agenzia-seo-milano',
        permanent: true,
      },
      {
        source: '/seo/tecniche-seo-ecco-quelle-che-funzionano-nel-2018',
        destination: '/seo/3-tecniche-per-un-posizionamento-efficace-nei-motori-di-ricerca',
        permanent: true,
      },
      {
        source: '/lp-seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/case-study/strategia-inbound-marketing-milano-fashion-institute',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source: '/successi/strategia-inbound-marketing',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/news/page/2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/14-luglio-2016-evento-a-verona-con-banca-mediolanum',
        destination: '/nettalk',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/5-mistakes-not-to-make-when-choosing-the-web-marketing-consultant-for-your-company',
        destination:
          '/web-marketing/5-errori-da-non-commettere-quando-scegli-il-consulente-di-web-marketing-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/web-marketing/strategic-web-marketing-what-do-you-need-to-implement-it308',
        destination: '/web-marketing/strategie-di-marketing-offline-quali-sono-e-quali-adottare',
        permanent: true,
      },
      {
        source: '/post-sitemap.xml',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/en/case-study-old/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche-in-meno-di-12-mesi',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source: '/business-cards/giuliab',
        destination: '/business-card/stefano-robbi',
        permanent: true,
      },
      {
        source: '/email/obiettivi-smart-lista-di-esempi-che-anche-la-tua-',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp/agenzia-seo',
        destination: '/seo/agenzia-seo',
        permanent: true,
      },
      {
        source: '/nettalk-sitemap.xml',
        destination: '/',
        permanent: true,
      },
      {
        source: '/page-sitemap.xml',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sitemap_index.xml',
        destination: '/',
        permanent: true,
      },
      {
        source: '/case-study/larena-255-di-visite-organiche-post-audit-seo-avanzata',
        destination: '/successi/larena-in-prima-posizione-su-google-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/en/case-study/cicalia-from',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source: '/web-marketing/page/1',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/page/3',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/page/1',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/training-old',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author/andrea-romagna',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/website-realization',
        destination: '/siti/realizzazione-siti-web',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-specialist-do-you-really-need-this-figure-find-out-here',
        destination: '/seo/seo-specialist-necessiti-davvero-di-questa-figura-scoprilo-qui',
        permanent: true,
      },
      {
        source: '/en/quote-realisation-website',
        destination: '/siti/realizzazione-siti-web',
        permanent: true,
      },
      {
        source:
          '/en/case-study/milano-fashion-institute-advanced-inbound-marketing-strategies-30-leads-and-22-revenue',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source: '/en/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/7-ecommerce-tactics-get-more-visibility-for-your-store-for-free-today',
        destination:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilita-del-tuo-negozio-e-commerce',
        permanent: true,
      },
      {
        source:
          '/en/seo/do-you-want-to-increase-visits-to-your-site-here-are-8-solutions-you-can-apply-today-for-your-business',
        destination:
          '/seo/vuoi-aumentare-le-visite-sul-tuo-sito-ecco-8-soluzioni-che-puoi-applicare-oggi-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/how-much-does-inbound-marketing-cost-discover-the-costs-and-pricing-of-marketing-with-hubspot',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/en/seo/google-update-june-2019-everything-you-need-to-know',
        destination: '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-ce-da-sapere',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/start-up-di-successo-5-aspetti-da-non-sottovalutare-per-far-crescere-la-propria-creaturaclass=',
        destination:
          '/social/start-up-di-successo-5-aspetti-da-non-sottovalutare-per-far-crescere-la-propria-creatura',
        permanent: true,
      },
      {
        source:
          '/case-study/bevande-a-domicilio-ecco-i-risulati-raggiunti-in-soli-6-mesi-di-lavoro',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/social-media-management-how-to-make-a-winning-social-profile',
        destination: '/social/management-social-media-come-realizzare-un-profilo-social-vincente',
        permanent: true,
      },
      {
        source: '/en/author/sara-stabili',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/social-media-marketing/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/seo/website-positioning-here-is-a-checklist-to-improve-it',
        destination: '/seo/migliorare-posizionamento-google-ecco-alcune-strategie',
        permanent: true,
      },
      {
        source: '/web-marketing/page/6',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/seo-copywriting',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/web-marketing-strategies-which-is-best-for-your-company',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-vs-mailchimp-which-email-marketing-solution',
        destination: '/crm/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        permanent: true,
      },
      {
        source: '/wp-json',
        destination: '/',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/cart-abandonment',
        destination: '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-piu',
        permanent: true,
      },
      {
        source: '/ecommerce/da-pinterest-nuova-linfa-per-il-social-e-commerce.html',
        destination: '/ecommerce/da-pinterest-nuova-linfa-per-il-social-e-commerce',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/instagram-business-account-what-changes-and-why-create-it',
        destination: '/social/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        permanent: true,
      },
      {
        source: '/en/web-marketing/digital-agency-heres-everything-it-can-do-for-your-company',
        destination:
          '/inbound-marketing/perche-una-start-up-dovrebbe-affidarsi-ad-unagenzia-di-marketing',
        permanent: true,
      },
      {
        source: '/en/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/uncategorized/online-advertising-campaign-find-out-how-to-best-structure-it',
        destination: '/sem-adv/campagna-pubblicitaria-online-scopri-come-strutturarla-al-meglio',
        permanent: true,
      },
      {
        source: '/en/objectives/commercial-network-development',
        destination: '/web-marketing/strategia-commerciale-i-4-approcci-che-danno-piu-risultati',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-in-italian-find-out-how-to-get-it-now',
        destination: '/crm/hubspot-in-italiano-scopri-come-ottenerlo-subito',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-starter-how-to-get-started-with-hubspot-at-its-best',
        destination: '/crm/hubspot-starter-come-iniziare-ad-usare-hubspot-al-meglio',
        permanent: true,
      },
      {
        source: '/comunicazione/progettazione-grafica',
        destination: '/comunicazione/grafica-cataloghi',
        permanent: true,
      },
      {
        source: '/web-marketing/landing-pages-analytics-edge.html',
        destination: '/web-marketing/landing-pages-analytics-edge',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/sem-specialist',
        destination: '/sem-adv/consulente-google-ads',
        permanent: true,
      },
      {
        source: '/non-categorizzato/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        destination: '/crm/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        permanent: true,
      },
      {
        source:
          '/news/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/ecommerce/preventivo',
        destination: '/ecommerce/preventivo-ecommerce-come-scegliere-il-migliore',
        permanent: true,
      },
      {
        source: '/web-marketing/3-esempi-di-start-up-italiane-di-successo',
        destination: '/web-marketing/5-esempi-di-start-up-italiane-di-successo',
        permanent: true,
      },
      {
        source: '/inbound-marketing/perché-il-tuo-sito-web-è-il-tuo-miglior-commercialeclass=',
        destination: '/inbound-marketing/perche-il-tuo-sito-web-e-il-tuo-miglior-commerciale',
        permanent: true,
      },
      {
        source: '/web-marketing/5-lezioni-sul-web-marketing-del-vino-lesempio-californiano',
        destination: '/web-marketing/5-lezioni-sul-web-marketing-del-vino',
        permanent: true,
      },
      {
        source: '/seo/growth-hacking-per-startup-cosè-e-come-funziona',
        destination: '/seo/growth-hacking-per-startup-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/business-cards/fabiog',
        destination: '/business-card/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        destination: '/social/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        permanent: true,
      },
      {
        source: '/author/fabio-giacomello',
        destination: '/business-card/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/sms-marketing-cosè-e-come-puoi-sfruttarlo-per-la-tua-azienda',
        destination: '/web-marketing/sms-marketing-cose-e-come-puoi-sfruttarlo-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/case-study/case-study-bravifarmacie',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/web-marketing/lead-nurturing-significato-definizione',
        destination: '/inbound-marketing/lead-nurturing-significato-definizione',
        permanent: true,
      },
      {
        source: '/web-marketing/la-sagra-dei-fumetti-e-cosi-che-il-content-diventa-king.html',
        destination: '/web-marketing/la-sagra-dei-fumetti-e-cosi-che-il-content-diventa-king',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-e-perché-fissare-gli-obiettivi-della-tua-strategia-di-marketing',
        destination:
          '/web-marketing/come-e-perche-fissare-gli-obiettivi-della-tua-strategia-di-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/il-marketing-nellera-del-riconoscimento-vocale-siri-cortana-e-assistente-googleclass=',
        destination:
          '/web-marketing/il-marketing-nellera-del-riconoscimento-vocale-siri-cortana-e-assistente-google',
        permanent: true,
      },
      {
        source: '/seo-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/social-media-marketing/page/1',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/non-categorizzato/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        destination: '/crm/hubspot-vs-mailchimp-quale-soluzione-per-l-email-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/page/2',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/nuova-nata-in-casa-youtube-community-la-social-featureclass=',
        destination: '/social/nuova-nata-in-casa-youtube-community-la-social-feature',
        permanent: true,
      },
      {
        source: '/en/seo/seo-wordpress',
        destination: '/seo/seo-wordpress',
        permanent: true,
      },
      {
        source: '/consulenza-marketing',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/progetti-it',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/hubspot',
        destination: '/crm/formazione-hubspot',
        permanent: true,
      },
      {
        source: '/seo/carrelli-abbandonati-ecommerce',
        destination: '/ecommerce/carrelli-abbandonati-ecommerce',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/buyers-journey-hubspot-cosè-e-perché-è-fondamentale-comprenderlo',
        destination:
          '/inbound-marketing/buyers-journey-hubspot-cose-e-perche-e-fondamentale-comprenderlo',
        permanent: true,
      },
      {
        source: '/preventivo-realizzazione-sito-web',
        destination: '/siti/preventivo-sito-web-a-quale-agenzia-affidare-il-tuo-progetto',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo/seo-magento',
        destination: '/seo/seo-magento',
        permanent: true,
      },
      {
        source: '/author/giada-ruggero',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo/posizionamento-google',
        destination: '/seo/posizionamento-siti-web',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/guida-ai-buyers-personas-cosa-sono-e-come-crearli-passo-dopo-passo',
        destination:
          '/inbound-marketing/guida-ai-buyer-persona-cosa-sono-e-come-crearli-passo-dopo-passo',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/lead-generation-ecco-come-trovare-nuovi-clienti',
        destination: '/web-marketing/lead-generation-ecco-come-trovare-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/web-marketing/restyling-del-sito-come-e-quando-è-necessario-per-il-bene-della-tua-attività',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/web-marketing/google-ads-consultant',
        destination: '/sem-adv/consulente-google-ads',
        permanent: true,
      },
      {
        source: '/inbound-marketing/page/4',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/preventivo-ecommerce',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/seo/seo-optimization-7-tips-to-maintain-your-websites-ranking',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source: '/en/marketing-consulting/web-marketing-consulting',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/en/ecommerce/open-an-e-commerce-site-the-steps-to-give-life-to-your-project',
        destination: '/ecommerce/quando-aprire-un-sito-e-commerce-6-situazioni-e-6-considerazioni',
        permanent: true,
      },
      {
        source: '/web-marketing/inbound-marketing-significato-metodi-strumenti-benefici',
        destination:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        permanent: true,
      },
      {
        source: '/seo/contenuti-duplicati',
        destination: '/ecommerce/contenuti-duplicati',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-consulting',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/non-categorizzato/marketing-tool-vs-marketing-strategy-cosa-risolve-i-problemi',
        destination: '/seo/marketing-tool-vs-marketing-strategy-cosa-risolve-i-problemi',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/customer-loyalty-strategies-examples-and-with-what-metrics-to-measure-it',
        destination:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla',
        permanent: true,
      },
      {
        source: '/preventivo-gestione-social',
        destination: '/social/preventivo',
        permanent: true,
      },
      {
        source: '/en/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/creare-sito-ecommerce/ecommerce-magento',
        destination: '/ecommerce/magento',
        permanent: true,
      },
      {
        source: '/en/communication/coordinated-image',
        destination: '/comunicazione/immagine-coordinata',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/inbound-sales',
        destination: '/inbound-marketing/inbound-sales',
        permanent: true,
      },
      {
        source: '/web-marketing/author/fabio-giacomello',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/seo/organic-positioning-what-is-meant-and-how-is-it-improved',
        destination: '/seo/posizionamento-organico-cosa-si-intende-e-come-si-migliora',
        permanent: true,
      },
      {
        source: '/contatti/lavora-con-noi',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/en/seo/seo-prestashop',
        destination: '/seo/seo-prestashop',
        permanent: true,
      },
      {
        source:
          '/web-marketing/mobile-engagement-shopping-e-micro-moments-la-guida-di-google-per-catturare-i-consumatoriclass=',
        destination:
          '/ecommerce/aumenta-le-vendite-con-google-shopping-e-i-suoi-product-listing-ad',
        permanent: true,
      },
      {
        source:
          '/web-marketing/mobile-engagement-shopping-e-micro-moments-la-guida-di-google-per-catturare-i-consumatori.html',
        destination:
          '/ecommerce/aumenta-le-vendite-con-google-shopping-e-i-suoi-product-listing-ad',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/mobile-engagement-shopping-e-micro-moments-la-guida-di-google-per-catturare-i-consumatori',
        destination:
          '/ecommerce/aumenta-le-vendite-con-google-shopping-e-i-suoi-product-listing-ad',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/page/1',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/nettalk/human-to-human-b2b-e-b2c-evolvono-con-emotional-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/posizionamento-google',
        destination: '/seo/posizionamento-siti-web',
        permanent: true,
      },
      {
        source: '/social-media-marketing/page/3',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/crm/digitalizzazione-fiere-eventi',
        destination: '/crm/digitalizzazione-fiere-ed-eventi',
        permanent: true,
      },
      {
        source: '/en/seo-blog/duplicated-content-ecommerce',
        destination: '/ecommerce/contenuti-duplicati',
        permanent: true,
      },
      {
        source: '/news/author/sara-stabili',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/web-marketing/15-idee-per-realizzare-un-sito-web-efficace',
        destination: '/web-marketing/15-idee-per-un-sito-web-efficace',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/aumentare-la-brand-reputation-come-l-inbound-marketing-può-aiutarti',
        destination:
          '/inbound-marketing/aumentare-la-brand-reputation-come-l-inbound-marketing-puo-aiutarti',
        permanent: true,
      },
      {
        source: '/news/dalla-vendita-allaiuto-linbound-sales-con-dan-tyreclass=',
        destination: '/',
        permanent: true,
      },
      {
        source: '/web-marketing/10-regole-del-buon-venditore-di-successoclass=',
        destination: '/web-marketing/10-regole-del-buon-venditore-di-successo',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/alessandro-agnoli',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-optimization-7-tips-to-maintain-your-websites-ranking',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source: '/ecommerce/page/5',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/inbound-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketingclass=',
        destination: '/inbound-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/lead-nurturing-significato-definizioneclass=',
        destination: '/inbound-marketing/lead-nurturing-significato-definizione',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-indexing-what-is-it-and-how-does-it-work',
        destination: '/seo/indicizzazione-seo-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/en/digitization-business-processes',
        destination:
          '/web-marketing/digitalizzazione-dei-processi-di-vendita-cose-3-esempi-pratici',
        permanent: true,
      },
      {
        source: '/en/inbound-sales',
        destination: '/inbound-marketing/inbound-sales',
        permanent: true,
      },
      {
        source: '/web-marketing/author/sara-maira',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/seo-agency-google',
        destination: '/seo/agenzia-seo',
        permanent: true,
      },
      {
        source: '/en/seo-blog/google-mobilegeddon-does-it-touch-pcdesktop-reseaches-too',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social-media-marketing/sai-come-usare-twitter-per-la-tua-azienda.html',
        destination: '/social/sai-come-usare-twitter-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/seo/guida-rapida-al-content-marketing-come-farlo-funzionare-4-mosse',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing-agency',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-call-to-action-how-to-start-using-them-today',
        destination: '/crm/hubspot-call-to-action-come-iniziare-ad-usarle-da-oggi',
        permanent: true,
      },
      {
        source: '/ecommerce/page/3',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/page/4',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/crm/preventivo',
        destination: '/crm/preventivo-crm',
        permanent: true,
      },
      {
        source: '/preventivo-crm',
        destination: '/crm/preventivo-crm',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/facebook-personal-branding-istruzioni-per-luso.html',
        destination: '/social/facebook-personal-branding-istruzioni-per-luso',
        permanent: true,
      },
      {
        source: '/seo/strumenti-di-seo-scopri-quali-sono-i-più-efficaci',
        destination: '/seo/strumenti-di-seo-scopri-quali-sono-i-piu-efficaci',
        permanent: true,
      },
      {
        source: '/author/[dettaglio-autore]',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/case-study/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source: '/digital-economy/whatsapp-su-pc-cose-come-si-scarica-e-perche-e-piu-comodo',
        destination: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona',
        permanent: true,
      },
      {
        source: '/successi/gardenstone-1118-nuovi-contatti-dal-sito-in-un-solo-anno-di-strategia',
        destination:
          '/successi/per-gardenstone-una-presenza-online-solida-grazie-alla-seo-di-netstrategy',
        permanent: true,
      },
      {
        source: '/en/case-study/cicalia-from-0-to-300000-visits-per-month-in-just-3-years',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/en/successi/juice-apple-premium-reseller-329-di-visite-organiche-e-472-di-tasso-di-conversione-in-3-anni-di-attivita',
        destination: '/successi/juice-apple-premium-reseller-un-nuovo-modo-di-comunicare-il-brand',
        permanent: true,
      },
      {
        source:
          '/successi/visure-network-576-di-visite-in-12-mesi-grazie-a-una-strategia-di-seo-e-social-media-marketing-personalizzata',
        destination:
          '/successi/visureitalia-i-risultati-conquistati-dallecommerce-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/successi/ortomec-15-640-nuovi-utenti-e-162-richieste-di-preventivo-in-12-mesi-di-strategia-di-comunicazione',
        destination:
          '/successi/ortomec-diventa-punto-di-riferimento-online-nel-suo-settore-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/successi/larena-267-di-visite-organiche-post-audit-seo-avanzata',
        destination: '/successi/larena-in-prima-posizione-su-google-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/en/successi/ferrari-costruzioni-meccaniche-37429-di-lead-e-613-di-viste-organiche-in-un-anno-e-mezzo-di-strategia',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/en/successi/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche-in-meno-di-12-mesi',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source:
          '/en/successi/forigo-roter-italia-linnovazione-come-cuore-di-una-strategia-di-comunicazione-online-e-offline',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/successi/cicalia-da-0-a-300-000-visite-al-mese-in-soli-3-anni',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source:
          '/en/successi/milano-fashion-institute-70-of-potential-students-enrolled-in-training-courses-with-a-multi-channel-strategy',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source:
          '/en/successi/ortomec-15-640-nuovi-utenti-e-162-richieste-di-preventivo-in-12-mesi-di-strategia-di-comunicazione',
        destination:
          '/successi/ortomec-diventa-punto-di-riferimento-online-nel-suo-settore-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source:
          '/en/successi/milano-fashion-institute-70-di-potenziali-iscritti-ai-corsi-di-formazione-con-una-strategia-su-piu-canali',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source: '/en/successi/larena-267-di-visite-organiche-post-audit-seo-avanzata',
        destination: '/successi/larena-in-prima-posizione-su-google-grazie-a-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-web-marketing',
        destination:
          '/web-marketing/migliori-web-agency-la-lista-completa-e-la-guida-per-la-scelta',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-agency',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/ecommerce/da-pinterest-nuova-linfa-per-il-social-e-commerce',
        destination: '/ecommerce/statistiche-ecommerce-2023-tutti-i-dati-e-le-nuove-tendenze',
        permanent: true,
      },
      {
        source:
          '/social/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienti',
        destination:
          '/social/instagram-b2b-le-strategie-di-successo-per-trovare-nuovi-clienti-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-ce-da-sapere',
        destination: '/seo/aggiornamento-algoritmo-google',
        permanent: true,
      },
      {
        source: '/crm/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        destination: '/inbound-marketing/hubspot-cosa-come-funziona-perche-adottarlo',
        permanent: true,
      },
      {
        source: '/seo/attivita-seo-quante-sono-e-quali-potrebbero-servirti-di-piu',
        destination: '/seo/imparare-seo-online',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-scegliere-tecnologia-e-partner',
        destination: '/inbound-marketing/3-esempi-di-inbound-marketing-super-efficace',
        permanent: true,
      },
      {
        source:
          '/web-marketing/5-mobile-moment-che-la-tua-azienda-deve-saper-sfruttare-per-acquisire-clienti',
        destination: '/web-marketing/case-study-di-marketing-3-esempi-reali-di-netstrategy',
        permanent: true,
      },
      {
        source: '/social/vuoi-una-social-media-strategy-da-record-impara-da-buzzfeed',
        destination: '/social/social-media-strategy-come-diventare-virali-in-6-step',
        permanent: true,
      },
      {
        source: '/crm/hubspot-content-strategy-crea-contenuti-brillanti-per-la-tua-azienda',
        destination:
          '/inbound-marketing/buyers-journey-hubspot-cose-e-perche-e-fondamentale-comprenderlo',
        permanent: true,
      },
      {
        source: '/ecommerce/3-ingredienti-della-crescita-delle-commerce-in-europa',
        destination:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilita-del-tuo-negozio-e-commerce',
        permanent: true,
      },
      {
        source: '/crm/hubspot-smart-content-come-personalizzare-i-contenuti-del-tuo-sito',
        destination: '/crm/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        permanent: true,
      },
      {
        source: '/crm/hubspot-landing-page-inizia-a-realizzarle-a-partire-da-oggi',
        destination: '/sem-adv/identikit-di-una-landing-page-efficace',
        permanent: true,
      },
      {
        source: '/seo/3-tecniche-per-un-posizionamento-efficace-nei-motori-di-ricerca',
        destination: '/seo/seo-significato',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/settore-wellness-scopri-la-strategia-di-marketing-che-fara-aumentare-le-tue-vendite-nel-2018',
        destination:
          '/seo/come-superare-i-tuoi-competitor-nel-settore-del-wellness-3-idee-a-cui-non-avevi-pensato',
        permanent: true,
      },
      {
        source: '/crm/netstrategy-diventa-silver-partner-hubspot',
        destination: '/crm/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        permanent: true,
      },
      {
        source: '/ecommerce/come-incrementare-le-proprie-vendite-e-commerce-nel-periodo-natalizio',
        destination: '/ecommerce/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        permanent: true,
      },
      {
        source: '/sem-adv/advertising-su-facebook-come-funziona-e-come-sfruttarlo-al-meglio',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-aggiungere-valore-minimizzare-rischio',
        destination:
          '/inbound-marketing/aumentare-la-brand-reputation-come-l-inbound-marketing-puo-aiutarti',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-se-fossimo-noi-a-dire-no',
        destination: '/inbound-marketing/inbound-marketing-significato-metodi-strumenti-benefici',
        permanent: true,
      },
      {
        source: '/en/crm-quote',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/digital-marketing-what-creates-your-strategy-and-find-customers-online',
        destination: '/',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza',
        destination: '/crm/email-marketing',
        permanent: true,
      },
      {
        source: '/seo/seo-2016-falsi-miti-da-dimenticare-parte-2',
        destination: '/seo/seo-specialist-necessiti-davvero-di-questa-figura-scoprilo-qui',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/facebook-advertising-campaign-the-10-mistakes-to-avoid',
        destination: '/sem-adv/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        permanent: true,
      },
      {
        source: '/news/inbound-marketing-se-fossimo-noi-a-dire-no',
        destination: '/inbound-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketing',
        permanent: true,
      },
      {
        source: '/en/author/letizia-poltronieri',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/non-categorizzato/netstrategy-diventa-silver-partner-hubspot',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/instagram-business-account-what-changes-and-why-create-it',
        destination: '/social/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        permanent: true,
      },
      {
        source: '/en/hubspot/author/valentina-pisani',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/seo-blog/author/mattia-mella',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/online-advertising-campaign-find-out-how-to-best-structure-it',
        destination: '/sem-adv/campagna-pubblicitaria-online-scopri-come-strutturarla-al-meglio',
        permanent: true,
      },
      {
        source: '/en/case-study/author/robbi-stefano',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/selling-on-instagram-here-are-all-the-tips-to-make-it-possible',
        destination: '/social/vendere-su-instagram-ecco-tutti-i-consigli-per-renderlo-possibile',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/inbound-marketing-instagram-how-to-increase-the-popularity-and-number-of-your-customers',
        destination: '/inbound-marketing/strategia-di-inbound-marketing-come-avere-successo-online',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/facebook-ads-what-is-it-and-how-can-it-grow-your-business',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/en/web-marketing/google-ads-consultant',
        destination: '/sem-adv/consulente-google-ads',
        permanent: true,
      },
      {
        source: '/en/seo/seo-activities-how-many-are-there-and-which-ones-might-serve-you-the-most',
        destination:
          '/seo/vuoi-aumentare-le-visite-sul-tuo-sito-ecco-8-soluzioni-che-puoi-applicare-oggi-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/the-ferragnez-wedding-a-marriage-between-marketing-and-social-networks',
        destination:
          '/social/il-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing/feed',
        destination:
          '/social/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/management-social-media-come-realizzare-un-profilo-social-vincente/feed',
        destination: '/social/management-social-media-come-realizzare-un-profilo-social-vincente',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda/feed',
        destination: '/social/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti/feed',
        destination: '/sem-adv/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo/feed',
        destination: '/social/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-landing-page-inizia-a-realizzarle-a-partire-da-oggi/feed',
        destination: '/sem-adv/identikit-di-una-landing-page-efficace',
        permanent: true,
      },
      {
        source: '/en/author/fabio-giacomello',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/i-10-errori-più-comuni-nelle-campagne-di-facebook-ads-che-la-tua-azienda-può-evitare-oggi',
        destination: '/sem-adv/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        permanent: true,
      },
      {
        source: '/seo/posizionamento-organico-cosa-si-intende-e-come-si-migliora/1000',
        destination: '/seo/posizionamento-organico-cosa-si-intende-e-come-si-migliora',
        permanent: true,
      },
      {
        source: '/seo/come-scrivere-meta-title-e-meta-description-la-guida-completa/1000',
        destination: '/seo/come-scrivere-meta-title-e-meta-description-la-guida-completa',
        permanent: true,
      },
      {
        source: '/connection',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/inbound-marketing/lead-nurturing-significato-definizione/1000',
        destination: '/inbound-marketing/lead-nurturing-significato-definizione',
        permanent: true,
      },
      {
        source: '/en/seo-en/whats-new-for-netstrategy-link-research-tool-associate-certification',
        destination:
          '/seo/novita-per-netstrategy-acquisito-il-certificato-di-link-research-tool-associate',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perche-devi-pretendere-trasparenza-dalla-tua-agenzia-di-inbound-marketing',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/seo/seo-significato/1000',
        destination: '/seo/seo-significato',
        permanent: true,
      },
      {
        source:
          '/posizionamento-motori/3-tecniche-per-un-posizionamento-efficace-nei-motori-di-ricerca',
        destination: '/seo/posizionamento-sul-motore-di-ricerca-come-puoi-migliorarlo',
        permanent: true,
      },
      {
        source: '/en/ecommerce-realization',
        destination: '/ecommerce/realizzazione-ecommerce',
        permanent: true,
      },
      {
        source: '/en/web-marketing/brand-reputation-management-what-is-it-and-why-is-it-important',
        destination: '/web-marketing/brand-reputation-management-cose-e-perche-importante',
        permanent: true,
      },
      {
        source: '/en/portfolio_category/portfolio-seo-en',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/sem-specialist',
        destination: '/sem-adv/consulente-google-ads',
        permanent: true,
      },
      {
        source: '/web-marketing/albergatore-quante-stelle-ha-il-tuo-hotel-marketing',
        destination: '/seo/settore-wellness-5-caratteristiche-per-un-sito-web-di-successo',
        permanent: true,
      },
      {
        source: '/seo/agenzia-prestashop',
        destination: '/ecommerce/prestashop',
        permanent: true,
      },
      {
        source: '/web-marketing/e-commerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-quote',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano/1000',
        destination:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        permanent: true,
      },
      {
        source: '/seo/alberatura-sito-web-come-ottimizzarla-step-by-step/1000',
        destination: '/seo/alberatura-sito-web-come-ottimizzarla-step-by-step',
        permanent: true,
      },
      {
        source: '/seo/author/sara-maira',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/selling-on-instagram-here-are-all-the-tips-to-make-it-possible',
        destination: '/social/vendere-su-instagram-ecco-tutti-i-consigli-per-renderlo-possibile',
        permanent: true,
      },
      {
        source:
          '/web-marketing/5-mobile-moment-che-la-tua-azienda-deve-saper-sfruttare-per-acquisire-clienticlass=',
        destination: '/seo/mobile-only-indexing-da-marzo-2021-google-considerera-solo-il-mobile',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/strategie-di-marketing-su-instagram-42-consigli-per-renderle-vincenti/1000',
        destination:
          '/social/strategie-di-marketing-su-instagram-42-consigli-per-renderle-vincenti',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-in-italiano-scopri-come-ottenerlo-subito/1000',
        destination: '/crm/hubspot-in-italiano-scopri-come-ottenerlo-subito',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-digitale-trova-nuovi-potenziali-clienti-grazie-al-web/1000',
        destination:
          '/web-marketing/marketing-digitale-b2b-la-migliore-strategia-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/web-marketing/4-consigli-per-pubblicizzare-la-tua-startup/1000',
        destination: '/web-marketing/4-consigli-per-pubblicizzare-la-tua-startup',
        permanent: true,
      },
      {
        source: '/ecommerce/piano-marketing-ecommerce-come-costruirlo-in-5-semplici-mosse/1000',
        destination: '/ecommerce/piano-marketing-ecommerce-come-costruirlo-in-5-semplici-mosse',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-nella-moda-quali-sono-le-migliori/1000',
        destination: '/web-marketing/strategie-di-marketing-nella-moda-quali-sono-le-migliori',
        permanent: true,
      },
      {
        source:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita/1000',
        destination:
          '/web-marketing/restyling-del-sito-come-e-quando-e-necessario-per-il-bene-della-tua-attivita',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-b2b-quali-sono-le-piu-efficaci/1000',
        destination: '/web-marketing/strategie-di-marketing-b2b-quali-sono-le-piu-efficaci',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/how-to-identify-the-right-influencer-for-your-marketing-activity',
        destination:
          '/social/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente/1000',
        destination: '/social/b2b-social-media-marketing-10-consigli-per-una-strategia-vincente',
        permanent: true,
      },
      {
        source:
          '/web-marketing/35-strade-per-pubblicizzare-il-tuo-sito-web-una-guida-completa/1000',
        destination:
          '/web-marketing/35-strade-per-pubblicizzare-il-tuo-sito-web-una-guida-completa',
        permanent: true,
      },
      {
        source: '/web-marketing/buzzsumo-cose-come-si-utilizza-guida-definitiva/1000',
        destination: '/web-marketing/buzzsumo-cose-come-si-utilizza-guida-definitiva',
        permanent: true,
      },
      {
        source: '/web-marketing/preventivo/1000',
        destination: '/web-marketing/preventivo-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/trend-marketing-2023-ecco-i-4-principali-secondo-netstrategy/1000',
        destination: '/web-marketing/trend-marketing-2023-ecco-i-4-principali-secondo-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/aspettando-bob-3-lezioni-di-marketing-da-game-of-thrones/1000',
        destination: '/web-marketing/aspettando-bob-3-lezioni-di-marketing-da-game-of-thrones',
        permanent: true,
      },
      {
        source: '/web-marketing/email-marketing-cos-e-e-a-cosa-serve-ecco-cosa-devi-sapere/1000',
        destination: '/web-marketing/email-marketing-cos-e-e-a-cosa-serve-ecco-cosa-devi-sapere',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business/1000',
        destination: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source: '/seo/seo-e-sem-marketing-quale-strategia-per-raggiungere-la-1-posizione/1000',
        destination: '/seo/seo-e-sem-marketing-quale-strategia-per-raggiungere-la-1-posizione',
        permanent: true,
      },
      {
        source: '/web-marketing/come-creare-una-campagna-di-email-marketing-efficace/1000',
        destination: '/web-marketing/come-creare-una-campagna-di-email-marketing-efficace',
        permanent: true,
      },
      {
        source: '/web-marketing/campagna-di-digital-marketing-nel-b2b-scopri-come-fare-centro/1000',
        destination: '/web-marketing/campagna-di-digital-marketing-nel-b2b-scopri-come-fare-centro',
        permanent: true,
      },
      {
        source:
          '/web-marketing/real-time-marketing-cose-e-come-creare-campagne-super-efficaci/1000',
        destination:
          '/web-marketing/real-time-marketing-cose-e-come-creare-campagne-super-efficaci',
        permanent: true,
      },
      {
        source: '/web-marketing/google-analytics-cose-come-funziona-la-guida-completa/1000',
        destination: '/web-marketing/google-analytics-cose-come-funziona-la-guida-completa',
        permanent: true,
      },
      {
        source: '/seo/google-bert/1000',
        destination: '/seo/google-bert',
        permanent: true,
      },
      {
        source:
          '/web-marketing/lancio-di-un-prodotto-sul-mercato-cosa-fare-prima-durante-e-dopo/1000',
        destination:
          '/web-marketing/lancio-di-un-prodotto-sul-mercato-cosa-fare-prima-durante-e-dopo',
        permanent: true,
      },
      {
        source: '/seo/indicizzazione-seo-cose-e-come-funziona/1000',
        destination: '/seo/indicizzazione-seo-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-marketing-cose-cosa-fa-ne-hai-davvero-bisogno/1000',
        destination: '/inbound-marketing/affidare-marketing-agenzia-esterna',
        permanent: true,
      },
      {
        source: '/web-marketing/quanto-ti-costa-uno-stand-in-fiera-e-quanto-ti-rende/1000',
        destination: '/web-marketing/quanto-ti-costa-uno-stand-in-fiera-e-quanto-ti-rende',
        permanent: true,
      },
      {
        source: '/web-marketing/comunicazione-web-breve-guida-su-come-farla-online/1000',
        destination: '/web-marketing/comunicazione-web-breve-guida-su-come-farla-online',
        permanent: true,
      },
      {
        source:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda/1000',
        destination:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/quale-social-guida-alla-scelta-tra-i-6-social-network-piu-famosi-in-italia/1000',
        destination:
          '/social/quale-social-guida-alla-scelta-tra-i-6-social-network-piu-famosi-in-italia',
        permanent: true,
      },
      {
        source: '/web-marketing/pubblicita-outdoor-porta-allesterno-la-tua-strategia-online/1000',
        destination: '/web-marketing/pubblicita-outdoor-porta-allesterno-la-tua-strategia-online',
        permanent: true,
      },
      {
        source:
          '/web-marketing/whatsapp-business-come-utilizzarlo-da-numero-fisso-ed-altre-info-tecniche/1000',
        destination:
          '/web-marketing/whatsapp-business-come-utilizzarlo-da-numero-fisso-ed-altre-info-tecniche',
        permanent: true,
      },
      {
        source:
          '/web-marketing/whatsapp-business-cose-e-come-puoi-usarlo-per-fare-marketing-la-guida-completa/1000',
        destination:
          '/web-marketing/whatsapp-business-cose-e-come-puoi-usarlo-per-fare-marketing-la-guida-completa',
        permanent: true,
      },
      {
        source:
          '/web-marketing/remarketing-cosa-significa-quali-benefici-porta-alla-tua-azienda/1000',
        destination:
          '/web-marketing/remarketing-cosa-significa-quali-benefici-porta-alla-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla/1000',
        destination:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla',
        permanent: true,
      },
      {
        source: '/seo/seo-sem-differenze-e-significato/1000',
        destination: '/seo/seo-sem-differenze-e-significato',
        permanent: true,
      },
      {
        source:
          '/web-marketing/ancano-idee-per-attirare-nuovi-clienti-scopri-10-idee-da-attuare-subito/1000',
        destination:
          '/web-marketing/ancano-idee-per-attirare-nuovi-clienti-scopri-10-idee-da-attuare-subito',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-marketing-offline-quali-sono-e-quali-adottare/1000',
        destination: '/web-marketing/strategie-di-marketing-offline-quali-sono-e-quali-adottare',
        permanent: true,
      },
      {
        source: '/inbound-marketing/zmot-scopri-cose-lo-zero-moment-of-truth-di-google/1000',
        destination: '/inbound-marketing/zmot-scopri-cose-lo-zero-moment-of-truth-di-google',
        permanent: true,
      },
      {
        source: '/social-media-marketing/10-statistiche-social-per-il-marketing-e-non-solo/1000',
        destination: '/social/10-statistiche-social-per-il-marketing-e-non-solo',
        permanent: true,
      },
      {
        source:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore/1000',
        destination:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore',
        permanent: true,
      },
      {
        source: '/seo/primi-su-google-2',
        destination: '/seo/indicizzare-sito-come-puoi-rendere-le-tue-pagine-visibili-a-google',
        permanent: true,
      },
      {
        source: '/inbound-marketing/seo-e-inbound-marketing-quali-differenze/1000',
        destination: '/seo/indicizzazione-seo-cose-e-come-funziona',
        permanent: true,
      },
      {
        source: '/en/case-study/forbit-it-seo-user-experience-for-e-commerce',
        destination: '/',
        permanent: true,
      },
      {
        source: '/test2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-sales/1000',
        destination:
          '/web-marketing/tecniche-per-aumentare-le-vendite-7-consigli-per-il-tuo-sales-team',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda/1000',
        destination:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/news/author/fabio-giacomello',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/come-apparire-su-google-maps-la-guida-completa-su-google-my-business/1000',
        destination: '/seo/come-apparire-su-google-maps-la-guida-completa-su-google-my-business',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione/1000',
        destination: '/social/esempi-di-strategia-social-3-aziende-da-cui-trarre-ispirazione',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/account-aziendale-instagram-cosa-cambia-e-perche-crearlo/1000',
        destination: '/social/account-aziendale-instagram-cosa-cambia-e-perche-crearlo',
        permanent: true,
      },
      {
        source: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona/1000',
        destination: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona',
        permanent: true,
      },
      {
        source: '/en/agency-web-marketing',
        destination:
          '/web-marketing/migliori-web-agency-la-lista-completa-e-la-guida-per-la-scelta',
        permanent: true,
      },
      {
        source: '/seo/aumentare-link-popularity',
        destination: '/seo/backlink-seo-la-guida-definitiva-del-2018-sui-link-in-entrata',
        permanent: true,
      },
      {
        source: '/digitalizzazione-processi-aziendali',
        destination:
          '/web-marketing/digitalizzazione-dei-processi-di-vendita-cose-3-esempi-pratici',
        permanent: true,
      },
      {
        source: '/web-marketing/page/5',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/page/13',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/news',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing/corso-social-media-marketing',
        destination: '/web-marketing/formazione',
        permanent: true,
      },
      {
        source: '/en/social-media/social-media-marketing-agency',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/seo/seo-',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/web-marketing-immobiliare-7-difetti-7-suggerimenti',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/formazione/11-coaching',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seo/seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/category/seo-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/alt-svc',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seo/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/enn/seo-blog/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/why-you-need-to-demand-transparency-from-your-inbound-marketing-agency',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/en/agenzia-inbound-marketing',
        destination: '/inbound-marketing/agenzia-inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/seo/seo-magento',
        destination: '/seo/seo-magento',
        permanent: true,
      },
      {
        source: '/en/seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perché-devi-pretendere-trasparenza-dalla-tua-agenzia-di-inbound-marketingclass=',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source: '/inbound-marketing/perch',
        destination: '/',
        permanent: true,
      },
      {
        source: '/it/social-media-marketing/page/1',
        destination: '/social/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source: '/portfolio/tailors-ties',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/ecommerce/3-ingredienti-della-crescita-delle-commerce-in-europa.html',
        destination: '/ecommerce/13-nuovi-trend-ecommerce-per-il-2024-la-guida-di-netstrategy',
        permanent: true,
      },
      {
        source: '/preventivo/preventivo-web-marketing',
        destination: '/web-marketing/preventivo',
        permanent: true,
      },
      {
        source: '/ecommerce/author/giulia-montin',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/lp-bf/scelta-partner-inbound-sr',
        destination: '/inbound-marketing/inbound-marketing-significato-metodi-strumenti-benefici',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/content-marketing-what-is-it-and-how-to-make-it-work',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source: '/seo/author/mattia-mella/page/5',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/inbound-marketing/page/1',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/seo-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/author/elisa',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/creare-sito-ecommerce',
        destination: '/ecommerce/realizzazione-ecommerce',
        permanent: true,
      },
      {
        source: '/web-marketing/sms-marketing-cosè-e-come-puoi-sfruttarlo-per-la-tua-aziendaclass=',
        destination: '/web-marketing/sms-marketing-cose-e-come-puoi-sfruttarlo-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/portfolio/stampaprint',
        destination:
          '/successi/stampaprint-italia-risultati-concreti-in-termini-di-visibilita-vendite-fatturato',
        permanent: true,
      },
      {
        source: '/web-',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ecommerce/ecommerce-marketing-scopri-il-valore-del-content-marketing',
        destination: '/ecommerce/ecommerce-marketing-la-guida-dalla-a-alla-z-verso-la-crescita',
        permanent: true,
      },
      {
        source: '/en/web-marketing/content-marketing-what-is-it-and-how-to-make-it-work',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source: '/objectives',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/news/aggiornamento-algoritmico-di-google-dellestate-2018-chi-ne-beneficia-e-chi-viene-penalizzato',
        destination: '/seo/aggiornamento-algoritmo-google',
        permanent: true,
      },
      {
        source: '/anteprime-corsi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/seo-blog/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/author/elisa-ventura',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/formation/course-web-marketing-in-company',
        destination: '/web-marketing/formazione',
        permanent: true,
      },
      {
        source: '/formazione',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/posizionamento-motori/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        destination: '/ecommerce/5-consigli-immediati-per-aumentare-le-vendite-del-tuo-e-commerce',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/linkedin-for-companies-the-best-tactics-for-success',
        destination: '/social/linkedin-per-aziende-le-migliori-tattiche-per-avere-successo',
        permanent: true,
      },
      {
        source: '/wp-json/wp/v2/pages/361',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp-bf/ecommerce-piattaforma-sr',
        destination: '/ecommerce/piattaforma-ecommerce-guida-tecnica',
        permanent: true,
      },
      {
        source: '/realizzazione-ecommerce',
        destination: '/ecommerce/realizzazione-ecommerce',
        permanent: true,
      },
      {
        source: '/inbound-sales',
        destination:
          '/web-marketing/tecniche-per-aumentare-le-vendite-7-consigli-per-il-tuo-sales-team',
        permanent: true,
      },
      {
        source: '/news/author/stefano-robbi',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/author/letizia-poltronieri',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/up-selling-e-cross-selling',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/progetto-cicalia-supermercato-online-marketing-strategico-e-web',
        destination:
          '/successi/cicalia-come-abbiamo-portato-al-successo-il-primo-supermercato-online',
        permanent: true,
      },
      {
        source: '/preventivo/preventivo-seo',
        destination: '/seo/preventivo-seo',
        permanent: true,
      },
      {
        source: '/ecommerce/page/2',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/web-marketing/social-media-marketing-agency',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/web-marketing/3-esempi-di-start-up-italiane-di-successoclass=',
        destination: '/web-marketing/5-esempi-di-start-up-italiane-di-successo',
        permanent: true,
      },
      {
        source: '/social-media-marketing/page/2',
        destination: '/social/preventivo',
        permanent: true,
      },
      {
        source: '/inbound-marketing/page/3',
        destination: '/inbound-marketing/agenzia-inbound-marketing',
        permanent: true,
      },
      {
        source: '/lp-bf/sales-processo-vendita-sr',
        destination:
          '/web-marketing/tecniche-per-aumentare-le-vendite-7-consigli-per-il-tuo-sales-team',
        permanent: true,
      },
      {
        source: '/seo/tecniche-seo-2019-ecco-come-farsi-trovare-su-google',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source: '/inbound-marketing/page/5',
        destination: '/inbound-marketing/agenzia-inbound-marketing',
        permanent: true,
      },
      {
        source: '/social-media-marketing',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/consulenza-marketing/consulenza-seo',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/en/newsletter-and-dem-marketing',
        destination: '/crm/hubspot-newsletter-stupisci-fin-da-ora-i-tuoi-contatti',
        permanent: true,
      },
      {
        source: '/author/mattia-mella',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/seo/aggiungi-la-tua-attività-commerciale-su-google-maps-ecco-come-fare',
        destination: '/seo/come-apparire-su-google-maps-la-guida-completa-su-google-my-business',
        permanent: true,
      },
      {
        source:
          '/en/seo-blog/link-audit-evitare-la-penalizzazione-e-valutare-i-backlink-in-4-mosse',
        destination: '/seo/link-audit-evitare-la-penalizzazione-e-valutare-i-backlink-in-4-mosse',
        permanent: true,
      },
      {
        source: '/news/hubspot-partner-netstrategy-si-evolve-e-diventa-gold',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source: '/author/alessandro-agnoli',
        destination: '/author/stefano-robbi',
        permanent: true,
      },
      {
        source: '/en/customer-value-management',
        destination: '/web-marketing/customer-relationship-management-benefici-del-crm',
        permanent: true,
      },
      {
        source: '/en/portfolio/eurochem-agro',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/ecommerce/prestashop-o-magento-qual-è-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punti-0',
        destination:
          '/ecommerce/prestashop-o-magento-qual-e-la-migliore-per-la-tua-azienda-analizziamo-le-differenze-in-5-punti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-già-oggiclass=',
        destination:
          '/social/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        permanent: true,
      },
      {
        source: '/seo/mobile-search-2-novita-google',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/web-marketing/usabilità-sito-web-la-base-per-essere-davvero-efficaci-online-e-acquisire-nuovi-lead',
        destination:
          '/web-marketing/user-experience-guida-definitiva-in-15-punti-per-un-sito-senza-paragoni',
        permanent: true,
      },
      {
        source: '/strategie-e-tecniche-fidelizzazione-clienti',
        destination:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla',
        permanent: true,
      },
      {
        source: '/ecommerce/dilemma-in-home-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inbound-marketing-agency',
        destination: '/',
        permanent: true,
      },
      {
        source: '/email/come-aumentare-tasso-di-conversione-ecommerce',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social-media-marketing/notizie-di-facebook-aggiornamento-news-feed',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/case-study/pulimav-technology.-strategia-di-inbound-marketing-196-di-visite-al-sito-in-meno-di-un-anno',
        destination:
          '/successi/celebriamo-il-successo-e-la-semplicita-una-nuova-comunicazione-per-pulimav-in-occasione-dei-ventanni-di-attivita',
        permanent: true,
      },
      {
        source: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        destination: '/crm/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        permanent: true,
      },
      {
        source: '/inbound-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketing',
        destination:
          '/inbound-marketing/cos-e-l-inbound-marketing-definizione-e-significato-in-italiano',
        permanent: true,
      },
      {
        source: '/seo/netstrategy-e-linkresearchtool-certified-professional-cosa-comporta-per-te',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/perche-il-tuo-sito-web-e-il-tuo-miglior-commerciale',
        destination:
          '/web-marketing/come-promuovere-il-proprio-sito-aziendale-per-incrementarne-la-visibilita-online',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/b2b-inbound-marketing-una-strategia-ad-hoc-per-avere-piu-clienti',
        destination:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-pubblicizzare-un-servizio-con-successo-la-guida-completa-di-netstrategy',
        destination: '/social/come-pubblicizzare-tua-azienda',
        permanent: true,
      },
      {
        source: '/seo/seo-migliora-subito-il-tuo-ranking-con-queste-tecniche',
        destination: '/social/vendere-su-facebook-alcune-strategie-e-idee-per-ottenere-risultati',
        permanent: true,
      },
      {
        source: '/inbound-marketing/strategia-di-inbound-marketing-come-avere-successo-online',
        destination: '/web-marketing/campagne-di-web-marketing-7-mosse-per-avere-successo',
        permanent: true,
      },
      {
        source: '/implementazione-crm',
        destination: '/crm/implementazione-crm',
        permanent: true,
      },
      {
        source: '/seo/content-marketing-4-esche-per-ottenere-backlink',
        destination: '/web-marketing/3-esempi-content-marketing-strategy-successo',
        permanent: true,
      },
      {
        source: '/web-marketing/mobile-engagement-report-2016-come-sfruttarlo-per-la-tua-azienda',
        destination:
          '/ecommerce/google-amp-cosa-sono-le-accelerated-mobile-pages-e-perche-sfruttarle',
        permanent: true,
      },
      {
        source: '/seo/il-penguin-update-e-arrivato-5-caratteristiche-di-google-penguin-4-0',
        destination:
          '/seo/product-review-update-google-tutto-quello-che-devi-sapere-sul-nuovo-aggiornamento',
        permanent: true,
      },
      {
        source: '/news/netstrategy-diventa-silver-partner-hubspot',
        destination: '/crm/hubspot-partner-italia-come-scegliere-lagenzia-giusta',
        permanent: true,
      },
      {
        source: '/digitalizzazione-fiere-eventi',
        destination: '/',
        permanent: true,
      },
      {
        source: '/social-media-marketing-agency',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/agenzia-inbound-marketing',
        destination: '/inbound-marketing/agenzia-inbound-marketing',
        permanent: true,
      },
      {
        source: '/lp-bf/inbound-marketing-ss',
        destination: '/',
        permanent: true,
      },
      {
        source: '/seo/indicizzare-sito-come-puoi-rendere-le-tue-pagine-visibili-a-google',
        destination: '/seo/indicizzare-un-sito-wordpress-tutti-i-consigli-di-netstrategy',
        permanent: true,
      },
      {
        source: '/we/indicizzare-sito-come-puoi-rendere-le-tue-pagine-visibili-a-google',
        destination: '/seo/indicizzare-un-sito-wordpress-tutti-i-consigli-di-netstrategy',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzia-link-building',
        destination: '/seo/agenzia-link-building',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-automation-strategy-evita-di-far-perdere-tempo-ai-tuoi-commerciali',
        destination: '/inbound-marketing/marketing-automation-definizione-problemi-strategie',
        permanent: true,
      },
      {
        source: '/seo/marketing-tool-vs-marketing-strategy-cosa-risolve-i-problemi',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/meglio-un-sito-efficace-o-un-nuovo-commerciale-scopri-quale-rende-di-piu-oggi',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/seo/come-superare-i-tuoi-competitor-nel-settore-del-wellness-3-idee-a-cui-non-avevi-pensato',
        destination: '/seo/settore-wellness-5-caratteristiche-per-un-sito-web-di-successo',
        permanent: true,
      },
      {
        source: '/crm/bando-digital-transformation-per-pmi-cosa-puoi-fare',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/whatsapp-business-come-utilizzarlo-da-numero-fisso-ed-altre-info-tecniche',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/whatsapp-business-cose-e-come-puoi-usarlo-per-fare-marketing-la-guida-completa',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/il-costo-di-whatsapp-business-scopri-come-e-quando-funziona',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/web-agency-seo-come-scegliere-quella-giusta-per-il-tuo-progetto',
        destination: '/seo/agenzia-seo',
        permanent: true,
      },
      {
        source: '/social/migliori-agenzie-di-social-media-marketing',
        destination: '/social/social-media-marketing-agency',
        permanent: true,
      },
      {
        source: '/web-marketing/agenzie-di-marketing-la-lista-delle-migliori',
        destination:
          '/web-marketing/migliori-web-agency-la-lista-completa-e-la-guida-per-la-scelta',
        permanent: true,
      },
      {
        source: '/web-marketing/blog-marketing-come-rendere-il-tuo-blog-un-successo',
        destination: '/web-marketing/gestione-blog-aziendale-guida-pratica-al-content-marketing',
        permanent: true,
      },
      {
        source: '/sem-adv/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        destination: '/sem-adv/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        permanent: true,
      },
      {
        source: '/web-marketing/marketing-automation-e-davvero-solo-e-mail-marketing',
        destination: '/inbound-marketing/marketing-automation-definizione-problemi-strategie',
        permanent: true,
      },
      {
        source: '/seo/seo-significato',
        destination: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web',
        permanent: true,
      },
      {
        source: '/sem-adv/pubblicita-su-google-3-modi-per-essere-visibili-online',
        destination: '/web-marketing/come-pubblicizzare-la-tua-azienda-su-google-la-guida-completa',
        permanent: true,
      },
      {
        source: '/web-marketing/servizi-di-web-marketing-di-quali-avresti-piu-bisogno-2',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/boston-inbound-2017-la-nostra-esperienza-tra-strategie-di-inbound-marketing-e-michelle-obama',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/digital-transformation-b2b-5-errori-da-non-commettere',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/crm/hubspot-call-to-action-come-iniziare-ad-usarle-da-oggi',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ecommerce/3-cose-che-devi-sapere-per-vendere-online-su-amazon',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/buyers-journey-hubspot-cose-e-perche-e-fondamentale-comprenderlo',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-piu',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-online-per-aziende-nel-settore-agricolo-5-strategie-per-vendere-allestero',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/social/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        destination: '/web-marketing/come-trovare-nuovi-clienti-online',
        permanent: true,
      },
      {
        source: '/-temporary-slug-4d7621d5-0731-4269-9904-1b916f2de2d2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/creare-sito-ecommerce',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/blog-old',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/case-study/author/letizia-poltronieri',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/case-study/forbit-it-seo-ecommerce',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/chi-siamo-wrong',
        destination: '/chi-siamo',
        permanent: true,
      },
      {
        source:
          '/comunicazione/sei-alla-ricerca-di-unagenzia-di-comunicazione-del-vino-per-la-tua-cantina',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/consulenza-seo-new-graphic',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/contatti/agenzia-seo-verona/seo-verona',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/digitalizzazione-eventi-e-fiere',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ecommerce/3-cose-che-devi-sapere-per-vendere-online-su-amazon/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/ecommerce/3-strategie-ecommerce-marketing-da-applicare-al-tuo-negozio-online/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/ecommerce/3-strategie-ecommerce-marketing-da-applicare-al-tuo-negozio-onlineclass=',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/author/alessandro-agnoli',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/author/valentina-pisani/page/1',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/author/valentina-pisani/page/2',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/contenuti-duplicati/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/creare-sito-e-commerce-come-rendere-il-tuo-progetto-un-successo/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/ecommerce-content-marketing-tutti-i-benefici-per-il-tuo-business/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/ecommerce-marketing-automation-strategie-per-vendere-di-piu/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/ecommerce-marketing-scopri-il-valore-del-content-marketingclass=',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/ecommerce/mobile-commerce-come-si-sta-evolvendo-lo-shopping-online-da-smartphone/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/offerte',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/preventivo-ecommerce-come-scegliere-il-miglioreclass=',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/quando-aprire-un-sito-e-commerce-6-situazioni-e-6-considerazioni/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-piu/feed',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/about-us',
        destination: '/chi-siamo',
        permanent: true,
      },
      {
        source: '/en/agenzia-web-marketing/agenzia-seo/seo-magento',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/case-study',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/case-study-1',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/category/social-media-marketing-en',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/communication/advertising-agency',
        destination: '/sem-adv',
        permanent: true,
      },
      {
        source: '/en/communication/catalogue-graphics',
        destination: '/comunicazione',
        permanent: true,
      },
      {
        source: '/en/conversion-rate-optimization',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/crm',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/en/crm-software',
        destination: '/crm',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/20-ways-to-advertise-your-e-commerce-site',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/3-ecommerce-marketing-strategies-to-apply-to-your-online-store',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/3-things-you-need-to-know-to-sell-online-on-amazon',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/abandoned-cart-recovery-some-strategies-to-sell-more',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/abandoned-carts-in-e-commerce-from-a-loss-to-added-value',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/b2b-e-commerce-when-is-it-convenient-for-a-business',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/black-friday-ecommerce-turning-super-discounts-into-opportunities',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/duplicate-content-problems-and-solutions-for-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/e-commerce-statistics-2018-in-italy-what-were-the-trends',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/e-commerce-statistics-2019-in-italy-what-are-the-trends',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/ecommerce-advantages-8-immediate-benefits-compared-to-the-traditional-store',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/ecommerce-content-marketing-all-the-benefits-for-your-business',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/ecommerce-customer-service-how-to-make-it-your-stores-strong-point',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/ecommerce-marketing-plan-how-to-build-it-in-5-easy-steps',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/ecommerce-marketing-the-guide-from-a-to-z-towards-growth',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/google-amp-what-are-accelerated-mobile-pages-and-why-take-advantage-of-them',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/how-to-increase-your-e-commerce-sales-5-instant-tips',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/how-to-increase-your-e-commerce-sales-during-the-christmas-period',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/how-to-increase-your-ecommerce-conversion-rate-today',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/how-to-sell-on-the-internet-the-complete-guide',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/how-to-sell-online-discover-the-7-mistakes-not-to-make-in-your-e-commerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/identikit-of-the-perfect-ecommerce-product-sheet',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/mobile-commerce-how-online-shopping-from-smartphones-is-evolving',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/open-an-e-commerce-site-the-steps-to-give-life-to-your-project',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce-en/prestashop-vs-shopify-which-is-the-right-platform-for-your-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/seo-immagini-guida-allottimizzazione-definitiva-in-11-step',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/shopify-or-magento-which-platform-for-your-e-commerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/what-do-successful-ecommerce-sites-have-in-common-7-fundamentals',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/20-ways-to-advertise-your-e-commerce-site',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/3-ingredients-of-the-growth-of-e-commerce-in-europe',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/b2b-e-commerce-how-to-promote-it-effectively',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/black-friday-ecommerce-turning-super-discounts-into-opportunities',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/creating-an-e-commerce-site-how-to-make-your-project-a-success',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/duplicate-content-problems-and-solutions-for-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/e-commerce-statistics-2018-in-italy-what-were-the-trends',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-blog',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-consulting',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-content-marketing-all-the-benefits-for-your-business',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-marketing-automation-strategies-to-sell-more',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-quote',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/ecommerce-quote-how-to-choose-the-best',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/from-pinterest-new-life-for-social-e-commerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/how-to-increase-your-e-commerce-sales-5-instant-tips',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/how-to-increase-your-ecommerce-conversion-rate-today',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/magento-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/online-promotion-what-to-do-when-opening-e-commerce-is-not-enough',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/prestashop-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce/prestashop-vs-shopify-which-is-the-right-platform-for-your-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/realization-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/seo-immagini-guida-allottimizzazione-definitiva-in-11-step',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/ecommerce/which-cms-for-ecommerce-is-best-suited-to-your-business-find-out',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/formation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/formation/consultant-seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-and-inbound-marketing-the-story-of-a-great-love',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-crm-italian-why-use-it-for-the-growth-of-your-company',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-lead-flows-how-to-leverage-them-to-generate-new-leads',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-smart-content-how-to-customize-your-sites-content',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/netstrategy-becomes-silver-partner-hubspot',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/call-for-digital-transformation-for-smes-what-can-you-do',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-and-inbound-marketing-the-story-of-a-great-love',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-crm-italian-why-use-it-for-the-growth-of-your-company',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-landing-page-starting-now',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/hubspot-landing-pages-start-making-them-starting-today',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot/lead-nurturing-with-hubspot-everything-you-should-know',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/acquisition-funnel-what-steps-to-ensure-the-users-trust',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/buyer-persona-what-are-they-and-how-to-build-them-step-by-step',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/buyers-journey-hubspot-what-is-it-and-why-is-it-essential-to-understand-it',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/conversion-funnel-discover-all-its-secrets-in-this-guide',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/differences-between-inbound-and-outbound-marketing-what-is-the-right-path-for-your-company',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/entrust-the-marketing-of-your-company-to-an-external-agency-challenges-and-solutions',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/how-can-you-support-your-sales-department',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/how-much-does-hubspot-really-cost-here-is-the-truth-for-each-package',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/how-much-does-inbound-marketing-cost-discover-the-costs-and-pricing-of-marketing-with-hubspot',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/how-to-create-the-editorial-plan-for-your-inbound-marketing-campaign',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/how-to-find-new-customers-for-your-company-in-2020',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/how-to-motivate-your-sales-force-8-tips-to-implement-today',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/hubspot-what-it-is-how-it-works-and-why-to-adopt-it-for-your-company',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/inbound-marketing-strategy-how-to-succeed-online',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/inbound-marketing-what-is-it-and-how-can-you-use-it-today-for-your-company',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/is-your-business-communication-not-effective-find-out-what-we-can-do-for-you',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/lead-nurturing-what-is-it-what-benefits-for-your-company',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/marketing-automation-definition-everything-you-need-to-know',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/the-companys-growth-is-the-result-of-a-strategy-how-can-you-implement-it-in-your-company-today',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/today-you-can-beat-your-competition-but-you-have-to-do-something-different-find-out-here',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/tools-to-increase-turnover-thats-all-you-need',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/what-is-inbound-marketing-definition-and-meaning-in-english',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/why-does-door-to-door-selling-no-longer-work-discover-5-reasons',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing-en/why-you-need-to-demand-transparency-from-your-inbound-marketing-agency',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-en/zmot-find-out-what-googles-zero-moment-of-truth-is',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/3-examples-of-super-effective-inbound-marketing',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/6-clues-to-understand-if-an-inbound-agency-knows-how-to-add-value-and-minimize-the-risk-to-your-business',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/acquisition-funnel-what-steps-to-ensure-the-users-trust',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/buyers-journey-hubspot-what-is-it-and-why-is-it-essential-to-understand-it',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/conversion-funnel-discover-all-its-secrets-in-this-guide',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/corporate-image-how-to-communicate-it-with-inbound-marketing',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/digital-marketing-2021-3-actions-to-take-to-start-the-year-in-a-big-way',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/digital-marketing-2021-3-steps-to-take-to-start-the-year-great',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/how-to-create-the-editorial-plan-for-your-inbound-marketing-campaign',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/inbound-marketing-agency',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/inbound-marketing-agency-2',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/inbound-marketing-quote',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/inbound-marketing-what-is-it-and-how-can-you-use-it-today-for-your-company',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/increase-brand-reputation-how-inbound-marketing-can-help-you',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/smarketing-what-happens-when-sales-and-marketing-collaborate',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/the-companys-growth-is-the-result-of-a-strategy-how-can-you-implement-it-in-your-company-today',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/wellness-sector-discover-the-marketing-strategy-that-will-increase-your-sales-in-2018',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/en/inbound-marketing/why-does-door-to-door-selling-no-longer-work-discover-5-reasons',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing/why-should-a-start-up-rely-on-a-marketing-agency',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/logo-restyling',
        destination: '/comunicazione',
        permanent: true,
      },
      {
        source: '/en/marketing-consulting/social-media-consulting',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/non-categorizzato/zmot-find-out-what-googles-zero-moment-of-truth-is',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/objectives/corporate-image-consulting',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/objectives/new-project-development',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/portfolio/gardacharter',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/portfolio/stefanoscandola-com',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/portfolio/toptuning',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/quote-management-social',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/quote-seo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-agency-milano',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/3-techniques-for-effective-search-engine-positioning',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/add-your-business-to-google-maps-heres-how',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/backlink-seo-the-ultimate-guide-to-a-successful-strategy',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/difference-between-seo-and-sem-why-it-is-essential-to-understand-it-for-the-good-of-your-business',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/do-you-want-to-increase-visits-to-your-site-here-are-8-solutions-you-can-apply-today-for-your-business',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/google-algorithmic-update-in-august-2018-find-out-who-benefits-from-it-and-who-is-penalized',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/google-bert-what-it-is-what-changes-and-why-it-is-important-to-know-it',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/google-update-june-2019-everything-you-need-to-know',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/how-to-promote-your-restaurant-with-a-website',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/how-to-write-meta-title-and-meta-description-the-complete-guide',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/indexing-a-wordpress-site-all-the-tips-from-netstrategy',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/javascript-seo-the-ultimate-guide-to-optimizing-your-site',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/learning-seo-online-the-51-essential-techniques',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/link-building-what-is-it-here-are-4-tactics-to-get-links',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/local-seo-8-tactics-to-acquire-new-geolocated-customers',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/mobile-only-indexing-from-march-2021-google-will-consider-only-mobile',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/official-google-removes-ads-on-the-right-side-of-the-screen',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/optimizing-websites-the-guide-to-reaching-1-position',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/organic-positioning-what-is-meant-and-how-is-it-improved',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/reaching-more-customers-in-the-wellness-sector-discover-5-characteristics-of-successful-sites',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/search-engine-positioning-how-can-you-improve-it',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-2021-improve-your-ranking-now-with-these-6-techniques',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-2021-techniques-heres-how-to-be-found-on-google',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-analysis-who-when-how-and-why-everything-you-need-to-know',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-and-sem-marketing-what-strategy-to-reach-1-position',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-audit-the-techniques-to-analyze-your-site-from-a-to-z',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/seo-competitors-analysis-how-does-it-take-place-and-what-data-do-you-need',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-consultant-grow-your-company-with-the-right-figure',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-techniques-here-are-the-ones-that-work-in-2018',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/seo-tools-find-out-which-ones-are-the-most-effective',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo-en/visibility-on-google-61-tactics-to-conquer-the-1-position',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/backlink-seo-the-ultimate-guide-to-a-successful-strategy',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/does-google-rank-the-wrong-page-on-your-site-here-are-the-solutions',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/first-on-google',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/growth-hacking-for-startups-what-is-it-and-how-does-it-work',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/how-to-appear-on-google-maps-the-complete-guide-to-google-my-business',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/how-to-sell-on-ebay-instructions-for-your-company',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/identikit-of-an-effective-landing-page',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/indexing-a-wordpress-site-all-the-tips-from-netstrategy',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/javascript-seo-the-ultimate-guide-to-optimizing-your-site',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/local-seo-8-tactics-to-acquire-new-geolocated-customers',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/marketing-tool-vs-marketing-strategy-what-really-solves-problems',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/mobile-only-indexing-from-march-2021-google-will-consider-only-mobile',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/netstrategy-is-lrt-certified-professional-but-you-are-the-one-to-earn',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/official-google-removes-ads-on-the-right-side-of-the-screen',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-2021-techniques-heres-how-to-be-found-on-google',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-agency',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-agency-verona',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-consulting',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-improve-your-ranking-with-these-techniques',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-in-websites-8-benefits-for-your-business-and-as-many-statistics',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-indexing-what-is-it-and-how-does-it-work',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-positioning',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-quote',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/seo/seo-tools-find-out-which-ones-are-the-most-effective',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/7-twitter-marketing-ideas-to-apply-immediately-to-your-business',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/how-to-advertise-your-company-find-out-how-social-media-can-help-you',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/how-to-advertise-your-youtube-channel-here-are-7-foolproof-methods',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing-en/how-to-optimize-youtube-videos-the-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/new-born-in-the-youtube-house-community-the-social-feature',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing-en/social-marketing-with-images-instagram-or-pinterest',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/social-media-marketing-what-is-it-and-how-to-create-a-strategy',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/which-social-network-for-your-company-choose-from-the-5-most-popular-social-networks-in-italy',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing-en/youtube-for-business-7-youtube-marketing-tips',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/7-twitter-marketing-ideas-to-apply-immediately-to-your-business',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/author/giada-ruggero',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/do-you-want-a-record-breaking-social-media-strategy-learn-from-buzzfeed',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/facebook-ads-investment-follow-these-tips-now',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/how-to-acquire-customers-on-the-internet-here-are-3-tips-you-can-apply-today',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/how-to-advertise-your-youtube-channel-here-are-7-foolproof-methods',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/how-to-optimize-youtube-videos-the-complete-guide',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/instagram-for-business-the-complete-guide-with-stats',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/social-marketing-with-images-instagram-or-pinterest',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/social-media-marketing-what-is-it-and-how-to-create-a-strategy',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/social-media-strategy-how-to-go-viral-in-6-steps',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/social-network-trends-all-the-techniques-for-a-winning-strategy',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/social-statistics-discover-all-the-trends-2020-2021',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing/which-social-network-for-your-company-choose-from-the-5-most-popular-social-networks-in-italy',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing/youtube-for-business-7-youtube-marketing-tips',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/strategies-and-techniques-customer-fidelity',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/strategy-of-lead-generation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/training',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/uncategorized/b2b-e-commerce-when-is-it-convenient-for-a-business',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/4-tips-to-advertise-your-startup',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/5-mistakes-not-to-make-when-choosing-the-web-marketing-consultant-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/5-mobile-moments-that-your-company-must-know-how-to-exploit-to-acquire-customers',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/5-quick-lessons-on-wine-web-marketing-the-californian-example',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/7-features-of-a-successful-website-in-the-agricultural-sector',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/are-customer-relationships-a-problem-7-tips-to-improve-them-quickly',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/b2b-digital-marketing-the-best-strategy-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/brand-reputation-management-what-is-it-and-why-is-it-important',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/business-plan-for-start-ups-what-you-need-for-optimal-planning',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/buzzsumo-find-out-what-it-is-and-how-to-use-it',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/collect-contacts-at-fairs-but-then-how-do-you-turn-them-into-customers',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/commercial-negotiation-5-inbound-steps-to-close-it-successfully',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/content-marketing-strategy-the-complete-guide-with-examples',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/customer-loyalty-strategies-examples-and-with-what-metrics-to-measure-it',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/digital-marketing-campaign-in-b2b-find-out-how-to-hit-the-mark',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/digital-marketing-trends-get-more-results-with-these-strategies',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/digitization-of-sales-processes-what-is-it-3-practical-examples',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/editorial-marketing-how-to-grow-your-newspaper-online',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/email-marketing-examples-heres-how-to-get-to-the-sale',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/email-marketing-what-is-it-and-what-is-it-for-heres-what-you-need-to-know',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/gaining-consumer-confidence-how-to-do-it-online',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/gdpr-2018-how-will-it-affect-digital-marketing-how-can-it-become-an-opportunity-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/google-analytics-what-is-it-how-does-that-work-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/google-search-and-food-trends-3-tips-for-the-food-industry-and-not-only',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-advertise-a-blog-the-ultimate-guide-in-11-points',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/how-to-advertise-on-the-internet-6-strategies-you-can-follow-today',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-advertise-website-here-are-35-ways-to-go',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-advertise-your-business-on-google-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-build-a-strong-web-presence-and-advertise-online',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/how-to-export-landing-pages-from-google-analytics-with-one-click',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/how-to-find-new-customers-in-the-agricultural-machinery-sector-5-ideas',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/how-to-find-new-customers-online-9-ways-to-get-started-today',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/how-to-measure-the-results-of-your-marketing-activity-here-are-the-metrics',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/how-to-reduce-business-costs-and-increase-the-effectiveness-of-your-internal-departments',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/iliad-rekindles-the-war-between-the-telephone-companies',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/increase-sales-productivity-with-digital-learn-how',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/italian-chatbot-innovative-support-for-a-better-service',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/leveraging-google-advertising-how-and-why',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/marketing-funnel-5-strategies-to-increase-sales-and-profits',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/marketing-in-the-age-of-speech-recognition-siri-cortana-and-google-assistant',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/marketing-strategies-in-fashion-which-are-the-best',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/mobile-engagement-shopping-and-micro-moments-googles-guide-to-capturing-consumers',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/online-advertising-how-and-why-it-can-become-the-winning-move-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/online-marketing-for-the-agricultural-sector-5-strategies-to-sell-abroad',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/online-marketing-no-matter-how-big-you-are-it-will-make-you-grow-again',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/outdoor-advertising-take-your-online-strategy-outside',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/promote-website-here-are-6-super-effective-strategies',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/real-estate-web-marketing-7-flaws-7-tips',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/real-time-marketing-what-it-is-and-how-to-create-effective-campaigns',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/restyling-of-the-site-how-and-when-is-it-necessary-to-do-it-for-the-good-of-your-business',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/sem-campaigns-how-and-why-to-make-quality-ads',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/seo-keywords-how-to-find-the-right-ones-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/specialist-digital-marketing-which-figure-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/strategic-business-planning-here-are-the-steps-to-follow',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/strategies-to-increase-turnover-ideas-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/techniques-to-increase-sales-7-tips-for-your-sales-team',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/the-comics-festival-this-is-how-content-becomes-king',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/the-cost-of-whatsapp-business-find-out-how-and-when-it-works',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/time-to-market-start-up-lean-or-traditional-approach',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/trade-fairs-always-effective-marketing-investment',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/user-experience-ultimate-guide-in-15-points-for-an-unparalleled-site',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/web-agency-the-step-by-step-guide-to-the-best-choice',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/webmarketing-what-is-it-how-can-it-become-your-strong-point',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-en/website-quote-which-agency-to-entrust-your-project-to',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/whatsapp-business-what-is-it-and-how-can-you-use-it-to-do-marketing-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/world-cup-2018-the-marketing-campaigns-of-the-big-companies-of-the-event',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/15-ideas-for-an-effective-website-discover-them-in-our-video-tutorial',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/3-marketing-lessons-from-game-of-thrones',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/4-tips-to-advertise-your-startup',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/5-examples-of-successful-italian-start-ups',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/7-common-mistakes-to-avoid-in-your-web-marketing-strategy',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/9-1-web-marketing-tips-for-your-restaurant',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/advertising-on-google-3-ways-to-be-visible-online',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/augmented-reality-what-it-is-how-it-works-examples-and-how-to-exploit-it-for-your-business',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/business-plan-for-start-ups-what-you-need-for-optimal-planning',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/buzzsumo-find-out-what-it-is-and-how-to-use-it',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/cicalia-among-the-itqf-best-shops-a-netstrategy-success',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/crm-benefits-here-are-the-4-biggest-advantages-of-customer-relationship-management',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/digital-transformation-examples-4-ideas-to-innovate-your-company-today',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/digital-transformation-growth-opportunities-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/digitization-of-sales-processes-what-is-it-3-practical-examples',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/email-marketing-campaign-heres-how-to-create-an-effective-one',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/examples-of-marketing-strategies-find-out-which-are-the-best-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/google-analytics-what-is-it-how-does-that-work-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/how-and-why-to-set-the-goals-of-your-marketing-strategy',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/how-much-does-a-stand-at-the-fair-cost-you-and-how-much-does-it-make-you',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/how-to-advertise-on-the-internet-6-strategies-you-can-follow-today',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/how-to-advertise-website-here-are-35-ways-to-go',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/how-to-advertise-your-business-on-google-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/how-to-appear-on-google-some-infallible-methods',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/how-to-export-landing-pages-from-google-analytics-with-one-click',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/how-to-reduce-business-costs-and-increase-the-effectiveness-of-your-internal-departments',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/improve-your-company-website-discover-7-tips-and-examples-to-help-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/increase-sales-productivity-with-digital-learn-how',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/italian-chatbot-innovative-support-for-a-better-service',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/lead-generation-agency',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/leveraging-google-advertising-how-and-why',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-automation-is-it-really-just-email-marketing',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-for-start-ups-the-ultimate-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/marketing-plan-in-8-videos-we-explain-how-to-make-an-effective-one',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-quote',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/marketing-strategies-in-fashion-which-are-the-best',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/mobile-engagement-shopping-and-micro-moments-googles-guide-to-capturing-consumers',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/offline-marketing-strategies-which-are-they-and-which-ones-to-adopt',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/online-advertising-how-and-why-it-can-become-the-winning-move-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/online-marketing-no-matter-how-big-you-are-it-will-make-you-grow-again',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/outdoor-advertising-take-your-online-strategy-outside',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/participating-in-fairs-heres-how-not-to-waste-thousands-and-thousands-of-euros',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/perche-partecipare-ad-una-fiera-del-settore-agricolo-6-good-reasons',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/real-estate-web-marketing-7-flaws-7-tips',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/real-time-marketing-what-it-is-and-how-to-create-effective-campaigns',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/remarketing-what-does-it-mean-what-benefits-does-it-bring-to-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/sem-campaigns-how-and-why-to-make-quality-ads',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/seo-keywords-how-to-find-the-right-ones-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/specialist-digital-marketing-which-figure-for-your-company',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/strategic-business-planning-here-are-the-steps-to-follow',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/techniques-to-increase-sales-7-tips-for-your-sales-team',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/the-10-rules-that-a-good-seller-must-follow-to-be-successful',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/the-cost-of-whatsapp-business-find-out-how-and-when-it-works',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/trade-fair-marketing-how-to-get-the-most-out-of-trade-fairs',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/trade-fairs-always-effective-marketing-investment',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/user-experience-ultimate-guide-in-15-points-for-an-unparalleled-site',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-communication-a-short-guide-on-how-to-do-it-online',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-marketing-campaigns-7-steps-to-succeed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/webmarketing-what-is-it-how-can-it-become-your-strong-point',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/website-promotion-how-to-increase-the-visibility-of-your-company-on-the-internet',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/what-are-start-ups-difference-between-italy-and-the-united-states',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/whatsapp-business-how-to-use-it-from-a-fixed-number-and-other-technical-info',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/whatsapp-business-what-is-it-and-how-can-you-use-it-to-do-marketing-the-complete-guide',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/world-cup-2018-the-marketing-campaigns-of-the-big-companies-of-the-event',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/website',
        destination: '/siti',
        permanent: true,
      },
      {
        source:
          '/eventi/internazionalizzazione-dellimpresa-come-preparare-le-basi-per-lo-sviluppo-e-la-conquista-dei-mercati-internazionali',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing/corso-e-commerce',
        destination: '/',
        permanent: true,
      },
      {
        source: '/hubspot/author/sara-stabili',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/hubspot/hubspot-e-inbound-marketing-storia-di-un-grande-amore/feed',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/hubspot/netstrategy-diventa-silver-partner-hubspot/feed',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/letizia-poltronieri',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/mattia-mella/page/1',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/author/sara-stabili/page/1',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/come-trovare-nuovi-clienti-per-la-tua-azienda-nel-2019',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/digital-marketing-2018-3-azioni-da-intraprendere-per-iniziare-lanno-alla-grande',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/digital-marketing-2018-3-azioni-da-intraprendere-per-iniziare-lanno-alla-grandeclass=',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/funnel-di-vendita-cose-e-perche-realizzarlo/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/guida-ai-buyers-persona-cosa-sono-e-come-crearli-passo-dopo-passo',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-aggiungere-valore-minimizzare-rischioclass=',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/inbound-marketing-significato-metodi-strumenti-benefici/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perche-la-vendita-porta-a-porta-non-funziona-piu-scopri-5-motivi/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/quanto-costa-linbound-marketing-scopri-i-costi-e-i-prezzi-del-marketing-con-hubspot/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/inbound-marketing/seo-e-inbound-marketing-quali-differenze/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/smarketing-cosa-succede-quando-sales-e-marketing-collaborano/feed',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/lp-bf/case-study-sr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/lp-bf/ecommerce-pre-apertura-fg',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news/author/letizia-poltronieri/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/author/sara-maira',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/author/sara-stabili/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/author/valentina-pisani/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/news/boston-inbound-2017-la-nostra-esperienza-tra-strategie-di-inbound-marketing-e-michelle-obama',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/eima-digital-preview-2020-sei-pronto-a-distinguerti-sul-web',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/news/mondiali-di-calcio-2018-le-campagne-marketing-delle-grandi-aziende-dellevento',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/netcomm-forum-2017-crescita-ecommerce-nel-mercato-italiano',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/news/netstrategy-e-linkresearchtool-certified-professional-cosa-comporta-per-te',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/non-categorizzato/agenzia-comunicazione-vino-sai-come-scegliere-quella-giusta',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/mobile-only-indexing-da-marzo-2021-google-considerera-solo-il-mobile',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/netstrategy-e-linkresearchtool-certified-professional-cosa-comporta-per-te',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/non-categorizzato/novita-per-netstrategy-acquisito-il-certificato-di-link-research-tool-associate',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/ottimizzazione-siti',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/posizionamento-google/google-instant',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/posizionamento-motori',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/preventivo/preventivo-ecommerce',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/seo-verona',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/4-strategie-di-link-building-per-conquistare-oggi-un-top-ranking/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-ce-da-sapere/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/analisi-seo-chi-quando-come-e-perche-tutto-cio-che-ce-da-sapere/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/analisi-seo-competitors-come-si-svolge-e-quali-dati-ti-servono/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/author/elisa-ventura/page/1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/author/mattia-mella',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/author/mattia-mella/page/1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/author/valentina-pisani/page/1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/b2b-seo-ecco-come-acquisire-nuovi-clienti-con-google/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/come-vendere-su-ebay-istruzioni-per-lusoclass=',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/seo/diventare-primi-su-google-e-superare-la-concorrenza-online-oggi-puoi.-scopri-come-in-questa-guida',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/google-instant',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/google-mobilegeddon-ricerche-mobile-vs-desktop',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/growth-hacking-per-startup-cose-e-come-funziona/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/identikit-di-una-landing-page-efficace.html',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/indicizzare-un-sito-wordpress-tutti-i-consigli-di-netstrategy/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/landing-pages-analytics-edge',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/mobile-first-index-il-tuo-ecommerce-sara-pronto',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/ottimizzazione-seo-7-consigli-per-mantenere-il-ranking-del-tuo-sito-web/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/posizionamento-organico-cosa-si-intende-e-come-si-migliora/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/produzione-saune-5-caratteristiche-per-un-sito-web-di-successo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/seo-2016-ecco-i-falsi-miti-che-devi-dimenticare-parte-terza',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/seo-falsi-miti-parte-1',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/seo-sem-differenze-e-significato.html',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/seo/strumenti-di-seo-scopri-quali-sono-i-piu-efficaci/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/seo/vuoi-aumentare-le-visite-sul-tuo-sito-ecco-8-soluzioni-che-puoi-applicare-oggi-per-la-tua-azienda/feed',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/social-media',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/author/letizia-poltronieri',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/blog',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-creare-una-pagina-aziendale-di-successo-su-facebook/feed',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/investimento-facebook-ads-come-ottenere-risultati-migliori-con-lo-stesso-budget/feed',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/nuova-nata-in-casa-youtube-community-la-social-feature/feed',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/sai-come-usare-twitter-per-la-tua-azienda/feed',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/strategie-commerciali-per-start-up-come-acquisire-nuovi-clienti/feed',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/successi/mec-strategia-web-marketing',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/successi/stampaprint-espana-248-nuovi-utenti-e-216-visite-organiche',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/tag/penguin-online/feed',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilita-del-tuo-negozio-e-commerce/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/author/letizia-poltronieri/page/1',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/author/mattia-mella/page/1',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/author/stefano-robbi',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/brand-reputation-management-cose-e-perche-importante/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/come-pubblicizzare-la-tua-azienda-su-google-la-guida-completa/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/customer-relationship-management-benefici-del-crm/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/digital-marketing-cose-crea-la-tua-strategia-e-trova-clienti-online/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/email-marketing-esempi-come-arrivare-alla-vendita/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/fidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/fiere-digitali-la-tua-azienda-e-davvero-pronta-a-partecipare/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/guida-rapida-al-content-marketing-come-farlo-funzionare-4-mosseclass=',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/il-marketing-nellera-del-riconoscimento-vocale-siri-cortana-e-assistente-google/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/inbound-marketing-agency',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/inbound-marketing-aggiungere-valore-minimizzare-rischio',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/kpi-vendite-scopri-come-misurare-lefficacia-della-tua-forza-vendita/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/le-tendenze-del-digital-marketing-del-2018-e-oltre-scopri-su-cosa-puntare',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/le-tendenze-del-digital-marketing-del-2018-e-oltre-scopri-su-cosa-puntareclass=',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-automation-strategy-evita-di-far-perdere-tempo-ai-tuoi-commercialiclass=',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/marketing-digitale-b2b-la-migliore-strategia-per-la-tua-azienda/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/marketing-fieristico-come-ottenere-il-massimo-dalle-fiere/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/meglio-un-sito-efficace-o-un-nuovo-commerciale-scopri-quale-rende-di-piu-ogg',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/mobile-engagement-shopping-e-micro-moments-la-guida-di-google-per-catturare-i-consumatori/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/page/2',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/perche-partecipare-ad-una-fiera-del-settore-agricolo-6-ottime-ragioni/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/pubblicita-outdoor-porta-allesterno-la-tua-strategia-online/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/remarketing-cosa-significa-quali-benefici-porta-alla-tua-azienda/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/web-marketing/ridurre-i-costi-aziendali-come-aumentare-l-efficacia-del-reparto-commerciale/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/web-agency-la-guida-step-by-step-verso-la-scelta-migliore/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/web-marketing/web-marketing-strategico-cosa-ti-serve-per-attuarlo/feed',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/portfolio/assospa',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/en/news/page/1',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/objectives',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/seo-en/marketing-tool-vs-marketing-strategy-what-really-solves-problems',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/enn/seo-blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/inbound-marketing/journal-detail',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing-agency/social-media-marketing-agency',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/seo/seo-2018-4-strategie-per-migliorare-il-tuo-ranking-su-google-nel-2018',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/4-tattiche-per-acquisire-lead-con-linbound-marketing',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/seo-ecommerce',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/seo-en/how-to-overcome-your-competitors-in-the-wellness-sector-3-ideas-you-hadnt-thought-of',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/hubspot-en/hubspot-partner-netstrategy-evolves-and-becomes-gold',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/agency-inbound-marketing',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/ecommerce/urgenza',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/en/social-media-marketing-en/facebook-personal-branding-instructions-for-use',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/newsletter-e-dem-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/marketing/newsletter-e-dem-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/newsletter-e-dem-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/web-marketing/mobile-engagement-report-2016-come-sfruttarlo-per-la-tua-azienda.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore-sito',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/successi/strategia-inbound-marketing-milano-fashion-institute',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/successi/forbit-it-seo-ecommerce',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/en/seo/how-to-overcome-your-competitors-in-the-wellness-sector-3-ideas-you-hadnt-thought-of',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/author/valentina-pisani',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/email',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/social-media-marketing/gestione-social-quando-affidarla-a-unagenzia',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/formazione/corso-web-marketing',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/en/author/elisa-ventura',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/creare-sito-ecommerce/ecommerce-prestashop',
        destination: '/web-marketing',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-social',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/ecommerce-en/3-ingredients-of-the-growth-of-e-commerce-in-europe',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/lp/strategie-marketing',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/ecommerce/come-incrementare-le-proprie-vendite-e-commerce-nel-periodo-natalizioclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/ecommerce/mobile-commerce-come-si-sta-evolvendo-lo-shopping-online-da-smartphoneclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media/social-media-marketing-consulting',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/seo/5-segreti-di-seo-marketing-alla-portata-di-tutti/1000',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/web-marketing/usabilita-sito-web-la-base-per-essere-davvero-efficaci-online-e-acquisire-nuovi-lead',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/comunicazione/link',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce/ecommerce-advantages-8-immediate-benefits-compared-to-the-traditional-store',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/agenzia-web-marketing/agenzia-seo/link-audit',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/non-categorizzato/ti-stai-preparando-a-vinitaly-nel-modo-giusto',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/social-media-marketing/page/4',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/web-marketing/3-esempi-di-start-up-italiane-di-successo/1000',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/social-media/social-media-quote',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/ecommerce/3-ingredienti-della-crescita-delle-commerce-in-europaclass=',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/web-marketing/servizi-di-web-marketing-di-quali-avresti-piu-bisogno',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/inbound-marketing-agency',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/en/web-marketing/web-agency-the-step-by-step-guide-to-the-best-choice',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/ecommerce/prestashop-vs-shopify-qual-e-la-piattaforma-giusta-per-il-tuo-e-commerce/1000',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/case-study/case-study-un-altro-successo-di-netstrategy-per-un-cliente-nel-business-dei-veicoli-commerciali',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/social-media-marketing/author/giada-ruggero',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/ecommerce/3-ecommerce-marketing-strategies-to-apply-to-your-online-store',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/en/ecommerce/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/seo/consulente-seoo',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/contatti/agenzia-seo-verona/seo-verona/feed',
        destination: '/seo/agenzia-seo-verona',
        permanent: true,
      },
      {
        source: '/web-marketing/aspettando-bob-3-lezioni-di-marketing-da-game-of-thrones.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/5-lezioni-sul-web-marketing-del-vino-lesempio-californiano',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/en/social-media-marketing-en/business-strategies-for-start-up-how-to-acquire-new-customers',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social/b2b-social-media-marketing-10-',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/seo/dilemma-in-home-page',
        destination: '/seo',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienticlass=',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/social-media-marketing/social-media-marketing-cose-e-come-puoi-',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/en/successi/the-arena-267-of-organic-visits-after-advanced-seo-audit',
        destination: '/successi',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2019/01/document-3268750_1920.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinala-sagra-dei-fumetti-e-cosi-che-il-content-diventa-king.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/realizzazione_siti_web_subpillar_netstrategy_1_9a97d07c9b.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinastrategie-di-marketing-b2b-quali-sono-le-piu-efficaci.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2019/07/oct8ne-1024x483.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinacome-e-perche-fissare-gli-obiettivi-della-tua-strategia-di-marketing.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/uploads/NSK_Net_Strategy_fea0da4870.png&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2019/01/notebook-614213_1920-1.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinaesempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/uploads/BPR_Net_Strategy_dcf2906e8b.png&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2021/10/know-your-prospect.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/02/Smarketing-1-1-1.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinareparto-marketing-e-vendite-3-problemi-frequenti-e-come-risolverli.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2019/01/volantini-pubblicita-outdoor.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/uploads/juice_Net_Strategy_2e7456db43.png&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinale-10-regole-che-un-buon-venditore-deve-seguire-per-avere-successo.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2021/10/statistiche-social-1.webp&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2021/10/Tempo.webp&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/Facebook-Jul-16-2020-06-55-51-87-AM-1024x576.webp&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinail-marketing-nell-era-del-riconoscimento-vocale-siri-cortana-e-assistente-google.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinainstagram-per-le-aziende-la-guida-completa-con-statistiche.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2022/09/presentazione-prodotto-come-farla-in-modo-efficace-e-orginale.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/07/piano-editoriale-2.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinale-relazioni-con-i-clienti-sono-un-problema-7-consigli-per-migliorarle-rapidamente.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinail-matrimonio-dei-ferragnez-uno-sposalizio-tra-il-marketing-e-i-social-network.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/09/post-instagram.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/11/2-24.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinacome-creare-una-pagina-aziendale-di-successo-su-facebook.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2018/11/markus-spiske-5UJbKYUjFCk-unsplash.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/shutterstock_665740429_327b6ec559.webp&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/preventivo_seo_subpillar_netstrategy_header_0ee50cae16.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/shutterstock_2161819863_1_cbd2a7354f.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/preventivo_marketing_subpillar_netstrategy_header_45198bb2ed.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinacampagna-pubblicitaria-facebook-i-10-errori-da-evitare.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinafidelizzazione-del-cliente-strategie-esempi-e-con-che-metriche-misurarla.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/07/crescita-aziendale.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinacomunicazione-web-breve-guida-su-come-farla-online.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinalead-nurturing-cos-e-quali-benefici-per-la-tua-azienda.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertina15-idee-per-un-sito-web-efficace-scoprile-nel-nostro-video-tutorial.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2018/07/gustavo-zambelli-MIC75hn_CMI-unsplash-scaled.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2019/10/Coggl.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinastrategie-di-marketing-offline-quali-sono-e-quali-adottare.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/06/obiettivi-smart.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/agenzia_inbound_marketing_subpillar_netstrategy_header_87111929d8.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/consulenza_google_analytics_header_4c407ff2b7.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/uploads/consulenteseo_subpillar_netstrategy_header_89a29bbdd7.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/09/foto-album.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinatrend-social-network-tutte-le-tecniche-per-una-strategia-vincente.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2016/11/Pagina-aziendale-di-successo-cover.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinapubblicita-outdoor-porta-all-esterno-la-tua-strategia-online.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinaservizio-clienti-e-commerce-come-renderlo-il-punto-di-forza-del-tuo-negozio.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/05/netstrategy-google-maps.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/10/ottimizzazione-8.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/07/problem-solving.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2020/10/buyers-journey-1.png&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinalancio-di-un-prodotto-sul-mercato-cosa-fare-prima-durante-e-dopo.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/10/didascalia.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/12/mosaico-giulietta-1.jpg&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source: '/_next/image?url=/media/2018/08/screen-1.webp&amp;w=3840&amp;q=75',
        destination: '/',
        permanent: true,
      },
      {
        source:
          '/_next/image?url=/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinaacquisire-la-fiducia-del-consumatore-come-farlo-online.jpg&amp;w=3840&amp;q=100',
        destination: '/',
        permanent: true,
      },
      {
        source: '/inbound-marketing/perché-il-tuo-sito-web-è-il-tuo-miglior-commerciale',
        destination: '/inbound-marketing/perche-il-tuo-sito-web-e-il-tuo-miglior-commerciale',
        permanent: true,
      },
      {
        source:
          '/web-marketing/meglio-un-sito-efficace-o-un-nuovo-commerciale-scopri-quale-rende-di-più-oggi',
        destination:
          '/web-marketing/meglio-un-sito-efficace-o-un-nuovo-commerciale-scopri-quale-rende-di-piu-oggi',
        permanent: true,
      },
      {
        source: '/seo/mobile-only-indexing-da-marzo-2021-google-considererà-solo-il-mobile',
        destination: '/seo/mobile-only-indexing-da-marzo-2021-google-considerera-solo-il-mobile',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verità-per-ogni-pacchetto?hsLang=en',
        destination:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verita-per-ogni-pacchetto?hsLang=en',
        permanent: true,
      },
      {
        source:
          '/web-marketing/strategie-di-web-marketing-qual-è-la-migliore-per-la-tua-azienda?__hssc=233546881.1.1599577559354&__hsfp=3510641055',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda?__hssc=233546881.1.1599577559354&__hsfp=3510641055',
        permanent: true,
      },
      {
        source:
          '/seo/mobile-only-indexing-da-marzo-2021-google-considererà-solo-il-mobile?hsLang=it',
        destination:
          '/seo/mobile-only-indexing-da-marzo-2021-google-considerera-solo-il-mobile?hsLang=it',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/aumentare-la-brand-reputation-come-l-inbound-marketing-può-aiutarti?hs_amp=true',
        destination:
          '/inbound-marketing/aumentare-la-brand-reputation-come-l-inbound-marketing-puo-aiutarti?hs_amp=true',
        permanent: true,
      },
      {
        source:
          '/web-marketing/sms-marketing-cosè-e-come-puoi-sfruttarlo-per-la-tua-azienda?hsLang=it-it',
        destination:
          '/web-marketing/sms-marketing-cose-e-come-puoi-sfruttarlo-per-la-tua-azienda?hsLang=it-it',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-farsi-pubblicità-su-internet-6-strategie-che-potresti-seguire?hs_amp=true',
        destination:
          '/web-marketing/come-farsi-pubblicita-su-internet-6-strategie-che-potresti-seguire?hs_amp=true',
        permanent: true,
      },
      {
        source:
          '/web-marketing/realtà-aumentata-cosè-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business?hsLang=it-it',
        destination:
          '/web-marketing/realta-aumentata-cose-come-funziona-esempi-e-come-sfruttarla-per-il-tuo-business?hsLang=it-it',
        permanent: true,
      },
      {
        source:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilità-del-tuo-negozio-e-commerce?hsLang=it-it',
        destination:
          '/web-marketing/7-tattiche-a-costo-zero-per-aumentare-la-visibilita-del-tuo-negozio-e-commerce?hsLang=it-it',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/settore-wellness-scopri-la-strategia-di-marketing-che-farà-aumentare-le-tue-vendite-nel-2018',
        destination:
          '/inbound-marketing/settore-wellness-scopri-la-strategia-di-marketing-che-fara-aumentare-le-tue-vendite-nel-2018',
        permanent: true,
      },
      {
        source: '/web-marketing/strategie-di-web-marketing-qual-è-la-migliore-per-la-tua-azienda',
        destination:
          '/web-marketing/strategie-di-web-marketing-qual-e-la-migliore-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/news/i-nostri-dati-venduti-su-facebook-è-di-nuovo-scandalo',
        destination: '/news/i-nostri-dati-venduti-su-facebook-e-di-nuovo-scandalo',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perché-una-start-up-dovrebbe-affidarsi-ad-unagenzia-di-marketing',
        destination:
          '/inbound-marketing/perche-una-start-up-dovrebbe-affidarsi-ad-unagenzia-di-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/strumenti-per-aumentare-il-fatturato-ecco-tutto-ciò-di-cui-necessiti?utm_source=dlvr.it&utm_medium=facebook',
        destination:
          '/inbound-marketing/strumenti-per-aumentare-il-fatturato-ecco-tutto-cio-di-cui-necessiti?utm_source=dlvr.it&utm_medium=facebook',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-è-la-strada-giusta-per-la-tua-azienda?utm_source=dlvr.it&utm_medium=facebook',
        destination:
          '/inbound-marketing/differenze-tra-inbound-e-outbound-marketing-qual-e-la-strada-giusta-per-la-tua-azienda?utm_source=dlvr.it&utm_medium=facebook',
        permanent: true,
      },
      {
        source: '/seo/www.example.com',
        destination: '/seo',
        permanent: true,
      },
      {
        source: '/en/communication/logo-restyling',
        destination: ' /comunicazione/restyling-del-logo',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2019/07/chatbot-italiano-2-1.jpg.webp',
        destination:
          '/web-marketing/chatbot-italiano-il-supporto-innovativo-per-un-servizio-migliore',
        permanent: true,
      },
      {
        source: '/email/6-aziende-per-6-social',
        destination: '/inbound-marketing',
        permanent: true,
      },
      {
        source: '/email/5-strategie-web-marketing-pmi-italiane',
        destination:
          '/web-marketing/esempi-strategie-di-marketing-scopri-quali-sono-le-migliori-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-ecommerce-fb',
        destination: '/ecommerce/consulenza',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-marketing',
        destination: '/web-marketing/consulenza',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2019/02/fatturato-e-commerce-italia.webp',
        destination: '/ecommerce',
        permanent: true,
      },
      {
        source: '/wp-content/uploads/2019/02/marketing-e-commerce.webp',
        destination: '/social',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-inbound',
        destination: '/inbound-marketing/consulenza-inbound-marketing',
        permanent: true,
      },
      {
        source: '/email/obiettivi-smart-lista-di-esempi-che-anche-la-tuaazienda-puo-applicare',
        destination:
          '/web-marketing/come-e-perche-fissare-gli-obiettivi-della-tua-strategia-di-marketing',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-seo',
        destination: '/seo/consulente-seo',
        permanent: true,
      },
      {
        source: '/email/60-minuti-consulenza-marketing-0',
        destination: '/',
        permanent: true,
      },
      {
        source: '/email/inbound-marketing-in-azione-crescita-pmi-italiana',
        destination: '/inbound-marketing/3-esempi-di-inbound-marketing-super-efficace',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/facebook-ads-come-acquisire-nuovi-clienti-e-aumentare-le-vendite',
        destination: '/social',
        permanent: true,
      },
      {
        source:
          '/web-marketing/whatsapp-business-cosè-e-come-puoi-usarlo-per-fare-marketing-la-guida-completa',
        destination:
          '/web-marketing/whatsapp-business-cose-e-come-puoi-usarlo-per-fare-marketing-la-guida-completa',
        permanent: true,
      },
      {
        source:
          '/web-marketing/come-promuovere-il-proprio-sito-aziendale-per-incrementarne-la-visibilità-online',
        destination:
          '/web-marketing/come-promuovere-il-proprio-sito-aziendale-per-incrementarne-la-visibilita-online',
        permanent: true,
      },
      {
        source:
          '/web-marketing/pubblicità-su-google-3-modi-per-essere-visibili-online',
        destination:
          '/web-marketing/pubblicita-su-google-3-modi-per-essere-visibili-online',
        permanent: true,
      },
      {
        source:
          '/web-marketing/gdpr-2018-come-influenzerà-il-digital-marketing-come-può-divenire-unopportunità-per-la-tua-azienda',
        destination:
          '/web-marketing/gdpr-2018-come-influenzera-il-digital-marketing-come-puo-divenire-unopportunita-per-la-tua-azienda',
        permanent: true,
      },
      {
        source: '/web-marketing/mobile-engagement-report-2016-',
        destination:
          '/web-marketing/ottimizzare-un-sito-per-mobile-ecco-come-lo-fa-netstrategy',
        permanent: true,
      },
      {
        source:
          '/web-marketing/strategie-di-marketing-b2b-quali-sono-le-più-efficaci',
        destination:
          '/web-marketing/strategie-di-marketing-b2b-quali-sono-le-piu-efficaci',
        permanent: true,
      },
      {
        source:
          '/successi/milano-fashion-institute-70-di-potenziali-iscritti-ai-corsi-di-formazione-con-una-strategia-su-piu-canali',
        destination:
          '/successi/milano-fashion-institute-216-conversioni-da-campagne-google-ads-con-netstrategy',
        permanent: true,
      },
      {
        source:
          '/web-marketing/agenzia-marketing-cosè-cosa-fa-ne-hai-davvero-bisogno',
        destination:
          '/web-marketing/agenzia-marketing-cose-cosa-fa-ne-hai-davvero-bisogno',
        permanent: true,
      },
      {
        source:
          '/successi/forigo-roter-italia-linnovazione-come-cuore-di-una-strategia-di-comunicazione-online-e-offline',
        destination: '/successi',
        permanent: true,
      },
      {
        source:
          '/social/investimento-facebook-ads-come-ottenere-risultati-migliori-con-lo-stesso-budget',
        destination:
          '/sem-adv/investimento-facebook-ads-come-ottenere-risultati-migliori-con-lo-stesso-budget',
        permanent: true,
      },
      {
        source:
          '/social/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        destination:
          '/sem-adv/fare-pubblicita-su-facebook-ecco-come-raggiungere-nuovi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarità-e-il-numero-dei-tuoi-clienticlass=',
        destination:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienticlass=',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/social-media-marketing-cosè-e-come-puoi-sfruttarlo-al-meglio',
        destination:
          '/social-media-marketing/social-media-marketing-cose-e-come-puoi-sfruttarlo-al-meglio',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarità-e-il-numero-dei-tuoi-clienti',
        destination:
          '/social-media-marketing/inbound-marketing-instagram-come-accrescere-la-popolarita-e-il-numero-dei-tuoi-clienti',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/social-media-marketer-in-che-modo-può-far-crescere-la-tua-azienda',
        destination:
          '/social-media-marketing/social-media-marketer-in-che-modo-puo-far-crescere-la-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-già-oggi',
        destination:
          '/social-media-marketing/come-acquisire-clienti-su-internet-ecco-3-consigli-che-puoi-applicare-gia-oggi',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/facebook-ads-che-cosè-e-come-può-far-crescere-il-tuo-business',
        destination:
          '/social-media-marketing/facebook-ads-che-cose-e-come-puo-far-crescere-il-tuo-business',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        destination:
          '/social/campagna-pubblicitaria-facebook-i-10-errori-da-evitare',
        permanent: true,
      },
      {
        source:
          '/social-media-marketing/come-identificare-il-giusto-influencer-per-la-tua-attività-di-marketing',
        destination:
          '/social-media-marketing/come-identificare-il-giusto-influencer-per-la-tua-attivita-di-marketing',
        permanent: true,
      },
      {
        source:
          '/seo/seo-nei-siti-web-8-benefit-per-la-tua-attività-e-altrettante-statistiche',
        destination:
          '/seo/seo-nei-siti-web-8-benefit-per-la-tua-attivita-e-altrettante-statistiche',
        permanent: true,
      },
      {
        source:
          '/seo/primi-su-google-come-ottenere-massima-visibilità-sui-motori-di-ricerca',
        destination:
          '/seo/primi-su-google-come-ottenere-massima-visibilita-sui-motori-di-ricerca',
        permanent: true,
      },
      {
        source:
          '/seo/pianificazione-2018-allineare-gli-obiettivi-di-profitto-alla-spesa-marketing-è-possibileclass=',
        destination:
          '/seo/pianificazione-2018-allineare-gli-obiettivi-di-profitto-alla-spesa-marketing-e-possibileclass=',
        permanent: true,
      },
      {
        source:
          '/seo/mobile-first-index-il-tuo-ecommerce-sarà-prontoclass=',
        destination:
          '/seo/mobile-first-index-il-tuo-ecommerce-sara-prontoclass=',
        permanent: true,
      },
      {
        source: '/seo/mobile-first-index-il-tuo-ecommerce-sarà-pronto',
        destination:
          '/seo/mobile-first-index-il-tuo-ecommerce-sara-pronto',
        permanent: true,
      },
      {
        source:
          '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-cè-da-sapere',
        destination:
          '/seo/aggiornamento-google-giugno-2019-tutto-quello-che-ce-da-sapere',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/settore-wellness-scopri-la-strategia-di-marketing-che-farà-aumentare-le-tue-vendite-nel-2018class=',
        destination:
          '/inbound-marketing/settore-wellness-scopri-la-strategia-di-marketing-che-fara-aumentare-le-tue-vendite-nel-2018class=',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verità-per-ogni-pacchetto',
        destination:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verita-per-ogni-pacchetto',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perché-devi-pretendere-trasparenza-dalla-tua-agenzia-di-inbound-marketing',
        destination:
          '/inbound-marketing/perche-devi-pretendere-trasparenza-dalla-tua-agenzia-di-inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verità-per-ogni-pacchettoclass=',
        destination:
          '/inbound-marketing/quanto-costa-davvero-hubspot-ecco-la-verita-per-ogni-pacchettoclass=',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/la-crescita-aziendale-è-frutto-di-una-strategia-scopri-come-metterla-in-pratica',
        destination:
          '/inbound-marketing/la-crescita-aziendale-e-frutto-di-una-strategia-scopri-come-metterla-in-pratica',
        permanent: true,
      },
      {
        source:
          '/hubspot/lead-nurturing-con-hubspot-tutto-ciò-che-dovresti-sapere',
        destination:
          '/hubspot/lead-nurturing-con-hubspot-tutto-cio-che-dovresti-sapere',
        permanent: true,
      },
      {
        source:
          '/hubspot/hubspot-crm-italiano-perché-usarlo-per-la-crescita-della-tua-azienda',
        destination:
          '/hubspot/hubspot-crm-italiano-perche-usarlo-per-la-crescita-della-tua-azienda',
        permanent: true,
      },
      {
        source:
          '/hubspot/hubspot-marketing-come-e-perché-utilizzarlo-per-la-tua-strategia',
        destination:
          '/hubspot/hubspot-marketing-come-e-perche-utilizzarlo-per-la-tua-strategia',
        permanent: true,
      },
      {
        source:
          '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-più',
        destination:
          '/ecommerce/recupero-carrelli-abbandonati-alcune-strategie-per-vendere-di-piu',
        permanent: true,
      },
      {
        source:
          '/web-marketing/webmarketing-cosè-come-può-divenire-il-tuo-punto-di-forza',
        destination:
          '/web-marketing/webmarketing-cose-come-puo-divenire-il-tuo-punto-di-forza',
        permanent: true,
      },
      {
        source:
          '/seo/aggiungi-la-tua-attivita-commerciale-su-google-maps-ecco-come-fare',
        destination:
          '/seo/come-apparire-su-google-maps-la-guida-completa-su-google-my-business',
        permanent: true,
      },
      {
        source:
          '/web-marketing/web-marketing-immobiliare-7-difetti-7-suggerimenti',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/wp-content',
        destination:
          '/',
        permanent: true,
      },
      {
        source:
          '/ecommerce/3-strategie-ecommerce-marketing-da-applicare-al-tuo-negozio-online',
        destination:
          '/ecommerce/strategie-ecommerce-marketing-da-applicare-al-tuo-negozio-online',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/perche-una-start-up-dovrebbe-affidarsi-ad-unagenzia-di-marketing',
        destination:
          '/inbound-marketing',
        permanent: true,
      },
      {
        source:
          '/seo/local-seo-una-miniera-doro-per-il-mercato-immobiliare',
        destination:
          '/seo',
        permanent: true,
      },
      {
        source:
          '/ecommerce/ecommerce-content-marketing-tutti-i-benefici-per-il-tuo-business',
        destination:
          '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/inbound-marketing/wellness-idee-strategie-marketing-acquisire-clienti-2018',
        destination:
          '/inbound-marketing/wellness-idee-strategie-marketing-acquisire-clienti',
        permanent: true,
      },
      {
        source:
          '/web-marketing/5-errori-da-non-commettere-quando-scegli-il-consulente-di-web-marketing-per-la-tua-azienda',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/ai',
        destination:
          '/intelligenza-artificiale',
        permanent: true,
      },
      {
        source:
          '/ai/ai-analytics',
        destination:
          '/intelligenza-artificiale/ai-analytics',
        permanent: true,
      },
      {
        source:
          '/ai/ai-marketing-agency',
        destination:
          '/intelligenza-artificiale/ai-marketing-agency',
        permanent: true,
      },
      {
        source:
          '/ai/consulenza-intelligenza-artificiale',
        destination:
          '/intelligenza-artificiale/consulenza-intelligenza-artificiale',
        permanent: true,
      },
      {
        source:
          '/en/ecommerce/how-to-sell-on-the-internet-the-complete-guide',
        destination:
          '/ecommerce',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/launching-a-product-on-the-market-what-to-do-before-during-and-after',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing-en/online-marketing-strategies-in-luxury-statistics-and-what-to-do',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/b2b-marketing-strategies-which-are-the-most-effective',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/en/web-marketing/user-experience-definitive-guide-in-15-points-for-a-website-without-parisons',
        destination:
          '/web-marketing',
        permanent: true,
      },
      {
        source:
          '/nettalk/strategie-digitali-per-le-',
        destination:
          '/nettalk',
        permanent: true,
      },
      {
        source:
          '/news/page/1',
        destination:
          '/blog',
        permanent: true,
      },
      {
        source:
          '/seo/pianificazione-2018-allineare-gli-obiettivi-di-profitto-alla-spesa-marketing-e-possibile',
        destination:
          '/seo',
        permanent: true,
      },
      {
        source:
          '/strumenti-seo-2024',
        destination:
          '/seo/strumenti-di-seo-scopri-quali-sono-i-piu-efficaci',
        permanent: true,
      },
      {
        source:
          '/ecommerce/13-nuovi-trend-ecommerce-per-il-2024-la-guida-di-netstrategy',
        destination:
          '/ecommerce/13-nuovi-trend-ecommerce-la-guida-di-netstrategy',
        permanent: true,
      }

      // {
      //   source:
      //     '/enhttps:/www.netstrategy.it/successi/cicalia-from',
      //   destination:
      //     '/',
      //   permanent: true,
      // },
  
      // {
      //   source:
      //     '/email/60-minuti-consulenza-ecommerce',
      //   destination:
      //     '/',
      //   permanent: true,
      // },

      // {
      //   source: '/_next/image',
      //   // has: [
      //   //   {
      //   //     type: 'query',
      //   //     key: 'url',
      //   //     value: '/media/2021/10/homenetstrategy.itscriptsnetstrategycopertinapokemon-go-app-geniale-tra-social-e-local.jpg'
      //   //   }
      //   // ],
      //   destination: '/',
      //   permanent: true,
      // },
    ];

    const encodedRedirects = URLEncoder(redirectsArr) ?? redirectsArr;

    return encodedRedirects;
  },
};

module.exports = nextConfig;