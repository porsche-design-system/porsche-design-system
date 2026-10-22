import { hasHoverEffectToken, TILE_HOVER_EFFECTS } from './tile-utils';

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
