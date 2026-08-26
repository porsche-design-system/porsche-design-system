/**
 * The current spelling of a deprecated prop value, where one exists.
 *
 * `component-meta` records *which* values are deprecated but not what replaced them, so without this
 * the index could only offer the prop's remaining allowed values as a list — and an audit reading
 * `Current values: 2xs, xs, sm, …` has no way to tell which one `small` became. That gap cost the
 * audit twice: every value finding carried a sentence explaining the missing replacement instead of
 * an exact `from`/`to`, and the effort grading — which keys off whether a replacement is documented —
 * had no answer to key off at all.
 *
 * Every deprecated value in this release is a *renaming*: the deprecated spelling and its successor
 * resolve to the same thing (`sizeMap` and `weightMap` in `packages/components` alias both spellings
 * onto one token; a locale only changes its separator). So the mapping is stated as spelling rules
 * rather than as a fact per entry, and a rule yields a replacement **only** when the spelling it
 * derives is genuinely among that prop's current values. An unrecognised spelling, or one whose
 * successor is not offered, therefore yields nothing rather than an authoritative-looking guess —
 * the same conservative stance the collector takes when parsing a deprecation message.
 */

/**
 * Renamed spellings, keyed by the deprecated one. Each pair is an alias in the component source, not
 * a redesign: `small` and `sm` produce identical output, as do `semi-bold` and `semibold`.
 */
const RENAMES: Record<string, string> = {
  'xx-small': '2xs',
  'x-small': 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'x-large': 'xl',
  'xx-large': '2xl',
  regular: 'normal',
  'semi-bold': 'semibold',
};

/** Locales moved to their BCP 47 spelling, which differs only in the separator: `de_DE` → `de-DE`. */
const hyphenated = (value: string): string => value.replace(/_/g, '-');

/**
 * The current spelling `deprecatedValue` was renamed to, or `undefined` when no rule derives one that
 * the prop actually offers.
 */
export const valueReplacement = (deprecatedValue: string, currentValues: string[]): string | undefined => {
  const candidate = RENAMES[deprecatedValue] ?? hyphenated(deprecatedValue);
  return candidate !== deprecatedValue && currentValues.includes(candidate) ? candidate : undefined;
};
