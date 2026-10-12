import type { RootContent } from 'mdast';

export type Framework = 'js' | 'angular' | 'react' | 'vue';

/** Where the Markdown is read. Changes only where links and files point, never the content. */
export type Destination = 'skill' | 'web';

export type MarkdownOptions = {
  framework: Framework;
  destination: Destination;
  /** Turns the Storefront's root-relative links into the destination's form. Defaults to leaving them as they are. */
  resolveLink?: (href: string) => string;
};

export type MarkdownContext = Required<MarkdownOptions> & {
  /** Renders MDX children (prose, elements, nested components) to mdast block content. */
  renderChildren: (children: unknown) => RootContent[];
};

export type MarkdownRenderer<P> = (props: P, context: MarkdownContext) => RootContent[];

const MARKDOWN_COMPONENT = Symbol.for('@porsche-design-system/docs-components/markdown-component');

/** Set by the Node hook on every compiled MDX file, so composed MDX renders instead of failing as unregistered. */
export const MDX_CONTENT = Symbol.for('@porsche-design-system/docs-components/mdx-content');

type Definition<P> = { name: string; render: MarkdownRenderer<P> };

export type MarkdownComponent<P> = ((props: P) => null) & { [MARKDOWN_COMPONENT]: Definition<P> };

/**
 * Registers the Markdown implementation of a component. Only components created here (and compiled MDX) may appear in
 * MDX; everything else fails the build.
 */
export const defineMarkdownComponent = <P>(name: string, render: MarkdownRenderer<P>): MarkdownComponent<P> => {
  const component = (() => null) as unknown as MarkdownComponent<P>;
  Object.defineProperty(component, 'name', { value: name });
  component[MARKDOWN_COMPONENT] = { name, render };
  return component;
};

export const getMarkdownDefinition = (type: unknown): Definition<unknown> | undefined =>
  (type as Partial<MarkdownComponent<unknown>>)?.[MARKDOWN_COMPONENT] as Definition<unknown> | undefined;

export const isMdxContent = (type: unknown): boolean =>
  typeof type === 'function' && (type as unknown as Record<symbol, unknown>)[MDX_CONTENT] === true;
