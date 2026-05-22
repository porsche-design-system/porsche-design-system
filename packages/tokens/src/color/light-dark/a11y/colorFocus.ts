import { colorFocusDark } from '../../dark';
import { colorFocusLight } from '../../light';

/** Holds the **focus** color, typically used as the outline for `:focus-visible` states. */
export const colorFocus = `light-dark(${colorFocusLight},${colorFocusDark})`;
