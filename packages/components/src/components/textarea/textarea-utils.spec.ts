import { TEXTAREA_RESIZE, TEXTAREA_WRAPS } from './textarea-utils';

describe('TEXTAREA_WRAPS', () => {
  it('should list supported wrap values', () => {
    expect(TEXTAREA_WRAPS).toStrictEqual(['hard', 'soft', 'off']);
  });
});

describe('TEXTAREA_RESIZE', () => {
  it('should list supported resize values', () => {
    expect(TEXTAREA_RESIZE).toStrictEqual(['none', 'both', 'horizontal', 'vertical', 'block', 'inline']);
  });
});
