import styled from "styled-components";
import PlayIcon from "./utils/PlayIcon";

export default function FullVideo({ data: video, mt }) {
  return (
    <Container mt={mt}>
      <VideoContainer>
        <video preload="auto" playsInline loop="loop">
          <source src={video} />
        </video>
        <PlayIcon />
      </VideoContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: ${(props) => props.mt};
  padding-left: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  padding-right: clamp(0rem, calc(-0.76rem + 3.24vw), 3.13rem); // 0px → 50px
  max-width: 120rem;
  margin-left: auto;
  margin-right: auto;
`;

const VideoContainer = styled.div`
  height: clamp(18rem, calc(8.78rem + 39.35vw), 56rem); // 288px → 896px
  overflow: hidden;
  border-radius: clamp(1rem, calc(0.76rem + 1.04vw), 2rem); // 16px → 32px
  position: relative;

  video {
    object-fit: cover;
    position: relative !important;
    width: 100%;
    height: 100%;
    display: block;
  }
`;
