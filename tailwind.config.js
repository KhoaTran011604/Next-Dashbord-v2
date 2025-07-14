/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'top-right': '5px -5px 10px rgba(0, 0, 0, 0.2)',
        'bottom-right': '5px 5px 10px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'up-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'left-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rote: {
          '0%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(-2deg)' },
        },
      },
      animation: {
        'up-down': 'up-down 2s ease-in-out infinite', // bay lên 20px rồi xuống
        'left-right': 'left-right 2s ease-in-out infinite', // bay trái 20px rồi phải
        marquee: 'marquee 10s linear infinite', //Lặp vô tận
        rote: 'rote 3s ease-in-out infinite', //Auto xoay
      },
    },
  },
  plugins: [],
};
