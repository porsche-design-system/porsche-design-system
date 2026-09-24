import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { Definition } from './snapshot';

// The library's naming conventions that both sides of the contract read: the generator's rules (scripts/figmaGenerate.ts)
// place a Figma property by them, and the coverage check (figma/coverage.ts) decides by them which PDS prop or slot a
// Figma property covers.

/** The Figma property name a PDS slot needs: `slot-default` for the default slot, `slot-<name>` otherwise. */
export const figmaSlotName = (slot: string): string => (slot === '' ? 'slot-default' : `slot-${slot}`);

/** The PDS slot a `slot-*` Figma property feeds, as keyed in component-meta's `slotsMeta` (`''` is the default slot). */
export const pdsSlotName = (figma: string): string => figma.replace(/^slot-/, '').replace(/^default$/, '');

/** Figma's `showLabel` stands for PDS `hideLabel`, inverted, when the component has `hideLabel` and Figma no `hideLabel`. */
export const showLabelStandsForHideLabel = (
  defs: Record<string, Definition>,
  props: NonNullable<ComponentMeta['propsMeta']>
): boolean => !!defs.showLabel && !defs.hideLabel && !!props.hideLabel;
