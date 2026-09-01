import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { FRAMEWORKS, isFramework, SkillTree } from '@skills/shared/skillTree';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

/**
 * Deliberately not any real skill's layout: `SkillTree` takes the layout as input, so this spec
 * asserts it creates whatever it is given (nesting included) rather than one skill's directories.
 * Copying knowledge's layout here would read as production data and couple this spec to a skill.
 */
const LAYOUT = ['references/alpha', 'nested/beta/gamma'] as const;

describe('SkillTree', () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-tree-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('lays out the given directory layout on reset', () => {
    const tree = new SkillTree(root, 'js', LAYOUT);
    tree.reset();

    for (const dir of LAYOUT) {
      expect(fs.existsSync(tree.resolve(dir)), `${dir} should exist`).toBe(true);
    }
  });

  it('creates only the root when no layout is given', () => {
    const tree = new SkillTree(root, 'js');
    tree.reset();

    expect(fs.existsSync(root)).toBe(true);
    expect(fs.readdirSync(root)).toEqual([]);
  });

  it('discards a pre-existing tree on reset', () => {
    const tree = new SkillTree(root, 'js', LAYOUT);
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
  it.each(FRAMEWORKS)('accepts %s', (framework) => {
    expect(isFramework(framework)).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isFramework('svelte')).toBe(false);
    expect(isFramework('')).toBe(false);
  });
});
