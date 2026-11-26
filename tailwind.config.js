/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF9F5',
          100: '#F7F6F0',
          200: '#EFECE2',
          300: '#E5E1D3',
          400: '#D5CFC0',
        },
        charcoal: {
          900: '#141715',
          800: '#202421',
          700: '#2F3531',
          600: '#47504A',
          500: '#647068',
          400: '#8A978E',
          300: '#B2BBB5',
        },
        safety: {
          orange: '#F05A36',
          'orange-hover': '#DD4A27',
          'orange-light': '#FDF1ED',
          'orange-subtle': '#FAECE7',
        },
        forest: {
          green: '#315D48',
          'green-dark': '#244837',
          'green-light': '#EBF2EE',
          'green-subtle': '#D9E6DF',
        },
        status: {
          confirmed: '#D9381E',
          'confirmed-bg': '#FDF2F0',
          possible: '#D9730D',
          'possible-bg': '#FEF7ED',
          clear: '#2A6A4E',
          'clear-bg': '#F0F7F4',
          unverified: '#6B7280',
          'unverified-bg': '#F3F4F6',
        },
        warmgrey: {
          100: '#F2F2EC',
          200: '#DEDED5',
          300: '#C9C9BF',
          400: '#AFAFA3',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'technical': '0 1px 3px rgba(32, 36, 33, 0.06), 0 1px 2px rgba(32, 36, 33, 0.04)',
        'technical-md': '0 4px 12px rgba(32, 36, 33, 0.08), 0 2px 4px rgba(32, 36, 33, 0.04)',
        'technical-lg': '0 12px 28px rgba(32, 36, 33, 0.1), 0 4px 8px rgba(32, 36, 33, 0.06)',
      }
    },
  },
  plugins: [],
}
