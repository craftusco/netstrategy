import styled from "styled-components";

//LAYOUT

const Container = styled.div`
    ${props => props.fullScreen && 'width: 100vw; height: 100vh;'}
    ${props => props.fullHeight && 'width: 100%; height: 100vh;'}
    max-width: ${props => props.maxWidth || '1024px'};
    margin: ${props => props.margin || 'auto'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    display: block;
    position: ${props => props.relative ? 'relative' : 'unset'};
    padding: ${props => props.padding || '0px'};
    ${props => props.hCentered && 'display: flex; justify-content: center;'}
    ${props => props.allCentered && 'display: flex; align-items: center; justify-content: center;'}

    @media screen and (max-width:767px) {
        width: auto;
        height: auto;
        margin-left: 30px;
        margin-right: 30px;
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const Wrapper = styled.div`
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    padding-top: ${props => props.paddingTop || '0px'};
    padding-bottom: ${props => props.paddingBottom || '0px'};
    padding-left: ${props => props.paddingLeft || '0px'};
    padding-right: ${props => props.paddingRight || '0px'};

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const HCenteredContent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};

    ${props => props.noMobile &&
        `
            @media screen and (max-width: 767px) {
                display: block;
            }
        `
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const AbsoluteContainer = styled.div`
    width: ${props => props.fullWidth ? '100%' : 'auto'};
    max-width: ${props => props.maxWidth && props.maxWidth};
    display: ${props => props.flex ? 'flex' : 'block'};
    background-color: ${props => props.bg ? props.bg : 'unset'};
    z-index: 2000;
    position: absolute;
    top: ${props => props.top || 'unset'};
    bottom: ${props => props.bottom || 'unset'};
    left: ${props => props.left || 'unset'};
    right: ${props => props.right || 'unset'};
    ${props => props.hCentered && 'left: 0px; right: 0px; margin: auto;'}
    ${props => props.paddingTop && `padding-top: ${props.paddingTop};`}
    ${props => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
    ${props => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
    ${props => props.paddingRight && `padding-right: ${props.paddingRight};`}
    ${props => props.padding && `padding: ${props.padding};`}

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const Columns = styled.div`
    ${props => props.paddingTop && `padding-top: ${props.paddingTop};`}
    ${props => props.paddingBottom && `padding-bottom: ${props.paddingBottom};`}
    ${props => props.paddingLeft && `padding-left: ${props.paddingLeft};`}
    ${props => props.paddingRight && `padding-right: ${props.paddingRight};`}
    ${props => props.vCentered && 'align-items: center;'}

    @media screen and (min-width:767px) {
        ${props => props.vCentered && 'align-items: center;'}
        ${props => props.hCentered && 'justify-content: center;'}
        display: grid;
        grid-template-columns: ${props => props.template || 'auto'};
        grid-gap: ${props => props.gap || '10px'};        
    }

    ${props => props.keepMb &&
        `
            display: grid;
            grid-template-columns: ${props.template || 'auto'};
            grid-gap: ${props.gap || '10px'};
            ${props => props.vCentered && 'align-items: center;'}
        `
    }
`

const Column = styled.div`
    position: relative;

    @media screen and (min-width:767px) {
        ${props => props.column && `grid-column: ${props.column};`}
        margin-top: ${props => props.marginTop || '0px'};
        margin-bottom: ${props => props.marginBottom || '0px'};
        margin-left: ${props => props.marginLeft || '0px'};
        margin-right: ${props => props.marginRight || '0px'};
        padding-top: ${props => props.paddingTop || '0px'};
        padding-bottom: ${props => props.paddingBottom || '0px'};
        padding-left: ${props => props.paddingLeft || '0px'};
        padding-right: ${props => props.paddingRight || '0px'};
        ${props => props.hCentered && 'display: flex; justify-content: center;'}
        ${props => props.rAlignment && 'display: flex; justify-content: right;'}
        ${props => props.lAlignment && 'display: flex; justify-content: left;'}
    }

    ${props => props.keepMb &&
        `
            ${props => props.column && `grid-column: ${props.column};`}
            margin-top: ${props => props.marginTop || '0px'};
            margin-bottom: ${props => props.marginBottom || '0px'};
            margin-left: ${props => props.marginLeft || '0px'};
            margin-right: ${props => props.marginRight || '0px'};
            ${props => props.hCentered && 'display: flex; justify-content: center;'}
            ${props => props.rAlignment && 'display: flex; justify-content: right;'}
            ${props => props.lAlignment && 'display: flex; justify-content: left;'}
        `
    }
    
    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const FixedScrollableContainer = styled.div`
    max-height: 500px;
    overflow-y: scroll;
`

//ELEMENTS

const LightTitle = styled.p`
    font-size: ${props => props.fontSize || '22px'};
    text-align: ${props => props.textAlign || 'left'};
    font-family PPNeueMontreal;
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    color: ${props => props.red ? '#fc1333;' : '#000000;'}
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};

    @media screen and (max-width: 767px) {
        font-size: 16px;
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const HeadingDefault = styled.h2`
    color: ${props => props.red ? '#fc1333' : props.color ? props.color : '#000000'};
    font-family: Akkordeon-Nine;
    font-weight: 100;
    text-transform: uppercase;
    line-height: 0.91em;
    font-size: ${props => props.fontSize || '120px'};
    text-align: ${props => props.textAlign || 'left'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};

    span {
        color: #fc1333;
    }

    @media screen and (max-width: 767px) {
        font-size: 54px;

        br {
            display: none;
        }
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const HeadingSub = styled.h2`
    color: ${props => props.red ? '#fc1333' : props.color ? props.color : '#000000'};
    font-family: PPNeueMontreal;
    font-weight: ${props => props.fontWeight || '100'};
    line-height: normal;
    font-size: ${props => props.fontSize || '30px'};
    text-align: ${props => props.textAlign || 'left'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    letter-spacing: normal;
    position: relative;

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const CustomHeading = styled.h3`
    color: ${props => props.color || '#000000'};
    font-family: PPNeueMontreal;
    font-weight: ${props => props.fontWeight || '100'};
    line-height: normal;
    font-size: ${props => props.fontSize || '30px'};
    text-align: ${props => props.textAlign || 'left'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    letter-spacing: normal;
    position: relative;

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const Paragraph = styled.div`
    color: ${props => props.red ? '#fc1333' : props.color ? props.color : '#000000'};
    font-family PPNeueMontreal;
    font-weight: 100;
    display: ${props => props.display || 'block'};
    line-height: ${props => props.lineHeight || '30px'};
    font-size: ${props => props.fontSize || '18px'};
    text-align: ${props => props.textAlign || 'left'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    ${props => props.uppercase && 'text-transform: uppercase;'}
    ${props => props.italic && 'font-style: italic;'}
    
    p {
        font-size: ${props => props.fontSize || '20px'};
    }
        
    @media screen and (max-width: 767px) {
        font-size: 16px !important;

        p {
            font-size: 16px !important;
        }
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const RoundedThinButton = styled.span`
    background-color: #fc1333;
    color: #ffffff;
    font-family PPNeueMontreal;
    font-weight: 100;
    line-height 30px;
    font-size: 15px;
    text-transform: uppercase;
    border-radius: 50px;
    ${props => props.big ? 'padding: 35px 90px;' : 'padding: 7px 50px;'}
    display: inline-block;
    text-align: center;
    margin: ${props => props.margin || 'inherit'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    cursor: pointer;
    ${props => props.inlineBlock && 'display: inline-block;'}
    ${props => props.fixedWidth && 'width: 244px;'}
    transition: all .3s ease;

    &:hover {
        background-color: #c9031d;
    }

    @media screen and (max-width:767px) {
        padding: 10px 30px;
        text-wrap: nowrap;
        width: auto;
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const RoundedThinLightButton = styled.span`
    background-color: transparent;
    color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 50px;
    font-family PPNeueMontreal;
    font-weight: 100;
    font-size: 15px;
    line-height 30px;
    text-transform: uppercase;
    padding: 7px 50px;
    display: inline-block;
    text-align: center;
    margin: ${props => props.margin || 'inherit'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    cursor: pointer;
    ${props => props.inlineBlock && 'display: inline-block;'}
    ${props => props.fixedWidth && 'min-width: 244px;'}
    transition: all .3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
        border-color: transparent;
        color: #ffffff;
    }

    &.active {
        background-color: #000000;
        border-color: #000000;
        color: #ffffff;

        .icon {
            svg {
                stroke: #ffffff;
            }
        }
    }

    .icon {
        float: right;
        width: 25px;
        transform: rotate(180deg) translate(-20px, 10px);
    }

    @media screen and (max-width:767px) {
        padding: 10px 15px;
        text-wrap: nowrap;
        min-width: unset;
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const LineDivider = styled.hr`
    border: 1px solid ${props => props.red ? '#fc1333' : props.color ? props.color : 'rgba(0, 0, 0, .1)'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    padding-top: ${props => props.paddingTop || '0px'};
    padding-bottom: ${props => props.paddingBottom || '0px'};
    padding-left: ${props => props.paddingLeft || '0px'};
    padding-right: ${props => props.paddingRight || '0px'};
    ${props => props.condensed && 'margin-right: 46px; margin-left: 46px;'};

    @media screen and (max-width:767px) {
        margin: 70px 0px;
    }

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

const BackgroundImgContainer = styled.div`
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
    background-image: ${props => props.bgImg || 'auto'};
    border-radius: ${props => props.brRadius ? props.brRadius : '0px'};
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
`

const HideMb = styled.div`
    @media screen and (max-width:767px) {
        display: none;
    }
`

const ShowMb = styled.div`
    @media screen and (min-width:767px) {
        display: none;
    }
`

const MobileHorizontalScroll = styled.div`
    overflow-x: scroll;
    display: flex;
    scrollbar-width: none;
    ${props => props.justifyCenter && 'justify-content: center;'}
    ${props => props.verticalCenter && 'align-items: center;'}
`

const BackgroundColored = styled.div`
    background-color: ${props => props.color ? props.color : 'unset'};
    margin-top: ${props => props.marginTop || '0px'};
    margin-bottom: ${props => props.marginBottom || '0px'};
    margin-left: ${props => props.marginLeft || '0px'};
    margin-right: ${props => props.marginRight || '0px'};
    padding-top: ${props => props.paddingTop || '0px'};
    padding-bottom: ${props => props.paddingBottom || '0px'};
    padding-left: ${props => props.paddingLeft || '0px'};
    padding-right: ${props => props.paddingRight || '0px'};

    ${props => props.mobile &&
        `
            @media screen and (max-width: 767px) {
                ${props.mobile}
            }
        `
    }
`

//EXPORT

export { Container, Wrapper, HCenteredContent, AbsoluteContainer, Columns, Column, LightTitle, HeadingDefault, HeadingSub, CustomHeading, Paragraph, RoundedThinButton, RoundedThinLightButton, LineDivider, FixedScrollableContainer, BackgroundImgContainer, HideMb, ShowMb, MobileHorizontalScroll, BackgroundColored };