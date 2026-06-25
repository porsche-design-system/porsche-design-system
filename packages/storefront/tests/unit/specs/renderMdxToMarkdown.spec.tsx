import type { ComponentType } from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import { renderMdxToMarkdown } from '@/lib/skill/renderMdxToMarkdown';
import { NoiseComponent } from '../data/skill/NoiseComponent';
import { PROSE_FIXTURES, compileMdx } from '../data/skill/proseFixtures';

describe('renderMdxToMarkdown', () => {
  const compiled: Record<string, ComponentType> = {};

  beforeAll(async () => {
    for (const [name, source] of Object.entries(PROSE_FIXTURES)) {
      compiled[name] = await compileMdx(source);
    }
  });

  it('renders representative component prose blocks to non-empty markdown', () => {
    for (const name of ['usage', 'accessibility', 'introduction']) {
      const { markdown, degraded } = renderMdxToMarkdown(compiled[name]);
      expect(degraded, `${name} should not be degraded`).toBe(false);
      expect(markdown.trim().length, `${name} should be non-empty`).toBeGreaterThan(20);
    }
  });

  it('preserves markdown structure (headings, lists, emphasis, inline code, links)', () => {
    const { markdown } = renderMdxToMarkdown(compiled.usage);

    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('### Do:');
    expect(markdown).toContain('- Use accordions to organize');
    expect(markdown).toContain('**related**');
    expect(markdown).toContain('`heading`');
  });

  it('renders links, ordered lists and fenced code blocks', () => {
    const accessibility = renderMdxToMarkdown(compiled.accessibility).markdown;
    expect(accessibility).toContain(
      '[WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)'
    );
    expect(accessibility).toContain('1. Tab moves focus');
    expect(accessibility).toContain('*unique*');

    const introduction = renderMdxToMarkdown(compiled.introduction).markdown;
    expect(introduction).toContain('```html');
    expect(introduction).toContain('<p-accordion heading="Section 1">Panel content</p-accordion>');
  });

  it('substitutes embedded JSX components — no raw JSX or component noise leaks', () => {
    const { markdown } = renderMdxToMarkdown(compiled.usage);

    expect(markdown).not.toContain('<');
    expect(markdown).not.toContain('TableOfContents');
    expect(markdown).not.toContain('ComponentStatus');
    // The heading text survives even though `<ComponentStatus>` was stripped from it.
    expect(markdown).toContain('# Accordion');
  });

  it('drops directly-rendered component noise while keeping surrounding prose', () => {
    const { markdown, degraded } = renderMdxToMarkdown(NoiseComponent);

    expect(degraded).toBe(false);
    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('Use the `variant` prop');
    expect(markdown).toContain('- Keep prose readable.');
    // The <nav> table-of-contents, the <p-tag> web component and the <button> are gone.
    expect(markdown).not.toContain('Toggle');
    expect(markdown).not.toContain('status');
    expect(markdown).not.toContain('#usage');
    expect(markdown).not.toContain('<');
  });

  it('flags prose that renders to nothing meaningful as degraded', () => {
    const { markdown, degraded } = renderMdxToMarkdown(compiled.degraded);

    expect(degraded).toBe(true);
    expect(markdown).toBe('');
  });

  it('flags a component that renders nothing as degraded', () => {
    const Empty: ComponentType = () => null;
    expect(renderMdxToMarkdown(Empty)).toEqual({ markdown: '', degraded: true });
  });
});
