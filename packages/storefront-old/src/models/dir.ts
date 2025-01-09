export const PLAYGROUND_DIR_TYPES = ['ltr', 'rtl', 'auto'] as const;
export type PlaygroundDir = (typeof PLAYGROUND_DIR_TYPES)[number];
