import { componentMeta } from '@porsche-design-system/component-meta';
import { aiTagStory } from '@porsche-design-system/examples-stories/components/ai-tag/default/story';
import WithinCheckboxDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-checkbox/example.mdx';
import { aiTagStoryWithCheckbox } from '@porsche-design-system/examples-stories/components/ai-tag/within-checkbox/story';
import WithinFormLabelDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-form-label/example.mdx';
import { aiTagStoryWithSelect } from '@porsche-design-system/examples-stories/components/ai-tag/within-form-label/story';
import WithinImageDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-image/example.mdx';
import { aiTagStoryWithImage } from '@porsche-design-system/examples-stories/components/ai-tag/within-image/story';
import WithinInputSearchDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-input-search/example.mdx';
import { aiTagStoryWithInputSearch } from '@porsche-design-system/examples-stories/components/ai-tag/within-input-search/story';
import WithinRadioGroupDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-radio-group/example.mdx';
import { aiTagStoryWithRadioButton } from '@porsche-design-system/examples-stories/components/ai-tag/within-radio-group/story';
import WithinTableDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-table/example.mdx';
import { aiTagStoryWithTable } from '@porsche-design-system/examples-stories/components/ai-tag/within-table/story';
import WithinTextDescription from '@porsche-design-system/examples-stories/components/ai-tag/within-text/example.mdx';
import { aiTagStoryWithText } from '@porsche-design-system/examples-stories/components/ai-tag/within-text/story';
import AccessibilityOverview from '@/app/(main)/components/ai-tag/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/ai-tag/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/ai-tag/configurator/introduction.mdx';
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
