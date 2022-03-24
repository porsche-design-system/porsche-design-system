import type { FontWeight } from './font-shared';

export const fontWeight: { [key in FontWeight]: number } = {
  thin: 100,
  regular: 400,
  semibold: 600,
  bold: 700,
};
