export const colors = {
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  secondary: {
    DEFAULT: 'hsl(var(--secondary))',
    foreground: 'hsl(var(--secondary-foreground))',
  },
  shoka: {
    DEFAULT: '#E95469',
    light: '#FF6B7A',
    dark: '#D63F55',
  },
  themeToggle: {
    sun: '#ffbb52',
    moon: '#17181c',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  border: 'hsl(var(--border))',
};

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  bezier: {
    outQuart: [0.25, 1, 0.5, 1] as const,
    outExpo: [0.16, 1, 0.3, 1] as const,
    inQuart: [0.5, 0, 0.75, 0] as const,
  },
  spring: {
    default: { type: 'spring' as const, stiffness: 320, damping: 28 },
    pop: { type: 'spring' as const, stiffness: 420, damping: 24 },
    press: { type: 'spring' as const, stiffness: 500, damping: 30 },
  },
} as const;
