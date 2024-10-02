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
        sans: ['"Zen Loop"', "Arial", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        display: ['"Reenie Beanie"', "cursive"],
        body: ['Raleway', 'Arial', 'sans-serif'],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#D81159",
          "primary-content": "#FBFFFE",
          "secondary": "#8F2D56",
          "accent": "#FE9920",
          "base-200": "#FBFFFE",
          "base-100": "#160C28",
          "neutral": "#F0F3F5",
        },
      },
      {
        dark: {
          "primary": "#D81159",
          "primary-content": "#FBFFFE",
          "secondary": "#8F2D56",
          "accent": "#FE9920",
          "base-200": "#160C28",
          "base-100": "#FBFFFE",
          "neutral": "#160C28",
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};

export default config;
