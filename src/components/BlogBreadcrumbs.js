import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import RedLink from "./utils/RedLink";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import getPath from "@/utils/getPath";

export default function BlogBreadcrumbs({
  category,
  imageFromBlogIndex = null,
}) {
  const dispatch = useDispatch();
  const router = useRouter();


  return (
    <Container>
      {/*
       */}
      <span>
        <RedLink
          link={"/blog"}
          img={getPath(
            imageFromBlogIndex
              ? imageFromBlogIndex
              : "/uploads/medium_seo_marketing_netstrategy_card_1_a70ad44c33.jpg"
          )}
        >
          Torna alla lista degli articoli
        </RedLink>
        
      </span>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  margin-top: clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem);
  @media (max-width: 1080px) {
    margin-bottom: 1.5rem;
  }
  
  span {
    font-size: clamp(1.06rem, 1.03rem + 0.19vw, 1.25rem);
    font-weight: 600;
    font-family: NeueMontreal-Medium;
    cursor: pointer;
    letter-spacing: 0.3px;
    text-decoration: underline;
  }
`;
