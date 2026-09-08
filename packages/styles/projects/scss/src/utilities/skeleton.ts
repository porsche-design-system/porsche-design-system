import { borderRef, colorRef, motionRef } from '../namespaces';
import { border } from '../theme/border';
import { color } from '../theme/color';
import { motion } from '../theme/motion';
import type { ScssMixin, ScssRaw } from '../types';

/** The documented `skeleton()` mixin. The `raw` body references its `border` / `color` / `motion` cross-references via `ref()`. */
export const skeleton = [
  {
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
  },
] satisfies ScssMixin[];

/**
 * Deprecated theme-parameterized `pds-skeleton` variant (plumbing).
 * @deprecated Use the documented `skeleton()` mixin.
 */
export const skeletonDeprecatedMixin: ScssRaw = {
  raw: `@mixin pds-skeleton($theme: 'light') {
  @include skeleton();
  @if ($theme == 'dark') {
    color-scheme: dark;
  } @else if ($theme == 'auto') {
    color-scheme: light dark;
  } @else {
    color-scheme: light;
  }
}`,
};
