import styled from "styled-components";
import PrimaryButton from "./utils/PrimaryButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import RedLink from "./utils/RedLink";
import axios from "axios";

export default function NewsletterForm({ white = false }) {
  //! REFS
  const [formFields, setFormFields] = useState({
    nome: "",
    email: "",
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // interface IFormInput {
  //   firstName: string
  //   lastName: string
  //   age: number
  // }

  //! VALIDATION
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    let url = "https://www.atomiko.it/api/netstrategy/";
    // let url = "http://atomiko.test/api/netstrategy/";
    url += "newsletter"
    
    // return
    axios
    .post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      setIsSubmitted(true);
    })
    .catch((error) => {
      setIsSubmitted(true);
    });
  };

  // useEffect(() => {
  //   formFields.nome === "" || formFields.email === ""
  //     ? setIsBtnDisabled(true)
  //     : setIsBtnDisabled(false);
  // }, [formFields]);

  //! COMPONENT
  return (
    <Container white={white}>
      <form id="newsletter" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            {...register("name", {
              required: "Questo campo è obbligatorio",
            })}
          />
          {errors.name && <span className="val-error">{errors.name.message}</span>}
        </div>
        <div>
          <label>Cognome</label>
          <input
            type="text"
            {...register("surname", {
              required: "Questo campo è obbligatorio",
            })}
          />
          {errors.surname && <span className="val-error">{errors.surname.message}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Questo campo è obbligatorio",
              pattern: {
                value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                message: "Inserire un'email valida",
              },
            })}
          />
          {errors.email && (
            <span className="val-error">{errors.email.message}</span>
          )}
        </div>
        {/* Btn */}
        <BtnContainer>
          <div onClick={handleSubmit(onSubmit)}>
            <PrimaryButton isDisabled={!isValid}>Iscriviti</PrimaryButton>
          </div>
        </BtnContainer>
      </form>
      {/*//! Disclaimer */}
      <Disclaimer>
        {isSubmitted && <span className="ty-message">Grazie! Ti sei iscritto alla newsletter</span>}
        Cliccando su "Iscriviti" accetti di ricevere la nostra newsletter:
        <RedLink link="/privacy-policy-e-cookies">
          qui puoi leggere come trattiamo i tuoi dati.
        </RedLink>
        <span>
          Puoi cambiare idea quando vuoi: il link per disiscriverti sarà
          all'interno di ogni newsletter.
        </span>
      </Disclaimer>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  margin-top: clamp(2rem, calc(1.76rem + 1.04vw), 3rem);
  form {
    display: flex;
    flex-direction: column;
    column-gap: 3rem;
    row-gap: 1.5rem;
    margin-top: clamp(0.5rem, calc(-0.64rem + 1.79vw), 1.5rem);
    margin-bottom: clamp(1rem, calc(-1.29rem + 3.57vw), 3rem);

    .val-error {
      position: absolute;
      right: 0;
      bottom: -1.8rem;
      color: ${({ theme: { colors } }) => colors.primaryColor};
      font-size: 1rem;
    }

    div {
      display: flex;
      column-gap: 1.25rem;
      row-gap: 0.75rem;
      flex-direction: column;
      position: relative;

      label {
        font-size: clamp(1.15rem, calc(1.03rem + 0.52vw), 1.65rem);
      }

      input {
        width: 100%;
        font-size: 1rem;
        outline: none;
        flex: 1;
        padding: 0.25rem 0;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid ${(props) => (props.white ? "white" : "black")};
        background: transparent;
      }
    }
  }

  @media (min-width: 1024px) {
    form {
      flex-direction: row;
      column-gap: 2rem;
      justify-content: space-between;
      align-items: end;

      div {
        flex-direction: row;
        flex: auto;
        align-items: center;
      }

      div:last-child {
        flex: 1;
      }
    }
  }
`;

const BtnContainer = styled.div`
  display: flex;
  align-self: center;
  margin-top: 2rem;

  span {
    font-size: 1.15rem;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    justify-content: center;
    flex: none !important;
  }

  .ty-message {

  }
`;

const Disclaimer = styled.div`
  margin-top: clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  line-height: 1.5rem;

  & > a {
    text-decoration: underline;
    margin-inline: 3px;
  }

  .ty-message {
    color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  @media (max-width: 768px) {
    & > span {
      display: inline;
    }
  }
`;
