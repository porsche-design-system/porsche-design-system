import { componentMeta } from '@porsche-design-system/component-meta';
import { tableExampleAdvanced, tableExampleSorting } from '@porsche-design-system/shared/examples';
import Accessibility from '@/app/components/table/accessibility/page.mdx';
import IntroductionDescription from '@/app/components/table/configurator/introduction.mdx';
import { tableStory } from '@/app/components/table/configurator/story';
import AdvancedDescription from '@/app/components/table/examples/advanced/example.mdx';
import CaptionPropertyDescription from '@/app/components/table/examples/caption-property/example.mdx';
import { tableStoryCaptionProperty } from '@/app/components/table/examples/caption-property/story';
import CaptionSlotDescription from '@/app/components/table/examples/caption-slot/example.mdx';
import { tableStoryCaptionSlot } from '@/app/components/table/examples/caption-slot/story';
import HideLabelDescription from '@/app/components/table/examples/hide-label/example.mdx';
import { tableStoryHideLabel } from '@/app/components/table/examples/hide-label/story';
import LayoutFixedDescription from '@/app/components/table/examples/layout-fixed/example.mdx';
import { tableStoryLayoutFixed } from '@/app/components/table/examples/layout-fixed/story';
import SortingDescription from '@/app/components/table/examples/sorting/example.mdx';
import Usage from '@/app/components/table/usage/page.mdx';
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
  accessibility: Accessibility,
  api: componentMeta['p-table'],
} satisfies ComponentDocsMeta<'p-table'>;

