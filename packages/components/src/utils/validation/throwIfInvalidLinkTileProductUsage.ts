import { getOnlyChildOfKindHTMLElementOrThrow, getTagNameWithoutPrefix, throwException } from '../../utils';
import { getNamedSlot } from '../getNamedSlot';
import { anchorSlot } from '../../components/link-tile-product/link-tile-product-utils';

export const throwIfInvalidLinkTileProductUsage = (host: HTMLElement, hrefValue: string): void => {
  let invalidA11y = false;

  if (!hrefValue) {
    if (!getNamedSlot(host, anchorSlot)) {
      throwMissingHrefAndSlottedLinkException(host);
    }
    try {
      const linkElement = getOnlyChildOfKindHTMLElementOrThrow(host, 'a');
      if (!linkElement.textContent.trim() && !linkElement.getAttribute('aria-label')) {
        invalidA11y = true;
      }
    } catch {
      throwMissingHrefAndSlottedLinkException(host);
    }
  }

  if (invalidA11y) {
    throwMissingSlottedLinkA11yException(host);
  }
};

const throwMissingHrefAndSlottedLinkException = (host: HTMLElement) =>
  throwException(
    `usage of ${getTagNameWithoutPrefix(
      host
    )} is not valid. Please provide a href property or a single and direct <a> child element in the anchor slot.`
  );

const throwMissingSlottedLinkA11yException = (host: HTMLElement) =>
  throwException(
    `usage of ${getTagNameWithoutPrefix(
      host
    )} is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.`
  );
