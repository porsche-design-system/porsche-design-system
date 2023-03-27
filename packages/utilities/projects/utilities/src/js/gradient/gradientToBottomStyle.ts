import { _gradient } from './gradientShared';

export const gradientToBottomStyle = {
  background: `linear-gradient(to bottom, ${_gradient} 100%);`,
} as const;
