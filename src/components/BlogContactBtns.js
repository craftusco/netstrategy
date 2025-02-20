import gsap from "gsap";
import styled from "styled-components";

export default function BlogContactBtns({}) {
  return (
    <Container>
      <FormCta>
        <a className="box contact" href="#contact" onClick={(e) => {
          e.preventDefault();
          gsap.to(window, {
            duration: 1,
            scrollTo: {y: `#contact`,  offsetY: 110},
            ease: "Power3.easeOut",
          });
        }}>
          <img
            width={20}
            height={20}
            src="/double-arrow.svg"
            alt="double arrow icon"
          ></img>
          <div>
            <div className="label"></div>
          </div>
        </a>
      </FormCta>
      <MobileContacts>
        <a className="box tel" href="tel:390442321391">
          <img
            width={20}
            height={20}
            src="/contatti/phone.svg"
            alt="contact phone"
          ></img>
          <div>
            <div>Chiamaci</div>
          </div>
        </a>
        <a className="box wa" rel="noopener noreferrer" href="https://wa.link/oskh5c" target="_blank">
        {/* <a className="box wa" href="https://wa.me/message/TSO5FGTUTY7DH1" target="_blank"> */}
          <img
            width={20}
            height={20}
            src="/double-arrow.svg"
            alt="double arrow icon"
            className="double-arrow"
          ></img>
          <img
            width={20}
            height={20}
            src="/contatti/whatsapp.svg"
            alt="whatsapp chat"
          ></img>
          <div>
            <div>WhatsApp</div>
          </div>
        </a>
      </MobileContacts>
    </Container>
  );
}

const Container = styled.div`
display: contents;
display: flex;
width: fit-content;
background-color: ${({ theme: { colors } }) => colors.blackColorV3};
color: ${({ theme: { colors } }) => colors.whiteColor};
white-space: nowrap;
border-radius: 50px;
overflow: hidden;
.box {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;

  &.wa {
    .double-arrow {
      display: none;
      @media screen and (max-width: 1080px) {
        display: block;
      }
    }
  }
    
  @media screen and (max-width: 1080px) {
    justify-content: center;
    &.tel {
      display: none;
    }
  }
}

@media screen and (max-width: 1080px) {
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
}
`;

const FormCta = styled.div`
background-color: ${({ theme: { colors } }) => colors.primaryColor};
padding: 0.85rem 1.2rem;

.label::after {
  content: "Raccontaci il tuo progetto";
  @media screen and (max-width: 1080px) {
    content: "Contattaci";
  }
}

@media screen and (max-width: 1080px) {
  width: 50%;
  padding-inline: 0;
}
`;

const MobileContacts = styled.div`
display: flex;
padding: 0.85rem 1.2rem;

a:first-child {
  margin-right: 2.5rem;
}

@media screen and (max-width: 1080px) {
  width: 50%;
  padding-inline: 0;
}
`;
