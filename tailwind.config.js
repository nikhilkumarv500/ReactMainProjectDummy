/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        cartLayout: "870px",
        cart: "1360px",
      },
    },
  },
  plugins: [],
};
