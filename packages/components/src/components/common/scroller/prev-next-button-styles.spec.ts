import { getFunctionalComponentPrevNextButtonStyles } from './prev-next-button-styles';

describe('getFunctionalComponentStateMessageStyles()', () => {
  it('should return correct JssStyle for hasTabsBarParent: false', () => {
    expect(getFunctionalComponentPrevNextButtonStyles('#f2f2f2', false)).toMatchSnapshot();
  });

  it('should return correct JssStyle for hasTabsBarParent: true', () => {
    expect(getFunctionalComponentPrevNextButtonStyles('#f2f2f2', true)).toMatchSnapshot();
  });
});
