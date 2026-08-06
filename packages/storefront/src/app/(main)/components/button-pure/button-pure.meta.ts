import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonPureExampleForm, buttonPureExampleFormAttribute } from '@porsche-design-system/shared/examples';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/button-pure/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyButtonWithoutAccessibleNameA11yExample } from '@/app/(main)/components/button-pure/accessibility/examples/icon-only-button-without-accessible-name/example';
import { vagueButtonLabelWithoutContextA11yExample } from '@/app/(main)/components/button-pure/accessibility/examples/vague-button-label-without-context/example';
import AccessibilityOverview from '@/app/(main)/components/button-pure/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button-pure/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button-pure/configurator/introduction.mdx';
import { buttonPureStory } from '@/app/(main)/components/button-pure/configurator/story';
import CustomClickableAreaDescription from '@/app/(main)/components/button-pure/examples/custom-clickable-area/example.mdx';
import { buttonPureStoryCustomPadding } from '@/app/(main)/components/button-pure/examples/custom-clickable-area/story';
import FormDescription from '@/app/(main)/components/button-pure/examples/form/example.mdx';
import FormAttributeDescription from '@/app/(main)/components/button-pure/examples/form-attribute/example.mdx';
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
