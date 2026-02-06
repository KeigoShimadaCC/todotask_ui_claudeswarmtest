/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F8F9FA",
        border: "#E0E0E0",
        textPrimary: "#212121",
        textSecondary: "#757575",
        critical: "#D32F2F",
        high: "#F57C00",
        medium: "#FBC02D",
        low: "#757575",
        success: "#388E3C",
        info: "#1976D2",
        warning: "#F57C00",
      },
    },
  },
  plugins: [],
};
export default config;
