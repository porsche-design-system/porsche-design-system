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
      await vrt.test('basic', async () => {
        await vrt.goTo('/basic');
      })
    ).toBeFalsy();
  });
  
  it('Action should have no visual regression', async () => {
    expect( await vrt.test('action', async () => {
        await vrt.goTo('/action');
      })
    ).toBeFalsy();
  });

  it('Feedback should have no visual regression', async () => {
    expect(
      await vrt.test('feedback', async () => {
        await vrt.goTo('/feedback');
      })
    ).toBeFalsy();
  });

  it('Icon should have no visual regression', async () => {
    expect(
      await vrt.test('icon', async () => {
        await vrt.goTo('/icon');
      })
    ).toBeFalsy();
  });

  it('Layout should have no visual regression', async () => {
    expect(
      await vrt.test('layout', async () => {
        await vrt.goTo('/layout');
      })
    ).toBeFalsy();
  });

  it('Navigation should have no visual regression', async () => {
    expect(
      await vrt.test('navigation', async () => {
        await vrt.goTo('/navigation');
      })
    ).toBeFalsy();
  });
});
