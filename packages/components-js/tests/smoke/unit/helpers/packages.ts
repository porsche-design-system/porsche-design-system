import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';

const nodeRequire = createRequire(import.meta.url);

export const packageNames = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-angular',
  '@porsche-design-system/components-react',
  '@porsche-design-system/components-vue',
] as const;
export type PackageName = (typeof packageNames)[number];

type PackageJson = {
  name: string;
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  version: string;
  exports: Record<string, any>;
};

/** The root directory of the built package, e.g. `packages/components-js/dist/components-wrapper`. */
export const getPackageDir = (packageName: PackageName): string =>
  fs.realpathSync(path.dirname(nodeRequire.resolve(`${packageName}/package.json`)));

export const readPackageJson = (packageName: PackageName): PackageJson =>
  JSON.parse(fs.readFileSync(path.resolve(getPackageDir(packageName), 'package.json'), 'utf8'));

export const getPackageName = (specifier: string): string =>
  specifier
    .split('/')
    .slice(0, specifier.startsWith('@') ? 2 : 1)
    .join('/');

// Optional peer dependencies are only installed by consumers of the entrypoint that needs them, so only the files of
// that entrypoint's folder may import them. An optional peer dependency missing here can't be imported at all.
const optionalPeerDependencyFolders: Record<string, string> = {
  'ag-grid-angular': 'ag-grid',
  'ag-grid-community': 'ag-grid',
  'ag-grid-enterprise': 'ag-grid',
  'ag-grid-react': 'ag-grid',
  'ag-grid-vue3': 'ag-grid',
  jsdom: 'jsdom-polyfill',
  tailwindcss: 'tailwindcss',
};

/**
 * Decides which packages a consumer has installed alongside the package. The monorepo's node_modules would resolve far
 * more, e.g. private workspace packages, which would hide missing dependencies.
 * `filePath` is the importing file, relative to the package directory and with `/` as separator.
 */
export const createConsumerResolution = (pkgJson: PackageJson) => {
  const isOptional = (packageName: string): boolean => !!pkgJson.peerDependenciesMeta?.[packageName]?.optional;
  const installedPackages = new Set<string>([
    pkgJson.name,
    ...Object.keys(pkgJson.dependencies ?? {}),
    ...Object.keys(pkgJson.peerDependencies ?? {}).filter((packageName) => !isOptional(packageName)),
  ]);

  const isPackageResolvable = (packageName: string, filePath: string): boolean =>
    installedPackages.has(packageName) ||
    (packageName in (pkgJson.peerDependencies ?? {}) &&
      isOptional(packageName) &&
      packageName in optionalPeerDependencyFolders &&
      filePath.startsWith(`${optionalPeerDependencyFolders[packageName]}/`));

  return {
    isModuleResolvable: (specifier: string, filePath: string): boolean =>
      isPackageResolvable(getPackageName(specifier), filePath),
    // `/// <reference types="x" />` resolves either the package `x` or `@types/x`.
    isTypeReferenceResolvable: (name: string, filePath: string): boolean => {
      const packageName = getPackageName(name);
      return (
        isPackageResolvable(packageName, filePath) ||
        isPackageResolvable(`@types/${packageName.replace(/^@/, '').replace('/', '__')}`, filePath)
      );
    },
  };
};
