import { _gradient } from './gradientShared';

export const gradientBottomStyle = {
  backgroundColor: `linear-gradient(to bottom, ${_gradient} 100%);`,
} as const;
