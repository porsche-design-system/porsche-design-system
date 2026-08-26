import { componentMeta } from '@porsche-design-system/component-meta';
import { collectDeprecations } from '@skills/knowledge/deprecations/collect';
import { valueReplacement } from '@skills/knowledge/deprecations/valueReplacements';
import { describe, expect, it } from 'vitest';

/**
 * The index has to answer "what did this value become", not just "what else is allowed".
 *
 * Two fixture runs of the audit graded the same 15 value rules at different efforts, because the
 * effort lookup keys off whether the index documents a replacement and a value row documented none —
 * only a list of the prop's current values, which is a menu rather than a mapping. Everything below
 * gates the answer: that it exists, that it is one of the values the prop actually offers, and that
 * the rules deriving it stay conservative enough to yield nothing rather than a wrong claim.
 */
const VALUES = collectDeprecations()
  .flatMap((source) => source.entries)
  .filter((entry) => entry.usageKind === 'propValue');

/** Remaining allowed values by deprecation rule id, derived directly from component metadata. */
const CURRENT_VALUES = new Map(
  Object.entries(componentMeta).flatMap(([tag, meta]) =>
    Object.entries(meta.propsMeta ?? {}).flatMap(([name, prop]) => {
      const deprecatedValues = new Set((prop.deprecatedValues ?? []).map(String));
      const currentValues = (Array.isArray(prop.allowedValues) ? prop.allowedValues : [])
        .map(String)
        .filter((value) => !deprecatedValues.has(value));
      return [...deprecatedValues].map((value) => [`propValue/${tag}/${name}/${value}`, currentValues] as const);
    })
  )
);

describe('deprecated value replacements', () => {
  it('derives a renamed spelling only when the prop offers it', () => {
    expect(valueReplacement('small', ['sm', 'md'])).toBe('sm');
    expect(valueReplacement('small', ['tiny', 'huge'])).toBeUndefined();
  });

  it('derives a locale spelling from its separator alone', () => {
    expect(valueReplacement('de_DE', ['de-DE'])).toBe('de-DE');
    expect(valueReplacement('en_AE_x_abu_dhabi', ['en-AE-x-abu-dhabi'])).toBe('en-AE-x-abu-dhabi');
  });

  it('claims nothing for a spelling no rule recognises', () => {
    // The whole point of deriving rather than guessing: an unrecognised deprecation falls through to
    // the effort table's "no replacement documented" column instead of being handed an invented fix.
    expect(valueReplacement('brand-legacy', ['primary', 'secondary'])).toBeUndefined();
  });

  it('never offers the deprecated spelling back as its own replacement', () => {
    expect(valueReplacement('sm', ['sm', 'md'])).toBeUndefined();
  });

  it('has value entries to gate the index against', () => {
    expect(VALUES.length).toBeGreaterThan(0);
  });

  it('documents the current spelling for every deprecated value', () => {
    // Every deprecated value in this release is a renaming, so every one of them has an answer. If a
    // future release removes a value outright, that is a deliberate decision to record here — not a
    // row that quietly goes back to costing the audit a judgement call per run.
    expect(VALUES.filter((entry) => !entry.replacement).map((entry) => entry.id)).toStrictEqual([]);
  });

  it('only ever names a spelling the prop actually offers', () => {
    const wrong = VALUES.filter((entry) => !CURRENT_VALUES.get(entry.id)?.includes(entry.replacement as string));
    expect(wrong.map((entry) => [entry.id, entry.replacement])).toStrictEqual([]);
  });
});
