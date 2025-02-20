import styled from "styled-components"
import { Paragraph } from "./styled-components"
import Divider from "./Divider"

function GoogleReview({children}) {
  return (
    <>
        <Wrapper>
            {children}
        </Wrapper>
    </>
  )
}

export default GoogleReview

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 35px;
    padding: 30px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .read-more {
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        display: inline-block;
        margin-top: 10px;
    }

    hr {
        margin: 20px 0px;
    }
`