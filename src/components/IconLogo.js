import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import RedLink from "./utils/RedLink";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { changeColor } from "../../redux/customCursorSlice";

export default function IconLogo({ color = "white" }) {
  const router = useRouter();
  if (
    router.asPath.split("/").includes("landing-nuove") ||
    router.asPath.split("/").includes("eventi") ||
    router.pathname === "/"
  ) {
    return <></>;
  }

  //! REFS
  const containerRef = useRef();
  const iconLogoRef = useRef();
  const dispatch = useDispatch();

  const fadeState = useSelector(
    (state) => state.menuAndContact.value.menu.fade
  );

  //! FADE IN/OUT SCROLL
  useEffect(() => {
    let iconLogoCtx = gsap.context(() => {
      document.addEventListener("scroll", () => {
        document.documentElement.scrollTop !== 0
          ? gsap.to(containerRef.current, {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.5,
            })
          : gsap.to(containerRef.current, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.5,
            });
      });
    }, containerRef.current);
    return () => iconLogoCtx.revert();
  }, []);

  //! UNMOUNT WHEN ROUTE CHANGE
  useEffect(() => {
    fadeState
      ? gsap.set(containerRef.current, {
          display: "block",
        })
      : gsap.set(containerRef.current, {
          display: "none",
        });
  }, [fadeState]);

  //! COMPONENT
  return (
    <Container
      ref={containerRef}
      color={color}
      onMouseEnter={() => {
        dispatch(changeColor("scaleUp"));
      }}
      onMouseLeave={() => {
        dispatch(changeColor("scaleDown"));
      }}
    >
      <RedLink link="/">
        <svg
          ref={iconLogoRef}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="77"
          height="77"
          viewBox="0 0 77 77"
        >
          <defs>
            <pattern
              id="pattern"
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 100 101"
            >
              <image
                width="100"
                height="101"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABlCAYAAAC7vkbxAAAABHNCSVQICAgIfAhkiAAABMtJREFUeF7tnYGVEjEURd0K1ApcK1ArECvQDsQK1ArEDuxA7MAOxArUCsQK1ArW/1zwsDKB/DcvmRB+zslxZZOfzLvzkmwGwsXV1dWtSO0ocBFA2oGBngSQtngEkMZ4BJAA0poCjfUn5pAA0pgCjXUnHBJAGlOgse6EQwJIYwo01p1wSBkglxZ2bvmh5TtHmvhlv3+2LRNAtEAg/tLyU0fYt1Z2EUAcimUWhRtWlm9nlkex35bhJrjkbwqHONQ7UJSBgXA33BFANDAQ5avlB85we+4IIE4FE8Xn9vp7ItSeOwIIoeJAlbW9ds8ZatAdAcSp4kBx1h0fLBbq7qWY1MdBYdyBFu9bRt0AMk7/G7Vn9r9PRLykO2LIItTcqbKynx8TIZLuCCCEmpsqRdwRQHggRdwRQDggxdwRQDggxdwRQPxAirojgPiBFHVHAPEBKe6OAOIDUtwd5wQEj0jxzCInLQYKVXHHOQCBuK8s5z7FS21rsO54ZG3jWUl26nVzEc+2IaL3odHQtgbrjs/WPuq6Uo9AWBgpdyxN0ecuVa8LP9ncFK6qPQL5aAp43vWxFWzIHZf2y+8uRa8LU+5Axd6AsMNLE+7oEQjmDdWWeHV39Abk5N3RGxDWHUNL00nc0RMQ/NH3RTj5Li1WtZXVbr97mdSVAk7mjl4cohZQCddt2h4cohRQDffsgKgFVMJ1w+hhyFIKqIZ7dkDUArJwX5jyqCtJpzyHsAIObfphQ/InoegPq4MbQ5ZOFYjaHQtT9A2hqtQdpzyHqN2xNjFyH2JtucndMRUQDA+5j1NXA3dtt+6oDWRmDWJoyN2NTT1T6NYdNYG8s8ZeOsfoocmXdce3hCubmTu22tSY1Jk7Wu2OockXQ2czc0ctIIwz0LfU0lQpYHPuKD1kscNLyh1KAZt0R2kgzFB11u4oCSTc4VzBlJ5Dwh0NAWHdUWNpys4d+KD/sWOWSAQ3q5VY9rLuqLE0ZRcGg8dgSAj8F0QNRL1rygqY2vTDsll2DMYpAFEKyA4vqU2/uQkoOySmBAz1KkstoBIurpVxB/0eXRaYcshSCqiGy7gDi4yZ5X+nvbEie+qpgKgFVML1ugMrKmz5oA/VkwqIUkAWbuoMKtzlueLiowzL2q7Ypa4Awgp40pNvKesogCjd4R1etrokT2grJVypuGOBhDvEZMYCCXc0BCTcIYaBcGMcwrrj9WZZ+f/lrO2Fprc1Cui/F5IFwrojNfnOrWfNb2u0DEQtYLhjQ5t1iFJANdwaN3KxNhggagEZuJPsMxWjsBOYAcIIqJw78Bf+zDL60V3yApnaHdgOx1FLVXdga1L3ApnCHXDXyjJ2YPFv18kDRO2OroVlL84DROkOtr/d18sFEu6odCvkAgl3NAQk3FEJBprJcQjjDsS+2/PytBSjY0BYdxz80pJSF9ND3GNAcMSp92RP6HLwS0t6EK7UNRwCMrNG5V/pU+pCeol7CMjKLjL3E7NbPbp5s8FUgFNAGHcABuq5TnKe6sJbbTcFxOsObIdjARAwRpIeAuJxB7bCl5YXI/sR1TcKDAG5tN8hH0trK4AcSajAsWWvsKkIlaNAAMlRqWKZAFJR7JymAkiOShXLBJCKYuc0FUByVKpYJoBUFDunqT+FgG9VN1maAwAAAABJRU5ErkJggg=="
              />
            </pattern>
          </defs>
          <g
            id="Raggruppa_531"
            dataname="Raggruppa 531"
            transform="translate(-61 -1518)"
          >
            <circle
              id="Ellisse_15"
              dataname="Ellisse 15"
              cx="38.5"
              cy="38.5"
              r="38.5"
              transform="translate(61 1518)"
              fill="#191616"
            />
            <rect
              id="logo_netstrategy_2022_favico"
              dataname="logo netstrategy 2022 favico"
              width="46"
              height="47"
              transform="translate(75 1533)"
              fill="url(#pattern)"
            />
          </g>
        </svg>
      </RedLink>
    </Container>
  );
}

//! STYLE
const Container = styled.div`

  opacity: 0;
  //! test 1
  position: fixed;
  top: calc((clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem)));
  left: calc((clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem)));
  z-index: 2500;
  &::after {
    content: "Torna alla home";
    position: absolute;
    top: 50%;
    left: 85%;
    transform: translateY(-50%);
    background-color: #1c1414;
    color: ${({ theme: { colors } }) => colors.whiteColor};
    text-wrap: nowrap;
    padding: 10px 0;
    border-radius: 5px;
    opacity: 1;
    max-width: 0;
    transition: all 500ms ease;
    overflow: hidden;
  }

  &:hover::after {
    max-width: 1000px;
    padding-inline: 15px;
  }

  //! end test 1
  svg {
    cursor: pointer;
  }

  @media (max-width: 1080px) {
      opacity: 0 !important;
      pointer-events: none !important;
    }
`;
