import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from './typography-styles';

describe('getTypographyRootJssStyle()', () => {
  it.each<Parameters<typeof getTypographyRootJssStyle>>([
    [
      { font: 'some font styles' },
      { fontSize: 'some breakpoint customizable font styles' },
      'left',
      'primary',
      false,
      'light',
    ],
    [{}, {}, 'right', 'contrast-high', true, 'light'],
    [{}, {}, 'center', 'contrast-high', false, 'dark'],
  ])(
    'should return correct css for baseTextStyle: %s, responsiveStyle: %s, align: %s, color: %s, ellipsis: %s and theme: %s',
    (...args) => {
      expect(getTypographyRootJssStyle(...args)).toMatchSnapshot();
    }
  );
});

describe('getTypographySlottedJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getTypographySlottedJssStyle()).toMatchSnapshot();
  });
});
