import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import splitText from '@/utils/splitText';
import PrimaryButton from './utils/PrimaryButton';
import RedLink from './utils/RedLink';
import { useDispatch } from 'react-redux';
import { changeColor } from '@/../redux/customCursorSlice';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import moment from 'moment';
import getPath from '@/utils/getPath';

gsap.registerPlugin(ScrollTrigger);

export default function Event({ data }) {
  if (!data || !data.hero?.immagine?.data) return <></>;

  const dispatch = useDispatch();
  let [date, setDate] = useState([]);
  let [time, setTime] = useState('');

  const getFormattedDate = (d) => {
    const date = moment(d);
    const day = date.format('DD');
    const month = date.format('MMM.');
    const year = date.format('YYYY');
    return [day, month, year];
  };

  const getTime = (start, end) => {
    const s = moment(start, 'h:m').format('HH:mm');
    const e = moment(end, 'h:m').format('HH:mm');
    return `dalle ${s} alle ${e}`;
  };

  /* card variables */
  date = getFormattedDate(data.data);
  time = getTime(data.orario_inizio, data.orario_fine);

  return (
    <Container className="event-container-ref">
      <Content>
        <Date>
          {date.map((el, i) => {
            return <span key={i}>{el}</span>;
          })}
        </Date>
        <ImageContainer
          full={data.full}
          onMouseEnter={() => {
            dispatch(changeColor('scaleUp'));
          }}
          onMouseLeave={() => {
            dispatch(changeColor('scaleDown'));
          }}
        >
          {
            (data.link_landing_page) ?
              <a href={getPath(data.link_landing_page, true)}>
                <Image
                  src={getPath(data.hero.immagine.data.attributes.url)}
                  alt={
                    data?.hero?.immagine?.data?.attributes?.alternativeText
                      ? data?.hero?.immagine?.data?.attributes?.alternativeText
                      : data.titolo
                      ? `Evento ${data.titolo}`
                      : 'Evento nettalk'
                  }
                  fill
                  sizes="100%"
                />
              </a>
            :
              <RedLink
                img={getPath(data.hero.immagine.data.attributes.url)}
                link={getPath(`/nettalk/${data.slug}`, true)}
              >
                <Image
                  src={getPath(data.hero.immagine.data.attributes.url)}
                  alt={
                    data?.hero?.immagine?.data?.attributes?.alternativeText
                      ? data?.hero?.immagine?.data?.attributes?.alternativeText
                      : data.titolo
                      ? `Evento ${data.titolo}`
                      : 'Evento nettalk'
                  }
                  fill
                  sizes="100%"
                />
              </RedLink>
          }
          {data.full && (
            <img className="event-full-image" src="/logo-full.webp" alt="Logo full"></img>
          )}
        </ImageContainer>
        <Info>
          <div className="info-top">
            <span className="info-main-title">
              <span className="title">{splitText(data.titolo)}</span>
              <span className="subtitle">{splitText(data.sottotitolo)}</span>
            </span>
            {
              (data.link_landing_page) ?
                <a href={getPath(data.link_landing_page, true)}><LinkButton>Scopri di più</LinkButton></a>
              :
                <RedLink
                  img={getPath(data.hero.immagine.data.attributes.url)}
                  link={(data.link_landing_page) ? getPath(data.link_landing_page, true) : getPath(`/nettalk/${data.slug}`, true)}
                >
                  <PrimaryButton>Scopri di più</PrimaryButton>
                </RedLink>
            }
          </div>
          <div className="info-bottom">
            <div>
              <div className="title">DOVE</div>
              <div className="subtitle">{splitText(data.locazione)}</div>
            </div>
            <div>
              <div className="title">QUANDO</div>
              <div className="subtitle">{splitText(time)}</div>
            </div>
          </div>
        </Info>
      </Content>
    </Container>
  );
}

// Style
const Container = styled.div`
  &:last-child > div {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;

const Content = styled.div`
  border-bottom: 1px solid grey;
  padding-block: clamp(2rem, calc(1.51rem + 2.07vw), 4rem);

  @media (min-width: 1024px) {
    display: flex;
    column-gap: 2rem;
  }
