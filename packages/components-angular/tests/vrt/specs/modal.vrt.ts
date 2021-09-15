import {
  getVisualRegressionStatesTester,
  getVisualRegressionContentWrapperTester,
  vrtTest,
  VisualRegressionTester,
} from '@porsche-design-system/shared/testing';

describe('Modal', () => {
  let vrt: VisualRegressionTester;

  beforeAll(() => {
    vrt = getVisualRegressionContentWrapperTester();
  });

  it('should have no visual regression for basic modal', async () => {
    expect(await vrtTest(vrt, 'modal-basic', '/modal-basic')).toBeFalsy();
  });

  it('should have no visual regression for scrollable modal', async () => {
    expect(
      await vrtTest(vrt, 'modal-scrollable', '/modal-scrollable', {
        scenario: (page) =>
          page.evaluate(() => {
            // screenshot triggers resize, so we need to scroll the modal after that
            window.addEventListener('resize', () => {
              document.querySelector('p-modal').scrollTo(0, 10000);
            });
          }),
      })
    ).toBeFalsy();
  });

  it('should have no visual regression for prefixed modal', async () => {
    // single resolution
    expect(await vrtTest(getVisualRegressionStatesTester(), 'modal-prefixed', '/modal-prefixed')).toBeFalsy();
  });

  it('should have no visual regression for fullscreen modal', async () => {
    expect(await vrtTest(vrt, 'modal-fullscreen', '/modal-fullscreen')).toBeFalsy();
  });

  it('should have no visual regression for fullscreen breakpoint modal', async () => {
    expect(await vrtTest(vrt, 'modal-fullscreen-breakpoint', '/modal-fullscreen-breakpoint')).toBeFalsy();

    expect(
      await vrtTest(vrt, 'modal-fullscreen-breakpoint-m', '/modal-fullscreen-breakpoint', {
        scenario: (page) =>
          page.evaluate(() => {
            (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
          }),
      })
    ).toBeFalsy();
  });
});
