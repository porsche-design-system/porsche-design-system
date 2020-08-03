import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';
import { redraw } from '../../../../components-js/tests/vrt/helpers/redraw';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression for basic', async () => {
    expect(
      await vrt.test('overview-basic', async () => {
        await vrt.goTo('/basic', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for action', async () => {
    expect(
      await vrt.test('overview-action', async () => {
        await vrt.goTo('/action', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for form', async () => {
    expect(
      await vrt.test('overview-form', async () => {
        await vrt.goTo('/form', 1000);
        await redraw(vrt.getPage());
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for feedback', async () => {
    expect(
      await vrt.test('overview-feedback', async () => {
        await vrt.goTo('/feedback', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for icon', async () => {
    expect(
      await vrt.test('overview-icon', async () => {
        await vrt.goTo('/icon', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for layout', async () => {
    expect(
      await vrt.test('overview-layout', async () => {
        await vrt.goTo('/layout', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for navigation', async () => {
    expect(
      await vrt.test('overview-navigation', async () => {
        await vrt.goTo('/navigation', 1000);
      })
    ).toBeFalsy();
  });
});
