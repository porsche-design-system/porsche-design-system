#!/usr/bin/env node

import { Command, Option } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as semver from 'semver';
import * as chalk from 'chalk';
import * as fg from 'fast-glob';
import { execSync } from 'node:child_process';

const { log, warn } = console;

const PROJECT_ROOT = process.cwd();
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'packages', 'components', 'package.json');
const PRERELEASE_TAGS = ['rc', 'alpha', 'beta'] as const;
const INCREMENT_OPERATIONS = [...semver.RELEASE_TYPES, 'release'] as const;
const PRE_RELEASE_TYPES = ['premajor', 'preminor', 'prepatch', 'prerelease'] as const;
const DEFAULT_PRE_RELEASE_TAG: PrereleaseTag = 'rc';
const PATHS = {
  components: path.join(PROJECT_ROOT, 'packages', 'components'),
  componentsJsWrapper: path.join(PROJECT_ROOT, 'packages', 'components-js', 'projects', 'components-wrapper'),
};

type PrereleaseTag = (typeof PRERELEASE_TAGS)[number];
type IncrementOp = (typeof INCREMENT_OPERATIONS)[number];
type PreOps = (typeof PRE_RELEASE_TYPES)[number];
type VersionPair = { currentVersion: string; newVersion: string };

/** --- CLI Setup --- */
const program = new Command()
  .addOption(new Option('-i, --increment <op>', 'increment level').choices(INCREMENT_OPERATIONS).default('patch'))
  .addOption(new Option('-p, --prerelease <tag>', 'prerelease tag').choices(PRERELEASE_TAGS))
  .option('--dry-run', 'perform a dry run without making changes')
  .showHelpAfterError();

program.parse(process.argv);
const opts = program.opts<{
  increment: IncrementOp;
  prerelease: PrereleaseTag;
  dryRun?: boolean;
}>();

const DRY_RUN = Boolean(opts.dryRun);
if (DRY_RUN) log(chalk.magenta('*** DRY RUN: no changes will be made ***'));

// --- Version Computation ---
function getNewVersionFromArgs(): VersionPair {
  // read current version
  let currentVersion: string;
  try {
    const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8')) as { version?: string };
    currentVersion = pkg.version ?? '';
  } catch (err) {
    throw new Error(`Failed to read package.json at ${PACKAGE_JSON_PATH}: ${err}`);
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

function run(cmd: string, cwd: string) {
  log(chalk.blue(`$ ${cmd}`));
  if (!DRY_RUN) execSync(cmd, { cwd, stdio: 'inherit' });
}

function writeJson(file: string, data: any) {
  if (!DRY_RUN) {
    fs.writeFileSync(
      file,
      `${JSON.stringify(data, null, 2)}
`
    );
  }
  log(chalk.yellow(`Updated ${path.relative(PROJECT_ROOT, file)}`));
}

function updatePkgJson(currentVersion: string, newVersion: string, relPath: string) {
  const fullPath = path.join(PROJECT_ROOT, relPath);
  const json = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as Record<string, any>;
  let updated = false;

  if (json.version === currentVersion) {
    json.version = newVersion;
    updated = true;
  }

  for (const field of ['dependencies', 'devDependencies', 'peerDependencies'] as const) {
    const deps = json[field] as Record<string, string> | undefined;
    if (!deps) continue;
    for (const [name, ver] of Object.entries(deps)) {
      if (
        name.startsWith('@porsche-design-system/') &&
        (ver === currentVersion || ver.startsWith(`${currentVersion}-`))
      ) {
        deps[name] = newVersion;
        updated = true;
      }
    }
  }

  if (updated) {
    writeJson(fullPath, json);
  }
}

function updateChangelog(pkgDir: string, version: string) {
  const changelogPath = path.join(pkgDir, 'CHANGELOG.md');
  let content = fs.readFileSync(changelogPath, 'utf-8');
  content = content.replace(
    /^## \[Unreleased\]/m,
    `## [Unreleased]

### [${version}] - ${new Date().toISOString().split('T')[0]}`
  );
  if (!DRY_RUN)
    fs.writeFileSync(
      changelogPath,
      `${content}
`
    );
  log(chalk.yellow(`Updated CHANGELOG.md in ${path.relative(PROJECT_ROOT, pkgDir)}`));
}

(async function main() {
  const { currentVersion: OLD_VERSION, newVersion: NEW_VERSION } = getNewVersionFromArgs();

  log(chalk.green(`Bumping from ${OLD_VERSION} to ${NEW_VERSION}`));
  // 1. Update components version
  run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.components);
  // 2. Update components-js wrapper version
  run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.componentsJsWrapper);
  // 3. Update changelog
  updateChangelog(PATHS.components, NEW_VERSION);

  // 4. Glob and update all workspace package.json files
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
    updatePkgJson(OLD_VERSION, NEW_VERSION, rel);
  }

  log(chalk.green('All package.json files updated.'));
})();
