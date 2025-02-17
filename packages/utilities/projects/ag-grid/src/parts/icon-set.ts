import type { IconName } from '@porsche-design-system/icons';
import { type Part, iconOverrides } from 'ag-grid-community';
import { buildIconUrl } from '../utils';

/** Map of AG Grid icon names to their corresponding PDS icons */
const agGridToPdsIconMap: Record<string, IconName> = {
  aggregation: 'aggregation',
  arrows: 'arrows',
  asc: 'arrow-up',
  cancel: 'close',
  chart: 'chart',
  'color-picker': 'color-picker',
  columns: 'grid',
  contracted: 'arrow-head-right',
  copy: 'copy',
  cross: 'close',
  csv: 'file-csv',
  cut: 'cut',
  desc: 'arrow-down',
  down: 'arrow-down',
  expanded: 'arrow-head-left',
  excel: 'file-excel',
  eye: 'view',
  'eye-slash': 'view-off',
  filter: 'filter',
  first: 'arrow-first',
  grip: 'grip',
  group: 'group',
  last: 'arrow-last',
  left: 'arrow-left',
  linked: 'linked',
  maximize: 'zoom-out',
  menu: 'menu-lines',
  'menu-alt': 'menu-dots-vertical',
  minimize: 'zoom-in',
  minus: 'minus',
  next: 'arrow-head-right',
  'not-allowed': 'disable',
  none: 'list',
  paste: 'paste',
  pin: 'push-pin',
  pivot: 'pivot',
  plus: 'plus',
  previous: 'arrow-head-left',
  right: 'arrow-right',
  save: 'save',
  settings: 'configurate',
  'small-down': 'arrow-compact-down',
  'small-left': 'arrow-compact-left',
  'small-right': 'arrow-compact-right',
  'small-up': 'arrow-compact-up',
  tick: 'check',
  'tree-closed': 'arrow-head-right',
  'tree-indeterminate': 'minus',
  'tree-open': 'arrow-head-down',
  unlinked: 'unlinked',
  up: 'arrow-up',
};

export const pdsSvgIcons: Part = iconOverrides({
  type: 'image',
  mask: true,
  icons: {
    ...Object.fromEntries(
      Object.entries(agGridToPdsIconMap).map(([key, value]) => [key, { url: buildIconUrl(value) }])
    ),
  },
});
