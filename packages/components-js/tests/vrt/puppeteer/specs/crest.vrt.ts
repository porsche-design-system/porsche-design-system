import {
  forceFocusHoverState,
  forceFocusState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionCrest2xTester,
  getVisualRegressionCrest3xTester,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'crest', '/#crest')).toBeFalsy();
});

it('should have no visual regression on retina 2x display for viewport %s', async () => {
  expect(await vrtTest(getVisualRegressionCrest2xTester(1000), 'crest-2x', '/#crest')).toBeFalsy();
});

it('should have no visual regression on retina 3x display for viewport %s', async () => {
  expect(await vrtTest(getVisualRegressionCrest3xTester(1000), 'crest-3x', '/#crest')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('crest-states', async () => {
      const page = vrt.getPage();
      const head = `<style>
  p-crest:not(:last-child) { margin-right: 0.5rem; }
</style>`;

      const getElementsMarkup: GetMarkup = () => `<p-crest href="https://www.porsche.com"></p-crest>
<p-crest href="https://www.porsche.com" style="padding: 1rem"></p-crest>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus p-crest'); // native outline should not be visible
      await forceFocusState(page, '.focus p-crest >>> a');
      await forceFocusHoverState(page, '.focus-hover p-crest >>> a');
    })
  ).toBeFalsy();
});
