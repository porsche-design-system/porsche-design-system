import { getVisualRegressionTesterPropTable } from '../helpers/setup';

describe('Prop Table Tabs-Bar', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTesterPropTable();
    expect(
      await vrt.test(
        'prop-table-tabs-bar',
        async () => {
          await vrt.goTo('/#/components/tabs-bar#props');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
