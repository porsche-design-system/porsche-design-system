import { rewriteDocLinks } from '@/lib/skill/links';
import { describe, expect, it } from 'vitest';

describe('rewriteDocLinks', () => {
  const fromComponent = 'references/components/p-button/p-button.md';

  it('maps a component page link to that component reference, relative to the source file', () => {
    expect(rewriteDocLinks('See the [Link](/components/link/) component.', fromComponent)).toBe(
      'See the [Link](../p-link/p-link.md) component.'
    );
  });

  it('collapses a component sub-path (examples/api/accessibility) to the component reference', () => {
    expect(rewriteDocLinks('[examples](/components/select/examples/)', fromComponent)).toBe(
      '[examples](../p-select/p-select.md)'
    );
  });

  it('maps styling-solution, stylesheets and tokens pages to their references', () => {
    expect(rewriteDocLinks('[scss](/scss/getting-started/)', fromComponent)).toBe('[scss](../../styles/scss.md)');
    expect(rewriteDocLinks('[tokens](/tokens/)', fromComponent)).toBe('[tokens](../../tokens.md)');
    expect(rewriteDocLinks('[css](/stylesheets/)', fromComponent)).toBe('[css](../../stylesheets.md)');
  });

  it('resolves targets relative to the source file at other tree depths', () => {
    expect(rewriteDocLinks('[Button](/components/button/)', 'references/partials.md')).toBe(
      '[Button](./components/p-button/p-button.md)'
    );
    expect(rewriteDocLinks('[Button](/components/button/)', 'references/migration/scss.md')).toBe(
      '[Button](../components/p-button/p-button.md)'
    );
  });

  it('points pages with no local reference at the canonical docs URL, preserving the fragment', () => {
    expect(rewriteDocLinks('[forms](/patterns/forms/resources/#a)', fromComponent)).toBe(
      '[forms](https://designsystem.porsche.com/patterns/forms/resources/#a)'
    );
    expect(rewriteDocLinks('[init](/must-know/initialization/)', fromComponent)).toBe(
      '[init](https://designsystem.porsche.com/must-know/initialization/)'
    );
  });

  it('leaves already-relative and external links untouched', () => {
    const md = 'Local [ex](./examples/Default.html) and [ext](https://example.com/) links.';
    expect(rewriteDocLinks(md, fromComponent)).toBe(md);
  });

  it('does not rewrite links inside fenced code blocks', () => {
    const md = ['Prose [Link](/components/link/).', '', '```md', '[code](/components/link/)', '```'].join('\n');
    expect(rewriteDocLinks(md, fromComponent)).toBe(
      ['Prose [Link](../p-link/p-link.md).', '', '```md', '[code](/components/link/)', '```'].join('\n')
    );
  });
});
