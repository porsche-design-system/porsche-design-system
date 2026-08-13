/**
 * Joins class names, dropping the ones that are not set.
 *
 * A template literal would leave a stray space in the markup for every optional class, and the pages are read as
 * much as they are rendered – so an optional class is passed through here instead.
 */
export const classes = (...values: (string | undefined | false)[]): string => values.filter(Boolean).join(' ');
