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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'heading', '/#heading')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('heading-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetThemedMarkup = (theme) => `
        <p-heading size="large" theme="${theme}">Some Heading with <a href="#">link</a></p-heading>`;

      await setContentWithDesignSystem(page, getThemedBodyMarkup(getElementsMarkup));

      await forceHoverState(page, '.hover > p-heading a');
      await forceFocusState(page, '.focus > p-heading a');
      await forceFocusHoverState(page, '.focus-hover > p-heading a');
    })
  ).toBeFalsy();
});
