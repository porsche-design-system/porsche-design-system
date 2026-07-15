#!/usr/bin/env node

// Links a locally installed Porsche Design System wrapper skill into the consumer project. The
// wrapper package is an explicit argument and is resolved from the cwd, so the correct skill is
// selected even when multiple wrappers expose this same bin or a package runner executes a cached
// copy of it.
//
// The destination parent dir for the link is a required argument (e.g. `.claude/skills`, `.agents`,
// `.github/skills`). With `--root`, a relative destination resolves against the project root
// (nearest `.git` ancestor) instead of the cwd — useful in a monorepo where the command runs in a
// subpackage.
//
//   pds-skill <package> <dir> [--root]
//     package    locally installed @porsche-design-system/components-{js|angular|react|vue}
//     dir        destination parent directory for the skill link
//     --root     resolve a relative dir against the project root (nearest .git) instead of the cwd
//     -h,--help  print this usage
//
// This is the canonical source copied into all four wrapper package distributions by their
// `build:subPackages:skill:bin` steps.

const fs = require('node:fs');
const path = require('node:path');

const SUPPORTED_PACKAGES = [
  '@porsche-design-system/components-js',
  '@porsche-design-system/components-angular',
  '@porsche-design-system/components-react',
  '@porsche-design-system/components-vue',
];
const USAGE = [
  'Usage: pds-skill <package> <dir> [--root]',
  '',
  `Supported packages: ${SUPPORTED_PACKAGES.join(', ')}`,
  'Both package and destination dir are required.',
  '--root resolves a relative dir against the nearest .git.',
].join('\n');
const SKILL_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const linkNameFromSkill = (skillDir) => {
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  let content;
  try {
    content = fs.readFileSync(skillMdPath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      fail(`The installed package does not ship a skill at ${skillMdPath}. Upgrade the package and re-run.`);
    }
    throw error;
  }

  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const name = frontmatter?.[1].match(/^name:[ \t]*(.+?)[ \t]*$/m);
  if (!name) {
    fail(`Cannot read the skill name: no \`name\` field in the frontmatter of ${skillMdPath}.`);
  }

  const linkName = name[1];
  if (!SKILL_NAME_PATTERN.test(linkName)) {
    fail(`Cannot use the skill name "${linkName}" from ${skillMdPath}: expected lowercase kebab-case.`);
  }
  return linkName;
};

const skillDirFromPackage = (packageName, cwd) => {
  if (!SUPPORTED_PACKAGES.includes(packageName)) {
    fail(`Unsupported package: ${packageName}\n${USAGE}`);
  }

  let dir = cwd;
  for (;;) {
    const packageDir = path.join(dir, 'node_modules', ...packageName.split('/'));
    const packageJsonPath = path.join(packageDir, 'package.json');
    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (pkg.name !== packageName) {
        fail(`Expected ${packageName} at ${packageDir}, but found ${pkg.name || 'a package without a name'}.`);
      }
      return path.join(packageDir, 'skill');
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
        throw error;
      }
    }

    const parent = path.dirname(dir);
    if (parent === dir) {
      fail(`Cannot find ${packageName} from ${cwd}. Install it in this project or workspace and re-run.`);
    }
    dir = parent;
  }
};

// Walk up from `start` to the nearest ancestor containing a `.git` entry (a dir for a normal repo,
// a file for a worktree/submodule). Returns null when none is found before the filesystem root.
const findProjectRoot = (start) => {
  let dir = start;
  for (;;) {
    if (fs.existsSync(path.join(dir, '.git'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      return null;
    }
    dir = parent;
  }
};

const main = () => {
  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    console.log(USAGE);
    return;
  }
  const useRoot = args.includes('--root');
  const unknownFlags = args.filter((arg) => arg.startsWith('-') && arg !== '--root');
  const positionals = args.filter((arg) => !arg.startsWith('-'));
  if (unknownFlags.length > 0 || positionals.length !== 2) {
    const problem =
      unknownFlags.length > 0
        ? `Unknown option: ${unknownFlags[0]}`
        : positionals.length === 0
          ? 'Missing required arguments: package and dir'
          : positionals.length === 1
            ? 'Missing required argument: dir'
            : 'Too many arguments';
    fail(`${problem}\n${USAGE}`);
  }

  if (process.versions.pnp) {
    fail(
      "Yarn Plug'n'Play is not supported because an operating-system symlink cannot target Yarn's virtual filesystem. Use `nodeLinker: node-modules`."
    );
  }

  const cwd = process.cwd();
  const packageName = positionals[0];
  const destArg = positionals[1];
  const skillDir = skillDirFromPackage(packageName, cwd);
  const linkName = linkNameFromSkill(skillDir);

  let base = cwd;
  if (useRoot && !path.isAbsolute(destArg)) {
    const root = findProjectRoot(cwd);
    if (!root) {
      fail('--root: no project root found (no `.git` in this directory or any parent).');
    }
    base = root;
  }

  const skillsDir = path.isAbsolute(destArg) ? destArg : path.resolve(base, destArg);
  const linkPath = path.join(skillsDir, linkName);

  // Prefer a cwd-relative path in messages; fall back to the absolute path when the link lives
  // outside the cwd (e.g. resolved against the project root from a subpackage).
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
    throw error;
  }

  // Idempotent, but only for the symlink we own: repoint an existing symlink (including a
  // dangling one), and refuse to touch a real directory a user may have hand-maintained here —
  // never recursively delete it.
  let existing = null;
  try {
    existing = fs.lstatSync(linkPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
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
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    fs.rmSync(linkPath, { force: true });
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
    throw error;
  }

  console.log(`Linked Porsche Design System skill: ${show(linkPath)} -> ${skillDir}`);
  console.log('Re-run this command after upgrading the package to refresh the link.');
};

main();
