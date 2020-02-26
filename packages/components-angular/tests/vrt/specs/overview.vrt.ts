import 'jasmine';
import { VisualRegressionTester } from '@porsche-ui/visual-regression-tester';
import { getVisualRegressionTester } from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionTester();
  });

  it('Basic should have no visual regression', async () => {
    expect(
      await vrt.test('overview-basic', async () => {
        await vrt.goTo('/basic', 1000);
      })
    ).toBeFalsy();
  });

  it('Action should have no visual regression', async () => {
    expect( await vrt.test('overview-action', async () => {
        await vrt.goTo('/action', 1000);
      })
    ).toBeFalsy();
  });

  it('Feedback should have no visual regression', async () => {
    expect(
      await vrt.test('overview-feedback', async () => {
        await vrt.goTo('/feedback', 1000);
      })
    ).toBeFalsy();
  });

  it('Icon should have no visual regression', async () => {
    expect(
      await vrt.test('overview-icon', async () => {
        await vrt.goTo('/icon', 1000);
      })
    ).toBeFalsy();
  });

  it('Layout should have no visual regression', async () => {
    expect(
      await vrt.test('overview-layout', async () => {
        await vrt.goTo('/layout', 1000);
      })
    ).toBeFalsy();
  });

  it('Navigation should have no visual regression', async () => {
    expect(
      await vrt.test('overview-navigation', async () => {
        await vrt.goTo('/navigation', 1000);
      })
    ).toBeFalsy();
  });
});
