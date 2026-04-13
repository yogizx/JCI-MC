/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#00153D',
          'navy-dark': '#000F29',
          'navy-light': '#00255c',
          gold: '#A0813D',
          'gold-dark': '#8B6D31',
          'gold-light': '#FBC764',
          cream: '#F5F2EA',
          'cream-light': '#FAF9F6',
        },
        status: {
          success: '#22c55e',
          'success-bg': '#dcfce7',
          error: '#ef4444',
          'error-bg': '#fee2e2',
          warning: '#f59e0b',
          'warning-bg': '#fef3c7',
          info: '#3b82f6',
          'info-bg': '#dbeafe',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000F29 0%, #00153D 60%, #001a4d 100%)',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
