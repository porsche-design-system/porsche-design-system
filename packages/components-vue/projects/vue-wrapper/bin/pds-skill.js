#!/usr/bin/env node
'use strict';

// Links this package's bundled Claude Code skill into the consumer project. The skill dir is
// resolved relative to this file's own location (__dirname), so a framework wrapper links its OWN
// skill and never falls through to the always-installed `js` package. The link name mirrors the
// wrapper's package name (`@porsche-design-system/components-<fw>` -> `porsche-design-system-components-<fw>`),
// read from the sibling package.json, so two installed wrappers never collide on one link.
//
// By default the link is created under `.claude/skills/` in the current working directory. A
// positional argument overrides the destination parent dir (e.g. `.agents`, `.github/skills`), and
// `--root` resolves a relative destination against the project root (nearest `.git` ancestor)
// instead of the cwd — useful in a monorepo where the command runs in a subpackage.
//
//   pds-skill [dir] [--root]
//     dir      destination parent directory for the skill link (default: .claude/skills)
//     --root   resolve a relative dir against the project root (nearest .git) instead of the cwd
//     -h,--help  print this usage
//
// This file is kept byte-identical across all four wrapper packages; a producer spec enforces
// the sync. When editing, copy the change to every copy.

const fs = require('fs');
const path = require('path');

const USAGE = 'Usage: pds-skill [dir] [--root]  (dir defaults to .claude/skills; --root resolves against the nearest .git)';

// The skill link name equals this package's name with the scope stripped and `/` replaced by `-`.
const linkNameFromPackage = () => {
  const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf8'));
  return pkg.name.replace(/^@/, '').replace(/\//g, '-');
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
  const skillDir = path.resolve(__dirname, '..', 'skill');

  // Silent no-op when the installed version ships no skill (older releases). Kept ahead of any
  // argument handling so an upgrade-triggered run on an old version stays a clean no-op.
  if (!fs.existsSync(skillDir)) {
    return;
  }

  const args = process.argv.slice(2);
  if (args.includes('-h') || args.includes('--help')) {
    console.log(USAGE);
    return;
  }
  const useRoot = args.includes('--root');
  const unknownFlags = args.filter((arg) => arg.startsWith('-') && arg !== '--root');
  const positionals = args.filter((arg) => !arg.startsWith('-'));
  if (unknownFlags.length > 0 || positionals.length > 1) {
    console.error(`${unknownFlags.length > 0 ? `Unknown option: ${unknownFlags[0]}` : 'Too many arguments'}\n${USAGE}`);
    process.exit(1);
  }

  const linkName = linkNameFromPackage();
  const destArg = positionals[0] || path.join('.claude', 'skills');

  const cwd = process.cwd();
  let base = cwd;
  if (useRoot && !path.isAbsolute(destArg)) {
    const root = findProjectRoot(cwd);
    if (!root) {
      console.error('--root: no project root found (no `.git` in this directory or any parent).');
      process.exit(1);
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
    // A parent path (e.g. `.claude`) exists as a file, not a directory.
    if (error.code === 'ENOTDIR') {
      console.error(
        `Cannot create ${show(skillsDir)}: a parent path exists as a file, not a directory. Remove it and re-run.`
      );
      process.exit(1);
    }
    throw error;
  }

  // Idempotent, but only for the symlink we own: repoint an existing symlink (including a
  // dangling one), and refuse to touch a real directory a user may have hand-maintained here —
  // never recursively delete it.
  let existing = null;
  try {
    existing = fs.lstatSync(linkPath);
  } catch {
    // nothing at the link path yet
  }
  if (existing) {
    if (!existing.isSymbolicLink()) {
      console.error(
        `Refusing to replace ${show(linkPath)}: it exists and is not a symlink. Remove it manually and re-run.`
      );
      process.exit(1);
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
      console.error(
        `Could not create the skill symlink on Windows (EPERM). Enable Developer Mode or run as ` +
          `administrator, or create the link manually:\n  mklink /J "${linkPath}" "${skillDir}"`
      );
      process.exit(1);
    }
    throw error;
  }

  console.log(`Linked Porsche Design System skill: ${show(linkPath)} -> ${skillDir}`);
  console.log('Re-run this command after upgrading the package to refresh the link.');
};

main();
