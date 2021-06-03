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

describe('Text List', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'text-list',
        async () => {
          await vrt.goTo('/#text-list');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('text-list-states', async () => {
        const page = await vrt.getPage();

        const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-text-list theme="${theme}">
            <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
            <p-text-list-item>
              The quick
              <a onclick="return false;" href="#">brown fox</a>
              jumps over the lazy dog
            </p-text-list-item>
          </p-text-list>`;

        await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

        await forceHoveredState(page, '.hovered > p-text-list a');
        await forceFocusedState(page, '.focused > p-text-list a');
        await forceFocusedHoveredState(page, '.focused-hovered > p-text-list a');
      })
    ).toBeFalsy();
  });
});
