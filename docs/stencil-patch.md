# Stencil Patch

We currently have one Stencil patch-package file with five patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and
is applied automatically when installing via a `postinstall` script.

Stencil version used when this document was last updated: `5.0.0-rc.10`

Every section in the runtime is wrapped in `//========= PDS PATCH START` and `//========= PDS PATCH END`.

| Patched file                                                | Sections                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| `node_modules/@stencil/core/dist/runtime/client/runtime.js` | SSR, SSR props, SSR streaming, boolean attribute, `componentShouldUpdate` |

`runtime.js` is the runtime Stencil bundles into the `loader-bundle` and `www` output targets; `lazy.js` next to it is
only used with `externalRuntime`.

Two patches of Stencil 4 are gone. The `attachInternals?.()` patch kept form components from throwing in browsers
without the `ElementInternals` API. No environment we support needs it: the browsers we support and the jsdom we require
have the API, and Safari before 16.4, which lacks it, can't parse the core chunk anyway. The clonable shadow root patch
is not needed, because Stencil 5 supports it natively, and every component sets
`encapsulation: { type: 'shadow', clonable: true }`. The declarative counterpart for server rendered components lives in
`packages/components/scripts/generateDSRComponents.ts`, which emits `shadowrootclonable="true"` on the DSR `<template>`.

## Patches

### SSR patch

With our SSR approach we render a DSR component on the server and then let stencil rerender the client component on the
client. In order to avoid having duplicate contents in the shadowRoot from server rendering and client rendering, we
need to clear the shadowRoot before the client rendering.

