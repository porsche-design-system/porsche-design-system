import { getScreenReaderOnlyJssStyle } from './screen-reader';

describe('getScreenReaderOnlyJssStyle()', () => {
  it('should return correct css', () => {
    expect(getScreenReaderOnlyJssStyle()).toMatchSnapshot();
  });
});
