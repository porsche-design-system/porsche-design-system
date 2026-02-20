import { createRequire } from 'node:module';
import { type Analysis, checkPackage, createPackageFromTarballData, type Problem } from '@arethetypeswrong/core';
import { execSync } from 'child_process';
import * as fs from 'fs';
import { globbySync } from 'globby';
import * as path from 'path';
import { describe, expect, test } from 'vitest';
import componentsJsPackageJson from '../../../../dist/components-wrapper/package.json';

const nodeRequire = createRequire(import.meta.url);

const packageJsonExports = {
  './ag-grid': {
    types: './ag-grid/esm/index.d.ts',
    import: './ag-grid/esm/index.mjs',
    default: './ag-grid/cjs/index.cjs',
  },
  './jsdom-polyfill': {
    types: './jsdom-polyfill/index.d.ts',
    default: './jsdom-polyfill/index.cjs',
  },
  './partials': {
    types: './partials/esm/index.d.ts',
    module: './partials/esm/index.mjs',
    default: './partials/cjs/index.cjs',
  },
  './tokens': {
    types: './tokens/esm/index.d.ts',
    import: './tokens/esm/index.mjs',
    default: './tokens/cjs/index.cjs',
  },
  './scss': {
    sass: './scss/_index.scss',
  },
  './emotion': {
    types: './emotion/esm/index.d.ts',
    import: './emotion/esm/index.mjs',
    default: './emotion/cjs/index.cjs',
  },
  './vanilla-extract': {
    types: './vanilla-extract/esm/index.d.ts',
    import: './vanilla-extract/esm/index.mjs',
    default: './vanilla-extract/cjs/index.cjs',
  },
  './testing': {
    types: './testing/index.d.ts',
    default: './testing/index.cjs',
  },
  './styles': {
    sass: './scss/_index.scss',
    types: './emotion/esm/index.d.ts',
    import: './emotion/esm/index.mjs',
    default: './emotion/cjs/index.cjs',
  },
  './styles/vanilla-extract': {
    types: './vanilla-extract/esm/index.d.ts',
    import: './vanilla-extract/esm/index.mjs',
    default: './vanilla-extract/cjs/index.cjs',
  },
  './tailwindcss': './tailwindcss/index.css',
  './tailwindcss/index.css': './tailwindcss/index.css',
  './tailwindcss/index': './tailwindcss/index.css',
  './index.css': './global-styles/index.css',
  './index': './global-styles/index.css',
  './font-face.css': './global-styles/font-face.css',
  './font-face': './global-styles/font-face.css',
  './normalize.css': './global-styles/normalize.css',
  './normalize': './global-styles/normalize.css',
  './variables.css': './global-styles/variables.css',
  './variables': './global-styles/variables.css',
  './cn': './global-styles/cn/index.css',
  './cn/index.css': './global-styles/cn/index.css',
  './cn/index': './global-styles/cn/index.css',
  './cn/font-face.css': './global-styles/cn/font-face.css',
  './cn/font-face': './global-styles/cn/font-face.css',
  './legacy-radius.css': './global-styles/legacy-radius.css',
  './legacy-radius': './global-styles/legacy-radius.css',
};

describe('package content', () => {
  const componentsJsFilePath = nodeRequire.resolve('@porsche-design-system/components-js');
  const componentsJsPackageDir = path.resolve(componentsJsFilePath, '../..');
  const filePaths = globbySync(`${componentsJsPackageDir}/**/*.{js,mjs,cjs}`);

  for (const filePath of filePaths) {
    test(`should not contain "CDN_BASE_URL_DYNAMIC" placeholder or "localhost" in bundled production js file "${filePath}"`, async () => {
      const fileContent = fs.readFileSync(path.resolve(componentsJsPackageDir, filePath), 'utf8');
      expect(fileContent).not.toContain('CDN_BASE_URL_DYNAMIC');
      expect(fileContent).not.toContain('localhost');
    });
  }
});

describe('package.json files', () => {
  const packageNames = [
    '@porsche-design-system/components-js',
    '@porsche-design-system/components-angular',
    '@porsche-design-system/components-react',
    '@porsche-design-system/components-vue',
  ] as const;

  for (const packageName of packageNames) {
    test(
      `should have correct entrypoints for "${packageName}"`,
      async () => {
        const pathName = path
          .resolve(nodeRequire.resolve(packageName), '../package.json')
          .replace(/(wrapper\/).+\/(package\.json)/, '$1$2'); // get rid of nested folders if there are any
        const pkgJson = JSON.parse(fs.readFileSync(pathName, 'utf8'));

        // adjust and ignore stuff that is ssr related
        delete pkgJson.exports['./ssr'];

        // map `public-api` filenames to `index` because `components-js` calls it `index`
        pkgJson.exports['.'] = Object.fromEntries(
          Object.entries<string>(pkgJson.exports['.']).map(([key, val]) => [key, val.replace('public-api', 'index')])
        );

        // check that version and exports match
        expect(pkgJson.version).toBe(componentsJsPackageJson.version);

        if (packageName === '@porsche-design-system/components-angular') {
          expect(pkgJson.exports).toEqual({
            '.': {
              default: './fesm2022/porsche-design-system-components-angular.mjs',
              types: './types/porsche-design-system-components-angular.d.ts',
            },
            './package.json': {
              default: './package.json',
            },
            ...packageJsonExports,
          });
        } else {
          expect(pkgJson.exports).toEqual({
            './package.json': './package.json',
            '.': {
              style: './global-styles/index.css',
              types: './esm/index.d.ts',
              import: './esm/index.mjs',
              default: './cjs/index.cjs',
            },
            ...packageJsonExports,
          });
        }

        // create temporary local package tgz package
        // inspired by https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/9c6db02a531a797d2ce7b197bca94f82a50064e7/packages/cli/src/index.ts#L152-L155
        const tarBall = path.resolve(
          pathName,
          '..',
          execSync('npm pack', { cwd: path.dirname(pathName), encoding: 'utf8', stdio: 'pipe' }).trim()
        );

        const file = fs.readFileSync(tarBall);
        const data = new Uint8Array(file);
        const result = (await checkPackage(await createPackageFromTarballData(data), {})) as Analysis;

        // delete temporary package again
        fs.rmSync(tarBall);

        // ignore FalseCJS issues for certain entrypoints where both
        // esm and cjs build need their own typings
        // https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseCJS.md
        const relevantProblems = result.problems.filter(
          (prob: Problem) =>
            !(
              prob.kind === 'FalseCJS' ||
              prob.resolutionKind === 'node10' ||
              ('entrypoint' in prob &&
                (prob.entrypoint === './ag-grid' ||
                  prob.entrypoint === '.' ||
                  prob.entrypoint === './scss' ||
                  prob.entrypoint === './emotion' ||
                  prob.entrypoint === './vanilla-extract' ||
                  prob.entrypoint === './ssr' ||
                  prob.entrypoint === './styles' ||
                  prob.entrypoint === './styles/vanilla-extract' ||
                  prob.entrypoint.includes('tailwindcss') ||
                  prob.entrypoint.includes('font-face') ||
                  prob.entrypoint.includes('normalize') ||
                  prob.entrypoint.includes('legacy-radius') ||
                  prob.entrypoint.includes('variables') ||
                  prob.entrypoint.includes('cn') ||
                  prob.entrypoint.includes('index')))
            )
        );

        if (relevantProblems.length) {
          console.error(relevantProblems);
        }

        expect(relevantProblems).toHaveLength(0);
      },
      { timeout: 30000 }
    );
  }
});
