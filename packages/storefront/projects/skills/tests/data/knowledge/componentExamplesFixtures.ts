import {
  type ElementConfig,
  getStoryMarkup,
  type HTMLTagOrComponent,
  type Story,
} from '@porsche-design-system/story-generator';
import type { ComponentExamplesSource } from '@skills/knowledge/components/examples';
import { parseMdxToMdast } from '@skills/knowledge/mdx/renderMdxToMarkdown';

/**
 * Representative component examples as the catalogue resolves them for the skill, its stories' code
 * generated as the catalogue does (light color scheme):
 *  - `p-button`: a default story, a story example with a rendered `description` and a hand-written
 *    framework example.
 *  - `p-accordion`: a default story plus a story example with no `description`, so the
 *    "when to use" cell falls back to the example title.
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

const code = (value: Story<HTMLTagOrComponent>) => getStoryMarkup(value, { colorScheme: 'scheme-light' });

const buttonFrameworkCode = {
  'vanilla-js': '<p-button type="submit">Submit form</p-button>',
  react: '<PButton type="submit">Submit form</PButton>',
  angular: '<p-button type="submit">Submit form</p-button>',
  vue: '<PButton type="submit">Submit form</PButton>',
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
    configurator: { id: 'components/button/default', title: 'Default', code: code(buttonBaseStory) },
    examples: [
      {
        id: 'components/button/loading',
        title: 'Loading',
        description: parseMdxToMdast('Use a loading state while an async action is in progress.'),
        code: code(buttonLoadingStory),
      },
      {
        id: 'components/button/submit-form',
        title: 'Submit form',
        description: parseMdxToMdast('Submit the surrounding form when the button is activated.'),
        code: buttonFrameworkCode,
      },
    ],
  },
  'p-accordion': {
    configurator: { id: 'components/accordion/default', title: 'Default', code: code(accordionBaseStory) },
    examples: [
      { id: 'components/accordion/multiple-open', title: 'Multiple open panels', code: code(accordionMultipleStory) },
    ],
  },
};
