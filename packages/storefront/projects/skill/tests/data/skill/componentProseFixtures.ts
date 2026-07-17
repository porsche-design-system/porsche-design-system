import type { ComponentProseSource } from '@skill/components/prose';
import { parseMdxToMdast } from '@skill/support/renderMdxToMarkdown';

/**
 * Representative component prose modelled on real storefront `.meta.ts` sources:
 * `introduction` is a lead paragraph with no heading; `usage` / `accessibility`
 * `page.mdx` files each open with a redundant `# <Component>` H1 that the generator
 * strips. `p-degraded` has an introduction that renders to nothing meaningful,
 * exercising the fail-hard degraded-render error.
 */
const RAW_FIXTURES: Record<
  string,
  {
    introduction: string;
    usage: string;
    accessibility: string;
    notes?: Record<string, { name: string; description: string }>;
  }
> = {
  'p-button': {
    introduction: `
The \`p-button\` component is essential for performing **interaction** events such as submitting a form. Whenever you want to provide navigational elements, use the [Link](/components/link/) component instead.
`,
    usage: `
# Button <ComponentStatus tagName="p-button"></ComponentStatus>

<TableOfContents headings={['Usage']} />

## Usage

Guidance on how to use this component in different situations.

### Do:

- Use buttons for actions with clear consequences.

### Don't:

- Don't use a button for navigation.
`,
    accessibility: `
# Button <ComponentStatus tagName="p-button"></ComponentStatus>

## Accessibility support

The component follows the [WAI-ARIA Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

1. Tab moves focus to the button.
2. Enter or Space activates it.
`,
    notes: {
      formAttribute: {
        name: 'Form attribute',
        description: `
Use the \`form\` attribute to associate the button with a form by its \`id\`.
`,
      },
    },
  },

  'p-accordion': {
    introduction: `
The **Accordion** lets users expand and collapse sections of *related* content to reduce visual clutter.
`,
    usage: `
# Accordion <ComponentStatus tagName="p-accordion"></ComponentStatus>

## Usage

- Group related content together within each panel.
`,
    accessibility: `
# Accordion <ComponentStatus tagName="p-accordion"></ComponentStatus>

## Accessibility support

Each panel must have a meaningful, unique label.

## Integration examples

<A11yIntegrationExamples examples={accordionA11yExamples} />

## Tests

| Technology | Support |
| --- | --- |
| AXE-Core | ✅ |
`,
  },

  'p-degraded': {
    introduction: `
<TableOfContents headings={[]} />
`,
    usage: `
# Degraded

## Usage

Minimal usage prose.
`,
    accessibility: `
# Degraded

## Accessibility support

Minimal accessibility prose.
`,
  },
};

export const componentDocsMeta: Record<string, ComponentProseSource> = Object.fromEntries(
  Object.entries(RAW_FIXTURES).map(([tag, raw]) => [
    tag,
    {
      introduction: parseMdxToMdast(raw.introduction),
      usage: parseMdxToMdast(raw.usage),
      accessibility: parseMdxToMdast(raw.accessibility),
      ...(raw.notes && {
        notes: Object.fromEntries(
          Object.entries(raw.notes).map(([key, note]) => [
            key,
            { name: note.name, description: parseMdxToMdast(note.description) },
          ])
        ),
      }),
    },
  ])
);
