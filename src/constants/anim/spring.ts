export const microDampingPreset = {
  type: 'spring' as const,
  stiffness: 350,
  damping: 26,
  mass: 0.8,
};

export const gentleSpringPreset = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 24,
};

export const snappySpringPreset = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 30,
};
