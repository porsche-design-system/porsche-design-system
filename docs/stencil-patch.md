# Stencil Patch

We currently have one Stencil patch-package file with five patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and
is applied automatically when installing via a `postinstall` script.

Stencil version used when this document was last updated: `5.0.0-rc.1`

Every section in the runtime is wrapped in `//========= PDS PATCH START` and `//========= PDS PATCH END`.

| Patched file                                                | Sections                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| `node_modules/@stencil/core/dist/compiler-<hash>.mjs`       | attachInternals                                            |
| `node_modules/@stencil/core/dist/runtime/client/runtime.js` | SSR, SSR props, boolean attribute, `componentShouldUpdate` |

`runtime.js` is the runtime Stencil bundles into the `loader-bundle` and `www` output targets; `lazy.js` next to it is
only used with `externalRuntime`.

The clonable shadow root patch of Stencil 4 is gone: Stencil 5 supports it natively, and every component sets
`encapsulation: { type: 'shadow', clonable: true }`. The declarative counterpart for server rendered components lives in
`packages/components/scripts/generateDSRComponents.ts`, which emits `shadowrootclonable="true"` on the DSR `<template>`.

## Patches

### attachInternals patch

Patches files: `node_modules/@stencil/core/dist/compiler-<hash>.mjs`

The patch changes the `attachInternals` call to be called optionally with `?.` in order to avoid errors in browsers not
supporting the `ElementInternals` API. `packages/components-js/tests/unit/specs/element-internals.spec.ts` fails without
it.

Check where the attachInternals call of the lazy build is created (`hostRef.$hostElement$.attachInternals()`) and add
the optional chaining operator `?.` to it. The patch should look like this:

```diff
- ts.factory.createIdentifier("$hostElement$")), ts.factory.createIdentifier("attachInternals")), void 0, [])
+ ts.factory.createIdentifier("$hostElement$")), ts.factory.createIdentifier("attachInternals?.")), void 0, [])
```

Stencil 5 only supports browsers that have the `ElementInternals` API (Chrome and Edge 94+, Firefox 93+, Safari 16.4+),
so this section and its test can be removed once that is confirmed for our supported browsers.

### SSR patch

With our SSR approach we render a DSR component on the server and then let stencil rerender the client component on the
client. In order to avoid having duplicate contents in the shadowRoot from server rendering and client rendering, we
need to clear the shadowRoot before the client rendering.

A shadow root that exists before Stencil attaches one was rendered on the server. This is detected in `attachShadowRoot`
of `bootstrapLazy`, which Stencil calls in the constructor and on every connect. `hasDSR` stays `undefined` until that
is known, so a shadow root Stencil created itself is never mistaken for a server rendered one when the host connects
again.

```diff
- if (cmpMeta.$flags$ & CMP_FLAGS.shadowDomEncapsulation && !(cmpMeta.$flags$ & CMP_FLAGS.shadowNeedsScopedCss) && !getShadowRoot(elm)) createShadowRoot.call(elm, cmpMeta);
+ if (cmpMeta.$flags$ & CMP_FLAGS.shadowDomEncapsulation && !(cmpMeta.$flags$ & CMP_FLAGS.shadowNeedsScopedCss)) {
+   if (!getShadowRoot(elm)) {
+     createShadowRoot.call(elm, cmpMeta);
+     elm.hasDSR = false;
+   } else if (elm.hasDSR === void 0) elm.hasDSR = true;
+ }
```

This should be applied before stencil calls the render function e.g. `callRender` in `updateComponent` in order to clear
the DSR rendered shadowRoot before the client render happens. Otherwise, the contents in the shadowRoot will be
duplicated.

```diff
+ if (elm.hasDSR) {
+   elm.shadowRoot.innerHTML = "";
+   elm.hasDSR = false;
+ }
```

### SSR props patch

The React SSR wrapper renders the props into the DSR component only; on the client, its layout effect sets them as
properties once React hydrates. A component that starts before that, because it is streamed in through a Suspense
boundary or registered by the loader script, would render its default props until the effect runs. So the wrapper also
serializes the props that differ from their default as JSON into a `data-ssr-props` attribute on the server (see
`packages/components-react/projects/react-ssr-wrapper/src/serializeSsrProps.ts`).

This needs to be added in the lazy host's `connectedCallback` in `bootstrapLazy`, after the host got its shadow root, so
the props are set before the component initializes and renders for the first time. Only declared props are applied,
invalid JSON is ignored, and the attribute is removed so the props are applied only once. The wrapper's layout effect
removes the attribute as well, so a component that starts after hydration never applies outdated server props over the
synced ones.

```diff
+ const ssrProps = this.getAttribute("data-ssr-props");
+ if (ssrProps !== null) {
+   this.removeAttribute("data-ssr-props");
+   try {
+     for (const [propName, value] of Object.entries(JSON.parse(ssrProps))) {
+       const member = cmpMeta.$members$[propName];
+       if (member && member[0] & MEMBER_FLAGS.Prop) this[propName] = value;
+     }
+   } catch {}
+ }
```

### boolean attribute patch

Stencil 5 treats a boolean attribute as `true` whatever its value, like native elements, so
`<p-link-tile gradient="false">` would turn the gradient on. Props that default to `true` can only be turned off in
markup with `="false"`, so the patch keeps the behavior of Stencil 4 in two places:

`parsePropertyValue`, which coerces a value set as property:

```diff
- if (BUILD$1.propBoolean && propType & MEMBER_FLAGS.Boolean) return propValue === "" || !!propValue;
+ if (BUILD$1.propBoolean && propType & MEMBER_FLAGS.Boolean) return propValue === "false" ? false : propValue === "" || !!propValue;
```

`attributeChangedCallback` in `proxyComponent`, which also drops the warning dev builds log for `="false"`:

```diff
- if (BUILD$1.isDev && newValue === "false") consoleDevWarn(`…`);
- newValue = newValue !== null;
+ newValue = newValue !== null && newValue !== "false";
```

### componentShouldUpdate patch

Stencil 5 calls `componentShouldUpdate` once per render cycle, in `dispatchHooks`, after `scheduleUpdate` made the
ancestor component wait for the update. When it returns `false`, Stencil returns without releasing the ancestor, which
then never finishes its own update: its `componentDidRender` and `componentDidUpdate` are never called. Our components
return `false` whenever a prop is set to an equal value, e.g. an `aria` object a parent passes on every render, so this
happened to `p-carousel`, `p-drilldown` and `p-input-password`.

```diff
  if (safeCall(instance, "componentShouldUpdate", changes, elm) === false) {
    hostRef.$flags$ &= ~HOST_FLAGS.isQueuedForUpdate;
+   if (BUILD$1.asyncLoading && hostRef.$onRenderResolve$) {
+     hostRef.$onRenderResolve$();
+     hostRef.$onRenderResolve$ = void 0;
+   }
    return;
  }
```

This is a bug in Stencil (still present on its `v5` branch when this was written) and should be reported upstream; the
section can be removed once it is fixed there.

## How to update

1. After updating stencil and installing the dependencies, the patch will either be applied successfully or fail with a
   message about a failed patch.
2. If the patch fails, you need to check what changed in the stencil update and how to adjust the patch.
3. Adjust the files mentioned above with the patch and run `npx patch-package @stencil/core` to create a new patch file.
   The new patch file should be placed in the `patches/` folder and committed to the repository. The patch will be
   automatically applied with every install.
4. Build `components` and `components-js` and check that the sections made it into the build, since Stencil removes code
   behind build flags: `grep -c "hasDSR\|data-ssr-props" packages/components/dist/esm/runtime-*.js` prints a count for
   each of them.
