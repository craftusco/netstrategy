import { redScreenLoader } from "redux/animationsSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);
CustomEase.create("redEase", "0.79, 0.14, 0.15, 1");

export default function RollRedLink({ name, href = null, img }) {
  const dispatch = useDispatch();
  // Refs
  const textTopRef = useRef();
  const textBotRef = useRef();

  // Mouse Click --
  const handleLink = (e) => {
    // prevent link next
    e.preventDefault();


    dispatch(
      redScreenLoader({
        link: href,
        img: img,
      })
    );
  };

  // Animations --
  // Mouse enter
  const handleMouseEnter = (e) => {
    gsap.to(textTopRef.current, {
      y: "-100%",
      duration: 0.6,
      ease: "redEase",
    });
    gsap.to(textBotRef.current, {
      y: "-100%",
      duration: 0.6,
      ease: "redEase",
    });
  };

  // Mouse leave
  const handleMouseLeave = (e) => {
    gsap.to(textTopRef.current, {
      y: "0",
      duration: 0.6,
      ease: "redEase",
    });
    gsap.to(textBotRef.current, {
      y: "0",
      duration: 0.6,
      ease: "redEase",
    });
  };

  return href ? (
    <Link
      className="no_highlights"
      href={href}
      onClick={!href.startsWith("http") && handleLink}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Wrapper>
        <span ref={textTopRef}>{name}</span>
        <span ref={textBotRef}>{name}</span>
      </Wrapper>
    </Link>
  ) : (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="no_highlights"
    >
      <Wrapper>
        <span ref={textTopRef}>{name}</span>
        <span ref={textBotRef}>{name}</span>
      </Wrapper>
    </span>
  );
}

// Style
const Wrapper = styled.div`
  height: 1.2em;
  overflow: hidden;

  a,
  span {
    cursor: pointer;
  }
`;
