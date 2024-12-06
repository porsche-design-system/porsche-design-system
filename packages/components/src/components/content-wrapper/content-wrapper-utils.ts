export const CONTENT_WRAPPER_BACKGROUND_COLORS = ['transparent', 'default'] as const;
export type ContentWrapperBackgroundColor = (typeof CONTENT_WRAPPER_BACKGROUND_COLORS)[number];

// fluid is deprecated and will be mapped to full
export const CONTENT_WRAPPER_WIDTHS = ['narrow', 'basic', 'extended', 'fluid', 'full'] as const;
export type ContentWrapperWidth = (typeof CONTENT_WRAPPER_WIDTHS)[number];

export const deprecatedContentWrapperComponentMessage =
  'Please use native CSS Grid (https://css-tricks.com/snippets/css/complete-guide-grid) instead in combination with the Porsche Grid utility based on CSS Grid.';
