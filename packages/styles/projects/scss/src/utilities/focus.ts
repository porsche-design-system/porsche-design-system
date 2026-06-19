import type { ScssMixin, ScssRaw } from '../types';

/**
 * Single source of truth for the documented `focus-visible()` mixin. The `raw` body keeps its
 * namespaced `color.` reference — the `_focus.scss` composition descriptor declares the matching
 * `@use` headers. The deprecated `pds-focus` variant and its lookup maps (plumbing) live alongside
 * below.
 */
export const focus = [
  {
    name: 'focus-visible',
    signature: '($offset: 2px)',
    description: 'Applies a **focus-visible** style.',
    raw: `  &:focus-visible {
    outline: 2px solid color.$color-focus;
    outline-offset: $offset;
  }`,
  },
] satisfies ScssMixin[];

/**
 * The offset / border-radius lookup maps and the deprecated `pds-focus` mixin (which resolves named
 * keys through those maps). Plumbing: still emitted, but not documented `scssMeta` entries.
 * @deprecated Use the documented `focus-visible()` mixin instead.
 */
export const focusDeprecatedAliases: ScssRaw = {
  raw: `$pds-focus-offset-map: (
  'small': 2px,
  'none': 0,
);

$pds-focus-border-radius-map: (
  'small': border.$radius-sm,
  'medium': border.$radius-md,
);

/* alias (deprecated) */
@mixin pds-focus($offset: 'small', $border-radius: 'small') {
  // it can easily be overwritten on purpose (when placed here) and visually reflected
  @if map.has-key($pds-focus-border-radius-map, $border-radius) {
    border-radius: map.get($pds-focus-border-radius-map, $border-radius);
  } @else {
    @if ($border-radius) {
      border-radius: $border-radius;
    } @else {
      border-radius: map.get($pds-focus-border-radius-map, 'none');
    }
  }
  &:focus {
    outline: border.$pds-border-width-base solid color.$color-focus;
    @if map.has-key($pds-focus-offset-map, $offset) {
      outline-offset: map.get($pds-focus-offset-map, $offset);
    } @else {
      @if ($offset) {
        outline-offset: $offset;
      } @else {
        outline-offset: map.get($pds-focus-offset-map, 'small');
      }
    }
  }
  // why? have a look at this article https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
  &:focus:not(:focus-visible) {
    outline-color: transparent;
  }
}`,
};
