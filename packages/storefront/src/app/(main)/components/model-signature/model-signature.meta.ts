import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/model-signature/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/model-signature/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/model-signature/configurator/introduction.mdx';
import { modelSignatureStory } from '@/app/(main)/components/model-signature/configurator/story';
import CustomStylingDescription from '@/app/(main)/components/model-signature/examples/custom-styling/example.mdx';
import { modelSignatureStoryCustomStyling } from '@/app/(main)/components/model-signature/examples/custom-styling/story';
import MaskBlendModeDescription from '@/app/(main)/components/model-signature/examples/mask-blend-mode/example.mdx';
import { modelSignatureStoryMaskBlendMode } from '@/app/(main)/components/model-signature/examples/mask-blend-mode/story';
import MaskImageDescription from '@/app/(main)/components/model-signature/examples/mask-image/example.mdx';
import { modelSignatureStoryMaskImage } from '@/app/(main)/components/model-signature/examples/mask-image/story';
import MaskVideoDescription from '@/app/(main)/components/model-signature/examples/mask-video/example.mdx';
import { modelSignatureStoryMaskVideo } from '@/app/(main)/components/model-signature/examples/mask-video/story';
import SafeZoneDescription from '@/app/(main)/components/model-signature/examples/safe-zone/example.mdx';
import { modelSignatureStorySafeZone } from '@/app/(main)/components/model-signature/examples/safe-zone/story';
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
