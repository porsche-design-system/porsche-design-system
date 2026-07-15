#!/usr/bin/env node

// Links a locally installed Porsche Design System wrapper skill into the consumer project. Every
// wrapper exposes this same bin through the local node_modules/.bin directory; --package selects
// which installed wrapper supplies the skill, independently of which wrapper supplies the bin.
//
// --location is the destination parent directory for the link (e.g. `.claude/skills`, `.agents`,
// `.github/skills`). Relative locations resolve from the cwd.
//
//   pds-skill --package <package> --location <dir>
//
// This is the canonical source copied into all four wrapper package distributions by their
// `build:subPackages:skill:bin` steps.

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');

const SUPPORTED_PACKAGES = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-angular',
  '@porsche-design-system/components-react',
  '@porsche-design-system/components-vue',
];
const USAGE = [
  'Usage: pds-skill --package <package> --location <dir>',
  '',
  'Required options:',
  '  -p, --package <package>  locally installed Porsche Design System wrapper',
  '  -l, --location <dir>     destination parent directory for the skill link',
  '',
  'Options:',
  '  -h, --help               print this usage',
  '',
  `Supported packages: ${SUPPORTED_PACKAGES.join(', ')}`,
].join('\n');

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const isMissingPathError = (error) => error.code === 'ENOENT' || error.code === 'ENOTDIR';
const isPermissionError = (error) => error.code === 'EACCES' || error.code === 'EPERM';

const parseOptions = (args) => {
  try {
    return parseArgs({
      args,
      options: {
        package: { type: 'string', short: 'p' },
        location: { type: 'string', short: 'l' },
        help: { type: 'boolean', short: 'h' },
      },
      strict: true,
      allowPositionals: false,
    }).values;
  } catch (error) {
    fail(`${error.message}\n${USAGE}`);
  }
};

const linkNameFromPackage = (packageName) => packageName.slice(1).replace('/', '-');

const readPackageManifest = (packageJsonPath) => {
  let content;
  try {
    content = fs.readFileSync(packageJsonPath, 'utf8');
  } catch (error) {
    if (isMissingPathError(error)) {
      return undefined;
    }
    if (isPermissionError(error)) {
      fail(`Cannot read ${packageJsonPath}: permission denied. Check the package permissions and re-run.`);
    }
    throw error;
  }

  try {
    return JSON.parse(content);
  } catch (error) {
    if (error instanceof SyntaxError) {
      fail(`Cannot read ${packageJsonPath}: invalid JSON. Reinstall the package and re-run.`);
    }
    throw error;
  }
};

const validateSkillEntry = (skillMdPath) => {
  let stats;
  try {
    stats = fs.statSync(skillMdPath);
  } catch (error) {
    if (isMissingPathError(error)) {
      fail(`The installed package does not ship a skill at ${skillMdPath}. Upgrade the package and re-run.`);
    }
    if (isPermissionError(error)) {
      fail(`Cannot read ${skillMdPath}: permission denied. Check the package permissions and re-run.`);
    }
    throw error;
  }

  if (!stats.isFile()) {
    fail(`${skillMdPath} is not a file. Reinstall the package and re-run.`);
  }

  try {
    const descriptor = fs.openSync(skillMdPath, 'r');
    fs.closeSync(descriptor);
  } catch (error) {
    if (isPermissionError(error)) {
      fail(`Cannot read ${skillMdPath}: permission denied. Check the package permissions and re-run.`);
    }
    throw error;
  }
};

const skillDirFromPackage = (packageName, cwd) => {
  if (!SUPPORTED_PACKAGES.includes(packageName)) {
    fail(`Unsupported package: ${packageName}\n${USAGE}`);
  }

  let dir = cwd;
  for (;;) {
    const packageDir = path.join(dir, 'node_modules', ...packageName.split('/'));
    const packageJsonPath = path.join(packageDir, 'package.json');
    const pkg = readPackageManifest(packageJsonPath);
    if (pkg !== undefined) {
      const installedName = pkg && typeof pkg === 'object' ? pkg.name : undefined;
      if (installedName !== packageName) {
        fail(`Expected ${packageName} at ${packageDir}, but found ${installedName || 'a package without a name'}.`);
      }
      const skillDir = path.join(packageDir, 'skill');
      validateSkillEntry(path.join(skillDir, 'SKILL.md'));
      return skillDir;
    }

    const parent = path.dirname(dir);
    if (parent === dir) {
      fail(`Cannot find ${packageName} from ${cwd}. Install it in this project or workspace and re-run.`);
    }
    dir = parent;
  }
};

