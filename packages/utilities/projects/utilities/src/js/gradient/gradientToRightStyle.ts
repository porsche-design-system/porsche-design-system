import { _gradient } from './gradientShared';

export const gradientToRightStyle = {
  background: `linear-gradient(to right, ${_gradient} 100%);`,
} as const;
