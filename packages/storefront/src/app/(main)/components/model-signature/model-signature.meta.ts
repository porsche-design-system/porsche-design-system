import { componentMeta } from '@porsche-design-system/component-meta';
import CustomStylingDescription from '@porsche-design-system/examples-stories/components/model-signature/custom-styling/example.mdx';
import { modelSignatureStoryCustomStyling } from '@porsche-design-system/examples-stories/components/model-signature/custom-styling/story';
import { modelSignatureStory } from '@porsche-design-system/examples-stories/components/model-signature/default/story';
import MaskBlendModeDescription from '@porsche-design-system/examples-stories/components/model-signature/mask-blend-mode/example.mdx';
import { modelSignatureStoryMaskBlendMode } from '@porsche-design-system/examples-stories/components/model-signature/mask-blend-mode/story';
import MaskImageDescription from '@porsche-design-system/examples-stories/components/model-signature/mask-image/example.mdx';
import { modelSignatureStoryMaskImage } from '@porsche-design-system/examples-stories/components/model-signature/mask-image/story';
import MaskVideoDescription from '@porsche-design-system/examples-stories/components/model-signature/mask-video/example.mdx';
import { modelSignatureStoryMaskVideo } from '@porsche-design-system/examples-stories/components/model-signature/mask-video/story';
import SafeZoneDescription from '@porsche-design-system/examples-stories/components/model-signature/safe-zone/example.mdx';
import { modelSignatureStorySafeZone } from '@porsche-design-system/examples-stories/components/model-signature/safe-zone/story';
import AccessibilityOverview from '@/app/(main)/components/model-signature/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/model-signature/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/model-signature/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/model-signature/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const modelSignatureMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: modelSignatureStory,
  },
  examples: {
    safeZone: {
      kind: 'story',
      name: 'Safe Zone',
      description: SafeZoneDescription,
      story: modelSignatureStorySafeZone,
    },
    maskBlendMode: {
      kind: 'story',
      name: 'Mask: Blend Mode',
      description: MaskBlendModeDescription,
      story: modelSignatureStoryMaskBlendMode,
    },
    maskImage: {
      kind: 'story',
      name: 'Mask: Image',
      description: MaskImageDescription,
      story: modelSignatureStoryMaskImage,
    },
    maskVideo: {
      kind: 'story',
      name: 'Mask: Video',
      description: MaskVideoDescription,
      story: modelSignatureStoryMaskVideo,
    },
    customStyling: {
      kind: 'story',
      name: 'Custom styling',
      description: CustomStylingDescription,
      story: modelSignatureStoryCustomStyling,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-model-signature'],
} satisfies ComponentDocsMeta<'p-model-signature'>;
