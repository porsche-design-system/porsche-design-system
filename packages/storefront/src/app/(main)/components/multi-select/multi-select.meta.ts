import { componentMeta } from '@porsche-design-system/component-meta';
import {
  multiSelectExampleAsyncFilter,
  multiSelectExampleDynamic,
  multiSelectExampleForm,
  multiSelectExampleSelectedSlot,
} from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/multi-select/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/multi-select/configurator/introduction.mdx';
import { multiSelectSlotStories, multiSelectStory } from '@/app/(main)/components/multi-select/configurator/story';
import AsyncFilterDescription from '@/app/(main)/components/multi-select/examples/async-filter/example.mdx';
import FormDescription from '@/app/(main)/components/multi-select/examples/form/example.mdx';
import OptgroupsDescription from '@/app/(main)/components/multi-select/examples/optgroups/example.mdx';
import { multiSelectStoryOptgroup } from '@/app/(main)/components/multi-select/examples/optgroups/story';
import SelectedSlotDescription from '@/app/(main)/components/multi-select/examples/selected-slot/example.mdx';
import SetValueDescription from '@/app/(main)/components/multi-select/examples/set-value/example.mdx';
import SlotsDescription from '@/app/(main)/components/multi-select/examples/slots/example.mdx';
import { multiSelectStorySlots } from '@/app/(main)/components/multi-select/examples/slots/story';
import Usage from '@/app/(main)/components/multi-select/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const multiSelectMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: multiSelectStory,
    slotStories: multiSelectSlotStories,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: multiSelectExampleForm,
    },
    slots: {
      kind: 'story',
      name: 'Slots',
      description: SlotsDescription,
      story: multiSelectStorySlots,
    },
    setValue: {
      kind: 'example',
      name: 'Set Value',
      description: SetValueDescription,
      example: multiSelectExampleDynamic,
    },
    optgroups: {
      kind: 'story',
      name: 'With optgroups',
      description: OptgroupsDescription,
      story: multiSelectStoryOptgroup,
    },
    asyncFilter: {
      kind: 'example',
      name: 'Custom asynchronous filtering',
      description: AsyncFilterDescription,
      example: multiSelectExampleAsyncFilter,
    },
    selectedSlot: {
      kind: 'example',
      name: 'Custom option rendering',
      description: SelectedSlotDescription,
      example: multiSelectExampleSelectedSlot,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-multi-select'],
} satisfies ComponentDocsMeta<'p-multi-select'>;

