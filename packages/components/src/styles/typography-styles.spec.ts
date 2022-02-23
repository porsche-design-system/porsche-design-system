import { getEllipsisStyle, getSlottedTypographyStyle } from './typography-styles';

describe('getSlottedTypographyStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypographyStyle()).toMatchSnapshot();
  });
});

describe('getEllipsisStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisStyle()).toMatchSnapshot();
  });
});
