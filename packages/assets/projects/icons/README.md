# `@porsche-design-system/icons`

Optimizes SVG icons, creates a manifest and private npm package (esm,cjs + types).

## Build

- `yarn build`
  - `yarn build:icons` (optimizes SVG icons with `svgo` and creates a manifest)
  - `yarn build:lib` (bundles library)

## Test

- `yarn test:unit` (executes unit tests, e.g. comparing the size of each icon)

## Clean

- `yarn clean:build` (removes all auto generated files created by `yarn build`)
