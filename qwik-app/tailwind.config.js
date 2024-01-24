/** @type {import("tailwindcss").Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "h1-sm": "var(--h1-size-sm)",
        "h1-md": "var(--h1-size-md)",
        "h1-lg": "var(--h1-size-lg)",

        "h2-sm": "var(--h2-size-sm)",
        "h2-md": "var(--h2-size-md)",
        "h2-lg": "var(--h2-size-lg)",

        "h3-sm": "var(--h3-size-sm)",
        "h3-md": "var(--h3-size-md)",
        "h3-lg": "var(--h3-size-lg)",

        "h4-sm": "var(--h4-size-sm)",
        "h4-md": "var(--h4-size-md)",
        "h4-lg": "var(--h4-size-lg)",

        "h5-sm": "var(--h5-size-sm)",
        "h5-md": "var(--h5-size-md)",
        "h5-lg": "var(--h5-size-lg)",

        "h6-sm": "var(--h6-size-sm)",
        "h6-md": "var(--h6-size-md)",
        "h6-lg": "var(--h6-size-lg)",

        "extra-large-sm": "var(--extra-large-size-sm)",
        "extra-large-md": "var(--extra-large-size-md)",
        "extra-large-lg": "var(--extra-large-size-lg)",

        "large": "var(--large-size)",
        "medium": "var(--medium-size)",
        "small": "var(--small-size)",
        "extra-small": "var(--extra-small-size)",

      },
      colors: {
        "background": "var(--color-bg)",
        "background-dark": "var(--color-bg-dark)",
        "primary": "var(--color-primary)",

        "alerts-success": "var(--color-alerts-success)",
        "alerts-error": "var(--color-alerts-error)",

        "additional-dark-smooth": "var(--color-additional-dark-smooth)",
        "additional-dark-line": "var(--color-additional-dark-line)",
        "additional-line": "var(--color-additional-line)",

        "grayscale-10": "var(--color-grayscale-10)",
        "grayscale-20": "var(--color-grayscale-20)",
        "grayscale-30": "var(--color-grayscale-30)",
        "grayscale-40": "var(--color-grayscale-40)",
        "grayscale-50": "var(--color-grayscale-50)",
        "grayscale-60": "var(--color-grayscale-60)",
        "grayscale-70": "var(--color-grayscale-70)",
        "grayscale-80": "var(--color-grayscale-80)",
        "grayscale-90": "var(--color-grayscale-90)",
        "grayscale-100": "var(--color-grayscale-100)",
      }
    },
  },
  plugins: [],
};
