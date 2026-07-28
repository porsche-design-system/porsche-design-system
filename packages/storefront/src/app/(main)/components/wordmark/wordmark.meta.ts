import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/wordmark/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { linkedWordmarkWithoutAccessibleNameA11yExample } from '@/app/(main)/components/wordmark/accessibility/examples/linked-wordmark-without-accessible-name/example';
import AccessibilityOverview from '@/app/(main)/components/wordmark/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/wordmark/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/wordmark/configurator/introduction.mdx';
import { wordmarkStory } from '@/app/(main)/components/wordmark/configurator/story';
import CustomClickableAreaDescription from '@/app/(main)/components/wordmark/examples/custom-clickable-area/example.mdx';
import { wordmarkStoryCustomPadding } from '@/app/(main)/components/wordmark/examples/custom-clickable-area/story';
import SizeDescription from '@/app/(main)/components/wordmark/examples/size/example.mdx';
import { wordmarkStorySizeInherit } from '@/app/(main)/components/wordmark/examples/size/story';
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
