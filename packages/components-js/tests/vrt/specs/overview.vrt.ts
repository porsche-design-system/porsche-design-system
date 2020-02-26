import 'jasmine';
import {VisualRegressionTester} from '@porsche-ui/visual-regression-tester';
import {getVisualRegressionOverviewTester} from '../helpers/setup';

describe('Components Overview', () => {
  let vrt: VisualRegressionTester;

  beforeAll(async () => {
    vrt = await getVisualRegressionOverviewTester();
  });

  it('should have no visual regression for basic', async () => {
    expect(
      await vrt.test('overview-basic', async () => {
        await vrt.goTo('/index.html#basic', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for action', async () => {
    expect(
      await vrt.test('overview-action', async () => {
        await vrt.goTo('/index.html#action', 1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for form', async () => {
    expect(
      await vrt.test('overview-form', async () => {
        await vrt.goTo('/index.html#form',1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for feedback', async () => {
    expect(
      await vrt.test('overview-feedback', async () => {
        await vrt.goTo('/index.html#feedback',1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for icon', async () => {
    expect(
      await vrt.test('overview-icon', async () => {
        await vrt.goTo('/index.html#icon',1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for layout', async () => {
    expect(
      await vrt.test('overview-layout', async () => {
        await vrt.goTo('/index.html#layout',1000);
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for navigation', async () => {
    expect(
      await vrt.test('overview-navigation', async () => {
        await vrt.goTo('/index.html#navigation',1000);
      })
    ).toBeFalsy();
  });
});
