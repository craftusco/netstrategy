import { centerContent } from "@/styles/mixins";
import styled from "styled-components";

//valueTYpe serve a cambiare il font del valore grosso in rosso di questo componente
//a volte può essere un testo a volte un valroe unico, a seconda dei due casi ci sono due font diveri
export default function Results({
  data: results,
  mt,
  valueType, //può essere "figure" o "text"
}) {
  if(!results)
    return (<></>)
   return (
    <Container mt={mt}>
      {results.map(({ tipologia, titolo, descrizione }, idx) => (
        <Result key={idx}>
          <LeftWrapper>
            {tipologia && <Text>
              <span>{tipologia}</span>
            </Text>}
            <Value valueType={valueType}>
              <span>{titolo}</span>
            </Value>
          </LeftWrapper>
          <RightWrapper>
            <Desc>
              <p>{descrizione}</p>
            </Desc>
          </RightWrapper>
        </Result>
      ))}
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  & > div:last-child {
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  }
`;

const Result = styled.div`
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding-top: clamp(2rem, calc(1.76rem + 1.04vw), 3rem);
  padding-bottom: clamp(2rem, calc(1.76rem + 1.04vw), 3rem);
  color: ${({ theme: { colors } }) => colors.primaryColor};
  display: flex;
  column-gap: 3rem;
  align-items: center;
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: ${({ theme: { fontSizes } }) => fontSizes.size_16_28};
  }
`;

const Value = styled.div`
  width: 80%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  font-size: ${(props) =>
    props.valueType == "grande"
      ? "clamp(4.38rem, calc(1.64rem + 11.65vw), 15.63rem)"
      : "clamp(3.50rem, calc(2.53rem + 4.14vw), 7.50rem)"};
  line-height: 0.91em;
  font-family: ${({ theme: { fonts } }) => fonts.main};
  text-transform: uppercase;
`;

const Text = styled.div`
  width: 20%;
  @media (max-width: 1024px) {
    width: 100%;
  }
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20};
  margin-bottom: calc(
    clamp(0.5rem, calc(0.33rem + 0.71vw), 1.19rem) * -1
  ); // -8px → -19px
`;

const Desc = styled.div``;

const LeftWrapper = styled.div`
  width: 55%;
  display: flex;
  gap: clamp(1rem, calc(0.82rem + 0.78vw), 1.75rem);
  flex-grow: 1;
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
`;
const RightWrapper = styled.div`
  width: 45%;
  color: ${({ theme: { colors } }) => colors.blackColorV2};
  @media (max-width: 1024px) {
    width: 80%;
    margin-left: auto;
  }
`;
