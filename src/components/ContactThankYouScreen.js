import splitText from "@/utils/splitText";
import styled from "styled-components";

export default function ContactThankYouScreen({ data }) {

  
  return (
    // <></>
    <Container>
      <Text>
        <span className="title">{data.title}</span>
        <p>{splitText(data.paragraph)}</p>
      </Text>
    </Container>
  );
}

// Style
const Container = styled.div`
  margin-top: 8rem;
`;

const Text = styled.div`
  text-align: center;
  width: 90%;
  margin-inline: auto;
  color: white;

  span.title {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  p {
    margin-top: 2rem; //
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;

    @media (min-width: 550px) {
      span {
        display: block;
      }
    }
  }
`;
