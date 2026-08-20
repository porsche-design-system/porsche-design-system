import { SHEET_ARIA_ATTRIBUTES, SHEET_BACKGROUNDS } from './sheet-utils';

describe('SHEET_ARIA_ATTRIBUTES', () => {
  it('should list supported aria attributes', () => {
    expect(SHEET_ARIA_ATTRIBUTES).toStrictEqual(['aria-label', 'role']);
  });
});

describe('SHEET_BACKGROUNDS', () => {
  it('should list supported background values', () => {
    expect(SHEET_BACKGROUNDS).toStrictEqual(['canvas', 'surface']);
  });
});
