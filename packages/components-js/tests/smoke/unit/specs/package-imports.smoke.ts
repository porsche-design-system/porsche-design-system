import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import { builtinModules } from 'node:module';
import * as path from 'node:path';
import * as ts from 'typescript';
import { describe, expect, test } from 'vitest';

const rootDir = path.resolve(__dirname, '../../../../../..');

const packageDirs = [
  'packages/components-js/dist/components-wrapper',
  'packages/components-angular/dist/angular-wrapper',
  'packages/components-react/dist/react-wrapper',
  'packages/components-vue/dist/vue-wrapper',
];

// Runtime imports that are deliberately not dependencies, because the code that uses them handles their absence.
const optionalImports: { file: RegExp; specifier: string }[] = [
  // The jsx format of the partials is only used in React projects, the import is wrapped in a try/catch.
  { file: /^partials\/(cjs|esm)\/index\.(cjs|mjs)$/, specifier: 'react/jsx-runtime' },
];

// Packed exactly like `.github/scripts/release-npm.sh` publishes. Running `npm pack` inside the package directory
// instead applies the repository's `.gitignore` and leaves out nested `dist` folders.
const getPublishedFiles = (packageDir: string): string[] => {
  const [{ files }] = JSON.parse(
    execSync(`npm pack ${packageDir} --dry-run --json --ignore-scripts`, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: 'pipe',
    })
  ) as { files: { path: string }[] }[];
  return files.map(({ path }) => path);
};

const getPackageName = (specifier: string): string =>
  specifier
    .split('/')
    .slice(0, specifier.startsWith('@') ? 2 : 1)
    .join('/');

const isBuiltinModule = (specifier: string): boolean =>
  specifier.startsWith('node:') || builtinModules.includes(getPackageName(specifier));

const getRelativeCandidates = (filePath: string, specifier: string): string[] => {
  const resolved = path.posix.join(path.posix.dirname(filePath), specifier);
  if (/\.d\.[mc]?ts$/.test(filePath)) {
    const withoutJsExtension = resolved.replace(/\.([mc]?)js$/, '');
    const declarationExtension = resolved.match(/\.([mc]?)js$/)?.[1] ?? '';
    return [
      resolved,
      `${withoutJsExtension}.d.${declarationExtension}ts`,
      `${resolved}.d.ts`,
      `${resolved}/index.d.ts`,
    ];
  }
  return [resolved, `${resolved}.js`, `${resolved}.json`, `${resolved}/index.js`];
};

const getImportProblems = (packageDir: string): string[] => {
  const absolutePackageDir = path.resolve(rootDir, packageDir);
  const pkgJson = JSON.parse(fs.readFileSync(path.resolve(absolutePackageDir, 'package.json'), 'utf8'));
  const resolvablePackages = new Set<string>([
    pkgJson.name,
    ...Object.keys(pkgJson.dependencies ?? {}),
    ...Object.keys(pkgJson.peerDependencies ?? {}),
  ]);
  const publishedFiles = new Set(getPublishedFiles(packageDir));

  return (
    [...publishedFiles]
      // The skills contain example sources for the consumer's project, they aren't modules of the package.
      .filter((filePath) => /\.(c|m)?js$|\.d\.[mc]?ts$/.test(filePath) && !filePath.startsWith('skills/'))
      .flatMap((filePath) => {
        const { importedFiles, referencedFiles, typeReferenceDirectives } = ts.preProcessFile(
          fs.readFileSync(path.resolve(absolutePackageDir, filePath), 'utf8'),
          true,
          true
        );

        return [
          ...importedFiles.map(({ fileName: specifier }) => {
            if (specifier.startsWith('.')) {
              return getRelativeCandidates(filePath, specifier).some((candidate) => publishedFiles.has(candidate))
                ? undefined
                : `${filePath}: "${specifier}" is not published`;
            }
            return isBuiltinModule(specifier) ||
              resolvablePackages.has(getPackageName(specifier)) ||
              optionalImports.some((x) => x.specifier === specifier && x.file.test(filePath))
              ? undefined
              : `${filePath}: "${specifier}" is not a dependency or peer dependency`;
          }),
          ...referencedFiles.map(({ fileName }) =>
            publishedFiles.has(path.posix.join(path.posix.dirname(filePath), fileName))
              ? undefined
              : `${filePath}: reference path "${fileName}" is not published`
          ),
          ...typeReferenceDirectives.map(({ fileName }) => {
            const packageName = getPackageName(fileName);
            return resolvablePackages.has(packageName) ||
              resolvablePackages.has(`@types/${packageName.replace(/^@/, '').replace('/', '__')}`)
              ? undefined
              : `${filePath}: reference types "${fileName}" is not a dependency or peer dependency`;
          }),
        ].filter((problem) => problem !== undefined);
      })
  );
};

describe('package imports', () => {
  for (const packageDir of packageDirs) {
    test(`should only import published files, dependencies and peer dependencies in "${packageDir}"`, {
      timeout: 60000,
    }, () => {
      expect(getImportProblems(packageDir)).toEqual([]);
    });
  }
});
