import {
  type Analysis,
  checkPackage,
  createPackageFromTarballData,
  type Problem,
  type ProblemKind,
  type ResolutionKind,
} from '@arethetypeswrong/core';
import { sync as globbySync } from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';
import componentsJsPackageJson from '../../../../dist/components-wrapper/package.json';
import { getPublishedFiles, withPackedTarball } from '../helpers/npm-pack';
import { getPackageDir, type PackageName, packageNames, readPackageJson } from '../helpers/packages';

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
  './meta': {
    types: './meta/esm/index.d.ts',
    import: './meta/esm/index.mjs',
    default: './meta/cjs/index.cjs',
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
    types: './emotion/esm/index.d.ts',
    sass: './scss/_index.scss',
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
  './index.css': './stylesheets/index.css',
  './index': './stylesheets/index.css',
  './color-scheme.css': './stylesheets/color-scheme.css',
  './color-scheme': './stylesheets/color-scheme.css',
  './font-face.css': './stylesheets/font-face.css',
  './font-face': './stylesheets/font-face.css',
  './normalize.css': './stylesheets/normalize.css',
  './normalize': './stylesheets/normalize.css',
  './variables.css': './stylesheets/variables.css',
  './variables': './stylesheets/variables.css',
  './cn': './stylesheets/cn/index.css',
  './cn/index.css': './stylesheets/cn/index.css',
  './cn/index': './stylesheets/cn/index.css',
  './cn/font-face.css': './stylesheets/cn/font-face.css',
  './cn/font-face': './stylesheets/cn/font-face.css',
};

describe('package content', () => {
  test('should not contain "CDN_BASE_URL_DYNAMIC" placeholder or "localhost" in any published js file', () => {
    const packageDir = getPackageDir('@porsche-design-system/components-js');
    const filesWithDevValues = getPublishedFiles(packageDir)
      .filter((filePath) => /\.(c|m)?js$/.test(filePath))
      .filter((filePath) => {
        const fileContent = fs.readFileSync(path.resolve(packageDir, filePath), 'utf8');
        return fileContent.includes('CDN_BASE_URL_DYNAMIC') || fileContent.includes('localhost');
      });

    expect(filesWithDevValues).toEqual([]);
  });
});

describe('stylesheets folder content', () => {
  const stylesheetsDir = path.resolve(getPackageDir('@porsche-design-system/components-js'), 'stylesheets');
  const stylesheetsFiles = globbySync(`${stylesheetsDir}/**/*`);

  test('should only expose .css files and no internal meta (js/cjs/mjs/d.ts) or package.json', () => {
    const nonCssFiles = stylesheetsFiles.filter((filePath) => !filePath.endsWith('.css'));
    expect(nonCssFiles).toEqual([]);
  });
});

describe('package.json files', () => {
  for (const packageName of packageNames) {
    test(`should have correct version and entrypoints for "${packageName}"`, () => {
      const pkgJson = readPackageJson(packageName);

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
            style: './stylesheets/index.css',
            types: './esm/index.d.ts',
            import: './esm/index.mjs',
            default: './cjs/index.cjs',
          },
          ...packageJsonExports,
        });
      }
    });
  }
});

/**
 * arethetypeswrong (https://arethetypeswrong.github.io) checks every entrypoint of the `exports` map with the four
 * module resolution modes of TypeScript (`node10`, `node16-cjs`, `node16-esm` and `bundler`). Per entrypoint and mode it
 * reports when nothing resolves, when only JavaScript but no types resolve, and when the types describe a different
 * module format (ESM or CommonJS) than the JavaScript they belong to.
 *
 * It does not type check the declaration files and skips imports of other packages, that is covered by
 * `typings.smoke.ts` and `package-imports.smoke.ts`.
 */
