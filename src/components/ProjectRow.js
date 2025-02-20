import React, { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { changeColor } from "../../redux/customCursorSlice";
import { useRouter } from "next/router";
import { redScreenLoader } from "../../redux/animationsSlice";
import { Flip, CustomEase, ScrollTrigger } from "gsap/all";
import getPath from "@/utils/getPath";
import { centerContent } from "@/styles/mixins";
gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function ProjectRow({ data, isLast }) {
  if (!data) return <></>;

  const dispatch = useDispatch();
  const router = useRouter();
  const refImage = useRef();
  const refImageContainer = useRef();
  const redBackImageFullRef = useRef();
  const redBackImage = useRef();
  const imageFull = useRef();
  const titoletto = data.thumbnail_success.titoletto
    ? data.thumbnail_success.titoletto.split(" ")
    : [];
  const cats = data.categorie.data;
  let categories = "";
  cats.forEach((el, i) => {
    const dot = cats.length !== i + 1 ? " . " : "";
    categories += ` ${el.attributes.nome} ${dot}`;
  });

  //! HANDLE MOUSE ENTER ----
  const handleMouseEnter = (e) => {
    // change custom cursor
    dispatch(changeColor("scaleUp"));

    // handle red
    gsap.set(redBackImage.current, {
      y: "-50%",
    });
    gsap.to(redBackImage.current, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });

    // image container scale
    gsap.set(refImageContainer.current, {
      y: "-50%",
    });
    gsap.to(refImageContainer.current, {
      scale: 1.25,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // // image scale
    gsap.to(refImage.current, {
      scale: 1,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
  };

  //! HANDLE MOUSE LEAVE ----
  const handleMouseLeave = (e) => {
    // change custom cursor
    dispatch(changeColor("scaleDown"));

    // Red scale
    gsap.to(redBackImage.current, {
      scale: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });

    // image container scale
    gsap.to(refImageContainer.current, {
      scale: 0,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
    // image scale
    gsap.to(refImage.current, {
      scale: 2,
      delay: 0.2,
      duration: 0.8,
      ease: "easeIn",
    });
  };
  // first element child img
  // image - image-container
  //! HANDLE CLICK TRANSITION ----
  const handleClick = (e, link, image) => {
    // Desktop
    if (window.innerWidth >= 1280) {
      // Prevent next link
      e.preventDefault();
      // Red to full screen

      const redState = Flip.getState([
        redBackImage.current,
        redBackImageFullRef.current,
      ]);

      gsap.set(redBackImageFullRef.current, {
        display: "block",
      });

      Flip.from(redState, {
        duration: 1,
        absolute: true,
        ease: "redEase",
      });

      // image to center
      const imageState = Flip.getState([
        imageFull.current,
        refImageContainer.current,
      ]);

      gsap.set(refImageContainer.current, {
        display: "none",
      });

      gsap.set(imageFull.current, {
        display: "block",
      });

      Flip.from(imageState, {
        duration: 1,
        absolute: true,
        ease: "redEase",
        // push to new page
        onComplete: () => {
          router.push(getPath(`/successi/${data.slug}`, true));
        },
      });
    }
    // Mobile
    else {
      // Prevent next link
      dispatch(redScreenLoader());

      dispatch(
        redScreenLoader({
          link: link,
          img: image,
        })
      );
    }
  };

  // return string ? string.split(/\r?\n/).map((e, i) => <span key={i}>{e} <br></br></span>) : '';

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) =>
        handleClick(
          e,
          getPath(`/successi/${data.slug}`, true),
          getPath(data.thumbnail_success.immagine.data.attributes.url)
        )
      }
    >
      <Row isLast={isLast}>
        <Text>
          <TitleWrapper>
            <Title>{data.thumbnail_success.nome}</Title>
            <Subtitle>
              {titoletto.map((el, i) => {
                return (
                  <React.Fragment key={i}>
                    {el}
                    <br></br>
                  </React.Fragment>
                );
              })}
            </Subtitle>
          </TitleWrapper>
        </Text>
        <RedBackImage ref={redBackImage} data-flip-id="red"></RedBackImage>
        <ImageContainer data-flip-id="image-full" ref={refImageContainer}>
          <Image
            ref={refImage}
            src={getPath(data.thumbnail_success.immagine.data.attributes.url)}
            alt={data?.thumbnail_success?.immagine?.data.attributes?.alternativeText ? data?.thumbnail_success?.immagine?.data.attributes?.alternativeText : data.thumbnail_success.nome ? `Immagine rappresentativa progetto ${data.thumbnail_success.nome}` : "Immagine rappresentativa progetto" }
            fill
            sizes="100%"
            quality={100}
          />
        </ImageContainer>
        <RedBackImageFull
          data-flip-id="red"
          ref={redBackImageFullRef}
        ></RedBackImageFull>
      </Row>
      <ImageFull data-flip-id="image-full" ref={imageFull}>
        <Image
          src={getPath(data.thumbnail_success.immagine.data.attributes.url)}
          alt={data?.thumbnail_success?.immagine?.data.attributes?.alternativeText ? data?.thumbnail_success?.immagine?.data.attributes?.alternativeText : data.thumbnail_success.nome ? `Immagine rappresentativa progetto ${data.thumbnail_success.nome}` : "Immagine rappresentativa progetto" }
          fill
          sizes="100%"
          quality={100}
        />
      </ImageFull>
    </Container>
  );
}

const Container = styled.div`
  ${centerContent}
  position: relative;
  max-width: 100vw;
`;

const Row = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.primaryColor};
  padding: ${({ isLast }) => {
    if (isLast)
      return "clamp(1.25rem, calc(0.95rem + 1.29vw), 2.50rem) 0px 0px 0px";
    else return "clamp(1.25rem, calc(0.95rem + 1.29vw), 2.50rem) 0px";
  }};
`;

const Text = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  gap: 1rem;
  /* @media (max-width: 400px) {
      &.title {
        line-height: 3.75rem;
      }
    }  */
`;

const Title = styled.span`
  font-size: ${(props) => props.theme.fontSizes.size_35_50};
  font-family: ${(props) => props.theme.fonts.main};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.primaryColor};
  line-height: 0.85;
  display: flex;

  @media (min-width: 1280px) {
    font-size: ${(props) => props.theme.fontSizes.size_115_323};
  }

  @media (max-width: 650px) {
    font-size: ${(props) => props.theme.fontSizes.size_70_100};
  }
`;

const Subtitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.size_12_20};
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.primaryColor};
  text-transform: capitalize;
  margin-top: 1rem;
  /* position: absolute;
  transform: translateX(100%);
  right: calc(-1 * (5px + 1vw));
  top: 0;
  line-height: 1; */

  span {
    display: block;
  }
