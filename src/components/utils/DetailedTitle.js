import { centerContent } from "@/styles/mixins";
import React, { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import splitText from "@/utils/splitText";
import { useDispatch } from "react-redux";
import { changeColor } from "@/../redux/customCursorSlice";
import RedLink from "./RedLink";

export default function DetailedTitle({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Content text animation ---------------------------------------------
    gsap.to(`.infoRef`, {
      opacity: 1,
      delay: "-1.2",
      y: 0,
      duration: 1,
      ease: "redEase",
    });
    gsap.to(`.titleRef`, {
      delay: "-1.2",
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "redEase",
    });
  }, []);
  return (
    <Text>
      <Title>
        <InfoText>
          <p><small>ULTIMO AGGIORNAMENTO</small></p>
        </InfoText>
        <HalfTitle>{data.titolo} </HalfTitle>
        <h1 className="titleRef">{data.sottotitolo}</h1>
      </Title>
      <Info className="infoRef">
        {data.info.map((e, i) => (
          <React.Fragment key={i}>
            <InfoBox>
              {e.author ? (
                <AuthorBox>
                  <div className="label">AUTORE: </div>
                  <RedLink link={`/author/${e.slug}`}>
                    <InfoText
                      onMouseEnter={() => {
                        dispatch(changeColor("scaleUp"));
                      }}
                      onMouseLeave={() => {
                        dispatch(changeColor("scaleDown"));
                      }}
                    >
                      {e.author}
                    </InfoText>
                  </RedLink>
                </AuthorBox>
              ) : (
                <>
                  <InfoText>{e.titolo}</InfoText>
                  <div>{e.sottotitolo}</div>
                </>
              )}
            </InfoBox>
          </React.Fragment>
        ))}
      </Info>
    </Text>
  );
}

const Text = styled.div`
  width: 100%;
  bottom: 0;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  color: white;
  padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  padding-bottom: 2rem;
  /* @media (max-width: 600px) {
    padding-bottom: 5rem;
  } */
`;

const Title = styled.div`
  line-height: 1em;
  max-width: 42rem;
  h1 {
    margin-top: 0.5rem;
    font-size: clamp(1.56rem, calc(1.31rem + 1.25vw), 2.81rem);
    line-height: clamp(1.56rem, calc(1.31rem + 1.25vw), 2.81rem);
    font-family: ${({ theme: { fonts } }) => fonts.medium};

    @media (min-width: 768px) {
      & > span {
        display: block;
      }
    }

    @media (min-width: 1280px) {
      transform: translateY(200%);
      opacity: 0;
    }
  }
`;

const HalfTitle = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  & > span {
    display: block;
  }
`;

const Info = styled.div`
  /* display: grid;
  justify-content: space-between; */

  line-height: 1.1;
  display: flex;
  column-gap: 1.5rem;
  justify-content: space-between;
  margin-top: clamp(1rem, calc(0.51rem + 2.07vw), 3rem);
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20};
  padding: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem) 0;

  span {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    display: block;
  }

  & > div:first-child {
    display: none;
  }

  & > div:last-child {
    text-align: right;
  }

  @media (min-width: 768px) {
    & > div:first-child {
      display: inline-block;
    }
    & > div:last-child {
      text-align: left;
    }
  }

  @media (min-width: 1280px) {
    transform: translateY(120%);
  }
`;

const InfoBox = styled.div`
  @media (min-width: 1280px) {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-end !important;
    min-width: 400px;
  }
`;

const InfoText = styled.span`
  text-transform: uppercase;
  color: ${({ theme: { colors } }) => colors.primaryColor};
`;

const AuthorBox = styled.div`
  display: flex !important;
  gap: 3px;

  .label {
    margin-right: 0.25rem;
  }
`;
