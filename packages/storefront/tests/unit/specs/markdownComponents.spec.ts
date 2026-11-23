import { renderToMarkdown } from '@porsche-design-system/docs-components/markdown';
import { Fragment, jsx } from '@porsche-design-system/docs-components/markdown/jsx-runtime';
import { describe, expect, it } from 'vitest';
import { DependencyList } from '@/components/mdx/content/DependencyList/DependencyList.markdown';
import { Notification } from '@/components/mdx/content/Notification/Notification.markdown';
import { TableOfContents } from '@/components/mdx/structure/TableOfContents/TableOfContents.markdown';

/** The Markdown implementations of the MDX components, which the Storefront's Markdown renders. */

const react = { framework: 'react' } as const;

describe('Markdown implementations', () => {
  it('render a notification as a blockquote under its heading in bold', () => {
    const tree = jsx(Notification, {
      heading: 'Note',
      children: jsx('p', { children: ['See ', jsx('a', { href: '/partials', children: 'Partials' }), '.'] }),
    });

    expect(renderToMarkdown(tree, react)).toBe('> **Note**\n>\n> See [Partials](/partials).\n');
  });

  it('render a notification for its frameworks only', () => {
    const tree = jsx(Notification, { frameworks: ['vue'], children: jsx('p', { children: 'Vue only' }) });

    expect(renderToMarkdown(tree, react)).toBe('\n');
    expect(renderToMarkdown(tree, { framework: 'vue' })).toBe('> Vue only\n');
  });

  it('render a dependency list as a list of specifiers', () => {
    expect(renderToMarkdown(jsx(DependencyList, { items: ['vite@8', 'react@19'] }), react)).toBe(
      '- `vite@8`\n- `react@19`\n'
    );
  });

  it('leave the table of contents out, as the headings are the structure', () => {
    const tree = jsx(Fragment, {
      children: [jsx(TableOfContents, { headings: ['Quick start'] }), jsx('h2', { children: 'Quick start' })],
    });

    expect(renderToMarkdown(tree, react)).toBe('## Quick start\n');
  });
});
