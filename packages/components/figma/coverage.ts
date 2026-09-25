import type { PropMeta } from '@porsche-design-system/component-meta';

// The baseline side of the coverage gaps. figma/derive.ts finds the gaps per property. This module finds the gaps per
// component, tells design what to add for a gap, and applies figma/coverage-baseline.json.

/**
 * The baseline entry for a PDS component with no Figma component set: design draws it inside a parent set (table
 * parts, items) or does not draw it at all. A tag with this entry has no other entries, because there is no set.
 */
export const componentSetGap = 'component-set';

/** The coverage gaps per component: PDS tags with no Figma component set. Deprecated tags do not count. */
export const missingComponentSets = (
  tags: readonly string[],
  present: ReadonlySet<string>,
  isDeprecated: (tag: string) => boolean
): string[] => tags.filter((tag) => !present.has(tag) && !isDeprecated(tag));

export type ExpectedProperty = { type: 'BOOLEAN' | 'TEXT' | 'VARIANT' | 'INSTANCE_SWAP'; options?: string[] };

/**
 * The Figma property design must add for a PDS prop: the type, and the options for a VARIANT. A prop whose allowed
 * values are mostly icon names is an INSTANCE_SWAP.
 */
export const expectedProperty = (
  prop: Pick<PropMeta, 'allowedValues' | 'deprecatedValues'>,
  iconNames: ReadonlySet<string>
): ExpectedProperty => {
  if (prop.allowedValues === 'boolean') return { type: 'BOOLEAN' };
  if (!Array.isArray(prop.allowedValues)) return { type: 'TEXT' };
  // a type list (`string | number`) is free text, not options; a real option list never contains the word "string"
  if ((prop.allowedValues as unknown[]).includes('string')) return { type: 'TEXT' };
  const options = (prop.allowedValues as unknown[])
    .filter((value) => value != null && value !== '' && !prop.deprecatedValues?.includes(value as string))
    .map(String);
  if (options.filter((option) => iconNames.has(option)).length > options.length / 2) return { type: 'INSTANCE_SWAP' };
  return { type: 'VARIANT', options };
};

// The baseline lists the accepted coverage gaps per PDS tag. Only a gap that is not in the baseline is reported. An
// entry that is no longer a gap is dropped, so the baseline only shrinks.
export const applyBaseline = (gaps: string[], accepted: string[]): { fresh: string[]; accepted: string[] } => ({
  fresh: gaps.filter((gap) => !accepted.includes(gap)),
  accepted: accepted.filter((gap) => gaps.includes(gap)),
});
