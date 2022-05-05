import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it('should return correct Styles', () => {
    expect(getFunctionalComponentPrevNextButtonStyles('#f2f2f2')).toMatchSnapshot();
    expect(
      getFunctionalComponentPrevNextButtonStyles('#f2f2f2', {
        top: 'calc(50% - .5em)',
        transform: 'translate3d(0,calc(-50% + .375em),0)',
      })
    ).toMatchSnapshot();
  });
});
