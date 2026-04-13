import type { TagName } from './lib/tagNames';

// Specify chunking of components that can't be used standalone.
// It's important to list the parent component first since it affects the chunk name.
// This is the single source of truth — consumed by both shared (generateTagNamesWithChunk)
// and components (stencil.config.ts via @porsche-design-system/shared).
export const bundles: { components: TagName[] }[] = [
  { components: ['p-drilldown', 'p-drilldown-item', 'p-drilldown-link'] },
  { components: ['p-multi-select', 'p-multi-select-option'] },
  { components: ['p-segmented-control', 'p-segmented-control-item'] },
  { components: ['p-radio-group', 'p-radio-group-option'] },
  { components: ['p-select', 'p-select-option'] },
  { components: ['p-stepper-horizontal', 'p-stepper-horizontal-item'] },
  {
    components: [
      'p-table',
      'p-table-body',
      'p-table-head',
      'p-table-head-row',
      'p-table-head-cell',
      'p-table-row',
      'p-table-cell',
    ],
  },
  { components: ['p-tabs', 'p-tabs-item'] },
  { components: ['p-text-list', 'p-text-list-item'] },
  { components: ['p-toast', 'p-toast-item'] },
];

