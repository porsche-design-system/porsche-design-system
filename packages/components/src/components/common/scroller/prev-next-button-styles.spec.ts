import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it('should return correct Styles', () => {
    expect(getFunctionalComponentPrevNextButtonStyles('#f2f2f2')).toMatchSnapshot();
  });
});
