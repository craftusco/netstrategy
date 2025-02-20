import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";

export default function HeadingList({ data, mt }) {
  return (
    <Container mt={mt}>
      <Title>
        <h2>{splitText(data.title)}</h2>
      </Title>
      <Text>
        <h3>{splitText(data.subtitle)}</h3>
        <ul>
          {data.list.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </Text>
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  @media (min-width: 1280px) {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const Title = styled.div`
  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  @media (min-width: 1280px) {
    width: 50%;
  }
`;

const Text = styled.div`
  h3 {
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-weight: 100;
    span {
      display: block;
    }
  }

  ul {
    margin-top: clamp(2rem, calc(1.59rem + 1.77vw), 3rem); // 20.00px → 50.00px;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-self: end;
    li {
      display: flex;
      align-items: center;
      column-gap: 1rem;
      &::before {
        content: "";
        display: inline-block;
        border-radius: 50%;
        background: ${({ theme: { colors } }) => colors.primaryColor};
        min-width: 0.5rem;
        min-height: 0.5rem;
      }
    }
  }

  @media (min-width: 1280px) {
    width: 45%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      margin-top: 0;
    }
  }
`;
