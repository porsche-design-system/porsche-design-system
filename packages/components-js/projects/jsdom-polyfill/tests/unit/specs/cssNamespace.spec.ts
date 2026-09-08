import { describe, expect, it } from 'vitest';

// The unit tests for the helper itself live in `packages/shared/tests/unit/specs/normalizeCssNamespace.spec.ts`,
// next to its single implementation. This spec only asserts that importing the polyfill normalizes the global
// `CSS` namespace of the jsdom environment, which is what consumers (e.g. jss) rely on.
describe('global CSS namespace', () => {
  it('should expose a detachable escape after the polyfill has been applied', () => {
    // The polyfill is imported by the vitest setup file, so the global namespace is already normalized.
    const escape = globalThis.CSS.escape;

    expect(escape('a.b')).toBe('a\\.b');
  });

  it('should keep every operation of the namespace callable while detached', () => {
    const supports = globalThis.CSS.supports;

    expect(() => supports('display: grid')).not.toThrow();
  });
});
