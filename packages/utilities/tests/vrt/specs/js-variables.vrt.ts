import 'jasmine';
import {VisualRegressionTester} from '@porsche-design-system/visual-regression-tester';
import {getVisualRegressionTester} from '../helpers/setup';

describe('js-variables', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('js-variables', async () => {
        await vrt.goTo('/tests/vrt/html/js-variables.test.html');
      })
    ).toBeFalsy();
  });
});
