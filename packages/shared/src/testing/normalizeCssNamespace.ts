/**
 * Makes the operations of the host `CSS` namespace callable while detached from it.
 *
 * Per CSSOM, `CSS` is a WebIDL *namespace*. Namespace operations are not brand-checked against a
 * `this` receiver, so browsers keep them working when they are pulled off the namespace object:
 *
 *   const escape = CSS.escape;
 *   escape('a.b'); // => 'a\\.b'
 *
 * jsdom >= 30 exposes a `CSS` namespace whose operations live on a prototype and *do* brand-check
 * `this`, so the detached call throws:
 *
 *   TypeError: 'escape' called on an object that is not a valid instance of CSS.
 *
 * That breaks any consumer caching an operation unbound. The one that hits us is `jss`, which
 * resolves it exactly once at module init and then reuses it for every rule it creates:
 *
 *   var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
 *
 * Call this from the Vitest setup of every package that renders JSS in a jsdom environment. Packages
 * downstream of `@porsche-design-system/components-js` get the same treatment for free by importing
 * its `jsdom-polyfill` sub-package, but `shared`, `components` and the wrappers are built *before* it
 * and therefore cannot.
 *
 * NOTE: `packages/components-js/projects/jsdom-polyfill/src/normalizeCssNamespace.js` intentionally
 * keeps its own copy of this logic — it is bundled into the published artifact, which must not pull
 * in this package's test tooling (the `testing` barrel re-exports Playwright helpers).
 *
 * Re-binding is idempotent (the original operation is always read from the prototype) and a no-op
 * where nothing is wrong: browsers expose the operations as own properties directly on `CSS`, and
 * jsdom < 30 exposes no `CSS` namespace at all.
 *
 * This works around a jsdom deviation and should be removable once jsdom stops brand-checking
 * namespace operations:
 * - CSSOM defines `CSS` as a namespace: https://drafts.csswg.org/cssom/#namespacedef-css
 * - WebIDL namespace operations have no `this` requirement: https://webidl.spec.whatwg.org/#idl-namespaces
 *
 * @param cssNamespace the namespace to normalize, defaults to the global `CSS`
 */
export const normalizeCssNamespace = (cssNamespace: object | undefined = globalThis.CSS): void => {
  if (!cssNamespace || typeof cssNamespace !== 'object') {
    return;
  }

  const prototype = Object.getPrototypeOf(cssNamespace);

  // Browsers put the operations directly on the namespace object, so there is nothing to unbind.
  if (!prototype || prototype === Object.prototype) {
    return;
  }

  for (const name of Object.getOwnPropertyNames(prototype)) {
    if (name === 'constructor') {
      continue;
    }

    // Read the descriptor instead of the property so accessors are never invoked.
    const { value } = Object.getOwnPropertyDescriptor(prototype, name) || {};

    if (typeof value === 'function') {
      Object.defineProperty(cssNamespace, name, {
        value: value.bind(cssNamespace),
        writable: true,
        enumerable: false,
        configurable: true,
      });
    }
  }
};

