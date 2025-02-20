import toSlugText from "@/utils/toSlugText";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { gsap } from "gsap";
import RedLink from "./utils/RedLink";
import getPath from "@/utils/getPath";

const fallbackQuestions = [
  {
    id: 1,
    titolo: "Cosa ti ha spinto a contattare NetStrategy?",
    questions: [
      {
        id: 11,
        label: "Successi realizzati",
        value: "Successi_realizzati",
      },
      {
        id: 13,
        label: "Testimonianze dei clienti",
        value: "Testimonianze_dei_clienti",
      },
      {
        id: 15,
        label: "Passaparola",
        value: "Passaparola",
      },
      {
        id: 35,
        label: "Altro:",
        value: "altro",
      },
    ],
  },
  {
    id: 3,
    titolo: 'Cosa del sito NetStrategy ti ha fatto dire "WOW"?',
    questions: [
      {
        id: 17,
        label: "Grafica",
        value: "Grafica",
      },
      {
        id: 19,
        label: "Contenuti",
        value: "Contenuti",
      },
      {
        id: 21,
        label: "Valori",
        value: "Valori",
      },
    ],
  },
  {
    id: 5,
    titolo: "Trovi i contenuti interessanti ed esaustivi?",
    questions: [
      {
        id: 23,
        label: "Sì, sono ben organizzati e molto chiari",
        value: "Sì,_sono_ben_organizzati_e_molto_chiari",
      },
      {
        id: 25,
        label: "No, la navigazione è troppo complicata",
        value: "No_la_navigazione_è_troppo_complicata",
      },
      {
        id: 27,
        label: "Sì, soprattutto gli articoli del blog",
        value: "Sì_soprattutto_gli_articoli_del_blog",
      },
    ],
  },
  {
    id: 7,
    titolo: "Vorresti avere un sito come NetStrategy?",
    questions: [
      {
        id: 29,
        label: "Sì, è molto bello",
        value: "Sì_è_molto_bello",
      },
      {
        id: 31,
        label: "No, ce l’ho già",
        value: "No_ce_l_ho_già",
      },
      {
        id: 33,
        label: "Sì, vi ho contattati proprio per questo",
        value: "Sì_vi_ho_contattati_proprio_per_questo",
      },
    ],
  },
];

