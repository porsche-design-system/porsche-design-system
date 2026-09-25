import type { ComponentMeta } from '@porsche-design-system/component-meta';
import type { Definition } from './snapshot';

// The naming conventions between PDS and the Figma library. figma/derive.ts places a Figma property by them, and
// scripts/figmaGenerate.ts maps a `slot-*` property back to its PDS slot.

/** The Figma property name a PDS slot needs: `slot-default` for the default slot, `slot-<name>` otherwise. */
export const figmaSlotName = (slot: string): string => (slot === '' ? 'slot-default' : `slot-${slot}`);

/** The PDS slot of a `slot-*` Figma property, as keyed in component-meta's `slotsMeta`. `''` is the default slot. */
export const pdsSlotName = (figma: string): string => figma.replace(/^slot-/, '').replace(/^default$/, '');

/** True when Figma draws `hideLabel` as `showLabel`: PDS has `hideLabel`, Figma has `showLabel` and no `hideLabel`. */
export const showLabelStandsForHideLabel = (
  defs: Record<string, Definition>,
  props: NonNullable<ComponentMeta['propsMeta']>
): boolean => !!defs.showLabel && !defs.hideLabel && !!props.hideLabel;
