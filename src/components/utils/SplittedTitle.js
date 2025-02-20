import React, { useEffect } from 'react'
import { gsap } from 'gsap';
import styled from 'styled-components';
import Talk from '@/components/utils/Talk'

export default function SplittedTitle({firstHalf, secondHalf}) {

    useEffect(()=>{
        gsap.to(`.titleRef`, {
            delay: "-1.2",
            y: 0,
            duration: 1,
            ease: "redEase",
        });
        gsap.to(`.spanRef`, {
            delay: "-1",
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "redEase",
            stagger: 0.1,
        });
    }, []);

  return (
    <Text>
        <h1 className='titleRef'>
          <HalfH1>{firstHalf}</HalfH1>
          <img className="talk-img" src="/logo-talk.webp" alt="Talk text"></img>
          <span className='hide'>Talk</span>
          {/* <Talk color={"primaryColor"} /> */}
        </h1>
    </Text>
  )
}


const Text = styled.div`
  padding-left: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  padding-right: clamp(1rem,calc(0.48rem + 2.2vw),3.13rem);
  position: absolute;
  width: 100%;
  bottom: 3rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;

    & > h1 {
      transform: translateY(120%);
    }
  }

  h1 {
    display: flex;
    align-items: flex-end;
    img.talk-img {
      display: block !important;
      width: clamp(12.00rem, calc(9.20rem + 14.00vw), 26.00rem);
      position: relative !important;
      top: 30px;
      right: clamp(1.25rem, calc(1.00rem + 1.25vw), 2.50rem);
    }
  }

  span.hide {
    display: none;
  }
`;

const HalfH1 = styled.span`
  text-transform: uppercase;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
  font-family: ${({ theme: { fonts } }) => fonts.main};
  color: ${({ theme: { colors } }) => colors.primaryColor};
  line-height: 0.91em;
  font-weight: 100;
  margin-right: clamp(0.63rem, calc(0.32rem + 1.51vw), 2.19rem);
`;

const HalfSpan = styled.span`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_115_323};
  font-family: ${({ theme: { fonts } }) => fonts.handwritten};

  color: transparent;
  text-shadow: 0px 0px ${({ theme: { colors } }) => colors.primaryColor};
  `;

