import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/button/accessibility/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyButtonWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/button/accessibility/icon-only-button-without-accessible-name/example';
import { vagueButtonLabelWithoutContextA11yExample } from '@porsche-design-system/examples-accessibility/components/button/accessibility/vague-button-label-without-context/example';
import { buttonExampleForm, buttonExampleFormAttribute } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/button/form/example.mdx';
import FormAttributeDescription from '@porsche-design-system/examples-framework/components/button/form-attribute/example.mdx';
import AiDropShadowDescription from '@porsche-design-system/examples-stories/components/button/ai-drop-shadow/example.mdx';
import { buttonStoryAiDropShadow } from '@porsche-design-system/examples-stories/components/button/ai-drop-shadow/story';
import AiGradientGlowDescription from '@porsche-design-system/examples-stories/components/button/ai-gradient-glow/example.mdx';
import { buttonStoryAiGradientGlow } from '@porsche-design-system/examples-stories/components/button/ai-gradient-glow/story';
import { buttonStory } from '@porsche-design-system/examples-stories/components/button/default/story';
import AccessibilityOverview from '@/app/(main)/components/button/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: buttonStory,
  },
  examples: {
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: buttonExampleForm,
    },
    formAttribute: {
      kind: 'example',
      name: 'Form Attribute',
      description: FormAttributeDescription,
      example: buttonExampleFormAttribute,
    },
    aiDropShadow: {
      kind: 'story',
      name: 'Custom AI Styling: Drop Shadow',
      description: AiDropShadowDescription,
      story: buttonStoryAiDropShadow,
    },
    aiGradientGlow: {
      kind: 'story',
      name: 'Custom AI Styling: Gradient Glow',
      description: AiGradientGlowDescription,
      story: buttonStoryAiGradientGlow,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      ariaOnComponentHostVsAriaProp: ariaOnComponentHostVsAriaPropA11yExample,
      iconOnlyButtonWithoutAccessibleName: iconOnlyButtonWithoutAccessibleNameA11yExample,
      vagueButtonLabelWithoutContext: vagueButtonLabelWithoutContextA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-button'],
} satisfies ComponentDocsMeta<'p-button'>;
