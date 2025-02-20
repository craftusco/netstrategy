import styled from "styled-components";
import SearchResult from "./SearchResult";
import splitText from "@/utils/splitText";
import Divider from "./Divider";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import PlusButton from "./utils/PlusButton";
import { useEffect, useState } from "react";
import getPath from "@/utils/getPath";
import { updatePagination } from "../../redux/paginationMenuSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchResultsList({ value, articles }) {
  const dispatch = useDispatch();

  const paginated = useSelector((state) => state.paginationMenuSlice.value)
  const [data, setData] = useState([]);

  useEffect(()=>{
    const d = articles.map(el => {
      const image = el?.attributes?.cover_image ? el.attributes.cover_image : getPath(el?.attributes?.immagine?.data?.attributes?.url)
      return {
        image: image,
        title: el.attributes.titolo,
        link: `/${el.attributes.categoria.data.attributes.slug}/${el.attributes.slug}`,
      }
    })
    setData(d);
  }, [articles])

  const pagination = (e)=>{
    e.preventDefault();
    dispatch(updatePagination({pagination: paginated.pagination + paginated.entry_value}))
  }

  return (
    <>
      <Container>
        <h3>
          {splitText(`Search
      Results`)}
        </h3>
        <List>
          {data.length > 0 ?
            <>
              {data.map(({ image, title, link }, i) => (
                <SearchResult image={image} title={title} link={link} key={i}/>
              ))}
              {paginated.total > paginated.pagination 
              &&
                <PlusContainer>
                  <div onClick={pagination}>
                    <PlusButton  />
                  </div>
                </PlusContainer>
              }
            </>
            :
            <Empty>
              Prova con un'altra ricerca o scrivici!
            </Empty>
          }
        </List>
      </Container>
    </>
  );
}

//! STYLE ---
const Container = styled.div`
  color: white;
  margin-top: 1rem;
  h3 {
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    line-height: 0.8em;
    text-transform: uppercase;

    span {
      display: block;
    }
  }

  @media (min-width: 1280px) {
    display: flex;
  }
`;

const List = styled.div`
  margin-top: 2rem;

  @media (min-width: 600px) {
    margin-left: auto;
  }

  @media (min-width: 1280px) {
    width: 55%;
    margin-left: 10%;
  }

  @media (min-width: 1550px) {
    width: 50%;
  }
`;

const PlusContainer = styled.div`
  margin-top: clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  display: flex;
  justify-content: center;
`;

const Empty = styled.div`
  font-family: ${({ theme: { fonts } }) => fonts.regular};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_20_30}
`;