`;
// Image
const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1.5rem; //
  position: absolute;
  top: 50%;
  right: 30%;
  width: clamp(22rem, calc(16rem + 7.5vw), 25rem);
  height: clamp(14rem, calc(8rem + 7.5vw), 17rem);
  display: none;
  transform: scale(0) translateY(-50%);
  z-index: 999;

  @media (min-width: 1280px) {
    display: block;
  }

  img {
    border-radius: 1.5rem; //
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
    transform: scale(2);
  }
`;

const RedBackImageFull = styled.div`
  display: none;
  z-index: 99999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background: ${({ theme: { colors } }) => colors.primaryColor};
`;

const RedBackImage = styled.div`
  border-radius: 1.5rem; //
  background: ${({ theme: { colors } }) => colors.primaryColor};
  z-index: 98;
  border-radius: 1.5rem; //
  position: absolute;
  top: 50%;
  right: 30%;
  width: clamp(22rem, calc(16rem + 7.5vw), 25rem);
  height: clamp(14rem, calc(8rem + 7.5vw), 17rem);
  transform: scale(0);
  display: none;

  @media (min-width: 1280px) {
    display: block;
  }
`;

const ImageFull = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999999;
  border-radius: 1rem;
  overflow: hidden;
  width: 40vw;
  height: 28vw;
  max-width: 48rem;
  max-height: 33rem;
  transform: translate(-50%, -50%);
  display: none;

  img {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
