import { DIVIDER_COLORS, DIVIDER_DIRECTIONS } from './divider-utils';

describe('DIVIDER_COLORS', () => {
  it('should list supported color values', () => {
    expect(DIVIDER_COLORS).toStrictEqual(['contrast-lower', 'contrast-low', 'contrast-medium', 'contrast-high']);
  });
});

describe('DIVIDER_DIRECTIONS', () => {
  it('should list supported direction values', () => {
    expect(DIVIDER_DIRECTIONS).toStrictEqual(['vertical', 'horizontal']);
  });
});
