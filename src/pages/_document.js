import { Html, Head, Main, NextScript } from 'next/document';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      // ctx.res.setHeader(
      //   'Content-Security-Policy',
      //   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com; frame-src https://www.youtube.com; img-src 'self' https://*.ytimg.com;"
      // );

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="it">
        <Head>
          <noscript>
            <link rel="stylesheet" href="/no-js.css" />
          </noscript>

          <link
            rel="preload"
            href="/fonts/Akkordeon-Nine.otf"
            as="font"
            type="font/opentype"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/Akkordeon-Six.otf"
            as="font"
            type="font/opentype"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/PPNeueMontreal-Regular.ttf"
            as="font"
            type="font/truetype"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/NeueMontreal-Medium.otf"
            as="font"
            type="font/opentype"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/Marker-Mark.otf"
            as="font"
            type="font/opentype"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            href="/fonts/HouschkaPro-Bold.ttf"
            as="font"
            type="font/truetype"
            crossOrigin="anonymous"
          />

          {/*//! IUBENDA START ---  */}

          {/* Style for banner */}
          <link rel="icon" href="/favicon.png" />
          <style type="text/css" rel="preload">
            {`

            #iubenda-cs-banner div.iubenda-cs-opt-group {
              justify-content: end !important;
            }
                        

                #iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn {
                position: absolute !important;
                top: 16px !important;
                right: 16px !important;
                padding: 0 !important;
                width: auto !important;
            }

            #iubenda-cs-banner div.iubenda-cs-opt-group button.iubenda-cs-reject-btn {
              color: #FC1333 !important;
            }

            #iubenda-cs-banner div.iubenda-cs-opt-group button.iubenda-cs-reject-btn:focus {
              outline: none !important;
              box-shadow: none !important;
            }

            #iubenda-cs-banner #iubenda-cs-paragraph .iub-p strong {
              background: none !important;
              font-weight: 300 !important;
              font-family: -apple-system,sans-serif!important;
            }




            #iubenda-cs-banner div.iubenda-banner-content {
                padding: 16px 16px 30px 16px !important;
              }
              



              #iubenda-cs-banner .iubenda-cs-opt-group button.iubenda-cs-reject-btn:hover  {
                box-shadow: none !important;
                text-decoration: underline !important;
              }


              @media (min-width: 639px) {
                #iubenda-cs-banner div.iubenda-cs-opt-group-custom {
                  order: 2 !important; 
                }
              }


            @media (min-width: 639px) {
              #iubenda-cs-banner div.iubenda-cs-opt-group-custom {
                margin-right: 0 !important;
              }
            }

            @media (min-width: 639px) {
              #iubenda-cs-banner div.iubenda-cs-opt-group button.iubenda-cs-accept-btn {
                margin-left: auto !important;
                margin-right: 1rem !important;
              }
            }

              #iubenda-cs-banner div.iubenda-cs-opt-group-custom button {
                padding: 16px 40px !important;
                background: white !important;
                border: 1px solid #FC1333!important;
                color: #FC1333!important;
              }



              
              div#iubenda-cs-banner div.iubenda-cs-opt-group .iubenda-cs-opt-group-custom button:focus {
                outline-color: #FC1333!important;
              }

              div#iubenda-cs-banner div.iubenda-cs-opt-group .iubenda-cs-opt-group-consent button:focus {
                outline-color: #FC1333!important;
              }



              #iubenda-cs-banner div.iubenda-cs-opt-group-consent button {
                padding: 16px 40px !important;
              }




              #iubenda-cs-banner div.iubenda-cs-opt-group button.iubenda-cs-accept-btn   {
                border: 1px solid #FC1333!important;
              }

              
              div#purposes-content-container div.purposes-content div.iub-consent-buttons div button.purposes-btn-reject:focus,
              div#purposes-content-container div.purposes-content div.iub-consent-buttons div button.purposes-btn-accept:focus,
              div#purposes-content-container div.purposes-content div.iub-consent-buttons div button.purposes-btn-accept:focus,
              div#purposes-container.iubenda-modal-navigation div.purposes-header button:focus,
              div#purposes-container.iubenda-modal-navigation div.purposes-header a:focus,
              div#purposes-content-container div.purposes-content div.purposes-section-body.purposes-items button.purposes-item-title-btn:focus,
              div#iubenda-cs-paragraph a[href]:focus,
              div#purposes-content-container div.purposes-content div.purposes-section-body.purposes-items div.iub-toggle-checkbox.purposes-checkbox input:focus
              {
                outline-color: #FC1333!important;
              }
              

              #iubenda-cs-banner div.iubenda-cs-opt-group-consent {
                margin-left: 0px !important;
              }


              div#iubFooterBtnContainer button#iubFooterBtn {
                background: #FC1333!important;
                outline-color: #FC1333!important;
              }




            `}
          </style>
          {/*//! IUBENDA END ---  */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
