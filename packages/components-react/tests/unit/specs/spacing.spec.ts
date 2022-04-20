import { getPaddingStyles } from '../../../projects/uxpin-wrapper/src/spacing';

describe('getPaddingStyles', () => {
  it('should correctly map spacings to padding', () => {
    expect(getPaddingStyles({ spacingTop: undefined, spacingLeft: 4, spacingRight: 8, spacingBottom: 24 })).toEqual({
      paddingTop: undefined,
      paddingLeft: '4px',
      paddingRight: '8px',
      paddingBottom: '24px',
    });
  });
});
