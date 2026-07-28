import { componentMeta } from '@porsche-design-system/component-meta';
import { dismissButtonAriaOnHostVsAriaPropA11yExample } from '@/app/(main)/components/tag-dismissible/accessibility/examples/dismiss-button-aria-on-host-vs-aria-prop/example';
import { tagWithoutDescriptiveLabelA11yExample } from '@/app/(main)/components/tag-dismissible/accessibility/examples/tag-without-descriptive-label/example';
import AccessibilityOverview from '@/app/(main)/components/tag-dismissible/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/tag-dismissible/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/tag-dismissible/configurator/introduction.mdx';
import { tagDismissibleStory } from '@/app/(main)/components/tag-dismissible/configurator/story';
import Usage from '@/app/(main)/components/tag-dismissible/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tagDismissibleMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tagDismissibleStory,
  },
  examples: {},
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      dismissButtonAriaOnHostVsAriaProp: dismissButtonAriaOnHostVsAriaPropA11yExample,
      tagWithoutDescriptiveLabel: tagWithoutDescriptiveLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-tag-dismissible'],
} satisfies ComponentDocsMeta<'p-tag-dismissible'>;
