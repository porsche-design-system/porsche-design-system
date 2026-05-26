import { colorContrastLowDark } from '../../dark';
import { colorContrastLowLight } from '../../light';

/** Holds the **contrast-low** color, intended only for decorative elements, as it is not accessibility-compliant. */
export const colorContrastLow = `light-dark(${colorContrastLowLight},${colorContrastLowDark})`;
