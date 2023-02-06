import { getFontSizeText } from './font-size-text-styles';

describe('getFontWeight()', () => {
  it.each<Parameters<typeof getFontSizeText>>([
    ['x-small'],
    ['small'],
    ['medium'],
    ['large'],
    ['x-large'],
    ['inherit'],
  ])('should return correct value for size: %s', (...args) => {
    expect(getFontSizeText(...args)).toMatchSnapshot();
  });
});
