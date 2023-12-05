import { getOnlyChildOfKindHTMLElementOrThrow, getTagNameWithoutPrefix, throwException } from '../../utils';

export const throwIfInvalidLinkTileProductUsage = (host: HTMLElement, hrefValue: string): void => {
  if (!hrefValue) {
    throwMissingHrefAndSlottedLinkException(host);
  }
  try {
    const linkElement = getOnlyChildOfKindHTMLElementOrThrow(host, 'a');
    if (!linkElement.textContent.trim() && !linkElement.getAttribute('aria-label')) {
      throwMissingSlottedLinkA11yException(host);
    }
  } catch {
    throwMissingHrefAndSlottedLinkException(host);
  }
};

const throwMissingHrefAndSlottedLinkException = (host: HTMLElement) =>
  throwException(
    `usage of ${getTagNameWithoutPrefix(
      host
    )} is not valid. Please provide a href property or a single and direct <a> child element.`
  );

const throwMissingSlottedLinkA11yException = (host: HTMLElement) =>
  throwException(
    `usage of ${getTagNameWithoutPrefix(
      host
    )} is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.`
  );
