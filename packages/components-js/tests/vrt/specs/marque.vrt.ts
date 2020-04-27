import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Marque', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('marque', async () => {
        await vrt.goTo('/src/components/basic/marque/marque.test.html');
      })
    ).toBeFalsy();
  });
});
