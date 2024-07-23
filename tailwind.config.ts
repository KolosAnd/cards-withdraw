import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xl': {'max': '1200px'},
      'lg': {'max': '1024px'},
      'md': {'max': '768px'},
      'sm': {'max': '480px'},
      'xs': {'max': '375px'},
    },
    extend: {
      fontFamily: {
        'Montserrat': ['"Montserrat"', 'sans-serif'],
      },
      height: {
        '120': '120px',
        '96': '96px'
      },
      borderWidth: {
        '1': '1px',
      },
      backgroundImage: {
        'visaGradient': 'linear-gradient(rgba(24, 32, 97, 1), rgba(25, 42, 136, 0.9))',
      },
      colors: {
        labelGradient: 'rgba(255, 255, 255, 0.15)',
        amazonCard: '#252F3D',
        amazonCardHover: '#313b50',
        borderSelectedCard: '#FAAD31',
        warning: '#CA5E64',
        greyText: '#757575',
        buttonPrimary: '#FF6915',
        buttonDisabled: '#EAEAEA',
        bonus: 'rgba(255, 105, 21, 0.1)',

      },
      boxShadow: {
        'custom': '0px 4px 4px 0px #00000040',
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotation: 'rotation 1s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
