import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PAGE_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../../src/app/(main)/agent-skill/page.mdx'
);

describe('agent-skill docs page', () => {
  const page = fs.readFileSync(PAGE_PATH, 'utf8');
  const FRAMEWORKS = ['js', 'angular', 'react', 'vue'];

  it('documents every framework package and skill name', () => {
    for (const framework of FRAMEWORKS) {
      expect(page).toContain(`@porsche-design-system/components-${framework}`);
      expect(page).toContain(`porsche-design-system-components-${framework}`);
    }
  });

  it('documents the repository location for each supported integration', () => {
    expect(page).toContain('.claude/skills/<skill-name>');
    expect(page).toContain('.github/skills/<skill-name>');
    expect(page).toContain('.agents/skills/<skill-name>');
  });

  it('documents the bundled binary for Claude Code, GitHub Copilot and Codex', () => {
    const command = 'npx pds-skill --package @porsche-design-system/components-react --location';
    expect(page).toContain(`${command} .claude/skills`);
    expect(page).toContain(`${command} .github/skills`);
    expect(page).toContain(`${command} .agents/skills`);
    expect(page).not.toContain('npx --package=');
  });

  it('documents local execution for pnpm, Yarn and Bun', () => {
    const args = 'pds-skill --package @porsche-design-system/components-react --location .github/skills';
    expect(page).toContain(`pnpm exec ${args}`);
    expect(page).toContain(`yarn ${args}`);
    expect(page).toContain(`bunx --no-install ${args}`);
  });

  it('explains the package symlink model and manual installation', () => {
    expect(page).toContain('skill-in-package');
    expect(page).toContain('version mismatch');
    expect(page).toContain('automatically updates the skill');
    expect(page).toContain('ln -s');
    expect(page).toContain('node_modules/.bin');
    expect(page).toContain('We recommend naming the destination folder after the skill');
  });

  it('documents Windows and Yarn Plug-n-Play behavior', () => {
    expect(page).toContain('creates a directory junction automatically');
    expect(page).toContain('mklink /J');
    expect(page).not.toContain('mklink /D');
    expect(page).toContain('nodeLinker: node-modules');
  });

  it('documents automatic and explicit invocation for each integration', () => {
    expect(page).toContain('/porsche-design-system-components-react');
    expect(page).toContain('$porsche-design-system-components-react');
    expect(page).toContain('/skills reload');
    expect(page).toContain('/skills list');
  });
});
