import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('Link Pure', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('link-pure', async () => {
        await vrt.goTo('/src/components/navigation/link-pure/link-pure.test.html');
        await vrt.focus('#test-focus-state');
      })
    ).toBeFalsy();
  });
});
