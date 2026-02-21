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
                    pink: '#FFD1DC',
                    green: '#D1E8E2', // Minty green
                    purple: '#E0BBE4',
                    blue: '#AEC6CF',
                    bg: '#FDFBF7', // Off-white cream for background
                },
                primary: {
                    DEFAULT: '#957DAD', // Deeper pastel purple for actions
                    hover: '#856D9D',
                },
                accent: {
                    pink: '#FF9AA2',
                    blue: '#84B6F4',
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
