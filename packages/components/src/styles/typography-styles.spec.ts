import { getEllipsisJssStyle, getSlottedTypographyJssStyle } from './typography-styles';

describe('getSlottedTypographyStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypographyJssStyle()).toMatchSnapshot();
  });
});

describe('getEllipsisStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisJssStyle()).toMatchSnapshot();
  });
});
