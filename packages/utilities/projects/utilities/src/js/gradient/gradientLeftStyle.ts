import { _gradient } from './gradientShared';

export const gradientLeftStyle = {
  backgroundColor: `linear-gradient(to left, ${_gradient} 100%);`,
} as const;
