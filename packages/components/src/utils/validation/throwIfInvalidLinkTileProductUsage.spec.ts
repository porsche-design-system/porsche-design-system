import { anchorSlot } from '../../components/link-tile-product/link-tile-product-utils';
import { throwIfInvalidLinkTileProductUsage } from './throwIfInvalidLinkTileProductUsage';

const errorMessageA11y = `[Error: [Porsche Design System] usage of div is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.]`;

const createHostWithSlottedAnchor = (label?: { text?: string; ariaLabel?: string }): HTMLElement => {
  const host = document.createElement('div');
  const anchor = document.createElement('a');
  anchor.slot = anchorSlot;
  if (label?.text) {
    anchor.textContent = label.text;
  }
  if (label?.ariaLabel) {
    anchor.setAttribute('aria-label', label.ariaLabel);
  }
  host.append(anchor);
  return host;
};

describe('with href value', () => {
  const href = '#';

  it('should not throw error without anchor slot', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should not throw error with slotted anchor without label, since it is not rendered', () => {
    const host = createHostWithSlottedAnchor();
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});

describe('without href value', () => {
  const href: any = undefined;

  it('should not throw error without anchor slot, since href can still be set later', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should not throw error with anchor slot on an element that is not an anchor', () => {
    const host = document.createElement('div');
    const child = document.createElement('p');
    child.slot = anchorSlot;
    host.append(child);
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should throw error with slotted anchor without label', () => {
    const host = createHostWithSlottedAnchor();
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessageA11y);
  });

  it('should throw error with slotted anchor with whitespace only', () => {
    const host = createHostWithSlottedAnchor({ text: '   ' });
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessageA11y);
  });

  it('should not throw error with slotted anchor with text content', () => {
    const host = createHostWithSlottedAnchor({ text: 'Some label' });
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should not throw error with slotted anchor with aria-label', () => {
    const host = createHostWithSlottedAnchor({ ariaLabel: 'Some label' });
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});
