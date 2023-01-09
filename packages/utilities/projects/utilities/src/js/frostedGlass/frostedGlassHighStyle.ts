import { _frostedGlassBackgroundColor } from './frostedGlassShared';

const backdropFilter = 'blur(16px)';

export const frostedGlassHighStyle = {
  backgroundColor: _frostedGlassBackgroundColor,
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
} as const;
