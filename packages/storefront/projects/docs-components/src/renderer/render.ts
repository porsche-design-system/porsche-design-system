import type { ElementContent, Properties } from 'hast';
import { toMdast } from 'hast-util-to-mdast';
import type { Root, RootContent } from 'mdast';
import { gfmToMarkdown } from 'mdast-util-gfm';
import { type Options, toMarkdown } from 'mdast-util-to-markdown';
import { getMarkdownDefinition, isMdxContent, type MarkdownContext, type MarkdownOptions } from './define';
import { Fragment, isMarkdownElement, type MarkdownElement } from './jsx-runtime';

/**
 * The HTML elements MDX emits for Markdown syntax, plus `div` and `span` as plain containers. Anything else in MDX
 * (`input`, `button`, …) is a live demo and has no meaning in Markdown, so it fails the build.
 */
const ALLOWED_ELEMENTS = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'a',
  'img',
  'strong',
  'b',
  'em',
  'i',
  'del',
  'code',
  'pre',
  'br',
  'hr',
  'blockquote',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'div',
  'span',
]);

/** A registered component's mdast output, carried through the hast tree until the final conversion. */
type EmbeddedMdast = { type: 'mdast'; nodes: RootContent[] };

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

const toProperties = (props: Record<string, unknown>): Properties => {
  const properties: Properties = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'children' || value === undefined || value === null) {
      continue;
    }
    if (key === 'className' && typeof value === 'string') {
      properties.className = value.split(/\s+/);
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      properties[key] = value;
    }
  }
  return properties;
};

/** React's `forwardRef` and `memo` components are objects, so their name is on `displayName` or the wrapped function. */
const componentName = (type: unknown): string => {
  const candidate = type as { name?: string; displayName?: string; render?: { name?: string } };
  return candidate?.displayName || candidate?.name || candidate?.render?.name || 'anonymous';
};

const position = ({ source }: MarkdownElement): string =>
  source?.fileName ? ` (${source.fileName}:${source.lineNumber}:${source.columnNumber})` : '';

const toHast = (node: unknown, context: MarkdownContext): ElementContent[] => {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return [];
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return [{ type: 'text', value: String(node) }];
  }
  if (Array.isArray(node)) {
    return node.flatMap((child) => toHast(child, context));
  }
  if (!isMarkdownElement(node)) {
    throw new Error(`Unsupported value in MDX: ${JSON.stringify(node)}`);
  }

  const { type, props } = node;
  if (type === Fragment) {
    return toHast(props.children, context);
  }
  if (typeof type === 'string') {
    if (!ALLOWED_ELEMENTS.has(type)) {
      throw new Error(
        `HTML element <${type}> is not allowed in MDX${position(node)}. ` +
          'Use a component of @porsche-design-system/docs-components instead.'
      );
    }
    return [
      {
        type: 'element',
        tagName: type,
        properties: toProperties(props),
        children: toHast(props.children, context),
      },
    ];
  }
  if (isMdxContent(type)) {
    return toHast((type as (props: unknown) => unknown)(props), context);
  }
  const definition = getMarkdownDefinition(type);
  if (definition) {
    const embedded: EmbeddedMdast = { type: 'mdast', nodes: definition.render(props, context) };
    return [embedded as unknown as ElementContent];
  }
  throw new Error(
    `Unregistered component "${componentName(type)}" in MDX${position(node)}. ` +
      'Import it from @porsche-design-system/docs-components, ' +
      'which renders it to React and to Markdown.'
  );
};

const hastToMdast = (children: ElementContent[]): RootContent[] =>
  (
    toMdast(
      { type: 'root', children },
      { document: true, nodeHandlers: { mdast: (_state, node) => (node as EmbeddedMdast).nodes } }
    ) as Root
  ).children;

const createContext = ({ framework }: MarkdownOptions): MarkdownContext => {
  const context: MarkdownContext = {
    framework,
    renderChildren: (children) => hastToMdast(toHast(children, context)),
  };
  return context;
};

export const renderToMdast = (element: unknown, options: MarkdownOptions): Root => ({
  type: 'root',
  children: createContext(options).renderChildren(element),
});

export const serializeMarkdown = (tree: Root): string => `${toMarkdown(tree, TO_MARKDOWN_OPTIONS).trim()}\n`;

export const renderToMarkdown = (element: unknown, options: MarkdownOptions): string =>
  serializeMarkdown(renderToMdast(element, options));
