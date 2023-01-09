import { _frostedGlassBackgroundColor } from './frostedGlassShared';

const backdropFilter = 'blur(16px)';

// TODO: add test for vendor prefix to be in sync with scss, jss and styled-components
export const frostedGlassHighStyle = {
  backgroundColor: _frostedGlassBackgroundColor,
  WebkitBackdropFilter: backdropFilter,
  backdropFilter,
} as const;
