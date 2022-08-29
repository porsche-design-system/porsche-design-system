import { extendedViewports, cbVRT } from '../helpers/cb-vrt-helper';

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-basic', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-scrollable', viewport, {
    scenario: (page) =>
      page.evaluate(() => {
        // screenshot triggers resize, so we need to scroll the modal after that
        window.addEventListener('resize', () => {
          document.querySelector('p-modal').scrollTo(0, 10000);
        });
      }),
  });
});

// single resolution
cbVRT('modal-prefixed');

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-fullscreen', viewport);
});

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

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-full-width-slot', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-no-heading', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await cbVRT('modal-slotted-heading', viewport);
});
