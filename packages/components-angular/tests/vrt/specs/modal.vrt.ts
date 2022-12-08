import {
  extendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(extendedViewports)('should have no visual regression for basic modal for viewport %s', async (viewport) => {
  expect(await vrtTest(getVisualRegressionTester(viewport), 'modal-basic', '/modal-basic')).toBeFalsy();
});

// TODO: flaky vrt test on 1920px viewport width, check in a newer version of puppeteer if issue still remains
it.each(extendedViewports.filter((v) => v !== 1920))(
  'should have no visual regression for scrollable modal for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-scrollable', '/modal-scrollable', {
        scenario: async (page) => {
          await page.tap('#scroll-into-view');
        },
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

it.each(extendedViewports)(
  'should have no visual regression for modal with slotted heading for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-slotted-heading', '/modal-slotted-heading')
    ).toBeFalsy();
  }
);
