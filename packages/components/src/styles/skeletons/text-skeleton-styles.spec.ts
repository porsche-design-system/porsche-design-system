import {
  getTextHeadlineSkeletonBaseStyle,
  getTextHeadlineSkeletonSubStyle,
  getTextSkeletonCss,
} from './text-skeleton-styles';
import { headline2 } from '@porsche-design-system/utilities-v2';
import { getTypographyElementHeight } from './headline-skeleton-styles';

describe('getTextSkeletonCss()', () => {
  it('should return correct css', () => {
    expect(getTextSkeletonCss()).toMatchSnapshot();
  });
});

describe('getTextHeadlineSkeletonSubStyle()', () => {
  it.each([[32], [getTypographyElementHeight(headline2)]])(
    'should for elementHeight: %s return %s',
    (elementHeight) => {
      expect(getTextHeadlineSkeletonSubStyle(elementHeight)).toMatchSnapshot();
    }
  );
});

describe('getTextHeadlineSkeletonBaseStyle()', () => {
  it.each([[32], [getTypographyElementHeight(headline2)]])(
    'should for elementHeight: %s return %s',
    (elementHeight) => {
      expect(getTextHeadlineSkeletonBaseStyle(elementHeight)).toMatchSnapshot();
    }
  );
});
