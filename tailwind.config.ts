import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'bank-gothic':    ['"BankGothic Md BT"', '"Bank Gothic"', 'BankGothic', 'sans-serif'],
        'bank-gothic-lt': ['"BankGothic Lt BT"', '"Bank Gothic"', 'BankGothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
