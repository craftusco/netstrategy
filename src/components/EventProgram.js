import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import React from "react";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PrimaryButton from "./utils/PrimaryButton";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/all";
import moment from "moment";

gsap.registerPlugin(ScrollToPlugin)

export default function EventProgram({ data, notPast = false, mt }) {

  const list = data.map( el => {
    return {
      ...el,
      get orario(){
        return moment(el.orario, 'h:m').format('HH.mm')
      }
    }
  })

  return (
    <Container mt={mt} className="program-container-ref">
      <List>
        {list.map((el, i) => (
          <Item key={i}>
            <span>{el.orario}</span>
            <p>{splitText(el.descrizione)}</p>
          </Item>
        ))}
      </List>
      {/* Cta */}
      {notPast && <ButtonContainer onClick={() => { gsap.to(window, {duration: 1, scrollTo: '#contact', ease:'Power3.easeOut'});}}>
        <PrimaryButton>Iscriviti</PrimaryButton>
      </ButtonContainer>}
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
  margin-top: ${props => props.mt};
  @media (min-width: 992px) {
    margin-top: unset;
  }
`;

// List
const List = styled.div`
  border-top: 1px solid black;
  @media (min-width: 992px) {
    border-top: none;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: clamp(1.50rem, calc(1.60rem + -0.48vw), 1.00rem);
  border-bottom: 1px solid grey;
  padding-block: clamp(2.50rem, calc(0.96rem + 2.05vw), 3.50rem);

  p{
    @media (min-width: 768px) {
      width: 60%;
    }
  }

  & > span {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_70_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    display: flex;
    vertical-align: flex-end;

    @media (min-width: 768px) {
      width: 40%;
      display: flex;
      align-items: flex-end;
      line-height: 0.75em;
    }
  }

  p {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
    font-family: ${({ theme: { fonts } }) => fonts.regular};
    line-height: 1.1;

    span {
      display: block;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    p {
      align-self: end;
    }
  }
`;

// Cta
const ButtonContainer = styled.div`
  margin-top: clamp(2.50rem, calc(0.96rem + 2.05vw), 3.50rem); // 40px → 56px;
  display: flex;
  justify-content: center;
  font-family: ${({ theme: { fonts } }) => fonts.regular} !important;

  @media (min-width: 992px) {
    padding-right: clamp(1.56rem, calc(1.19rem + 1.87vw), 3.50rem); // 25px → 56px;
    justify-content: flex-end;
  }

`;
