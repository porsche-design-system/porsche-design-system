import { extendedViewports, vrCbT } from '../helpers/vr-cbt-helper';

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-basic', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-scrollable', viewport, {
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
vrCbT('modal-prefixed');

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-fullscreen', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-fullscreen-breakpoint', viewport);
  await vrCbT('modal-fullscreen-breakpoint', viewport, {
    namePostfix: '-m',
    scenario: (page) =>
      page.evaluate(() => {
        (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
      }),
  });
});

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-full-width-slot', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-no-heading', viewport);
});

extendedViewports.forEach(async (viewport) => {
  await vrCbT('modal-slotted-heading', viewport);
});
