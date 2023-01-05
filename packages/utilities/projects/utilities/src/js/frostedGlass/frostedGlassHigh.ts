import { frostedGlassBackgroundColor } from './frostedGlassShared';

// TODO: add -webkit prefix
export const frostedGlassHigh = {
  backgroundColor: frostedGlassBackgroundColor,
  backdropFilter: 'blur(16px)',
} as const;
