import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Headline', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'headline', '/#headline')).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('headline-states', async () => {
        const page = vrt.getPage();

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-headline variant="headline-3" theme="${theme}">Some Headline with <a href="#">link</a></p-headline>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-headline a');
        await forceFocusedState(page, '.focused > p-headline a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-headline a');
      })
    ).toBeFalsy();
  });
});
