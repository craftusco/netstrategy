import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primaryHover: "#e0122e",
    primaryColor: "#fc1333",
    whiteColor: "#ffffff",
    greyColor: "#707070",
    greyColorV2: "#E5E5E5",
    blackColorV1: "#222222",
    blackColorV2: "#242121",
    blackColorV3: "#191616",
  },
  fonts: {
    main: "Akkordeon-Nine",
    main_light: "Akkordeon-Six",
    medium: "NeueMontreal-Medium",
    regular: "PPNeueMontreal",
    handwritten: "Marker-Mark",
  },
  fontSizes: {
    size_200_500: "clamp(12.50rem, calc(8.89rem + 18.07vw), 31.25rem)",
    size_115_323: "clamp(7.19rem, calc(4.03rem + 13.46vw), 20.19rem)",
    size_83_250: "clamp(5.19rem, calc(2.65rem + 10.81vw), 15.63rem)",
    size_70_250: "clamp(4.38rem, calc(1.64rem + 11.65vw), 15.63rem)",
    size_66_250: "clamp(4.13rem, calc(1.33rem + 11.91vw), 15.63rem)",
    size_60_250: "clamp(3.75rem, calc(1.38rem + 11.88vw), 15.63rem)",
    size_70_180: "clamp(4.375rem, 3rem + 6.875vw, 11.25rem)",
    size_60_180: "clamp(3.75rem, 2.25rem + 7.5vw, 11.25rem)",
    size_80_130: "clamp(5rem, 4.375rem + 3.125vw, 8.125rem)",
    size_70_130: "clamp(4.375rem, 3.625rem + 3.75vw, 8.125rem)",
    size_66_120: "clamp(4.13rem, calc(3.31rem + 3.5vw), 7.5rem)",
    size_60_120: "clamp(3.75rem, calc(3.00rem + 3.75vw), 7.50rem)",
    size_57_100: "clamp(3.56rem, calc(2.91rem + 2.78vw), 6.25rem)",
    size_70_100: "clamp(4.38rem, calc(3.92rem + 1.94vw), 6.25rem)",
    size_50_70: "clamp(3.13rem, calc(2.88rem + 1.25vw), 4.38rem)",
    size_40_70: "clamp(2.50rem, 2.13rem + 1.88vw, 4.38rem)",
    size_50_60: "clamp(3.13rem, 3.00rem + 0.63vw, 3.75rem)",
    size_36_56: "clamp(2.25rem, calc(1.95rem + 1.29vw), 3.5rem)",
    size_35_50: "clamp(2.19rem, calc(2.00rem + 0.94vw), 3.13rem)",
    size_25_50: "clamp(1.56rem, calc(1.18rem + 1.62vw), 3.13rem)",
    size_20_50: "clamp(1.25rem, calc(0.79rem + 1.94vw), 3.13rem)",
    size_20_40: "clamp(1.25rem, calc(0.95rem + 1.29vw), 2.50rem)",
    size_20_30: "clamp(1.25rem, calc(1.10rem + 0.65vw), 1.88rem)",
    size_20_25: "clamp(1.25rem, calc(1.19rem + 0.31vw), 1.56rem)",
    size_22_28: "clamp(1.40rem, calc(1.30rem + 0.41vw), 1.80rem)",
    size_22_25: "clamp(1.38rem, 1.34rem + 0.19vw, 1.56rem)",
    size_20_28: "clamp(1.25rem, calc(1.15rem + 0.50vw), 1.75rem)",
    size_18_38: "clamp(1.13rem, calc(0.82rem + 1.29vw), 2.38rem)",
    size_16_30: "clamp(1.05rem, calc(0.7rem + 1.5vw), 2.5rem)",
    size_16_28: "clamp(1.00rem, calc(0.82rem + 0.78vw), 1.75rem)",
    size_16_25: "clamp(1rem, calc(0.86rem + 0.58vw), 1.56rem)",
    size_16_22: "clamp(1.00rem, calc(0.93rem + 0.38vw), 1.38rem)",
    size_16_20: "clamp(1rem, calc(0.94rem + 0.26vw), 1.25rem)",
    size_12_20: "clamp(0.75rem, calc(0.63rem + 0.52vw), 1.25rem)",
    size_12_15: "clamp(0.75rem, calc(0.71rem + 0.18vw), 0.94rem)",
    size_paragraph: "clamp(1rem,calc(0.94rem + 0.26vw),1.25rem)"
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
