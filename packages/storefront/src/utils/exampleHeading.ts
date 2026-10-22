/**
 * The heading `<Example>` renders, in one place: the component renders it, and the table of contents
 * (`scripts/generateTableOfContents.ts`) and the MDX tests (`tests/unit/helpers/mdxDocs.ts`) read it from the MDX.
 */

export type ExampleHeadingProps = {
  /** The level of its heading: 3 for an example that belongs to the one before it. */
  level?: 2 | 3;
  /**
   * Its heading where the page names it apart from its title, e.g. "Inline" for "Feedback: Inline", or `false` where
   * the page's own heading names it, as on a page of one example.
   */
  heading?: string | false;
};

/** Its `heading`, else the example's title, at its `level` – none with `heading={false}`. */
export const getExampleHeading = <Title>(
  { level = 2, heading }: ExampleHeadingProps,
  title: Title
): { level: 2 | 3; text: string | Title } | undefined =>
  heading === false ? undefined : { level, text: heading ?? title };

/** An attribute of a JSX element in the MDX syntax tree. */
export type MdxJsxAttribute = { type: string; name?: string; value?: unknown };

const attributeValue = (attributes: MdxJsxAttribute[], name: string): unknown =>
  attributes.find((attribute) => attribute.type === 'mdxJsxAttribute' && attribute.name === name)?.value;

/** The source of an attribute written as an expression, `level={3}` → `3`. */
const expressionOf = (value: unknown): string | undefined =>
  value && typeof value === 'object' && 'value' in value && typeof value.value === 'string'
    ? value.value.trim()
    : undefined;

/**
 * The props of an `<Example>` as its MDX writes them: the name of its `example={…}`, and `heading="…"`,
 * `heading={false}` and `level={…}`. Fails for an attribute it can't read, so no heading goes unnoticed.
 */
export const readExampleProps = (
  attributes: MdxJsxAttribute[]
): ExampleHeadingProps & { example: string | undefined } => {
  const heading = attributeValue(attributes, 'heading');
  const level = attributeValue(attributes, 'level');
  const props: ExampleHeadingProps & { example: string | undefined } = {
    example: expressionOf(attributeValue(attributes, 'example')),
  };

  if (typeof heading === 'string') {
    props.heading = heading;
  } else if (heading !== undefined) {
    if (expressionOf(heading) !== 'false') {
      throw new Error('<Example> takes a string or {false} as its heading');
    }
    props.heading = false;
  }
  if (level !== undefined) {
    const value = expressionOf(level);
    if (value !== '2' && value !== '3') {
      throw new Error('<Example> takes {2} or {3} as its level');
    }
    props.level = value === '3' ? 3 : 2;
  }
  return props;
};
