import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Link Social', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('link-social', async () => {
        await vrt.goTo('/src/components/navigation/link-social/link-social.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
