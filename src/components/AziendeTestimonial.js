import { centerContent } from "@/styles/mixins";
import styled from "styled-components";
import DinamicDesktopImages from "./DinamicImages";
import { useMemo } from "react";

export default function AziendeTestimonial({mt, titolo, data, widthLogos = "6.5rem", heightLogos = "4rem"}) {
    const loghiAziende = useMemo(() => {
        if(data[0].attributes?.url) {
          return data.map(logo => logo.attributes.url)
        } else {
          return data
        }
    }, [data])
    return (
      <Container mt={mt}>
        {titolo ? <h3>{titolo ? titolo : "Aziende che ci hanno scelto"}</h3> : ''}
        <DinamicDesktopImages imgs={loghiAziende} widthLogos={widthLogos} heightLogos={heightLogos}/>
      </Container>    
    )
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  
  h3 {
    ${centerContent}
    color: ${({ theme: { colors } }) => colors.primaryColor};
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_paragraph};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
`;