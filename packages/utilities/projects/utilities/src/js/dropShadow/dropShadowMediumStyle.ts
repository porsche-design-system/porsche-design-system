import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowMediumStyle = {
  boxShadow: `0px 4px 16px ${_dropShadowBackgroundColor}`, // filter: drop-shadow() causes visual glitches in Firefox in combination with frostedGlassStyle
} as const;
