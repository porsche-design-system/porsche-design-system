import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const PAGE_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../../src/app/(main)/developing/claude-code-skill/page.mdx'
);

describe('claude-code-skill docs page', () => {
  const page = fs.readFileSync(PAGE_PATH, 'utf8');
  const FRAMEWORKS = ['js', 'angular', 'react', 'vue'];

  it('documents the complete npx command for every wrapper', () => {
    for (const framework of FRAMEWORKS) {
      const packageName = `@porsche-design-system/components-${framework}`;
      expect(page).toContain(`npx --package=${packageName} pds-skill ${packageName} .claude/skills`);
    }
  });

  it('documents local execution for pnpm, Yarn and Bun', () => {
    const args = 'pds-skill @porsche-design-system/components-react .claude/skills';
    expect(page).toContain(`pnpm exec ${args}`);
    expect(page).toContain(`yarn ${args}`);
    expect(page).toContain(`bunx --no-install ${args}`);
  });

  it('documents the required destination and automatic Windows junction behavior', () => {
    expect(page).toContain('pds-skill <package> <dir> [--root]');
    expect(page).not.toContain('Defaults to `.claude/skills`');
    expect(page).toContain('creates a directory junction automatically');
    expect(page).toContain('mklink /J');
    expect(page).not.toContain('mklink /D');
  });
});
