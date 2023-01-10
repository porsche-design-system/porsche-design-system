import { _gradient } from './gradientShared';

export const gradientTopStyle = {
  backgroundColor: `linear-gradient(to top, ${_gradient} 100%);`,
} as const;
