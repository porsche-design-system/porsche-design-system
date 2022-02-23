import { getEllipsisStyle, getSlottedTypographyStyle } from './typography-styles';

describe('getSlottedTypographyStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypographyStyle()).toMatchSnapshot();
  });
});

describe('getEllipsisStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisStyle()).toMatchSnapshot();
  });
});
