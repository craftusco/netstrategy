import styled from "styled-components";
import { shareArticleOn, shareArticleGeneric } from "@/utils/shareArticle";
import { useEffect } from "react";

const shareIcons = [
  {
    name: "facebook",
    svg: "/facebook.svg",
  },
  {
    name: "linkedin",
    svg: "/linkedin.svg",
  },
  {
    name: "whatsapp",
    svg: "/whatsapp.svg",
  },
  {
    name: "telegram",
    svg: "/telegram.svg",
  },
];

export default function ShareLinks({
  title,
  align, //left - right
}) {
  return (
    <IconsLinks align={align}>
      {title && <Title>{title}</Title>}
      {shareIcons.map((shareIcon, idx) => (
        <ShareIconsDesktop
        key={idx}
          onClick={() => shareArticleOn(window.location.href, shareIcon.name)}
        >
          <img src={shareIcon.svg} alt={shareIcon.name}></img>
        </ShareIconsDesktop>
      ))}
      <ShareIconsMobile
        onClick={() => shareArticleGeneric(window.location.href)}
      >
        <img src="/shareIcon.svg" alt="share"></img>
      </ShareIconsMobile>
    </IconsLinks>
  );
}

const IconsLinks = styled.div`
  margin-top: 1rem;
  padding-right: 1rem;
  display: flex;
  gap: 0.75rem;
  justify-content: ${(props) =>
    props.align == "left" ? "flex-start" : "flex-end"};
  /* justify-content: flex-end;
  @media (max-width: 1080px) {
    ;
  } */
`;

const Title = styled.div`
  text-transform: uppercase;
`;

const ShareIconsDesktop = styled.span`
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
  display: none;

  & > img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 550px) {
    display: block;
  }
`;

const ShareIconsMobile = styled.span`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;

  & > img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 550px) {
    display: none;
  }
`;
