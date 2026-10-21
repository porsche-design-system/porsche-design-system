import { hasHoverEffectToken, isTileLinkEvent, TILE_HOVER_EFFECTS } from './tile-utils';

describe('isTileLinkEvent()', () => {
  const createEvent = (path: EventTarget[]): Event => {
    const event = new Event('pointerover');
    vi.spyOn(event, 'composedPath').mockReturnValue(path);
    return event;
  };

  const host = document.createElement('p-tile');
  const anchor = document.createElement('a');
  anchor.slot = 'anchor';
  host.append(anchor);

  it('should return true for the slotted anchor', () => {
    expect(isTileLinkEvent(host, createEvent([anchor, host]))).toBe(true);
  });

  it('should return true for a p-link with cover and its content', () => {
    const link = Object.assign(document.createElement('p-link'), { cover: true });
    const label = document.createElement('a');
    link.append(label);
    host.append(link);
    // composed path through the shadow root of the link, as for the slotted anchor of a covering `p-link`
    const shadowRoot = link.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    shadowRoot.append(slot);
    expect(isTileLinkEvent(host, createEvent([label, slot, shadowRoot, link, host]))).toBe(true);
  });

  it('should return false for a p-link without cover', () => {
    const link = document.createElement('p-link');
    host.append(link);
    expect(isTileLinkEvent(host, createEvent([link, host]))).toBe(false);
  });

  it('should return false for an anchor slotted into another slot', () => {
    const otherAnchor = document.createElement('a');
    otherAnchor.slot = 'top';
    host.append(otherAnchor);
    expect(isTileLinkEvent(host, createEvent([otherAnchor, host]))).toBe(false);
  });

  it('should return false for independent interactive elements and ignore targets outside of the host', () => {
    const button = document.createElement('p-button');
    host.append(button);
    const outerLink = Object.assign(document.createElement('p-link'), { cover: true });
    expect(isTileLinkEvent(host, createEvent([button, host, outerLink]))).toBe(false);
  });
});

describe('hasHoverEffectToken()', () => {
  it.each(TILE_HOVER_EFFECTS)('should detect the tokens of hover effect "%s"', (hoverEffect) => {
    const tokens = hoverEffect.split(' ');
    expect(hasHoverEffectToken(hoverEffect, 'zoom')).toBe(tokens.includes('zoom'));
    expect(hasHoverEffectToken(hoverEffect, 'offset')).toBe(tokens.includes('offset'));
    expect(hasHoverEffectToken(hoverEffect, 'highlight')).toBe(tokens.includes('highlight'));
  });

  it('should not match a token that is only part of another token', () => {
    expect(hasHoverEffectToken('none', 'zoom')).toBe(false);
  });
});
