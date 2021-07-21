import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Headline', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'headline',
        async () => {
          await vrt.goTo('/#headline');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('headline-states', async () => {
        const page = await vrt.getPage();

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-headline theme="${theme}">Some Headline with <a href="#">link</a></p-headline>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-headline a');
        await forceFocusedState(page, '.focused > p-headline a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-headline a');
      })
    ).toBeFalsy();
  });
});
