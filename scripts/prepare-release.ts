import { Command, Option } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as semver from 'semver';
import * as chalk from 'chalk';
import * as fg from 'fast-glob';
import { execSync } from 'node:child_process';

const { log, warn } = console;

const PROJECT_ROOT = process.cwd();
const PRERELEASE_TAGS = ['rc', 'alpha', 'beta'] as const;
const INCREMENT_OPERATIONS = [...semver.RELEASE_TYPES, 'release'] as const;
const PRE_RELEASE_TYPES = ['premajor', 'preminor', 'prepatch', 'prerelease'] as const;
const DEFAULT_PRE_RELEASE_TAG: PrereleaseTag = 'rc';
export const PATHS = {
  assets: path.join(PROJECT_ROOT, 'packages', 'assets'),
  components: path.join(PROJECT_ROOT, 'packages', 'components'),
  componentsJsWrapper: path.join(PROJECT_ROOT, 'packages', 'components-js', 'projects', 'components-wrapper'),
};

type PrereleaseTag = (typeof PRERELEASE_TAGS)[number];
type IncrementOp = (typeof INCREMENT_OPERATIONS)[number];
type PreOps = (typeof PRE_RELEASE_TYPES)[number];
type VersionPair = { currentVersion: string; newVersion: string };
export type CLIOptions = {
  increment: IncrementOp;
  prerelease: PrereleaseTag;
  dryRun?: boolean;
};

/** --- CLI Setup --- */
const program = new Command()
  .addOption(new Option('-i, --increment <op>', 'increment level').choices(INCREMENT_OPERATIONS).default('patch'))
  .addOption(new Option('-p, --prerelease <tag>', 'prerelease tag').choices(PRERELEASE_TAGS))
  .option('--dry-run', 'perform a dry run without making changes')
  .showHelpAfterError();

program.parse(process.argv);
const opts = program.opts<CLIOptions>();

/** --- Version Computation --- */
export function getNewVersionFromArgs(path: string): VersionPair {
  const filePath = `${path}/package.json`;

  let currentVersion: string;
  try {
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { version?: string };
    currentVersion = pkg.version ?? '';
  } catch (err) {
    throw new Error(`Failed to read package.json at ${filePath}: ${err}`);
  }
  if (!semver.valid(currentVersion)) {
    throw new Error(`Invalid current version: ${currentVersion}`);
  }

  const { increment: incOp, prerelease: preTag } = opts;
  let newVersion: string;
  if (incOp === 'release') {
    const cleaned = semver.clean(currentVersion);
    if (!cleaned) throw new Error(`Cannot clean version '${currentVersion}'.`);
    if (!semver.valid(cleaned)) throw new Error(`Cleaned version '${cleaned}' is invalid.`);
    newVersion = cleaned;
  } else {
    const isPre = PRE_RELEASE_TYPES.includes(incOp as PreOps);
    if (!isPre && preTag) {
      warn(chalk.yellow(`Warning: prerelease tag '${preTag}' ignored for '${incOp}'.`));
      const bumped = semver.inc(currentVersion, incOp);
      if (!bumped) throw new Error(`Failed to bump version with operation '${incOp}'.`);
      newVersion = bumped;
    } else {
      const bumped = semver.inc(currentVersion, incOp, preTag ?? DEFAULT_PRE_RELEASE_TAG);
      if (!bumped) throw new Error(`Failed to bump version with operation '${incOp}' and tag '${preTag}'.`);
      newVersion = bumped;
    }
  }

  return { currentVersion, newVersion };
}

function writeJson(file: string, data: any, dryRun: boolean) {
  if (!dryRun) {
    fs.writeFileSync(
      file,
      `${JSON.stringify(data, null, 2)}
`
    );
  }
  log(chalk.yellow(`Updated ${path.relative(PROJECT_ROOT, file)}`));
}

export function run(cmd: string, cwd: string) {
  log(chalk.blue(`$ ${cmd}`));
  if (!opts.dryRun) execSync(cmd, { cwd, stdio: 'inherit' });
}

export function updatePkgJson(currentVersion: string, newVersion: string, relPath: string, suffix: string = '') {
  const fullPath = path.join(PROJECT_ROOT, relPath);
  const json = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as Record<string, any>;
  let updated = false;

  for (const field of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
    const deps = json[field] as Record<string, string> | undefined;
    if (!deps) continue;
    for (const [name, ver] of Object.entries(deps)) {
      if (
        name.startsWith(`@porsche-design-system/${suffix}`) &&
        (ver === currentVersion || ver.startsWith(`${currentVersion}-`)) // ensure "@porsche-design-system/*": "0.0.0", are ignored
      ) {
        deps[name] = newVersion;
        updated = true;
      }
    }
  }

  if (updated) {
    writeJson(fullPath, json, opts.dryRun);
  }
}

export function updateChangelog(pkgDir: string, version: string) {
  const changelogPath = path.join(pkgDir, 'CHANGELOG.md');
  let content = fs.readFileSync(changelogPath, 'utf-8');
  content = content.replace(
    /^## \[Unreleased\]/m,
    `## [Unreleased]

### [${version}] - ${new Date().toISOString().split('T')[0]}`
  );
  if (!opts.dryRun) fs.writeFileSync(changelogPath, `${content}`);
  log(chalk.yellow(`Updated CHANGELOG.md in ${path.relative(PROJECT_ROOT, pkgDir)}`));
}

/**
 * Glob through workspace package.json files and apply version updates.
 */
export function updateWorkspacePackages(currentVersion: string, newVersion: string) {
  const rootPkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'));
  const workspaces: string[] = Array.isArray(rootPkg.workspaces)
    ? rootPkg.workspaces
    : Array.isArray(rootPkg.workspaces?.packages)
      ? rootPkg.workspaces.packages
      : ['packages/*'];

  const includeGlobs = workspaces.map((ws) => `${ws.replace(/\*$/, '')}/**/package.json`);
  const ignoreGlobs = ['**/node_modules/**'];
  const entries = fg.sync(includeGlobs, { cwd: PROJECT_ROOT, ignore: ignoreGlobs });

  for (const rel of entries) {
    updatePkgJson(currentVersion, newVersion, rel);
  }
}

export function prepareRelease(label: string, pkgDir: string, callback: (version: string) => void): void {
  const DRY_RUN = Boolean(opts.dryRun);
  if (DRY_RUN) log(chalk.magenta(`*** DRY RUN: no changes for ${label} ***`));
  const { currentVersion: OLD_VERSION, newVersion: NEW_VERSION } = getNewVersionFromArgs(pkgDir);
  log(chalk.green(`[${label}]: Bumping from ${OLD_VERSION} to ${NEW_VERSION}`));

  updateChangelog(pkgDir, NEW_VERSION);
  updateWorkspacePackages(OLD_VERSION, NEW_VERSION);

  callback(NEW_VERSION);
  log(chalk.green(`[${label}]: All package.json files updated.`));
}
