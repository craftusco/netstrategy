import { centerContent } from "@/styles/mixins";
import getPath from "@/utils/getPath";
import Image from "next/image";
import styled from "styled-components";
import Heading from "./Heading";

const impegnoSociale = [
  {
    image: "/uploads/squadra_falconeri_7200a6b548.webp",
    logo: "/uploads/falconeri_ski_team_9171190390.webp",
    title: "Falconeri Ski Team - Partner",
    desc: `Il Criterium nazionale cuccioli non è solo un evento sportivo, ma un vero e proprio momento di crescita e apprendimento per giovani talenti. 
    In NetStrategy abbiamo avuto l’onore di curare e coordinare la comunicazione per questo importante evento. La nostra strategia ha messo in primo piano la passione e la dedizione dei giorni partecipanti. Affiancando l’associazione sportiva, abbiamo riformulato la comunicazione digitale, portando l’energia e l’entusiasmo della montagna direttamente sui canali social.`,
    nome: "falconeri ski team"
  },
  {
    image: "/uploads/foto_squadra_18a4953cf1.webp",
    logo: "/uploads/nuovo_tennis_bovolone_e29e6f2f70.webp",
    title: "Nuovo Tennis Bovolone - Sponsor",
    desc: `Il tennis è uno sport che racchiude valori di determinazioni, resistenza e spirito di squadra. Con l'associazione sportiva Nuovo Tennis Bovolone, abbiamo rivoluzionato la comunicazione, sia online che offline. 
    La strategia social pensata ha permesso di amplificare la voce del club, rendendolo riconoscibile e distintivo nell’ambito tennistico. Ma non ci siamo fermati al digitale: abbiamo lavorato per rendere la comunicazione offline altrettanto efficace, realizzando nuove grafiche per bacheche, totem e altri elementi che esaltano l’identità del club in ogni sua manifestazione, evento o partita.`,
    nome: "nuovo tennis bovolone"
  },
];

export default function ImpegnoSociale({}) {
  return (
    <>
      <Heading
        data={{
          titolo: `Impegno
           Sociale`,
          sottotitolo:
            "L'opportunità di sostenere e potenziare la visibilità di iniziative sociali importanti nel mondo dello sport.",
          rovesciato: true,
        }}
        mt="clamp(2.00rem, calc(1.51rem + 2.07vw), 4.00rem)"
      />
      <Container>
        {impegnoSociale.map(({ image, logo, title, desc, nome }, i) => (
          <Impegno key={i}>
            <Content className="content">
              <ImageContainer>
                <Image src={getPath(image)} alt={`${nome}`} fill sizes="100%" />
              </ImageContainer>
              <Text>
                <div className="logo">
                  <Image
                    src={getPath(logo)}
                    alt={`${nome} logo`}
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="desc">
                  <span>{title}</span>
                  <p>{desc}</p>
                </div>
              </Text>
            </Content>
          </Impegno>
        ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 6rem;
  & > div:last-child > div {
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  }
`;

const Impegno = styled.div`
  ${centerContent}
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 1.25rem;
  aspect-ratio: 4 / 2.9;
  position: relative;

  img {
    object-fit: cover;
    object-position: center;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 1024px) {
    width: 40%;
  }
`;

const Content = styled.div`
  border-top: 1px solid ${({ theme: { colors } }) => colors.primaryColor};
  padding-block: 3rem;
  @media (min-width: 1024px) {
    display: flex;
    column-gap: clamp(1.25rem, calc(0.18rem + 1.67vw), 2.19rem); // 20px → 35px
  }
`;

const Text = styled.div`
  padding: 2rem 3rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .logo {
    align-self: flex-end;
    img {
      position: relative !important;
      width: 100%;
      height: 100%;
      display: block;
      max-width: 200px;
    }
  }

  .desc {
    max-width: 700px;
    span {
      display: block;
      font-size: clamp(1.25rem, calc(0.79rem + 1.94vw), 3.13rem);
      margin-bottom: 1rem;
    }
  }

  margin-top: 1rem;

  @media (min-width: 1024px) {
    margin-top: 0;
    width: 60%;
  }
`;
