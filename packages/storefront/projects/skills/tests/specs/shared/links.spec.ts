import { resolveFrameworkPlaceholder, rewriteDocLinks } from '@skills/shared/links';
import { FRAMEWORKS } from '@skills/shared/skillTree';
import { describe, expect, it } from 'vitest';

describe('rewriteDocLinks', () => {
  const fromComponent = 'references/components/p-button/p-button.md';
  const routeReferences = {
    scss: 'references/styles/scss.md',
    tokens: 'references/tokens.md',
    stylesheets: 'references/stylesheets.md',
  };
  const rewrite = (markdown: string, fromRelPath: string): string =>
    rewriteDocLinks(markdown, fromRelPath, routeReferences);

  it('maps a component page link to that component reference, relative to the source file', () => {
    expect(rewrite('See the [Link](/components/link/) component.', fromComponent)).toBe(
      'See the [Link](../p-link/p-link.md) component.'
    );
  });

  it('collapses a component sub-path (examples/api/accessibility) to the component reference', () => {
    expect(rewrite('[examples](/components/select/examples/)', fromComponent)).toBe(
      '[examples](../p-select/p-select.md)'
    );
  });

  it('maps styling-solution, stylesheets and tokens pages to their references', () => {
    expect(rewrite('[scss](/scss/getting-started/)', fromComponent)).toBe('[scss](../../styles/scss.md)');
    expect(rewrite('[tokens](/tokens/)', fromComponent)).toBe('[tokens](../../tokens.md)');
    expect(rewrite('[css](/stylesheets/)', fromComponent)).toBe('[css](../../stylesheets.md)');
  });

  it('resolves targets relative to the source file at other tree depths', () => {
    expect(rewrite('[Button](/components/button/)', 'references/partials.md')).toBe(
      '[Button](./components/p-button/p-button.md)'
    );
    expect(rewrite('[Button](/components/button/)', 'references/styles/scss.md')).toBe(
      '[Button](../components/p-button/p-button.md)'
    );
  });

  it('points pages with no local reference at the canonical docs URL, preserving the fragment', () => {
    expect(rewrite('[forms](/patterns/forms/resources/#a)', fromComponent)).toBe(
      '[forms](https://designsystem.porsche.com/patterns/forms/resources/#a)'
    );
    expect(rewrite('[init](/must-know/initialization/)', fromComponent)).toBe(
      '[init](https://designsystem.porsche.com/must-know/initialization/)'
    );
  });

  it('leaves already-relative and external links untouched', () => {
    const md = 'Local [ex](./examples/Default.html) and [ext](https://example.com/) links.';
    expect(rewrite(md, fromComponent)).toBe(md);
  });

  it('does not rewrite links inside fenced code blocks', () => {
    const md = ['Prose [Link](/components/link/).', '', '```md', '[code](/components/link/)', '```'].join('\n');
    expect(rewrite(md, fromComponent)).toBe(
      ['Prose [Link](../p-link/p-link.md).', '', '```md', '[code](/components/link/)', '```'].join('\n')
    );
  });
});

describe('resolveFrameworkPlaceholder', () => {
  it('substitutes the package placeholder with the concrete framework package', () => {
    for (const framework of FRAMEWORKS) {
      const resolved = resolveFrameworkPlaceholder(
        "@import '@porsche-design-system/components-{js|angular|react|vue}/scss';",
        framework
      );
      expect(resolved).toBe(`@import '${getWrapperPackageName(framework)}/scss';`);
    }
  });

  it('drops the obsolete "Replace … with your framework" instruction line', () => {
    const input = [
      '```css',
      '/* Replace {js|angular|react|vue} with your framework, e.g. components-react */',
      "@import '@porsche-design-system/components-{js|angular|react|vue}';",
      '```',
    ].join('\n');
    const resolved = resolveFrameworkPlaceholder(input, 'react');
    expect(resolved).toBe(['```css', "@import '@porsche-design-system/components-react';", '```'].join('\n'));
  });

  it('is a no-op on content without the placeholder', () => {
    const md = 'Plain prose with `@porsche-design-system/components-react` already resolved.';
    expect(resolveFrameworkPlaceholder(md, 'react')).toBe(md);
  });
});
import { getWrapperPackageName } from '@skills/registry';
