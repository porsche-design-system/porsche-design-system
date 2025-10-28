export const LINK_BUTTON_VARIANTS = ['primary', 'secondary', 'ghost'] as const;
export type LinkButtonVariant = (typeof LINK_BUTTON_VARIANTS)[number];
