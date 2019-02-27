import 'jasmine';
import { VisualRegressionTester } from '@porsche/visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../vrt/helpers/setup';

describe('Icons', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('icons~overview', async () => {
      await visualRegressionTester.goTo('/99-design-spec-icons-icons/99-design-spec-icons-icons.rendered.html');
    })).toBeFalsy();
  });
});
