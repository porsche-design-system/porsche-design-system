import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionOverviewTester } from '../helpers/setup';

fdescribe('Typography', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('typography', async () => {
        await vrt.goTo('/src/components/basic/typography/typography.test.html');
      })
    ).toBeFalsy();
  });
});
