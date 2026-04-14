/** @type {import('tailwindcss').Config} */
// Colours and typography aligned with JCI Brand Guidelines v1.2 (2026)
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Typography ───────────────────────────────────────────────────────────
      // Primary: Plus Jakarta Sans (all weights)
      // Secondary: Arvo (quotes & callouts only)
      // Fallback: Readex Pro (Canva without Pro account only)
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        arvo: ['Arvo', 'serif'],
        readex: ['Readex Pro', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      // ─── Colours ──────────────────────────────────────────────────────────────
      // Primary brand colours
      colors: {
        jci: {
          // Primary
          blue:  '#0097D7',   // JCI Blue  — main brand colour
          black: '#130F2D',   // JCI Black — deep navy-black
          white: '#FFFFFF',   // JCI White
          // Secondary
          navy:  '#1F4789',   // JCI Navy  — analogous blue
          teal:  '#57BCBC',   // JCI Teal  — analogous blue
          yellow:'#EFC40F',   // JCI Yellow — accent, use sparingly
          // Tints of JCI Blue (75 / 50 / 25 %)
          'blue-75':  '#40AEE0',
          'blue-50':  '#80CBEB',
          'blue-25':  '#BFE5F5',
          // Tints of JCI Black
          'black-75': '#504C6A',
          'black-50': '#8887A6',
          'black-25': '#C3C3D2',
          // Tints of JCI Navy
          'navy-75':  '#5575A7',
          'navy-50':  '#8FA3C4',
          'navy-25':  '#C7D1E1',
          // Tints of JCI Teal
          'teal-75':  '#82CDCD',
          'teal-50':  '#ABDEDE',
          'teal-25':  '#D5EEEE',
          // Tints of JCI Yellow
          'yellow-75':'#F4D34B',
          'yellow-50':'#F7E187',
          'yellow-25':'#FBF0C3',
        },
        // Keep status colours unchanged
        status: {
          success: '#22c55e',
          'success-bg': '#dcfce7',
          error: '#ef4444',
          'error-bg': '#fee2e2',
          warning: '#f59e0b',
          'warning-bg': '#fef3c7',
          info: '#3b82f6',
          'info-bg': '#dbeafe',
        },
      },
      backgroundImage: {
        // JCI Blue-to-Black gradient for hero sections
        'hero-gradient': 'linear-gradient(135deg, #130F2D 0%, #1F4789 60%, #0097D7 100%)',
        // Subtle light background option
        'light-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #BFE5F5 100%)',
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
