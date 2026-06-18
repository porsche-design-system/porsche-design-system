import type { ScssRaw } from '../types';

// `pds-skeleton` — the deprecated theme-parameterized variant wrapping the documented `skeleton()`
// mixin. Plumbing: still emitted, but not a documented `scssMeta` entry.
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
