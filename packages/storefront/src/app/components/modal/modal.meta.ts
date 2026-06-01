import { componentMeta } from '@porsche-design-system/component-meta';
import Accessibility from '@/app/components/modal/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/modal/configurator/introduction.mdx';
import { modalSlotStories, modalStory } from '@/app/components/modal/configurator/story';
import AlertDialogDescription from '@/app/components/modal/examples/alert-dialog/example.mdx';
import { modalStoryAlertDialog } from '@/app/components/modal/examples/alert-dialog/story';
import CustomStylingDescription from '@/app/components/modal/examples/custom-styling/example.mdx';
import { modalStoryCustomStyling } from '@/app/components/modal/examples/custom-styling/story';
import ScrollableDescription from '@/app/components/modal/examples/scrollable/example.mdx';
import { modalStoryScrollable } from '@/app/components/modal/examples/scrollable/story';
import Usage from '@/app/components/modal/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const modalMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: modalStory,
    slotStories: modalSlotStories,
  },
  examples: {
    scrollable: {
      kind: 'story',
      name: 'Scrollable modal with sticky footer',
      description: ScrollableDescription,
      story: modalStoryScrollable,
    },
    alertDialog: {
      kind: 'story',
      name: 'Modal as alert dialog',
      description: AlertDialogDescription,
      story: modalStoryAlertDialog,
    },
    customStyling: {
      kind: 'story',
      name: 'Custom styling',
      description: CustomStylingDescription,
      story: modalStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-modal'],
} satisfies ComponentDocsMeta<'p-modal'>;

