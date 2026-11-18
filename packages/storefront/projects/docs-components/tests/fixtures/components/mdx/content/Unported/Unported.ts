/** A component without a Markdown implementation. The hook never loads it, so loading it fails the test. */
export const Unported: () => null = (() => {
  throw new Error('The React implementation of Unported was loaded');
})();
