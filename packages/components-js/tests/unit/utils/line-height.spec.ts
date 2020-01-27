import { lineHeightFactor } from '../../../src/utils';

describe('lineHeight', () => {

  it('should return correct line-height value based on type scale definition', () => {

    expect(lineHeightFactor(14)).toEqual(1.4285714285714286); // => 20px
    expect(lineHeightFactor(15)).toEqual(1.6); // => 24px
    expect(lineHeightFactor(16)).toEqual(1.5); // => 24px
    expect(lineHeightFactor(17)).toEqual(1.411764705882353); // => 24px
    expect(lineHeightFactor(18)).toEqual(1.5555555555555556); // => 28px

    expect(lineHeightFactor(90)).toEqual(1.2); // => 108px

    expect(lineHeightFactor(33)).toEqual(1.3333333333333333); // => 44px
  });
});
