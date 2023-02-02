import { getComponentCss, getVariantJssStyle, getSizeJssStyle } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['heading-1', 'left', 'default', false, 'light'],
    ['inherit', 'left', 'default', false, 'light'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['heading-2', 'center', 'inherit', true, 'dark'],
    ['heading-3', 'center', 'inherit', true, 'dark'],
    ['heading-4', 'center', 'inherit', true, 'dark'],
    ['heading-5', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])('should return correct css for variant: %j, align: %s, color: %s, ellipsis: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getVariantJssStyle()', () => {
  it.each<Parameters<typeof getVariantJssStyle>>([
    ['large-title'],
    ['heading-1'],
    ['heading-2'],
    ['heading-3'],
    ['heading-4'],
    ['heading-5'],
    ['headline-1'],
    ['headline-2'],
    ['headline-3'],
    ['headline-4'],
    ['headline-5'],
  ])('should return correct css for variant: %s', (...args) => {
    expect(getVariantJssStyle(...args)).toMatchSnapshot();
  });
});

describe('getSizeJssStyle()', () => {
  it.each<Parameters<typeof getSizeJssStyle>>([
    ['x-small'],
    ['small'],
    ['medium'],
    ['large'],
    ['x-large'],
    ['inherit'],
  ])('should return correct css for textSize: %s', (...args) => {
    expect(getSizeJssStyle(...args)).toMatchSnapshot();
  });
});
