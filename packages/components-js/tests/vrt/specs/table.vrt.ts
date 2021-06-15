import {
  forceFocusedHoveredState,
  forceFocusedState,
  forceHoveredState,
  getBodyMarkup,
  GetMarkup,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  setContentWithDesignSystem,
  testOptions,
} from '../helpers';

describe('Table', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTester();
    expect(
      await vrt.test(
        'table',
        async () => {
          await vrt.goTo('/#table');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression for :hover + :focus-visible', async () => {
    const vrt = getVisualRegressionStatesTester();
    expect(
      await vrt.test('table-states', async () => {
        const page = await vrt.getPage();

        const getElementsMarkup: GetMarkup = () => `
<p-table caption="Some caption">
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
        await forceHoveredState(page, '.hovered p-table-head-cell >>> button');
        await forceHoveredState(page, '.hovered p-table-cell a');
        await forceHoveredState(page, '.hovered p-table-row:nth-child(3)');
        await forceFocusedState(page, '.focused p-table-head-cell >>> button');
        await forceFocusedState(page, '.focused p-table-cell a');
        await forceFocusedHoveredState(page, '.focused-hovered p-table-head-cell >>> button');
        await forceFocusedHoveredState(page, '.focused-hovered p-table-cell a');
      })
    ).toBeFalsy();
  });
});
