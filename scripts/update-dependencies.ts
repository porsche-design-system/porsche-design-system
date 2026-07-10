import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as semver from 'semver';

type PackageJson = {
  bin?: string | Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const require = createRequire(import.meta.url);
const passthroughArgs = process.argv.slice(2);
const exclusions = ['!@porsche-design-system/**', '!@angular/**', '!ng-packagr', '!zone.js'];

if (!hasExplicitTarget(passthroughArgs)) {
  const angularTypeScriptRange = readAngularTypeScriptRange();
  const typeScriptCandidate = readLatestTypeScriptVersion();

  // Angular's compiler-cli peer range is the stable source for the TypeScript ceiling.
  if (semver.satisfies(typeScriptCandidate, angularTypeScriptRange)) {
    process.stdout.write(`TypeScript latest ${typeScriptCandidate} is within Angular range ${angularTypeScriptRange}; updating.\n`);
  } else {
    exclusions.push('!typescript');
    process.stdout.write(
      `Holding typescript back: latest ${typeScriptCandidate} exceeds Angular ceiling ${angularTypeScriptRange}\n`
    );
  }
}

execFileSync(process.execPath, [resolveSyncpackBinPath(), 'update', ...toDependencyArgs(exclusions), ...passthroughArgs], {
  stdio: 'inherit',
});

function hasExplicitTarget(args: string[]): boolean {
  return args.some((arg) => arg === '--target' || arg.startsWith('--target='));
}

function readAngularTypeScriptRange(): string {
  const angularCompilerCliPackageJsonPath = resolvePackageJson('@angular/compiler-cli/package.json');
  const angularCompilerCliPackageJson = readPackageJson(angularCompilerCliPackageJsonPath);
  const angularTypeScriptRange = angularCompilerCliPackageJson.peerDependencies?.typescript?.trim();

  if (!angularTypeScriptRange) {
    abort('@angular/compiler-cli package.json does not define peerDependencies.typescript.');
  }

  return angularTypeScriptRange;
}

function readLatestTypeScriptVersion(): string {
  let typeScriptCandidate: string;

  try {
    typeScriptCandidate = execFileSync('npm', ['view', 'typescript', 'dist-tags.latest'], { encoding: 'utf8' }).trim();
  } catch (error) {
    abort(`Unable to read latest TypeScript version from npm registry: ${getErrorMessage(error)}`);
  }

  if (!typeScriptCandidate) {
    abort('npm view typescript dist-tags.latest returned an empty version.');
  }

  if (!semver.valid(typeScriptCandidate)) {
    abort(`npm view typescript dist-tags.latest returned invalid semver version "${typeScriptCandidate}".`);
  }

  return typeScriptCandidate;
}

function resolveSyncpackBinPath(): string {
  const syncpackPackageJsonPath = resolvePackageJson('syncpack/package.json');
  const syncpackPackageJson = readPackageJson(syncpackPackageJsonPath);
  const syncpackBin = typeof syncpackPackageJson.bin === 'string' ? syncpackPackageJson.bin : syncpackPackageJson.bin?.syncpack;

  if (!syncpackBin) {
    abort('syncpack package.json does not define a syncpack binary.');
  }

  return path.resolve(path.dirname(syncpackPackageJsonPath), syncpackBin);
}

function resolvePackageJson(packageJsonSpecifier: string): string {
  try {
    return require.resolve(packageJsonSpecifier);
  } catch (error) {
    abort(`Unable to resolve ${packageJsonSpecifier}: ${getErrorMessage(error)}`);
  }
}

function readPackageJson(packageJsonPath: string): PackageJson {
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (error) {
    abort(`Unable to read ${packageJsonPath}: ${getErrorMessage(error)}`);
  }
}

function toDependencyArgs(dependencies: string[]): string[] {
  return dependencies.flatMap((dependency) => ['--dependencies', dependency]);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function abort(message: string): never {
  console.error(message);
  process.exit(1);
}
