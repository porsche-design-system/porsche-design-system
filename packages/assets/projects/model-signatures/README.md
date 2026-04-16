# `@porsche-design-system/model-signatures`

Optimizes SVG model signatures, creates a manifest and private npm package (esm,cjs + types).

The assets in the `./src` directory contain the unmodified originals, while SVGO optimizes those during the build
process. The original model signatures are created without safe zone, a varying width (integer, not decimal numbers) and
a height of `24px`-`25px` (without descenders) or `35px`-`36px` (with descenders). The height range can be used to
create a visual balance between the signatures while the max-height has to be `36px`.

## Build

- `npm run build`
  - `npm run build:model-signatures` (optimizes SVG model signatures with `svgo` and creates a manifest)
  - `npm run build:lib` (bundles library)

## Clean

- `npm run clean:build` (removes all auto generated files created by `npm run build`)
