import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/crest/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import AccessibilityOverview from '@/app/(main)/components/crest/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/crest/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/crest/configurator/introduction.mdx';
import { crestStory } from '@/app/(main)/components/crest/configurator/story';
import CustomClickableAreaDescription from '@/app/(main)/components/crest/examples/custom-clickable-area/example.mdx';
import { crestStoryCustomPadding } from '@/app/(main)/components/crest/examples/custom-clickable-area/story';
import LinkDescription from '@/app/(main)/components/crest/examples/link/example.mdx';
import { crestStoryLink } from '@/app/(main)/components/crest/examples/link/story';
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
