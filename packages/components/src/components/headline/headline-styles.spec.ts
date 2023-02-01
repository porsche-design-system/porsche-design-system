import { getComponentCss, getHeadingHeadlineStyles } from '../heading/heading-styles';
import * as HeadingHeadlineStyles from '../heading/heading-styles';

describe('getComponentCss()', () => {
  it('should call getHeadingHeadlineStyles with correct parameters', () => {
    const spy = jest.spyOn(HeadingHeadlineStyles, 'getHeadingHeadlineStyles');
    getHeadingHeadlineStyles('heading-1', 'left', 'default', false, 'light');

    expect(spy).toBeCalledWith('heading-1', 'left', 'default', false, 'light');
  });

  it.each<Parameters<typeof getComponentCss>>([
    ['headline-1', 'left', 'default', false, 'light'],
    ['headline-2', 'center', 'inherit', true, 'dark'],
    ['headline-3', 'center', 'inherit', true, 'dark'],
    ['headline-4', 'center', 'inherit', true, 'dark'],
    ['headline-5', 'center', 'inherit', true, 'dark'],
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
