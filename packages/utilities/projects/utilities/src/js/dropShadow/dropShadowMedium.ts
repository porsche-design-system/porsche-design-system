import { dropShadowBackgroundColor } from './dropShadowShared';

export const dropShadowMedium = {
  filter: `drop-shadow(0px 4px 16px ${dropShadowBackgroundColor})`,
} as const;
