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
        cHL: "#42a6f8",
        cWhite: "#EEEEEE",
        cBG: "#3A4750",
        cDark: "#303841",
        cHL2: "#2185D5",

        marsWhite: "rgba(240,231,231,1)",
        marsDark: "rgba(69,24,4, 1)",
        marsHL1: "rgba(193,68,14,1)",
        marsHL2: "rgba(231,125,17,1)",
        marsHL3: "rgba(253,166,0,1)"
      },
      backgroundColor: {
        cHL: "#42a6f8",
        cWhite: "#EEEEEE",
        cBG: "#3A4750",
        cDark: "#303841",
        cHL2: "#2185D5",
        marsWhite: "rgba(240,231,231,1)",
        marsDark: "rgba(69,24,4, 1)",
        marsHL1: "rgba(193,68,14,1)",
        marsHL2: "rgba(231,125,17,1)",
        marsHL3: "rgba(253,166,0,1)"
      },
    },
  },
  plugins: [],
}
