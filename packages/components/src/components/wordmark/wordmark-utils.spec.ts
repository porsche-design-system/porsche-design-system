import { WORDMARK_SIZES } from './wordmark-utils';

describe('WORDMARK_SIZES', () => {
  it('should list supported size values', () => {
    expect(WORDMARK_SIZES).toStrictEqual(['small', 'inherit']);
  });
});
