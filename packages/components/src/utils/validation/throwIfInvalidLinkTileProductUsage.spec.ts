import { anchorSlot } from '../../components/link-tile-product/link-tile-product-utils';
import { throwIfInvalidLinkTileProductUsage } from './throwIfInvalidLinkTileProductUsage';

const errorMessageA11y = `[Error: [Porsche Design System] usage of div is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.]`;

const createHostWithSlottedAnchor = (): { host: HTMLElement; anchor: HTMLAnchorElement } => {
  const host = document.createElement('div');
  const anchor = document.createElement('a');
  anchor.slot = anchorSlot;
  host.append(anchor);
  return { host, anchor };
};

it('should not throw error with href value, since the slotted anchor is not rendered', () => {
  const { host } = createHostWithSlottedAnchor();
  expect(() => throwIfInvalidLinkTileProductUsage(host, '#')).not.toThrow();
});

describe('without href value', () => {
  const href: any = undefined;

  it('should throw error with slotted anchor without label', () => {
    const { host } = createHostWithSlottedAnchor();
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessageA11y);
  });

  it('should not throw error with slotted anchor with text content', () => {
    const { host, anchor } = createHostWithSlottedAnchor();
    anchor.textContent = 'Some label';
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should not throw error with slotted anchor with aria-label', () => {
    const { host, anchor } = createHostWithSlottedAnchor();
    anchor.setAttribute('aria-label', 'Some label');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});
