/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "card-glow" : "popUp .8s ease-in-out forwards"
      },
      keyframes: {
        popUp: {
          "70%" : {transform: "scale(1.1)", opacity: 0.7},
          "100%" : {transform: "scale(1)", opacity: 1}
        }
      }
    },
  },
  plugins: [],
}
