import { describe, expect, it } from 'vitest';
import { defineMarkdownComponent, MDX_CONTENT } from '../src/renderer/define';
import { Fragment, jsx } from '../src/renderer/jsx-runtime';
import { renderToMarkdown } from '../src/renderer/render';

const options = { framework: 'react' } as const;

const Callout = defineMarkdownComponent<{ heading: string; children?: unknown }>(
  'Callout',
  ({ heading, children }, { renderChildren }) => [
    { type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: heading }] }] },
    ...renderChildren(children),
  ]
);
const Hidden = defineMarkdownComponent<object>('Hidden', () => []);

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
    const tree = jsx(Callout, {
      heading: 'Note',
      children: jsx('p', { children: ['See ', jsx('a', { href: '/partials/', children: 'Partials' }), '.'] }),
    });

    expect(renderToMarkdown(tree, options)).toBe('**Note**\n\nSee [Partials](/partials/).\n');
  });

  it('renders nothing for a component whose Markdown is empty', () => {
    const tree = jsx(Fragment, { children: [jsx(Hidden, {}), jsx('p', { children: 'Kept' })] });

    expect(renderToMarkdown(tree, options)).toBe('Kept\n');
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
