# `@porsche-design-system/flags`

Optimizes SVG flags, creates a manifest and private npm package (esm,cjs + types).

## Build

- `yarn build`
  - `yarn build:flags` (optimizes SVG flags with `svgo` and creates a manifest)
  - `yarn build:lib` (bundles library)

## Test

- `yarn test:unit` (executes unit tests, e.g. comparing the size of each flag)

## Clean

- `yarn clean:build` (removes all auto generated files created by `yarn build`)
