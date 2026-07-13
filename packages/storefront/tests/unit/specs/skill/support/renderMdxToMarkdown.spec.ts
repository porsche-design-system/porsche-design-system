import { describe, expect, it } from 'vitest';
import { parseMdxToMdast, renderMdxToMarkdown } from '@/lib/skill/support/renderMdxToMarkdown';
import { PROSE_FIXTURES } from '../../../data/skill/proseFixtures';

const render = (source: string, framework: Parameters<typeof renderMdxToMarkdown>[1] = 'js'): string =>
  renderMdxToMarkdown(parseMdxToMdast(source), framework);

describe('renderMdxToMarkdown', () => {
  it('renders representative component prose blocks to non-empty markdown', () => {
    for (const name of ['usage', 'accessibility', 'introduction'] as const) {
      const markdown = render(PROSE_FIXTURES[name]);
      expect(markdown.trim().length, `${name} should be non-empty`).toBeGreaterThan(20);
    }
  });

  it('preserves markdown structure (headings, lists, emphasis, inline code, links)', () => {
    const markdown = render(PROSE_FIXTURES.usage);

    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('### Do:');
    expect(markdown).toContain('- Use accordions to organize');
    expect(markdown).toContain('**related**');
    expect(markdown).toContain('`heading`');
  });

  it('renders links, ordered lists and fenced code blocks', () => {
    const accessibility = render(PROSE_FIXTURES.accessibility);
    expect(accessibility).toContain(
      '[WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)'
    );
    expect(accessibility).toContain('1. Tab moves focus');
    expect(accessibility).toContain('*unique*');

    const introduction = render(PROSE_FIXTURES.introduction);
    expect(introduction).toContain('```html');
    expect(introduction).toContain('<p-accordion heading="Section 1">Panel content</p-accordion>');
  });

  it('surfaces a Notification as a blockquote admonition, not dropped', () => {
    const markdown = render(PROSE_FIXTURES.introduction);

    // The heading prop and the slotted guidance are preserved as a blockquote instead of being dropped.
    expect(markdown).toContain('> **Note**');
    expect(markdown).toContain('> This component is stable.');
  });

  it('gates a FrameworkNotification to the framework being generated', () => {
    const source = `<FrameworkNotification showForFrameworks={['react']} heading="React only">

Use \`onInput\` in React.

</FrameworkNotification>

Shared prose.
`;
    const react = render(source, 'react');
    expect(react).toContain('> **React only**');
    expect(react).toContain('Use `onInput` in React.');

    const js = render(source, 'js');
    expect(js).not.toContain('React only');
    expect(js).toContain('Shared prose.');
  });

  it('maps inline HTML tags (code, strong, links) and drops the doc-chrome wrappers around them', () => {
    const source = `import { ComponentStatus } from '@/components/components/ComponentStatus';

# Heading <ComponentStatus tagName="p-x"></ComponentStatus>

<TableOfContents headings={[]} />

Use the <code>variant</code> prop, see the <a href="/docs">docs</a> and stay <strong>consistent</strong>.
`;
    const markdown = render(source);

    expect(markdown).toContain('# Heading');
    expect(markdown).toContain('Use the `variant` prop');
    expect(markdown).toContain('[docs](/docs)');
    expect(markdown).toContain('**consistent**');
    // No JSX / doc-chrome noise leaks.
    expect(markdown).not.toContain('<');
    expect(markdown).not.toContain('ComponentStatus');
    expect(markdown).not.toContain('TableOfContents');
  });

  it('drops PDS custom elements and interactive HTML while keeping the surrounding prose', () => {
    const source = `## Usage

Keep <p-tag color="primary">status</p-tag> prose readable.

<button type="button">Toggle</button>

- Bullet one.
`;
    const markdown = render(source);

    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('Keep prose readable.');
    expect(markdown).toContain('- Bullet one.');
    expect(markdown).not.toContain('Toggle');
    expect(markdown).not.toContain('status');
    expect(markdown).not.toContain('<');
  });

  it('escapes pipes in table cells so a union-type cell does not break the row', () => {
    const source = `| Option | Type |
| --- | --- |
| format | \`'html' \\| 'jsx'\` |
`;
    const markdown = render(source);
    expect(markdown).toContain("| `'html' \\| 'jsx'` |");
  });

  it('throws on prose that renders to nothing meaningful, naming the source label', () => {
    expect(() =>
      renderMdxToMarkdown(parseMdxToMdast(PROSE_FIXTURES.degraded), 'js', 'p-degraded › introduction')
    ).toThrow(/rendered to nothing meaningful for p-degraded › introduction/);
  });

  it('throws on a source that renders nothing', () => {
    expect(() => renderMdxToMarkdown(parseMdxToMdast('<TableOfContents headings={[]} />'))).toThrow(
      /rendered to nothing meaningful/
    );
  });
});
