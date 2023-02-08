import { getHTMLElement } from '../../utils';

export const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'] as const;
export type TextTag = typeof TEXT_TAGS[number];

export const hasSlottedTextTag = (host: HTMLElement): boolean => {
  // TODO: needs to be direct and only child
  const el = getHTMLElement(host, ':first-child');
  return el?.matches(TEXT_TAGS.join());
};

// TODO: maybe we can abstract this function to be reused for text, heading and display
export const getTextTagType = (host: HTMLElement, tag: TextTag): string => {
  if (hasSlottedTextTag(host)) {
    return 'div';
  } else {
    return tag;
  }
};
