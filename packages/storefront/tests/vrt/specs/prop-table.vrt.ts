import { getVisualRegressionTesterPropTable } from '../helpers/setup';

describe('Prop Table', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTesterPropTable();
    expect(
      await vrt.test(
        'prop-table',
        async () => {
          await vrt.goTo('/#/components/tabs-bar#props');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
