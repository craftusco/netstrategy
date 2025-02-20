import Menu from "@/components/Menu";
import Logo from "@/components/utils/Logo";
import splitText from "@/utils/splitText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../redux/customCursorSlice";
import { menuAndContact } from "../../redux/Menu&ContactSlice";
import RedLink from "@/components/utils/RedLink";
import getPath from "@/utils/getPath";

const data404 = {
  title: "404!",
  subtitle: `Ops! non sono più qui, mi spiace!
    ma puoi tornare sulla via di casa!`,
  button: `Go to Home Page`,
  pages: [
    {
      name: `Primo su Google`,
      link: "/seo/primi-su-google",
    },
    {
      name: `Consulenza immagine aziendale`,
      link: "/comunicazione/consulenza-di-comunicazione",
    },
    {
      name: `Sviluppare un nuovo progetto`,
      link: "/ecommerce/consulenza",
    },
    {
      name: `Aumentare vendite eCommerce`,
      link: "/comunicazione/consulenza-di-comunicazione",
    },
    {
      name: `Sviluppo rete commerciale`,
      link: "/web-marketing/consulenza",
    },

    {
      name: `Comunicare sui social`,
      link: "/social/consulenza",
    },
  ],
  menu: {
    claim: `Building Future Together`,
    text_1: `We are a branding and digital design agency building products, services, and eCommerce experiences that turn cultural values.`,
    text_2: `We are a branding and digital design agency building products, services, and eCommerce experiences that turn cultural values into company value2.`,
    pillars: [
      {
        name: `Web marketing`,
        link: "/web-marketing",
      },
      {
        name: `Comunicazione`,
        link: "/comunicazione",
      },
      {
        name: `E-Commerce`,
        link: "/ecommerce",
      },
      {
        name: `Website`,
        link: "/website",
      },
      {
        name: `Seo`,
        link: "/seo",
      },
      {
        name: `Social`,
        link: "/social",
      },
      {
        name: `Inbound`,
        link: "/inbound",
      },
      {
        name: `Crm`,
        link: "/crm",
      },
    ],
    nav: [
      {
        name: `Culture.`,
        number: "28",
        img: "/test2.jpg",
        link: "/culture",
      },
      {
        name: `Services.`,
        number: "35",
        img: "/test.jpg",
      },
      {
        name: `Projects.`,
        number: "14",
        link: "/projects",
        img: "/proj.jpg",
      },
      {
        name: `Events.`,
        number: "21",
        link: "/events",
        img: "/talk.jpg",
      },
      {
        name: `Journal.`,
        number: "47",
        link: "/journal",
        img: "/test6.jpg",
      },
      {
        name: `Connect.`,
        number: "15",
        link: "/contatti",
        img: "/contatti.png",
      },
    ],
    footer: {
      copy: "©2023",
      social: [
        { name: "Instagram", link: "https://www.instagram.com" },
        { name: "LinkedIn", link: "https://www.Linkedin.com" },
        { name: "Youtube", link: "https://www.Youtube.com" },
      ],
      policy: {
        name: "Privacy & Cookie Policy",
        link: "privacy-cookie-policy",
      },
    },
  },
  spanHeader: `Building Future Together`,
};



export default function Custom404() {
  const dispatch = useDispatch();

  const menu = useSelector((state) => state.menuAndContact.value.menu);
  const contact = useSelector((state) => state.menuAndContact.value.contact);

  //! FADE IN MENU
  useEffect(() => {
    dispatch(
      menuAndContact({
        menu: {
          ...menu,
          fade: true,
          mount: true,
          white: true,
        },
        contact: {
          ...contact,
          fade: false,
        },
      })
    )
  }, [menu.white]);

  //! COMPONENTS
  return (
    <Container>
      {/* Menu */}
      {/* <Menu isWhite={true} /> */}
      {/* Header */}
      <Header>
        <Logo color="white" />
        <span>{data404.spanHeader}</span>
      </Header>
      {/* Content */}
      <Text className="hideScrollbar">
        <h2>{data404.title}</h2>
        <p>{splitText(data404.subtitle)}</p>
        <RedLink link="/">
          <Pill
            onMouseEnter={() => {
              dispatch(changeColor("smileUp"));
            }}
            onMouseLeave={() => {
              dispatch(changeColor("smileDown"));
            }}
          >
            {data404.button}
          </Pill>
        </RedLink>
        <Pages>
          <p>{splitText(`Posso aiutarti? cosa stavi cercando?`)}</p>
          <PagesPills>
            {data404.pages.map(({ name, link }, i) => (
              <RedLink link={getPath(link)} key={i}>
                <SmallPill
                  onMouseEnter={() => {
                    dispatch(changeColor("scaleUp"));
                  }}
                  onMouseLeave={() => {
                    dispatch(changeColor("scaleDown"));
                  }}
                >
                  {name}
                </SmallPill>
              </RedLink>
            ))}
          </PagesPills>
        </Pages>
      </Text>
    </Container>
  );
}

//! STYLE
const Container = styled.div`
  background: ${({ theme: { colors } }) => colors.blackColorV2};
  height: 100vh;
  position: absolute;
  top: 0;
  width: 100%;
`;

// Header
const Header = styled.header`
  padding-inline: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem);
  margin-top: clamp(1.5rem, calc(1.26rem + 1.04vw), 2.5rem); // 24px → 40px
  height: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: calc(100% - (4.8rem + clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem)));

  span {
    display: none;
  }

  @media (min-width: 1280px) {
    span {
      display: inline-block;
    }
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 90%;
  margin-inline: auto;
  color: white;
  overflow-y: scroll;
  margin-top: 3rem;
  height: 80vh;

  h2 {
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_83_250};
    font-family: ${({ theme: { fonts } }) => fonts.main};
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
  }

  p {
    margin-top: clamp(0.63rem, calc(0.7rem + -0.32vw), 0.31rem);
    font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_25};
    font-family: ${({ theme: { fonts } }) => fonts.medium};
    text-transform: uppercase;

    @media (min-width: 550px) {
      span {
        display: block;
      }
    }
  }
`;

const Pages = styled.div`
  margin-top: 2.5rem;
`;

const PagesPills = styled.div`
  margin-top: 0.5rem;
  margin-inline: auto;
  width: 70%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 2rem;
`;

// Pill
const Pill = styled.div`
  margin-top: 2.5rem;
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_16_20};
  display: inline-block;
  color: black;
  background: white;
  padding: clamp(1rem, calc(0.76rem + 1.04vw), 2rem)
    clamp(2rem, calc(1.51rem + 2.07vw), 4rem);
  border-radius: 999px;
  border: 1px solid #555555;
  transition: all 0.3s ease-in;
  cursor: pointer;
`;

// SmallPill
const SmallPill = styled.div`
  margin-top: 2rem;
  font-size: 1.1rem;
  display: inline-block;
  color: white;
  padding: 1.3rem 2rem;
  border-radius: 999px;
  border: 1px solid #555555;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:hover {
    background: white;
    color: black;
  }
`;
