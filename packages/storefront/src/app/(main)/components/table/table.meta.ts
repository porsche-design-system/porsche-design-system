import { componentMeta } from '@porsche-design-system/component-meta';
import { columnWithHiddenLabelA11yExample } from '@porsche-design-system/examples-accessibility/components/table/accessibility/column-with-hidden-label/example';
import { dataTableWithoutCaptionA11yExample } from '@porsche-design-system/examples-accessibility/components/table/accessibility/data-table-without-caption/example';
import { tableExampleAdvanced, tableExampleSorting } from '@porsche-design-system/examples-framework';
import AdvancedDescription from '@porsche-design-system/examples-framework/components/table/advanced/example.mdx';
import SortingDescription from '@porsche-design-system/examples-framework/components/table/sorting/example.mdx';
import CaptionPropertyDescription from '@porsche-design-system/examples-stories/components/table/caption-property/example.mdx';
import { tableStoryCaptionProperty } from '@porsche-design-system/examples-stories/components/table/caption-property/story';
import CaptionSlotDescription from '@porsche-design-system/examples-stories/components/table/caption-slot/example.mdx';
import { tableStoryCaptionSlot } from '@porsche-design-system/examples-stories/components/table/caption-slot/story';
import { tableStory } from '@porsche-design-system/examples-stories/components/table/default/story';
import HideLabelDescription from '@porsche-design-system/examples-stories/components/table/hide-label/example.mdx';
import { tableStoryHideLabel } from '@porsche-design-system/examples-stories/components/table/hide-label/story';
import LayoutFixedDescription from '@porsche-design-system/examples-stories/components/table/layout-fixed/example.mdx';
import { tableStoryLayoutFixed } from '@porsche-design-system/examples-stories/components/table/layout-fixed/story';
import AccessibilityOverview from '@/app/(main)/components/table/accessibility/overview.mdx';
import AccessibilityTests from '@/app/(main)/components/table/accessibility/tests.mdx';
import IntroductionDescription from '@/app/(main)/components/table/configurator/introduction.mdx';
import Usage from '@/app/(main)/components/table/usage/page.mdx';
import type { ComponentDocsMeta } from '@/models/meta';

export const tableMeta = {
  introduction: IntroductionDescription,
  configurator: {
    story: tableStory,
  },
  examples: {
    captionProperty: {
      kind: 'story',
      name: 'Caption via Property',
      description: CaptionPropertyDescription,
      story: tableStoryCaptionProperty,
    },
    captionSlot: {
      kind: 'story',
      name: 'Caption via Slot',
      description: CaptionSlotDescription,
      story: tableStoryCaptionSlot,
    },
    layoutFixed: {
      kind: 'story',
      name: 'Layout: fixed',
      description: LayoutFixedDescription,
      story: tableStoryLayoutFixed,
    },
    sorting: {
      kind: 'example',
      name: 'Sortable Columns',
      description: SortingDescription,
      example: tableExampleSorting,
    },
    hideLabel: {
      kind: 'story',
      name: 'Hide Column Label',
      description: HideLabelDescription,
      story: tableStoryHideLabel,
    },
    advanced: {
      kind: 'example',
      name: 'Advanced Table',
      description: AdvancedDescription,
      example: tableExampleAdvanced,
    },
  },
  usage: Usage,
  accessibility: {
    overview: AccessibilityOverview,
    examples: {
      dataTableWithoutCaption: dataTableWithoutCaptionA11yExample,
      columnWithHiddenLabel: columnWithHiddenLabelA11yExample,
    },
    tests: AccessibilityTests,
  },
  api: componentMeta['p-table'],
} satisfies ComponentDocsMeta<'p-table'>;
