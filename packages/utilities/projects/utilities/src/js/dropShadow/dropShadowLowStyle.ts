import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowLowStyle = {
  filter: `drop-shadow(0px 3px 8px ${_dropShadowBackgroundColor})`,
} as const;
