import styled from "styled-components";
import RedLink from "./utils/RedLink";
import Arrow from "./utils/Arrow";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";

export default function ProjectSlide({
  img,
  altText,
  title,
  description,
  link,
  iswhite = false,
  category = null,
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
        </ImageContainer>
        <Info>
          <p>
            <Title>
              <Arrow />
              {title}
            </Title>
            <Description iswhite={iswhite}>{description}</Description>
          </p>
        </Info>
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
  margin-top: clamp(1.25rem, calc(1.07rem + 0.78vw), 2rem); // 20px → 32px
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};

  span {
    font-family: ${({ theme: { fonts } }) => fonts.medium};
  }

  p {
    font-family: inherit;

    svg {
      stroke: ${({ theme: { colors } }) => colors.primaryColor};
      margin-right: 0.25rem;
      transition: all 350ms ease;
    }
  }

  @media (min-width: 768px) {
    display: flex;

    p {
      width: 85%;
      margin-left: 1rem;
    }
  }
`;

const Title = styled.span`
  color: ${({ theme: { colors } }) => colors.primaryColor};
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
