const backdropFilter = 'blur(32px)';
export const frostedGlassStyle = {
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
  transform: 'translateZ(0)',
} as const;
