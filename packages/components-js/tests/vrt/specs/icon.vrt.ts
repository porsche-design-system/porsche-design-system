import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

fdescribe('Icon', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('icon', async () => {
        await vrt.goTo('/src/components/icon/icon/icon.test.html');
      })
    ).toBeFalsy();
  });
});
