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
import { escapeCell, markdownTable } from '../../shared/markdown';
import type { Framework } from '../../shared/skillTree';

/** Maps the skill's `js` identifier to the storefront's `vanilla-js`. */
const STOREFRONT_FRAMEWORK: Record<Framework, StorefrontFramework> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

const NOTIFICATION_COMPONENTS = new Set(['Notification', 'FrameworkNotification']);

type MdxJsxElement = MdxJsxFlowElement | MdxJsxTextElement;

const isJsxElement = (node: RootContent): node is MdxJsxElement =>
  node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement';

const isDroppedNodeType = (type: string): boolean =>
  type === 'mdxjsEsm' || type === 'mdxFlowExpression' || type === 'mdxTextExpression' || type === 'yaml';

const hasChildren = (node: unknown): node is Parent =>
  typeof node === 'object' && node !== null && Array.isArray((node as Parent).children);

const attribute = (node: MdxJsxElement, name: string): MdxJsxAttribute | undefined =>
  node.attributes.find((attr): attr is MdxJsxAttribute => attr.type === 'mdxJsxAttribute' && attr.name === name);

const stringAttribute = (node: MdxJsxElement, name: string): string | undefined => {
  const value = attribute(node, name)?.value;
  return typeof value === 'string' ? value : undefined;
};

/**
 * Reads literal framework names without evaluating the MDX expression. Invalid input matches no
 * framework.
 */
const showForFrameworks = (node: MdxJsxElement): StorefrontFramework[] => {
  const expression = attribute(node, 'showForFrameworks')?.value;
  const raw = typeof expression === 'object' && expression ? expression.value : '';
  return [...raw.matchAll(/'([^']+)'|"([^"]+)"/g)].map((match) => (match[1] ?? match[2]) as StorefrontFramework);
};

const toLink = (node: MdxJsxElement, framework: Framework): Link => ({
  type: 'link',
  url: stringAttribute(node, 'href') ?? '',
  children: transformChildren(node, framework) as Link['children'],
});

/**
 * Converts notifications to blockquotes and drops framework-gated content from other variants.
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

const isCustomElement = (name: string): boolean => name.includes('-');

// Live-demo elements do not contribute documentation prose.
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

const buildList = (node: MdxJsxElement, ordered: boolean, framework: Framework): List => ({
  type: 'list',
  ordered,
  spread: false,
  children: transformChildren(node, framework).filter((child): child is ListItem => child.type === 'listItem'),
});

/**
 * Converts semantic HTML to mdast, drops live-demo elements, and preserves prose from unknown
 * wrappers.
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
  return transformChildren(node, framework);
};

const transformJsxElement = (node: MdxJsxElement, framework: Framework): RootContent[] => {
  const name = node.name;
  if (name === null) {
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
    return [];
  }
  if (name[0] === name[0]?.toLowerCase()) {
    return transformHtmlElement(node, framework);
  }
  return [];
};

/** Containers trimmed after dropping inline JSX elements. */
const EDGE_TRIMMED = new Set(['heading', 'paragraph', 'tableCell']);

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
 * Repairs whitespace between text nodes left by removed inline elements.
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

const transformChildren = (node: Parent, framework: Framework): RootContent[] => {
  const children = mergeAdjacentText(node.children.flatMap((child) => transformNode(child as RootContent, framework)));
  return EDGE_TRIMMED.has(node.type) ? trimEdgeWhitespace(children) : children;
};

/**
 * Converts hard breaks into paragraphs so blockquotes and lists retain valid block children.
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
 * Wraps loose phrasing content into valid block children.
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

const transformNode = (node: RootContent, framework: Framework): RootContent[] => {
  if (isDroppedNodeType(node.type)) {
    return [];
  }
  if (isJsxElement(node)) {
    return transformJsxElement(node, framework);
  }
  if (node.type === 'text') {
    // Preserve normalized prose after source wrapping and inline element removal.
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
    // Markdown escapes flattened list markers unnecessarily inside table cells.
    .replace(/(^|\s)\\-/g, '$1-')
    .trim();

/**
 * Uses the shared table renderer so converted MDX and generated API tables have identical syntax.
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

const isMeaningless = (markdown: string): boolean => markdown.length === 0 || !/[A-Za-z0-9]/.test(markdown);

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
 * Renders storefront MDX structurally without executing components. Throws when no meaningful prose
 * remains; callers with a designed fallback use {@link tryRenderMdxToMarkdown}.
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
 * Non-throwing variant for optional prose; returns `null` when no meaningful content remains.
 */
export const tryRenderMdxToMarkdown = (tree: Root, framework: Framework = 'js'): string | null => {
  const markdown = render(tree, framework);
  return isMeaningless(markdown) ? null : markdown;
};
