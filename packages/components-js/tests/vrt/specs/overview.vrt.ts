import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionOverviewTester} from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
  });

  it('basic should have no visual regression', async () => {
    expect(
      await vrt.test('overview-basic', async () => {
        await vrt.goTo('/src/#basic', 1000);
      })
    ).toBeFalsy();
  });

  it('action should have no visual regression', async () => {
    expect(
      await vrt.test('overview-action', async () => {
        await vrt.goTo('/src/#action', 1000);
      })
    ).toBeFalsy();
  });

  it('feedback should have no visual regression', async () => {
    expect(
      await vrt.test('overview-feedback', async () => {
        await vrt.goTo('/src/#feedback',1000);
      })
    ).toBeFalsy();
  });

  it('icon should have no visual regression', async () => {
    expect(
      await vrt.test('overview-icon', async () => {
        await vrt.goTo('/src/#icon',1000);
      })
    ).toBeFalsy();
  });

  it('layout should have no visual regression', async () => {
    expect(
      await vrt.test('overview-layout', async () => {
        await vrt.goTo('/src/#layout',1000);
      })
    ).toBeFalsy();
  });

  it('navigation should have no visual regression', async () => {
    expect(
      await vrt.test('overview-navigation', async () => {
        await vrt.goTo('/src/#navigation',1000);
      })
    ).toBeFalsy();
  });
});
