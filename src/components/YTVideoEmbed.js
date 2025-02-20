import styled from "styled-components";

export default function YTvideoEmbed({id}) {
  if (!id) return <></>;
  return (
    <Container>
      <iframe src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </Container>
  );
}

const Container = styled.div`
 iframe {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: clamp(0rem,calc(-0.3rem + 1.29vw),1.25rem);
 }
`;

