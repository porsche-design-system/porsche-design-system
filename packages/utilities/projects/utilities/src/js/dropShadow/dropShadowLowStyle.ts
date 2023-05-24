import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowLowStyle = {
  boxShadow: `0px 3px 8px ${_dropShadowBackgroundColor}`, // filter: drop-shadow() causes visual glitches in Firefox in combination with frostedGlassStyle
} as const;
