import { componentMeta } from '@porsche-design-system/component-meta';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@porsche-design-system/examples-accessibility/components/button-pure/accessibility/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyButtonWithoutAccessibleNameA11yExample } from '@porsche-design-system/examples-accessibility/components/button-pure/accessibility/icon-only-button-without-accessible-name/example';
import { vagueButtonLabelWithoutContextA11yExample } from '@porsche-design-system/examples-accessibility/components/button-pure/accessibility/vague-button-label-without-context/example';
import { buttonPureExampleForm, buttonPureExampleFormAttribute } from '@porsche-design-system/examples-framework';
import FormDescription from '@porsche-design-system/examples-framework/components/button-pure/form/example.mdx';
import FormAttributeDescription from '@porsche-design-system/examples-framework/components/button-pure/form-attribute/example.mdx';
import CustomClickableAreaDescription from '@porsche-design-system/examples-stories/components/button-pure/custom-clickable-area/example.mdx';
import { buttonPureStoryCustomPadding } from '@porsche-design-system/examples-stories/components/button-pure/custom-clickable-area/story';
import { buttonPureStory } from '@porsche-design-system/examples-stories/components/button-pure/default/story';
import AccessibilityOverview from '@/app/(main)/components/button-pure/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button-pure/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button-pure/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/button-pure/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const buttonPureMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: buttonPureStory,
  },
  examples: {
    customClickableArea: {
      kind: 'story',
      name: 'Button Pure with custom clickable/focusable area',
      description: CustomClickableAreaDescription,
      story: buttonPureStoryCustomPadding,
    },
    form: {
      kind: 'example',
      name: 'Form',
      description: FormDescription,
      example: buttonPureExampleForm,
    },
    formAttribute: {
      kind: 'example',
      name: 'Form Attribute',
      description: FormAttributeDescription,
      example: buttonPureExampleFormAttribute,
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
  api: componentMeta['p-button-pure'],
} satisfies ComponentDocsMeta<'p-button-pure'>;
