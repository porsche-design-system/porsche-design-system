import { lineHeightFactor } from '../../../src/utils';

describe('lineHeight', () => {

  it('should return correct line-height value based on type scale definition', () => {
    const result1 = lineHeightFactor(16);
    const result2 = lineHeightFactor(90);
    const result3 = lineHeightFactor(33);

    expect(result1).toEqual(1.5);
    expect(result2).toEqual(1.2);
    expect(result3).toEqual(1.3333333333333333);
  });

});
