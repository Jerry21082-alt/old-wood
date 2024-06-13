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
      snow: "rgb(243, 241, 234)",
      milk: "#f3f1ea",
      transparent: "rgba(34, 31, 32, 0)",
      listBorder: "rgba(34, 31, 32, .15)",
      darkGray: "#a5a097",
    },
  },
  plugins: [],
};
