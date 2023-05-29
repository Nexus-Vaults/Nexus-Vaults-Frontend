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
        primary: '#0e76fd',
        white: '#FFFFFF',
        whitesmoke: '#f5f5f5',
        blue100: '#233044',
        blue200: '#1e293a',
        yellow: '#FCBA04',
        outline: '#EAE2B7',
        red: '#590004',
      },
    },
  },
  plugins: [],
};
