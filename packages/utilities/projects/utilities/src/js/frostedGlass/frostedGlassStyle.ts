const backdropFilter = 'blur(32px)';
export const frostedGlassStyle = {
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
  transform: 'translate3d(0,0,0)',
} as const;
