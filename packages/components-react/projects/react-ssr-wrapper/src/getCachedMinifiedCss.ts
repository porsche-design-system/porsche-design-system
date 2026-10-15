import { minifyCss } from './minifyCss';

type GetComponentCss = (...args: any[]) => string;

/**
 * Upper bound of cached stylesheets per style function. It holds every built-in icon (307) in one color and size,
 * while a free-form argument like the `source` URL of `p-icon` cannot grow the cache beyond it.
 * The largest minified stylesheet (`p-canvas`) has 9 kB, so a style function never holds more than 5 MB, and only
 * those with free-form arguments (icon names and URLs, page numbers) can get close to the bound.
 */
export const MAX_ENTRIES_PER_STYLE_FUNCTION = 500;

// Map iteration follows insertion order, so re-inserting a key on every access keeps the least recently used one first.
const cachesByStyleFunction = new Map<GetComponentCss, Map<string, string>>();

// `JSON.stringify()` omits `undefined` properties and turns `undefined` array items into `null`, but a default
// parameter applies to `undefined` and not to `null`, and the keys of a breakpoint object are iterated.
const keepUndefined = (_key: string, value: unknown): unknown => (value === undefined ? '\0undefined' : value);

/**
 * Returns the minified result of `getComponentCss(...args)`, computed once per combination of arguments.
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
  const key = JSON.stringify([cdnBaseUrl, ...args], keepUndefined);

  let css = cache.get(key);
  if (css === undefined) {
    css = minifyCss(getComponentCss(...args));
    if (cache.size >= MAX_ENTRIES_PER_STYLE_FUNCTION) {
      cache.delete(cache.keys().next().value);
    }
  } else {
    cache.delete(key); // re-inserted below to become the most recently used entry
  }
  cache.set(key, css);

  return css;
};
