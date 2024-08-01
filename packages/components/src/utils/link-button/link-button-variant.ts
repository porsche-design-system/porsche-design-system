/** @deprecated */
export const LINK_BUTTON_VARIANTS_DEPRECATED = ['tertiary'] as const;
/** @deprecated */
export type LinkButtonVariantDeprecated = (typeof LINK_BUTTON_VARIANTS_DEPRECATED)[number];

export const LINK_BUTTON_VARIANTS = ['primary', 'secondary', 'ghost', ...LINK_BUTTON_VARIANTS_DEPRECATED] as const;
export type LinkButtonVariant = (typeof LINK_BUTTON_VARIANTS)[number];
