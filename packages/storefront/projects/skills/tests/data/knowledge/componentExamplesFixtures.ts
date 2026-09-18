import type { CodeSample } from '@porsche-design-system/shared';
import type { ComponentExamplesSource } from '@skills/knowledge/components/examples';
import { parseMdxToMdast } from '@skills/knowledge/mdx/renderMdxToMarkdown';
import type { FC } from 'react';
import type { Story } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Representative component examples modelled on real storefront `.meta.ts` sources,
 * exercising every `ExampleMeta` kind plus the configurator base story:
 *  - `p-button`: a base story (→ default example), a `story` example with a rendered
 *    `description`, a hand-authored `example` (`CodeSample`), and a `description`-only
 *    entry (no file).
 *  - `p-accordion`: a base story plus a `story` example with no `description`, so the
 *    "when to use" cell falls back to the example name.
 */
const story = (config: ElementConfig<HTMLTagOrComponent>[]): Story<HTMLTagOrComponent> => ({
  generator: () => config,
});

const buttonBaseStory = story([
  { tag: 'p-button', properties: { variant: 'primary' }, children: ['Save'] } as ElementConfig<HTMLTagOrComponent>,
]);

const buttonLoadingStory = story([
  { tag: 'p-button', properties: { loading: true }, children: ['Loading'] } as ElementConfig<HTMLTagOrComponent>,
]);

const buttonCodeSample: CodeSample = {
  component: (() => null) as FC,
  frameworkMarkup: {
    'vanilla-js': '<p-button type="submit">Submit form</p-button>',
    react: '<PButton type="submit">Submit form</PButton>',
    angular: '<p-button type="submit">Submit form</p-button>',
    vue: '<PButton type="submit">Submit form</PButton>',
  },
};

const accordionBaseStory = story([
  {
    tag: 'p-accordion',
    properties: { heading: 'Section 1' },
    children: ['Panel content'],
  } as ElementConfig<HTMLTagOrComponent>,
]);

const accordionMultipleStory = story([
  {
    tag: 'p-accordion',
    properties: { heading: 'First', open: true },
    children: ['One'],
  } as ElementConfig<HTMLTagOrComponent>,
  { tag: 'p-accordion', properties: { heading: 'Second' }, children: ['Two'] } as ElementConfig<HTMLTagOrComponent>,
]);

export const componentExamplesMeta: Record<string, ComponentExamplesSource> = {
  'p-button': {
    configurator: { story: buttonBaseStory },
    examples: {
      loading: {
        kind: 'story',
        name: 'Loading',
        description: parseMdxToMdast('Use a loading state while an async action is in progress.'),
        story: buttonLoadingStory,
      },
      submitForm: {
        kind: 'example',
        name: 'Submit form',
        description: parseMdxToMdast('Submit the surrounding form when the button is activated.'),
        example: buttonCodeSample,
      },
      formGuidance: {
        kind: 'description',
        name: 'Form association',
        description: parseMdxToMdast('Associate the button with a form by its `id` using the `form` attribute.'),
      },
    },
  },
  'p-accordion': {
    configurator: { story: accordionBaseStory },
    examples: {
      multipleOpen: {
        kind: 'story',
        name: 'Multiple open panels',
        story: accordionMultipleStory,
      },
    },
  },
};
