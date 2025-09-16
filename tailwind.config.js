/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro-futuristic color palette
        bg: 'hsl(240, 25%, 8%)',
        'bg-secondary': 'hsl(240, 20%, 12%)',
        text: 'hsl(0, 0%, 95%)',
        'text-secondary': 'hsl(0, 0%, 75%)',
        'text-muted': 'hsl(0, 0%, 55%)',
        
        // Neon accent colors
        accent: 'hsl(180, 100%, 50%)', // Cyan neon
        'accent-secondary': 'hsl(300, 100%, 60%)', // Magenta neon
        primary: 'hsl(260, 100%, 70%)', // Purple neon
        'primary-dark': 'hsl(260, 100%, 50%)',
        
        // Surface colors with depth
        surface: 'hsl(240, 20%, 15%)',
        'surface-elevated': 'hsl(240, 25%, 18%)',
        'surface-glass': 'hsla(240, 25%, 18%, 0.8)',
        
        // Status colors
        success: 'hsl(120, 100%, 50%)',
        warning: 'hsl(45, 100%, 50%)',
        error: 'hsl(0, 100%, 60%)',
        
        // Pool table colors
        'pool-felt': 'hsl(120, 50%, 25%)',
        'pool-rail': 'hsl(30, 40%, 20%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      spacing: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 8px 32px hsla(0, 0%, 0%, 0.4)',
        'card-elevated': '0 16px 48px hsla(0, 0%, 0%, 0.6)',
        'focus': '0 0 0 2px hsl(180, 100%, 50%)',
        'glow': '0 0 20px hsla(180, 100%, 50%, 0.3)',
        'glow-strong': '0 0 40px hsla(180, 100%, 50%, 0.5)',
        'inner-glow': 'inset 0 0 20px hsla(180, 100%, 50%, 0.1)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px hsla(180, 100%, 50%, 0.3)' },
          '100%': { boxShadow: '0 0 20px hsla(180, 100%, 50%, 0.8), 0 0 30px hsla(180, 100%, 50%, 0.4)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
    },
  },
  plugins: [],
}