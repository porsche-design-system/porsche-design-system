import { scssIdentifier } from '../deprecation';
import { colorRef } from '../namespaces';
import { color } from '../theme/color';
import type { ScssCatalog, ScssRaw } from '../types';

const focusVisible = {
  name: 'focus-visible',
  signature: '($offset: 2px)',
  description: 'Applies a **focus-visible** style.',
  raw: `  &:focus-visible {
    outline: 2px solid ${colorRef(color.a11y.focus)};
    outline-offset: $offset;
  }`,
};

/** The lookup maps `pds-focus()` consults — non-public plumbing, emitted before the mixin. */
export const focusMaps: ScssRaw = {
  raw: `$pds-focus-offset-map: (
  'small': 2px,
  'none': 0,
);

$pds-focus-border-radius-map: (
  'small': border.$radius-sm,
  'medium': border.$radius-md,
);`,
};

/** Focus declarations: the documented `focus-visible()` mixin plus the deprecated `pds-focus` variant. */
export const focus = [
  focusVisible,
  {
    name: 'pds-focus',
    description: 'Applies a **focus** style.',
    signature: "($offset: 'small', $border-radius: 'small')",
    raw: `  // it can easily be overwritten on purpose (when placed here) and visually reflected
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
  }`,
    deprecation: { replacement: scssIdentifier(focusVisible) },
  },
] satisfies ScssCatalog;
