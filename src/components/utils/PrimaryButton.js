import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeColor } from "../../../redux/customCursorSlice";
import { useEffect } from "react";

export default function PrimaryButton({ href, children, isDisabled, type = "button", textIsLong = false, isFullWidth = false, classes = '', white = false }) {
  const dispatch = useDispatch();
  
  //! COMPONENT
  return (
    <Button
      type={type}
      onClick={(e) => {if(type === "submit") return; e.preventDefault()}}
      // isDisabled={isDisabled
      {...(href && { href })}
      className={(white === true) ? `no_highlights bg-white mt-10 rounded-full py-7 px-28 inline-block font-bold border-0 text-black` : `no_highlights`}
      // onMouseEnter={() => {
      //   !isDisabled && dispatch(changeColor("black&scaleUp"));
      //   isDisabled && dispatch(changeColor("transparent"));
      // }}
      // onMouseLeave={() => {
      //   !isDisabled && dispatch(changeColor("primary&scaleDown"));
      //   isDisabled && dispatch(changeColor("primary"));
      // }}
      textIsLong={textIsLong}
    >
      {children}
    </Button>
  );
}

//! STYLE
const Button = styled.button`
  border-style: none;
  border: ${(props) =>
    !props.isDisabled
      ? `2px solid ${props.theme.colors.primaryColor}`
      : `2px solid ${props.theme.colors.primaryColor}`};
  display: inline-block;
  font-family: ${({ theme: { fonts } }) => fonts.medium};
  color: ${(props) =>
    !props.isDisabled ? "white" : props.theme.colors.primaryColor};
  font-size: 1.2rem;
  background: ${({ theme: { colors } }) => colors.primaryColor};
  background: ${(props) =>
    !props.isDisabled ? props.theme.colors.primaryColor : "none"};
  /* padding: clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem) clamp(3rem, calc(2.51rem + 2.07vw), 5rem); */
  padding: ${({textIsLong}) => textIsLong ? "27px 33px": "clamp(1.5rem, calc(1.3rem + 0.84vw), 2.31rem) clamp(4.38rem, calc(4.01rem + 1.81vw), 6.25rem)"};
  /* padding: 27px 33px; */
  border-radius: 999px;
  transition: all 0.2s ease-in;
  width: fit-content;
  cursor: ${(props) => (!props.isDisabled ? "pointer" : "not-allowed")};

  &:hover {
    /* background: ${({ theme: { colors } }) => colors.primaryHover}; */
    background: ${(props) =>
      !props.isDisabled ? props.theme.colors.primaryColor : "none"};
  }
`;
