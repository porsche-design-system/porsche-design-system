# Stencil Patch

We currently have one Stencil patch-package file with three patch sections in place, applied using
[`patch-package`](https://www.npmjs.com/package/patch-package). The patch file is located in the `patches/` folder and is
applied automatically when installing via a `postinstall` script.

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
