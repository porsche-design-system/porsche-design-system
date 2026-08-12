import { componentMeta } from '@porsche-design-system/component-meta';
import AccessibilityOverview from '@/app/(main)/components/ai-tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/ai-tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/ai-tag/configurator/introduction.mdx';
import { aiTagStory } from '@/app/(main)/components/ai-tag/configurator/story';
import WithinCheckboxDescription from '@/app/(main)/components/ai-tag/examples/within-checkbox/example.mdx';
import { aiTagStoryWithCheckbox } from '@/app/(main)/components/ai-tag/examples/within-checkbox/story';
import WithinFormLabelDescription from '@/app/(main)/components/ai-tag/examples/within-form-label/example.mdx';
import { aiTagStoryWithSelect } from '@/app/(main)/components/ai-tag/examples/within-form-label/story';
import WithinImageDescription from '@/app/(main)/components/ai-tag/examples/within-image/example.mdx';
import { aiTagStoryWithImage } from '@/app/(main)/components/ai-tag/examples/within-image/story';
import WithinInputSearchDescription from '@/app/(main)/components/ai-tag/examples/within-input-search/example.mdx';
import { aiTagStoryWithInputSearch } from '@/app/(main)/components/ai-tag/examples/within-input-search/story';
import WithinRadioGroupDescription from '@/app/(main)/components/ai-tag/examples/within-radio-group/example.mdx';
import { aiTagStoryWithRadioButton } from '@/app/(main)/components/ai-tag/examples/within-radio-group/story';
import WithinTableDescription from '@/app/(main)/components/ai-tag/examples/within-table/example.mdx';
import { aiTagStoryWithTable } from '@/app/(main)/components/ai-tag/examples/within-table/story';
import WithinTextDescription from '@/app/(main)/components/ai-tag/examples/within-text/example.mdx';
import { aiTagStoryWithText } from '@/app/(main)/components/ai-tag/examples/within-text/story';
import Usage from '@/app/(main)/components/ai-tag/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const aiTagMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: aiTagStory,
  },
  examples: {
    withinCheckbox: {
      kind: 'story',
      name: 'Within Checkbox',
      description: WithinCheckboxDescription,
      story: aiTagStoryWithCheckbox,
    },
    withinRadioGroup: {
      kind: 'story',
      name: 'Within Radio Group',
      description: WithinRadioGroupDescription,
      story: aiTagStoryWithRadioButton,
    },
    withinFormLabel: {
      kind: 'story',
      name: 'Within Form Label',
      description: WithinFormLabelDescription,
      story: aiTagStoryWithSelect,
    },
    withinInputSearch: {
      kind: 'story',
      name: 'Within Input Search',
      description: WithinInputSearchDescription,
      story: aiTagStoryWithInputSearch,
    },
    withinText: {
      kind: 'story',
      name: 'Within Text',
      description: WithinTextDescription,
      story: aiTagStoryWithText,
    },
    withinImage: {
      kind: 'story',
      name: 'Within Image',
      description: WithinImageDescription,
      story: aiTagStoryWithImage,
    },
    withinTable: {
      kind: 'story',
      name: 'Within Table',
      description: WithinTableDescription,
      story: aiTagStoryWithTable,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {},
    tests: AccessibilityTests,
  },
  api: componentMeta['p-ai-tag'],
} satisfies ComponentDocsMeta<'p-ai-tag'>;
