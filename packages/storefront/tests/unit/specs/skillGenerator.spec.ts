import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ACTIVATION_DESCRIPTION, SKELETON_REFERENCE_MAP, SKILL_NAME, buildSkillMd } from '@/lib/skill/skillMd';
import { FRAMEWORKS, type Framework, SKILL_DIRECTORY_LAYOUT, SkillTree, isFramework } from '@/lib/skill/skillTree';
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

  it('emits frontmatter with the fixed name and the tuned activation description', () => {
    const frontmatter = parseFrontmatter(buildSkillMd('react', SKELETON_REFERENCE_MAP));

    expect(frontmatter.name).toBe(SKILL_NAME);
    expect(frontmatter.name).toBe('porsche-design-system-docs');
    expect(frontmatter.description).toBe(ACTIVATION_DESCRIPTION);
  });

  it('keeps the activation description a single frontmatter line free of parse-breaking sequences', () => {
    expect(ACTIVATION_DESCRIPTION).not.toContain('\n');
    expect(ACTIVATION_DESCRIPTION).not.toContain(': ');
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

  it('inlines the component roster with skill-root-relative reference links', () => {
    const markdown = buildSkillMd('react', SKELETON_REFERENCE_MAP, [
      { tag: 'p-button', summary: 'The button component.' },
      { tag: 'p-accordion', summary: 'Reveals or hides sections.' },
    ]);

    expect(markdown).toContain('## Components');
    expect(markdown).toContain('| Component | Summary | Reference |');
    expect(markdown).toContain('| `p-button` | The button component. | [p-button.md](references/components/p-button/p-button.md) |');
    expect(markdown).toContain('2 components');
    // The roster precedes the reference map so the available components are seen first.
    expect(markdown.indexOf('## Components')).toBeLessThan(markdown.indexOf('## Reference map'));
  });

  it('omits the components section when no roster is supplied', () => {
    const markdown = buildSkillMd('js', SKELETON_REFERENCE_MAP);

    expect(markdown).not.toContain('## Components');
  });

  it('escapes pipe characters in roster summaries', () => {
    const markdown = buildSkillMd('vue', SKELETON_REFERENCE_MAP, [{ tag: 'p-x', summary: 'a | b' }]);

    expect(markdown).toContain('a \\| b');
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

  it('explains the js-peer subpath for framework wrappers only', () => {
    for (const framework of ['angular', 'react', 'vue'] satisfies Framework[]) {
      expect(buildSkillMd(framework, SKELETON_REFERENCE_MAP), framework).toContain('re-export the same-version');
    }
    expect(buildSkillMd('js', SKELETON_REFERENCE_MAP)).not.toContain('re-export the same-version');
  });

  it('includes a getting-started section for every framework, before the components section', () => {
    for (const framework of FRAMEWORKS) {
      const markdown = buildSkillMd(framework, SKELETON_REFERENCE_MAP, [{ tag: 'p-button', summary: 'x' }]);
      expect(markdown, framework).toContain('## Getting started');
      expect(markdown, framework).toContain(`@porsche-design-system/components-${framework}`);
      expect(markdown.indexOf('## Getting started'), framework).toBeLessThan(markdown.indexOf('## Components'));
    }
  });

  it('documents the PascalCase tag→component and event-name mapping for React and Vue', () => {
    for (const framework of ['react', 'vue'] satisfies Framework[]) {
      const markdown = buildSkillMd(framework, SKELETON_REFERENCE_MAP);
      expect(markdown, framework).toContain('`p-button` → `<PButton>`');
      expect(markdown, framework).toContain('PorscheDesignSystemProvider');
    }
    expect(buildSkillMd('react', SKELETON_REFERENCE_MAP)).toContain('onDismiss');
    expect(buildSkillMd('vue', SKELETON_REFERENCE_MAP)).toContain('@dismiss');
  });

  it('documents custom-element tag usage and setup for Angular and vanilla JS', () => {
    const angular = buildSkillMd('angular', SKELETON_REFERENCE_MAP);
    expect(angular).toContain('PorscheDesignSystemModule');
    expect(angular).toContain('(dismiss)');
    expect(angular).not.toContain('`p-button` → `<PButton>`');

    const js = buildSkillMd('js', SKELETON_REFERENCE_MAP);
    expect(js).toContain("import { load } from '@porsche-design-system/components-js'");
    expect(js).toContain("addEventListener('dismiss'");
    expect(js).not.toContain('`p-button` → `<PButton>`');
  });

  it('includes a FOUC guard in every framework getting-started section', () => {
    for (const framework of FRAMEWORKS) {
      expect(buildSkillMd(framework, SKELETON_REFERENCE_MAP), framework).toContain(':not(:defined)');
    }
  });
});
