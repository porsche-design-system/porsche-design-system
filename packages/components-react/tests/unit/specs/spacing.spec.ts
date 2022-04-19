import { mapSpacingToPadding } from '../../../projects/uxpin-wrapper/src/spacing';

describe('mapSpacingToPadding', () => {
  it('should correctly map spacings to padding', () => {
    expect(mapSpacingToPadding({ spacingLeft: 8, spacingRight: 8, spacingBottom: 4 })).toEqual({
      paddingTop: undefined,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 4,
    });
  });
});
