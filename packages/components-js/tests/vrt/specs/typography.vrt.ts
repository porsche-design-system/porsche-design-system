import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionOverviewTester } from '../helpers/setup';

describe('Typography', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionOverviewTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('typography', async () => {
        await vrt.goTo('/src/components/basic/typography/typography.test.html');
      })
    ).toBeFalsy();
  });
});
