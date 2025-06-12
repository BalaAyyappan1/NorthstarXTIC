import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Add your template paths here
  ],
  theme: {
    extend: {
      screens: {
        'md-lg': { 'min': '991px', 'max': '1023px' }, // Custom breakpoint
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
};

export default config;