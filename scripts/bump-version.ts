#!/usr/bin/env node

import { Command, Option } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as semver from 'semver';
import * as chalk from 'chalk';

const program = new Command();
const { log, error, warn } = console;

/** Constants */
const PROJECT_ROOT = process.cwd();
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'packages', 'components', 'package.json');
const PRERELEASE_TAGS = ['rc', 'alpha', 'beta'] as const;
const INCREMENT_OPERATIONS = [...semver.RELEASE_TYPES, 'release'] as const;
const PRE_RELEASE_TYPES = ['premajor', 'preminor', 'prepatch', 'prerelease'] as const;

/** Types */
type PrereleaseTag = (typeof PRERELEASE_TAGS)[number];
type IncrementOp = (typeof INCREMENT_OPERATIONS)[number];
type PreOps = (typeof PRE_RELEASE_TYPES)[number];

/** CLI setup */
program
  .addOption(new Option('-i, --increment <op>', 'increment level').choices(INCREMENT_OPERATIONS).default('patch'))
  .addOption(new Option('-p, --prerelease <tag>', 'prerelease tag').choices(PRERELEASE_TAGS).default('rc'))
  .showHelpAfterError()
  .parse(process.argv);

const { increment: incrementOp, prerelease: prereleaseTag } = program.opts<{
  increment: IncrementOp;
  prerelease: PrereleaseTag;
}>();

/** Exit with error message */
function exitWithError(msg: string, err?: unknown): never {
  error(chalk.red(`Error: ${msg}`));
  if (err instanceof Error) error(err);
  process.exit(1);
}

/** Read & validate current version */
let currentVersion: string;
try {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8')) as { version?: string };
  currentVersion = pkg.version ?? '';
} catch (err) {
  exitWithError(`Failed to read package.json at ${PACKAGE_JSON_PATH}`, err);
}
if (!semver.valid(currentVersion)) {
  exitWithError(`Extracted version '${currentVersion}' is not valid.`);
}

log(chalk.yellow(`Using semver spec: ${semver.SEMVER_SPEC_VERSION}`));
log(`Current version: ${currentVersion}`);

/** Compute new version */
let newVersion: string | null;

if (incrementOp === 'release') {
  // Strip prerelease identifiers
  const cleaned = semver.clean(currentVersion);
  if (!cleaned) {
    exitWithError(`Unable to clean version '${currentVersion}'.`);
  }
  const validVer = semver.valid(cleaned);
  if (!validVer) {
    exitWithError(`Cleaned version '${cleaned}' is not valid.`);
  }
  newVersion = validVer;
} else {
  const isPre = PRE_RELEASE_TYPES.includes(incrementOp as PreOps);
  if (!isPre && prereleaseTag) {
    warn(chalk.yellow(`Warning: prerelease tag '${prereleaseTag}' ignored for '${incrementOp}'.`));
  }
  const bumped = semver.inc(currentVersion, incrementOp as semver.ReleaseType, isPre ? prereleaseTag : undefined);
  if (!bumped) {
    exitWithError(`Failed to bump version '${currentVersion}' with operation '${incrementOp}'.`);
  }
  newVersion = bumped;
}

if (!newVersion) {
  exitWithError(`Bump operation '${incrementOp}' invalid for version '${currentVersion}'.`);
}

log(chalk.green(`Bumping from ${currentVersion} to ${newVersion}`));

/** Export the new version */
log(`export NEW_VERSION=${newVersion}`);
process.exit(0);
