/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)'
      }
    },
    fontFamily: {
      heading: ['Alata', 'sans-serif'],
      text: ['Lato', 'sans-serif'],
      paragraph: ['Lora', 'serif'],
      code: ['JetBrains Mono', 'monospace']
    }
  },
  plugins: []
};
