import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { type HTMLElement as ParsedElement, type Node as ParsedNode, NodeType, parse } from 'node-html-parser';
import { type ComponentType, createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StorefrontFrameworkProvider } from '@/components/providers/StorefrontFrameworkProvider';

export type RenderMdxResult = {
  /** The rendered prose as plain markdown. */
  markdown: string;
  /**
   * `true` when the source rendered to nothing meaningful (empty / whitespace /
   * no textual content). Signals that a human should review the source prose,
   * since the API tables — sourced from `component-meta`, not MDX — are unaffected.
   */
  degraded: boolean;
};

/**
 * Storefront-only doc components embedded in MDX prose that carry no value in a
 * plain-markdown context. They are substituted with nothing via the `components`
 * prop so they never leak into the output. Any not resolved through the prop
 * (e.g. directly imported) are caught by the drop-list below after rendering.
 */
const EMBEDDED_COMPONENT_STUBS = ['TableOfContents', 'Notification', 'PartialDocs', 'TokensTable', 'ComponentStatus'];

/** Block-level tags that map directly to markdown blocks. */
const BLOCK_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'UL', 'OL', 'BLOCKQUOTE', 'PRE', 'HR', 'TABLE']);

/** Generic containers with no markdown meaning — unwrapped (children kept, wrapper dropped). */
const UNWRAP_TAGS = new Set(['DIV', 'SECTION', 'ARTICLE', 'MAIN', 'HEADER', 'FIGURE', 'FIGCAPTION']);

/** Tags whose rendered output is non-prose noise (typically from embedded components) — dropped entirely. */
const DROP_TAGS = new Set([
  'NAV',
  'ASIDE',
  'FOOTER',
  'BUTTON',
  'FORM',
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'SVG',
  'STYLE',
  'SCRIPT',
  'NOSCRIPT',
  'IFRAME',
]);

const isElement = (node: ParsedNode): node is ParsedElement => node.nodeType === NodeType.ELEMENT_NODE;

/** Custom elements (e.g. `p-button`) are PDS web components, never prose. */
const isCustomElement = (tagName: string): boolean => tagName.includes('-');

const collapseWhitespace = (text: string): string => text.replace(/\s+/g, ' ');

const renderChildrenInline = (parent: ParsedNode): string =>
  parent.childNodes.map((child) => renderInline(child)).join('');

const renderInline = (node: ParsedNode): string => {
  if (node.nodeType === NodeType.TEXT_NODE) {
    return collapseWhitespace(node.text);
  }
  if (!isElement(node)) {
    return '';
  }

  const { tagName } = node;

  if (DROP_TAGS.has(tagName) || isCustomElement(tagName)) {
    return '';
  }

  switch (tagName) {
    case 'STRONG':
    case 'B': {
      const inner = renderChildrenInline(node).trim();
      return inner ? `**${inner}**` : '';
    }
    case 'EM':
    case 'I': {
      const inner = renderChildrenInline(node).trim();
      return inner ? `*${inner}*` : '';
    }
    case 'DEL':
    case 'S': {
      const inner = renderChildrenInline(node).trim();
      return inner ? `~~${inner}~~` : '';
    }
    case 'CODE': {
      const inner = node.text.trim();
      return inner ? `\`${inner}\`` : '';
    }
    case 'A': {
      const inner = renderChildrenInline(node).trim();
      const href = node.getAttribute('href');
      return href ? `[${inner}](${href})` : inner;
    }
    case 'IMG': {
      const src = node.getAttribute('src');
      const alt = node.getAttribute('alt') ?? '';
      return src ? `![${alt}](${src})` : '';
    }
    case 'BR':
      return '\n';
    default:
      // Generic / unknown inline wrapper: keep the prose, drop the wrapper.
      return renderChildrenInline(node);
  }
};

const renderList = (node: ParsedElement, ordered: boolean): string => {
  const items = node.childNodes.filter((child): child is ParsedElement => isElement(child) && child.tagName === 'LI');

  return items
    .map((item) => {
      let inline = '';
      const nestedLists: ParsedElement[] = [];
      for (const child of item.childNodes) {
        if (isElement(child) && (child.tagName === 'UL' || child.tagName === 'OL')) {
          nestedLists.push(child);
        } else {
          inline += renderInline(child);
        }
      }
      return { inline: inline.trim(), nestedLists };
    })
    // Items whose entire content was dropped noise (e.g. an embedded PDS component
    // rendered then stripped) leave no prose and no nested list — drop them so the
    // output carries no empty `-` bullets.
    .filter(({ inline, nestedLists }) => inline || nestedLists.length > 0)
    .map(({ inline, nestedLists }, index) => {
      const marker = ordered ? `${index + 1}.` : '-';
      const indent = ' '.repeat(marker.length + 1);

      let line = `${marker} ${inline}`;
      for (const nested of nestedLists) {
        const nestedMarkdown = renderList(nested, nested.tagName === 'OL');
        const indented = nestedMarkdown
          .split('\n')
          .map((row) => (row ? indent + row : row))
          .join('\n');
        line += `\n${indented}`;
      }
      return line;
    })
    .join('\n');
};

