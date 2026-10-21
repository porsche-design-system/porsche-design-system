import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-stories/components/wordmark/accessibility/aria-on-component-host-vs-aria-prop/example';
import { linkedWordmarkWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-stories/components/wordmark/accessibility/linked-wordmark-without-accessible-name/example';
import CustomClickableAreaDescription from '@porsche-design-system/examples-stories/components/wordmark/custom-clickable-area/example.mdx';
import { wordmarkStoryCustomPadding } from '@porsche-design-system/examples-stories/components/wordmark/custom-clickable-area/story';
import { wordmarkStory } from '@porsche-design-system/examples-stories/components/wordmark/default/story';
import SizeDescription from '@porsche-design-system/examples-stories/components/wordmark/size/example.mdx';
import { wordmarkStorySizeInherit } from '@porsche-design-system/examples-stories/components/wordmark/size/story';
import AccessibilityOverview from '@/app/(main)/components/wordmark/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/wordmark/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/wordmark/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/wordmark/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const wordmarkMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: wordmarkStory,
  },
  examples: {
    size: {
      kind: 'story',
      name: 'Size',
      description: SizeDescription,
      story: wordmarkStorySizeInherit,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: wordmarkStoryCustomPadding,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      linkedWordmarkWithoutAccessibleName: linkedWordmarkWithoutAccessibleNameA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-wordmark'],
} satisfies ComponentDocsMeta<'p-wordmark'>;
