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

        // Alpha
        'white-04': 'rgba(255,255,255,0.04)',
        'white-06': 'rgba(255,255,255,0.06)',
        'white-08': 'rgba(255,255,255,0.08)',
        'white-12': 'rgba(255,255,255,0.12)',
        'black-24': 'rgba(0,0,0,0.24)',
        'black-40': 'rgba(0,0,0,0.40)',
        'black-56': 'rgba(0,0,0,0.56)',
        'brand-08': 'rgba(47,163,95,0.08)',
        'brand-12': 'rgba(47,163,95,0.12)',
        'brand-18': 'rgba(47,163,95,0.18)',
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
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'pill': 'var(--radius-pill)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'float': 'var(--shadow-float)',
        'brand-glow': 'var(--shadow-brand-glow)',
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-surface-soft': 'var(--gradient-surface-soft)',
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
