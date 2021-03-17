import { getVisualRegressionTesterPropTable } from '../helpers/setup';

describe('Props Table Button', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTesterPropTable();
    expect(
      await vrt.test(
        'props-table-button',
        async () => {
          await vrt.goTo('/#/components/button#props');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
