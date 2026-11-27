# Stencil Patch

We currently have one Stencil patch-package file with four patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and
is applied automatically when installing via a `postinstall` script.

Stencil version used when this document was created: `4.43.3`

## Patches

### attachInternals patch

Patches files: `node_modules/@stencil/core/compiler/stencil.js`

The patch changes the `attachInternals` call to be called optionally with `?.` in order to avoid errors in browsers not
supporting the `ElementInternals` API.

Check where the attachInternals is called or created and add the optional chaining operator `?.` to it. The patch should
look like this:

```diff
- import_typescript4.default.factory.createIdentifier("attachInternals")
+ import_typescript4.default.factory.createIdentifier("attachInternals?.")
```

### SSR patch

Patches files: `node_modules/@stencil/core/internal/client/index.js`

With our SSR approach we render a DSR component on the server and then let stencil rerender the client component on the
client. In order to avoid having duplicate contents in the shadowRoot from server rendering and client rendering, we
need to clear the shadowRoot before the client rendering.

This needs to be added in the constructor e.g. `// StencilLazyHost constructor(self) {` in order to know the component
already has a shadowRoot which was rendered on the server.

```diff
+ if (self.shadowRoot) {
+   self.hasDSR = true;
+ }
```

This should be applied before stencil calls the render function e.g. `callRender` in order to clear the DSR rendered
shadowRoot before the client render happens. Otherwise, the contents in the shadowRoot will be duplicated.

```diff
+ if (elm.hasDSR) {
+   elm.shadowRoot.innerHTML = '';
+   delete elm.hasDSR;
+ }
```

### SSR props patch

Patches files: `node_modules/@stencil/core/internal/client/index.js`

The React SSR wrapper renders the props into the DSR component only; on the client, its layout effect sets them as
properties once React hydrates. A component that starts before that, because it is streamed in through a Suspense
boundary or registered by the loader script, would render its default props until the effect runs. So the wrapper also
serializes the props that differ from their default as JSON into a `data-ssr-props` attribute on the server (see
`packages/components-react/projects/react-ssr-wrapper/src/serializeSsrProps.ts`).

This needs to be added at the start of the lazy host's `connectedCallback` in `bootstrapLazy`, after the `hostRef`
check, so the props are set before the component initializes and renders for the first time. Only declared props are
applied, invalid JSON is ignored, and the attribute is removed so the props are applied only once. The wrapper's layout
effect removes the attribute as well, so a component that starts after hydration never applies outdated server props
over the synced ones.

The attribute sets props an HTML sanitizer can't check: it keeps `data-*` attributes, but only validates the value of
attributes like `href`. So an app that renders sanitized user content with `p-*` elements must not get the props of that
content applied:

- **Only the markup of the server is trusted.** The props are applied if the host has a declarative shadow root
  (`hasDSR`, set by the SSR patch), which only the parser of a document attaches; markup a script inserts with
  `innerHTML` or `insertAdjacentHTML` never gets one. A host that is streamed in while its component is already defined
  is constructed before the parser reaches its shadow root, so `document.readyState === 'loading'` vouches for it
  instead. `loading` alone is not enough: the loader script registers the components when the document is `interactive`.
- **A script URL is never applied.** A string that starts with `javascript:` or `vbscript:`, ignoring the whitespace and
  control characters a browser ignores, is left to React, which sets the prop on hydration as before.

Markup a script inserts synchronously while the document is loading still passes the first check, and so does untrusted
markup the server itself embeds with a declarative shadow root. Keeping that out of the page is up to the app.

```diff
+ const ssrProps = this.getAttribute('data-ssr-props');
+ if (ssrProps !== null) {
+   this.removeAttribute('data-ssr-props');
+   if (this.hasDSR || document.readyState === 'loading') {
+     try {
+       for (const [propName, value] of Object.entries(JSON.parse(ssrProps))) {
+         const member = cmpMeta.$members$[propName];
+         if (
+           member &&
+           member[0] & 31 /* Prop */ &&
+           !(typeof value === 'string' && /^(java|vb)script:/i.test(value.replace(/[\u0000-\u0020]/g, '')))
+         ) {
+           this[propName] = value;
+         }
+       }
+     } catch (e) {}
+   }
+ }
```

### clonable shadow root patch

Patches files: `node_modules/@stencil/core/internal/client/index.js`

`cloneNode(true)` copies the contents of a shadow root only when that root was attached with `clonable: true`. Stencil
exposes no api for it, so every component would be cloned with an empty shadow root, which breaks tooling that measures
a clone such as AG Grid's column auto-sizing.

This needs to be added in `createShadowRoot`, after the `delegatesFocus` and `slotAssignment` options and before
`attachShadow` is called with them.

```diff
+ opts.clonable = true;
  const shadowRoot = this.attachShadow(opts);
```

The declarative counterpart for server rendered components lives outside this patch, in
`packages/components/scripts/generateDSRComponents.ts`, which emits `shadowrootclonable="true"` on the DSR `<template>`.

## How to update

1. After updating stencil and installing the dependencies, the patch will either be applied successfully or fail with a
   message about a failed patch.
2. If the patch fails, you need to check what changed in the stencil update and how to adjust the patch.
3. Adjust the files mentioned above with the patch and run `npx patch-package @stencil/core` to create a new patch file.
   The new patch file should be placed in the `patches/` folder and committed to the repository. The patch will be
   automatically applied with every install.
