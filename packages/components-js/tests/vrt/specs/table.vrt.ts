import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getBodyMarkup,
  GetMarkup,
  setContentWithDesignSystem,
} from '../helpers';
import {
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

describe('Table', () => {
  it('should have no visual regression', async () => {
    expect(await vrtTest(getVisualRegressionTester(), 'table', '/#table')).toBeFalsy();
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
        // TODO: `await forceFocusedState(page, '.focused p-table >>> .scroll-area');`, no class is selectable after piercing selector
        await forceHoveredState(page, '.hovered p-table-head-cell >>> button');
        await forceHoveredState(page, '.hovered p-table-cell a');
        await forceHoveredState(page, '.hovered [slot="caption"] a');
        await forceHoveredState(page, '.hovered p-table-row:nth-child(3)');
        await forceFocusedState(page, '.focused p-table-head-cell >>> button');
        await forceFocusedState(page, '.focused p-table-cell a');
        await forceFocusedState(page, '.focused [slot="caption"] a');
        await forceFocusedHoveredState(page, '.focused-hovered p-table-head-cell >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered p-table-cell a');
        await forceFocusedHoveredState(page, '.focused-hovered [slot="caption"] a');
      })
    ).toBeFalsy();
  });
});
