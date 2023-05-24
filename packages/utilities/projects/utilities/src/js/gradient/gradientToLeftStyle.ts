import { _gradient } from './gradientShared';

export const gradientToLeftStyle = {
  background: `linear-gradient(to left, ${_gradient} 100%);`,
} as const;
