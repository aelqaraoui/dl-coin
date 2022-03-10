module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
      },
      colors: {
        "gray-10": "#efefef",
        "gray-20": "#eaeaea",
        "gray-30": "#757373",
        "gray-40": "#aaa",
        "gray-50": "#444",
        "blue-link": "#0d6efd",
        "blue-dark": "#0f172a",
        "smooth-gray": "#535e70",
        "blue-accent": "#1e293b",
      },
    },
  },
  plugins: [],
};
