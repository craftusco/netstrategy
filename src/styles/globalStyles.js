import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  /* Reset css */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "PPNeueMontreal";
    /* scroll-behavior: smooth; */
    /* cursor: none; */
  }

  audio::-webkit-media-controls-timeline, 
  video::-webkit-media-controls-timeline {
    display: none;
}

  @media (max-width: 980px) {
    h2{
      word-break: break-word;
    }
  }

  body {
    overflow-x: hidden;
    background-color: #fff;
  }

  #__next {
    background-color: #fff;
  }

  h1,h2,h3, h4 {
    font-weight: 100;
  }

  span {
    font-family: inherit;
  }

  p, ul, li {
    font-size:clamp(1.06rem, 1.03rem + 0.19vw, 1.25rem); //17 > 20
    line-height: clamp(1.38rem, calc(1.33rem + 0.25vw), 1.63rem);
  }

  table {
    font-size:clamp(1.06rem, 1.03rem + 0.19vw, 1.25rem); //17 > 20
    line-height: clamp(1.38rem, calc(1.33rem + 0.25vw), 1.63rem);
    text-align: left;
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0.5rem;
  }

  p > a {
    text-decoration: underline;
  }

  strong {
    font-weight: 100;
    /* font-family: "NeueMontreal-Medium"; */
    position: relative;

    /* text-decoration: underline;
    text-decoration-thickness: 4px;
    text-underline-offset: 0px;
    text-decoration-skip-ink: none;
    text-decoration-color: #fc1333; */
    background-color: rgb(0 0 0 / 10%);
  }


  a {
    color: inherit;
    text-decoration: none;
  }

  /* Disable Blue Highlight when Touch/Press --- */
    button,
    textarea,
    input,
    select,
    .no_highlights,
    a{
     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
     -webkit-tap-highlight-color: transparent;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
      user-select: none;
    
    }

  /* Disable default mobile input style --- */
textarea,
input[type="text"],
input[type="button"],
input[type="submit"],
input[type="email"],
input[type="tel"],
input[type="checkbox"],
input[type="number"] {
  -webkit-appearance: none;
  border-radius: 0;
}
  
  /* Hide scrollbar */
  .hideScrollbar::-webkit-scrollbar {
    display: none;
  }
  .hideScrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

/* Blue select highlight --- */
*::selection {
  background: #fc1333; /* WebKit/Blink Browsers */
  color: #fff;
}
*::-moz-selection {
  background: #fc1333; /* Gecko Browsers */
  color: #fff;
}

//! SCROLLBAR
/* width */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #aaaaaa; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #aaaaaa; 
}

//! IUBENDA --- 


`;

export default GlobalStyle;
