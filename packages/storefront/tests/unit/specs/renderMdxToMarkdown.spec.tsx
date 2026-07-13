import type { ComponentType } from 'react';
import { beforeAll, describe, expect, it } from 'vitest';
import { renderMdxToMarkdown } from '@/lib/skill/support/renderMdxToMarkdown';
import { NoiseComponent } from '../data/skill/NoiseComponent';
import { compileMdx, PROSE_FIXTURES } from '../data/skill/proseFixtures';

describe('renderMdxToMarkdown', () => {
  const compiled: Record<string, ComponentType> = {};

  beforeAll(async () => {
    for (const [name, source] of Object.entries(PROSE_FIXTURES)) {
      compiled[name] = await compileMdx(source);
    }
  });

  it('renders representative component prose blocks to non-empty markdown', () => {
    for (const name of ['usage', 'accessibility', 'introduction']) {
      const markdown = renderMdxToMarkdown(compiled[name]);
      expect(markdown.trim().length, `${name} should be non-empty`).toBeGreaterThan(20);
    }
  });

  it('preserves markdown structure (headings, lists, emphasis, inline code, links)', () => {
    const markdown = renderMdxToMarkdown(compiled.usage);

    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('### Do:');
    expect(markdown).toContain('- Use accordions to organize');
    expect(markdown).toContain('**related**');
    expect(markdown).toContain('`heading`');
  });

  it('renders links, ordered lists and fenced code blocks', () => {
    const accessibility = renderMdxToMarkdown(compiled.accessibility);
    expect(accessibility).toContain(
      '[WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)'
    );
    expect(accessibility).toContain('1. Tab moves focus');
    expect(accessibility).toContain('*unique*');

    const introduction = renderMdxToMarkdown(compiled.introduction);
    expect(introduction).toContain('```html');
    expect(introduction).toContain('<p-accordion heading="Section 1">Panel content</p-accordion>');
  });

  it('surfaces a Notification as a blockquote admonition, not dropped', () => {
    const markdown = renderMdxToMarkdown(compiled.introduction);

    // The slotted guidance is preserved as a blockquote instead of being dropped as custom-element noise.
    expect(markdown).toContain('> This component is stable.');
  });

  it('recovers source from a syntax-highlighted <pre> without leaking highlighter markup', () => {
    // The partials pages pre-highlight code into `hljs` spans; the renderer must collapse those spans
    // (and decode entities) back to the original source rather than emit the span markup verbatim.
    const Highlighted: ComponentType = () => (
      <pre>
        <code
          className="hljs language-html"
          dangerouslySetInnerHTML={{
            __html:
              '<span class="hljs-tag">&lt;p-accordion heading=&quot;x&quot;&gt;</span><span>Panel</span><span class="hljs-tag">&lt;/p-accordion&gt;</span>',
          }}
        />
      </pre>
    );
    const markdown = renderMdxToMarkdown(Highlighted);

    expect(markdown).toBe('```html\n<p-accordion heading="x">Panel</p-accordion>\n```');
    expect(markdown).not.toContain('hljs');
    expect(markdown).not.toContain('<span');
  });

  it('substitutes embedded JSX components — no raw JSX or component noise leaks', () => {
    const markdown = renderMdxToMarkdown(compiled.usage);

    expect(markdown).not.toContain('<');
    expect(markdown).not.toContain('TableOfContents');
    expect(markdown).not.toContain('ComponentStatus');
    // The heading text survives even though `<ComponentStatus>` was stripped from it.
    expect(markdown).toContain('# Accordion');
  });

  it('drops directly-rendered component noise while keeping surrounding prose', () => {
    const markdown = renderMdxToMarkdown(NoiseComponent);

    expect(markdown).toContain('## Usage');
    expect(markdown).toContain('Use the `variant` prop');
    expect(markdown).toContain('- Keep prose readable.');
    // The <nav> table-of-contents, the <p-tag> web component and the <button> are gone.
    expect(markdown).not.toContain('Toggle');
    expect(markdown).not.toContain('status');
    expect(markdown).not.toContain('#usage');
    expect(markdown).not.toContain('<');
  });

  it('emits a header-separator row for a table whose header uses <td> (no <th>)', () => {
    const TdTable: ComponentType = () => (
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Value</td>
          </tr>
          <tr>
            <td>a</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    );
    const markdown = renderMdxToMarkdown(TdTable);

    expect(markdown).toBe('| Name | Value |\n| --- | --- |\n| a | 1 |');
  });

  it('escapes pipes in table cells so a union-type cell does not break the row', () => {
    const PipeTable: ComponentType = () => (
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>format</td>
            <td>
              <code>'html' | 'jsx' | 'sha256'</code>
            </td>
          </tr>
        </tbody>
      </table>
    );
    const markdown = renderMdxToMarkdown(PipeTable);

    expect(markdown).toBe("| Option | Type |\n| --- | --- |\n| format | `'html' \\| 'jsx' \\| 'sha256'` |");
  });

  it('throws on prose that renders to nothing meaningful, naming the source label', () => {
    expect(() => renderMdxToMarkdown(compiled.degraded, 'js', 'p-degraded › introduction')).toThrow(
      /rendered to nothing meaningful for p-degraded › introduction/
    );
  });

  it('throws on a component that renders nothing', () => {
    const Empty: ComponentType = () => null;
    expect(() => renderMdxToMarkdown(Empty)).toThrow(/rendered to nothing meaningful/);
  });

  it('rethrows an SSR failure with the source label for context', () => {
    const Throwing: ComponentType = () => {
      throw new Error('boom');
    };
    expect(() => renderMdxToMarkdown(Throwing, 'js', 'p-button › usage')).toThrow(
      /MDX SSR failed for p-button › usage: boom/
    );
  });
});
