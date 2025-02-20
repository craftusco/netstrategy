import styled, {useTheme} from "styled-components";

export default function Talk({color = "primaryColor", theme=true, secondPart="alk"}) {

  const col = theme ? useTheme().colors[color] : color;

  return (
    <>
      <HalfSpan color={col}>T</HalfSpan>
      <HalfSpan className="second-part" color={col}>{secondPart} </HalfSpan>
    </>
  );
}

const HalfSpan = styled.span`
  font-size: ${({ theme: { fontSizes } }) => fontSizes.size_115_323};
  font-family: ${({ theme: { fonts } }) => fonts.handwritten};
  color: transparent;
  text-shadow: 0px 0px ${props => props.color};
  &.second-part{
    margin-left: calc( clamp(1.25rem, calc(0.89rem + 1.81vw), 3.13rem) * -1);
  }
`;