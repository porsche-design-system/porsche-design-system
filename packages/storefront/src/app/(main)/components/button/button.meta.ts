import { componentMeta } from '@porsche-design-system/component-meta';
import { buttonExampleForm, buttonExampleFormAttribute } from '@porsche-design-system/shared/examples';
import { ariaOnComponentHostVsAriaPropA11yExample } from '@/app/(main)/components/button/accessibility/examples/aria-on-component-host-vs-aria-prop/example';
import { iconOnlyButtonWithoutAccessibleNameA11yExample } from '@/app/(main)/components/button/accessibility/examples/icon-only-button-without-accessible-name/example';
import { vagueButtonLabelWithoutContextA11yExample } from '@/app/(main)/components/button/accessibility/examples/vague-button-label-without-context/example';
import AccessibilityOverview from '@/app/(main)/components/button/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/button/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/button/configurator/introduction.mdx';
import { buttonStory } from '@/app/(main)/components/button/configurator/story';
import FormDescription from '@/app/(main)/components/button/examples/form/example.mdx';
import FormAttributeDescription from '@/app/(main)/components/button/examples/form-attribute/example.mdx';
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
