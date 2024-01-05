/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./partials/**/*.{html,js}", "*.{html, js}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#800000",
          light: "#e0d5da7f",
        },
        red: {
          DEFAULT: "#480606",
          light: "#d256567f",
        },
        primary: {
          DEFAULT: "#151F58",
        },
        gray: {
          DEFAULT: "#666666",
          light: "#d9d9d928",
          50: "#E4E9E7",
          dark: "#535875",
        },
        green: {
          DEFAULT: "#1bc5bd",
          dark: "#70C652",
        },
        purple: {
          DEFAULT: "#6751EB",
        },
        blue: {
          DEFAULT: "#3699ff",
          light: "#e1f0ff",
        },
        yellow: {
          DEFAULT: "#FFC444",
          light: "rgba(255, 196, 68, 0.11)",
        },
        darkOpacity: "rgba(0,0,0,0.4)",
      },
      fontFamily: {
        mulish: ["Mulish", "sans-serif"],
      },
      transitionProperty: {
        width: "width",
      },
      boxShadow: {
        card: "0 3px 10px rgb(0,0 ,0,0.2)",
      },
      backgroundImage: {
        welcomeImg: "url('/assets/images/banner.png')",
      },
    },
  },
  plugins: [],
};
