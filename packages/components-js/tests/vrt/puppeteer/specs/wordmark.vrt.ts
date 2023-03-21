import {
  forceFocusHoverState,
  forceFocusState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  defaultViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(defaultViewports)('should have no visual regression for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'wordmark', '/#wordmark')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('wordmark-states', async () => {
      const page = vrt.getPage();
      const head = `<style>
  p-wordmark:not(:last-child) { margin-right: 0.5rem; }
</style>`;

      const getElementsMarkup: GetMarkup = () => `<p-wordmark href="https://www.porsche.com"></p-wordmark>
<p-wordmark href="https://www.porsche.com" style="padding: 1rem"></p-wordmark>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup), { injectIntoHead: head });

      await forceFocusState(page, '.focus p-wordmark'); // native outline should not be visible
      await forceFocusState(page, '.focus p-wordmark >>> a');
      await forceFocusHoverState(page, '.focus-hover p-wordmark >>> a');
    })
  ).toBeFalsy();
});
