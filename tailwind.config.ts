import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        card: '#222222',
        navbar: '#1C1C1C',
        outline: '#2E2E2E',
        outline2: '#3E3E3E',
        stroke: '#7E7E7E',
        card2: '#212121',
        textHolder: '#9B9B9B',
        surface: '#282828',
        heading: '#EDEDED',
        heading2: '#E6E6E6',
        button: '#3BBF84',
        outButton: '#3DCC8C',
      },
    },
  },
  plugins: [],
}
export default config
