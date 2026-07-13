import type { Root } from 'mdast';
import { parseMdxToMdast } from '@/lib/skill/support/renderMdxToMarkdown';

/**
 * Representative storefront component prose, modelled on real component `page.mdx`
 * files (e.g. accordion `usage`, `accessibility`, component `introduction`). Embedded
 * doc components (`<ComponentStatus>`, `<TableOfContents>`, `<Notification>`) are
 * referenced the way the storefront uses them; their `import` lines are omitted so
 * `evaluate` resolves them through the `components` prop. The render module nulls the
 * chrome components (`<ComponentStatus>`, `<TableOfContents>`) but keeps `<Notification>`,
 * which it surfaces as a blockquote admonition.
 */
export const PROSE_FIXTURES: Record<string, string> = {
  usage: `
# Accordion <ComponentStatus tagName="p-accordion"></ComponentStatus>

<TableOfContents headings={[]} />

## Usage

The following section provides guidance on how to use this component in different situations.

### Do:

- Use accordions to organize and display large amounts of content in a structured way.
- Group **related** content together within each accordion panel.
- Use the \`heading\` prop for clear and concise headings.

### Don't:

- Don't use accordions for content that is essential for users to see.
- Don't overload the accordion panels with too much content.
`,

  accessibility: `
## Accessibility

The component follows the [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

Keyboard interaction is fully supported:

1. Tab moves focus to the next accordion header.
2. Enter or Space toggles the focused panel.

Make sure each panel has a meaningful, *unique* label so assistive technology can announce it.
`,

  introduction: `
<Notification heading="Note">This component is stable.</Notification>

The **Accordion** lets users expand and collapse sections of related content to reduce visual clutter.

Use it to present grouped information progressively. A minimal example:

\`\`\`html
<p-accordion heading="Section 1">Panel content</p-accordion>
\`\`\`
`,

  // Renders to nothing meaningful — only a nulled chrome component, no prose.
  degraded: `
<TableOfContents headings={[]} />
`,
};

/** Parses an MDX source string into its mdast tree, mirroring the skill build (see skill-mdx-loader.cjs). */
export const compileMdx = (source: string): Root => parseMdxToMdast(source);
