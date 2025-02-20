import { centerContent } from "@/styles/mixins";
import styled from "styled-components";

const months = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

export default function TalksFilter({ mt }) {
  return (
    <Container mt={mt}>
      <ContentMobile>
        <span>All</span>
        <select>
          {months.map((e, i) => (
            <option value={e} key={i}>{e}</option>
          ))}
        </select>
      </ContentMobile>
      <ContentDesktopContainer>
        <ContentDesktop>
          <span>All</span>
          <ul>
            {months.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </ContentDesktop>
      </ContentDesktopContainer>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
`;

const ContentMobile = styled.div`
  border-top: 1px solid;
  display: flex;
  justify-content: space-between;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  padding-top: clamp(0.63rem, calc(0.29rem + 1.42vw), 2rem); // 10px → 32px

  select {
    border: 0px;
    background-color: transparent;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ContentDesktopContainer = styled.div`
  display: none;
  border-top: 1px solid;
  border-bottom: 1px solid #cccccc;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const ContentDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;

  span,
  li {
    padding: clamp(0.63rem, calc(0.29rem + 1.42vw), 2rem) 2rem;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  & > span {
    border-bottom: 1px solid red;
  }

  ul {
    display: flex;
    width: 55%;
    overflow-x: scroll;
    list-style-type: none;

    li {
      display: flex;
      column-gap: 0.75rem;
      align-items: center;
    }
  }
`;
