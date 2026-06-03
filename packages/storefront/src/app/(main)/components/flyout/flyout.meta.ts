import { componentMeta } from '@porsche-design-system/component-meta';
import { flyoutExampleForm } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/(main)/components/flyout/accessibility/page.mdx';
import IntroductionDescription from '@/app/(main)/components/flyout/configurator/introduction.mdx';
import { flyoutSlotStories, flyoutStory } from '@/app/(main)/components/flyout/configurator/story';
import CustomStylingDescription from '@/app/(main)/components/flyout/examples/custom-styling/example.mdx';
import { flyoutStoryCustomStyling } from '@/app/(main)/components/flyout/examples/custom-styling/story';
import FormDescription from '@/app/(main)/components/flyout/examples/form/example.mdx';
import StickyTopDescription from '@/app/(main)/components/flyout/examples/sticky-top/example.mdx';
import { flyoutStoryStickyTop } from '@/app/(main)/components/flyout/examples/sticky-top/story';
import Usage from '@/app/(main)/components/flyout/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const flyoutMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: flyoutStory,
    slotStories: flyoutSlotStories,
  },
  examples: {
    stickyTop: {
      kind: 'story',
      name: 'Sticky content with Custom CSS Property (Experimental)',
      description: StickyTopDescription,
      story: flyoutStoryStickyTop,
    },
    form: {
      kind: 'example',
      name: 'Flyout Form',
      description: FormDescription,
      example: flyoutExampleForm,
    },
    customStyling: {
      kind: 'story',
      name: 'Custom Styling',
      description: CustomStylingDescription,
      story: flyoutStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: Accessibility,
  api: componentMeta['p-flyout'],
} satisfies ComponentDocsMeta<'p-flyout'>;

