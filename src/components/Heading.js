import { centerContent } from '@/styles/mixins';
import splitText from '@/utils/splitText';
import styled from 'styled-components';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import React, { useState, useEffect } from 'react';
import PrimaryButton from './utils/PrimaryButton';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import RedLink from './utils/RedLink';
import getPath from '@/utils/getPath';
import { useRef } from 'react';
import dataRequest from '@/utils/dataRequest';

gsap.registerPlugin(ScrollToPlugin);

//! COMPONENT
export default function Heading({
  data,
  mt,
  is_culture = false,
  children,
  isWhite = false,
  centerContainer = true,
  subtitleH3 = false,
}) {
  if (!data) return;

  const [windowWidth, setWindowWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const h2Ref = useRef();
  const pRef = useRef();
  const subtitle = useRef();
  const btnRef = useRef();
  const containerRef = useRef();

  const [response, setResponse] = useState();
  const [imgBottone, setImgBottone] = useState('');

  const fetchData = async (urls) => {
    const d = await dataRequest(urls);
    setResponse(d);
  };

  useEffect(() => {
    let HeadingCtx = gsap.context(() => {
      gsap.from([h2Ref.current, subtitle.current, pRef.current, btnRef.current], {
        y: '45%',
        ease: 'easeInOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: '0% 150%',
          end: 'center center',
          scrub: 1.5,
        },
      });
    }, containerRef.current);
    return () => HeadingCtx.revert();
  }, []);

  useEffect(() => {
    if (data.bottone && data.bottone.strapi_api_id) {
      const urls = [
        {
          name: data.bottone.strapi_api_id,
          url: `https://www.netstrategy.it/api/${data.bottone.strapi_api_id}?populate=deep,3`,
        },
      ];
      fetchData(urls).catch(console.error);
    }
  }, [data]);

  useEffect(() => {
    if (data.bottone && data.bottone.strapi_api_id && typeof response != 'undefined') {
      setImgBottone(
        getPath(
          response[`${data.bottone.strapi_api_id}`].attributes.hero.immagine.data.attributes.url
        )
      );
    }
  }, [response]);

  //! JSX
  return (
    <Container
      ref={containerRef}
      mt={mt}
      reverse={data.rovesciato}
      centerContainer={centerContainer}
    >
      <Title
        ref={h2Ref}
        titleAlign={data.allineamento_titolo}
        isWhite={isWhite}
        isSticky={data.paragrafo ? data.paragrafo.length > 800 : false}
      >
        {is_culture ? <h1>{splitText(data.titolo)}</h1> : <h2>{splitText(data.titolo)}</h2>}
      </Title>
      {data.bottone || data.sottotitolo || data.paragrafo ? (
        <Text
          alignDown={data.allinea_sotto}
          upsideDown={data.sottosopra}
          centerVertically={data.centra_verticalmente}
          show={data.sottotitolo || data.paragrafo}
        >
          {data.sottotitolo &&
            (subtitleH3 ? (
              <span className="h3title" ref={subtitle}>
                {splitText(data.sottotitolo)}
              </span>
            ) : (
              <h3 ref={subtitle}>{splitText(data.sottotitolo)}</h3>
            ))}
          {data.paragrafo ? (
            <div ref={pRef} className="paragraph">
              <ReactMarkdown children={data.paragrafo} />
            </div>
          ) : null}

          <div ref={btnRef}>
            {data.bottone && data.bottone.is_contact === false ? (
              <ButtonContainer btnAlign={data.allineamento_bottone}>
                <RedLink img={imgBottone} link={getPath(data.bottone.url, true)}>
                  <PrimaryButton>{data.bottone.testo}</PrimaryButton>
                </RedLink>
              </ButtonContainer>
            ) : (
              data.bottone && (
                <ButtonContainer
                  onClick={() =>
                    gsap.to(window, {
                      duration: 0.1,
                      scrollTo: '#contact',
                      ease: 'Power3.easeOut',
                    })
                  }
                  btnAlign={data.allineamento_bottone}
                >
                  <PrimaryButton href="#contact">{data.bottone.testo}</PrimaryButton>
                </ButtonContainer>
              )
            )}
          </div>

          {children}
        </Text>
      ) : (
        ''
      )}
    </Container>
  );
}

// Style
const Container = styled.div`
  margin-top: ${(props) => props.mt};
  ${({ centerContainer }) => (centerContainer ? centerContent : '')}

  @media (min-width: 1280px) {
    display: flex;
    justify-content: space-between;
    flex-direction: ${(props) => (props.reverse ? 'row-reverse' : 'row')};
  }
`;

const Title = styled.div`
  h1,
  h2 {
    color: ${(props) => (!props.isWhite ? props.theme.colors.primaryColor : 'white')};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_66_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;

    span {
      display: block;
    }
  }

  @media (min-width: 1280px) {
    text-align: ${({ titleAlign }) => {
      return titleAlign;
    }};
    width: ${(props) => (props.reverse ? '55%' : '45%')};
    h2 {
      ${({ isSticky }) => {
        return isSticky ? `position: sticky; top: 7rem;` : '';
      }}
    }
  }

  @media (max-width: 600px) {
    h1,
    h2 {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

const Text = styled.div`
  justify-content: ${(props) => (props.centerVertically ? 'center' : 'space-between')};
  gap: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};
  span.h3title,
  h3 {
    display: block;
    margin-top: 2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_50};
    font-weight: 100;
    max-width: 45rem;
    span {
      display: block;
      margin-bottom: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .paragraph {
    margin-top: ${({ show }) => (show ? '4rem' : '0')};
    font-size: clamp(1rem, calc(0.94rem + 0.26vw), 1.25rem);
    line-height: clamp(1.56rem, calc(1.49rem + 0.32vw), 1.88rem);
  }

  p {
    width: 100%;
    margin-left: auto;
    margin-bottom: 1.5rem;
  }

  ul {
      list-style-position: inside;
  }

  @media (min-width: 1280px) {
    width: ${(props) => (props.reverse ? '55%' : '45%')};
    display: flex;
    flex-direction: ${(props) => (props.upsideDown ? 'column-reverse' : 'column')};
    margin-top: ${(props) => (props.alignDown ? '150px' : '0px')};
    /* justify-content: space-between; */

    h3 {
      margin-top: 0;
      /* margin-bottom: ${(props) => (props.upsideDown ? '-3rem' : '0')}; */
    }

    p {
      margin-top: 0;
      width: 90%;
      margin-left: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  button {
    padding: clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem)
      clamp(1.25rem, -0.0658rem + 5.2632cqi, 6.25rem);
  }
  width: 100%;
  margin-top: 50px;
  display: flex;
  margin-left: auto;
  /* justify-content: flex-start; */
  justify-content: ${({ btnAlign }) => {
    if (btnAlign == 'left') return 'flex-start';
    else if (btnAlign == 'center') return 'center';
    else if (btnAlign == 'right') return 'flex-end';
    else return 'flex-start';
  }};
  @media (min-width: 1280px) {
    margin-left: unset;
    margin-top: unset;
    width: 90%;
  }
  @media (max-width: 600px) {
    justify-content: center;
    & button {
      width: fit-content;
      padding: clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem)
        clamp(4.38rem, calc(4.01rem + 1.81vw), 6.25rem);
    }
  }
`;

const BtnContainerMobile = styled.div`
  margin-top: clamp(0rem, calc(-0.83rem + 3.54vw), 2rem); // 0px → 32px
  display: flex;
  justify-content: center;

  @media (min-width: 1280px) {
    display: none;
  }
`;
