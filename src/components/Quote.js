import styled from "styled-components"

function Quote({children}) {
  return (
    <Wrapper>
        <QuoteIcon>“</QuoteIcon>
        {children}
    </Wrapper>
  )
}

export default Quote

const Wrapper = styled.div`
    position: relative;
    @media screen and (max-width:767px) {
      padding: 0px 20px;
    }
`

const QuoteIcon = styled.p`
    position: absolute;
    top: 15px;
    left: -75px;
    font-family NeueMontreal-Medium;
    font-size: 180px;
    color: #fc1333;

    @media screen and (max-width:767px) {
      font-size: 100px;
      top: 26px;
      left: -20px;
    }
`