import {
  getButtonLinkTileContentStyles,
  getButtonLinkTilePStyles,
  getButtonLinkTileSharedStyles,
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
  ])('should return correct css for %o', (...args) => {
    expect(getButtonLinkTilePStyles(...args)).toMatchSnapshot();
  });
});

describe('getButtonLinkTileContentStyles()', () => {
  it.each<Parameters<typeof getButtonLinkTileContentStyles>>([
    ['top', true, false],
    ['bottom', false, true],
    ['top', false, { base: false, xs: true, s: false, m: true, l: false, xl: true }],
  ])('should return correct css for %o', (...args) => {
    expect(getButtonLinkTileContentStyles(...args)).toMatchSnapshot();
  });
});

describe('getButtonLinkTileSharedStyles()', () => {
  it.each<Parameters<typeof getButtonLinkTileSharedStyles>>([
    [true],
    [false],
    [{ base: false, xs: true, s: false, m: true, l: false, xl: true }],
  ])('should return correct css for %o', (...args) => {
    expect(getButtonLinkTileSharedStyles(...args)).toMatchSnapshot();
  });
});