export default function Questionnaire({
  blackVersion = false,
  data: thankYou = fallbackQuestions,
}) {
  //! REFS & STATES
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formData = useSelector((state) => state.formSlice.value.data);
  const slider = useRef();
  const prevCountRef = useRef();
  const formRef = useRef();
  const thankYouRef = useRef();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formDone, setFormDone] = useState(false);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  // const lead = useSelector((state) => state.formSlice.value.data);

  //   prevCountRef.current = 0;

  //! VALIDATION

  //! SUBMIT
  const handleSubmit = () => {
    const url = "https://www.atomiko.it/api/netstrategy/thank-you";
    // const url = "http://atomiko.test/api/netstrategy/thank-you";

    const fData = {
      checks: checkboxValues,
      lead: formData,
    };

    axios
      .post(url, fData)
      .then((response) => {
        gsap.to(formRef.current, {
          opacity: 0,
          duration: 0.3,
          height: 0,
        });

        gsap.to(thankYouRef.current, {
          opacity: 1,
          maxHeight: 2000,
          duration: 0.3,
          display: "block",
        });
        // console.log(response)
        setFormDone(true);
      })
      .catch((error) => {
        console.log(error);
        // setError(true)
      });

    // SEND DATA
    // console.log();

    // SAY THANK YOU
  };

  //! ANIMATIONS
  const [count, setCount] = useState(0);

  const prevQuestions = () => {
    if (!isDisabled) {
      count !== 0 && setCount(count - 1);
    }
  };

  const nextQuestions = () => {
    if (!isDisabled) {
      count !== thankYou.length - 1 && setCount(count + 1);
    }
  };

  useEffect(() => {
    count > 0 ? setIsPrevDisabled(false) : setIsPrevDisabled(true);

    if (count !== undefined) {
      count > prevCountRef.current &&
        gsap.to(slider.current, {
          x: `-=100%`,
          duration: 0.5,
          onComplete: () => {
            setIsDisabled(false);
          },
          onStart: () => {
            setIsDisabled(true);
            !checkboxValues[count] && setIsNextDisabled(true);
          },
        });
      count < prevCountRef.current &&
        gsap.to(slider.current, {
          x: `+=100%`,
          duration: 0.5,
          onComplete: () => {
            setIsDisabled(false);
          },
          onStart: () => {
            setIsDisabled(true);
          },
        });
    }

    // Aggiorniamo il ref con il valore attuale di count
    prevCountRef.current = count;
  }, [count]);

  //! Funzione per aggiornare lo stato delle checkbox selezionate
  // Stati per gestire i valori delle checkbox selezionate
  const [checkboxValues, setCheckboxValues] = useState([]);

  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;

    let valore;
    let altroInput;

    // Se clicco su altro check su radio input
    if (event.target.type == "text") {
      event.target.parentNode.firstChild.checked = true;
    }

    if ((altroInput = event.target.parentNode.querySelector("input~input"))) {
      valore = altroInput.value;
    } else valore = event.target.value;

    let item = { id: id, valore: valore, checked: checked };

    // Verifica se l'oggetto è già presente nello stato usando l'identificatore univoco (ad esempio, un campo "id").
    const existingObjectIndex = checkboxValues.findIndex(
      (obj) => obj.id === item.id
    );

    // console.log(checkboxValues);

    if (existingObjectIndex !== -1) {
      // Se l'oggetto è già presente nello stato, modifica il suo valore.
      setCheckboxValues((prevState) => {
        const updatedStateArray = [...prevState];
        updatedStateArray[existingObjectIndex] = item;
        return updatedStateArray;
      });
    } else {
      // Se l'oggetto non è presente nello stato, aggiungilo all'array.
      setCheckboxValues((prevState) => [...prevState, item]);
    }

    //
    valore == "" && setIsNextDisabled(true);
  };

  useEffect(() => {
    // console.log(checkboxValues)
    checkboxValues[count] &&
      checkboxValues[count].valore !== "" &&
      setIsNextDisabled(false);
    checkboxValues.length == thankYou.length && setIsConfirmDisabled(false);
  }, [checkboxValues, count]);

  //! COMPONENT
  return (
    <FormWrapper id="feedback" blackVersion={blackVersion}>
      {/* THANK YOU */}
      <ThankYou ref={thankYouRef}>
        Grazie di aver completato il questionario! <br></br>
        <div style={{marginTop: "40px"}} >
          <RedLink link={getPath("/", true)}>
            <PrimaryButton>Torna alla homepage</PrimaryButton>
          </RedLink>
        </div>
      </ThankYou>
      <Form ref={formRef}>
        {/* Slider */}
        <div style={{ overflow: "hidden" }}>
          <Slider ref={slider}>
            {thankYou.map(({ titolo, questions }, i) => (
              <Slide key={i} className={count === i ? "active" : ""}>
                <h3>{titolo}</h3>
                {questions.map((element, idx, arr) => (
                  <React.Fragment key={idx}>
                    {element.value !== "altro" ? (
                      <CheckBox key={idx} blackVersion={blackVersion}>
                        <input
                          name={toSlugText(titolo)}
                          // blackVersion={blackVersion}
                          id={toSlugText(element.value)}
                          value={toSlugText(element.value)}
                          onClick={(e) => handleCheckboxChange(e, titolo)}
                          type="radio"
                        />
                        <label htmlFor={toSlugText(element.value)}>
                          {element.label}
                        </label>
                      </CheckBox>
                    ) : (
                      // Altro:
                      <CheckBox key={idx} blackVersion={blackVersion}>
                        <input
                          name={toSlugText(titolo)}
                          // blackVersion={blackVersion}
                          id={toSlugText(element.value)}
                          value={toSlugText(element.value)}
                          onClick={(e) => handleCheckboxChange(e, titolo)}
                          type="radio"
                        />
                        <label htmlFor={toSlugText(element.value)}>
                          {element.label}
                        </label>
                        <input
                          // blackVersion={blackVersion}
                          type="text"
                          onChange={(e) => handleCheckboxChange(e, titolo)}
                          onClick={(e) => handleCheckboxChange(e, titolo)}
                        />
                      </CheckBox>
                    )}
                  </React.Fragment>
                ))}
              </Slide>
            ))}
          </Slider>
        </div>

        <Buttons>
          <div onClick={() => !isPrevDisabled && prevQuestions()}>
            <PrimaryButton isDisabled={isPrevDisabled}>
              Domanda precedente
            </PrimaryButton>
          </div>
          {count === thankYou.length - 1 ? (
            <div
              onClick={() => {
                !isConfirmDisabled && handleSubmit();
              }}
            >
              <PrimaryButton isDisabled={isConfirmDisabled}>
                Conferma le risposte
              </PrimaryButton>
            </div>
          ) : (
            <div onClick={() => !isNextDisabled && nextQuestions()}>
              <PrimaryButton isDisabled={isNextDisabled}>
                Domanda successiva
              </PrimaryButton>
            </div>
          )}
        </Buttons>
      </Form>
    </FormWrapper>
  );
}

