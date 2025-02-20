import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import Image from "next/image";
import RedLink from "./utils/RedLink";
import { changeColor } from "../../redux/customCursorSlice";
import { useDispatch } from "react-redux";
import getPath from "@/utils/getPath";

export default function ProjectBig({ data, index }) {
  const dispatch = useDispatch();

  if (!data) return <></>;

  const cats = data.categorie.data;
  let categories = "";
  cats.forEach((el, i) => {
    const dot = cats.length !== i + 1 ? " . " : "";
    categories += ` ${el.attributes.nome} ${dot}`;
  });

  return (
    <Content
      onMouseEnter={(e) => {
        dispatch(changeColor("scaleUp"));
      }}
      onMouseLeave={(e) => {
        dispatch(changeColor("scaleDown"));
      }}
    >
      <RedLink
        img={getPath(data.thumbnail_success.immagine.data.attributes.url)}
        link={getPath(`/successi/${data.slug}`, true)}
      >
        <Info>
          <Title index={index}>
            <h2>
              <RedArrow src="/red_arrow.svg" />
              {data.thumbnail_success.nome}
            </h2>
            <Services>{categories}</Services>
          </Title>
          <div className="title">{data.thumbnail_success.description}</div>
        </Info>
        <ImageContainer>
          <Image
            src={getPath(data.thumbnail_success.immagine.data.attributes.url)}
            alt={data?.thumbnail_success?.immagine?.data.attributes?.alternativeText ? data?.thumbnail_success?.immagine?.data.attributes?.alternativeText : data.thumbnail_success.nome ? `Immagine rappresentativa progetto ${data.thumbnail_success.nome}` : "Immagine rappresentativa progetto" }
            fill
            sizes="100%"
          />
        </ImageContainer>
      </RedLink>
    </Content>
  );
}

const RedArrow = styled.img`
  transition: all 350ms ease;
`;

const ImageContainer = styled.div`
  /* padding-left: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  padding-right: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px */
  height: clamp(18rem, calc(8.78rem + 39.35vw), 56rem); // 288px → 896px
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  max-width: 120rem;
  border-radius: 1rem;

  img {
    transition: all 350ms ease;
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 1rem;
  }
`;

const Content = styled.div`
  &:hover {
    ${RedArrow} {
      transform: translate(30%, 30%);
    }
    ${ImageContainer} img {
      scale: 1.1;
    }
  }
`;

// Style
const Info = styled.div`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};

  .title {
    margin-top: clamp(1rem, calc(0.76rem + 1.04vw), 2rem);
    margin-bottom: clamp(1.5rem, calc(0.51rem + 4.6vw), 4.6rem);
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
  }
`;

const Title = styled.div`
  border-top: ${(props) => (props.index !== 0 ? `1px solid #fc1333` : "")};
  padding-top: ${(props) => (props.index !== 0 ? `1rem` : "0")};
  display: flex;
  justify-content: space-between;
  color: ${({ theme: { colors } }) => colors.primaryColor};

  h2 {
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30}; */
    span {
      margin-right: 1rem;
    }
  }

  img {
    transform: translateY(25%);
    width: 25px;
    margin-right: 5px;
  }

  @media (min-width: 800px) {
    img {
      width: 50px;
      margin-right: 30px;
      transform: translateY(25%);
    }
    border-top: 0;
    padding-top: 0;
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
    padding-bottom: clamp(1rem, calc(0.67rem + 0.69vw), 1.5rem); // 16px → 24px
  }
`;

const Services = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  display: none;

  @media (min-width: 800px) {
    display: inline-block;
    margin-top: auto;
  }
`;
