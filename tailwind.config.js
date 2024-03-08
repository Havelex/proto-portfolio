/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				foreground: 'var(--foreground)',
				foreground_pale: 'var(--foreground_pale)',
				background: 'var(--background)',
				background_light: 'var(--background_light)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
				error: 'var(--error)'
			}
		},
		fontFamily: {
			heading: ['Lexend Variable', 'sans-serif'],
			text: ['Epilogue Variable', 'sans-serif'],
			paragraph: ['Epilogue Variable', 'serif'],
			code: ['JetBrains Mono', 'monospace']
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
