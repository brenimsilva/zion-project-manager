/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        cWhite: "#ffffff",
        cBG: "#f5f8ff",
        cGray: "#eceef0",
        cDark: "#2f4565",
        cBlue: "rgba(58,134,254,1)",
        cGreen: "rgba(38,174,96,1)",
        cRed: "rgb(249,64,67,1)",
        cPurple: "rgba(136,86,242,1)"
      },
      backgroundColor: {
        cWhite: "#ffffff",
        cBG: "#f5f8ff",
        cGray: "#eceef0",
        cDark: "#2f4565",
        cBlue: "rgba(58,134,254,1)",
        cGreen: "rgba(38,174,96,1)",
        cRed: "rgb(249,64,67,1)",
        cPurple: "rgba(136,86,242,1)"
      },
    },
  },
  plugins: [],
}
