import {
  getTextHeadlineSkeletonBaseJssStyle,
  getTextHeadlineSkeletonSubJssStyle,
  getTextSkeletonStyles,
} from './text-skeleton-styles';
import { headline2 } from '@porsche-design-system/utilities-v2';
import { getTypographyElementHeight } from './headline-skeleton-styles';

describe('getTextSkeletonStyles()', () => {
  it('should return correct css', () => {
    expect(getTextSkeletonStyles()).toMatchSnapshot();
  });
});

describe('getTextHeadlineSkeletonSubJssStyle()', () => {
  it.each([[32], [getTypographyElementHeight(headline2)]])(
    'should for elementHeight: %s return %s',
    (elementHeight) => {
      expect(getTextHeadlineSkeletonSubJssStyle(elementHeight)).toMatchSnapshot();
    }
  );
});

describe('getTextHeadlineSkeletonBaseJssStyle()', () => {
  it.each([[32], [getTypographyElementHeight(headline2)]])(
    'should for elementHeight: %s return %s',
    (elementHeight) => {
      expect(getTextHeadlineSkeletonBaseJssStyle(elementHeight)).toMatchSnapshot();
    }
  );
});
