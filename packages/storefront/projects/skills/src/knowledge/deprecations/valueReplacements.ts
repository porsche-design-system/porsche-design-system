/**
 * Supplies replacements missing from `component-meta`. A derived spelling is accepted only when the
 * prop still offers it, preventing speculative migration guidance.
 */

/** Equivalent aliases from component source, keyed by deprecated spelling. */
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

const hyphenated = (value: string): string => value.replace(/_/g, '-');

export const valueReplacement = (deprecatedValue: string, currentValues: string[]): string | undefined => {
  const candidate = RENAMES[deprecatedValue] ?? hyphenated(deprecatedValue);
  return candidate !== deprecatedValue && currentValues.includes(candidate) ? candidate : undefined;
};
