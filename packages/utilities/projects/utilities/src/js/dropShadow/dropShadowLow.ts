import { dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowLow = {
  filter: `drop-shadow(0px 3px 8px ${dropShadowBackgroundColor})`,
} as const;
