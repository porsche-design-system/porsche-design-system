import { randomString } from '../../../src/utils';

describe('randomString', () => {
  it('should return a random value', () => {
    const resultA = randomString();
    const resultB = randomString();

    expect(resultA).not.toBe(resultB);
  });

  it('should return the value as a string', () => {
    const resultA = randomString();

    expect(typeof resultA).toBe('string');
  });

  it('should return a value which is 9 characters long', () => {
    const resultA = randomString();

    expect(resultA).toHaveLength(9);
  });
});
