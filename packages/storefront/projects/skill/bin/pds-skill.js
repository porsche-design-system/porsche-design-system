#!/usr/bin/env node

// Links locally installed Porsche Design System wrapper skills into the consumer project.
// Every wrapper package exposes this same bin through the local node_modules/.bin directory;
// --package selects which installed wrapper supplies the skills, independently of which
// wrapper supplies the bin.
//
// --location is the destination parent directory for the skill links (e.g. `.claude/skills`,
// `.agents`, `.github/skills`). Relative locations resolve from the cwd.
//
// --skill may be repeated to install only named skills. Omit it to install all discovered skills.
//
//   pds-skill --package <package> --location <dir> [--skill <name>...]
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
  'Usage: pds-skill --package <package> --location <dir> [--skill <name>...]',
  '',
  'Required options:',
  '  -p, --package <package>  locally installed Porsche Design System wrapper',
  '  -l, --location <dir>     destination parent directory for the skill links',
  '',
  'Options:',
  '  -s, --skill <name>       install only the named skill (repeatable); omit to install all',
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
        skill: { type: 'string', short: 's', multiple: true },
        help: { type: 'boolean', short: 'h' },
      },
      strict: true,
      allowPositionals: false,
    }).values;
  } catch (error) {
    fail(`${error.message}\n${USAGE}`);
  }
};

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

/** Parse the frontmatter `name:` value from SKILL.md content. Returns null if not found. */
const parseFrontmatterName = (content) => {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) {
    return null;
  }
  const nameMatch = fmMatch[1].match(/^name:\s*(\S+)/m);
  return nameMatch ? nameMatch[1] : null;
};

/**
 * Validate that the SKILL.md at skillMdPath is a readable regular file with a frontmatter name
 * matching expectedName. Calls fail() on any violation.
 */
const validateSkillMd = (skillMdPath, expectedName) => {
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

  let content;
  try {
    content = fs.readFileSync(skillMdPath, 'utf8');
  } catch (error) {
    if (isPermissionError(error)) {
      fail(`Cannot read ${skillMdPath}: permission denied. Check the package permissions and re-run.`);
    }
    throw error;
  }

  const name = parseFrontmatterName(content);
  if (name !== expectedName) {
    fail(
      `${skillMdPath} has frontmatter name "${name ?? '(none)'}" but its directory is "${expectedName}". Reinstall the package and re-run.`
    );
  }
};

/** Preflight the destination link path. Fails if something other than a symlink (or nothing) exists there. */
const preflightDestLink = (linkPath, show) => {
  let existing;
  try {
    existing = fs.lstatSync(linkPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return;
    }
    if (isPermissionError(error)) {
      fail(`Cannot inspect ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
    }
    throw error;
  }
  if (!existing.isSymbolicLink()) {
    fail(`Refusing to replace ${show(linkPath)}: it exists and is not a symlink. Remove it manually and re-run.`);
  }
};

/** Resolve the installed package directory by walking up from cwd. Fails if not found. */
const resolvePackageDir = (packageName, cwd) => {
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
      return packageDir;
    }

    const parent = path.dirname(dir);
    if (parent === dir) {
      fail(`Cannot find ${packageName} from ${cwd}. Install it in this project or workspace and re-run.`);
    }
    dir = parent;
  }
};

/** Discover sorted child directory names under skillsDir. Returns empty array if the dir is absent. */
const discoverSkillNames = (skillsDir) => {
  let entries;
  try {
    entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  } catch (error) {
    if (isMissingPathError(error)) {
      return [];
    }
    if (isPermissionError(error)) {
      fail(`Cannot read ${skillsDir}: permission denied. Check the package permissions and re-run.`);
    }
    throw error;
  }
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
};

const main = () => {
  const options = parseOptions(process.argv.slice(2));
  if (options.help) {
    console.log(USAGE);
    return;
  }

  const missingOptions = [!options.package && '--package', !options.location && '--location'].filter(Boolean);
  if (missingOptions.length > 0) {
    fail(`Missing required option${missingOptions.length > 1 ? 's' : ''}: ${missingOptions.join(' and ')}\n${USAGE}`);
  }

  if (process.versions.pnp) {
    fail(
      "Yarn Plug'n'Play is not supported because an operating-system symlink cannot target Yarn's virtual filesystem. Use `nodeLinker: node-modules`."
    );
  }

  const cwd = process.cwd();
  const packageName = options.package;
  const destArg = options.location;
  const requestedSkills = options.skill ?? [];

  const packageDir = resolvePackageDir(packageName, cwd);
  const skillsDir = path.join(packageDir, 'skills');
  const discovered = discoverSkillNames(skillsDir);

  if (discovered.length === 0) {
    fail(`The installed package does not ship any skills at ${skillsDir}. Upgrade the package and re-run.`);
  }

  // Validate --skill filters; unknown names fail clearly.
  if (requestedSkills.length > 0) {
    const unknown = requestedSkills.filter((s) => !discovered.includes(s));
    if (unknown.length > 0) {
      fail(
        `Unknown skill${unknown.length > 1 ? 's' : ''}: ${unknown.join(', ')}. ` +
          `Available: ${[...discovered].sort().join(', ')}.`
      );
    }
  }

  // Deterministic sorted selection.
  const selected =
    requestedSkills.length > 0
      ? [...new Set(requestedSkills)].filter((s) => discovered.includes(s)).sort()
      : discovered;

  const destDir = path.isAbsolute(destArg) ? destArg : path.resolve(cwd, destArg);

  // Prefer a cwd-relative path in messages; fall back to absolute when outside.
  const show = (target) => {
    const rel = path.relative(cwd, target);
    return rel && !rel.startsWith('..') && !path.isAbsolute(rel) ? rel : target;
  };

  // Preflight every selected skill tree before touching the destination at all.
  for (const skillName of selected) {
    validateSkillMd(path.join(skillsDir, skillName, 'SKILL.md'), skillName);
  }

  try {
    fs.mkdirSync(destDir, { recursive: true });
  } catch (error) {
    if (error.code === 'ENOTDIR' || error.code === 'EEXIST') {
      fail(`Cannot create ${show(destDir)}: a parent path exists as a file, not a directory. Remove it and re-run.`);
    }
    if (isPermissionError(error)) {
      fail(`Cannot create ${show(destDir)}: permission denied. Check the destination permissions and re-run.`);
    }
    throw error;
  }

  // Preflight all destination links before any mutation.
  for (const skillName of selected) {
    preflightDestLink(path.join(destDir, skillName), show);
  }

  // All preflights passed — perform link operations.
  const linkType = process.platform === 'win32' ? 'junction' : 'dir';
  for (const skillName of selected) {
    const skillDir = path.join(skillsDir, skillName);
    const linkPath = path.join(destDir, skillName);

    // Idempotent: repoint an existing symlink (including a dangling one), but never touch a
    // real directory a user may have hand-maintained — the preflight above already rejected that.
    let existingLink = null;
    try {
      existingLink = fs.lstatSync(linkPath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    if (existingLink?.isSymbolicLink()) {
      try {
        if (fs.realpathSync(linkPath) === fs.realpathSync(skillDir)) {
          console.log(`Porsche Design System skill already linked: ${show(linkPath)} -> ${skillDir}`);
          continue;
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          if (isPermissionError(error)) {
            fail(`Cannot inspect ${show(linkPath)}: permission denied. Check the destination permissions and re-run.`);
          }
          throw error;
        }
        // Dangling symlink — fall through to replace it.
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
  }
};

main();
