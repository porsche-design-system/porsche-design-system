import { anchorSlot } from '../../components/link-tile-product/link-tile-product-utils';
import { getNamedSlot } from '../getNamedSlot';
import { throwException } from '../log/logger';
import { getTagNameWithoutPrefix } from '../tag-name';

// With href set, the anchor slot isn't rendered, so only a slotted anchor used without href needs to be accessible.
// A missing href and slotted anchor isn't reported, since the tile then isn't clickable, which is visible anyway,
// and href might still be set after the initial load, e.g. by a framework.
export const throwIfInvalidLinkTileProductUsage = (host: HTMLElement, hrefValue: string): void => {
  const anchor = getNamedSlot(host, anchorSlot);

  if (!hrefValue && anchor?.tagName === 'A' && !anchor.textContent.trim() && !anchor.getAttribute('aria-label')) {
    throwException(
      `usage of ${getTagNameWithoutPrefix(
        host
      )} is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.`
    );
  }
};
