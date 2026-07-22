import type { Framework as StorefrontFramework } from '@porsche-design-system/shared';
import type {
  Blockquote,
  Heading,
  Html,
  Link,
  List,
  ListItem,
  Nodes,
  Paragraph,
  Parent,
  PhrasingContent,
  Root,
  RootContent,
  Table,
} from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import type { MdxJsxAttribute, MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx';
import { type Options, toMarkdown } from 'mdast-util-to-markdown';
import { toString as mdastToString } from 'mdast-util-to-string';
import { gfm } from 'micromark-extension-gfm';
import { mdxjs } from 'micromark-extension-mdxjs';
import { escapeCell, markdownTable } from './markdown';
import type { Framework } from './skillTree';

/**
 * Skill framework → the storefront's own framework identifier. They differ only in the vanilla-js
 * name (`js` here, `vanilla-js` in the storefront `FrameworkNotification` `showForFrameworks` prop).
 */
const STOREFRONT_FRAMEWORK: Record<Framework, StorefrontFramework> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

/** The two doc components whose slotted children carry real guidance, surfaced as blockquotes. */
const NOTIFICATION_COMPONENTS = new Set(['Notification', 'FrameworkNotification']);

type MdxJsxElement = MdxJsxFlowElement | MdxJsxTextElement;

const isJsxElement = (node: RootContent): node is MdxJsxElement =>
  node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';

/** Node types that carry no markdown content (ESM import/export lines, JS expressions, frontmatter). */
const isDroppedNodeType = (type: string): boolean =>
  type === 'mdxjsEsm' || type === 'mdxFlowExpression' || type === 'mdxTextExpression' || type === 'yaml';

const hasChildren = (node: unknown): node is Parent =>
  typeof node === 'object' && node !== null && Array.isArray((node as Parent).children);

const attribute = (node: MdxJsxElement, name: string): MdxJsxAttribute | undefined =>
  node.attributes.find((attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute' && attr.name === name);

/** Plain string value of a JSX attribute (`heading="…"`), or `undefined` for expression/boolean attributes. */
const stringAttribute = (node: MdxJsxElement, name: string): string | undefined => {
  const value = attribute(node, name)?.value;
  return typeof value === 'string' ? value : undefined;
};

/**
 * `showForFrameworks={['react', 'vue']}` → the listed storefront frameworks. The attribute is a JS
 * expression string; the values are string literals, so the framework names are read out directly
 * (no `eval`) — anything unparseable yields an empty list, hiding the notification for every framework.
 */
const showForFrameworks = (node: MdxJsxElement): StorefrontFramework[] => {
  const expression = attribute(node, 'showForFrameworks')?.value;
  const raw = typeof expression === 'object' && expression ? expression.value : '';
  return [...raw.matchAll(/'([^']+)'|"([^"]+)"/g)].map((match) => (match[1] ?? match[2]) as StorefrontFramework);
};

/** Build the `link` node for an MDX `<Link href="…">…</Link>` (Next.js link → markdown link). */
const toLink = (node: MdxJsxElement, framework: Framework): Link => ({
  type: 'link',
  url: stringAttribute(node, 'href') ?? '',
  children: transformChildren(node, framework) as Link['children'],
});

/**
 * A `Notification` / `FrameworkNotification` → a blockquote admonition: an optional bold heading line
 * followed by the slotted guidance. `FrameworkNotification` is framework-gated, so it collapses to
 * nothing for a framework it is not shown for.
 */
const toNotification = (node: MdxJsxElement, framework: Framework): RootContent[] => {
  if (node.name === 'FrameworkNotification' && !showForFrameworks(node).includes(STOREFRONT_FRAMEWORK[framework])) {
    return [];
  }

  const heading = stringAttribute(node, 'heading');
  const body = blockify(transformChildren(node, framework));
  const children: RootContent[] = [];
  if (heading) {
    const headingParagraph: Paragraph = {
      type: 'paragraph',
      children: [{ type: 'strong', children: [{ type: 'text', value: heading }] }],
    };
    children.push(headingParagraph);
  }
  children.push(...body);
  if (children.length === 0) {
    return [];
  }
  const blockquote: Blockquote = { type: 'blockquote', children: children as Blockquote['children'] };
  return [blockquote];
};

/** A PDS custom element (`p-button`, `p-drilldown-item`, …) — non-prose, dropped. */
const isCustomElement = (name: string): boolean => name.includes('-');

/** Interactive / media / chrome HTML tags that are live-demo noise (mirrors the previous drop-list). */
const DROPPED_HTML = new Set([
  'input',
  'button',
  'select',
  'textarea',
  'form',
  'nav',
  'aside',
  'footer',
  'svg',
  'style',
  'script',
  'noscript',
  'iframe',
  'video',
  'audio',
  'picture',
  'source',
  'dialog',
  'canvas',
]);

const HEADING_DEPTHS: Record<string, Heading['depth']> = { h1: 1, h2: 2, h3: 3, h4: 4, h5: 5, h6: 6 };

/** `<ul>` / `<ol>` written as HTML in MDX → an mdast list of its `<li>` children. */
const buildList = (node: MdxJsxElement, ordered: boolean, framework: Framework): List => ({
  type: 'list',
  ordered,
  spread: false,
  children: transformChildren(node, framework).filter((child): child is ListItem => child.type === 'listItem'),
});

/**
 * Map a plain HTML tag written as JSX in MDX (`<code>`, `<br>`, `<a href>`, `<strong>`, `<p>`, …) to its
 * mdast equivalent. Interactive/media tags are dropped; unknown wrappers keep their prose, dropping only
 * the wrapper.
 */
const transformHtmlElement = (node: MdxJsxElement, framework: Framework): RootContent[] => {
  const name = node.name as string;
  const phrasing = (): PhrasingContent[] => transformChildren(node, framework) as PhrasingContent[];
  switch (name) {
    case 'code':
      return [{ type: 'inlineCode', value: mdastToString(node).replace(/\s+/g, ' ').trim() }];
    case 'strong':
    case 'b':
      return [{ type: 'strong', children: phrasing() }];
    case 'em':
    case 'i':
      return [{ type: 'emphasis', children: phrasing() }];
    case 'del':
    case 's':
      return [{ type: 'delete', children: phrasing() }];
    case 'br':
      return [{ type: 'break' }];
    case 'a':
      return [{ type: 'link', url: stringAttribute(node, 'href') ?? '', children: phrasing() as Link['children'] }];
    case 'img':
      return [{ type: 'image', url: stringAttribute(node, 'src') ?? '', alt: stringAttribute(node, 'alt') ?? '' }];
    case 'p':
      return [{ type: 'paragraph', children: phrasing() }];
    case 'ul':
      return [buildList(node, false, framework)];
    case 'ol':
      return [buildList(node, true, framework)];
    case 'li':
      return [
        { type: 'listItem', spread: false, children: transformChildren(node, framework) as ListItem['children'] },
      ];
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return [{ type: 'heading', depth: HEADING_DEPTHS[name], children: phrasing() }];
  }
  if (DROPPED_HTML.has(name)) {
    return [];
  }
  // Generic wrapper (span, div, section, abbr, figure, …): keep the prose, drop the wrapper.
  return transformChildren(node, framework);
};

/** Transform a single JSX element to its markdown-node replacement (0..n plain mdast nodes). */
const transformJsxElement = (node: MdxJsxElement, framework: Framework): RootContent[] => {
  const name = node.name;
  if (name === null) {
    // `<>…</>` fragment: keep the prose, drop the wrapper.
    return transformChildren(node, framework);
  }
  if (NOTIFICATION_COMPONENTS.has(name)) {
    return toNotification(node, framework);
  }
  if (name === 'Link') {
    const link = toLink(node, framework);
    return node.type === 'mdxJsxFlowElement' ? [{ type: 'paragraph', children: [link] }] : [link];
  }
  if (isCustomElement(name)) {
    // PDS custom element (`p-button`, …): non-prose noise.
    return [];
  }
  if (name[0] === name[0]?.toLowerCase()) {
    return transformHtmlElement(node, framework);
  }
  // Capitalized doc-chrome component (ComponentStatus, TableOfContents, …): dropped with its children.
  return [];
};

/** Containers whose edge whitespace is insignificant — trimmed so a dropped inline JSX element
 * (e.g. `# Button <ComponentStatus/>`) does not leave an encoded trailing space in the output. */
const EDGE_TRIMMED = new Set(['heading', 'paragraph', 'tableCell']);

/** Left/right-trim the whitespace of the first/last text node so dropped inline elements leave no gap. */
const trimEdgeWhitespace = (children: RootContent[]): RootContent[] => {
  const first = children[0];
  if (first?.type === 'text') {
    first.value = first.value.replace(/^\s+/, '');
  }
  const last = children[children.length - 1];
  if (last?.type === 'text') {
    last.value = last.value.replace(/\s+$/, '');
  }
  return children.filter((child) => !(child.type === 'text' && child.value === ''));
};

/**
 * Merge consecutive text siblings, collapsing the whitespace across the join and dropping a space left
 * before punctuation. A dropped inline element (e.g. a live `p-tag` demo between "info button" and ",")
 * otherwise leaves two adjacent text nodes that serialize with a double space / an orphaned space.
 */
const mergeAdjacentText = (children: RootContent[]): RootContent[] => {
  const merged: RootContent[] = [];
  for (const child of children) {
    const previous = merged[merged.length - 1];
    if (child.type === 'text' && previous?.type === 'text') {
      previous.value = `${previous.value}${child.value}`.replace(/\s+/g, ' ').replace(/ ([,.;:!?])/g, '$1');
    } else {
      merged.push(child);
    }
  }
  return merged;
};

/** Depth-first transform of a node's children into plain mdast nodes. */
const transformChildren = (node: Parent, framework: Framework): RootContent[] => {
  const children = mergeAdjacentText(node.children.flatMap((child) => transformNode(child as RootContent, framework)));
  return EDGE_TRIMMED.has(node.type) ? trimEdgeWhitespace(children) : children;
};

/**
 * Split a paragraph's content at hard breaks (`<br>`) into separate paragraphs — an admonition body
 * or prose that uses `<br>` to separate sentences reads as distinct blocks, not one paragraph with
 * stray line-break markers.
 */
const splitParagraphAtBreaks = (children: RootContent[]): Paragraph[] => {
  const groups: RootContent[][] = [[]];
  for (const child of children) {
    if (child.type === 'break') {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(child);
    }
  }
  return groups
    .map((group) => trimEdgeWhitespace(mergeAdjacentText(group)))
    .filter((group) => group.length > 0)
    .map((group) => ({ type: 'paragraph', children: group as Paragraph['children'] }));
};

/**
 * Wrap runs of loose phrasing content (e.g. a `Notification`'s inline body) into paragraphs, splitting
 * at hard breaks, while passing block-level nodes through untouched — so a blockquote/list only ever
 * contains valid block children.
 */
const PHRASING_TYPES = new Set(['text', 'emphasis', 'strong', 'delete', 'inlineCode', 'link', 'image', 'break']);
const blockify = (children: RootContent[]): RootContent[] => {
  const result: RootContent[] = [];
  let buffer: RootContent[] = [];
  const flush = (): void => {
    if (buffer.length > 0) {
      result.push(...splitParagraphAtBreaks(buffer));
      buffer = [];
    }
  };
  for (const child of children) {
    if (PHRASING_TYPES.has(child.type)) {
      buffer.push(child);
    } else {
      flush();
      result.push(child);
    }
  }
  flush();
  return result;
};

/** Transform one node: strip ESM/expressions, resolve JSX elements, recurse into containers. */
const transformNode = (node: RootContent, framework: Framework): RootContent[] => {
  if (isDroppedNodeType(node.type)) {
    return [];
  }
  if (isJsxElement(node)) {
    return transformJsxElement(node, framework);
  }
  if (node.type === 'text') {
    // Collapse the source's hard line-wrapping (soft breaks) to single spaces and drop a space left
    // before punctuation (e.g. by a dropped inline element) — matching the previous renderer and
    // keeping the boilerplate-stripping regexes in `prose.ts` intact.
    node.value = node.value.replace(/\s+/g, ' ').replace(/ ([,.;:!?])/g, '$1');
    return [node];
  }
  if (node.type === 'table') {
    return [tableToMarkdown(node, framework)];
  }
  if (node.type === 'paragraph') {
    return splitParagraphAtBreaks(transformChildren(node, framework));
  }
  if (hasChildren(node)) {
    node.children = transformChildren(node, framework) as typeof node.children;
  }
  return [node];
};

/** Serializer options shared by the full render and the per-cell inline render, so both agree on
 * emphasis/bullet style. */
const TO_MARKDOWN_OPTIONS: Options = {
  extensions: [gfmToMarkdown()],
  bullet: '-',
  listItemIndent: 'one',
  rule: '-',
  ruleRepetition: 3,
  fences: true,
  emphasis: '*',
  strong: '*',
};

/** Serialize inline (phrasing) content to a single markdown line — used for table cells. */
const inlineToMarkdown = (children: RootContent[]): string =>
  toMarkdown(
    {
      type: 'paragraph',
      children: children.map((child) =>
        child.type === 'break' ? { type: 'text', value: ' ' } : child
      ) as PhrasingContent[],
    } as Nodes,
    TO_MARKDOWN_OPTIONS
  )
    .replace(/\n+/g, ' ')
    // A list flattened into a single-line cell leaves `\-` bullet escapes; the leading `-` needs no
    // escaping mid-cell, so restore it.
    .replace(/(^|\s)\\-/g, '$1-')
    .trim();

/**
 * Render a GFM table through the shared `markdownTable` helper so MDX tables match the compact
 * `| --- |` style of the generator's own API tables (`api.ts`) — one table style per file. Emitted as
 * a raw `html` node so the serializer passes it through verbatim.
 */
const tableToMarkdown = (node: Table, framework: Framework): Html => {
  const rows = node.children.map((row) =>
    row.children.map((cell) => escapeCell(inlineToMarkdown(transformChildren(cell, framework))))
  );
  const [header = [], ...body] = rows;
  return { type: 'html', value: markdownTable(header, body) };
};
/** MDX (or plain markdown) source → mdast. Imports/exports and expressions are parsed but never executed. */
export const parseMdxToMdast = (source: string): Root =>
  fromMarkdown(source, {
    extensions: [mdxjs(), gfm()],
    mdastExtensions: [mdxFromMarkdown(), gfmFromMarkdown()],
  });

const normalize = (markdown: string): string => markdown.replace(/\n{3,}/g, '\n\n').trim();

/** Rendered to nothing meaningful: empty, whitespace, or no textual content at all. */
const isMeaningless = (markdown: string): boolean => markdown.length === 0 || !/[A-Za-z0-9]/.test(markdown);

/** Serialize an (already parsed) MDX mdast tree to plain markdown for the target framework. */
const render = (tree: Root, framework: Framework): string => {
  // The parsed tree is cached by the loader and rendered once per framework; transforms mutate nodes
  // in place, so clone first to keep every render independent (and byte-for-byte deterministic).
  const transformed: Root = {
    type: 'root',
    children: transformChildren(structuredClone(tree), framework) as Root['children'],
  };
  return normalize(toMarkdown(transformed as Nodes, TO_MARKDOWN_OPTIONS));
};

/**
 * Renders a storefront MDX tree (component introduction / usage / accessibility / notes / example
 * description) to plain markdown. Pure and synchronous; performs no I/O and imports no built
 * component wrappers — the embedded doc components are resolved structurally from the mdast, not by
 * executing them.
 *
 * Throws when the source renders to nothing meaningful (empty / no textual content): a degraded
 * render would ship an invisible content regression, so the build fails at the exact source. Callers
 * with a designed fallback use {@link tryRenderMdxToMarkdown} instead.
 *
 * @param framework the tree being generated; gates `FrameworkNotification` to the matching content.
 * @param label optional source identifier (e.g. `p-button › usage`) used to give a failure an
 *   actionable message.
 */
export const renderMdxToMarkdown = (tree: Root, framework: Framework = 'js', label?: string): string => {
  const markdown = render(tree, framework);
  if (isMeaningless(markdown)) {
    throw new Error(`MDX rendered to nothing meaningful${label ? ` for ${label}` : ''} — review the source prose.`);
  }
  return markdown;
};

/**
 * Non-throwing variant of {@link renderMdxToMarkdown} for prose whose absence is legitimate and has a
 * designed fallback (e.g. an example's "when to use" cell falling back to the example name). Returns
 * `null` when the source renders to nothing meaningful.
 */
export const tryRenderMdxToMarkdown = (tree: Root, framework: Framework = 'js'): string | null => {
  const markdown = render(tree, framework);
  return isMeaningless(markdown) ? null : markdown;
};
