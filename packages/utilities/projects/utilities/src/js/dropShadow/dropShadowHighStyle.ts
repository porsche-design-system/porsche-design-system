import { _dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowHighStyle = {
  filter: `drop-shadow(0px 8px 40px ${_dropShadowBackgroundColor})`,
} as const;
