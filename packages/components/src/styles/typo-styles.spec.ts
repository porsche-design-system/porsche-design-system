import { getDefaultEllipsisStyles, getDefaultSlottedTypoStyles } from './typo-styles';

describe('getDefaultSlottedTypoStyles()', () => {
  it('should return correct jss style', () => {
    expect(getDefaultSlottedTypoStyles()).toMatchSnapshot();
  });
});

describe('getDefaultEllipsisStyles()', () => {
  it('should return correct jss style', () => {
    expect(getDefaultEllipsisStyles()).toMatchSnapshot();
  });
});
