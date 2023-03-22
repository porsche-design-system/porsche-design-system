import {
  getButtonLinkTileAdditionalContentStyles,
  getButtonLinkTilePStyles,
  getButtonLinkTileSharedClassesStyles,
} from './link-button-tile-styles';

describe('getButtonLinkTilePStyles()', () => {
  it.each<Parameters<typeof getButtonLinkTilePStyles>>([
    ['default', 'semi-bold'],
    ['inherit', 'semibold'],
    ['default', 'regular'],
    [
      { base: 'inherit', xs: 'default', s: 'inherit', m: 'default', l: 'inherit', xl: 'default' },
      { base: 'semi-bold', xs: 'regular', s: 'semibold', m: 'regular', l: 'semi-bold', xl: 'regular' },
    ],
  ])('should return correct css for size: "%s" and weight: "%s"', (...args) => {
    expect(getButtonLinkTilePStyles(...args)).toMatchSnapshot();
  });
});

describe('getButtonLinkTileAdditionalContentStyles()', () => {
  it.each<Parameters<typeof getButtonLinkTileAdditionalContentStyles>>([
    ['top', true, false],
    ['bottom', false, true],
    ['top', false, { base: false, xs: true, s: false, m: true, l: false, xl: true }],
  ])('should return correct css for align: "%s", hasGradient: "%s" and compact: "%s"', (...args) => {
    expect(getButtonLinkTileAdditionalContentStyles(...args)).toMatchSnapshot();
  });
});

describe('getButtonLinkTileSharedClassesStyles()', () => {
  it.each<Parameters<typeof getButtonLinkTileSharedClassesStyles>>([
    [true],
    [false],
    [{ base: false, xs: true, s: false, m: true, l: false, xl: true }],
  ])('should return correct css for compact: "%s"', (...args) => {
    expect(getButtonLinkTileSharedClassesStyles(...args)).toMatchSnapshot();
  });
});
