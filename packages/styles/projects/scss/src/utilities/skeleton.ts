import { scssIdentifier } from '../deprecation';
import { borderRef, colorRef, motionRef } from '../namespaces';
import { border } from '../theme/border';
import { color } from '../theme/color';
import { motion } from '../theme/motion';
import type { ScssCatalog } from '../types';

const skeletonMixin = {
  name: 'skeleton',
  signature: '()',
  description: 'Applies a skeleton placeholder style to indicate loading state.',
  raw: `  @keyframes skeleton {
    from {
      background-position-x: 100%;
    }
    to {
      background-position-x: -100%;
    }
  }

  display: block;
  border-radius: ${borderRef(border.radius.sm)};
  background: transparent linear-gradient(to right, ${colorRef(color.background.frosted)} 0%, ${colorRef(color.background.frostedStrong)} 50%, ${colorRef(color.background.frosted)} 100%) 0 0 / 200% 100%;
  animation: skeleton ${motionRef(motion.duration.xl)} ${motionRef(motion.ease.inOut)} infinite;`,
};

/** Skeleton declarations: the documented `skeleton()` mixin plus the deprecated theme-parameterized `pds-skeleton` variant. */
export const skeleton = [
  skeletonMixin,
  {
    name: 'pds-skeleton',
    description: 'Applies a skeleton placeholder style for a given theme to indicate loading state.',
    signature: "($theme: 'light')",
    raw: `  @include ${skeletonMixin.name}();
  @if ($theme == 'dark') {
    color-scheme: dark;
  } @else if ($theme == 'auto') {
    color-scheme: light dark;
  } @else {
    color-scheme: light;
  }`,
    deprecation: { replacement: scssIdentifier(skeletonMixin) },
  },
] satisfies ScssCatalog;
