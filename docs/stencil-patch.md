# Stencil Patch

We currently have one Stencil patch-package file with four patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and
is applied automatically when installing via a `postinstall` script.

Stencil version used when this document was last updated: `5.0.0-rc.14`

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

The attribute sets props an HTML sanitizer can't check: it keeps `data-*` attributes, but only validates the value of
attributes like `href`. So an app that renders sanitized user content with `p-*` elements must not get the props of that
content applied:

- **Only the markup of the server is trusted.** The props are applied if the host has a declarative shadow root
  (`hasDSR`, set by the SSR patch), which only the parser of a document attaches; markup a script inserts with
  `innerHTML` or `insertAdjacentHTML` never gets one. The parse gate holds a streamed host until its shadow root is
  parsed, so this also holds for a host that is streamed in while its component is already defined.
- **A script URL is never applied.** A string that starts with `javascript:` or `vbscript:`, ignoring the whitespace and
  control characters a browser ignores, is left to React, which sets the prop on hydration as before.

Untrusted markup the server itself embeds with a declarative shadow root still passes the first check, and so does
markup a script inserts with `setHTMLUnsafe()`. Keeping that out of the page is up to the app.

```diff
+ const ssrProps = this.getAttribute("data-ssr-props");
+ if (ssrProps !== null) {
+   this.removeAttribute("data-ssr-props");
+   if (this.hasDSR) try {
+     for (const [propName, value] of Object.entries(JSON.parse(ssrProps))) {
+       const member = cmpMeta.$members$[propName];
+       if (member && member[0] & MEMBER_FLAGS.Prop && !(typeof value === "string" && /^(java|vb)script:/i.test(value.replace(/[\u0000-\u0020]/g, "")))) this[propName] = value;
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
constructor, and a server rendered host is held until the parser has read it with all its children. Since
[stenciljs/core#7052](https://github.com/stenciljs/core/pull/7052) the server tells where a host ends: it writes a
comment as the last child of the host, and the gate waits for that comment. A host without one is held until the
document is no longer loading. A `MutationObserver` re-checks the held hosts, `DOMContentLoaded` releases the rest, and
nested hosts are released parent-first.

Before that, the gate took a next sibling of the host or of one of its ancestors for the end of the host. A script can
insert such a sibling while the parser is still inside the host, e.g. a portal container that is appended to the body,
or the `<script>` of the core chunk, which our own loader appends to the body. The host then started without its
declarative shadow root, with half of it, or without its children
([stenciljs/core#7049](https://github.com/stenciljs/core/issues/7049)). The last case is the hardest to see: a
`p-input-text` that starts before its slotted label has arrived never renders the label, and has no accessible name.

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

2. Stencil only holds hosts with its own `s-id` attribute, and waits for its own comment, `<!--e.{s-id}-->`. The React
   SSR wrapper marks the hosts it renders on the server with `data-dsr`
   (`packages/components/scripts/wrapper-generator/NextJsReactWrapperGenerator.ts`), and the DSR components end them
   with `<!--dsr-end-->` (`packages/components/scripts/generateDSRComponents.ts`). `data-ssr` can't be the marker,
   because the client renders it too, and `data-ssr-props` is left out when every prop has its default.

   ```diff
   + const isServerRendered = (elm) => elm.hasAttribute("s-id") || elm.hasAttribute("data-dsr");
   - const mayStillBeParsing = (elm) => win.document?.readyState === "loading" && (!elm.parentNode || elm.hasAttribute("s-id") && !isParsed(elm));
   + const mayStillBeParsing = (elm) => win.document?.readyState === "loading" && (!elm.parentNode || isServerRendered(elm) && !isParsed(elm));
   ```

   ```diff
   - if (!win.document || !elm.hasAttribute("s-id")) return false;
   + if (!win.document || !isServerRendered(elm)) return false;
   ```

   ```diff
   - return n?.nodeType === NODE_TYPE.CommentNode && n.nodeValue === `e.${elm.getAttribute("s-id")}` && !!parsedHosts.add(elm);
   + return n?.nodeType === NODE_TYPE.CommentNode && n.nodeValue === (elm.hasAttribute("data-dsr") ? "dsr-end" : `e.${elm.getAttribute("s-id")}`) && !!parsedHosts.add(elm);
   ```

   React can't render a comment. The DSR components write it into a `<frame>` element with `dangerouslySetInnerHTML`:
   the HTML parser drops the tags of a `<frame>` outside of a `<frameset>` and keeps what is in it, so the browser only
   gets the comment. That holds wherever a component can be, also in a table cell and in the declarative shadow root of
   another component, which other tags the parser drops don't. React's server renderers don't check the nesting; its
   client renderer does, which only shows in the unit tests of the React SSR wrapper, where it renders what the server
   renders. React's hydration skips comments that are not its own.

   The component removes `data-dsr` and the comment when it starts. A clone of a started host has no comment anymore,
   and would be held until the document is parsed if it still had the attribute. The comment has to go whether or not
   the host is still marked, see point 3, and wherever it is among the children: a component that reads its children, as
   `p-segmented-control-item` does to tell whether it only has an icon, must not find it. Only a host of the React SSR
   wrapper (`data-ssr`) is searched, once:

   ```diff
     if (!(hostRef.$flags$ & HOST_FLAGS.hasConnected) && deferUntilParsed(this)) return;
   + this.removeAttribute("data-dsr");
   + if (!(hostRef.$flags$ & HOST_FLAGS.hasConnected) && this.hasAttribute("data-ssr")) {
   +   for (let n = this.lastChild; n; n = n.previousSibling) if (n.nodeType === NODE_TYPE.CommentNode && n.nodeValue === "dsr-end") {
   +     n.remove();
   +     break;
   +   }
   + }
   ```

3. The children of our hosts belong to React. Once React has hydrated a host, it may replace its children, the comment
   included, before the components are loaded: a label that changes in an effect is enough. Such a host would be held
   until the document is parsed, which takes as long as the response is streamed. React only hydrates markup that is
   complete, so the wrapper removes `data-dsr` when React attaches the ref of the host
   (`packages/components-react/projects/react-ssr-wrapper/src/syncHydratedRef.ts`), and the gate lets a host pass that
   is no longer marked. This is the usual order in an application, where the provider loads the components in an effect.
   React leaves the comment in place and may add children after it; the component removes it when it starts.

   ```diff
     if (parsedHosts.has(elm) || win.document.readyState !== "loading") return true;
   + if (!isServerRendered(elm)) return true;
   ```

Something between the server and the browser that removes comments from the markup takes the end markers with it. The
components then start when the document is parsed, as they do for a host without marker.

`packages/components-js/tests/e2e/specs/streaming.e2e.ts` streams a document in chunks and covers the gate in every
browser: a node that a script inserts before the `<template>`, inside it and before the children, the components being
loaded while a host is parsed, a host without end marker, a host React has hydrated or changed before the components are
loaded, and the clone of a started host. `packages/components-react/projects/nextjs/tests/e2e/specs/streaming.e2e.ts`
covers it with Suspense boundaries, and holds a streamed response in the middle of a host to check, with a script
inserting a node meanwhile, that React hydrates the host and that an input gets its slotted label. Its `pages.e2e.ts`
checks on every page that no marker of the server is left once the components have started. The unit tests of the React
SSR wrapper check that every server rendered host ends with the marker, and that the HTML parser turns it into a
comment.

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
   `for s in hasDSR data-ssr-props data-dsr dsr-end '=== "false"'; do grep -c "$s" packages/components/dist/esm/runtime-*.js; done`
