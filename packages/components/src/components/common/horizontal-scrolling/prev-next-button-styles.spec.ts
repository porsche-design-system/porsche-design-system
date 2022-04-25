import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getFunctionalComponentPrevNextButtonStyles('#f2f2f2', '#f2f2f20000')).toMatchSnapshot();
  });
});
