import { getVisualRegressionContentWrapperTester, testOptions } from '../helpers';
import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';

describe('Modal', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression for basic modal', async () => {
    expect(await vrt.test('modal-basic', () => vrt.goTo('/modal-basic'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for scrollable modal', async () => {
    expect(await vrt.test('modal-scrollable', () => vrt.goTo('/modal-scrollable'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for prefixed modal', async () => {
    expect(await vrt.test('modal-prefixed', () => vrt.goTo('/modal-prefixed'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for fullscreen modal', async () => {
    expect(await vrt.test('modal-fullscreen', () => vrt.goTo('/modal-fullscreen'), testOptions)).toBeFalsy();
  });

  it('should have no visual regression for fullscreen breakpoint modal', async () => {
    expect(
      await vrt.test('modal-fullscreen-breakpoint', () => vrt.goTo('/modal-fullscreen-breakpoint'), testOptions)
    ).toBeFalsy();
  });
});
