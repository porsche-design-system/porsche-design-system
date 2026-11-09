export type CoverageTest = (title: string, body: () => void) => void;

/** Creates one test per non-allowlisted item and one per allowlist entry, or a failing `has items` test without items. */
export const testCoverage = ({
  test,
  items,
  getMissing,
  allowlist = [],
}: {
  test: CoverageTest;
  items: readonly string[];
  getMissing: (item: string) => string | undefined;
  allowlist?: readonly string[];
}): void => {
  if (items.length === 0) {
    test('has items', () => {
      throw new Error('no items');
    });
  }

  for (const item of items) {
    if (!allowlist.includes(item)) {
      test(item, () => {
        const missing = getMissing(item);
        if (missing !== undefined) {
          throw new Error(`add ${missing}`);
        }
      });
    }
  }

  for (const entry of allowlist) {
    test(`${entry} (allowlisted)`, () => {
      // getMissing is only called for real items, because callers may derive paths from the name.
      if (!items.includes(entry) || getMissing(entry) === undefined) {
        throw new Error(`stale allowlist entry: ${entry}`);
      }
    });
  }
};
