import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wave-pattern': "url('/wave.svg')",
      },
      container: {
        screens: {
          lg: '1000px', // Custom max-width for large screens
        },
      },
      colors: {
        primary: "#030834",
        secondary: "#00b3b3",
        accent: '#ec3f77',
        neutral: "#f2f2f2",
        text: "#333333",
		    card: "#090e34",
		    random: "#010522",
        // Add more custom colors here
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
