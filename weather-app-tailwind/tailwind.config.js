/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'sky-pattern': "url('/src/assets/sky.jpg')",
        'cloud-pattern': "url('/src/assets/clouds.jpg')",
      },
    },
  },
  plugins: [],
};
