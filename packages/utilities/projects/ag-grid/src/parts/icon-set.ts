import type { IconName } from '@porsche-design-system/icons';
import { iconOverrides } from 'ag-grid-community';
import {
  aggregation,
  arrows,
  colorPicker,
  csv,
  cut,
  excel,
  grip,
  group,
  linked,
  loading,
  paste,
  pivot,
  smallDown,
  smallLeft,
  smallRight,
  smallUp,
  unlinked,
} from '../icons';
import { buildIconUrl } from '../utils/icon-utils';

/** Map of custom inline SVG icons for AG Grid icons */
const agGridCustomSvgIcons: Record<string, string> = {
  aggregation,
  arrows,
  csv,
  cut,
  excel,
  group,
  linked,
  loading,
  paste,
  pivot,
  unlinked,
  grip,
  'color-picker': colorPicker,
  'small-down': smallDown,
  'small-left': smallLeft,
  'small-right': smallRight,
  'small-up': smallUp,
};

/** Map of AG Grid icon names to their corresponding PDS icons */
const agGridToPdsIconMap: Record<string, IconName> = {
  asc: 'arrow-up',
  cancel: 'close',
  chart: 'chart',
  columns: 'grid',
  contracted: 'arrow-head-right',
  copy: 'copy',
  cross: 'close',
  desc: 'arrow-down',
  down: 'arrow-down',
  expanded: 'arrow-head-left',
  'eye-slash': 'view-off',
  eye: 'view',
  filter: 'filter',
  first: 'arrow-first',
  last: 'arrow-last',
  left: 'arrow-left',
  maximize: 'zoom-out',
  menu: 'menu-lines',
  'menu-alt': 'menu-dots-vertical',
  minimize: 'zoom-in',
  minus: 'minus',
  next: 'arrow-head-right',
  none: 'list',
  'not-allowed': 'disable',
  pin: 'push-pin',
  plus: 'plus',
  previous: 'arrow-head-left',
  right: 'arrow-right',
  save: 'save',
  tick: 'check',
  'tree-closed': 'arrow-head-right',
  'tree-indeterminate': 'minus',
  'tree-open': 'arrow-head-down',
  up: 'arrow-up',
  settings: 'configurate',
};

export const pdsSvgIcons = iconOverrides({
  type: 'image',
  mask: true,
  icons: {
    ...Object.fromEntries(Object.entries(agGridCustomSvgIcons).map(([key, value]) => [key, { svg: value }])),
    ...Object.fromEntries(
      Object.entries(agGridToPdsIconMap).map(([key, value]) => [key, { url: buildIconUrl(value) }])
    ),
  },
});
