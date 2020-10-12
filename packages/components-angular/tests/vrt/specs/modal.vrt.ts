import { getVisualRegressionTester, testOptions } from '../helpers';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

describe('Modal', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionTester();
  });

  it('should have no visual regression for basic modal', async () => {
    expect(await vrt.test('modal-basic', () => vrt.goTo('/modal-basic'), testOptions)).toBeFalsy();
  });
  it('should have no visual regression for footer modal', async () => {
    expect(await vrt.test('modal-footer', () => vrt.goTo('/modal-footer'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for scrollable modal', async () => {
    expect(await vrt.test('modal-scrollable', () => vrt.goTo('/modal-scrollable'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for prefixed modal', async () => {
    expect(await vrt.test('modal-prefixed', () => vrt.goTo('/modal-prefixed'), testOptions)).toBeFalsy();
  });
});
