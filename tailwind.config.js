/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{html,ts,twig,njk}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {},
  },
  plugins: [],
}

