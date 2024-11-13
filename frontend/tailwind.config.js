/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein600: "slidein 1s ease 600ms",
        slidein300: "slidein 1s ease 300ms",
        slidein900: "slidein 1s ease 900ms",

      },
      colors: {
        'maroon': '#800000',
        'beige': '#f4f4ed'
      }
    },
  },
  plugins: [],
}

