import { getBaseSlottedStyles } from './';

describe('getBaseSlottedStyles()', () => {
  it('should return correct css', () => {
    expect(getBaseSlottedStyles()).toMatchSnapshot();
  });
});
