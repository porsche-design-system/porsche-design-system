import type { ComponentProseSource } from '@skills/knowledge/components/prose';
import { parseMdxToMdast } from '@skills/knowledge/mdx/renderMdxToMarkdown';
import type { A11yElementConfig } from '@/models/accessibilityMeta';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Representative component prose modelled on real storefront `.meta.ts` sources: `introduction` is a
 * lead paragraph with no heading; `usage` still opens with a redundant `# <Component>` H1 that the
 * generator strips. Accessibility is modelled on the post-migration shape — `overview` (and `tests`)
 * are plain prose with no leading H1 (the storefront's thin `accessibility/page.mdx` keeps the H1),
 * and `examples` is the keyed anti-pattern/recommended map rendered inline by
 * `renderA11yIntegrationExamples`. `p-degraded` has an introduction that renders to nothing
 * meaningful, exercising the fail-hard degraded-render error.
 */

const story = (config: A11yElementConfig<HTMLTagOrComponent>[]) => ({ generator: () => config });

const RAW_FIXTURES: Record<
  string,
  {
    introduction: string;
    usage: string;
    accessibility: {
      overview: string;
      examples?: Record<
        string,
        {
          name: string;
          antiPattern: A11yElementConfig<HTMLTagOrComponent>[];
          recommended: A11yElementConfig<HTMLTagOrComponent>[];
        }
      >;
      tests: string;
    };
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
    accessibility: {
      overview: `
## Accessibility support

The component follows the [WAI-ARIA Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/).

1. Tab moves focus to the button.
2. Enter or Space activates it.
`,
      tests: `
## Tests

| Technology | Support |
| --- | --- |
| AXE-Core | ✅ |
`,
    },
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
    accessibility: {
      overview: `
## Accessibility support

Each panel must have a meaningful, unique label.
`,
      examples: {
        accordionSummaryWithoutSemanticHeading: {
          name: 'Accordion summary without semantic heading',
          antiPattern: [
            {
              tag: 'p-accordion',
              children: [
                { tag: 'span', properties: { slot: 'summary' }, children: ['Delivery options'] },
                { tag: 'p-text', children: ['Content'] },
              ],
            },
          ],
          recommended: [
            {
              tag: 'p-accordion',
              children: [
                {
                  tag: 'p-heading',
                  properties: { slot: 'summary', tag: 'h2', size: 'sm' },
                  children: ['Delivery options'],
                },
                { tag: 'p-text', children: ['Content'] },
              ],
            },
          ],
        },
      },
      tests: `
## Tests

| Technology | Support |
| --- | --- |
| AXE-Core | ✅ |
`,
    },
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
    accessibility: {
      overview: `
## Accessibility support

Minimal accessibility prose.
`,
      tests: `
## Tests

| Technology | Support |
| --- | --- |
| AXE-Core | ✅ |
`,
    },
  },
};

export const componentDocsMeta: Record<string, ComponentProseSource> = Object.fromEntries(
  Object.entries(RAW_FIXTURES).map(([tag, raw]) => [
    tag,
    {
      introduction: parseMdxToMdast(raw.introduction),
      usage: parseMdxToMdast(raw.usage),
      accessibility: {
        overview: parseMdxToMdast(raw.accessibility.overview),
        examples: Object.fromEntries(
          Object.entries(raw.accessibility.examples ?? {}).map(([key, example]) => [
            key,
            {
              name: example.name,
              antiPattern: { kind: 'story' as const, story: story(example.antiPattern) },
              recommended: { kind: 'story' as const, story: story(example.recommended) },
            },
          ])
        ),
        tests: parseMdxToMdast(raw.accessibility.tests),
      },
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
