import { _frostedGlassBackgroundColor } from './frostedGlassShared';

const backdropFilter = 'blur(8px)';

export const frostedGlassMediumStyle = {
  backgroundColor: _frostedGlassBackgroundColor,
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
} as const;
