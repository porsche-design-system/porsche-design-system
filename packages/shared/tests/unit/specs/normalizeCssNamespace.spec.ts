import { describe, expect, it } from 'vitest';
import { normalizeCssNamespace } from '../../../src/testing/normalizeCssNamespace';

/**
 * Rebuilds the shape jsdom >= 30 uses for the `CSS` namespace: the operations live on a prototype and
 * brand-check their `this` receiver, so they throw when called detached from the namespace object.
 */
const createBrandCheckedCssNamespace = () => {
  class CSSNamespace {
    escape(value: string): string {
      if (!(this instanceof CSSNamespace)) {
        throw new TypeError("'escape' called on an object that is not a valid instance of CSS.");
      }
      return value.replace(/([[\].#*$><+~=|^:(),"'`\s])/g, '\\$1');
    }

    supports(value: string): boolean {
      if (!(this instanceof CSSNamespace)) {
        throw new TypeError("'supports' called on an object that is not a valid instance of CSS.");
      }
      return Boolean(value);
    }
  }

  return new CSSNamespace() as unknown as { escape: (value: string) => string; supports: (value: string) => boolean };
};

describe('normalizeCssNamespace()', () => {
  it('should make a brand-checked operation callable while detached', () => {
    const cssNamespace = createBrandCheckedCssNamespace();

    const beforeNormalization = cssNamespace.escape;
    expect(() => beforeNormalization('a.b')).toThrow(/not a valid instance of CSS/);

    normalizeCssNamespace(cssNamespace);

    const escape = cssNamespace.escape;
    expect(escape('a.b')).toBe('a\\.b');
  });

  it('should normalize every operation of the namespace, not just escape', () => {
    const cssNamespace = createBrandCheckedCssNamespace();
    normalizeCssNamespace(cssNamespace);

    const supports = cssNamespace.supports;
    expect(supports('display: grid')).toBe(true);
  });

  it('should keep the operation callable on the namespace itself', () => {
    const cssNamespace = createBrandCheckedCssNamespace();
    normalizeCssNamespace(cssNamespace);

    expect(cssNamespace.escape('a.b')).toBe('a\\.b');
  });

  it('should be idempotent', () => {
    const cssNamespace = createBrandCheckedCssNamespace();

    normalizeCssNamespace(cssNamespace);
    normalizeCssNamespace(cssNamespace);
    normalizeCssNamespace(cssNamespace);

    const escape = cssNamespace.escape;
    expect(escape('a.b')).toBe('a\\.b');
  });

  it('should be a no-op when the host exposes no CSS namespace', () => {
    expect(() => normalizeCssNamespace(undefined)).not.toThrow();
    expect(() => normalizeCssNamespace(null as unknown as object)).not.toThrow();
  });

  it('should leave a browser-shaped namespace untouched', () => {
    // Browsers expose the operations as own properties, so they already work detached.
    const escape = (value: string) => value.replace(/\./g, '\\.');
    const cssNamespace = { escape };

    normalizeCssNamespace(cssNamespace);

    expect(cssNamespace.escape).toBe(escape);
    expect(cssNamespace.escape('a.b')).toBe('a\\.b');
  });

  it('should not invoke accessors while normalizing', () => {
    let accessorCalls = 0;
    class CSSNamespace {
      get someAccessor(): string {
        accessorCalls++;
        return 'value';
      }
      escape(value: string): string {
        return value;
      }
    }
    const cssNamespace = new CSSNamespace();

    normalizeCssNamespace(cssNamespace);

    expect(accessorCalls).toBe(0);
  });
});

describe('global CSS namespace', () => {
  it('should expose a detachable escape after the vitest setup has normalized it', () => {
    // The setup file of this package calls `normalizeCssNamespace()` for the global namespace.
    const escape = globalThis.CSS.escape;

    expect(escape('a.b')).toBe('a\\.b');
  });
});
