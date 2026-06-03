/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
          grey: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712',
          },
          accent: {
            DEFAULT: '#ffffff',
            dark: '#e2e8f0',
          },
          steel: {
            50: '#f0f5fa',
            100: '#dce7f3',
            200: '#bed2e8',
            300: '#92b4d6',
            400: '#6090be',
            500: '#3d72a6',
            600: '#2e5b8c',
            700: '#264a72',
            800: '#233f5f',
            900: '#213751',
            950: '#162436',
          },
          amber: {
            50: '#fefbf3',
            100: '#fdf3db',
            200: '#fae4b5',
            300: '#f6d085',
            400: '#f1b44e',
            500: '#ed9c28',
            600: '#de811d',
            700: '#b8621a',
            800: '#944e1c',
            900: '#78411a',
            950: '#41200b',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 8px -1px rgba(15, 23, 42, 0.03)',
        'premium-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
