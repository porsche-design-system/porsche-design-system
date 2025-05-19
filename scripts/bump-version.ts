#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as semver from 'semver';
import * as chalk from 'chalk';

const program = new Command();

// Root of the project (where package.json and packages/ folder live)
const PROJECT_ROOT = process.cwd();
// Package JSON location
const PACKAGE_LOCATION = path.join(PROJECT_ROOT, 'packages/components');
const PACKAGE_JSON_PATH = path.join(PACKAGE_LOCATION, 'package.json');

// Allowed prerelease tags
const PRERELEASE_TAGS = ['rc', 'alpha', 'beta'];

// Build increment operations list (include 'release')
const INCREMENT_OPERATIONS = [...semver.RELEASE_TYPES, 'release'];

program
  .option('-i, --increment <type>', `increment level [${INCREMENT_OPERATIONS.join(', ')}]`, 'patch')
  .option('-p, --prerelease <tag>', `prerelease tag [${PRERELEASE_TAGS.join(', ')}]`, 'rc')
  .parse(process.argv);

const options = program.opts();
const { increment: incrementOperation, prerelease: prereleaseTag } = options;

// Validate increment operation
if (!INCREMENT_OPERATIONS.includes(incrementOperation)) {
  console.error(chalk.red(`Error: Invalid increment level. Choose from [${INCREMENT_OPERATIONS.join(', ')}].`));
  process.exit(1);
}

// Validate prerelease tag
if (prereleaseTag && !PRERELEASE_TAGS.includes(prereleaseTag)) {
  console.error(chalk.red(`Error: Invalid prerelease tag. Choose from [${PRERELEASE_TAGS.join(', ')}].`));
  process.exit(1);
}

// Read current package.json version
let pkg: { version?: string };
try {
  pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
} catch (err) {
  console.error(chalk.red(`Error: Failed to read package.json at ${PACKAGE_JSON_PATH}`, err));
  process.exit(1);
}

const currentVersion = pkg.version;
if (!currentVersion || !semver.valid(currentVersion)) {
  console.error(chalk.red(`Error: The extracted version '${currentVersion}' is not a valid semantic version.`));
  process.exit(1);
}

console.log(chalk.yellow(`Using semver spec: ${semver.SEMVER_SPEC_VERSION}`));
console.log(`Current version is: ${currentVersion}`);

let newVersion: string | null;

// Handle 'release' finalization separately (no prerelease)
if (incrementOperation === 'release') {
  // Remove any prerelease identifiers
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  newVersion = semver.valid(semver.clean(currentVersion)!)!;
} else {
  // Warn if prerelease tag ignored
  const preOps = ['premajor', 'preminor', 'prepatch', 'prerelease'];
  if (prereleaseTag && !preOps.includes(incrementOperation)) {
    console.warn(
      chalk.yellow(
        `Warning: Prerelease tag '${prereleaseTag}' will be ignored for increment level '${incrementOperation}'.`
      )
    );
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    newVersion = semver.inc(currentVersion, incrementOperation as semver.ReleaseType)!;
  } else {
    newVersion = semver.inc(currentVersion, incrementOperation as semver.ReleaseType, prereleaseTag);
  }
}

if (!newVersion) {
  console.error(
    chalk.red(
      `Error: Version bump for operation '${incrementOperation}' is not valid for current version '${currentVersion}'. No changes made.`
    )
  );
  process.exit(1);
}

console.log(chalk.green(`Bumping version from ${currentVersion} to ${newVersion}`));

// Export for CI/CD environments
console.log(`export NEW_VERSION=${newVersion}`);

process.exit(0);
