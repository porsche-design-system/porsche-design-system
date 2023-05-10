import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowHighStyle = {
  boxShadow: `0px 8px 40px ${_dropShadowBackgroundColor}`, // filter: drop-shadow() causes visual glitches in Firefox in combination with frostedGlassStyle
} as const;
