import type { Breakpoint } from './breakpoint';

export type BKey<K extends Breakpoint> = Extract<Breakpoint, K>;
