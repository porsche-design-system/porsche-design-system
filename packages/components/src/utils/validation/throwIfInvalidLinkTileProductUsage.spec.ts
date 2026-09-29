import { anchorSlot } from '../../components/link-tile-product/link-tile-product-utils';
import { throwIfInvalidLinkTileProductUsage } from './throwIfInvalidLinkTileProductUsage';

const errorMessage = `[Error: [Porsche Design System] usage of div is not valid. Please provide a href property or a single and direct <a> child element in the anchor slot.]`;

const errorMessageA11y = `[Error: [Porsche Design System] usage of div is not valid. Anchor tag must have slotted text content or an aria-label attribute for accessibility.]`;

describe('with href value', () => {
  const href = '#';
  it('should not throw error', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});

describe('without href value', () => {
  const href: any = undefined;

  it('should not throw error without using anchor slot, since href can still be set later', () => {
    const host = document.createElement('div');
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });

  it('should throw error with nested anchor in anchor slot', () => {
    const host = document.createElement('div');
    const child = document.createElement('p');
    const anchor = document.createElement('a');
    child.slot = anchorSlot;
    child.append(anchor);
    host.append(child);

    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessage);
  });

  it('should throw error with anchor slot but with missing label', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.slot = anchorSlot;
    host.append(anchor);
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).toThrowErrorMatchingInlineSnapshot(errorMessageA11y);
  });

  it('should not throw error with direct and only anchor and label', () => {
    const host = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.slot = anchorSlot;
    anchor.textContent = 'Some label';
    host.append(anchor);
    expect(() => throwIfInvalidLinkTileProductUsage(host, href)).not.toThrow();
  });
});
