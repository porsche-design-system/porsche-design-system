import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonPureExampleForm, buttonPureExampleFormAttribute } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/button-pure/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/button-pure/configurator/introduction.mdx';
import { buttonPureStory } from '@/app/components/button-pure/configurator/story';
import CustomClickableAreaDescription from '@/app/components/button-pure/examples/custom-clickable-area/example.mdx';
import { buttonPureStoryCustomPadding } from '@/app/components/button-pure/examples/custom-clickable-area/story';
import FormAttributeDescription from '@/app/components/button-pure/examples/form-attribute/example.mdx';
import FormDescription from '@/app/components/button-pure/examples/form/example.mdx';
import Usage from '@/app/components/button-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonPureMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: buttonPureStory,
  },
  examples: {
    customClickableArea: {
      kind: 'story',
      name: 'Button Pure with custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: buttonPureStoryCustomPadding,
    },
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: buttonPureExampleForm,
    },
    formAttribute: {
      kind: 'example',
      name: 'Form Attribute',
      description: FormAttributeDescription,
      example: buttonPureExampleFormAttribute,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-button-pure'],
} satisfies ComponentDocsMeta<'p-button-pure'>;

