/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      lightBrown: "#5e3519",
      darkBrown: "#221f20",
      shadow: "rgb(34, 31, 32)",
      snow: "rgb(243, 241, 234)",
      milk: "#f3f1ea",
      transparent: "rgba(34, 31, 32, 0)",
      listBorder: "rgba(34, 31, 32, .15)",
      darkGray: "#a5a097",
      black: "#000000",
      white: "#FFFFFF",
      transparentBlack: "rgba(0, 0, 0, 0.5)",
      ligthGrey: "rgb(236,236,236)",
      primaryBtn: "#592ff4",
      inputBorder: "rgba(0,0,0,.045)",
      dim: "rgb(233, 228, 220)",
    },
  },
  plugins: [],
};
