/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'cloud-pattern': "url('/src/assets/clouds.jpg')",
        sky: "url('/src/assets/sky.jpg')",
      },
    },
  },
  plugins: [],
};
