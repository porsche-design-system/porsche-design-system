import { getDirectChildHTMLElements } from '../dom/getDirectChildHTMLElements';
import { throwException } from '../log/logger';
import { getTagNameWithoutPrefix } from '../tag-name';

// Only the combination of href and a slotted anchor is reported, since it renders nested links (two tab stops).
// Like render, any defined href (also an empty one) counts, since it renders the outer anchor.
// A missing href and slotted anchor isn't reported, since the link then renders as plain text, which is visible anyway,
// and href might still be set after the initial load, e.g. by a framework.
export const throwIfInvalidLinkUsage = (host: HTMLElement, hrefValue: string): void => {
  if (hrefValue !== undefined && getDirectChildHTMLElements(host, 'a').length) {
    throwException(
      `usage of ${getTagNameWithoutPrefix(
        host
      )} is not valid. Please provide either a href property or a slotted <a> element, but not both.`
    );
  }
};