describe('arethetypeswrong', () => {
  type ExpectedProblem = {
    kind: ProblemKind;
    /** Applies to every entrypoint when omitted */
    entrypoint?: string;
    /** Applies to every module resolution mode when omitted */
    resolutionKind?: ResolutionKind;
    /** Applies to every package when omitted */
    packageName?: PackageName;
    /** Why this problem is accepted */
    reason: string;
  };

  // Every problem listed here must still be reported, so the list can't keep problems that are fixed already.
  const expectedProblems: ExpectedProblem[] = [
    {
      kind: 'FalseCJS',
      reason:
        'The packages have no `"type": "module"`, so TypeScript reads the `.d.ts` files as CommonJS, also for the ESM ' +
        'build (`.mjs`). Fixing it needs separate `.d.mts` typings per condition, which is a change of its own. ' +
        'https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/docs/problems/FalseCJS.md',
    },
    {
      kind: 'NoResolution',
      entrypoint: './styles',
      resolutionKind: 'node10',
      reason:
        '`node10` ignores the `exports` map and looks for a `styles` folder, which does not exist. The entrypoint is ' +
        'an alias of `./emotion`, which `node10` can resolve.',
    },
    {
      kind: 'NoResolution',
      entrypoint: './styles/vanilla-extract',
      resolutionKind: 'node10',
      reason:
        '`node10` ignores the `exports` map and looks for a `styles/vanilla-extract` folder, which does not exist. ' +
        'The entrypoint is an alias of `./vanilla-extract`, which `node10` can resolve.',
    },
    {
      kind: 'CJSResolvesToESM',
      entrypoint: '.',
      resolutionKind: 'node16-cjs',
      packageName: '@porsche-design-system/components-angular',
      reason: 'Angular libraries are ESM only, `require()` is not supported.',
    },
  ];

  const isExpectedProblem = (problem: Problem, expected: ExpectedProblem): boolean =>
    problem.kind === expected.kind &&
    (expected.entrypoint === undefined || ('entrypoint' in problem && problem.entrypoint === expected.entrypoint)) &&
    (expected.resolutionKind === undefined ||
      ('resolutionKind' in problem && problem.resolutionKind === expected.resolutionKind));

  // Entrypoints that only point to stylesheets, e.g. `./index.css` or `./scss`. arethetypeswrong tries to resolve them
  // as JavaScript modules and reports `NoResolution` for every mode, which is irrelevant for them.
  const getStylesheetEntrypoints = (exports: Record<string, unknown>): string[] => {
    const isStylesheet = (target: unknown): boolean => typeof target === 'string' && /\.s?css$/.test(target);
    return Object.entries(exports)
      .filter(([, target]) =>
        typeof target === 'object' && target !== null ? Object.values(target).every(isStylesheet) : isStylesheet(target)
      )
      .map(([entrypoint]) => entrypoint);
  };

  // A short, readable description, because the problem objects contain long resolution traces.
  const formatProblem = (problem: Problem): string =>
    [
      problem.kind,
      'entrypoint' in problem && `entrypoint "${problem.entrypoint}"`,
      'resolutionKind' in problem && `resolution "${problem.resolutionKind}"`,
      'typesFileName' in problem && `types "${problem.typesFileName}"`,
      'fileName' in problem && `file "${problem.fileName}"`,
      'moduleSpecifier' in problem && `import "${problem.moduleSpecifier}"`,
    ]
      .filter(Boolean)
      .join(', ');

  for (const packageName of packageNames) {
    test(`should only report expected problems for "${packageName}"`, { timeout: 60000 }, async () => {
      const result = (await withPackedTarball(getPackageDir(packageName), async (tarball) =>
        checkPackage(await createPackageFromTarballData(tarball))
      )) as Analysis;

      const stylesheetEntrypoints = getStylesheetEntrypoints(readPackageJson(packageName).exports);
      const problems = result.problems.filter(
        (problem) => !('entrypoint' in problem && stylesheetEntrypoints.includes(problem.entrypoint))
      );
      const expectedProblemsOfPackage = expectedProblems.filter(
        (expected) => expected.packageName === undefined || expected.packageName === packageName
      );

      const unexpectedProblems = problems.filter(
        (problem) => !expectedProblemsOfPackage.some((expected) => isExpectedProblem(problem, expected))
      );
      expect(unexpectedProblems.map(formatProblem)).toEqual([]);

      const expectedProblemsNoLongerReported = expectedProblemsOfPackage.filter(
        (expected) => !problems.some((problem) => isExpectedProblem(problem, expected))
      );
      expect(expectedProblemsNoLongerReported).toEqual([]);
    });
  }
});
