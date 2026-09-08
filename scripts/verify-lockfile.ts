/**
 * Verifies that `package-lock.json` records the **complete** set of platform-specific native binding
 * packages (`optionalDependencies` like `@oxc-parser/binding-linux-x64-gnu`, `@esbuild/darwin-arm64`, …).
 *
 * Why: npm has a long-standing bug (https://github.com/npm/cli/issues/4828) where an *incremental*
 * `npm install` only persists the binding matching the current platform and prunes all others.
 * `npm ci` on another platform (our Linux CI) then silently skips the missing optional dependency and
 * the failure only surfaces much later as `Cannot find native binding` during a build.
 *
 * See `docs/dependencies.md` → "Platform-specific native bindings in the lockfile".
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type LockfileEntry = {
  version?: string;
  resolved?: string;
  integrity?: string;
  link?: boolean;
  optionalDependencies?: Record<string, string>;
};

type Lockfile = {
  packages: Record<string, LockfileEntry>;
};

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// An explicit path is only used for debugging (e.g. verifying a lockfile from another revision).
const LOCKFILE_PATH = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : resolve(ROOT_DIR, 'package-lock.json');

// Tokens npm uses in `os` / `cpu` specific package names (e.g. `@rollup/rollup-linux-x64-gnu`).
const PLATFORM_TOKEN_REGEX =
  /(^|[-/])(aix|android|darwin|freebsd|linux|netbsd|openbsd|openharmony|sunos|wasm32|wasi|win32)([-/]|$)/;

const isPlatformSpecific = (packageName: string): boolean => PLATFORM_TOKEN_REGEX.test(packageName);

/** Resolves a dependency name from a lockfile path the way npm does: nearest `node_modules` upwards. */
const resolveEntry = (lockfile: Lockfile, parentPath: string, dependencyName: string): string | undefined => {
  const segments = parentPath.split('/node_modules/');

  for (let i = segments.length; i > 0; i--) {
    const candidate = [...segments.slice(0, i), dependencyName].join('/node_modules/');
    if (lockfile.packages[candidate]) {
      return candidate;
    }
  }

  const hoisted = `node_modules/${dependencyName}`;
  return lockfile.packages[hoisted] ? hoisted : undefined;
};

const verifyLockfile = (): string[] => {
  const lockfile: Lockfile = JSON.parse(readFileSync(LOCKFILE_PATH, 'utf8'));
  const errors: string[] = [];

  for (const [packagePath, entry] of Object.entries(lockfile.packages)) {
    const optionalDependencies = entry.optionalDependencies ?? {};
    const bindings = Object.keys(optionalDependencies).filter(isPlatformSpecific);

    if (bindings.length < 2) {
      continue; // not a multi-platform native binding set
    }

    const missing = bindings.filter((name) => !resolveEntry(lockfile, packagePath, name));

    // All missing is a deliberate/complete omission (e.g. a dependency pruned as a whole);
    // a *partial* set is the npm bug we are guarding against.
    if (missing.length > 0 && missing.length < bindings.length) {
      errors.push(
        `${packagePath || 'root'}: ${missing.length}/${bindings.length} platform bindings missing from the lockfile:\n` +
          missing.map((name) => `    - ${name}@${optionalDependencies[name]}`).join('\n')
      );
    }

    for (const name of bindings) {
      const bindingPath = resolveEntry(lockfile, packagePath, name);
      const binding = bindingPath ? lockfile.packages[bindingPath] : undefined;

      if (binding && !binding.link && (!binding.resolved || !binding.integrity)) {
        errors.push(`${bindingPath}: recorded without "resolved"/"integrity" (incomplete lockfile entry).`);
      }
    }
  }

  return errors;
};

const errors = verifyLockfile();

if (errors.length > 0) {
  console.error('✘ package-lock.json is incomplete:\n');
  for (const error of errors) {
    console.error(`  ${error}\n`);
  }
  console.error(
    'Fix: regenerate the lockfile from scratch instead of patching CI:\n' +
      '  rm -rf package-lock.json node_modules && npm install\n' +
      'If the bindings are still pruned, declare them explicitly as "optionalDependencies"\n' +
      '(see docs/dependencies.md → "Platform-specific native bindings in the lockfile").\n'
  );
  process.exit(1);
}

console.log('✔ package-lock.json records all platform-specific native bindings.');
