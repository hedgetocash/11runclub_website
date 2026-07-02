/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'red': '#EE3829',
        'coral': '#F2594B',
        'cobalt': '#1E3BD1',
        'track-black': '#0D0C0B',
        'chalk': '#F4F1EB',
        'ash': '#8A857C',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-archivo)', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
