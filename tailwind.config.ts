import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bg-primary": "#121212",
        "bg-primary-default": "#222222",
        "bg-highlight": "#1cd760",
        "bg-secondary": "#030303",
        "text-primary": "#f3f3f3",
        "text-secondary": "#101010",
        "text-highlight": '#1cd760',
        "ui-default": "rgb(49, 49, 49)",
        "bg-trans": "#00000000",
      }
    },
  },
  plugins: [],
};
export default config;
