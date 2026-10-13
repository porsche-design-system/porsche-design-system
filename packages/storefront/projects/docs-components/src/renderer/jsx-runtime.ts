/**
 * The JSX runtime the Markdown build compiles MDX against. Like React's, it only describes the tree; `render` walks it
 * later with an explicit context, so there is no global state.
 */

export const ELEMENT = Symbol.for('@porsche-design-system/docs-components/element');
export const Fragment = Symbol.for('@porsche-design-system/docs-components/fragment');

export type ElementType = string | symbol | ((props: any) => unknown);

/** Where the element is in its MDX file, passed by `jsxDEV`. */
export type Source = { fileName?: string; lineNumber?: number; columnNumber?: number };

export type MarkdownElement = {
  $$typeof: typeof ELEMENT;
  type: ElementType;
  props: Record<string, unknown>;
  source?: Source;
};

export const jsx = (type: ElementType, props: Record<string, unknown>): MarkdownElement => ({
  $$typeof: ELEMENT,
  type,
  props,
});

export const jsxs = jsx;

/** The development runtime the Node hook compiles against, so that errors can point to the line in the MDX file. */
export const jsxDEV = (
  type: ElementType,
  props: Record<string, unknown>,
  _key: unknown,
  _isStaticChildren: boolean,
  source?: Source
): MarkdownElement => ({ $$typeof: ELEMENT, type, props, source });

export const isMarkdownElement = (node: unknown): node is MarkdownElement =>
  typeof node === 'object' && node !== null && (node as MarkdownElement).$$typeof === ELEMENT;