//! STYLE
const FormWrapper = styled.div`
  color: ${(props) =>
    !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
  width: 100%;
  @media (min-width: 1200px) {
    width: 50%;
  }

  h3 {
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-weight: 100;

    span {
      display: block;
    }
  }
`;

const Form = styled.form``;
const CheckBox = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.5rem;
  margin: 2rem 1rem;

  label {
    cursor: pointer;
  }

  input[type="text"] {
    background: transparent;
    border-width: 0px 0px 1px 0px;
    border-color: ${(props) =>
      !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
    padding: 0.5rem;
    color: ${(props) =>
      !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
    outline: none;
  }

  input[type="radio"] {
    border: 1px solid;
    border-color: ${(props) =>
      !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
    min-width: 30px;
    min-height: 30px;
    cursor: pointer;
    display: grid;
    place-items: center;
    appearance: none !important;
  }

  input[type="radio"]:after {
    content: "✕";
    transition: all 200ms;
    font-size: 1.3rem;
    opacity: 0;
    color: ${(props) =>
      !props.blackVersion ? props.theme.colors.blackColorV1 : "white"};
    appearance: none !important;
  }

  input[type="radio"]:checked:after {
    content: "✕";
    opacity: 1;
  }

  .val-error {
    color: ${({ theme: { colors } }) => colors.blackColorV1};
  }
`;

// SLIDER
const Slider = styled.div`
  width: 100%;
  display: flex;
`;

// SLIDE
const Slide = styled.div`
  min-width: 100%;

  & > h3 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
    line-height: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    max-width: 450px;
  }
  opacity: 0;
  transition: opacity 350ms ease;
  &.active {
    opacity: 1;
  }
`;

// BTNS
const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  column-gap: 2rem;
  row-gap: 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  & button {
    padding: 1.5rem 2rem !important;
  }
`;

const FormSubmitBtn = styled.button`
  background: none;
  outline: none;
  border: none;
`;

const ThankYou = styled.h3`
  opacity: 0;
  max-height: 0px;
  /* width: 70%; */
  /* text-align: center; */
  margin-inline: auto;
  /* display: none; */
  font-size: ${({ theme: { fontSizes } }) =>
    fontSizes.size_36_56} !important;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
  line-height: ${({ theme: { fontSizes } }) => fontSizes.size_36_56};
  font-family: ${({ theme: { fonts } }) => fonts.medium};
`;
