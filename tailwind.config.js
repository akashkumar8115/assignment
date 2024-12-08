/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/index.css",
    "./src/**/*.{js,ts,jsx,tsx}"],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA',
          main: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          light: '#34D399',
          main: '#10B981',
          dark: '#059669',
        },
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};