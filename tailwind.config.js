/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#57b0e2",
        secondary: "#2d9cdb",
        third:"#90caf9",
        bold:"#2d9cdb",
        Bold:"#298cc5",
        grayy:"#37474f",
        fifth:"#42a6df",
        light:"#6cbae6",
        light_2:"#c0e1f4"


      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
