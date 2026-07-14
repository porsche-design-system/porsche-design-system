import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { FRAMEWORKS, isFramework, SKILL_DIRECTORY_LAYOUT, SkillTree } from '@skill/support/skillTree';

describe('SkillTree', () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-tree-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('lays out the empty directory layout on reset', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    for (const dir of SKILL_DIRECTORY_LAYOUT) {
      expect(fs.existsSync(tree.resolve(dir)), `${dir} should exist`).toBe(true);
    }
  });

  it('discards a pre-existing tree on reset', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();
    tree.write('references/components/stale.md', 'stale');

    tree.reset();

    expect(fs.existsSync(tree.resolve('references/components/stale.md'))).toBe(false);
  });

  it('writes files creating parent dirs and a trailing newline', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    const relativePath = tree.write('references/components/p-button/examples/Default.tsx', 'export const x = 1;');

    expect(relativePath).toBe('references/components/p-button/examples/Default.tsx');
    expect(fs.readFileSync(tree.resolve(relativePath), 'utf-8')).toBe('export const x = 1;\n');
  });

  it('does not double up trailing newlines', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();
    tree.write('a.md', 'already\n');

    expect(fs.readFileSync(tree.resolve('a.md'), 'utf-8')).toBe('already\n');
  });

  it('writes references under references/ with POSIX separators', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    const relativePath = tree.writeReference('tokens.md', '# Tokens');

    expect(relativePath).toBe('references/tokens.md');
    expect(fs.existsSync(tree.resolve('references/tokens.md'))).toBe(true);
  });
});

describe('isFramework', () => {
  it('accepts the four supported frameworks', () => {
    for (const framework of FRAMEWORKS) {
      expect(isFramework(framework)).toBe(true);
    }
  });

  it('rejects anything else', () => {
    expect(isFramework('svelte')).toBe(false);
    expect(isFramework('')).toBe(false);
  });
});
