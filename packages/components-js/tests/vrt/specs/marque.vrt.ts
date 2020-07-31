import 'jasmine';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import {
  getVisualRegressionMarque2xTester,
  getVisualRegressionMarque3xTester,
  getVisualRegressionTester,
  testOptions
} from '../helpers';

describe('Marque', () => {
  let vrt: VisualRegressionTester;
  let vrt2x: VisualRegressionTester;
  let vrt3x: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
    vrt2x = getVisualRegressionMarque2xTester();
    vrt3x = getVisualRegressionMarque3xTester();
  });

  it('should have no visual regression', async () => {
    expect(
      await vrt.test(
        'marque',
        async () => {
          await vrt.goTo('#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 2x display', async () => {
    expect(
      await vrt2x.test(
        'marque-2x',
        async () => {
          await vrt2x.goTo('#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });

  it('should have no visual regression on retina 3x display', async () => {
    expect(
      await vrt3x.test(
        'marque-3x',
        async () => {
          await vrt3x.goTo('#marque');
        },
        testOptions
      )
    ).toBeFalsy();
  });
});