`;

const Date = styled.span`
  display: block;
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_250};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  line-height: 0.91em;
  position: relative;
  display: inline-block;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    span {
      display: block;
    }
  }
`;

const ImageContainer = styled.div`
  margin-top: 1rem; //
  overflow: hidden;
  aspect-ratio: 4/2.9;
  position: relative;
  border-radius: 1.5rem;

  @media (min-width: 1024px) {
    aspect-ratio: initial;
  }

  /* &::after {
    content: "Fu l l";
    display: ${(props) => (props.full ? 'block' : 'none')};
    font-family: ${({ theme: { fonts } }) => fonts.handwritten};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_200_500};
    color: transparent;
    text-shadow: 0px 0px ${(props) => props.theme.colors.primaryColor};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-transform: capitalize;
    letter-spacing: calc(clamp(1.56rem, calc(0.90rem + 3.31vw), 5.00rem) * -1);
    white-space: nowrap;
    pointer-events: none;
    
    @media (min-width: 1024px) {
      transform: translate(-50%, -50%) rotate(-20deg);
    }
  } */

  img {
    object-fit: cover;
    object-position: center;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    transition: all 450ms ease;
    &:hover {
      transform: scale(1.05);
    }
  }

  img.event-full-image {
    position: absolute !important;
    top: 0;
    left: 1rem;
    scale: 0.8;
    rotate: -10deg;
    user-select: none;
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    min-width: clamp(26rem, calc(-2.57rem + 44.64vw), 51rem);
    max-width: clamp(26rem, calc(-2.57rem + 44.64vw), 51rem);
    margin-top: 0;
  }
`;

const Info = styled.div`
  margin-top: clamp(1rem, calc(0.42rem + 2.47vw), 2rem);
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  justify-content: space-between;
  overflow: hidden;

  span {
    display: block;
  }
  .info-top {
    display: flex;
    flex-direction: column;
    row-gap: clamp(1.13rem, calc(0.74rem + 1.93vw), 3.13rem);
    /* title */
    span.info-main-title {
      display: block;
      /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50}; */
      font-size: clamp(1.5rem, calc(1.21rem + 1.23vw), 2.69rem);
      font-family: ${({ theme: { fonts } }) => fonts.medium};

      .title {
        color: ${({ theme: { colors } }) => colors.primaryColor};
        text-transform: uppercase;
      }
      .subtitle {
        font-family: ${({ theme: { fonts } }) => fonts.regular};
      }
    }
  }
  .info-bottom {
    text-transform: uppercase;
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
    display: flex;
    flex-direction: column;
    row-gap: clamp(0.75rem, calc(0.47rem + 1.39vw), 2.19rem);
    margin-top: 50px;
    .title {
      color: ${({ theme: { colors } }) => colors.primaryColor};
    }
  }
  p {
    text-transform: uppercase;
    span {
      color: ${({ theme: { colors } }) => colors.primaryColor};
      display: block;
    }
  }

  @media (min-width: 1024px) {
    margin-top: 0;
    /* flex: auto; */
  }
`;

const LinkButton = styled.span`
  border-style: none;
  border: ${(props) =>
    !props.isDisabled
      ? `2px solid ${props.theme.colors.primaryColor}`
      : `2px solid ${props.theme.colors.primaryColor}`};
  display: inline-block;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  color: ${(props) =>
    !props.isDisabled ? "white" : props.theme.colors.primaryColor};
  font-size: 1.2rem;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  background: ${(props) =>
    !props.isDisabled ? props.theme.colors.primaryColor : "none"};
  /* padding: clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem) clamp(3rem, calc(2.51rem + 2.07vw), 5rem); */
  padding: ${({textIsLong}) => textIsLong ? "27px 33px": "clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem) clamp(4.38rem, calc(4.01rem + 1.81vw), 6.25rem)"};
  /* padding: 27px 33px; */
  border-radius: 999px;
  transition: all 0.2s ease-in;
  width: fit-content;
  cursor: ${(props) => (!props.isDisabled ? "pointer" : "not-allowed")};

  &:hover {
    /* background: ${({ theme: { colors } }) => colors.primaryHover}; */
    background: ${(props) =>
      !props.isDisabled ? props.theme.colors.primaryColor : "none"};
  }
`;
