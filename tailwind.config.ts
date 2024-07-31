import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,css,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
