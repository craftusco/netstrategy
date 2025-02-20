// Container for centering content
export const centerContent = `
padding-left: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
padding-right: clamp(1rem, calc(0.48rem + 2.2vw), 3.13rem); // 16px → 50px
max-width: 120rem;
margin-left: auto;
margin-right: auto;
`;

// Remove top & bottom line height from big text
export const lhCrop = `
&::before {
    content: "";
    display: block;
    height: 0;
    width: 0;
    margin-top: calc(0.91em * -0.1);
  }
  &::after {
    content: "";
    display: block;
    height: 0;
    width: 0;
    margin-bottom: calc(0.91em * -0.1);
  }
`;

// =============================
// FONTS
// =============================
export const fontsPreset = {
  // big titles
  big_title_big: `
  font-family: Akkordeon-Nine;
  font-size: clamp(5.19rem,calc(2.65rem + 10.81vw),15.63rem);
  line-height: 0.91em;
`,
  big_title_medium: `
  font-family: Akkordeon-Nine;
  font-size: 100px;
  line-height: 80px;
`,
  big_title_small: `
  font-family: Akkordeon-Nine;
  font-size: 50px;
  line-height: 55px;
`,
  //main titles
  main_title_medium: `
  font-family: NeueMontreal-Medium;
  font-size: 50px;
  line-height: 55px;
`,
  main_title_squashed: `
  font-family: NeueMontreal-Medium;
  font-size: 50px;
  line-height: 50px;
`,
  main_title_big: `
  font-family: NeueMontreal-Medium;
  font-size: 55px;
  line-height: 52px;
`,
  //small titles
  second_title: `
  font-family: PPNeueMontreal;
  font-size: 35px;
  line-height: 38px;
`,
  second_title_spaced: `
  font-family: NeueMontreal-Medium;
  font-size: 35px;
  line-height: 50px;
`,
  //subtitles
  subtitle: `
  font-family: NeueMontreal-Medium;
  font-size: 30px;
  line-height: 34px;
`,
  //paragraphs big
  paragraph_big_big: `
  font-family: NeueMontreal-Medium;
  font-size: 23px;
  line-height: 25px;
`,
  paragraph_big_medium: `
  font-family: NeueMontreal-Medium;
  font-size: 20px;
  line-height: 24px;
`,
  paragraph_big_regular: `
  font-family: PPNeueMontreal;
  font-size: 20px;
  line-height: 24px;
`,
  paragraph_big_squashed: `
  font-family: NeueMontreal-Medium;
  font-size: 20px;
  line-height: 20px;
`,
  //paragraphs small
  paragraph_normal: `
  font-family: PPNeueMontreal;
  font-size: 16px;
  line-height: 24px;
`,
};
