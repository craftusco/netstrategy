import Head from "next/head";

function Ey() {
    return (
        <>
            <Head>
                <title>Ernst & Young / NetStrategy - La Digital Strategy: dal piano all'azione</title>
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
                        `
                    }
                </style>
                <script src="/assets/ey/tailwind.js"></script>
            </Head>

            <div className="h-screen bg-[#303436]">
                <div id="iscriviti" className="py-28 px-4 md:px-28 rounded-[100px] bg-[#303436] rounded-l-none" style={{borderBottomRightRadius: '0px'}}>
                    <div className="flex justify-center bg-[#25C74B52] text-[#25C74B] rounded-md px-5 py-4 lg:mx-10 mt-5 border-2 border-[#25C74B]">
                        <img src="/assets/ey/images/check.png" className="mr-4 h-[20px]" alt="Check" />
                        <p className="font-bold">Iscrizione avvenuta con successo!</p>
                    </div>
                </div>

                <footer className="bg-[#303436] lg:w-full lg:absolute lg:bottom-0">
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
                        <span>Privacy & Cookie Policy</span>
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
            </div>
        </>
    )
}

export default Ey