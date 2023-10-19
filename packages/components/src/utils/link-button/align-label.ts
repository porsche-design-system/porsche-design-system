// 'left' is deprecated and will be mapped to 'start'
// 'right' is deprecated and will be mapped to 'end'
/** @deprecated */
export const ALIGN_LABELS_DEPRECATED = ['left', 'right'] as const;
/** @deprecated */
export type AlignLabelDeprecated = (typeof ALIGN_LABELS_DEPRECATED)[number];
export const ALIGN_LABELS = ['start', 'end', ...ALIGN_LABELS_DEPRECATED] as const;
export type AlignLabel = (typeof ALIGN_LABELS)[number];
