/**
 * Design tokens — source of truth.
 * In a real system these would be generated from Style Dictionary / Figma Tokens.
 */
export const colors = {
  // Primitives
  neutral: {
    0:   '#ffffff',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    1000: '#000000',
  },
  brand: {
    50:  '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  danger: {
    50:  '#fff1f2',
    500: '#f43f5e',
    700: '#be123c',
  },
  success: {
    50:  '#f0fdf4',
    500: '#22c55e',
    700: '#15803d',
  },
} as const

// Semantic aliases
export const semantic = {
  light: {
    'bg-default':      colors.neutral[0],
    'bg-subtle':       colors.neutral[100],
    'fg-default':      colors.neutral[900],
    'fg-muted':        colors.neutral[500],
    'border-default':  colors.neutral[200],
    'accent':          colors.brand[600],
    'accent-hover':    colors.brand[700],
    'accent-fg':       colors.neutral[0],
    'danger':          colors.danger[500],
    'danger-hover':    colors.danger[700],
    'success':         colors.success[500],
  },
  dark: {
    'bg-default':      colors.neutral[900],
    'bg-subtle':       colors.neutral[800],
    'fg-default':      colors.neutral[100],
    'fg-muted':        colors.neutral[400],
    'border-default':  colors.neutral[700],
    'accent':          colors.brand[400],
    'accent-hover':    colors.brand[300],
    'accent-fg':       colors.neutral[900],
    'danger':          colors.danger[500],
    'danger-hover':    colors.danger[50],
    'success':         colors.success[500],
  },
} as const
