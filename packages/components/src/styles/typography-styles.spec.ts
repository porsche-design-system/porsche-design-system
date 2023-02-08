import { getEllipsisJssStyle, getTypographySlottedJssStyle } from './typography-styles';

describe('getSlottedTypographyStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getTypographySlottedJssStyle()).toMatchSnapshot();
  });
});

describe('getEllipsisJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisJssStyle()).toMatchSnapshot();
  });
});
