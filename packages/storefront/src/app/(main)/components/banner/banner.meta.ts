import { componentMeta } from '@porsche-design-system/component-meta';
import { bannerMountedOnlyWhenShownA11yExample } from '@porsche-design-system/examples-stories/components/banner/accessibility/banner-mounted-only-when-shown/example';
import { errorFeedbackWithoutDescriptiveContentA11yExample } from '@porsche-design-system/examples-stories/components/banner/accessibility/error-feedback-without-descriptive-content/example';
import CustomizationDescription from '@porsche-design-system/examples-stories/components/banner/customization/example.mdx';
import { bannerStoryCustomStyling } from '@porsche-design-system/examples-stories/components/banner/customization/story';
import { bannerStory } from '@porsche-design-system/examples-stories/components/banner/default/story';
import AccessibilityOverview from '@/app/(main)/components/banner/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/banner/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/banner/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/banner/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const bannerMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: bannerStory,
  },
  examples: {
    customization: {
      kind: 'story',
      name: 'Customization',
      description: CustomizationDescription,
      story: bannerStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      bannerMountedOnlyWhenShown: bannerMountedOnlyWhenShownA11yExample,
      errorFeedbackWithoutDescriptiveContent: errorFeedbackWithoutDescriptiveContentA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-banner'],
} satisfies ComponentDocsMeta<'p-banner'>;
