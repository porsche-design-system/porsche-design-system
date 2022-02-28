import { getTextHeadlineSkeletonStyle, getTextSkeletonCss } from './text-skeleton-styles';
import { headline2 } from '@porsche-design-system/utilities-v2';
import { getTypographyElementHeight } from './headline-skeleton-styles';

describe('getTextSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextSkeletonCss()).toMatchSnapshot();
  });
});

describe('getTextHeadlineSkeletonStyle()', () => {
  it.each([[32], [getTypographyElementHeight(headline2)]])(
    'should for elementHeight: %j return %s',
    (elementHeight) => {
      expect(getTextHeadlineSkeletonStyle(elementHeight)).toMatchSnapshot();
    }
  );
});
