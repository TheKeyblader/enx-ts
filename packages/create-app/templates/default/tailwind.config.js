module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: "class", // or 'media' or 'class'
    important: true,
    theme: {
        extend: {
            colors: {
                discord: {
                    "blue-violet": "#7289DA !important",
                },
            },
            gridTemplateColumns: {
                "max-content-2": "repeat(2, max-content)",
            },
        },
    },
    variants: {
        extend: {},
    },
    corePlugins: {
        preflight: false,
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
