#!/usr/bin/env node
'use strict';

// Links this package's bundled Claude Code skill into the consumer project as
// `.claude/skills/porsche-design-system-docs`. The skill dir is resolved relative to this
// file's own location (__dirname), so a framework wrapper links its OWN skill and never
// falls through to the always-installed `js` package.
//
// This file is kept byte-identical across all four wrapper packages; a producer spec enforces
// the sync. When editing, copy the change to every copy.

const fs = require('fs');
const path = require('path');

const SKILL_LINK_NAME = 'porsche-design-system-docs';

const main = () => {
  const skillDir = path.resolve(__dirname, '..', 'skill');

  // Silent no-op when the installed version ships no skill (older releases).
  if (!fs.existsSync(skillDir)) {
    return;
  }

  const skillsDir = path.resolve(process.cwd(), '.claude', 'skills');
  const linkPath = path.join(skillsDir, SKILL_LINK_NAME);

  try {
    fs.mkdirSync(skillsDir, { recursive: true });
  } catch (error) {
    // A parent path (e.g. `.claude`) exists as a file, not a directory.
    if (error.code === 'ENOTDIR') {
      console.error(
        `Cannot create ${path.join('.claude', 'skills')}: a parent path exists as a file, not a directory. ` +
          `Remove it and re-run.`
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
        `Refusing to replace ${path.join('.claude', 'skills', SKILL_LINK_NAME)}: it exists and is not a symlink. ` +
          `Remove it manually and re-run.`
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

  console.log(`Linked Porsche Design System skill: ${path.join('.claude', 'skills', SKILL_LINK_NAME)} -> ${skillDir}`);
  console.log('Re-run this command after upgrading the package to refresh the link.');
};

main();
