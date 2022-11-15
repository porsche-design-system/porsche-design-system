import {
  extendedViewports,
  getVisualRegressionStatesTester,
  getVisualRegressionTester,
  vrtTest,
} from '@porsche-design-system/shared/testing';

it.each(extendedViewports)('should have no visual regression for basic modal for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'modal-basic', '/modal-basic', { javaScriptEnabled: false })
  ).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for scrollable modal for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-scrollable', '/modal-scrollable', {
        javaScriptEnabled: false,
        scenario: async (page) => {
          await page.tap('#scroll-into-view');
        },
      })
    ).toBeFalsy();
  }
);

it('should have no visual regression for prefixed modal', async () => {
  // single resolution
  expect(
    await vrtTest(getVisualRegressionStatesTester(), 'modal-prefixed', '/modal-prefixed', { javaScriptEnabled: false })
  ).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for fullscreen modal for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-fullscreen', '/modal-fullscreen', {
        javaScriptEnabled: false,
      })
    ).toBeFalsy();
  }
);

it.each(extendedViewports)(
  'should have no visual regression for fullscreen breakpoint modal for viewport %s',
  async (viewport) => {
    const vrt = getVisualRegressionTester(viewport);

    expect(
      await vrtTest(vrt, 'modal-fullscreen-breakpoint', '/modal-fullscreen-breakpoint', { javaScriptEnabled: false })
    ).toBeFalsy();
  }
);

it.each(extendedViewports)('should have no visual regression for full-width-slot for viewport %s', async (viewport) => {
  expect(
    await vrtTest(getVisualRegressionTester(viewport), 'modal-full-width-slot', '/modal-full-width-slot', {
      javaScriptEnabled: false,
    })
  ).toBeFalsy();
});

it.each(extendedViewports)(
  'should have no visual regression for modal without heading for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-no-heading', '/modal-no-heading', {
        javaScriptEnabled: false,
      })
    ).toBeFalsy();
  }
);

it.each(extendedViewports)(
  'should have no visual regression for modal with slotted heading for viewport %s',
  async (viewport) => {
    expect(
      await vrtTest(getVisualRegressionTester(viewport), 'modal-slotted-heading', '/modal-slotted-heading', {
        javaScriptEnabled: false,
      })
    ).toBeFalsy();
  }
);
