import type { PartialParam } from '@/models/partials';

/**
 * Formats an array of `PartialParam` objects into a string representation.
 * - Strings are wrapped in single quotes.
 * - Arrays are formatted as lists with single-quoted values.
 * - The resulting key-value pairs are joined by ", ".
 *
 * @param {PartialParam[]} params - The array of key-value pairs to format.
 * @returns {string} - A formatted string of key-value pairs.
 *
 * @example
 * ```ts
 * const params: PartialParam[] = [
 *   { key: 'components', value: ['button', 'marque'] },
 *   { cdn: 'cn' }
 * ];
 *
 * formatPartialParams(params);
 * // Output: "components: ['button', 'marque'], cdn: 'cn'"
 * ```
 */
export const formatPartialParams = (params: PartialParam[]): string =>
  params
    .map(({ key, value }) => {
      const formattedValue = Array.isArray(value)
        ? `[${value.map((v) => `'${v}'`).join(', ')}]` // Format arrays properly
        : typeof value === 'string'
          ? `'${value}'` // Wrap strings in single quotes
          : value; // Leave numbers, booleans, and other types as-is

      return `${key}: ${formattedValue}`;
    })
    .join(', ');
