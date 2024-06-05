/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F98866",
        textColor: "#5C5C5C",
        textColor2: "#6B6A6A",
        borderColor: "#C4C4C4",
      },
    },
  },
  plugins: [],
};
