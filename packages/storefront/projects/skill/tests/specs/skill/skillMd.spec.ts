import { describe, expect, it } from 'vitest';
import type { ComponentRosterEntry } from '@skill/components/reference';
import { renderComponentsSection } from '@skill/components/section';
import { renderStylesheetsSection, renderStylingSection, renderTokensSection } from '@skill/packageSkills';
import { ACTIVATION_DESCRIPTION, buildSkillMd as renderSkillMd, skillName } from '@skill/skillMd';
import { FRAMEWORKS, type Framework } from '@skill/support/skillTree';

/** Compose the full SKILL.md from the real domain section renderers, as the generator does. */
const buildSkillMd = (framework: Framework, roster: readonly ComponentRosterEntry[] = []): string =>
  renderSkillMd(framework, {
    components: renderComponentsSection(framework, roster),
    stylesheets: renderStylesheetsSection(framework),
    tokens: renderTokensSection(),
    styling: renderStylingSection(),
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
    expect(markdown).toContain(
      '| `p-button` | The button component. | [p-button.md](references/components/p-button/p-button.md) |'
    );
    expect(markdown).toContain('2 components');
    // Components is the first section, before styling.
    expect(markdown.indexOf('## Components')).toBeLessThan(markdown.indexOf('## Styling'));
  });

  it('states where component examples live in the Components section', () => {
    const markdown = buildSkillMd('react', [{ tag: 'p-button', summary: 'x' }]);
    expect(markdown).toContain('references/components/<tag>/examples/');
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
