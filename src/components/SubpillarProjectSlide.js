import styled from "styled-components";
import RedLink from "./utils/RedLink";
import Arrow from "./utils/Arrow";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";

export default function SubpillarProjectSlide({
  img,
  altText,
  title,
  description,
  link,
  iswhite = false,
  category = null,
  metrics = null
}) {
  const dispatch = useDispatch();
  return (
    <RedLink img={img} link={link}>
      <Slider
        onMouseEnter={(e) => {
          dispatch(changeColor("scaleUp"));
        }}
        onMouseLeave={(e) => {
          dispatch(changeColor("scaleDown"));
        }}
      >
        <ImageContainer>
          <Image
            src={img}
            alt={altText ? altText : title ? `Progetto ${title}` : "Progetto"}
            fill
            sizes="100%"
            quality={75}
          />
          {category && <CategoryLabel>{category.toUpperCase()}</CategoryLabel>}
          { (metrics) ?
              <>
                <CardWrapper>
                  <Info className="in-metrics-title">
                    <p>
                      <Title>
                        <Arrow />
                        {title}
                      </Title>
                      { (!metrics[0].nome) ? <span className="min-h-96 sp-mb"><Description iswhite={true}>{description}</Description></span> : '' }
                    </p>
                  </Info>
                  <MetricsWrapper>
                    {
                      metrics.map((el, i) => {
                        return(
                          (el.nome) ?
                            <div key={i}>
                              <MetricContainer key={i} className={(i === 1) ? 'middle-borders' : ''}>
                                <MetricNumber>{el.valore}</MetricNumber>
                                <Description iswhite={true}>{el.nome}</Description>
                              </MetricContainer>
                            </div>
                          :
                            ''
                        )
                      })
                    }
                  </MetricsWrapper>
                </CardWrapper>
              </>
          : ''
          }
          <Overlay>
            <img
              src='/assets/sfumatura-hover.png'
              alt='Sfumatura hover'
              className="hover"
            />
          </Overlay>
          <Overlay>
            <img
              src='/assets/sfumatura-hover-mb.png'
              alt='Sfumatura hover'
              className="hover-mb"
            />
          </Overlay>
        </ImageContainer>
      </Slider>
    </RedLink>
  );
}

// Style
const Slider = styled.div`
  margin-top: clamp(2rem, calc(1.03rem + 4.14vw), 6rem);
  /* min-width: clamp(
    18.75rem,
    calc(16.1rem + 13.25vw),
    32rem
  ); // new 300px → 512px - old 256px → 512px
  width: clamp(18.75rem, calc(16.1rem + 13.25vw), 32rem);
  max-width: clamp(18.75rem, calc(16.1rem + 13.25vw), 32rem); */
  width: min(450px, 80vw);
  margin-right: 15px;
  &:hover {
    svg {
      transform: translate(4px, 2px);
    }
  }
`;

const ImageContainer = styled.div`
  /* min-height: clamp(24.13rem, calc(20.75rem + 16.88vw), 41.00rem); // new 386px → 656px- old 336px → 656px
  height: clamp(24.13rem, calc(20.75rem + 16.88vw), 41.00rem); */
  /* height: 60vh;
  max-height: 600px; */
  width: min(450px, 80vw);
  height: 60vh;
  max-height: calc(200px + 50vw);
  overflow: hidden;
  border-radius: 1.5rem;
  position: relative;
  flex-grow: 1;

  img {
    object-fit: cover;
    top: 0;
    /* position: relative !important; */
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin-top: clamp(1.25rem, calc(1.07rem + 0.78vw), 2rem); // 20px → 32px
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  z-index: 2;

  span {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  p {
    font-family: inherit;

    svg {
      //stroke: ${({ theme: { colors } }) => colors.primaryColor};
      stroke: #ffffff;
      margin-right: 0.25rem;
      transition: all 350ms ease;
    }
  }

  @media (min-width: 768px) {
    display: flex;

    p {
      width: 100%;
      //margin-left: 1rem;
    }
  }

  &.in-metrics-title {
    position: relative;
  }

  @media screen and (max-width:767px) {
    .sp-mb {
      margin-bottom: 7px;
    }
  }
`;

const Title = styled.span`
  //color: ${({ theme: { colors } }) => colors.primaryColor};
  color: #ffffff;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_22_28};
  margin-bottom: 0.5rem;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  display: flex;
`;

const Description = styled.span`
  color: ${(props) => (props.iswhite ? "white" : "black")};
`;

const CategoryLabel = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  text-align: center;
  padding: 0.75rem 0;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  color: ${({ theme: { colors } }) => colors.whiteColor};
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;

  img {
    mix-blend-mode: multiply;
  }
  
  .hover-mb {
    display: none;
  }

  @media screen and (max-width:767px) {
    .hover {
      display: none;
    }

    .hover-mb {
      display: block;
    }
  }
`

const MetricsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;

  @media screen and (max-width:767px) {
    display: block;
  }
`

const MetricNumber = styled.div`
  width: 100%;
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-weight: 100;
  font-family: Akkordeon-Nine;
  font-size: 35px;
`

const MetricContainer = styled.div`
  min-height: 96px;
  width: 130px;

  @media screen and (max-width:767px) {
    min-height: auto;
    display: flex;
    align-items: center;
    width: 100%;

    div {
      width: auto !important;
      margin-right: 10px !important;
    }

    &.min-h-96 {
      min-height: auto;
    }
  }

  &.middle-borders {
    border: 2px solid ${({ theme: { colors } }) => colors.primaryColor};
    border-top-width: 0px;
    border-bottom-width: 0px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    margin-left: 10px;
  }

  @media screen and (max-width:767px) {
    &.middle-borders {
      border: 0px;
      margin: 0px;
      padding: 0px;s
    }
  }

  span {
    font-weight: 100;
    font-size: 17px;
    line-height: clamp(1.38rem, calc(1.33rem + 0.25vw), 1.63rem);
  }

  @media screen and (max-width:767px) {
    span {
      font-size: 16px !important;
    }
  }
`

const CardWrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: 15px;
  padding: 0px 15px;
  z-index: 2;

  .min-h-96 {
    min-height: 96px;
    display: block;
  }

  @media screen and (max-width:767px) {
    .min-h-96 {
      min-height: auto !important;
    }
  }
`