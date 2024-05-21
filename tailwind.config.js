/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                10: "10px",
                16: "16px",
                20: "20px",
                30: "30px",
            },
            spacing: {
                2: "2px",
                4: "4px",
                6: "6px",
                8: "8px",
                10: "10px",
                16: "16px",
                20: "20px",
            },
            borderRadius: {
                2: "2px",
                4: "4px",
                6: "6px",
                8: "8px",
                10: "10px",
                16: "16px",
                17: "17px",
                20: "20px",
            },
            colors: {
                lightGreen: "#afddc7",
            },
            fontWeight: {
                400: 400,
                600: 600,
                700: 700,
                800: 800,
            },
        },
    },
    plugins: [],
};
