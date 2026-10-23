import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

type NpmPackResult = { filename: string; files: { path: string }[] };

// Packs the package by path, exactly like `.github/scripts/release-npm.sh` publishes it. Running `npm pack` inside the
// package directory instead applies the repository's `.gitignore` and leaves out every nested `dist` folder, so the
// result would differ from what is published.
const npmPack = (packageDir: string, args: string): NpmPackResult => {
  const [result] = JSON.parse(
    execSync(`npm pack ${packageDir} --json --ignore-scripts ${args}`, { encoding: 'utf8', stdio: 'pipe' })
  ) as NpmPackResult[];
  return result;
};

/** Returns the paths of all files that npm would publish, relative to the package directory. */
export const getPublishedFiles = (packageDir: string): string[] =>
  npmPack(packageDir, '--dry-run').files.map(({ path }) => path);

/** Packs the package into a temporary directory, which is removed again even if the callback throws. */
export const withPackedTarball = async <T>(packageDir: string, callback: (tarball: Uint8Array) => Promise<T>) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pds-npm-pack-'));
  try {
    const { filename } = npmPack(packageDir, `--pack-destination ${tmpDir}`);
    return await callback(new Uint8Array(fs.readFileSync(path.join(tmpDir, filename))));
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
};
