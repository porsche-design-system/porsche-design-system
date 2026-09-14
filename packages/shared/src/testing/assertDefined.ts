/**
 * Asserts that a value is neither `null` nor `undefined`, narrowing it to `NonNullable<T>`.
 *
 * @param value the value to check
 * @throws if the value is `null` or `undefined`
 */
export function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error('expected value to be defined');
  }
}
