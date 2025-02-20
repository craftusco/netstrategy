import ImageSlider from "@/components/ImageSlider";
import ContactForm from "@/components/ContactForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";
import Head from "next/head";

function Ey() {
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
            let links = gsap.utils.toArray(".menu-link");
        
            links.forEach(a => {
                let element = document.querySelector(a.getAttribute("href")),
                    linkST = ScrollTrigger.create({
                            trigger: element,
                            start: "top top"
                        });
                ScrollTrigger.create({
                    trigger: element,
                    start: "top center",
                    end: "bottom center",
                    onToggle: self => self.isActive && setActive(a)
            });
                a.addEventListener("click", e => {
                    e.preventDefault();
                    gsap.to(window, {duration: 1, scrollTo: linkST.start, overwrite: "auto"});
                });
            });

            document.querySelectorAll('.btn-link').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
            
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        }

        window.addEventListener('scroll', function(){ 
            if(window.scrollY > 150){
                document.getElementById('header-sticky').classList.remove('opacity-0')
                document.getElementById('header-sticky').classList.remove('-z-40')
                document.getElementById('header-sticky').classList.add('z-40')
            }
            else {
                document.getElementById('header-sticky').classList.add('opacity-0')
                document.getElementById('header-sticky').classList.add('-z-40')
                document.getElementById('header-sticky').classList.remove('z-40')
            }
        });
        
        function setActive(link) {
            let links = gsap.utils.toArray(".menu-link");
            links.forEach(el => el.classList.remove("active"));
            link.classList.add("active");
        }
    }, [])

    return (
        <>
            <Head>
                <title>Ernst & Young / NetStrategy - La Digital Strategy: dal piano all'azione</title>
                <meta name="description" content="I clienti sono sempre più preparati, la concorrenza aumenta e il mercato cambia sempre più velocemente. In tale contesto aumentare le vendite diventa più complesso." />
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

                            #__next {
                                background-color: #191B1C !important;
                            }

                            .mobile {
                                background-color: unset !important;
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

            <header className="hidden xl:block absolute justify-between top-16 left-0 right-0 m-auto px-28 mx-auto z-40">
                <nav className="backdrop-blur-md bg-white/20 block rounded-full">
                    <ul className="list-none flex justify-between">
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#evento">L'EVENTO</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#programma">PROGRAMMA</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#location">LOCATION</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#chi-siamo">CHI SIAMO</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#iscriviti">CONTATTI</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <header className="justify-between fixed top-16 left-0 right-0 m-auto px-28 mx-auto transition-all opacity-0 hidden lg:flex -z-40" id="header-sticky">
                <img src="/assets/ey/images/bollini-header.png" className="max-h-[50px]" alt="EY/NS" />
                <nav className="backdrop-blur-md bg-white/20 block rounded-full ml-5 w-full">
                    <ul className="list-none flex justify-between">
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#evento">L'EVENTO</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#programma">PROGRAMMA</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#location">LOCATION</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#chi-siamo">CHI SIAMO</a>
                        </li>
                        <li>
                            <a className="inline-block px-16 py-3 text-white transition-all hover:bg-white/20 rounded-full text-lg menu-link" href="#iscriviti">CONTATTI</a>
                        </li>
                    </ul>
                </nav>
            </header>
        
            <div className="w-screen h-screen bg-[url(/assets/ey/images/hero.png)] bg-cover bg-no-repeat items-center bg-bottom border-0 hidden md:flex">
                <div className="px-10 md:px-28 mx-auto w-full">
                    <div className="flex items-baseline mb-14 mt-40 md:mt-28">
                        <img src="/assets/ey/images/ey-logo.svg" className="max-w-20 h-[30px] md:h-[80px]" alt="EY" />
                        <div className="w-[1px] block -mt-5 bg-white h-[20px] md:h-[40px] ml-4 mr-7"></div>
                        <img src="/assets/ey/images/netstrategy-logo.svg" className="max-w-72 md:pt-8 h-[20px] md:h-[80px]" alt="NetStrategy" />
                    </div>

                    <h1 className="text-white font-bold text-[40px] md:text-[60px] leading-tight">LA DIGITAL STRATEGY: <br></br> DAL PIANO ALL’AZIONE</h1>
                    <p className="text-white text-xl mt-3 tracking-wider">Strategie per potenziare le vendite e ottimizzare i processi aziendali.</p>

                    <h3 className="text-white mt-14 font-bold text-[35px]">GIOVEDÌ 17 OTTOBRE 2024</h3>
                    <h4 className="text-white text-[30px] font-light tracking-wider">Borgo Rocca Sveva - Soave (VR)</h4>

                    <a href="#iscriviti" className="bg-white mt-10 rounded-full py-7 px-16 md:px-28 inline-block font-bold transition-all hover:bg-[#fc1333] btn-link">ISCRIVITI ORA</a>
                </div>
            </div>
            
            <div className="fixed px-4 w-full py-4 flex items-baseline md:hidden bg-black/10 backdrop-blur-md z-40">
                <img src="/assets/ey/images/ey-logo.svg" className="max-w-20 h-[50px] md:h-[80px]" alt="EY" />
                <div className="w-[1px] block -mt-5 bg-white h-[25px] md:h-[40px] ml-2 mr-4"></div>
                <img src="/assets/ey/images/netstrategy-logo.svg" className="max-w-72 md:pt-8 h-[30px] md:h-[80px]" alt="NetStrategy" />
            </div>

            <div className="h-screen bg-[url(/assets/ey/images/hero-mobile.png)] bg-no-repeat flex items-end border-0 md:hidden" style={{backgroundPosition: '64% 81%'}}>
                <div className="px-4 md:px-28 mx-auto w-full">
                    <h1 className="text-white font-bold text-[27px] md:text-[40px] md:text-[60px] leading-tight">LA DIGITAL STRATEGY: <br className="hidden md:inline-block"></br> DAL PIANO ALL’AZIONE</h1>
                    <p className="text-white/70 text-xl mt-3 tracking-wider">Strategie per potenziare le vendite e ottimizzare i processi aziendali.</p>

                    <h3 className="text-white mt-6 md:mt-14 font-bold text-[20px] md:text-[35px]">GIOVEDÌ 17 OTTOBRE 2024</h3>
                    <h4 className="text-white text-[20px] md:text-[30px] font-light tracking-wider">Borgo Rocca Sveva - Soave (VR)</h4>

                    <a href="#iscriviti" className="bg-white mt-10 rounded-full py-3 px-10 md:py-7 md:px-16 md:px-28 inline-block font-bold transition-all hover:bg-[#fc1333] mb-12 btn-link">ISCRIVITI ORA</a>
                </div>
            </div>

            <div id="evento" className="relative mx-auto py-10 md:py-28 md:flex md:gap-20 items-center">
                <div className="pt-12 md:w-2/4 pl-4 md:pl-28 md:pr-0 md:hidden">
                    <img src="/assets/ey/images/evento.png" alt="L'evento" className="w-full" />
                </div>
                <div className="md:w-2/4 pl-4 pr-10 md:pl-28 md:pr-0">
                    <h2 className="text-white mt-4 mb-8 font-bold text-[40px] mt-12 md:mt-40 md:m-0">L'EVENTO</h2>
                    <p className="text-white/70 text-xl mt-4 font-light tracking-wider">I clienti sono sempre più preparati, la concorrenza aumenta e il mercato cambia sempre più velocemente. In tale contesto aumentare le vendite diventa ancora più complesso. Questo vale sicuramente nel B2C ma oggi vale più che mai anche nel B2B. Nel nostro evento parleremo di come la Lead Generation debba essere quanto mai integrata e coerente con la strategia aziendale e con l’organizzazione interna dei processi.</p>
                    <p className="text-white/70 text-xl mt-8 font-light tracking-wider">La visione detta le linee guida sia per la strategia commerciale con relativo aumento dei volumi di vendita, sia per la gestione dei processi interni aziendali che hanno il compito di sostenere velocemente la crescita tramite organizzazione e strumenti adeguati.</p>
                    <p className="text-white text-xl mt-8 font-bold tracking-wider">Vedremo quindi come l’integrazione della strategia aziendale con le azioni commerciali e l’organizzazione debba risultare efficace attraverso soluzioni e casi studio.</p>
                    <a href="#iscriviti" className="bg-white mt-10 rounded-full py-3 px-10 md:py-7 md:px-16 md:px-28 inline-block font-bold transition-all hover:bg-[#fc1333] mb-12 btn-link">ISCRIVITI ORA</a>
                </div>
                <div className="py-24 md:w-2/4 pl-4 pr-10 md:pl-28 md:pr-0 hidden md:block">
                    <img src="/assets/ey/images/evento.png" alt="L'evento" className="w-full" />
                </div>
            </div>

            <div className="pr-4 mx-auto pt-10 md:hidden">
                <img src="/assets/ey/images/programma-mobile.png" alt="Programma" className="w-full" />
            </div>

            <div className="pl-28 mx-auto hidden md:block">
                <img src="/assets/ey/images/programma.png" alt="Programma" className="w-full" />
            </div>

            <div id="programma" className="mx-auto py-10 md:py-28 px-4 md:px-28 pt-28">
                <h2 className="text-white mt-4 mb-12 font-bold text-[40px]">PROGRAMMA</h2>

                <div className="md:flex md:gap-12 md:items-center">
                    <div className="hidden md:block">
                        <img src="/assets/ey/images/cesare-tagliapietra.png" alt="Cesare Tagliapietra" className="w-full max-w-[85px]" />
                        <img src="/assets/ey/images/stefano-robbi.png" alt="Stefano Robbi" className="w-full my-12 max-w-[85px]" />
                        <img src="/assets/ey/images/nicola-manara.png" alt="Nicola Manara" className="w-full max-w-[85px]" />
                    </div>
                    <div className="w-full">
                        <div className="py-4" style={{border: '1px solid rgba(255,255,255,0.3)', borderLeft: '0px', borderRight: '0px'}}>
                            <h3 className="text-white font-light text-[40px] flex md:items-center"><span className="text-white/70">16:00</span> <span className="font-bold text-[25px] md:text-[30px] mt-2.5 md:mt-0 ml-8 md:ml-6">Accoglienza</span></h3>
                        </div>
                        <div className="py-4 relative" style={{border: '1px solid rgba(255,255,255,0.3)', borderLeft: '0px', borderRight: '0px'}}>
                            <h3 className="text-white font-light text-[40px] flex md:items-center"><span className="text-white/70">16:30</span> <span className="font-bold text-[25px] md:text-[30px] mt-2.5 md:mt-0 ml-8 md:ml-6">Introduzione</span></h3>
                            <img src="/assets/ey/images/icon-ey.png" className="absolute bottom-4 max-h-[50px] md:hidden" alt="EY" />
                            <p className="font-light text-lg text-white/70 ml-28 md:ml-24 md:pl-3">A cura di Cesare Tagliapietra, Partner di Ernst & Young</p>
                        </div>
                        <div className="py-4 relative" style={{border: '1px solid rgba(255,255,255,0.3)', borderLeft: '0px', borderRight: '0px'}}>
                            <h3 className="text-white font-light text-[40px] flex md:items-center"><span className="text-white/70">16:45</span> <span className="font-bold text-[25px] md:text-[30px] mt-2.5 md:mt-0 ml-8 md:ml-6">Come generare nuove opportunità di business nel 2025 con la giusta strategia digitale</span></h3>
                            <img src="/assets/ey/images/icon-ns.png" className="absolute bottom-4 max-h-[50px] md:hidden" alt="EY" />
                            <p className="font-light text-lg text-white/70 ml-28 md:ml-24 md:pl-3">A cura di Stefano Robbi, CEO di NetStrategy</p>
                        </div>
                        <div className="py-4 relative" style={{border: '1px solid rgba(255,255,255,0.3)', borderLeft: '0px', borderRight: '0px'}}>
                            <h3 className="text-white font-light text-[40px] flex md:items-center"><span className="text-white/70">17:30</span> <span className="font-bold text-[25px] md:text-[30px] mt-2.5 md:mt-0 ml-8 md:ml-6">Metodologia EY a supporto della crescita aziendale: <br></br> approccio, soluzioni e strumenti</span></h3>
                            <img src="/assets/ey/images/icon-ey.png" className="absolute bottom-4 max-h-[50px] md:hidden" alt="EY" />
                            <p className="font-light text-lg text-white/70 ml-28 md:ml-24 md:pl-3">A cura di Nicola Manara, Senior Manager di Ernst & Young</p>
                        </div>
                        <div className="py-4" style={{border: '1px solid rgba(255,255,255,0.3)', borderLeft: '0px', borderRight: '0px'}}>
                            <h3 className="text-white font-light text-[40px] flex md:items-center"><span className="text-white/70">18:00</span> <span className="font-bold text-[25px] md:text-[30px] mt-2.5 md:mt-0 ml-8 md:ml-6">Q&A e aperitivo di networking</span></h3>
                        </div>
                    </div>
                </div>
                <p className="md:text-right"><a href="#iscriviti" className="bg-white mt-10 rounded-full py-3 px-10 md:py-7 md:px-16 md:px-28 inline-block font-bold transition-all hover:bg-[#fc1333] mb-12 no-underline btn-link">ISCRIVITI ORA</a></p>
            </div>

            <div id="location" className="py-10 md:py-28 rounded-[100px] bg-[#303436] rounded-l-none" style={{borderBottomRightRadius: '0px'}}>
                <div className="px-4 md:px-28 md:flex">
                    <div className="md:w-3/6">
                        <h2 className="text-white font-bold text-[40px]">LOCATION</h2>
                        <h4 className="text-white text-[30px] font-light tracking-wider leading-none md:mb-0 mb-4">Borgo Rocca Sveva <br></br> Soave (VR)</h4>
                    </div>
                    <div className="md:w-3/6">
                        <p className="text-white/70 text-xl font-light tracking-wider">Immerso in vigneti pittoreschi, Rocca Sveva ispira con il suo ambiente storico, offrendo un'atmosfera tranquilla, perfetta per la riflessione e lo scambio di idee innovative tra i leader del settore digitale.</p>
                        <p className="md:text-right"><a href="#iscriviti" className="bg-white mt-10 rounded-full py-3 px-10 md:py-7 md:px-16 md:px-28 inline-block font-bold transition-all hover:bg-[#fc1333] mb-12 no-underline btn-link">ISCRIVITI ORA</a></p>
                    </div>
                </div>
                <ImageSlider
                    data={imgCarousel}
                    mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
                    big
                    isLarge={false}
                    classes='pt-16'
                />
            </div>

            <div id="chi-siamo" className="py-10 md:py-28" style={{borderBottomRightRadius: '0px'}}>
                <div className="px-4 md:px-28 md:flex mb-20">
                    <div className="md:w-3/6">
                        <h2 className="text-white font-bold text-[40px]">CHI SIAMO</h2>
                    </div>
                    <div className="md:w-3/6">
                        <p className="text-white/70 text-xl font-light tracking-wider">EY, con la sua vasta esperienza in consulenza e servizi professionali, insieme a NetStrategy, esperti in digital marketing, discuteranno di innovazione, sostenibilità e dell'importanza della trasformazione digitale nel mondo aziendale contemporaneo.</p>
                    </div>
                </div>
                <div className="md:flex md:items-center md:gap-4 px-4 md:px-28">
                    <div className="md:w-2/4 bg-[#303436] rounded-[20px] md:rounded-[50px] mb-20 md:mb-0">
                        <img src="/assets/ey/images/ey.png" alt="EY" className="w-full" />
                        <div className="py-6 px-6 md:px-10 relative">
                            <img src="/assets/ey/images/icon-ey.png" alt="EY" className="absolute right-10 h-[50px] md:h-[100px] top-[-25px] md:top-[-50px]" />
                            <h3 className="text-white font-bold text-[30px] flex items-center mb-4">Ernst & Young</h3>
                            <p className="text-white/70 text-lg font-light tracking-wider mb-10">Ernst & Young, meglio conosciuta come EY, è una multinazionale leader nei servizi professionali, che offre audit, consulenza, fiscalità e transazioni strategiche. Con l'obiettivo di costruire un mondo del lavoro migliore, EY si impegna nella promozione della trasparenza nei mercati finanziari e nella creazione di valore a lungo termine per i propri clienti, lavorando per una società più sostenibile e inclusiva.</p>
                            <div className="flex justify-between">
                                <a className="text-white font-medium text-[20px] md:text-[22px] flex items-center mb-7 underline" href="https://www.ey.com/it_it" target="_blank">ey.com</a>
                                <div className="flex md:mb-0 mb-6">
                                    <a href="https://www.instagram.com/ey_italy/" target="_blank"><img src="/assets/ey/images/instagram-brands-solid.svg" className="h-[33px]" /></a>
                                    <a href="https://www.facebook.com/EYCareersItaly/" target="_blank"><img src="/assets/ey/images/facebook-brands-solid.svg" className="h-[33px] mx-4" /></a>
                                    <a href="https://www.linkedin.com/company/1073/admin/" target="_blank"><img src="/assets/ey/images/linkedin-brands-solid.svg" className="h-[33px]" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-2/4 bg-[#303436] rounded-[20px] md:rounded-[50px]">
                        <img src="/assets/ey/images/netstrategy.png" alt="EY" className="w-full" />
                        <div className="py-6 px-6 md:px-10 relative">
                            <img src="/assets/ey/images/icon-ns.png" alt="EY" className="absolute right-10 h-[50px] md:h-[100px] top-[-25px] md:top-[-50px]" />
                            <h3 className="text-white font-bold text-[30px] flex items-center mb-4">NetStrategy</h3>
                            <p className="text-white/70 text-lg font-light tracking-wider mb-10">NetStrategy è un'azienda italiana che offre servizi digitali con un focus sulla trasformazione digitale e l'ottimizzazione delle strategie online per le imprese. Specializzata nel migliorare la visibilità online attraverso SEO, marketing sui social media e altre tattiche digitali, NetStrategy mira a generare crescita tangibile per i suoi clienti.</p>
                            <div className="flex justify-between">
                                <a className="text-white font-medium text-[20px] md:text-[22px] flex items-center mb-7 underline" href="https://www.netstrategy.it/" target="_blank">netstrategy.it</a>
                                <div className="flex md:mb-0 mb-6">
                                    <a href="https://www.instagram.com/netstrategy.agency/" target="_blank"><img src="/assets/ey/images/instagram-brands-solid.svg" className="h-[33px]" /></a>
                                    <a href="https://it-it.facebook.com/NetStrategy.it/" target="_blank"><img src="/assets/ey/images/facebook-brands-solid.svg" className="h-[33px] mx-4" /></a>
                                    <a href="https://www.linkedin.com/company/netstrategy" target="_blank"><img src="/assets/ey/images/linkedin-brands-solid.svg" className="h-[33px]" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="iscriviti" className="py-28 px-4 md:px-28 rounded-[100px] bg-[#303436] rounded-l-none" style={{borderBottomRightRadius: '0px'}}>
                <h2 className="text-white font-bold text-[40px] lg:ml-10">RISERVA IL TUO POSTO <br className="hidden md:block"></br> PER PARTECIPARE ALL'EVENTO</h2>
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
                    eventThankYou={true}
                    formTag="evento 17.10"
                    campaign_name="ey"
                    isWhite={true}
                    submit_btn_name='ISCRIVITI'
                    width="100%"
                    headingCopy={{
                        title: ``,
                        subtitle: ``,
                    }}
                    notH2
                />
            </div>

            <footer className="bg-[#303436] w-full">
                <div className="lg:flex md:justify-between border-2 border-white border-x-0 mx-10 md:mx-28 py-14">
                    <h2 className="text-white font-bold text-[30px] md:mr-40 mb-8 md:mb-0">LE NOSTRE SEDI</h2>
                    <div className="lg:flex">
                        <img src="/assets/ey/images/ey-logo.svg" className="max-h-[50px] lg:mt-0 mt-8" alt="EY" />
                        <p className="text-white text-base font-light tracking-wider mx-0 lg:mx-10 mt-6 lg:mt-4"><span className="text-lg font-medium">VERONA</span> <br></br> Via Isonzo 11 <br></br> 37126 Verona <br></br> +39 045 831 2511</p>
                        <p className="text-white text-base font-light tracking-wider mt-4"><span className="text-lg font-medium">MILANO</span> <br></br> Via Meravigli 12/14 <br></br> 20123 Milano <br></br> +39 02 806681</p>
                    </div>
                    <div className="lg:flex mt-14 md:mt-0">
                        <img src="/assets/ey/images/netstrategy-logo.svg" className="max-h-[30px] mt-8 lg:mt-0 mt-8" alt="NetStrategy" />
                        <p className="text-white text-base font-light tracking-wider mx-0 lg:mx-10 mt-6 lg:mt-4"><span className="text-lg font-medium">VERONA</span> <br></br> Via Carlo Cipolla snc <br></br> 37045 Legnago (VR) <br></br> +39 0442 321 391</p>
                        <p className="text-white text-base font-light tracking-wider mt-4"><span className="text-lg font-medium">MILANO</span> <br></br> Via San Raffaele 1 <br></br> 20121 Milano <br></br> +39 02 800 12162</p>
                    </div>
                </div>
                <p className="text-center text-white/70 text-base py-12">
                    <span><a href="/privacy-policy-e-cookies" target="_blank">Privacy & Cookie Policy</a></span>
                    &nbsp;
                    <span className="hidden md:inline-block">-</span>
                    <br className="md:hidden"></br>
                    <br className="md:hidden"></br>
                    &nbsp;
                    <span
                        style={{ cursor: "pointer" }}
                        className="iubenda-cs-preferences-link"
                    >
                        Aggiorna preferenze su cookie
                    </span>
                </p>
                
            </footer>
        </>
    )
}

export default Ey