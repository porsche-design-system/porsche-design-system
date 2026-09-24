import type { ComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import { figmaSlotName, showLabelStandsForHideLabel } from './naming';
import { type Component, definitions } from './snapshot';

// Form participation: submitted with the form data, nothing to draw.
const formProps = ['form', 'name', 'value'];

// The code side of the contract: every PDS prop, slot and allowed value the Figma component must carry under the same
// name. Read by scripts/figmaGenerate.ts, which reports each entry. Not expected in Figma: aria records (no Figma
// property type holds an object), form participation, and anything deprecated.
export const missingInFigma = (
  component: Component,
  meta: Pick<ComponentMeta, 'propsMeta' | 'slotsMeta'>
): string[] => {
  const defs = definitions(component);
  const propsMeta = meta.propsMeta ?? {};
  const expected = Object.entries(propsMeta).filter(
    ([prop, { isAria, isDeprecated }]) => !isAria && !isDeprecated && !formProps.includes(prop)
  );
  const props = expected
    .filter(([prop]) => !defs[prop] && !(prop === 'hideLabel' && showLabelStandsForHideLabel(defs, propsMeta)))
    .map(([prop]) => prop);
  // every allowed value needs a variant option of the same name, reported as `prop=value`
  const values = expected
    .filter(([prop, { allowedValues }]) => defs[prop]?.type === 'VARIANT' && Array.isArray(allowedValues))
    .flatMap(([prop, { allowedValues, deprecatedValues }]) =>
      (allowedValues as unknown[])
        .filter((value) => !deprecatedValues?.includes(value as string))
        .filter((value) => !defs[prop].variantOptions?.includes(String(value))) // Figma options are strings: `4` is "4"
        .map((value) => `${prop}=${value}`)
    );
  // a named slot is also covered by a property of its own name: the library models most text slots as TEXT (`label`)
  const slots = Object.entries(meta.slotsMeta ?? {})
    .filter(([, { isDeprecated }]) => !isDeprecated)
    .map(([slot]) => [slot, figmaSlotName(slot)])
    .filter(([slot, figma]) => !defs[figma] && !(slot !== '' && defs[slot]))
    .map(([, figma]) => figma);
  return [...props, ...values, ...slots];
};

export type ExpectedProperty = { type: 'BOOLEAN' | 'TEXT' | 'VARIANT' | 'INSTANCE_SWAP'; options?: string[] };

/**
 * The Figma property the rules place for a PDS prop, so the gap report can tell design what to add: the type, and for a
 * VARIANT the options. A prop whose allowed values are mostly PDS icon names is an icon swap.
 */
export const expectedProperty = (
  prop: Pick<PropMeta, 'allowedValues' | 'deprecatedValues'>,
  iconNames: ReadonlySet<string>
): ExpectedProperty => {
  if (prop.allowedValues === 'boolean') return { type: 'BOOLEAN' };
  if (!Array.isArray(prop.allowedValues)) return { type: 'TEXT' };
  const options = (prop.allowedValues as unknown[])
    .filter((value) => value != null && value !== '' && !prop.deprecatedValues?.includes(value as string))
    .map(String);
  if (options.filter((option) => iconNames.has(option)).length > options.length / 2) return { type: 'INSTANCE_SWAP' };
  return { type: 'VARIANT', options };
};

// figma/coverage-baseline.json lists, per PDS tag, the gaps accepted as known: today's backlog plus any line added by
// hand for a prop Figma will never carry. Only a gap it does not list is reported. An entry that is no longer a gap
// (Figma has the property now, or the prop left the code) drops out, so the baseline only ever shrinks.
export const applyBaseline = (gaps: string[], accepted: string[]): { fresh: string[]; accepted: string[] } => ({
  fresh: gaps.filter((gap) => !accepted.includes(gap)),
  accepted: accepted.filter((gap) => gaps.includes(gap)),
});
