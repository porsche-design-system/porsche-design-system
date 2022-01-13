import { getEllipsisStyles, getSlottedTypoStyles } from './typo-styles';

describe('getSlottedTypoStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getSlottedTypoStyles()).toMatchSnapshot();
  });
});

describe('getEllipsisStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getEllipsisStyles()).toMatchSnapshot();
  });
});
