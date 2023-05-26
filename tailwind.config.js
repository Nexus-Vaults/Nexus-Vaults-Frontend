/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#F3F3F3',
        blue100: '#1f2937',
        blue50: '#457B9D',
        yellow: '#FCBA04',
        outline: '#EAE2B7',
        red: '#590004',
      },
    },
  },
  plugins: [],
};