A shadow root that exists before Stencil attaches one was rendered on the server. This is detected in `attachShadowRoot`
of `bootstrapLazy`, which Stencil calls in the constructor, on every connect and when it releases a held host (see
[SSR streaming patch](#ssr-streaming-patch)). `hasDSR` stays `undefined` until that is known, so a shadow root Stencil
created itself is never mistaken for a server rendered one when the host connects again.

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

This needs to be added in the lazy host's `connectedCallback` in `bootstrapLazy`, after the host was released by the
parse gate (`deferUntilParsed`) and got its shadow root, so the props are set before the component initializes and
renders for the first time. Only declared props are applied, invalid JSON is ignored, and the attribute is removed so
the props are applied only once. The wrapper's layout effect removes the attribute as well, so a component that starts
after hydration never applies outdated server props over the synced ones.

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

### SSR streaming patch

When server markup is streamed after the components were defined (a Suspense boundary of Next.js, or any page that
registers the components before the markup), the parser creates each host with its definition at hand: it runs the
constructor and `connectedCallback` before it has read the host's `<template shadowrootmode>`. A shadow root attached at
that point makes the browser reject the declarative one
(`A second declarative shadow root cannot be created on a host`), the `<template>` stays in the light DOM and breaks
React's hydration ([#4162](https://github.com/porsche-design-system/porsche-design-system/issues/4162)).

Stencil 5 solves this with a parse gate (`src/runtime/parse-gate.ts`,
[stenciljs/core#7005](https://github.com/stenciljs/core/pull/7005)): a parser-created host gets no shadow root in the
constructor, and a server rendered host is held until the parser has finished its subtree — the host or one of its
ancestors has a next sibling, or the document is no longer loading. A `MutationObserver` re-checks the held hosts,
`DOMContentLoaded` releases the rest, and nested hosts are released parent-first.

Two things keep the gate from working for PDS out of the box, and the patch changes both:

1. The gate is only compiled into builds with an `ssr` output target (`BUILD.hydrateClientSide`), which would also make
   Stencil hydrate the server markup. Our server markup comes from the DSR components and has no hydration markers, so
   it still has to be cleared and rendered again (see [SSR patch](#ssr-patch)). The patch removes the
   `BUILD$1.hydrateClientSide` condition at the three places `bootstrapLazy` uses the gate, and nowhere else:

   ```diff
   - if (BUILD$1.shadowDom && !(BUILD$1.hydrateClientSide && mayStillBeParsing(self))) attachShadowRoot(self);
   + if (BUILD$1.shadowDom && !mayStillBeParsing(self)) attachShadowRoot(self);
   ```

   ```diff
   - if (BUILD$1.hydrateClientSide && deferUntilParsed(this)) return;
   + if (!(hostRef.$flags$ & HOST_FLAGS.hasConnected) && deferUntilParsed(this)) return;
   ```

   ```diff
   - if (BUILD$1.hydrateClientSide && BUILD$1.shadowDom) HostElement.prototype.__attachShadow = function() {
   + if (BUILD$1.shadowDom) HostElement.prototype.__attachShadow = function() {
   ```

   The `hasConnected` check is ours: a host that has started once is never held again, e.g. when React moves a streamed
   boundary into place while the document is still loading.

2. Stencil only holds hosts with its own `s-id` attribute. The React SSR wrapper marks the hosts it renders on the
   server with `data-dsr` (`packages/components/scripts/wrapper-generator/NextJsReactWrapperGenerator.ts`). `data-ssr`
   can't be the marker, because the client renders it too, and `data-ssr-props` is left out when every prop has its
   default.

   ```diff
   + const isServerRendered = (elm) => elm.hasAttribute("s-id") || elm.hasAttribute("data-dsr");
   - const mayStillBeParsing = (elm) => win.document?.readyState === "loading" && (!elm.parentNode || elm.hasAttribute("s-id") && !isParsed(elm));
   + const mayStillBeParsing = (elm) => win.document?.readyState === "loading" && (!elm.parentNode || isServerRendered(elm) && !isParsed(elm));
   ```

   ```diff
   - if (!win.document || !elm.hasAttribute("s-id")) return false;
   + if (!win.document || !isServerRendered(elm)) return false;
   ```

`packages/components-js/tests/e2e/specs/streaming.e2e.ts` streams a document in chunks and covers the gate in every
browser; `packages/components-react/projects/nextjs/tests/e2e/specs/streaming.e2e.ts` covers it with Suspense
boundaries.

### boolean attribute patch

Stencil 5 treats a boolean attribute as `true` whatever its value, like native elements, so `<p-modal open="false">`
would be an open modal. Props that default to `true`, e.g. `dismiss-button` of `p-modal`, can only be turned off in
markup with `="false"`, so the patch keeps the behavior of Stencil 4 in two places. It goes with the next major version,
see [#4887](https://github.com/porsche-design-system/porsche-design-system/issues/4887).

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

Stencil 4 called `componentShouldUpdate` when a prop or state was set, and only queued an update when it returned
`true`. Stencil 5 queues the update first and calls `componentShouldUpdate` once per render cycle, in `dispatchHooks`,
with every change. Our components return `false` whenever a prop is set to an equal value, e.g. an `aria` object a
parent passes on every render, which uncovers three bugs. All are reported upstream with a minimal reproduction; the
section can be removed once they are fixed there, see
[#4888](https://github.com/porsche-design-system/porsche-design-system/issues/4888).

**The ancestor is never released** ([stenciljs/core#7038](https://github.com/stenciljs/core/issues/7038)).
`scheduleUpdate` has already made the ancestor component wait for the update. When `componentShouldUpdate` returns
`false`, Stencil returns without releasing it, so the ancestor never finishes its own update: its `componentDidRender`
and `componentDidUpdate` are never called. This happened to `p-carousel`, `p-drilldown` and `p-input-password`.

**A forced update is lost** ([stenciljs/core#7039](https://github.com/stenciljs/core/issues/7039)). `forceUpdate()` does
nothing when an update is queued already, and that queued update is dropped when `componentShouldUpdate` returns `false`
for the props that changed in the same cycle. `p-drilldown` forces an update when an item gets its `identifier`; with an
update queued at the same time that changed nothing, it never validated its `activeIdentifier` again. The patch marks
the update as forced in `forceUpdate`:

```diff
- if (isConnected && (hostRef.$flags$ & (HOST_FLAGS.hasRendered | HOST_FLAGS.isQueuedForUpdate)) === HOST_FLAGS.hasRendered) scheduleUpdate(hostRef, false);
+ if (isConnected && hostRef.$flags$ & HOST_FLAGS.hasRendered) {
+   hostRef.$isUpdateForced$ = true;
+   if (!(hostRef.$flags$ & HOST_FLAGS.isQueuedForUpdate)) scheduleUpdate(hostRef, false);
+ }
```

and handles both bugs in `dispatchHooks`:

```diff
+ const isUpdateForced = hostRef.$isUpdateForced$;
+ hostRef.$isUpdateForced$ = false;
  if (BUILD$1.updatable && hostRef.$queuedPropChanges$) {
    const changes = hostRef.$queuedPropChanges$;
    hostRef.$queuedPropChanges$ = void 0;
-   if (safeCall(instance, "componentShouldUpdate", changes, elm) === false) {
+   if (safeCall(instance, "componentShouldUpdate", changes, elm) === false && !isUpdateForced) {
      hostRef.$flags$ &= ~HOST_FLAGS.isQueuedForUpdate;
+     if (BUILD$1.asyncLoading && hostRef.$onRenderResolve$) {
+       hostRef.$onRenderResolve$();
+       hostRef.$onRenderResolve$ = void 0;
+     }
      return;
    }
  }
```

`packages/components-js/tests/e2e/specs/drilldown.e2e.ts` covers the forced update
(`should log an error when an update that changes nothing is queued while the last identifier is set`).

**The old value is the wrong one** ([stenciljs/core#7042](https://github.com/stenciljs/core/issues/7042)). Stencil
collects every change since the last render in `setValue` and keeps the `oldVal` of the first one with `??`, which also
skips an `oldVal` of `undefined` or `null`. A prop that was not set at the last render and is then set twice to equal
objects, e.g. `aria` by two renders of a React application within one frame, is compared with the first of the two
objects, `componentShouldUpdate` returns `false`, and the prop is never rendered. The patch checks for the entry instead
of its value:

```diff
  changes[propName] = {
    newVal,
-   oldVal: changes[propName]?.oldVal ?? oldVal
+   oldVal: propName in changes ? changes[propName].oldVal : oldVal
  };
```

`packages/components-js/tests/e2e/specs/button.e2e.ts` covers it
(`should render an object prop that is set twice to equal objects before the next render`). The same line exists for
signals in `src/runtime/signals.ts`, which is not part of our build.

## How to update

1. After updating stencil and installing the dependencies, the patch will either be applied successfully or fail with a
   message about a failed patch.
2. If the patch fails, you need to check what changed in the stencil update and how to adjust the patch.
3. Adjust the files mentioned above with the patch and run `npx patch-package @stencil/core` to create a new patch file.
   The new patch file should be placed in the `patches/` folder and committed to the repository. The patch will be
   automatically applied with every install. `patch-package` installs a clean copy of Stencil to compare against, so for
   a version that is still inside the
   [release-age cooldown](dependencies.md#release-age-cooldown-supply-chain-protection) it fails without a message. Once
   the exception is agreed, run it as `npm_config_min_release_age=0 npx patch-package @stencil/core`.
4. Build `components` and `components-js` and check that the sections made it into the build, since Stencil removes code
   behind build flags. Each of these has to print a count above 0:
   `for s in hasDSR data-ssr-props data-dsr isUpdateForced '=== "false"' 'in changes'; do grep -c "$s" packages/components/dist/esm/runtime-*.js; done`
