import { parseMdxToMdast, renderMdxToMarkdown } from '@skills/knowledge/mdx/renderMdxToMarkdown';
import { describe, expect, it } from 'vitest';

const render = (source: string, framework: Parameters<typeof renderMdxToMarkdown>[1] = 'vanilla-js'): string =>
  renderMdxToMarkdown(parseMdxToMdast(source), framework);

describe('renderMdxToMarkdown', () => {
  it('gates framework-specific guidance', () => {
    const source = `<Notification frameworks={['react']} heading="React only">

Use \`onInput\` in React.

</Notification>

<Notification heading="Everyone">

Shared guidance.

</Notification>

Shared prose.
`;

    expect(render(source, 'react')).toContain('> **React only**');
    expect(render(source, 'vanilla-js')).not.toContain('React only');
    expect(render(source, 'vanilla-js')).toContain('> **Everyone**');
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
      renderMdxToMarkdown(
        parseMdxToMdast('<TableOfContents headings={[]} />'),
        'vanilla-js',
        'p-degraded › introduction'
      )
    ).toThrow(/rendered to nothing meaningful for p-degraded › introduction/);
  });
});
