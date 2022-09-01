import { extendedViewports, cbVRT } from '../helpers/cb-vrt-helper';
import { test } from '@playwright/test';
test.describe('should have no visual regression for basic modal', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-basic', viewport);
  });
});

test.describe('should have no visual regression for scrollable modal', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-scrollable', viewport, {
      viewportHeight: 320,
      scenario: (page) =>
        page.evaluate(() => {
          document.querySelector('p-modal').scrollTo(0, 10000);
        }),
    });
  });
});

test.describe('should have no visual regression for prefixed modal', async () => {
  // single resolution
  await cbVRT('modal-prefixed');
});

test.describe('should have no visual regression for fullscreen modal', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-fullscreen', viewport);
  });
});

test.describe('should have no visual regression for fullscreen breakpoint modal', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-fullscreen-breakpoint', viewport);
    await cbVRT('modal-fullscreen-breakpoint', viewport, {
      namePostfix: '-m',
      scenario: (page) =>
        page.evaluate(() => {
          (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
        }),
    });
  });
});

test.describe('should have no visual regression for full-width-slot', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-full-width-slot', viewport);
  });
});

test.describe('should have no visual regression for modal without heading', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-no-heading', viewport);
  });
});

test.describe('should have no visual regression for modal with slotted heading', () => {
  extendedViewports.forEach(async (viewport) => {
    await cbVRT('modal-slotted-heading', viewport);
  });
});
