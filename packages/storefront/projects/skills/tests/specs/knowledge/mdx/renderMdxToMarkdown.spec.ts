import { parseMdxToMdast, renderMdxToMarkdown } from '@skills/knowledge/mdx/renderMdxToMarkdown';
import { describe, expect, it } from 'vitest';

const render = (source: string, framework: Parameters<typeof renderMdxToMarkdown>[1] = 'vanilla-js'): string =>
  renderMdxToMarkdown(parseMdxToMdast(source), framework);

describe('renderMdxToMarkdown', () => {
  it('gates framework-specific guidance', () => {
    const source = `<FrameworkNotification showForFrameworks={['react']} heading="React only">

Use \`onInput\` in React.

</FrameworkNotification>

Shared prose.
`;

    expect(render(source, 'react')).toContain('> **React only**');
    expect(render(source, 'vanilla-js')).not.toContain('React only');
  });

  it('escapes pipes in table cells', () => {
    const source = `| Option | Type |
| --- | --- |
| format | \`'html' \\| 'jsx'\` |
`;

    expect(render(source)).toContain("| `'html' \\| 'jsx'` |");
  });

  it('renders DocsLink as a Markdown link, inline and as a block', () => {
    expect(render('Otherwise, <DocsLink href="/components/wordmark">p-wordmark</DocsLink> has to be used.')).toBe(
      'Otherwise, [p-wordmark](/components/wordmark) has to be used.'
    );
    expect(render('<DocsLink href="/patterns/forms">Forms</DocsLink>')).toBe('[Forms](/patterns/forms)');
  });

  it('throws when prose renders to nothing meaningful', () => {
    expect(() =>
      renderMdxToMarkdown(
        parseMdxToMdast('<TableOfContents headings={[]} />'),
        'vanilla-js',
        'p-degraded › introduction'
      )
    ).toThrow(/rendered to nothing meaningful for p-degraded › introduction/);
  });
});
