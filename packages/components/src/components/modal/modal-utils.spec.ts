import { MODAL_ARIA_ATTRIBUTES, MODAL_BACKGROUNDS } from './modal-utils';

describe('MODAL_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(MODAL_ARIA_ATTRIBUTES).toStrictEqual(['aria-label', 'role']);
  });
});

describe('MODAL_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(MODAL_BACKGROUNDS).toStrictEqual(['canvas', 'surface']);
  });
});
