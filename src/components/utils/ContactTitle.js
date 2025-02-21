import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function StaticTitle({ title, pretitle }) {
  const titleRef = useRef();
  useEffect(() => {
    // Content text animation
    gsap.to(titleRef.current, {
      delay: "-1.2",
      y: 0,
      duration: 1,
      ease: "redEase",
    });

  }, []);

  const router = useRouter();

  return (
    <Text>
      <Title isLong={title?.length > 26}>
        {router.pathname === '/privacy-policy-e-cookies' ? <span className='h1title' ref={titleRef}>{title}</span> : <h1 ref={titleRef}>{title}</h1>}
      </Title>
      <BntSubpillar className='hidden-md' onClick={(e) => {
        e.preventDefault();
        // location.href = "#contact";
        // document.getElementById("contact").scrollIntoView()
        gsap.to(window, {
          duration: .1,
          scrollTo: "#contact",
          ease: "Power3.easeOut",
        })
      }}>
        <div className='subpillar-btn left'>
          {pretitle}
        </div>
        <div className='subpillar-btn right'>
          Contattaci
        </div>
      </BntSubpillar>
    </Text>
  )
}

const Pretitle = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  margin-bottom: 15px;
`;

const BntSubpillar = styled.div`
  display: flex;
  .subpillar-btn{
    cursor: pointer !important;
    background-color: ${({ theme: { colors } }) => colors.blackColorV3};
    color: ${({ theme: { colors } }) => colors.whiteColor};
    padding: 0.85rem 1.2rem;
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left{
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }
  .right{
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: ${({ theme: { colors } }) => colors.primaryColor};
  }

  @media screen and (max-width: 1080px) {
    margin-top: 15px;
  }

  @media screen and (min-width:767px) {
    &.hidden-md {
      display: none !important;
    }
  }
`

const Text = styled.div`
  position: absolute;
  width: 100%;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  padding-left: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  padding-right: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  /* @media (max-width: 600px) {
    bottom: 7rem;
  } */
`;


const Title = styled.div`
  @media screen and (min-width:767px) {
    margin-bottom: 50px;
  }  

  pointer-events: none;
  span {
    display: none;
    color: ${({ theme: { colors } }) => colors.primaryColor};

    @media (min-width: 1280px) {
      display: inline-block;
    }
  }

  @media (min-width: 1280px) {
    & > span {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  span.h1title, h1 {
    font-size: ${({ isLong, theme: { fontSizes } }) => isLong ? fontSizes.size_60_180 : fontSizes.size_60_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    color: ${({ theme: { colors } }) => colors.primaryColor};
    line-height: 0.85em;
    font-weight: 100;
    text-transform: uppercase;
    max-width: 90vw;
    opacity: 1;

    & > span {
      display: block;
    }

    @media (min-width: 1280px) {
      line-height: 0.91em;
      transform: translateY(120%);
    }
  }
`;
