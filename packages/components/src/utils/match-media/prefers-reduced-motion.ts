import { hasWindow } from '../has-window';

export const prefersReducedMotionQueryMatches: boolean = hasWindow && matchMedia('(prefers-reduced-motion)').matches;
