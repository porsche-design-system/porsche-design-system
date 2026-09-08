import type { Breakpoint } from './breakpointShared';

export type BKey<K extends Breakpoint> = Extract<Breakpoint, K>;
