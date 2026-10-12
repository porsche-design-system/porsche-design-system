import { describe, expect, it } from 'vitest';
import {
  DependencyList,
  MarkdownOnly,
  Notification,
  StorefrontOnly,
  TableOfContents,
} from '../src/markdown/components';
import { MDX_CONTENT } from '../src/markdown/define';
import { Fragment, jsx } from '../src/markdown/jsx-runtime';
import { renderToMarkdown } from '../src/markdown/render';

const options = { framework: 'react', destination: 'web' } as const;

describe('renderToMarkdown', () => {
  it('converts the HTML elements MDX emits for Markdown syntax', () => {
    const tree = jsx(Fragment, {
      children: [
        jsx('h2', { children: 'Step 1' }),
        jsx('p', { children: ['Install the ', jsx('code', { children: 'components-react' }), ' package.'] }),
        jsx('pre', { children: jsx('code', { className: 'language-bash', children: 'npm install\n' }) }),
      ],
    });

    expect(renderToMarkdown(tree, options)).toBe(
      '## Step 1\n\nInstall the `components-react` package.\n\n```bash\nnpm install\n```\n'
    );
  });

  it('renders registered components and their nested children', () => {
    const tree = jsx(Notification, {
      heading: 'Note',
      children: jsx('p', { children: ['See ', jsx('a', { href: '/partials/', children: 'Partials' }), '.'] }),
    });

    expect(renderToMarkdown(tree, options)).toBe('> **Note**\n>\n> See [Partials](/partials/).\n');
  });

  it('resolves links for the destination', () => {
    const tree = jsx('p', { children: jsx('a', { href: '/partials/', children: 'Partials' }) });

    expect(
      renderToMarkdown(tree, { ...options, resolveLink: (href) => `https://designsystem.porsche.com/v4${href}` })
    ).toBe('[Partials](https://designsystem.porsche.com/v4/partials/)\n');
  });

  it('renders a dependency list', () => {
    expect(renderToMarkdown(jsx(DependencyList, { items: ['vite@8', 'react@19'] }), options)).toBe(
      '- `vite@8`\n- `react@19`\n'
    );
  });

  it('drops the table of contents and storefront-only content, and keeps markdown-only content', () => {
    const tree = jsx(Fragment, {
      children: [
        jsx(TableOfContents, { headings: ['Quick start'] }),
        jsx(StorefrontOnly, { children: jsx('p', { children: 'For people' }) }),
        jsx(MarkdownOnly, { children: jsx('p', { children: 'For agents' }) }),
      ],
    });

    expect(renderToMarkdown(tree, options)).toBe('For agents\n');
  });

  it('renders composed MDX content', () => {
    const fragment = () => jsx('p', { children: 'Composed' });
    (fragment as unknown as Record<symbol, boolean>)[MDX_CONTENT] = true;

    expect(renderToMarkdown(jsx(fragment, {}), options)).toBe('Composed\n');
  });

  it('fails for a component that is not registered', () => {
    const PTag = () => null;

    expect(() => renderToMarkdown(jsx(PTag, {}), options)).toThrow('Unregistered component "PTag" in MDX');
  });

  it('names forwardRef components in the error', () => {
    const PTag = { $$typeof: Symbol.for('react.forward_ref'), render: function PTag() {} };

    expect(() => renderToMarkdown(jsx(PTag as never, {}), options)).toThrow('Unregistered component "PTag" in MDX');
  });

  it('fails for an HTML element that is not allowed', () => {
    expect(() => renderToMarkdown(jsx('button', { children: 'Click' }), options)).toThrow(
      'HTML element <button> is not allowed in MDX'
    );
  });
});