const renderPre = (node: ParsedElement): string => {
  const language = /language-([\w-]+)/.exec(node.innerHTML)?.[1] ?? '';
  // `node-html-parser` treats `<pre>` as raw text: its inner HTML — the `<code>` wrapper and any
  // syntax-highlighter `<span class="hljs-…">` markup — is not parsed into child nodes, so `.text`
  // would leak that markup verbatim (plain code blocks have none; highlighted ones do). Strip the
  // `<code>` wrapper, then re-parse the remaining inner HTML and take its text: this collapses the
  // highlighter spans and decodes entities, recovering the original source in both cases.
  const inner = node.innerHTML.replace(/^\s*<code[^>]*>/i, '').replace(/<\/code>\s*$/i, '');
  const code = parse(inner).text.replace(/\n+$/, '');
  return `\`\`\`${language}\n${code}\n\`\`\``;
};

const renderTable = (node: ParsedElement): string => {
  const lines: string[] = [];
  let separatorWritten = false;

  for (const row of node.querySelectorAll('tr')) {
    // Escape pipes so cell content that itself contains `|` (e.g. a `'html' | 'jsx'` union type in an
    // inline-code span) does not break the row into extra columns.
    const cells = row.querySelectorAll('th, td').map((cell) => renderChildrenInline(cell).trim().replace(/\|/g, '\\|'));
    if (cells.length === 0) {
      continue;
    }
    lines.push(`| ${cells.join(' | ')} |`);

    // Markdown needs the `| --- |` separator as the table's second line; emit it after the
    // first row whether or not that row used <th>, so a `<td>`-only header table stays valid.
    if (!separatorWritten) {
      lines.push(`| ${cells.map(() => '---').join(' | ')} |`);
      separatorWritten = true;
    }
  }

  return lines.join('\n');
};

const renderBlock = (node: ParsedElement): string => {
  const { tagName } = node;

  if (/^H[1-6]$/.test(tagName)) {
    const level = Number(tagName[1]);
    return `${'#'.repeat(level)} ${renderChildrenInline(node).trim()}`;
  }

  switch (tagName) {
    case 'P':
      return renderChildrenInline(node).trim();
    case 'UL':
      return renderList(node, false);
    case 'OL':
      return renderList(node, true);
    case 'PRE':
      return renderPre(node);
    case 'HR':
      return '---';
    case 'TABLE':
      return renderTable(node);
    case 'BLOCKQUOTE':
      return renderBlocks(node)
        .split('\n')
        .map((line) => (line ? `> ${line}` : '>'))
        .join('\n');
    default:
      // Unwrapped container (DIV, SECTION, …): recurse into its blocks.
      return renderBlocks(node);
  }
};

/** Whether an element starts a markdown block (vs. flowing into an inline paragraph). */
const isBlockElement = (node: ParsedNode): boolean =>
  isElement(node) && (BLOCK_TAGS.has(node.tagName) || UNWRAP_TAGS.has(node.tagName));

const renderBlocks = (parent: ParsedNode): string => {
  const blocks: string[] = [];
  let inlineBuffer = '';

  const flushInline = (): void => {
    const text = inlineBuffer.trim();
    if (text) {
      blocks.push(text);
    }
    inlineBuffer = '';
  };

  for (const child of parent.childNodes) {
    if (isElement(child) && (DROP_TAGS.has(child.tagName) || isCustomElement(child.tagName))) {
      continue;
    }
    if (isBlockElement(child)) {
      flushInline();
      const block = renderBlock(child as ParsedElement).trim();
      if (block) {
        blocks.push(block);
      }
    } else {
      inlineBuffer += renderInline(child);
    }
  }
  flushInline();

  return blocks.join('\n\n');
};

const normalize = (markdown: string): string =>
  markdown
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/** The storefront contexts the embedded doc components read during SSR. */
const SkillProviders = ({ children }: { children: ReactNode }) =>
  createElement(PorscheDesignSystemProvider, null, createElement(StorefrontFrameworkProvider, null, children));

/**
 * Renders a storefront MDX `ComponentType` (component introduction / usage /
 * accessibility / notes, partials prose, migration prose) to plain markdown.
 *
 * Pure and synchronous — performs no I/O. The caller resolves the MDX module to
 * a React component; this renders it to static markup and converts the result.
 * Embedded storefront components are substituted away (see {@link EMBEDDED_COMPONENT_STUBS})
 * or dropped, so no JSX/component noise leaks into the output.
 *
 * @param label optional source identifier (e.g. `p-button › usage`) used to give an SSR failure an
 *   actionable message — the raw `renderToStaticMarkup` stack names neither the tag nor the section.
 */
export const renderMdxToMarkdown = (
  component: ComponentType<{ components?: Record<string, unknown> }>,
  label?: string
): RenderMdxResult => {
  const componentStubs: Record<string, ComponentType> = {};
  for (const name of EMBEDDED_COMPONENT_STUBS) {
    componentStubs[name] = () => null;
  }

  // Prose embeds live PDS and storefront doc components (rendered, then dropped as
  // custom-element / chrome noise below). They read React context — PDS `usePrefix`,
  // the storefront framework switcher — so the render must sit inside the same
  // providers the storefront layout wraps these pages in, or SSR throws.
  let html: string;
  try {
    html = renderToStaticMarkup(
      createElement(SkillProviders, null, createElement(component, { components: componentStubs }))
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`MDX SSR failed${label ? ` for ${label}` : ''}: ${message}`, { cause: error });
  }
  const markdown = normalize(renderBlocks(parse(html)));
  const degraded = markdown.length === 0 || !/[A-Za-z0-9]/.test(markdown);

  return { markdown, degraded };
};
