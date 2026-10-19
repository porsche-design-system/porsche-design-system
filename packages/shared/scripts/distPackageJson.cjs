// The `package.json` of `dist`, the workspace published as `@porsche-design-system/shared`. The rollup build and the
// root `preinstall:shared` both write it from here: `npm install` has to find the same file, exports map included,
// whether `dist` has been built or not, or the deep imports stop resolving and the lockfile changes.
const fs = require('node:fs');
const path = require('node:path');

// `scripts`, `devDependencies` and `volta` only concern the workspace, not the published package.
const getDistPackageJson = ({ scripts, devDependencies, volta, ...packageJson }) => ({
  ...packageJson,
  name: '@porsche-design-system/shared',
  sideEffects: false,
  exports: {
    '.': {
      import: {
        types: './index.d.ts',
        default: './esm/index.js',
      },
      require: {
        types: './index.d.ts',
        default: './index.js',
      },
    },
    // deep import so the metadata bundles of the styling packages can share the deprecation
    // contract and its wording at runtime without dragging this package's barrel along
    './deprecation': {
      import: {
        types: './deprecation/index.d.ts',
        default: './deprecation/esm/index.mjs',
      },
      require: {
        types: './deprecation/index.d.ts',
        default: './deprecation/cjs/index.cjs',
      },
    },
    // deep import so that code typechecked before the build (e.g. the styles preview app) can use the
    // vocabularies without the barrel, whose generated modules don't exist in a fresh clone
    './models': {
      import: {
        types: './models/index.d.ts',
        default: './models/esm/index.mjs',
      },
      require: {
        types: './models/index.d.ts',
        default: './models/cjs/index.cjs',
      },
    },
    './testing': {
      import: {
        types: './testing/index.d.ts',
        default: './testing/esm/index.mjs',
      },
      require: {
        types: './testing/index.d.ts',
        default: './testing/cjs/index.cjs',
      },
    },
    // deep import so that Vitest setups (and the bundled jsdom-polyfill) can normalize the `CSS`
    // namespace without dragging the Playwright configs and W3C validator of the barrel along
    './testing/normalize-css-namespace': {
      import: {
        types: './testing/normalizeCssNamespace.d.ts',
        default: './testing/normalize-css-namespace/esm/index.mjs',
      },
      require: {
        types: './testing/normalizeCssNamespace.d.ts',
        default: './testing/normalize-css-namespace/cjs/index.cjs',
      },
    },
    // deep import so that the Vitest specs can assert a value is defined without dragging the
    // Playwright configs and W3C validator of the barrel along
    './testing/assert-defined': {
      import: {
        types: './testing/assertDefined.d.ts',
        default: './testing/assert-defined/esm/index.mjs',
      },
      require: {
        types: './testing/assertDefined.d.ts',
        default: './testing/assert-defined/cjs/index.cjs',
      },
    },
    './css/styles.css': './css/styles.css',
    './css/styles': './css/styles.css',
    './examples': './examples/index.ts', // Examples is not bundled to avoid problems with next.js "use client" in mdx
    './examples/*': './examples/*.tsx', // deep imports let a page pull one example without dragging the whole barrel into its chunk
  },
});

module.exports = { getDistPackageJson };

if (require.main === module) {
  const packageDir = path.resolve(__dirname, '..');
  const distDir = path.join(packageDir, 'dist');
  const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));
  fs.mkdirSync(distDir, { recursive: true });
  fs.writeFileSync(path.join(distDir, 'package.json'), `${JSON.stringify(getDistPackageJson(packageJson), null, 2)}\n`);
}
