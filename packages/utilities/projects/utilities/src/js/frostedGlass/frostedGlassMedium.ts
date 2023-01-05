import { frostedGlassBackgroundColor } from './frostedGlassShared';

const backdropFilter = 'blur(8px)';

export const frostedGlassMedium = {
  backgroundColor: frostedGlassBackgroundColor,
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
} as const;
