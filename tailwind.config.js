module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
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
      white: "#ffffff",
      black: "#000000",
      green: "#21C566",
      red: "#FF0000",
      "gold-yellow": "#eab308",
      "smooth-yellow": "#fde68a",
      "blue-700": "#1d4ed8",
      "blue-500": "#3b82f6",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
      },
      zIndex: {
        9999: "9999",
      },
    },
  },
  plugins: [],
};
