import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/link-pure/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/link-pure/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/link-pure/configurator/introduction.mdx';
import FrameworkRoutingActiveStateDescription from '@/app/(main)/components/link-pure/examples/framework-routing-active-state/example.mdx';
import Usage from '@/app/(main)/components/link-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const linkPureMeta = {
  introduction: IntroductionDescription,
  configurator: 'components/link-pure/default',
  examples: [
    'components/link-pure/icon',
    'components/link-pure/framework-routing',
    'components/link-pure/custom-clickable-area',
  ],
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: [
      'components/link-pure/accessibility/aria-on-component-host-vs-aria-prop',
      'components/link-pure/accessibility/icon-only-link-without-accessible-name',
      'components/link-pure/accessibility/indicating-the-current-page',
      'components/link-pure/accessibility/vague-link-label-without-context',
    ],
    tests: AccessibilityTests,
  },
  notes: {
    frameworkRoutingActiveState: {
      name: 'Framework specific router with "active state" support',
      description: FrameworkRoutingActiveStateDescription,
    },
  },
  api: componentMeta['p-link-pure'],
} satisfies ComponentDocsMeta<'p-link-pure'>;
