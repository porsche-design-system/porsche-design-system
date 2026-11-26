# Stencil Patch

We currently have one Stencil patch-package file with four patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and
is applied automatically when installing via a `postinstall` script.

Stencil version used when this document was last updated: `5.0.0-rc.12`

Every section in the runtime is wrapped in `//========= PDS PATCH START` and `//========= PDS PATCH END`.

| Patched file                                                | Sections                                         |
| ----------------------------------------------------------- | ------------------------------------------------ |
| `node_modules/@stencil/core/dist/runtime/client/runtime.js` | SSR, SSR props, SSR streaming, boolean attribute |

`runtime.js` is the runtime Stencil bundles into the `loader-bundle` and `www` output targets; `lazy.js` next to it is
only used with `externalRuntime`.

Two patches of Stencil 4 are gone. The `attachInternals?.()` patch kept form components from throwing in browsers
without the `ElementInternals` API. No environment we support needs it: the browsers we support and the jsdom we require
have the API, and Safari before 16.4, which lacks it, can't parse the core chunk anyway. The clonable shadow root patch
is not needed, because Stencil 5 supports it natively, and every component sets
`encapsulation: { type: 'shadow', clonable: true }`. The declarative counterpart for server rendered components lives in
`packages/components/scripts/generateDSRComponents.ts`, which emits `shadowrootclonable="true"` on the DSR `<template>`.

Up to `5.0.0-rc.10` the patch also fixed three bugs around `componentShouldUpdate`, which Stencil 5 calls once per
render cycle instead of for every prop. Stencil fixed them in `5.0.0-rc.11`
([stenciljs/core#7038](https://github.com/stenciljs/core/issues/7038),
[stenciljs/core#7039](https://github.com/stenciljs/core/issues/7039),
[stenciljs/core#7042](https://github.com/stenciljs/core/issues/7042)). The tests we added for them stay:
`should log an error when an update that changes nothing is queued while the last identifier is set` in
`packages/components-js/tests/e2e/specs/drilldown.e2e.ts` and
`should render an object prop that is set twice to equal objects before the next render` in `button.e2e.ts`.

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

Three things keep the gate from working for PDS out of the box, and the patch changes all of them:

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

3. A next sibling only proves that the parser has finished a host when the parser inserted it. A script can insert one
   while the parser is still inside the host, e.g. a portal container that is appended to the body, or the `<script>` of
   the core chunk, which our own loader appends to the body. Stencil then releases the host too early
   ([stenciljs/core#7049](https://github.com/stenciljs/core/issues/7049)). Before the parser has read the host's
   `<template>`, that brings back the error and the hydration problem this section is about. While the parser is inside
   the `<template>`, the component renders, and the parser adds the rest of the server markup to the rendered shadow
   root.

   The DSR components therefore end their declarative shadow root with a marker, `<template data-dsr-end>`
   (`packages/components/scripts/generateDSRComponents.ts`), and a host with `data-dsr` is only parsed once the marker
   is the last element of its shadow root. Scripts of a page can't add it by accident, and nothing follows it in the
   shadow root. The check of Stencil stays in place after it, so a host still waits for its light DOM whenever no script
   interferes:

   ```diff
     const isParsed = (elm) => {
       if (win.document.readyState !== "loading") return true;
   +   if (elm.hasAttribute("data-dsr") && !elm.shadowRoot?.lastElementChild?.hasAttribute("data-dsr-end")) return false;
       for (let n = elm; n; n = parentOf(n)) if (n.nextSibling) return true;
       return false;
     };
   ```

   The component removes `data-dsr` when it starts. A clone of a started host has a shadow root without the marker,
   because the component has rendered it, and would be held until the document is parsed if it still had the attribute:

   ```diff
     if (!(hostRef.$flags$ & HOST_FLAGS.hasConnected) && deferUntilParsed(this)) return;
   + this.removeAttribute("data-dsr");
   ```

   **Check this part again once Stencil has fixed
   [stenciljs/core#7049](https://github.com/stenciljs/core/issues/7049).** Stencil can only fix it for the markup of its
   own server rendering, so our marker most likely stays, but the two checks have to keep working together. The tests
   named below fail when they don't. See
   [#4888](https://github.com/porsche-design-system/porsche-design-system/issues/4888).

`packages/components-js/tests/e2e/specs/streaming.e2e.ts` streams a document in chunks and covers the gate in every
browser, including a node that a script inserts before and inside the `<template>`, the components being loaded while a
host is parsed, and the clone of a started host.
`packages/components-react/projects/nextjs/tests/e2e/specs/streaming.e2e.ts` covers it with Suspense boundaries, and
holds a streamed response in the middle of a host to check that React hydrates it when a script inserts a node
meanwhile. The unit tests of the React SSR wrapper check that every server rendered host ends its declarative shadow
root with the marker.

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
   `for s in hasDSR data-ssr-props data-dsr data-dsr-end '=== "false"'; do grep -c "$s" packages/components/dist/esm/runtime-*.js; done`
