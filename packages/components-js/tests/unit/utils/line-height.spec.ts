import { lineHeight } from '../../../src/utils';

describe('lineHeight', () => {

  it('should return correct line-height value based on type scale definition', () => {
    const result1 = lineHeight(16);
    const result2 = lineHeight(90);
    const result3 = lineHeight(33);

    expect(result1).toEqual(1.5);
    expect(result2).toEqual(1.2);
    expect(result3).toEqual(1.3333333333333333);
  });

});
