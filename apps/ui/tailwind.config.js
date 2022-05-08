module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#9277FF',
          500: '#7C5DFA',
          DEFAULT: '#7C5DFA',
        },
        error: {
          300: '#FF9797',
          500: '#EC5757',
          DEFAULT: '#EC5757',
        },
        grey: {
          100: '#F8F8F8',
          600: '#252945',
          700: '#1E2139',
          800: '#141625',
          900: '#0C0E16',
        },
        pgrey: {
          200: '#DFE3FA',
          300: '#888EB0',
          400: '#7E88C3',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
