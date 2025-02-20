import ContactForm from "@/components/ContactForm";
import { Container, HeadingDefault, HCenteredContent, LightTitle, Paragraph, RoundedThinButton, RoundedThinLightButton, AbsoluteContainer, Columns, Column, HeadingSub, LineDivider, FixedScrollableContainer, BackgroundImgContainer, HideMb, ShowMb, MobileHorizontalScroll } from "@/components/styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import getStaticData from "@/utils/getStaticData";
import Footer from "@/components/Footer";
import styled from "styled-components";
import Link from "next/link";

export async function getStaticProps() {
    const staticData = await getStaticData(true);
    return await { props: { staticData}};
}

function landingAccessibilita({staticData}) {
    const [nav, setNav] = useState([
        {
            label: "L'EVENTO",
            url: "#evento"
        },
        {
            label: "PROGRAMMA",
            url: "#programma"
        },
        {
            label: "LOCATION",
            url: "#location"
        },
        {
            label: "CHI SIAMO",
            url: "#chi-siamo"
        },
        {
            label: "CONTATTI",
            url: "#iscriviti"
        }
    ])
    const [imgCarousel, setImgCarousel] = useState({
        data: [
            {
                attributes: {
                    url: '/assets/ey/images/carousel/carousel-03.png',
                    alternativeText: ''
                }
            },
            {
                attributes: {
                    url: '/assets/ey/images/carousel/carousel-01.png',
                    alternativeText: ''
                }
            },
            {
                attributes: {
                    url: '/assets/ey/images/carousel/carousel-02.png',
                    alternativeText: ''
                }
            },
            {
                attributes: {
                    url: '/assets/ey/images/carousel/carousel-04.png',
                    alternativeText: ''
                }
            }
        ]
    })
    const [params, setParams] = useState('')

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        setParams(urlParams)

        if (window.innerWidth >= 1024) {
            document.querySelectorAll('.btn-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    
                    if (!this.hasAttribute('data-page')) {
                        e.preventDefault();
                        document.querySelector(this.getAttribute('href')).scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }, [])

    return (
        <>
            <Head>
                <title>Accessibilità dei Siti Web la tua azienda è pronta per il 28 giugno 2025?</title>
                <meta name="robots" content="noindex,nofollow" />
                <style>
                    {
                        `
                            @font-face {
                                font-family: NeueMontrealRegular;
                                src: url(/fonts/NeueMontreal-Regular.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealMediumItalic;
                                src: url(/fonts/NeueMontreal-MediumItalic.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealMedium;
                                src: url(/fonts/NeueMontreal-Medium.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealLight;
                                src: url(/fonts/NeueMontreal-Light.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealLightItalic;
                                src: url(/fonts/NeueMontreal-LightItalic.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealItalic;
                                src: url(/fonts/NeueMontreal-Italic.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealBoldItalic;
                                src: url(/fonts/NeueMontreal-BoldItalic.otf);
                            }

                            @font-face {
                                font-family: NeueMontrealBold;
                                src: url(/fonts/NeueMontreal-Bold.otf);
                            }                 

                            h1, h2, h3, h4, h5, h6, p, div, span {
                                font-family: NeueMontrealRegular;
                            }

                            .font-light	{
                                font-family: NeueMontrealLight;
                            }
                            .font-normal {
                                font-family: NeueMontrealRegular;
                            }
                            .font-medium {
                                font-family: NeueMontrealMedium;
                            }
                            .font-bold {
                                font-family: NeueMontrealBold;
                            }

                            nav a.active {
                                font-family: NeueMontrealBold;
                                background-color: rgba(255,255,255,0.20);
                            }

                            .mobile {
                                background-color: unset !important;
                            }

                            #Ellisse_2, .jvPvEu {
                                display: none !important;
                            }

                            @media screen and (max-width:1500px) {
                                nav a {
                                    font-size: 12px !important;
                                }
                            }
                        `
                    }
                </style>
                <script src="/assets/ey/tailwind.js"></script>
            </Head>
        
            <Wrapper>
                <div className="md:w-screen items-center border-0 flex items-center">
                    <div className="px-3 md:px-28 mx-auto w-full">
                    <Columns vCentered template='1fr 1fr' gap='50px'>
                        <Column mobile='margin-bottom: 20px; margin-top: 50px;'>
                            <div className="flex items-baseline mb-10 md:mb-14">
                                <img src="/assets/ey/images/netstrategy-logo-black.svg" className="max-w-72 md:pt-8 h-[20px] md:h-[80px] m-auto md:m-0" alt="NetStrategy" />
                            </div>

                            <LightTitle className="font-black text-center md:text-left" marginBottom='20px' marginTop='50px' fontSize='30px' mobile='margin-top: 0px;'>Nuova normativa sull'accessibilità</LightTitle>

                            <HeadingDefault red className="text-center md:text-left text-[40px] md:text-[100px] leading-[1]" mobile="font-size: 54px !important;">Il tuo sito web è pronto per il 28 giugno 2025?</HeadingDefault>
                            <Paragraph mobile='line-height: 24px;' className="text-center md:text-left text-black text-[20px] tracking-wider my-8 max-w-[650px]">Scopri ora cosa cambia con la nuova normativa europea sull’accessibilità web e come devi adeguare il tuo sito per evitare sanzioni e ripercussioni.</Paragraph>

                            <div className="flex justify-center md:block">
                                <a href="#iscriviti" className="mt-2 rounded-full py-3 md:py-7 px-8 md:px-28 inline-block transition-all bg-[#fc1333] mb-2 md:mb-12 btn-link text-white text-[14px] md:text-[1.2rem] text-center mr-auto ml-auto" style={{fontFamily: 'NeueMontreal-Medium'}}>SCARICA LA GUIDA GRATUITA</a>
                            </div>
                        </Column>
                        <Column mobile='margin-bottom: 50px;'>
                            <div className="flex items-baseline mb-14">
                                <img src="/assets/landing/accessibilita/hero-img-accessibilita.png" className="" alt="Accessibilità siti web" />
                            </div>
                        </Column>
                    </Columns>
                    </div>
                </div>

                {/* Why us */}
                <Container marginTop='100px' marginBottom='100px' mobile='margin-bottom: 50px; margin-top: 50px;' id="perche-noi">
                    <LightTitle marginBottom='20px' textAlign='center' fontSize='18px'>Highlights</LightTitle>
                    <HeadingDefault red textAlign='center' fontSize='90px' style={{fontStyle: 'normal'}}>Cosa troverai all’interno <br></br> della guida</HeadingDefault>
                </Container>
                {/* Stats */}
                <WrapperForMidScreens>
                    <Container marginBottom='40px' maxWidth='1600px' mobile='display: block; max-width: 350px; margin: auto;' padding='0px'>
                        <Columns template='1fr 1fr 1fr 1fr' gap='90px'>
                            <Column mobile='margin-bottom: 50px;'>
                                <HideMb>
                                    <Image width={50} height={53} src="/assets/landing/accessibilita/icona-accessibilita.svg" alt="Icon" />
                                    <HeadingSub as='h3' marginTop='30px' fontWeight='700'>Che cos’è l’accessibilità web</HeadingSub>
                                </HideMb>
                                <ShowMb>
                                    <Columns keepMb template='0.3fr 1fr' vCentered gap='0px'>
                                        <Column>
                                            <Image width={50} height={53} src="/assets/landing/accessibilita/icona-accessibilita.svg" alt="Icon" />
                                        </Column>
                                        <Column>
                                            <HeadingSub as='h3' fontSize='24px' fontWeight='700'>Che cos’è l’accessibilità web</HeadingSub>
                                        </Column>
                                    </Columns>
                                </ShowMb>
                                <Paragraph mobile='line-height: 24px;' marginTop='20px' fontSize='18px'>
                                    Cosa si intende con il termine accessibilità digitale e alcune statistiche di riferimento
                                </Paragraph>
                            </Column>
                            <Column mobile='margin-bottom: 50px;'>
                                <HideMb>
                                    <Image width={50} height={53} src="/assets/landing/accessibilita/icona-normativa.svg" alt="Icon" />
                                    <HeadingSub as='h3' marginTop='30px' fontWeight='700'>Il quadro normativo sull’accessibilità web</HeadingSub>
                                </HideMb>
                                <ShowMb>
                                    <Columns keepMb template='0.3fr 1fr' vCentered gap='0px'>
                                        <Column>
                                            <Image width={50} height={53} src="/assets/landing/accessibilita/icona-normativa.svg" alt="Icon" />
                                        </Column>
                                        <Column>
                                            <HeadingSub as='h3' fontSize='24px' fontWeight='700'>Il quadro normativo sull’accessibilità web</HeadingSub>
                                        </Column>
                                    </Columns>
                                </ShowMb>
                                <Paragraph mobile='line-height: 24px;' marginTop='20px' fontSize='18px'>
                                    Le normative più importanti a livello italiano, europeo e le linee guida da seguire
                                </Paragraph>
                            </Column>
                            <Column mobile='margin-bottom: 50px;'>
                                <HideMb>
                                    <Image width={50} height={53} src="/assets/landing/accessibilita/icona-data.svg" alt="Icon" />
                                    <HeadingSub as='h3' marginTop='30px' fontWeight='700'>Cosa cambia per le aziende dal 28 giugno</HeadingSub>
                                </HideMb>
                                <ShowMb>
                                    <Columns keepMb template='0.3fr 1fr' vCentered gap='0px'>
                                        <Column>
                                            <Image width={50} height={53} src="/assets/landing/accessibilita/icona-data.svg" alt="Icon" />
                                        </Column>
                                        <Column>
                                            <HeadingSub as='h3' fontSize='24px' fontWeight='700'>Cosa cambia per le aziende dal 28 giugno</HeadingSub>
                                        </Column>
                                    </Columns>
                                </ShowMb>
                                <Paragraph mobile='line-height: 24px;' marginTop='20px' fontSize='18px'>
                                    Che cosa deve fare la tua azienda per adeguarsi, principali rischi e opportunità 
                                </Paragraph>
                            </Column>
                            <Column mobile='margin-bottom: 50px;'>
                                <HideMb>
                                    <Image width={50} height={53} src="/assets/landing/accessibilita/icona-requisiti.svg" alt="Icon" />
                                    <HeadingSub as='h3' marginTop='30px' fontWeight='700'>Requisiti per un sito a norma nel 2025</HeadingSub>
                                </HideMb>
                                <ShowMb>
                                    <Columns keepMb template='0.3fr 1fr' vCentered gap='0px'>
                                        <Column>
                                            <Image width={50} height={53} src="/assets/landing/accessibilita/icona-requisiti.svg" alt="Icon" />
                                        </Column>
                                        <Column>
                                            <HeadingSub as='h3' fontSize='24px' fontWeight='700'>Requisiti per un sito a norma nel 2025</HeadingSub>
                                        </Column>
                                    </Columns>
                                </ShowMb>
                                <Paragraph mobile='line-height: 24px;' marginTop='20px' fontSize='18px'>
                                    Check list dei requisiti che un sito web deve presentare per essere conforme alla normativa
                                </Paragraph>
                            </Column>
                        </Columns>
                        <div className="flex justify-center md:mt-10">
                            <a href="#iscriviti" className="md:mt-10 rounded-full py-3 md:py-7 px-8 md:px-28 inline-block transition-all bg-[#fc1333] mb-12 btn-link text-white text-[14px] md:text-[1.2rem] text-center" style={{fontFamily: 'NeueMontreal-Medium'}}>SCARICA LA GUIDA GRATUITA</a>
                        </div>
                    </Container>
                </WrapperForMidScreens>

                <LineDivider marginTop='50px' mobile="margin-top: 40px; margin-bottom: 0px;" condensed />

                <div id="iscriviti" className="pt-24 md:py-28 max-w-[1600px] m-auto" style={{borderBottomRightRadius: '0px'}}>
                    <HeadingDefault red textAlign='center' className="lg:ml-10" fontSize='90px'>Richiedi la guida <br className="none md:block"></br> “Accessibilità dei Siti Web”</HeadingDefault>
                    <Paragraph mobile='line-height: 24px;' textAlign='center' fontSize='18px' className="lg:ml-10 mt-4">Inserisci i tuoi dati per ricevere gratuitamente la guida con tutte le informazioni e le best practice per adeguarti alla nuova normativa sull’accessibilità web.</Paragraph>
                    {
                        (params !== '' && params.get('sub') == 'true') ?
                            <div className="flex items-center bg-[#25C74B52] text-[#25C74B] rounded-md px-5 py-4 lg:mx-10 mt-5 border-2 border-[#25C74B]">
                                <img src="/assets/ey/images/check.png" className="mr-4 h-[20px]" alt="Check" />
                                <p className="font-bold">Iscrizione avvenuta con successo!</p>
                            </div>
                        : ''
                    }
                        
                    <ContactForm
                        formType="landing"
                        landingAccessibilitaThankYou={true}
                        formTag="accessibilità siti web"
                        campaign_name="accessibilità"
                        submit_btn_name='SCARICA'
                        width="100%"
                        headingCopy={{
                            title: ``,
                            subtitle: ``,
                        }}
                        hasRole={true}
                        notH2
                    />
                </div>

                <LineDivider marginTop='0px' mobile="margin-top: 40px; margin-bottom: 20px;" condensed />

                <div id="location" className="pt-10 pb-28 md:py-28" style={{borderBottomRightRadius: '0px'}}>
                    <div className="px-4 md:px-28 md:flex md:items-center">
                        <div className="md:w-3/6">
                            <img src="/assets/ey/images/netstrategy-logo-black.svg" className="w-full max-w-[500px] py-5 pr-20" alt="NetStrategy" />
                        </div>
                        <div className="md:w-3/6">
                            <Paragraph fontSize='18px' mobile='margin-top: 40px; line-height: 24px;'><strong>NetStrategy</strong> è un’agenzia di marketing che progetta strategie di comunicazione multicanale per aiutare le aziende a crescere in modo sostenibile e responsabile. Sappiamo che i cambiamenti normativi, soprattutto nel mondo digitale, possono essere complessi. Ma fanno parte del percorso di crescita di ogni azienda. Se desideri ricevere maggiori informazioni, un <strong>contatto diretto</strong> o una <strong>consulenza</strong> sul tema dell’accessibilità dei siti web contattaci direttamente.</Paragraph>
                            <p className="md:text-right"><Link data-page onClick={(typeof window !== 'undefined' && window.lintrk) && window.lintrk('track', { conversion_id: 19055540 })} href="/contatti?utm_source=linkedin&utm_medium=paid&utm_campaign=whitepaper-accessibilita" className="w-full text-center mt-10 rounded-full py-3 py-6 md:py-7 px-8 inline-block transition-all bg-[#fc1333] no-underline btn-link text-white uppercase text-[14px] md:text-[1.2rem]" style={{fontFamily: 'NeueMontreal-Medium'}}>Contattaci</Link></p>
                        </div>
                    </div>
                </div>

                <Footer staticData={staticData} forLanding={true}/>
            </Wrapper>
        </>
    )
}

export default landingAccessibilita

const Wrapper = styled.div`
    @media screen and (max-width:767px) {
        padding: 0px 20px;
    }
`

const WrapperForMidScreens = styled.div`
    padding: 0px 120px;

    @media screen and (max-width:1600px) {
        padding: 0px 40px;
    }

    @media screen and (max-width:767px) {
        padding: 0px;
    }
`