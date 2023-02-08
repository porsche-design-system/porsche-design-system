import { _gradient } from './gradientShared';

export const gradientToTopStyle = {
  background: `linear-gradient(to top, ${_gradient} 100%);`,
} as const;
