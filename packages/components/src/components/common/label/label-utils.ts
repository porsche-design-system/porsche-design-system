export const labelId = 'label';
export const descriptionId = 'description';
export const LABEL_TAGS = ['label', 'legend'] as const;
export type LabelTag = (typeof LABEL_TAGS)[number];
