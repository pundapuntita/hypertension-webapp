/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                pastel: {
                    cyan: '#cffafe', // Light cyan top-left
                    pink: '#fce7f3', // Light pink top-right
                    purple: '#e9d5ff', // Light purple bottom
                    blue: '#dbeafe', // Soft blue
                    green: '#d1fae5', // Soft green 
                    bg: '#f8fafc',
                },
                primary: {
                    DEFAULT: '#a78bfa', // Match the nice purple from the logo
                    hover: '#8b5cf6',
                },
                accent: {
                    pink: '#f472b6',
                    blue: '#60a5fa',
                }
            },
            fontFamily: {
                sans: ['"LINE Seed Sans TH"', 'Poppins', 'Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
                'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            }
        },
    },
    plugins: [],
}
