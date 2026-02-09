import { getTypographyRootJssStyle, getTypographySlottedJssStyle } from './typography-styles';

describe('getTypographyRootJssStyle()', () => {
  it.each<Parameters<typeof getTypographyRootJssStyle>>([
    [{ font: 'some font styles' }, { fontSize: 'some breakpoint customizable font styles' }, 'start', 'primary', false],
    [{}, {}, 'end', 'contrast-high', true],
    [{}, {}, 'center', 'contrast-high', false],
  ])(
    'should return correct css for baseTextStyle: %s, responsiveStyle: %s, align: %s, color: %s and ellipsis: %s',
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
