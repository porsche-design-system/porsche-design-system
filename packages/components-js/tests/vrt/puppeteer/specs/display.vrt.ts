import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
  getThemedBodyMarkup,
  GetThemedMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'display', '/#display')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('display-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
          <p-display size="medium" theme="${theme}">Lorem ipsum dolor sit amet <a href="#">linked text</a> lorem <button>button text</button></p-display>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

      await forceHoverState(page, '.hover p-display a');
      await forceHoverState(page, '.hover p-display button');
      await forceFocusState(page, '.focus p-display a');
      await forceFocusState(page, '.focus p-display button');
      await forceFocusHoverState(page, '.focus-hover p-display a');
      await forceFocusHoverState(page, '.focus-hover p-display button');
    })
  ).toBeFalsy();
});
