export const labelId = 'label';
export const descriptionId = 'description';
export const LABEL_TAGS = ['label', 'div'] as const;
export type LabelTag = (typeof LABEL_TAGS)[number];
