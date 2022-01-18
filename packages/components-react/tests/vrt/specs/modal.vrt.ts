import {
  extendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(extendedViewports)('should have no visual regression for basic modal for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'modal-basic', '/modal-basic')).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for scrollable modal for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-scrollable', '/modal-scrollable', {
        scenario: (page) =>
          page.evaluate(() => {
            // screenshot triggers resize, so we need to scroll the modal after that
            window.addEventListener('resize', () => {
              document.querySelector('p-modal').scrollTo(0, 10000);
            });
          }),
      })
    ).toBeFalsy();
  }
);

it('should have no visual regression for prefixed modal', async () => {
  // single resolution
  expect(await vrtTest(getVisualRegressionStatesTester(), 'modal-prefixed', '/modal-prefixed')).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for fullscreen modal for viewport %s',
  async (viewport) => {
    expect(await vrtTest(getVisualRegressionTester(viewport), 'modal-fullscreen', '/modal-fullscreen')).toBeFalsy();
  }
);

it.each(extendedViewports)(
  'should have no visual regression for fullscreen breakpoint modal for viewport %s',
  async (viewport) => {
    const vrt = getVisualRegressionTester(viewport);

    expect(await vrtTest(vrt, 'modal-fullscreen-breakpoint', '/modal-fullscreen-breakpoint')).toBeFalsy();

    expect(
      await vrtTest(vrt, 'modal-fullscreen-breakpoint-m', '/modal-fullscreen-breakpoint', {
        scenario: (page) =>
          page.evaluate(() => {
            (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
          }),
      })
    ).toBeFalsy();
  }
);

it.each(extendedViewports)('should have no visual regression for full-width-slot for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'modal-full-width-slot', '/modal-full-width-slot')
  ).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for modal without heading for viewport %s',
  async (viewport) => {
    expect(await vrtTest(getVisualRegressionTester(viewport), 'modal-no-heading', '/modal-no-heading')).toBeFalsy();
  }
);
