import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowMediumStyle = {
  filter: `drop-shadow(0px 4px 16px ${_dropShadowBackgroundColor})`,
} as const;
