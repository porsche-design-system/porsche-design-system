import { colorContrastLowerDark } from '../../dark';
import { colorContrastLowerLight } from '../../light';

/** Holds the **contrast-lower** color, intended only for decorative elements, as it is not accessibility-compliant. */
export const colorContrastLower = `light-dark(${colorContrastLowerLight},${colorContrastLowerDark})`;
