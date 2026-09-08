export const ALIGN_LABELS = ['start', 'end'] as const;
export type AlignLabel = (typeof ALIGN_LABELS)[number];
