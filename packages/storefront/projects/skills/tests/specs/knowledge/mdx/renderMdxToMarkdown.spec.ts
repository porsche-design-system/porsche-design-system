import { parseMdxToMdast, renderMdxToMarkdown } from '@skills/knowledge/mdx/renderMdxToMarkdown';
import { describe, expect, it } from 'vitest';

const render = (source: string, framework: Parameters<typeof renderMdxToMarkdown>[1] = 'js'): string =>
  renderMdxToMarkdown(parseMdxToMdast(source), framework);

describe('renderMdxToMarkdown', () => {
  it('gates framework-specific guidance', () => {
    const source = `<FrameworkNotification showForFrameworks={['react']} heading="React only">

Use \`onInput\` in React.

</FrameworkNotification>

Shared prose.
`;

    expect(render(source, 'react')).toContain('> **React only**');
    expect(render(source, 'js')).not.toContain('React only');
  });

  it('escapes pipes in table cells', () => {
    const source = `| Option | Type |
| --- | --- |
| format | \`'html' \\| 'jsx'\` |
`;

    expect(render(source)).toContain("| `'html' \\| 'jsx'` |");
  });

  it('throws when prose renders to nothing meaningful', () => {
    expect(() =>
      renderMdxToMarkdown(parseMdxToMdast('<TableOfContents headings={[]} />'), 'js', 'p-degraded › introduction')
    ).toThrow(/rendered to nothing meaningful for p-degraded › introduction/);
  });
});
