#!/usr/bin/env node
import * as chalk from 'chalk';
import { execSync } from 'node:child_process';
import { opts, PATHS, prepareRelease } from './prepare-release';

const { log } = console;

function run(cmd: string, cwd: string) {
  log(chalk.blue(`$ ${cmd}`));
  if (!opts.dryRun) execSync(cmd, { cwd, stdio: 'inherit' });
}

(function main() {
  const NEW_VERSION = prepareRelease('prepare-release-components', PATHS.components);
  // Update components version
  run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.components);
  // Update components-js wrapper version
  run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, PATHS.componentsJsWrapper);
})();
