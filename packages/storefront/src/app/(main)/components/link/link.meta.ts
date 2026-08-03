import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/link/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyLinkWithoutAccessibleNameA11yExample } from '@/app/(main)/components/link/accessibility/examples/icon-only-link-without-accessible-name/example';
import { indicatingTheCurrentPageA11yExample } from '@/app/(main)/components/link/accessibility/examples/indicating-the-current-page/example';
import { vagueLinkLabelWithoutContextA11yExample } from '@/app/(main)/components/link/accessibility/examples/vague-link-label-without-context/example';
import AccessibilityOverview from '@/app/(main)/components/link/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link/configurator/introduction.mdx';
import { linkSlotStories, linkStory } from '@/app/(main)/components/link/configurator/story';
import FrameworkRoutingDescription from '@/app/(main)/components/link/examples/framework-routing/example.mdx';
import { linkStoryFrameworkRouting } from '@/app/(main)/components/link/examples/framework-routing/story';
import IconDescription from '@/app/(main)/components/link/examples/icon/example.mdx';
import { linkStoryIcon } from '@/app/(main)/components/link/examples/icon/story';
import Usage from '@/app/(main)/components/link/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkStory,
    slotStories: linkSlotStories,
  },
  examples: {
    frameworkRouting: {
      kind: 'story',
      name: 'Framework routing (anchor nesting)',
      description: FrameworkRoutingDescription,
      story: linkStoryFrameworkRouting,
    },
    icon: {
      kind: 'story',
      name: 'Link with specific icon',
      description: IconDescription,
      story: linkStoryIcon,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      iconOnlyLinkWithoutAccessibleName: iconOnlyLinkWithoutAccessibleNameA11yExample,
      indicatingTheCurrentPage: indicatingTheCurrentPageA11yExample,
      vagueLinkLabelWithoutContext: vagueLinkLabelWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-link'],
} satisfies ComponentDocsMeta<'p-link'>;
