import { centerContent } from "@/styles/mixins";
import splitText from "@/utils/splitText";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import React from "react";
import { gsap } from "gsap";

export default function HeadingExpandable({ data, mt }) {
  // Expandable list animations
  const expand = (target) => {
    if (target.getAttribute("data-expanded") === "false") {
      gsap.to(target, {
        marginBottom: "1.5rem",
        height: `auto`,
        duration: 0.4,
        ease: "easeIn",
      });
      target.setAttribute("data-expanded", "true");
    } else {
      gsap.to(target, {
        marginBottom: "0",
        height: 0,
        duration: 0.4,
        ease: "easeIn",
      });
      target.setAttribute("data-expanded", "false");
    }
  };

  return (
    <Container mt={mt}>
      <Title>
        <h2>{splitText(data.title)}</h2>
      </Title>
      <Text>
        <h3>{splitText(data.subtitle)}</h3>
        <ul>
          {data.list.map(({ title, paragraph }, i) => (
            <li key={i} onClick={(e) => expand(e.currentTarget.lastChild)}>
              <h4>{title}</h4>
              <p data-expanded={false}>{paragraph}</p>
            </li>
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
    margin-top: clamp(1rem, calc(-1.18rem + 9.32vw), 10rem); // 16px → 160px
    list-style-type: none;
    li {
      border-bottom: 1px solid;
      padding-top: 1.5rem;
      cursor: pointer;
      h4 {
        text-transform: uppercase;
        font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_40};
        font-family: ${({ theme: { fonts } }) => fonts.medium};
      }
      p {
        height: 0;
        overflow: hidden;
        margin-left: 0;
        margin-top: 1.5rem;
        width: 100%;
        line-height: 1.4em;
      }
    }
  }

  @media (min-width: 1280px) {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      margin-top: 0;
    }
  }
`;
