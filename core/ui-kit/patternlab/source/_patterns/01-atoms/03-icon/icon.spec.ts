import 'jasmine';
import { VisualRegressionTester } from '@myporsche/myservices-visual-regression-tester';
import { getVisualRegressionTester } from '../../../../../vrt/helpers/setup';

describe('Icon', () => {
  let visualRegressionTester: VisualRegressionTester;

  beforeAll(async () => {
    visualRegressionTester = await getVisualRegressionTester();
  });

  it('should have no visual regression', async () => {
    expect(await visualRegressionTester.test('icon~default', async () => {
      await visualRegressionTester.goTo('/01-atoms-03-icon-icon/01-atoms-03-icon-icon.rendered.html');
    })).toBeFalsy();
  });
});
