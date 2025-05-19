#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';
import * as chalk from 'chalk';

// Utility to run a command in a given directory
function run(cmd: string, cwd: string) {
  console.log(chalk.blue(`$ ${cmd}`));
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// Read NEW_VERSION from environment or via bump-version script
function getNewVersion(): string {
  const envVersion = process.env.NEW_VERSION;
  if (envVersion) return envVersion;

  // Fallback: run bump-version script
  const scriptPath = path.join(process.cwd(), 'dist', 'bump-version.js');
  try {
    const out = execSync(`node ${scriptPath}`, { encoding: 'utf-8' });
    const match = out.match(/export NEW_VERSION=(\S+)/);
    if (match) return match[1];
  } catch (err) {
    console.error(chalk.red('Error: Unable to determine NEW_VERSION.'));
    process.exit(1);
  }
  console.error(chalk.red('Error: NEW_VERSION not found in bump-version output.'));
  process.exit(1);
}

const NEW_VERSION = getNewVersion();
console.log(chalk.green(`Using NEW_VERSION=${NEW_VERSION}`));

// Directories
const root = process.cwd();
const pkgComponents = path.join(root, 'packages', 'components');
const pkgComponentsJsWrapper = path.join(root, 'packages', 'components-js', 'projects', 'components-wrapper');
const pkgComponentsJs = path.join(root, 'packages', 'components-js');
const frameworks = ['angular', 'react', 'vue'];
const basePackages = ['components-angular', 'components-react', 'components-vue'];
const jsBase = ['components-js', 'crawler'];

// 1. Update components
run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, pkgComponents);
// Update CHANGELOG.md
const changelog = path.join(pkgComponents, 'CHANGELOG.md');
let changelogText = fs.readFileSync(changelog, 'utf-8');
changelogText = changelogText.replace(
  /^## \[Unreleased\]/m,
  `## [Unreleased]\n\n### [${NEW_VERSION}] - ${new Date().toISOString().split('T')[0]}`
);
fs.writeFileSync(changelog, changelogText);
console.log(chalk.yellow('Updated CHANGELOG.md in components'));

// 2. Update components-js wrapper
run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, pkgComponentsJsWrapper);

// 3. Update "components" dep in components-js package.json
const pkgJsJson = path.join(pkgComponentsJs, 'package.json');
let pkgJsText = fs.readFileSync(pkgJsJson, 'utf-8');
pkgJsText = pkgJsText.replace(/("@porsche-design-system\/components": )(".*")/, `$1"${NEW_VERSION}"`);
fs.writeFileSync(pkgJsJson, pkgJsText);
console.log(chalk.yellow('Updated components dep in components-js/package.json'));

// 4. Framework wrappers
// biome-ignore lint/complexity/noForEach: <explanation>
frameworks.forEach((framework) => {
  const wrapperDir = path.join(root, 'packages', `components-${framework}`, 'projects', `${framework}-wrapper`);
  run(`yarn version --no-git-tag-version --new-version "${NEW_VERSION}"`, wrapperDir);
  const pkgJson = path.join(wrapperDir, 'package.json');
  let text = fs.readFileSync(pkgJson, 'utf-8');
  text = text.replace(/("@porsche-design-system\/components-js": )(".*")/, `$1"${NEW_VERSION}"`);
  fs.writeFileSync(pkgJson, text);
  console.log(chalk.yellow(`Updated components-js dep in ${framework}-wrapper package.json`));
});

// 5. UXPin wrapper
const uxpinDir = path.join(root, 'packages', 'components-react', 'projects', 'uxpin-wrapper');
const uxpinPkg = path.join(uxpinDir, 'package.json');
let uxpinText = fs.readFileSync(uxpinPkg, 'utf-8');
uxpinText = uxpinText.replace(/("@porsche-design-system\/components-js": )(".*")/, `$1"${NEW_VERSION}"`);
fs.writeFileSync(uxpinPkg, uxpinText);
console.log(chalk.yellow('Updated components-js dep in uxpin-wrapper'));

// 6. Nextjs and Remix and Storefront updates
const sites = [
  ['nextjs', path.join(root, 'packages', 'components-react', 'projects', 'nextjs')],
  ['remix', path.join(root, 'packages', 'components-react', 'projects', 'remix')],
  ['storefront', path.join(root, 'packages', 'storefront')],
];
// biome-ignore lint/complexity/noForEach: <explanation>
sites.forEach(([name, dir]) => {
  const pkgJson = path.join(dir, 'package.json');
  let txt = fs.readFileSync(pkgJson, 'utf-8');
  txt = txt.replace(/("@porsche-design-system\/components-react": )(".*")/, `$1"${NEW_VERSION}"`);
  fs.writeFileSync(pkgJson, txt);
  console.log(chalk.yellow(`Updated components-react dep in ${name}`));
});

// 7. Base project wrappers
// biome-ignore lint/complexity/noForEach: <explanation>
basePackages.forEach((pkgName) => {
  const dir = path.join(root, 'packages', pkgName);
  const pkgJson = path.join(dir, 'package.json');
  let txt = fs.readFileSync(pkgJson, 'utf-8');
  txt = txt.replace(new RegExp(`("@porsche-design-system\/${pkgName}": )(".*")`), `$1"${NEW_VERSION}"`);
  fs.writeFileSync(pkgJson, txt);
  console.log(chalk.yellow(`Updated ${pkgName} version`));
});

// 8. JS base projects
// biome-ignore lint/complexity/noForEach: <explanation>
jsBase.forEach((pkgName) => {
  const dir = path.join(root, 'packages', pkgName);
  const pkgJson = path.join(dir, 'package.json');
  let txt = fs.readFileSync(pkgJson, 'utf-8');
  txt = txt.replace(/("@porsche-design-system\/components-js": )(".*")/, `$1"${NEW_VERSION}"`);
  fs.writeFileSync(pkgJson, txt);
  console.log(chalk.yellow(`Updated components-js in ${pkgName}`));
});

console.log(chalk.green('All version updates complete.'));
