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
        // Background
        'bg-app': '#171C1A',
        'bg-nav': '#18191B',
        'bg-elevated': '#1E2320',
        
        // Surface
        'surface-1': '#252628',
        'surface-2': '#2C2D2F',
        'surface-3': '#303436',
        'surface-green': '#24312C',
        'surface-green-2': '#2E3F38',
        
        // Text
        'text-primary': '#F3F5F4',
        'text-secondary': '#C7CFCA',
        'text-tertiary': '#97A39D',
        'text-muted': '#6F7974',
        'text-on-light': '#1D2320',
        
        // Brand
        'brand-300': '#44C98A',
        'brand-400': '#2FA35F',
        'brand-500': '#29764A',
        'brand-600': '#28553C',
        'brand-700': '#1F3D2E',
        
        // Accent
        'teal-500': '#067D76',
        'info-500': '#4E8DFF',
        'warning-500': '#D9A441',
        'danger-500': '#D65C5C',
        'success-500': '#2FA35F',
        
        // Inverse
        'inverse-bg': '#F3F5F4',
        'inverse-bg-hover': '#FFFFFF',
        'inverse-border': '#E5EAE7',
        'inverse-text': '#1D2320',
      },
      fontFamily: {
        sans: [
          'Inter',
          '"SF Pro Display"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 12px 28px rgba(0,0,0,0.38)',
        'float': '0 18px 40px rgba(0,0,0,0.48)',
        'brand-glow': '0 0 24px rgba(47,163,95,0.14)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #44C98A 0%, #29764A 100%)',
        'gradient-surface-soft': 'linear-gradient(180deg, #2E3F38 0%, #24312C 100%)',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;