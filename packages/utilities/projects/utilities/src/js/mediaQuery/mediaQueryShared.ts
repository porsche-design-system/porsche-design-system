export type Breakpoint = 'base' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type BKey<K extends Breakpoint> = Extract<Breakpoint, K>;
