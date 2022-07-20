export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = typeof TEXT_TAGS[number];

export const TEXT_SIZES = ['x-small', 'small', 'medium', 'large', 'x-large', 'inherit'] as const;
export type TextSize = typeof TEXT_SIZES[number];
