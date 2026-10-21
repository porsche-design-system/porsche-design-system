import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/crest/accessibility/aria-on-component-host-vs-aria-prop/example';
import CustomClickableAreaDescription from '@porsche-design-system/examples-stories/components/crest/custom-clickable-area/example.mdx';
import { crestStoryCustomPadding } from '@porsche-design-system/examples-stories/components/crest/custom-clickable-area/story';
import { crestStory } from '@porsche-design-system/examples-stories/components/crest/default/story';
import LinkDescription from '@porsche-design-system/examples-stories/components/crest/link/example.mdx';
import { crestStoryLink } from '@porsche-design-system/examples-stories/components/crest/link/story';
import AccessibilityOverview from '@/app/(main)/components/crest/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/crest/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/crest/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/crest/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const crestMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: crestStory,
  },
  examples: {
    link: {
      kind: 'story',
      name: 'Link',
      description: LinkDescription,
      story: crestStoryLink,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: crestStoryCustomPadding,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-crest'],
} satisfies ComponentDocsMeta<'p-crest'>;
