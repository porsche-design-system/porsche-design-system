export type CoverageTest = (title: string, body: () => void) => void;

/** Creates one test per non-allowlisted item and one per allowlist entry, or a failing `has items` test without items. */
export const testCoverage = ({
  test,
  expect,
  items,
  getMissing,
  allowlist = [],
}: {
  test: CoverageTest;
  expect: (actual: boolean, message: string) => { toBe: (expected: boolean) => void };
  items: readonly string[];
  getMissing: (item: string) => string | undefined;
  allowlist?: readonly string[];
}): void => {
  if (items.length === 0) {
    test('has items', () => {
      expect(items.length > 0, 'no items').toBe(true);
    });
  }

  for (const item of items) {
    if (!allowlist.includes(item)) {
      test(item, () => {
        const missing = getMissing(item);
        expect(missing === undefined, `add ${missing}`).toBe(true);
      });
    }
  }

  for (const entry of allowlist) {
    test(`${entry} (allowlisted)`, () => {
      // getMissing is only called for real items, because callers may derive paths from the name.
      expect(items.includes(entry) && getMissing(entry) !== undefined, `stale allowlist entry: ${entry}`).toBe(true);
    });
  }
};
