#!/usr/bin/env node
'use strict';

// Links this package's bundled Claude Code skill into the consumer project as
// `.claude/skills/porsche-design-system-docs`. The skill dir is resolved relative to this
// file's own location (__dirname), so a framework wrapper links its OWN skill and never
// falls through to the always-installed `js` package. macOS/Linux only.

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

  fs.mkdirSync(skillsDir, { recursive: true });

  // Idempotent: drop whatever currently occupies the link path before repointing. lstatSync
  // inspects the entry itself (not its target), so it also detects a dangling symlink to repair.
  try {
    fs.lstatSync(linkPath);
    fs.rmSync(linkPath, { recursive: true, force: true });
  } catch {
    // nothing to remove
  }

  fs.symlinkSync(skillDir, linkPath, 'dir');

  console.log(`Linked Porsche Design System skill: ${path.join('.claude', 'skills', SKILL_LINK_NAME)} -> ${skillDir}`);
};

main();
