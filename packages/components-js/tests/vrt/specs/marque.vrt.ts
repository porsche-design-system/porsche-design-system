import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import {
  getVisualRegressionRetina2xTester,
  getVisualRegressionRetina3xTester,
  getVisualRegressionTester
} from '../helpers/setup';

describe('Marque', () => {
  let vrt: VisualRegressionTester;
  let vrt2x: VisualRegressionTester;
  let vrt3x: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
    vrt2x = getVisualRegressionRetina2xTester();
    vrt3x = getVisualRegressionRetina3xTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test('marque', async () => {
        await vrt.goTo('/src/components/basic/marque/marque.test.html');
      })
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    expect(
      await vrt2x.test('marque-2x', async () => {
        await vrt2x.goTo('/src/components/basic/marque/marque.test.html');
      })
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    expect(
      await vrt3x.test('marque-3x', async () => {
        await vrt3x.goTo('/src/components/basic/marque/marque.test.html');
      })
    ).toBeFalsy();
  });
});
