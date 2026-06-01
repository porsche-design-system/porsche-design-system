import { componentMeta } from '@porsche-design-system/component-meta';
import { checkboxExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/checkbox/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/checkbox/configurator/introduction.mdx';
import { checkboxSlotStories, checkboxStory } from '@/app/components/checkbox/configurator/story';
import FormDescription from '@/app/components/checkbox/examples/form/example.mdx';
import IndeterminateDescription from '@/app/components/checkbox/examples/indeterminate/example.mdx';
import { checkboxStoryIndeterminate } from '@/app/components/checkbox/examples/indeterminate/story';
import SlotsDescription from '@/app/components/checkbox/examples/slots/example.mdx';
import { checkboxStorySlots } from '@/app/components/checkbox/examples/slots/story';
import WrappedLabelDescription from '@/app/components/checkbox/examples/wrapped-label/example.mdx';
import { checkboxStoryWrappedLabel } from '@/app/components/checkbox/examples/wrapped-label/story';
import Usage from '@/app/components/checkbox/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const checkboxMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: checkboxStory,
    slotStories: checkboxSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: checkboxExampleForm,
    },
    indeterminate: {
      kind: 'story',
      name: 'Indeterminate',
      description: IndeterminateDescription,
      story: checkboxStoryIndeterminate,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: checkboxStorySlots,
    },
    wrappedLabel: {
      kind: 'story',
      name: 'Custom wrapped label (🧪Experimental)',
      description: WrappedLabelDescription,
      story: checkboxStoryWrappedLabel,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-checkbox'],
} satisfies ComponentDocsMeta<'p-checkbox'>;

