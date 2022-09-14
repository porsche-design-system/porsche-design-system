import {
  forceFocusHoverState,
  forceFocusState,
  forceHoverState,
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
  expect(await vrtTest(getVisualRegressionTester(viewport), 'table', '/#table')).toBeFalsy();
});

it('should have no visual regression for :hover + :focus-visible', async () => {
  const vrt = getVisualRegressionStatesTester();
  expect(
    await vrt.test('table-states', async () => {
      const page = vrt.getPage();

      const getElementsMarkup: GetMarkup = () => `
<p-table>
  <span slot="caption">Some caption <a href="#">with a link</a></span>
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell style="min-width: 2000px;">Some head cell</p-table-head-cell>
    </p-table-head-row>
  </p-table-head>
  <p-table-body>
    <p-table-row>
      <p-table-cell>Some <a href="#">link</a></p-table-cell>
    </p-table-row>
    <p-table-row>
      <p-table-cell>Some cell</p-table-cell>
    </p-table-row>
    <p-table-row>
      <p-table-cell>Some cell</p-table-cell>
    </p-table-row>
  </p-table-body>
</p-table>`;
      await setContentWithDesignSystem(page, getBodyMarkup(getElementsMarkup));

      await page.evaluate(() => {
        document.querySelectorAll('p-table-head-cell').forEach((el) => {
          (el as any).sort = { id: 'some-id', active: true, direction: 'asc' };
        });
      });

      // TODO: scroll trigger :hover + :focus-visible test is missing due piercing selector only works for nested child
      // TODO: `await forceFocusedState(page, '.focus p-table >>> .scroll-area');`, no class is selectable after piercing selector
      await forceHoverState(page, '.hover p-table-head-cell >>> button');
      await forceHoverState(page, '.hover p-table-cell a');
      await forceHoverState(page, '.hover [slot="caption"] a');
      await forceHoverState(page, '.hover p-table-row:nth-child(3)');
      await forceFocusState(page, '.focus p-table-head-cell >>> button');
      await forceFocusState(page, '.focus p-table-cell a');
      await forceFocusState(page, '.focus [slot="caption"] a');
      await forceFocusHoverState(page, '.focus-hover p-table-head-cell >>> button');
      await forceFocusHoverState(page, '.focus-hover p-table-cell a');
      await forceFocusHoverState(page, '.focus-hover [slot="caption"] a');
    })
  ).toBeFalsy();
});
