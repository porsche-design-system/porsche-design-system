export const LINK_TARGETS = ['_self', '_blank', '_parent', '_top'] as const;
export type LinkTarget = typeof LINK_TARGETS[number] | string;
