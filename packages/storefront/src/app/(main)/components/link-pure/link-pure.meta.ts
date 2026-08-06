import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/link-pure/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyLinkWithoutAccessibleNameA11yExample } from '@/app/(main)/components/link-pure/accessibility/examples/icon-only-link-without-accessible-name/example';
import { indicatingTheCurrentPageA11yExample } from '@/app/(main)/components/link-pure/accessibility/examples/indicating-the-current-page/example';
import { vagueLinkLabelWithoutContextA11yExample } from '@/app/(main)/components/link-pure/accessibility/examples/vague-link-label-without-context/example';
import AccessibilityOverview from '@/app/(main)/components/link-pure/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-pure/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-pure/configurator/introduction.mdx';
import { linkPureStory } from '@/app/(main)/components/link-pure/configurator/story';
import CustomClickableAreaDescription from '@/app/(main)/components/link-pure/examples/custom-clickable-area/example.mdx';
import { linkPureCustomPadding } from '@/app/(main)/components/link-pure/examples/custom-clickable-area/story';
import FrameworkRoutingDescription from '@/app/(main)/components/link-pure/examples/framework-routing/example.mdx';
import { linkPureStoryFrameworkRouting } from '@/app/(main)/components/link-pure/examples/framework-routing/story';
import FrameworkRoutingActiveStateDescription from '@/app/(main)/components/link-pure/examples/framework-routing-active-state/example.mdx';
import IconDescription from '@/app/(main)/components/link-pure/examples/icon/example.mdx';
import { linkPureStoryIcon } from '@/app/(main)/components/link-pure/examples/icon/story';
import Usage from '@/app/(main)/components/link-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkPureMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: linkPureStory,
  },
  examples: {
    icon: {
      kind: 'story',
      name: 'Link with specific icon',
      description: IconDescription,
      story: linkPureStoryIcon,
    },
    frameworkRouting: {
      kind: 'story',
      name: 'Framework routing (anchor nesting)',
      description: FrameworkRoutingDescription,
      story: linkPureStoryFrameworkRouting,
    },
    frameworkRoutingActiveState: {
      kind: 'description',
      name: 'Framework specific router with "active state" support',
      description: FrameworkRoutingActiveStateDescription,
    },
    customClickableArea: {
      kind: 'story',
      name: 'Link Pure with custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: linkPureCustomPadding,
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
  api: componentMeta['p-link-pure'],
} satisfies ComponentDocsMeta<'p-link-pure'>;
