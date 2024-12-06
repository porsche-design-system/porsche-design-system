import { getPaddingStyles } from '../../../src/spacing';
import { expect, describe, it } from 'vitest';

describe('getPaddingStyles()', () => {
  it('should correctly map spacings to padding', () => {
    expect(getPaddingStyles({ spacingTop: undefined, spacingLeft: 4, spacingRight: 8, spacingBottom: 24 })).toEqual({
      paddingLeft: '4px',
      paddingRight: '8px',
      paddingBottom: '24px',
    });
  });
});
