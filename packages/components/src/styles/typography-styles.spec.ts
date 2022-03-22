import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from './typography-styles';

describe('getSlottedTypographyStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypographyJssStyle()).toMatchSnapshot();
  });
});

describe('getEllipsisJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisJssStyle()).toMatchSnapshot();
  });
});
