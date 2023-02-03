import { getComponentCss, getVariantJssStyle, getSizeJssStyle } from './heading-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['xx-large', 'left', 'default', false, 'light'],
    ['x-large', 'left', 'default', false, 'light'],
    ['large', 'center', 'inherit', true, 'dark'],
    ['medium', 'center', 'inherit', true, 'dark'],
    ['small', 'center', 'inherit', true, 'dark'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['inherit', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])('should return correct css for size: %j, align: %s, color: %s, ellipsis: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });

  it.each<Parameters<typeof getComponentCss>>([
    ['headline-1', 'left', 'default', false, 'light'],
    ['headline-2', 'left', 'default', false, 'light'],
    ['headline-3', 'center', 'inherit', true, 'dark'],
    ['headline-4', 'center', 'inherit', true, 'dark'],
    ['headline-5', 'center', 'inherit', true, 'dark'],
    ['large-title', 'center', 'inherit', true, 'dark'],
    ['inherit', 'center', 'inherit', true, 'dark'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
    ],
  ])(
    'should return correct css deprecated p-headline for variant: %j, align: %s, color: %s, ellipsis: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});

describe('getVariantJssStyle()', () => {
  it.each<Parameters<typeof getVariantJssStyle>>([
    ['large-title'],
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
    ['small'],
    ['medium'],
    ['large'],
    ['x-large'],
    ['xx-large'],
    ['inherit'],
  ])('should return correct css for textSize: %s', (...args) => {
    expect(getSizeJssStyle(...args)).toMatchSnapshot();
  });
});
