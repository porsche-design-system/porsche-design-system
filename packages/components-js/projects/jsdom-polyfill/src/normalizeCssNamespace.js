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
 * That breaks any consumer caching an operation unbound. The most prominent one is `jss`, which
 * resolves it exactly once at module init and then reuses it for every rule it creates:
 *
 *   var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
 *
 * Re-binding each operation as an own property of the namespace restores browser behavior. It is a
 * no-op where nothing is wrong: browsers expose the operations as own properties directly on `CSS`
 * (its prototype is `Object.prototype`), and jsdom < 30 exposes no `CSS` namespace at all. Once jsdom
 * stops brand-checking namespace operations, this degrades to a harmless self-assignment.
 *
 * Re-binding is idempotent: the original operation is always read from the prototype, never from a
 * previously bound own property.
 *
 * NOTE: `packages/shared/src/testing/normalizeCssNamespace.ts` holds an identical implementation for
 * the packages that are built *before* this one (`shared`, `components`, the wrappers) and therefore
 * cannot import this polyfill. This copy stays deliberately self-contained: it is bundled into the
 * published artifact, which must not pull in internal test tooling. Keep both in sync.
 *
 * This works around a jsdom deviation and should be removable once jsdom stops brand-checking
 * namespace operations:
 * - CSSOM defines `CSS` as a namespace: https://drafts.csswg.org/cssom/#namespacedef-css
 * - WebIDL namespace operations have no `this` requirement: https://webidl.spec.whatwg.org/#idl-namespaces
 *
 * @param {object} [cssNamespace] the namespace to normalize, defaults to the global `CSS`
 */
function normalizeCssNamespace(cssNamespace = globalThis.CSS) {
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
}

module.exports = { normalizeCssNamespace };

