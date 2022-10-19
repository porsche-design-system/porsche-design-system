import { InjectionToken } from '@angular/core';

export const usesSkeletons = (): boolean =>
  typeof window !== 'undefined' && !!document.querySelector('style[uses-skeleton]');

export const USES_SKELETONS = new InjectionToken<boolean>('usesSkeletons');
