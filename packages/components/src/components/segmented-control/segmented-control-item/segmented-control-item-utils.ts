import type { SegmentedControlBackgroundColor } from '../segmented-control/segmented-control-utils';
import type { Theme } from '../../../types';

export type SegmentedControlItemInternalHTMLProps = {
  selected: boolean;
  backgroundColor: SegmentedControlBackgroundColor;
  theme: Theme;
};
