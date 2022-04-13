import {
  forceFocusHoverState,
  forceFocusState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  marqueViewports,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'marque', '/#marque')).toBeFalsy();
});

it.each(marqueViewports)('should have no visual regression on retina 2x display for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionMarque2xTester(viewport), 'marque-2x', '/#marque')).toBeFalsy();
});

it.each(marqueViewports)('should have no visual regression on retina 3x display for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionMarque3xTester(viewport), 'marque-3x', '/#marque')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('marque-states', async () => {
      const page = vrt.getPage();
      const head = `<style>
  p-marque:not(:last-child) { margin-right: 0.5rem; }
</style>`;

      const getElementsMarkup: GetMarkup = () => `<p-marque href="https://www.porsche.com"></p-marque>
<p-marque href="https://www.porsche.com" style="padding: 1rem"></p-marque>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus > p-marque'); // native outline should not be visible
      await forceFocusState(page, '.focus > p-marque >>> a');
      await forceFocusHoverState(page, '.focus-hover > p-marque >>> a');
    })
  ).toBeFalsy();
});
