import { minifyCss } from './minifyCss';

type GetComponentCss = (...args: any[]) => string;

/**
 * Upper bound of cached stylesheets per style function. It holds every built-in icon (307) in one color, size and CDN,
 * while a free-form argument like the `source` URL of `p-icon` cannot grow the cache beyond it.
 */
export const MAX_ENTRIES_PER_STYLE_FUNCTION = 500;

/**
 * Entries whose key and stylesheet together are longer are not cached, so a style function holds at most 10 million
 * characters. The largest stylesheet without free-form arguments (`p-canvas`) has about 9,000 characters; longer ones come
 * from free-form strings such as an icon `source` with a data URL, which ends up in the key and twice in the stylesheet.
 */
export const MAX_ENTRY_LENGTH = 20_000;

// The inner maps are LRU caches: iteration follows insertion order, and every access re-inserts its key.
const cachesByStyleFunction = new WeakMap<GetComponentCss, Map<string, string>>();

// `JSON.stringify()` drops `undefined` and turns `NaN` and `±Infinity` into `null`, although style functions treat
// them differently, e.g. default parameters apply to `undefined` only. Prefixing every string keeps the strings these
// values become distinct from the strings passed as arguments.
const toKeyValue = (_key: string, value: unknown): unknown =>
  typeof value === 'string'
    ? `s${value}`
    : value === undefined || (typeof value === 'number' && !Number.isFinite(value))
      ? String(value)
      : value;

/**
 * Returns the minified result of `getComponentCss(...args)`, cached per combination of arguments.
 * Generating it with JSS on every server render took about a third of the CPU time of a React Router app, see
 * https://github.com/porsche-design-system/porsche-design-system/issues/4784.
 *
 * `getComponentCss` must be a pure function of its arguments and of the CDN base URL, which is part of the key because
 * `getIconCss()` and `getModelSignatureCss()` read it from the global that `PorscheDesignSystemProvider` sets per render
 * from its `cdn` prop.
 */
export const getCachedMinifiedCss = <T extends GetComponentCss>(getComponentCss: T, ...args: Parameters<T>): string => {
  let cache = cachesByStyleFunction.get(getComponentCss);
  if (!cache) {
    cache = new Map();
    cachesByStyleFunction.set(getComponentCss, cache);
  }

  const cdnBaseUrl = (globalThis as { PORSCHE_DESIGN_SYSTEM_CDN_URL?: string }).PORSCHE_DESIGN_SYSTEM_CDN_URL;
  const key = JSON.stringify([cdnBaseUrl, ...args], toKeyValue);

  let css = cache.get(key);
  if (css !== undefined) {
    cache.delete(key); // re-inserted below to become the most recently used entry
  } else {
    css = minifyCss(getComponentCss(...args));
    if (key.length + css.length > MAX_ENTRY_LENGTH) {
      return css;
    }
    if (cache.size >= MAX_ENTRIES_PER_STYLE_FUNCTION) {
      cache.delete(cache.keys().next().value);
    }
  }
  cache.set(key, css);

  return css;
};
