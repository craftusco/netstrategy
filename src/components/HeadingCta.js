import { centerContent, lhCrop } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import PrimaryButton from "./utils/PrimaryButton";

export default function HeadingCta({ data, mt }) {
  return (
    <Container mt={mt}>
      <Title>
        <h2>{splitText(data.title)}</h2>
        <DesktopCta>
          <PrimaryButton>{data.cta}</PrimaryButton>
        </DesktopCta>
      </Title>
      <Text>
        <h3>{splitText(data.subtitle)}</h3>
        {data.paragraph ? (
          <p>
            <ReactMarkdown
              components={{
                p: React.Fragment,
              }}
            >
              {data.paragraph}
            </ReactMarkdown>
          </p>
        ) : null}
      </Text>
      <MobileCta>
        <PrimaryButton>{data.cta}</PrimaryButton>
      </MobileCta>
    </Container>
  );
}

// Style
const Container = styled.div`
  ${centerContent}
  margin-top: ${(props) => props.mt};

  @media (min-width: 1280px) {
    display: flex;
    flex-direction: row;
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
    display: inline;
  }

  span {
    display: block;
  }

  @media (min-width: 1280px) {
    width: 50%;

    span {
      display: inline;
    }
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

  p {
    margin-top: 2rem;
    width: 80%;
    margin-left: auto;
  }

  @media (min-width: 1280px) {
    width: 50%;
    display: flex;
    flex-direction: ${(props) =>
      props.upsideDown ? "column-reverse" : "column"};
    justify-content: space-between;

    h3 {
      margin-top: 0;
    }

    p {
      margin-top: 0;
      width: 90%;
      margin-left: 0;
    }
  }
`;

const DesktopCta = styled.div`
  display: none;

  @media (min-width: 1280px) {
    display: inline;
    margin-left: 4rem;
  }
`;

const MobileCta = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  @media (min-width: 1280px) {
    display: none;
  }
`;
