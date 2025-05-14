import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Deep blue color for primary actions
        secondary: '#4B5563', // Gray color for secondary elements
        accent: '#F59E0B', // Amber color for accents
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        'primary-light': '#3B82F6', // Lighter blue for hover states
        'primary-dark': '#1E3A8A', // Darker blue for active states
        'accent-light': '#FBBF24', // Lighter amber
        'accent-dark': '#D97706', // Darker amber
        success: '#10B981', // Green color for success messages
        error: '#EF4444', // Red color for error messages
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config; 