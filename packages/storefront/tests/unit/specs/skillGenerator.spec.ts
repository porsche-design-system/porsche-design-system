import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ACTIVATION_DESCRIPTION, buildSkillMd, skillName } from '@/lib/skill/skillMd';
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

  it('emits frontmatter with the per-package name and the tuned activation description', () => {
    const frontmatter = parseFrontmatter(buildSkillMd('react'));

    expect(frontmatter.name).toBe(skillName('react'));
    expect(frontmatter.name).toBe('porsche-design-system-components-react');
    expect(frontmatter.description).toBe(ACTIVATION_DESCRIPTION);
  });

  it('names each tree after its own wrapper package', () => {
    for (const framework of ['js', 'angular', 'react', 'vue'] as const) {
      expect(parseFrontmatter(buildSkillMd(framework)).name).toBe(`porsche-design-system-components-${framework}`);
    }
  });

  it('keeps the activation description a single frontmatter line free of parse-breaking sequences', () => {
    expect(ACTIVATION_DESCRIPTION).not.toContain('\n');
    expect(ACTIVATION_DESCRIPTION).not.toContain(': ');
  });

  it('renders the topical sections in order and drops the removed Getting started / Reference map / Core rules / Partials / Migration', () => {
    const markdown = buildSkillMd('react', [{ tag: 'p-button', summary: 'x' }]);

    const order = ['## Components', '## Stylesheets', '## Tokens', '## Styling'];
    const indices = order.map((heading) => markdown.indexOf(heading));
    for (const index of indices) {
      expect(index).toBeGreaterThan(-1);
    }
    expect(indices).toEqual([...indices].sort((a, b) => a - b));

    expect(markdown).not.toContain('## Getting started');
    expect(markdown).not.toContain('## Reference map');
    expect(markdown).not.toContain('## Core rules');
    expect(markdown).not.toContain('## Partials');
    expect(markdown).not.toContain('## Upgrades & migration');
    expect(markdown).not.toContain('references/partials.md');
    expect(markdown).not.toContain('references/migration/');
  });

  it('links every shipped reference from exactly one topical section', () => {
    const markdown = buildSkillMd('vue', [{ tag: 'p-button', summary: 'x' }]);

    // Split into `## ` sections; a reference may be linked more than once within a section (the Styling
    // note links tailwindcss.md alongside the table) but must never span two different sections.
    const sections = markdown.split(/^## /m);
    const references = [
      'references/stylesheets.md',
      'references/tokens.md',
      'references/styles/tailwindcss.md',
      'references/styles/scss.md',
      'references/styles/vanilla-extract.md',
      'references/styles/emotion.md',
    ];
    for (const reference of references) {
      const sectionsWith = sections.filter((section) => section.includes(reference)).length;
      expect(sectionsWith, `${reference} should be linked from exactly one section`).toBe(1);
    }
  });

  it('inlines the component roster with skill-root-relative reference links', () => {
    const markdown = buildSkillMd('react', [
      { tag: 'p-button', summary: 'The button component.' },
      { tag: 'p-accordion', summary: 'Reveals or hides sections.' },
    ]);

    expect(markdown).toContain('## Components');
    expect(markdown).toContain('| Component | Summary | Reference |');
    expect(markdown).toContain('| `p-button` | The button component. | [p-button.md](references/components/p-button/p-button.md) |');
    expect(markdown).toContain('2 components');
    // Components is the first section, before styling.
    expect(markdown.indexOf('## Components')).toBeLessThan(markdown.indexOf('## Styling'));
  });

  it('states where component examples live in the Components section', () => {
    const markdown = buildSkillMd('react', [{ tag: 'p-button', summary: 'x' }]);
    expect(markdown).toContain('references/components/<tag>/examples/');
  });

  it('falls back to a placeholder when no roster is supplied', () => {
    const markdown = buildSkillMd('js');

    expect(markdown).toContain('## Components');
    expect(markdown).toContain('populated by the content generators');
  });

  it('escapes pipe characters in roster summaries', () => {
    const markdown = buildSkillMd('vue', [{ tag: 'p-x', summary: 'a | b' }]);

    expect(markdown).toContain('a \\| b');
  });

  it('dissolves the former core rules into topical sections', () => {
    const markdown = buildSkillMd('angular', [{ tag: 'p-button', summary: 'x' }]);

    // component-meta authority + accessibility matrix → Components; version-exactness + path convention
    // + prefer-PDS → intro; theming → Stylesheets.
    expect(markdown).toContain('`component-meta` is authoritative');
    expect(markdown).toContain('accessibility test matrix');
    expect(markdown).toContain('never mix guidance across versions');
    expect(markdown).toContain('relative to this skill root');
    expect(markdown).toContain('Prefer Porsche Design System components');
    expect(markdown).toContain('There is **no** `theme` prop');
  });

  it('points at the real source alongside the skill root in the intro', () => {
    const js = buildSkillMd('js');
    expect(js).toContain('ships inside the installed package');
    expect(js).toContain('`../meta`');
    expect(js).toContain('`../scss`');
    expect(js).toContain('`../tokens`');
    expect(js).toContain('`../tailwindcss/index.css`');
  });

  it('links raw component-meta to the local sibling for js', () => {
    expect(buildSkillMd('js')).toContain('`../meta`');
  });

  it('links raw component-meta to the js peer subpath for framework wrappers', () => {
    for (const framework of ['angular', 'react', 'vue'] satisfies Framework[]) {
      const markdown = buildSkillMd(framework);
      expect(markdown).toContain('`@porsche-design-system/components-js/meta`');
      expect(markdown).not.toContain('`../meta`');
    }
  });

  it('explains the js-peer subpath for framework wrappers only', () => {
    for (const framework of ['angular', 'react', 'vue'] satisfies Framework[]) {
      expect(buildSkillMd(framework), framework).toContain('re-export shims of the same-version');
    }
    expect(buildSkillMd('js')).not.toContain('re-export shims of the same-version');
  });

  it('carries the framework-syntax note in the Components section', () => {
    for (const framework of FRAMEWORKS) {
      const markdown = buildSkillMd(framework, [{ tag: 'p-button', summary: 'x' }]);
      expect(markdown, framework).toContain('**Framework syntax');
      expect(markdown.indexOf('**Framework syntax'), framework).toBeGreaterThan(markdown.indexOf('## Components'));
      expect(markdown.indexOf('**Framework syntax'), framework).toBeLessThan(markdown.indexOf('## Stylesheets'));
    }
  });

  const withRoster = (framework: Framework): string => buildSkillMd(framework, [{ tag: 'p-button', summary: 'x' }]);

  it('documents the PascalCase tag→component and event-name mapping for React and Vue', () => {
    for (const framework of ['react', 'vue'] satisfies Framework[]) {
      expect(withRoster(framework), framework).toContain('`p-button` → `<PButton>`');
    }
    expect(withRoster('react')).toContain('onDismiss');
    expect(withRoster('vue')).toContain('@dismiss');
  });

  it('documents custom-element tag usage for Angular and vanilla JS', () => {
    const angular = withRoster('angular');
    expect(angular).toContain('(dismiss)');
    expect(angular).not.toContain('`p-button` → `<PButton>`');

    const js = withRoster('js');
    expect(js).toContain("addEventListener('dismiss'");
    expect(js).not.toContain('`p-button` → `<PButton>`');
  });

  it('no longer carries the install/init setup snippets or a FOUC guard', () => {
    for (const framework of FRAMEWORKS) {
      const markdown = buildSkillMd(framework, [{ tag: 'p-button', summary: 'x' }]);
      expect(markdown, framework).not.toContain(':not(:defined)');
      expect(markdown, framework).not.toContain('createRoot');
    }
  });
});
