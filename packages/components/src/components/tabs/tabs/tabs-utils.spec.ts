import { TABS_ARIA_ATTRIBUTES, TABS_BACKGROUNDS, TABS_SIZES, TABS_WEIGHTS } from './tabs-utils';

describe('TABS_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(TABS_ARIA_ATTRIBUTES).toStrictEqual(['aria-label', 'aria-description']);
  });
});

describe('TABS_SIZES', () => {
  it('should list supported size values', () => {
    expect(TABS_SIZES).toStrictEqual(['small', 'medium']);
  });
});

describe('TABS_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(TABS_BACKGROUNDS).toStrictEqual(['canvas', 'surface', 'frosted', 'none']);
  });
});

describe('TABS_WEIGHTS', () => {
  it('should list deprecated weight values', () => {
    expect(TABS_WEIGHTS).toStrictEqual(['regular', 'semi-bold']);
  });
});
