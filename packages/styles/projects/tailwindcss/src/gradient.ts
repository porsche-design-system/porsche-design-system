import { gradientStopsFadeDark } from '@porsche-design-system/tokens';
import type { TailwindUtility } from './types';

// Documented Tailwind gradient utilities — the `bg-fade-*` fade helpers.
export const gradientUtilities: TailwindUtility[] = [
  {
    comment: 'Gradient',
    selector: '@utility bg-fade-to-t',
    class: '.bg-fade-to-t',
    description: 'Applies a fade gradient towards the top.',
    raw: `  background-image: linear-gradient(to top, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-r',
    class: '.bg-fade-to-r',
    description: 'Applies a fade gradient towards the right.',
    raw: `  background-image: linear-gradient(to right, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-b',
    class: '.bg-fade-to-b',
    description: 'Applies a fade gradient towards the bottom.',
    raw: `  background-image: linear-gradient(to bottom, ${gradientStopsFadeDark});`,
  },
  {
    selector: '@utility bg-fade-to-l',
    class: '.bg-fade-to-l',
    description: 'Applies a fade gradient towards the left.',
    raw: `  background-image: linear-gradient(to left, ${gradientStopsFadeDark});`,
  },
];
