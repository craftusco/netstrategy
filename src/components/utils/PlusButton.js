import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../../redux/customCursorSlice";

export default function PlusButton({ children }) {
  const dispatch = useDispatch();

  //! COMPONENT
  return (
    <Button
      className="no_highlights"
      onMouseEnter={() => {
        dispatch(changeColor("black&scaleUp"));
      }}
      onMouseLeave={() => {
        dispatch(changeColor("primary&scaleDown"));
      }}
    >
      +
    </Button>
  );
}

//! STYLE
const Button = styled.div`
  display: inline-block;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  color: white;
  font-size: clamp(2.5rem, calc(2.26rem + 1.04vw), 3.5rem);
  background: ${({ theme: { colors } }) => colors.primaryColor};
  border-radius: 999px;
  transition: all 0.2s ease-in;
  width: clamp(10.44rem, calc(8.57rem + 7.96vw), 18.13rem);
  height: clamp(3.81rem, calc(3.28rem + 2.27vw), 6rem);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: ${({ theme: { colors } }) => colors.primaryHover};
  }
`;
