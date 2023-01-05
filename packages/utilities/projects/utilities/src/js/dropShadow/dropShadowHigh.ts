import { dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowHigh = {
  filter: `drop-shadow(0px 8px 40px ${dropShadowBackgroundColor})`,
} as const;
