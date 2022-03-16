import type { HeadlineType } from './headline-skeleton-styles';
import { getHeadlineSkeletonStyles, getTypographyElementHeight } from './headline-skeleton-styles';

import {
  headline1,
  headline2,
  headline3,
  headline4,
  headline5,
  textSmall,
  titleLarge,
} from '@porsche-design-system/utilities-v2';

describe('getHeadlineSkeletonStyles()', () => {
  it('should return correct css', () => {
    expect(getHeadlineSkeletonStyles()).toMatchSnapshot();
  });
});

describe('getTypographyElementHeight()', () => {
  it.each<[HeadlineType, number]>([
    [headline1, 40],
    [headline2, 36],
    [headline3, 28],
    [headline4, 24],
    [headline5, 24],
    [titleLarge, 44],
    [textSmall, 24],
  ])('should for typography: %j return %s', (typography, result) => {
    expect(getTypographyElementHeight(typography)).toBe(result);
  });
});
