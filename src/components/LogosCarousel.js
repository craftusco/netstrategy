import styled from "styled-components";
import Image from "next/image";
import { Splide, SplideSlide } from '@splidejs/react-splide';

function LogosCarousel(props) {

    const widthLogos = props.width
    const heightLogos = props.height

    return (
        <>
            <Splide
            options={ {
                type: 'loop',
                perPage: 6,
                breakpoints: {
                    991: {
                        perPage: 4
                    },
                    767: {
                        perPage: 2
                    }
                },
                //focus: 'center',
                arrows: false,
                pagination: false,
                pauseOnHover: false,
                autoplay: true
            } }>
            {props.logos.map((e, i) => {
                return(
                <SplideSlide key={i}>
                    <ImgContainer>
                    <Image
                        sizes="100%"
                        alt={"Logo azienda"}
                        key={i}
                        src={e} //getPath(e)
                        fill
                        style={{
                            filter: `${(props.darker) ? 'grayscale(100%) brightness(50%)' : 'grayscale(100%)'}`,
                            minWidth: widthLogos,
                            maxHeight: heightLogos
                        }}
                        // priority
                    />
                    </ImgContainer>
                </SplideSlide>
                )
            })}
            </Splide>
        </>
    )
}

export default LogosCarousel

const ImgContainer = styled.div`
  img {
    object-fit: contain;
    position: relative !important;
    filter: opacity(0.8);
    min-height: 100px;
    max-width: 7.5rem;
    display: block;
    margin: auto;
  }

  @media screen and (max-width:767px) {
    img {
        min-height: 60px !important;
    }
  }
`