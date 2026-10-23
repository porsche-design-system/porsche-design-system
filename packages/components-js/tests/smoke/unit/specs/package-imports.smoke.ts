import * as fs from 'node:fs';
import { builtinModules } from 'node:module';
import * as path from 'node:path';
import * as ts from 'typescript';
import { describe, expect, test } from 'vitest';
import { getPublishedFiles } from '../helpers/npm-pack';
import {
  createConsumerResolution,
  getPackageDir,
  getPackageName,
  type PackageName,
  packageNames,
  readPackageJson,
} from '../helpers/packages';

// Runtime imports that are deliberately not dependencies, because the code that uses them handles their absence.
const optionalImports: { file: RegExp; specifier: string }[] = [
  // The jsx format of the partials is only used in React projects, the import is wrapped in a try/catch.
  { file: /^partials\/(cjs|esm)\/index\.(cjs|mjs)$/, specifier: 'react/jsx-runtime' },
];

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

const getImportProblems = (packageName: PackageName): string[] => {
  const packageDir = getPackageDir(packageName);
  const { isModuleResolvable, isTypeReferenceResolvable } = createConsumerResolution(readPackageJson(packageName));
  const publishedFiles = new Set(getPublishedFiles(packageDir));

  return (
    [...publishedFiles]
      // The skills contain example sources for the consumer's project, they aren't modules of the package.
      .filter((filePath) => /\.(c|m)?js$|\.d\.[mc]?ts$/.test(filePath) && !filePath.startsWith('skills/'))
      .flatMap((filePath) => {
        const { importedFiles, referencedFiles, typeReferenceDirectives } = ts.preProcessFile(
          fs.readFileSync(path.resolve(packageDir, filePath), 'utf8'),
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
              isModuleResolvable(specifier, filePath) ||
              optionalImports.some((x) => x.specifier === specifier && x.file.test(filePath))
              ? undefined
              : `${filePath}: "${specifier}" is not a dependency, a required peer dependency or an optional peer dependency of its folder`;
          }),
          ...referencedFiles.map(({ fileName }) =>
            publishedFiles.has(path.posix.join(path.posix.dirname(filePath), fileName))
              ? undefined
              : `${filePath}: reference path "${fileName}" is not published`
          ),
          ...typeReferenceDirectives.map(({ fileName }) =>
            isTypeReferenceResolvable(fileName, filePath)
              ? undefined
              : `${filePath}: reference types "${fileName}" is not a dependency, a required peer dependency or an optional peer dependency of its folder`
          ),
        ].filter((problem) => problem !== undefined);
      })
  );
};

describe('package imports', () => {
  for (const packageName of packageNames) {
    test(`should only import published files, dependencies and peer dependencies in "${packageName}"`, {
      timeout: 60000,
    }, () => {
      expect(getImportProblems(packageName)).toEqual([]);
    });
  }
});
