/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    letterSpacing: {
      primary: '0.4em',
      secondary: '0.15em',
      wide: '0.04em'
    },
    extend: {
      colors: {
        primary: '#0e76fd',
        white: '#FFFFFF',
        whitesmoke: '#f5f5f5',
        blue100: '#233044',
        blue200: '#2f67c9',
        blue50: '#376fd0',
        background: '#dfe8f6',
        yellow: '#FCBA04',
        outline: '#EAE2B7',
        red: '#590004',
        purple: '#5d35b1',
        purple50: '#855DD9',
        purple100: '#7149C5',
        rose: "#E399DC",
      },
    },
  },
  plugins: [],
};