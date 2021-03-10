import { getVisualRegressionTesterPropTable } from '../helpers/setup';

describe('Prop Table Button', () => {
  it('should have no visual regression', async () => {
    const vrt = getVisualRegressionTesterPropTable();
    expect(
      await vrt.test(
        'prop-table-button',
        async () => {
          await vrt.goTo('/#/components/button#props');
        },
        { elementSelector: '#app > .main > .router-view' }
      )
    ).toBeFalsy();
  });
});
