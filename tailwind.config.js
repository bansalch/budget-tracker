// tailwind.config.js
module.exports = {
 content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
 theme: {
  extend: {
    animation: {
      'float-slow': 'float 6s ease-in-out infinite',
      'float-fast': 'float 3s ease-in-out infinite',
      'float-slower': 'float 9s ease-in-out infinite',
    },
    colors: {
        beige: '#fef6e4',
        'beige-light': '#fff7e7',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
  },
 },
 plugins: [],
}
