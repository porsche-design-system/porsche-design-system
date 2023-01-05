import { frostedGlassBackgroundColor } from './frostedGlassShared';

const backdropFilter = 'blur(16px)';

export const frostedGlassHigh = {
  backgroundColor: frostedGlassBackgroundColor,
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
} as const;
