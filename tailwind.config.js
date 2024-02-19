/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "backdrop-color": "rgba(255,255,255,0.1)",
        "dark-bg": "#18212f",
      },
      fontFamily: {
        poppins: "'Poppins', 'sans-serif'",
        sono: "'Sono', 'monospace'",
      },
      keyframes: {
        "spinner-loading": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "page-loading": {
          "0%, 100%": { height: "50px" },
          "50%": { height: "10px" },
        },
      },
      animation: {
        "spinner-loading": "spinner-loading infinite linear 1.5s",
        "page-loading": "page-loading infinite ease-in-out 1s",
      },
    },
  },
  plugins: [],
};

/*
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;

  --color-green-100: #dcfce7;
  --color-green-700: #15803d;

  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;

  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;



  dark-mode 
    --color-blue-100: #075985;
    --color-green-100: #166534;
    --color-yellow-100: #854d0e;
*/
