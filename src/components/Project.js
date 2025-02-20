import styled from "styled-components";
import Image from "next/image";
import RedLink from "./utils/RedLink";
import { changeColor } from "../../redux/customCursorSlice";
import { useDispatch } from "react-redux";
import getPath from "@/utils/getPath";

export default function Project({ data, index }) {
  if (!data) return <></>;

  const cats = data.categorie.data;
  let categories = "";
  cats.forEach((el, i) => {
    const dot = cats.length !== i + 1 ? " . " : "";
    categories += ` ${el.attributes.nome} ${dot}`;
  });

  const dispatch = useDispatch();

  return (
    <div
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
        <Content index={index}>
          <Info>
            <h2>
              <RedArrow src="/red_arrow.svg" />
              {data.thumbnail_success.nome}
            </h2>
            <div className="title">{data.thumbnail_success.description}</div>
            <Services>{categories}</Services>
          </Info>
          <ImageContainer>
            <Image
              src={getPath(data.thumbnail_success.immagine.data.attributes.url)}
              alt={data?.thumbnail_success?.immagine?.data.attributes?.alternativeText ? data?.thumbnail_success?.immagine?.data.attributes?.alternativeText : data.thumbnail_success.nome ? `Immagine rappresentativa progetto ${data.thumbnail_success.nome}` : "Immagine rappresentativa progetto" }
              fill
              sizes="100%"
            />
          </ImageContainer>
        </Content>
      </RedLink>
    </div>
  );
}

const RedArrow = styled.img`
  transition: all 350ms ease;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  aspect-ratio: 4/2.9;
  margin-bottom: 25px;

  img {
    transition: all 350ms ease;
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 1rem;
  }

  @media (min-width: 800px) {
    margin-bottom: 0px;
    aspect-ratio: 4/3.5;
    width: 50%;
    margin-top: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 800px) {
    gap: 3rem;
    border-top: ${(props) => (props.index !== 0 ? `1px solid #fc1333` : "")};
    border-top: 0;
    padding-top: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  &:hover {
    ${RedArrow} {
      transform: translate(30%, 30%);
    }

    ${ImageContainer} img {
      scale: 1.05;
    }
  }
`;

const Info = styled.div`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_30};

  h2 {
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-family: ${({ theme: { fonts } }) => fonts.regular};
    text-transform: none;
    /* font-size: ${({ theme: { fontSizes } }) => fontSizes.size_12_20} */
    span {
      margin-right: 1rem;
    }
  }

  .title {
    margin-top: clamp(1rem, calc(0.88rem + 0.52vw), 1.5rem); // 16px → 24px
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_25_50};
  }
  img {
    width: 25px;
    margin-right: 5px;
    transform: translateY(25%);
  }

  @media (min-width: 800px) {
    width: 50%;
    order: 2;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    img {
      width: 50px;
      margin-right: 30px;
      transform: translateY(25%);
    }
    h2 {
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
      padding-bottom: clamp(
        1rem,
        calc(0.67rem + 0.69vw),
        1.5rem
      ); // 16px → 24px
    }
  }
`;

const Services = styled.div`
  color: ${({ theme: { colors } }) => colors.primaryColor};
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding-bottom: clamp(1rem, calc(0.67rem + 0.69vw), 1.5rem); // 16px → 24px
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  margin-top: 30px;
  @media (min-width: 800px) {
    display: block;
    margin-top: auto;
  }
`;