const main = () => {
  const options = parseOptions(process.argv.slice(2));
  if (options.help) {
    console.log(USAGE);
    return;
  }
  const missingOptions = [
    !options.package && '--package',
    !options.location && '--location',
  ].filter(Boolean);
  if (missingOptions.length > 0) {
    fail(
      `Missing required option${missingOptions.length > 1 ? 's' : ''}: ${missingOptions.join(' and ')}\n${USAGE}`
    );
  }

  if (process.versions.pnp) {
    fail(
      "Yarn Plug'n'Play is not supported because an operating-system symlink cannot target Yarn's virtual filesystem. Use `nodeLinker: node-modules`."
    );
  }

  const cwd = process.cwd();
  const packageName = options.package;
  const destArg = options.location;
  const skillDir = skillDirFromPackage(packageName, cwd);
  const linkName = linkNameFromPackage(packageName);

  const skillsDir = path.isAbsolute(destArg) ? destArg : path.resolve(cwd, destArg);
  const linkPath = path.join(skillsDir, linkName);

  // Prefer a cwd-relative path in messages; use the absolute path when the link lives outside it.
  const show = (target) => {
    const rel = path.relative(cwd, target);
    return rel && !rel.startsWith('..') && !path.isAbsolute(rel) ? rel : target;
  };

  try {
    fs.mkdirSync(skillsDir, { recursive: true });
  } catch (error) {
    if (error.code === 'ENOTDIR' || error.code === 'EEXIST') {
      fail(`Cannot create ${show(skillsDir)}: a parent path exists as a file, not a directory. Remove it and re-run.`);
    }
    if (isPermissionError(error)) {
      fail(`Cannot create ${show(skillsDir)}: permission denied. Check the destination permissions and re-run.`);
    }
    throw error;
  }

  // Idempotent, but only for the symlink we own: repoint an existing symlink (including a
  // dangling one), and refuse to touch a real directory a user may have hand-maintained here —
  // never recursively delete it.
  let existing = null;
  try {
    existing = fs.lstatSync(linkPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      existing = null;
    } else if (isPermissionError(error)) {
      fail(`Cannot inspect ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
    } else {
      throw error;
    }
  }
  if (existing) {
    if (!existing.isSymbolicLink()) {
      fail(`Refusing to replace ${show(linkPath)}: it exists and is not a symlink. Remove it manually and re-run.`);
    }

    try {
      if (fs.realpathSync(linkPath) === fs.realpathSync(skillDir)) {
        console.log(`Porsche Design System skill already linked: ${show(linkPath)} -> ${skillDir}`);
        return;
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        // The existing link is dangling and can be replaced.
      } else if (isPermissionError(error)) {
        fail(`Cannot inspect ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
      } else {
        throw error;
      }
    }
    try {
      fs.rmSync(linkPath, { force: true });
    } catch (error) {
      if (isPermissionError(error)) {
        fail(`Cannot replace ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
      }
      throw error;
    }
  }

  // Windows has no unprivileged directory symlink; a junction needs no elevation and works with
  // the absolute target we already hold. macOS/Linux use a normal directory symlink.
  const linkType = process.platform === 'win32' ? 'junction' : 'dir';
  try {
    fs.symlinkSync(skillDir, linkPath, linkType);
  } catch (error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      fail(
        `Could not create the skill junction on Windows (EPERM). Check the destination permissions or create it manually:\n  mklink /J "${linkPath}" "${skillDir}"`
      );
    }
    if (isPermissionError(error)) {
      fail(`Cannot create ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
    }
    throw error;
  }

  console.log(`Linked Porsche Design System skill: ${show(linkPath)} -> ${skillDir}`);
};

main();
