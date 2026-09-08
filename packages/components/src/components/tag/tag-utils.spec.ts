import { TAG_VARIANTS } from './tag-utils';

describe('TAG_VARIANTS', () => {
  it('should list supported variant values', () => {
    expect(TAG_VARIANTS).toStrictEqual([
      'primary',
      'secondary',
      'info',
      'info-frosted',
      'warning',
      'warning-frosted',
      'success',
      'success-frosted',
      'error',
      'error-frosted',
    ]);
  });
});
