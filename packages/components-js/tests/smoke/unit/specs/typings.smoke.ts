import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';
import { describe, expect, test } from 'vitest';
import { createConsumerResolution, getPackageDir, readPackageJson } from '../helpers/packages';

const pkgDir = getPackageDir('@porsche-design-system/components-js');
const pkgJson = readPackageJson('@porsche-design-system/components-js');
const consumerResolution = createConsumerResolution(pkgJson);

// Files outside the package, e.g. of react or typescript itself, resolve as usual.
const getPackageFilePath = (containingFile: string): string | undefined =>
  containingFile.startsWith(`${pkgDir}${path.sep}`)
    ? path.relative(pkgDir, containingFile).split(path.sep).join('/')
    : undefined;

const isResolvableForConsumers = (specifier: string, containingFile: string): boolean => {
  const filePath = getPackageFilePath(containingFile);
  return (
    filePath === undefined || specifier.startsWith('.') || consumerResolution.isModuleResolvable(specifier, filePath)
  );
};

const isTypeReferenceResolvableForConsumers = (name: string, containingFile: string): boolean => {
  const filePath = getPackageFilePath(containingFile);
  return filePath === undefined || consumerResolution.isTypeReferenceResolvable(name, filePath);
};

const compilerOptions: ts.CompilerOptions = {
  strict: true,
  skipLibCheck: false,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ['lib.es2022.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
  types: [],
};

const getTypeErrors = (fixtureContent: string): string[] => {
  const fixturePath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '__typings-smoke-fixture__.ts');
  const host = ts.createCompilerHost(compilerOptions, true);
  const { fileExists, readFile } = host;
  host.fileExists = (fileName) => fileName === fixturePath || fileExists(fileName);
  host.readFile = (fileName) => (fileName === fixturePath ? fixtureContent : readFile(fileName));
  host.resolveModuleNameLiterals = (moduleLiterals, containingFile, redirectedReference, options) =>
    moduleLiterals.map(({ text }) =>
      isResolvableForConsumers(text, containingFile)
        ? ts.resolveModuleName(text, containingFile, options, host, undefined, redirectedReference)
        : { resolvedModule: undefined }
    );
  host.resolveTypeReferenceDirectiveReferences = (references, containingFile, redirectedReference, options) =>
    references.map((reference) => {
      const name = typeof reference === 'string' ? reference : reference.fileName.toLowerCase();
      return isTypeReferenceResolvableForConsumers(name, containingFile)
        ? ts.resolveTypeReferenceDirective(name, containingFile, options, host, redirectedReference)
        : { resolvedTypeReferenceDirective: undefined };
    });

  const program = ts.createProgram({ rootNames: [fixturePath], options: compilerOptions, host });

  return ts
    .getPreEmitDiagnostics(program)
    .filter(({ file }) => !file || file.fileName === fixturePath || file.fileName.startsWith(`${pkgDir}${path.sep}`))
    .map(({ file, start, code, messageText }) => {
      const message = ts.flattenDiagnosticMessageText(messageText, '\n');
      if (!file || start === undefined) {
        return `TS${code}: ${message}`;
      }
      const { line, character } = file.getLineAndCharacterOfPosition(start);
      return `${path.relative(pkgDir, file.fileName)}(${line + 1},${character + 1}): TS${code}: ${message}`;
    });
};

const typedEntrypoints = Object.entries<unknown>(pkgJson.exports)
  .filter(([, target]) => typeof target === 'object' && target !== null && 'types' in target)
  .map(([entrypoint]) => entrypoint);

describe('typings', () => {
  test('should find typed entrypoints', () => {
    expect(typedEntrypoints).toContain('.');
  });

  for (const entrypoint of typedEntrypoints) {
    const specifier = entrypoint === '.' ? pkgJson.name : `${pkgJson.name}/${entrypoint.slice(2)}`;

    test(`should type check "${specifier}" without skipLibCheck`, { timeout: 30000 }, () => {
      expect(getTypeErrors(`export * as entrypoint from '${specifier}';`)).toEqual([]);
    });
  }

  test('should provide the public API of the main entrypoint', { timeout: 30000 }, () => {
    const fixtureContent = `import { componentsReady, load, type LoadOptions } from '${pkgJson.name}';

const options: LoadOptions = { prefix: 'my-prefix', cdn: 'auto' };
load(options);
load();

export const ready: Promise<number> = componentsReady(document.body, 'complete');
export const cdnUrl: string = document.porscheDesignSystem.cdn.url;
export const cdnKey: 'auto' | 'cn' = window.PORSCHE_DESIGN_SYSTEM_CDN;
`;

    expect(getTypeErrors(fixtureContent)).toEqual([]);
  });
});
