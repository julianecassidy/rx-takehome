import type { Config } from 'tailwindcss';
// import forms from '@tailwindcss/forms';

const config: Omit<Config, 'content'> = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Gill Sans MT Condensed"', "Arial", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        display: ['"Poiret One"', "cursive"],
        body: ['Montserrat', 'Arial', 'sans-serif'],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#457B9D",
          "primary-400": "#1D3557",
          "primary-content": "#F1FAEE",
          "secondary": "#A8DADC",
          "accent": "#E63946",
          "base-100": "#F1FAEE",
          "neutral": "#0D1B2A",
        },
      },
    ],
    // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    // darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};

export default config;
