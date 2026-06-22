import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonExampleForm, buttonExampleFormAttribute } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/button/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/button/configurator/introduction.mdx';
import { buttonStory } from '@/app/(main)/components/button/configurator/story';
import FormAttributeDescription from '@/app/(main)/components/button/examples/form-attribute/example.mdx';
import FormDescription from '@/app/(main)/components/button/examples/form/example.mdx';
import Usage from '@/app/(main)/components/button/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: buttonStory,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: buttonExampleForm,
    },
    formAttribute: {
      kind: 'example',
      name: 'Form Attribute',
      description: FormAttributeDescription,
      example: buttonExampleFormAttribute,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-button'],
} satisfies ComponentDocsMeta<'p-button'>;

