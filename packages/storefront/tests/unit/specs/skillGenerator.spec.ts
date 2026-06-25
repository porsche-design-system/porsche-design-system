import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PLACEHOLDER_DESCRIPTION, SKELETON_REFERENCE_MAP, SKILL_NAME, buildSkillMd } from '@/lib/skill/skillMd';
import {
  FRAMEWORKS,
  type Framework,
  type ReferenceMapEntry,
  SKILL_DIRECTORY_LAYOUT,
  SkillTree,
  isFramework,
} from '@/lib/skill/skillTree';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('SkillTree', () => {
  let root: string;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-tree-'));
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('lays out the empty directory layout on reset', () => {
    const tree = new SkillTree(root);
    tree.reset();

    for (const dir of SKILL_DIRECTORY_LAYOUT) {
      expect(fs.existsSync(tree.resolve(dir)), `${dir} should exist`).toBe(true);
    }
  });

  it('discards a pre-existing tree on reset', () => {
    const tree = new SkillTree(root);
    tree.reset();
    tree.write('references/components/stale.md', 'stale');

    tree.reset();

    expect(fs.existsSync(tree.resolve('references/components/stale.md'))).toBe(false);
  });

  it('writes files creating parent dirs and a trailing newline', () => {
    const tree = new SkillTree(root);
    tree.reset();

    const relativePath = tree.write('references/components/p-button/examples/Default.tsx', 'export const x = 1;');

    expect(relativePath).toBe('references/components/p-button/examples/Default.tsx');
    expect(fs.readFileSync(tree.resolve(relativePath), 'utf-8')).toBe('export const x = 1;\n');
  });

  it('does not double up trailing newlines', () => {
    const tree = new SkillTree(root);
    tree.reset();
    tree.write('a.md', 'already\n');

    expect(fs.readFileSync(tree.resolve('a.md'), 'utf-8')).toBe('already\n');
  });

  it('writes references under references/ with POSIX separators', () => {
    const tree = new SkillTree(root);
    tree.reset();

    const relativePath = tree.writeReference('tokens.md', '# Tokens');

    expect(relativePath).toBe('references/tokens.md');
    expect(fs.existsSync(tree.resolve('references/tokens.md'))).toBe(true);
  });

  it('accumulates registered reference-map rows in order', () => {
    const tree = new SkillTree(root);
    const entries: ReferenceMapEntry[] = [
      { path: 'references/tokens.md', useWhen: 'a' },
      { path: 'references/partials.md', useWhen: 'b' },
    ];
    for (const entry of entries) {
      tree.registerReference(entry);
    }

    expect(tree.referenceMap).toEqual(entries);
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

describe('buildSkillMd', () => {
  const parseFrontmatter = (markdown: string): Record<string, string> => {
    const match = markdown.match(/^---\n([\s\S]*?)\n---/);
    expect(match, 'SKILL.md must start with a frontmatter block').not.toBeNull();
    return Object.fromEntries(
      (match as RegExpMatchArray)[1].split('\n').map((line) => {
        const index = line.indexOf(':');
        return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
      })
    );
  };

  it('emits frontmatter with the fixed name and a placeholder description', () => {
    const frontmatter = parseFrontmatter(buildSkillMd('react', SKELETON_REFERENCE_MAP));

    expect(frontmatter.name).toBe(SKILL_NAME);
    expect(frontmatter.name).toBe('porsche-design-system-docs');
    expect(frontmatter.description).toBe(PLACEHOLDER_DESCRIPTION);
  });

  it('renders the reference map as a table from the registered rows', () => {
    const markdown = buildSkillMd('js', SKELETON_REFERENCE_MAP);

    expect(markdown).toContain('## Reference map');
    expect(markdown).toContain('| Reference | Use this when |');
    for (const entry of SKELETON_REFERENCE_MAP) {
      expect(markdown).toContain(`\`${entry.path}\``);
    }
  });

  it('falls back to a placeholder when no references are registered', () => {
    const markdown = buildSkillMd('vue', []);

    expect(markdown).toContain('## Reference map');
    expect(markdown).toContain('populated by the content generators');
  });

  it('includes the core always-apply rules', () => {
    const markdown = buildSkillMd('angular', SKELETON_REFERENCE_MAP);

    expect(markdown).toContain('## Core rules');
    expect(markdown).toContain('`component-meta` is authoritative');
    expect(markdown).toContain('version-exact');
    expect(markdown).toContain('relative to this skill root');
  });

  it('links raw component-meta to the local sibling for js', () => {
    expect(buildSkillMd('js', SKELETON_REFERENCE_MAP)).toContain('`../meta`');
  });

  it('links raw component-meta to the js peer subpath for framework wrappers', () => {
    for (const framework of ['angular', 'react', 'vue'] satisfies Framework[]) {
      const markdown = buildSkillMd(framework, SKELETON_REFERENCE_MAP);
      expect(markdown).toContain('`@porsche-design-system/components-js/meta`');
      expect(markdown).not.toContain('`../meta`');
    }
  });
});
