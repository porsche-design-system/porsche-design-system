import { getOnlyChildOfKindHTMLElementOrThrow, getTagNameWithoutPrefix, throwException } from '../../utils';

export const throwIfInvalidSlottedAnchorLink = (host: HTMLElement): void => {
  try {
    const linkElement = getOnlyChildOfKindHTMLElementOrThrow(host, 'a');
    if (!linkElement.textContent.trim() && !linkElement.getAttribute('aria-label')) {
      throwException(
        `usage of ${getTagNameWithoutPrefix(
          host
        )} is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.`
      );
    }
  } catch {
    throwException(
      `usage of ${getTagNameWithoutPrefix(
        host
      )} is not valid. Please provide a href property or a single and direct <a> child element.`
    );
  }
};
