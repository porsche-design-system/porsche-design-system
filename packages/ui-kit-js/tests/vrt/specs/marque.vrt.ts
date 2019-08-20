import 'jasmine';
import { VisualRegressionTester } from '@porscheui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Marque', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await visualRegressionTester.test('marque', async () => {
        await visualRegressionTester.goTo('/src/components/basic/marque/marque.test.html');
      })
    ).toBeFalsy();
  });
});
