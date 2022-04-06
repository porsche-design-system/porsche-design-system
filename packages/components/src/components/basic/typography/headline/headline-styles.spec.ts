import { getComponentCss, getSlottedCss } from './headline-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['headline-1', 'left', 'default', false, 'light', undefined],
    ['inherit', 'left', 'default', false, 'light', undefined],
    ['large-title', 'center', 'inherit', true, 'dark', undefined],
    ['headline-2', 'center', 'inherit', true, 'dark', undefined],
    ['headline-3', 'center', 'inherit', true, 'dark', undefined],
    ['headline-4', 'center', 'inherit', true, 'dark', undefined],
    ['headline-5', 'center', 'inherit', true, 'dark', undefined],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
      undefined,
    ],
    ['headline-1', 'left', 'default', false, 'light', 'none'],
    ['inherit', 'left', 'default', false, 'light', 'none'],
    ['large-title', 'center', 'inherit', true, 'dark', 'none'],
    ['headline-2', 'center', 'inherit', true, 'dark', 'none'],
    ['headline-3', 'center', 'inherit', true, 'dark', 'none'],
    ['headline-4', 'center', 'inherit', true, 'dark', 'none'],
    ['headline-5', 'center', 'inherit', true, 'dark', 'none'],
    [
      { base: 'small', xs: 'large', s: 'small', m: 'large', l: 'small', xl: 'large' },
      'right',
      'inherit',
      false,
      'dark',
      'none',
    ],
  ])(
    'should return correct css for variant: %j, align: %s, color: %s, ellipsis: %s, theme: %s and hyphens: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-headline');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
