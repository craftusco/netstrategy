import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import splitText from "@/utils/splitText";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryButton from "./utils/PrimaryButton";
import { dataContext } from "@/pages/contatti";
import dataRequest from "@/utils/dataRequest";
import axios from "axios";
import { redScreenLoader } from "../../redux/animationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../redux/formSlice";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { ScrollToPlugin } from "gsap/all";
import gsap from "gsap";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollToPlugin);

export default function ContactForm({
  mt,
  isWhite = false,
  formLayout = "align-right", //formLayout PUO' ESSERE di 2 tipi: "align-right" o "centered"
  formType = "standard", //formType PUO' ESSERE di 3 tipi: "standard", "file", "evento"<oppure stringa a caso> , "landing"
  headingCopy = {
    title: `It's time
      to connect.`,
    subtitle: `Facciamo crescere 
      il tuo progetto insieme`,
    paragraph: `Compila il form per essere contattato dal nostro team. 
      Insieme cercheremo di capire se siamo l'agenzia giusta per aiutare la tua azienda.`,
  },
  from = "everywhere",
  inSearchResults = false,
  date = "",
  eventName = null,
  notH2 = false,
  campaign_name = null,
  submit_btn_name = "Contattaci",
  submit_btn_classes = '',
  width = '80%',
  formTag = 'lead',
  eventThankYou = false,
  hasRole = false,
  landingAccessibilitaThankYou = false
}) {

  const provinces = [
    'Agrigento (AG)', 'Alessandria (AL)', 'Ancona (AN)', 'Aosta (AO)', 'Arezzo (AR)', 'Ascoli Piceno (AP)',
    'Asti (AT)', 'Avellino (AV)', 'Bari (BA)', 'Barletta-Andria-Trani (BT)', 'Belluno (BL)', 'Benevento (BN)',
    'Bergamo (BG)', 'Biella (BI)', 'Bologna (BO)', 'Bolzano (BZ)', 'Brescia (BS)', 'Brindisi (BR)', 'Cagliari (CA)',
    'Caltanissetta (CL)', 'Campobasso (CB)', 'Caserta (CE)', 'Catania (CT)', 'Catanzaro (CZ)', 'Chieti (CH)',
    'Como (CO)', 'Cosenza (CS)', 'Cremona (CR)', 'Crotone (KR)', 'Cuneo (CN)', 'Enna (EN)', 'Fermo (FM)',
    'Ferrara (FE)', 'Firenze (FI)', 'Foggia (FG)', 'Forlì-Cesena (FC)', 'Frosinone (FR)', 'Genova (GE)', 'Gorizia (GO)',
    'Grosseto (GR)', 'Imperia (IM)', 'Isernia (IS)', 'L\'Aquila (AQ)', 'La Spezia (SP)', 'Latina (LT)', 'Lecce (LE)',
    'Lecco (LC)', 'Livorno (LI)', 'Lodi (LO)', 'Lucca (LU)', 'Macerata (MC)', 'Mantova (MN)', 'Massa-Carrara (MS)',
    'Matera (MT)', 'Messina (ME)', 'Milano (MI)', 'Modena (MO)', 'Monza e Brianza (MB)', 'Napoli (NA)', 'Novara (NO)',
    'Nuoro (NU)', 'Oristano (OR)', 'Padova (PD)', 'Palermo (PA)', 'Parma (PR)', 'Pavia (PV)', 'Perugia (PG)',
    'Pesaro e Urbino (PU)', 'Pescara (PE)', 'Piacenza (PC)', 'Pisa (PI)', 'Pistoia (PT)', 'Pordenone (PN)',
    'Potenza (PZ)', 'Prato (PO)', 'Ragusa (RG)', 'Ravenna (RA)', 'Reggio Calabria (RC)', 'Reggio Emilia (RE)',
    'Rieti (RI)', 'Rimini (RN)', 'Roma (RM)', 'Rovigo (RO)', 'Salerno (SA)', 'Sassari (SS)', 'Savona (SV)',
    'Siena (SI)', 'Siracusa (SR)', 'Sondrio (SO)', 'Sud Sardegna (SU)', 'Taranto (TA)', 'Teramo (TE)', 'Terni (TR)',
    'Torino (TO)', 'Trapani (TP)', 'Trento (TN)', 'Treviso (TV)', 'Trieste (TS)', 'Udine (UD)', 'Varese (VA)',
    'Venezia (VE)', 'Verbano-Cusio-Ossola (VB)', 'Vercelli (VC)', 'Verona (VR)', 'Vibo Valentia (VV)', 'Vicenza (VI)',
    'Viterbo (VT)'
  ]

  const [listProvinces, setListProvinces] = useState(provinces);
  const [listRemoteOptions, setListRemoteOptions] = useState([
    'Si, mi candido per posizioni in loco',
    'No, vorrei collaborare solo da remoto'
  ]);

  const [isRemoteOpen, setIsRemoteOpen] = useState(false);
  

  const path = useSelector((state) => state.routesSlice.value.data);
  const [stringError, setStringError] = useState('');
  const [showConsent, setShowConsent] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Qualcosa è andato storto durante la compilazione del form controlla di aver compilato tutti i campi correttamente o riprova più tardi."
  );
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Grazie! Richiesta inviata con successo"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedRemote, setSelectedRemote] = useState([]);

  const { dataCtx } = useContext(dataContext) || {
    dataCtx: {
      contactData: {
        info_1: undefined,
        info_2: undefined,
      },
    },
  };

  const dispatch = useDispatch();
  const containerRef = useRef();
  const [servicesList, getServicesList] = useState([]);
  const isPast =
    date && moment().diff(moment(date), "days") >= 0 ? true : false;

  useEffect(() => {
    if (dataCtx.contactData && dataCtx.contactData.info_1) {
      setSelectedOptions([dataCtx.contactData.info_1]);
      setValue("subject", dataCtx.contactData.info_1, { shouldValidate: true });
    }
  }, [dataCtx]);

  useEffect(() => {
    // setTimeout(() => {
    //   if (
    //     window &&
    //     window._iub &&
    //     window._iub.cs &&
    //     window._iub.cs.consent &&
    //     window._iub.cs.consent.purposes
    //   ) {
    //     setShowConsent(
    //       !(
    //         window._iub.cs.consent.purposes[4] === true ||
    //         window._iub.cs.consent.purposes[5] === true
    //       )
    //     );
    //   }
    // }, 1000);
  }, []);

  const toggling = (e) => {
    console.log('toggling');
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const togglingRemote = (e) => {
    e.stopPropagation();
    setIsRemoteOpen(!isRemoteOpen);
  };

  const onOptionClicked = (value) => () => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option != value));
    } else if (value.trim().toLowerCase().includes("altro")) {
      setSelectedOptions([value]);
    } else {
      setSelectedOptions(
        selectedOptions.filter(
          (option) => !option.trim().toLowerCase().includes("altro")
        )
      );
      setSelectedOptions((oldArray) => [...oldArray, value]);
    }
    setValue("subject", value, { shouldValidate: true });
    setIsOpen(false);
  };

  const onProvinceClicked = (value) => () => {
    setSelectedProvince([value]);
    setValue("province", value, { shouldValidate: true });
    setIsOpen(false);
  };

  const onRemoteClicked = (value) => () => {
    
    setSelectedRemote([value]);
    setValue("remote_job", value, { shouldValidate: true });
    setIsRemoteOpen(false);

  };

  const urls = [
    {
      name: "contatti",
      url: `https://www.netstrategy.it/api/contatti?populate=deep,3`,
    },
  ];

  const fetchData = async () => {
    const d = await dataRequest(urls);
    setResponse(d.contatti.attributes.categorie_form);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const r = response.map((el) => {
      return el.nome;
    });
    getServicesList(r);

  }, [response]);

  //! VALIDATION
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {

    if (clicked == true) return;

    setStringError('')

    // gestione form con atomiko
    setClicked(true);
    // let url = "https://www.atomiko.it/api/netstrategy/";
    // let url = "http://testetset.atomiko.netstrategy.it/public/api/track-form-submit";
    //let url = "https://api.atomiko.netstrategy.it/public/api/track-form-submit";
    let url = "https://api.atomiko.netstrategy.it/public/api/track-form-submit";
    //let url = "http://localhost:8000/api/track-form-submit";
    let tag = '';
    switch (formType) {
      case "file":
        tag = 'candidatura'
        // url += "work";
        break;
      case "evento":
        tag = formTag
        // url += "event";
        break;
      case "landing":
        tag = formTag
        // url += "contact";
        break;
      default:
        tag = 'lead'
        // url += "contact";
        break;
    }

    if (formType == "file") {
      data.role = dataCtx.contactData.info_2;
    }

    if (formType == "evento") {
      data.date = date;
      // if (eventName) data.event_name = eventName;
    }

    if (data.hasOwnProperty("checkbox_privacy_2") == false) {
      data.checkbox_privacy_2 = true;
    }
    data.path = path.paths;
    data.time = path.time;
    data.tag = tag;


    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {

        setError(false);
        setClicked(false);

        // TODO: DA SCOMMENTARE
        if (formType != "file" && formType != "evento")
          dispatch(updateForm({ data }));

        if (formType == "standard" || formType == "landing" || formType == "checklist_buyer_persona") {
          window.dataLayer.push({ event: "new_contact" });
        }

        if (formType == "landing") {
          if (landingAccessibilitaThankYou == true) {
            dispatch(redScreenLoader({ link: "/accessibilita-web/thank-you", img: null }));
          } else {
            if (eventThankYou !== true) {
              dispatch(redScreenLoader({ link: "/landing-nuove/thank-you", img: null }));
            } else {
              dispatch(redScreenLoader({ link: "/eventi/thank-you", img: null }));
            }
          }
        }
        else if (formType == "checklist_buyer_persona") {
          dispatch(redScreenLoader({ link: "/landing-nuove/thank-you-checklist", img: null }));
        } else if (formType == "evento") {
          dispatch(redScreenLoader({ link: "/nettalk/thank-you", img: null }));
        }
        else if (from == "everywhere")
          dispatch(redScreenLoader({ link: "/thank-you", img: null }));
        else
          dispatch(redScreenLoader({ link: "/thank-you?v=2", img: null }));
        // FINE DA SCOMMENTARE 

      })
      .catch((error) => {

        // DEFINISCO IL MESSAGGIO DI ERRORE DA SALVARE SU STRAPI
        let messageError = '';
        try {

          let errorsString = '';

          try {
            let errs = error.response.data.errors;

            for (const property in errs) {
              errorsString += errs[property] + ' <br> ';
            }

          } catch (ersx) {

          }

          messageError += 'MESSAGE: ' + error.message + ' <br>';
          messageError += 'EXPEPTION: ' + error?.response?.data?.exception + '<br>';
          messageError += 'STATUS: ' + error?.response?.statusText + '<br>';
          messageError += 'RESPONSE MESSAGE: ' + error?.response?.data?.message + '<br>';
          messageError += 'ERROR FIELDS: ' + errorsString + '<br>';


        } catch (error) {

        }

        // SETTO L'ERRORE NEL JSON DA INVIARE
        data.errors = messageError;

        // FACCIO LA CHIAMATA IN POST A STRAPI CHE MANDERà POI UN E-MAIL
        fetch('https://www.netstrategy.it/api/leads', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({ "data": data }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {

        })
          .catch(err => {

          })
        // DA SCOMMENTARE

        // SE CI SONO ERRORI NEL CAMPO DI VALIDAZIONE LI MOSTRO IN PAGINA COSì L'UTENTE PUò SISTEMARE ()
        let string = '';

        try {
          let errs = error.response.data.errors;

          for (const property in errs) {
            string += errs[property] + ' <br> ';
          }

        } catch (er) {

        }

        string += "<br> Attenzione, qualcosa è andato storto tentando di compilare il form. <br> Se il problema persiste contattaci al telefono al numero <a href='tel:390442321391'>+39 0442321391</a>"

        // SETTO L'ERRORE E PERMETTO DI RISUBMITTARE IL FORM
        setStringError(string)
        setClicked(false);
        setError(true);
      });
    //* fine gestione form con atomiko
  };

  const h2Ref = useRef();
  const pRef = useRef();
  const subtitle = useRef();
  const formRef = useRef();

  const handleClick = () => {
    // gsap.to(document.querySelector('#form'), {duration: .2, scrollTo: {y: `#submit-mobile`,  offsetY: 0}, ease:'Power3.easeOut'});
  };

  // function isConsentGiven(siteId, cookiePolicyId) {
  //   var cs = document.cookie.split(';');
  //   for (var i = 0; i < cs.length; i++) {
  //     while (cs[i].charAt(0) == ' ') cs[i] = cs[i].substring(1);
  //     console.log(cs[i].indexOf('_iub_cs-s' + siteId))
  //     if (cs[i].indexOf('_iub_cs-s' + siteId) == 0 || cs[i].indexOf('_iub_cs-' + cookiePolicyId) == 0) return true;
  //   }
  //   return false;
  // }

  const [lastInputClicked, setLastInputClicked] = useState(null);
  const router = useRouter();
  const scrollDown = (e) => {
    if (window.innerWidth > 780) return;
    if (lastInputClicked != e.currentTarget) {
      let scrollTarget;
      if (router.pathname == "/contatti" || isWhite) {
        scrollTarget = document.getElementById("contatti-third-screen");
      } else {
        scrollTarget = document.documentElement;
      }
      gsap.to(scrollTarget, {
        duration: 0.5,
        scrollTo:
          e.currentTarget.getBoundingClientRect().top +
          scrollTarget.scrollTop -
          130,
        ease: "Power3.easeOut",
      });
    }
    setLastInputClicked(e.currentTarget);
  };

  const handleInputChange = (event) => {

    const p = provinces.filter(el => {
      return el.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
    })

    setListProvinces(p);
    
  };

  //Creo lo stato per gestire la validazione del dominio del sito web
  const [isWebsiteInvalid, setIsWebsiteInvalid] = useState(null);

  //Creo lo stato per gestire la validazione della partita iva
  const [isVatNumberInvalid, setIsVatNumberInvalid] = useState(null);

  const debounceTimeout = useRef(null);

  //Funzione per validare il dominio
  const verifyWebsiteAddress = (value) => {
    const validDomainRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

    setClicked(true)

    if (value !== '') {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        validDomainRegex.test(value) ? setIsWebsiteInvalid(false) : setIsWebsiteInvalid(true)
        setClicked(false)
      }, 800);
    } else {
      setIsWebsiteInvalid(null)
    }
  }

  //Funzione per validare la partita iva
  const verifyVatNumber = (value) => {
    const validVatNumberRegex = /^(IT)?\d{11}$/;

    if (value !== '') {
      validVatNumberRegex.test(value) ? setIsVatNumberInvalid(false) : setIsVatNumberInvalid(true)
    } else {
      setIsVatNumberInvalid(null)
    }
  }

  return (
    <Container
      ref={containerRef}
      id="contact"
      white={isWhite}
      onClick={() => setIsOpen(false)}
    >
      <Heading formLayout={formLayout}>
        <Title ref={h2Ref} white={isWhite} formLayout={formLayout}>
          {notH2 ? (
            <span className="title">{splitText(headingCopy.title)}</span>
          ) : (
            <h2>{splitText(headingCopy.title)}</h2>
          )}
        </Title>
        <Text formLayout={formLayout}>
          {headingCopy.subtitle && (
            <span className="subtitle" ref={subtitle}>
              {splitText(headingCopy.subtitle)}
            </span>
          )}
          {headingCopy.paragraph && (
            // <p ref={pRef}>{splitText(headingCopy.paragraph)}</p>
            <ReactMarkdown children={headingCopy.paragraph} />
          )}
        </Text>
      </Heading>
      <Form id="form" formLayout={formLayout} white={isWhite} ref={formRef} style={{width: width}}>
        {formType == "landing" ? (
          //* LAYOUT PER FORM LANDING
          <>
            {/* NOME COGNOME */}
            <div className="form-group">
              <div className="input-group">
                <label>Nome *</label>
                <input
                  onClick={(e) => {
                    scrollDown(e);
                  }}
                  aria-invalid={errors.name ? true : false}
                  type="text"
                  {...register("name", {
                    required: "Nome e cognome sono obbligatori",
                  })}
                />
                {errors.name && (
                  <span className="val-error">{errors.name.message}</span>
                )}
              </div>
              <div className="input-group">
                <label>Cognome *</label>
                <input
                  onClick={(e) => {
                    scrollDown(e);
                  }}
                  aria-invalid={errors.surname ? true : false}
                  type="text"
                  {...register("surname", {
                    required: "Nome e cognome sono obbligatori",
                  })}
                />
                {errors.surname && (
                  <span className="val-error">{errors.surname.message}</span>
                )}
              </div>
            </div>
            {
                (hasRole === true) ?
                    <>
                    <div className="form-group">
                      <div className="input-group">
                        <label>Azienda *</label>
                        <input
                          onClick={(e) => {
                            scrollDown(e);
                          }}
                          aria-invalid={errors.business_name ? true : false}
                          type="text"
                          {...register("business_name", {
                            required: "La ragione sociale è obbligatoria",
                          })}
                        />
                        {errors.business_name && (
                          <span className="val-error">
                            {errors.business_name.message}
                          </span>
                        )}
                      </div>
                      <div className="input-group">
                        <label>Ruolo *</label>
                        <input
                          onClick={(e) => {
                            scrollDown(e);
                          }}
                          aria-invalid={errors.business_role ? true : false}
                          type="text"
                          {...register("business_role", {
                            required: "Il ruolo è obbligatorio",
                          })}
                        />
                        {errors.business_role && (
                          <span className="val-error">
                            {errors.business_role.message}
                          </span>
                        )}
                      </div>
                      
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                          <label>Email *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            aria-invalid={errors.email ? true : false}
                            type="text"
                            {...register("email", {
                              required: "L'email è obbligatoria",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Inserire un'email valida",
                              },
                            })}
                          />
                          {errors.email && (
                            <span className="val-error">{errors.email.message}</span>
                          )}
                        </div>
                        <div className="input-group">
                          <label>Telefono *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            aria-invalid={errors.phone_number ? true : false}
                            type="text"
                            {...register("phone_number", {
                              required: "Il telefono è obbligatorio",
                              minLength: {
                                value: 6,
                                message: "Inserisci almeno 6 caratteri",
                              },
                              maxLength: {
                                value: 15,
                                message: "Non inserire più di 15 caratteri",
                              },
                              pattern: {
                                value: /^[0-9 ()+-]+$/,
                                message: "Inserisci numero di telefono valido",
                              },
                            })}
                          />
                          {errors.phone_number && (
                            <span className="val-error">
                              {errors.phone_number.message}
                            </span>
                          )}
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                          {/*Indirizzo sito web*/}
                            <label>Indirizzo del tuo sito *</label>
                            <input
                              onClick={(e) => {
                                scrollDown(e);
                              }}
                              onKeyUp={(e) => { verifyWebsiteAddress(e.target.value) }}
                              aria-invalid={errors.website ? true : false}
                              type="text"
                              {...register("website", {
                                required: "L'indirizzo del tuo sito è obbligatorio",
                              })}
                              style={isWebsiteInvalid ? { color: '#fc1333' } : {}}
                            />
                            {
                              isWebsiteInvalid && <LabelError>* Non siamo riusciti a verificare il sito della tua azienda. Inserisci la Partita IVA per completare la verifica.</LabelError>
                            }
                            {errors.website && (
                              <span className="val-error">
                                {errors.website.message}
                              </span>
                            )}
                        </div>
                        {
                          isWebsiteInvalid && (
                            <div className="input-group">
                              {/*Indirizzo sito web*/}
                                <label>Partita IVA *</label>
                                <input
                                  onClick={(e) => {
                                    scrollDown(e);
                                  }}
                                  onKeyUp={(e) => { verifyVatNumber(e.target.value) }}
                                  aria-invalid={errors.vat_number ? true : false}
                                  type="text"
                                  {...register("vat_number", {
                                    //required: "La Partita IVA è obbligatoria",
                                    validate: (value) =>
                                      (isWebsiteInvalid)
                                        ? (value && isVatNumberInvalid !== true ? true : 'La Partita IVA è obbligatoria')
                                        : true
                                  })}
                                  style={isVatNumberInvalid ? { color: '#fc1333' } : {}}
                                />
                                {
                                  isVatNumberInvalid && <LabelError>* La Partita IVA sembra non essere corretta.</LabelError>
                                }
                                {errors.vat_number && (
                                  <span className="val-error">
                                    {errors.vat_number.message}
                                  </span>
                                )}
                            </div>
                          )
                        }
                    </div>
                  </>
                :
                    <>
                      <div className="form-group">
                        <div className="input-group">
                          <label>Azienda *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            aria-invalid={errors.business_name ? true : false}
                            type="text"
                            {...register("business_name", {
                              required: "La ragione sociale è obbligatoria",
                            })}
                          />
                          {errors.business_name && (
                            <span className="val-error">
                              {errors.business_name.message}
                            </span>
                          )}
                        </div>
                        <div className="input-group">
                          <label>Email *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            aria-invalid={errors.email ? true : false}
                            type="text"
                            {...register("email", {
                              required: "L'email è obbligatoria",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Inserire un'email valida",
                              },
                            })}
                          />
                          {errors.email && (
                            <span className="val-error">{errors.email.message}</span>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <label>Telefono *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            aria-invalid={errors.phone_number ? true : false}
                            type="text"
                            {...register("phone_number", {
                              required: "Il telefono è obbligatorio",
                              minLength: {
                                value: 6,
                                message: "Inserisci almeno 6 caratteri",
                              },
                              maxLength: {
                                value: 15,
                                message: "Non inserire più di 15 caratteri",
                              },
                              pattern: {
                                value: /^[0-9 ()+-]+$/,
                                message: "Inserisci numero di telefono valido",
                              },
                            })}
                          />
                          {errors.phone_number && (
                            <span className="val-error">
                              {errors.phone_number.message}
                            </span>
                          )}
                        </div>
                        <div style={{width: '100%'}}>
                          <div className="input-group">
                            {/*Indirizzo sito web*/}
                              <label>Indirizzo del tuo sito *</label>
                              <input
                                onClick={(e) => {
                                  scrollDown(e);
                                }}
                                onKeyUp={(e) => { verifyWebsiteAddress(e.target.value) }}
                                aria-invalid={errors.website ? true : false}
                                type="text"
                                {...register("website", {
                                  required: "L'indirizzo del tuo sito è obbligatorio",
                                })}
                                style={isWebsiteInvalid ? { color: '#fc1333' } : {}}
                              />
                              {
                                isWebsiteInvalid && <LabelError>* Non siamo riusciti a verificare il sito della tua azienda. Inserisci la Partita IVA per completare la verifica.</LabelError>
                              }
                              {errors.website && (
                                <span className="val-error">
                                  {errors.website.message}
                                </span>
                              )}
                          </div>
                          {
                            isWebsiteInvalid && (
                              <div className="input-group">
                                {/*Indirizzo sito web*/}
                                  <label>Partita IVA *</label>
                                  <input
                                    onClick={(e) => {
                                      scrollDown(e);
                                    }}
                                    onKeyUp={(e) => { verifyVatNumber(e.target.value) }}
                                    aria-invalid={errors.vat_number ? true : false}
                                    type="text"
                                    {...register("vat_number", {
                                      //required: "La Partita IVA è obbligatoria",
                                      validate: (value) =>
                                        (isWebsiteInvalid)
                                          ? (value && isVatNumberInvalid !== true ? true : 'La Partita IVA è obbligatoria')
                                          : true
                                    })}
                                    style={isVatNumberInvalid ? { color: '#fc1333' } : {}}
                                  />
                                  {
                                    isVatNumberInvalid && <LabelError>* La Partita IVA sembra non essere corretta.</LabelError>
                                  }
                                  {errors.vat_number && (
                                    <span className="val-error">
                                      {errors.vat_number.message}
                                    </span>
                                  )}
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </>
              }
            {
              (hasRole !== true) &&
                <div className="form-group">
                  <div className="input-group">
                    <label>
                      Aggiungi eventuali dettagli per comprendere meglio la tua
                      esigenza e i tuoi obiettivi
                    </label>
                    <textarea
                      onClick={(e) => {
                        scrollDown(e);
                      }}
                      aria-invalid={errors.message ? true : false}
                      rows="3"
                      type="text"
                      {...register("message")}
                    ></textarea>
                    {errors.message && (
                      <span className="val-error">{errors.message.message}</span>
                    )}
                  </div>
                </div>
            }
            </>
        ) : (
          //* LAYOUT PER FORM STANDARD
          <>
            {/* NOME COGNOME */}
            <div className="form-group">
              <div className="input-group">
                <label>Nome *</label>
                <input
                  onClick={(e) => {
                    scrollDown(e);
                  }}
                  aria-invalid={errors.name ? true : false}
                  type="text"
                  {...register("name", {
                    required: "Il nome è obbligatorio",
                  })}
                />
                {errors.name && (
                  <span className="val-error">{errors.name.message}</span>
                )}
              </div>
              <div className="input-group">
                <label>Cognome *</label>
                <input
                  onClick={(e) => {
                    scrollDown(e);
                  }}
                  aria-invalid={errors.surname ? true : false}
                  type="text"
                  {...register("surname", {
                    required: "Il cognome è obbligatorio",
                  })}
                />
                {errors.surname && (
                  <span className="val-error">{errors.surname.message}</span>
                )}
              </div>
            </div>
            {/* AZIENDA EMAIL */}
            <div className="form-group">
              {formType !== "file" && (
                <div className="input-group">
                  <label>Azienda *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    aria-invalid={errors.business_name ? true : false}
                    type="text"
                    {...register("business_name", {
                      required: "Il nome azienda è obbligatorio",
                    })}
                  />
                  {errors.business_name && (
                    <span className="val-error">
                      {errors.business_name.message}
                    </span>
                  )}
                </div>
              )}
              {/* THIS INPUT CHANGE BASED ON FORM TYPE PROP (EMAIL o TELEFONO)*/}
              {["standard", "file"].includes(formType) ? (
                <div className="input-group">
                  <label>Email *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    aria-invalid={errors.email ? true : false}
                    type="text"
                    {...register("email", {
                      required: "L'email è obbligatoria",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Inserire un'email valida",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="val-error">{errors.email.message}</span>
                  )}
                </div>
              ) : (
                <div className="input-group">
                  <label>Telefono *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    aria-invalid={errors.phone_number ? true : false}
                    type="text"
                    {...register("phone_number", {
                      required: "Il telefono è obbligatorio",
                      minLength: {
                        value: 6,
                        message: "Inserisci almeno 6 caratteri",
                      },
                      maxLength: {
                        value: 15,
                        message: "Non inserire più di 15 caratteri",
                      },
                      pattern: {
                        value: /^[0-9 ()+-]+$/,
                        message: "Inserisci numero di telefono valido",
                      },
                    })}
                  />
                  {errors.phone_number && (
                    <span className="val-error">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
              )}
              {formType == "file" && (
             
                <div className="input-group">
                  <DropDownContainer
                    isOpen={isOpen}
                    white={isWhite}
                    onClick={(e) => {
                      toggling(e);
                      scrollDown(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        toggling(e);
                      }
                    }}
                  >
                    <label className="dropdown-label">
                      <span>Seleziona la città di provenienza *</span>
                    </label>
                    <DropDownInput
                      readOnly={true}
                      white={isWhite}
                      aria-invalid={errors.province ? true : false}
                      {...register("province", {
                        required: "Opzione obbligatoria",
                      })}
                      value={selectedProvince.join(", ")}
                    />
                    {errors.province && (
                      <span className="val-error">
                        {errors.province.message}
                      </span>
                    )}
                    <DropDownListContainer>
                      <DropDownList isOpen={isOpen} white={isWhite}>
                      <SearchListBar
                        white={isWhite}
                        onClick={(e) => {e.preventDefault(); e.stopPropagation()}}
                      
                      >
                        <input type="text" onChange={handleInputChange}></input>
                      </SearchListBar>

                        {listProvinces.map((option, i) => (
                          <ListItem
                            onClick={onProvinceClicked(option)}
                            key={i}
                            white={isWhite}
                            className={
                              selectedProvince.includes(option)
                                ? "isSelected"
                                : ""
                            }
                          >
                            {option}
                          </ListItem>
                        ))}
                      </DropDownList>
                    </DropDownListContainer>
                  </DropDownContainer>
                </div>
                
              )}
            </div>
            {/* TELEFONO SELECT */}
            <div className="form-group">
              {/* THIS INPUT CHANGE BASED ON FORM TYPE PROP (TELEFONO o EMAIL)*/}
              {["standard", "file"].includes(formType) ? (
                <div className="input-group">
                  <label>Telefono *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    aria-invalid={errors.phone_number ? true : false}
                    type="text"
                    {...register("phone_number", {
                      required: "Il telefono è obbligatorio",
                      minLength: {
                        value: 6,
                        message: "Inserisci almeno 6 caratteri",
                      },
                      maxLength: {
                        value: 15,
                        message: "Non inserire più di 15 caratteri",
                      },
                      pattern: {
                        value: /^[0-9 ()+-]+$/,
                        message: "Inserisci numero di telefono valido",
                      },
                    })}
                  />
                  {errors.phone_number && (
                    <span className="val-error">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
              ) : (
                <div className="input-group">
                  <label>Email *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    aria-invalid={errors.email ? true : false}
                    type="text"
                    {...register("email", {
                      required: "L'email è obbligatoria",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Inserire un'email valida",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="val-error">{errors.email.message}</span>
                  )}
                </div>
              )}

              {/* THIS INPUT CHANGE BASED ON FORM TYPE PROP (SELECT o UPLOAD o VUOTO)*/}
              {formType === "standard" ? (
                <>
                  {isWhite == true ? (
                    <div className="input-group">
                      <label>Allegato ( max. 2 MB )</label>
                      <input
                        onClick={(e) => {
                          scrollDown(e);
                        }}
                        // isWhite={isWhite}
                        aria-invalid={errors.cv_portfolio ? true : false}
                        type="file"
                        accept=".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.pdf"
                        {...register("attachment", {
                          // required: "File allegato obbligatorio",
                          // TODO: Trigger error id file no è PDF
                          // onChange: (e) => {
                          //   if(e.target.value.endsWith(".pdf")) {
                          //     setError("cv_portfolio", {
                          //       type: "focus",
                          //       message: "Validi solo file pdf"
                          //     });
                          //   }
                          // }
                        })}
                      />

                      {errors.cv_portfolio && (
                        <span className="val-error">
                          {errors.cv_portfolio.message}
                        </span>
                      )}
                      {/* <small style={{fontSize:"11px", fontStyle: "italic",  bottom: '-17px'}}>
                          Formati consentiti: .doc, .docx, .txt, .pdf, .xls, .xlsx, .csv, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .pdf
                        </small> */}
                    </div>

                  ) : (
                    <div style={{width: '100%'}}>
                      <div className="input-group">
                        {/*Indirizzo sito web*/}
                          <label>Indirizzo del tuo sito *</label>
                          <input
                            onClick={(e) => {
                              scrollDown(e);
                            }}
                            onKeyUp={(e) => { verifyWebsiteAddress(e.target.value) }}
                            aria-invalid={errors.website ? true : false}
                            type="text"
                            {...register("website", {
                              required: "L'indirizzo del tuo sito è obbligatorio",
                            })}
                            style={isWebsiteInvalid ? { color: '#fc1333' } : {}}
                          />
                          {
                            isWebsiteInvalid && <LabelError>* Non siamo riusciti a verificare il sito della tua azienda. Inserisci la Partita IVA per completare la verifica.</LabelError>
                          }
                          {errors.website && (
                            <span className="val-error">
                              {errors.website.message}
                            </span>
                          )}
                      </div>
                      {
                        isWebsiteInvalid && (
                          <div className="input-group">
                            {/*Indirizzo sito web*/}
                              <label>Partita IVA *</label>
                              <input
                                onClick={(e) => {
                                  scrollDown(e);
                                }}
                                onKeyUp={(e) => { verifyVatNumber(e.target.value) }}
                                aria-invalid={errors.vat_number ? true : false}
                                type="text"
                                {...register("vat_number", {
                                  //required: "La Partita IVA è obbligatoria",
                                  validate: (value) =>
                                    (isWebsiteInvalid)
                                      ? (value && isVatNumberInvalid !== true ? true : 'La Partita IVA è obbligatoria')
                                      : true
                                })}
                                style={isVatNumberInvalid ? { color: '#fc1333' } : {}}
                              />
                              {
                                isVatNumberInvalid && <LabelError>* La Partita IVA sembra non essere corretta.</LabelError>
                              }
                              {errors.vat_number && (
                                <span className="val-error">
                                  {errors.vat_number.message}
                                </span>
                              )}
                          </div>
                        )
                      }
                    </div>
                  )}
                </>
              ) : formType === "file" ? (
                <div className="input-group">
                  <label>Allega CV o Portfolio (.pdf ) *</label>
                  <input
                    onClick={(e) => {
                      scrollDown(e);
                    }}
                    isWhite={isWhite}
                    aria-invalid={errors.cv_portfolio ? true : false}
                    type="file"
                    accept=".pdf"
                    {...register("cv_portfolio", {
                      required: "File allegato obbligatorio",
                      //TODO: Trigger error id file no è PDF
                      // onChange: (e) => {
                      //   if(e.target.value.endsWith(".pdf")) {
                      //     setError("cv_portfolio", {
                      //       type: "focus",
                      //       message: "Validi solo file pdf"
                      //     });
                      //   }
                      // }
                    })}
                  />
                  {/* <small style={{fontSize:"11px", fontStyle: "italic"}}>
                    Formati consentiti: .pdf
                  </small> */}
                  {errors.cv_portfolio && (
                    <span className="val-error">
                      {errors.cv_portfolio.message}
                    </span>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            {/* AZIENDA EMAIL */}
            <div className="form-group">
              <div className="input-group">
                <label>
                  {selectedOptions.length == 0
                    ? "Messaggio *"
                    : selectedOptions[selectedOptions.length - 1]
                      .trim()
                      .toLowerCase()
                      .includes("altro")
                      ? "Specifica di cosa hai bisogno *"
                      : "Messaggio *"}
                </label>
                <textarea
                  onClick={(e) => {
                    scrollDown(e);
                  }}
                  aria-invalid={errors.message ? true : false}
                  rows="2"
                  type="text"
                  {...register("message", {
                    required: "Il messaggio è obbligatorio",
                  })}
                ></textarea>
                {errors.message && (
                  <span className="val-error">{errors.message.message}</span>
                )}
              </div>
            </div>

            {formType == "file" && (
              <div className="form-group">
                <div className="input-group">
                  <DropDownContainer
                    isOpen={isRemoteOpen}
                    white={isWhite}
                    onClick={(e) => {
                      togglingRemote(e);
                      scrollDown(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        togglingRemote(e);
                      }
                    }}
                  >
                    <label className="dropdown-label">
                      <span>Sei disponibile a lavorare in sede NetStrategy (a Legnago, Verona) almeno 4 giorni alla settimana: </span>
                    </label>
                    <DropDownInput
                      readOnly={true}
                      white={isWhite}
                      aria-invalid={errors.remote_job ? true : false}
                      {...register("remote_job", {
                        required: "Opzione obbligatoria",
                      })}
                      value={selectedRemote.join(", ")}
                    />
                    {errors.remote_job && (
                      <span className="val-error">
                        {errors.remote_job.message}
                      </span>
                    )}
                    <DropDownListContainer>
                      <DropDownList isOpen={isRemoteOpen} white={isWhite}>
                      {/* <SearchListBar
                        white={isWhite}
                        onClick={(e) => {e.preventDefault(); e.stopPropagation()}}
                       
                      >
                        <input type="text" onChange={handleInputChange}></input>
                        </SearchListBar> */}
                      {/* listRemoteOptions */}
  
                        {listRemoteOptions.map((option, i) => (
                          <ListItem
                            onClick={onRemoteClicked(option)}
                            key={i}
                            white={isWhite}
                            className={
                              selectedRemote.includes(option)
                                ? "isSelected"
                                : ""
                            }
                          >
                            {option}
                          </ListItem>
                        ))}
                      </DropDownList>
                    </DropDownListContainer>
                  </DropDownContainer>
                </div>
              </div>
              )}
          </>
        )}

        <PolicyContainerSingle
          hideConsent={showConsent}
          formLayout={formLayout}
          white={isWhite}
        >
          {showConsent && (
            <Policy>
              <>
                <input
                  id={`policy-checkbox-privacy-5f`}
                  aria-invalid={errors.checkbox_privacy_2 ? true : false}
                  type="checkbox"
                  {...register("checkbox_privacy_2", {
                    required: "Campo obbligatorio",
                  })}
                />
                <label htmlFor={`policy-checkbox-privacy-5f`}>
                  {`Acconsento al trattamento dei miei dati personali per le finalità di cui al punto 5.F dell’`}
                  <PrivacyPolicyLink
                    target="_blank"
                    href="/privacy-policy-e-cookies#policy"
                  >
                    informativa privacy
                  </PrivacyPolicyLink>
                  {`. *`}
                  {errors.checkbox_privacy_2 && (
                    <span style={{ display: "block" }} className="val-error">
                      {errors.checkbox_privacy_2.message}
                    </span>
                  )}
                </label>
              </>
            </Policy>
          )}
          <Policy>
            {/* ---- */}
            <input
              id={`policy-checkbox-newsletter`}
              type="checkbox"
              {...register("checkbox_newsletter")}
            />
            <label htmlFor={`policy-checkbox-newsletter`}>
              Desidero rimanere aggiornato via mail sulle nuove strategie di
              marketing, iniziative ed eventi del settore.
            </label>
          </Policy>
          {
            (hasRole === false) &&
            <FormSubmitWrapper white={isWhite} className="desktop">
              <FormSubmitBtn onClick={handleSubmit(onSubmit)}>
                <PrimaryButton
                // isDisabled={!isValid || clicked == true || isPast == true}
                >
                  {submit_btn_name ? submit_btn_name : "Contattaci"}
                </PrimaryButton>
              </FormSubmitBtn>
              <ConfirmPolicy>
                {`Confermo di aver preso visione della `}
                <PrivacyPolicyLink
                  target="_blank"
                  href="/privacy-policy-e-cookies"
                >
                  privacy policy
                </PrivacyPolicyLink>
              </ConfirmPolicy>
            </FormSubmitWrapper>
          }
        </PolicyContainerSingle>
        {
          (hasRole === true) &&
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <FormSubmitWrapper white={isWhite} className="desktop">
              <FormSubmitBtn onClick={handleSubmit(onSubmit)}>
                <PrimaryButton
                // isDisabled={!isValid || clicked == true || isPast == true}
                >
                  {submit_btn_name ? submit_btn_name : "Contattaci"}
                </PrimaryButton>
              </FormSubmitBtn>
              <ConfirmPolicy>
                {`Confermo di aver preso visione della `}
                <PrivacyPolicyLink
                  target="_blank"
                  href="/privacy-policy-e-cookies"
                >
                  privacy policy
                </PrivacyPolicyLink>
              </ConfirmPolicy>
            </FormSubmitWrapper>
            </div>
        }
        <FormSubmitWrapper white={isWhite} className="mobile">
          <FormSubmitBtn onClick={handleSubmit(onSubmit)}>
            <PrimaryButton
            // isDisabled={!isValid || clicked == true || isPast == true}
            white={isWhite}
            >
              {submit_btn_name ? submit_btn_name : "Contattaci"}
            </PrimaryButton>
          </FormSubmitBtn>
          <ConfirmPolicy>
            {`Confermo di aver preso visione della `}
            <PrivacyPolicyLink target="_blank" href="/privacy-policy-e-cookies">
              privacy policy
            </PrivacyPolicyLink>
          </ConfirmPolicy>
        </FormSubmitWrapper>
        {/* <PrimaryButton
          isDisabled={!isValid || clicked == true || isPast == true}
        >
          Contattaci
        </PrimaryButton> */}
      </Form>
      {error && <FormError dangerouslySetInnerHTML={{ __html: stringError }} ></FormError>}
      {success && <FormSuccess>{successMessage}</FormSuccess>}
    </Container>
  );
}

const FormSubmitWrapper = styled.div`
  @media (min-width: 950px) {
    &.mobile {
      display: none;
    }
    &.desktop {
      display: flex;
    }
  }
  @media (max-width: 950px) {
    &.mobile {
      display: flex;
    }
    &.desktop {
      display: none;
    }
  }

  /* display: flex; */
  align-items: flex-end;
  flex-direction: column;
  row-gap: 10px;

  @media (max-width: 950px) {
    margin-top: 2rem;
    width: 100%;
    align-items: center;
    position: ${(props) => (props.white ? "sticky" : "relative")};
    bottom: -2px;
    background: ${(props) =>
    props.white ? props.theme.colors.blackColorV3 : "transparent"};
    padding: 10px 0px;
  }

  @media (min-width: 768px) {
    grid-column-start: 3;
  }

  @media (max-width: 1280px) {
    justify-content: center;
  }
`;

const FormError = styled.div`
  color: ${(props) => props.theme.colors.primaryColor};
  @media (min-width: 992px) {
    white-space: nowrap;
  }
`;

const FormSuccess = styled.div`
  color: ${(props) => props.theme.colors.primaryColor};
  @media (min-width: 992px) {
    white-space: nowrap;
  }
`;

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  ${centerContent}
  color: ${(props) => (props.white ? "white" : "black")};
`;

// Heading
const Heading = styled.div`
  flex-direction: ${({ formLayout }) =>
    formLayout === "centered" ? "column" : "initial"};
  align-items: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
  @media (min-width: 1280px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  margin-top: ${(props) => (props.white ? "5rem" : "0rem")};
  @media (min-width: 950px) {
    margin-top: 0rem;
  }

  span.title {
    display: block;
    color: ${(props) =>
    props.white ? "white" : ({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    text-align: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
    margin-top: 0px;
    span {
      display: block;
      display: ${({ formLayout }) =>
    formLayout === "centered" ? "inline" : "block"};
    }
    font-size: ${(props) =>
    props.formLayout === "centered"
      ? "clamp(3.75rem, calc(2.13rem + 8.13vw), 11.88rem)"
      : props.theme.fontSizes.size_83_250};
    margin-top: ${({ formLayout }) => (formLayout === "centered" ? "0" : "0")};
  }
  h2 {
    color: ${(props) =>
    props.white ? "white" : ({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    text-align: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
    margin-top: 0px;

    span {
      display: block;
      display: ${({ formLayout }) =>
    formLayout === "centered" ? "inline" : "block"};
    }
    font-size: ${(props) =>
    props.formLayout === "centered"
      ? "clamp(3.75rem, calc(2.13rem + 8.13vw), 11.88rem)"
      : props.theme.fontSizes.size_83_250};
    margin-top: ${({ formLayout }) => (formLayout === "centered" ? "0" : "0")};
  }

  @media (min-width: 1280px) {
    width: ${({ formLayout }) => (formLayout === "centered" ? "100%" : "60%")};
    text-align: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
  }
`;

const Text = styled.div`
  white-space: "normal";
  @media (min-width: 992px) {
    white-space: ${({ formLayout }) =>
    formLayout === "centered" ? "nowrap" : "normal"};
  }

  text-align: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
  .subtitle {
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-weight: 100;
    span {
      display: block;
    }
  }

  p {
    width: ${({ formLayout }) => (formLayout === "centered" ? "100%" : "100%")};
    margin-left: auto;
    margin-right: ${({ formLayout }) =>
    formLayout === "centered" ? "auto" : "0"};
    margin-top: 2rem;
    margin-top: ${({ formLayout }) =>
    formLayout === "centered" ? "0.5rem" : "2rem"};

    text-transform: ${({ formLayout }) =>
    formLayout === "centered" ? "uppercase" : "initial"};
  }

  @media (min-width: 1280px) {
    text-align: ${({ formLayout }) =>
    formLayout === "centered" ? "center" : "initial"};
    width: ${({ formLayout }) => (formLayout === "centered" ? "100%" : "40%")};
    padding-top: ${({ formLayout }) =>
    formLayout === "centered" ? "0px" : "13px"};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      margin-top: 0;
    }

    p {
      width: ${({ formLayout }) =>
    formLayout === "centered" ? "100%" : "90%"};
      margin-left: 0;
      margin-top: 0;
    }
  }

  @media (max-width: 1280px) {
    p {
      max-width: 500px;
    }
  }
`;

// Form
const Form = styled.form`
  margin-top: clamp(2rem, calc(1.27rem + 3.11vw), 5rem); // 32px → 80px
  /* display: grid; */
  margin-top: ${({ formLayout }) =>
    formLayout === "centered" ? "0rem" : "3rem"};
  /* formLayout === "centered" ? "1rem" : "3rem"}; */
  margin-bottom: 5rem;

  .form-group {
    display: flex;
    gap: clamp(2rem, calc(1.51rem + 2.07vw), 4rem); // 32px → 64px */
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 0;
    }
    .input-group {
      width: 100%;
      margin-top: 1.9rem;
      @media (max-width: 780px) {
        margin-top: 1rem;
      }
      position: relative;
      input[aria-invalid="true"] {
        border-color: ${({ theme: { colors } }) => colors.primaryColor};
      }
      .val-error {
        position: absolute;
        right: 0;
        bottom: -1.25em;
        color: ${({ theme: { colors } }) => colors.primaryColor};
      }
    }
  }

  input[type="text"],
  input[type="file"],
  input[type="number"],
  textarea {
    display: block;
    background: transparent;
    width: 100%;
    padding: 0.5rem 0;
    font-size: 1rem;
    outline: none;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid;
    border-color: ${(props) => (props.white ? "white" : "black")};
    color: ${(props) => (props.white ? "white" : "black")};
  }

  input[type="file"]::-webkit-file-upload-button {
    all: unset;
    /* background-color: red; */
    position: absolute;
    right: 0;
    bottom: 5px;
    padding: 0.5rem 3rem;
    border: 1px solid ${(props) => (props.white ? "white" : "black")};
    color: ${(props) => (props.white ? "black" : "white")};
    border-radius: 99px;
    cursor: pointer;
    z-index: 10;
    background-color: #fff;
  }

  textarea {
    resize: vertical;
    &[aria-invalid="true"] {
      border-color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 13%;
  }

  @media (min-width: 1280px) {
    margin-bottom: 0px;
    margin-left: auto;
    width: ${({ formLayout }) => (formLayout === "centered" ? "100%" : "80%")};
  }

  @media screen and (max-width:767px) {
    width: 100% !important;
  }
`;

const Msg = styled.div``;

// Policy
const PolicyContainer = styled.div`
  /* margin-top: ${({ formLayout }) =>
    formLayout === "centered" ? "-20px" : "-20px"}; */
  /* formLayout === "centered" ? "-20px" : "clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem)"}; */
  display: grid;
  row-gap: 2rem;
  align-items: flex-start;
  width: 100%;
  @media (min-width: 768px) {
    grid-column: 1 / 3;
    align-items: center;
  }
  @media (max-width: 1280px) {
    margin-top: 1rem;
    /* margin-top: ${({ formLayout }) =>
    formLayout === "centered" ? "30px" : "30px"}; */
    /* formLayout === "centered" ? "30px" : "clamp(2rem, calc(1.88rem + 0.52vw), 2.5rem)"}; */
    place-items: flex-start;
  }

  input[type="checkbox"] {
    border: 1px solid;
    border-color: ${(props) => (props.white ? "white" : "black")};
    min-width: 20px;
    min-height: 20px;
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  input[type="checkbox"]:after {
    content: "✕";
    transition: all 200ms;
    opacity: 0;
    color: ${(props) => (props.white ? "white" : "black")};
  }

  input[type="checkbox"]:checked:after {
    content: "✕";
    opacity: 1;
    color: ${(props) => (props.white ? "white" : "black")};
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5%;
  }
`;

const PolicyContainerSingle = styled.div`
  padding: 0px 1px;
  margin-top: ${({ formLayout }) =>
    formLayout === "centered"
      ? "30px"
      : "clamp(2rem, calc(1.51rem + 2.07vw), 4rem)"};
  display: grid;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  @media (min-width: 768px) {
    display: flex !important;
    /* justify-content: space-between; */
    justify-content: ${({ hideConsent }) =>
    hideConsent === true ? "space-between" : "flex-end"};
    align-items: flex-start;
  }
  @media (max-width: 1280px) {
    place-items: flex-start;
    row-gap: 1rem;
  }

  input[type="checkbox"] {
    border: 1px solid;
    border-color: ${(props) => (props.white ? "white" : "black")};
    min-width: 20px;
    min-height: 20px;
    cursor: pointer;
    display: grid;
    place-items: center;
  }
  input[type="checkbox"]:after {
    content: "✕";
    transition: all 200ms;
    opacity: 0;
    color: ${(props) => (props.white ? "white" : "black")};
  }

  input[type="checkbox"]:checked:after {
    content: "✕";
    opacity: 1;
    color: ${(props) => (props.white ? "white" : "black")};
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 5%;
  }
`;

const Policy = styled.div`
  display: flex;
  align-items: start;
  column-gap: 1.5rem;
  /* @media (min-width: 768px) {
    width: 25%;
  } */
  label {
    cursor: pointer;
  }

  .val-error {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }
`;

const DropDownContainer = styled("div")`
  width: 100%;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    background-image: ${(props) =>
    props.white
      ? "url(/select-chevron-white.svg)"
      : "url(/select-chevron-black.svg)"};
    background-size: contain;
    background-repeat: no-repeat;
    width: 20px;
    height: 20px;
    pointer-events: none;
    position: absolute;
    right: 1rem;
    top: 0;
    transition: transform 400ms;
    transform: ${({ isOpen }) =>
    isOpen ? "rotate(45deg)" : "rotate(-135deg)"};
  }
  .dropdown-label {
    display: flex;
    gap: 0.25rem;
    @media (max-width: 500px) {
      flex-direction: column;
      gap: 0;
    }
  }
  @media (max-width: 780px) {
    margin-top: 1rem;
  }
`;

const DropDownInput = styled.input`
  cursor: pointer;
  position: relative;
  display: block;
  background: transparent;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid;
  border-color: ${(props) => (props.white ? "white" : "black")};
  color: ${(props) => (props.white ? "white" : "black")};
`;

const DropDownListContainer = styled("div")`
  position: relative;
`;

const DropDownList = styled("ul")`
  transition: all 500ms ease-out;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  overflow: hidden;
  overflow-y: scroll;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: ${({ white, theme: { colors } }) =>
    white ? colors.blackColorV3 : colors.whiteColor};
  border: ${({ isOpen }) => (isOpen ? "1px solid black" : "0px solid black")};
  border-color: ${({ white, theme: { colors } }) =>
    white ? colors.whiteColor : colors.blackColorV3};
  border-top: 0;
  font-size: 1rem;
  position: absolute;
  z-index: 25;
  color: ${({ white, theme: { colors } }) =>
    white ? colors.whiteColor : colors.blackColorV3};
`;

const ListItem = styled("li")`
  list-style: none;
  padding: 0.75rem 1rem;
  background-color: ${({ white, theme: { colors } }) =>
    white ? colors.blackColorV3 : colors.whiteColor};
  transition: background-color 3 00ms;
  &:hover {
    cursor: pointer;
    background-color: ${({ white, theme: { colors } }) =>
    white ? colors.blackColorV2 : "e9e9e9"};
  }
  &.isSelected {
    padding-right: 2.2rem;
    &::after {
      content: "✓";
      position: absolute;
      right: 13px;
    }
  }
`;

const SearchListBar = styled("div")`
  position: sticky;
  top: 0;
  list-style: none;
  padding: 0.75rem 1rem;
  background-color: ${({ white, theme: { colors } }) =>
  white ? colors.blackColorV3 : colors.whiteColor};
  transition: background-color 3 00ms;
`;

const FormSubmitBtn = styled.div`
  background: none;
  outline: none;
  border: none;
`;

const PrivacyPolicyLink = styled.a`
  text-decoration: underline;
`;

const ConfirmPolicy = styled.div`
  margin-top: 10px;
  font-size: ${(props) => props.theme.fontSizes.size_12_15};
  white-space: nowrap;
`;

const LabelError = styled.span`
  color: #fc1333;
  font-size: 16px;
  font-style: italic;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60%;
  right: 30px;

  @media screen and (max-width:767px) {
    position: unset !important;
  }
`;