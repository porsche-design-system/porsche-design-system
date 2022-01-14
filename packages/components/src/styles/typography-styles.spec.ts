import { getEllipsisStyles, getSlottedTypographyStyles } from './typography-styles';

describe('getSlottedTypographyStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypographyStyles()).toMatchSnapshot();
  });
});

describe('getEllipsisStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisStyles()).toMatchSnapshot();
  });
});
