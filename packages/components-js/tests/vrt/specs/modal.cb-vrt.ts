import { cbVRT } from '../helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for basic modal', async () => {
  await cbVRT('modal-basic');
});

test.describe('should have no visual regression for scrollable modal', async () => {
  await cbVRT('modal-scrollable', {
    scenario: (page) =>
      page.evaluate(async () => {
        document.querySelector('p-modal').scrollTo(0, 10000);
      }),
  });
});

test.describe('should have no visual regression for prefixed modal', async () => {
  await cbVRT('modal-prefixed');
});

test.describe('should have no visual regression for fullscreen modal', async () => {
  await cbVRT('modal-fullscreen');
});

test.describe('should have no visual regression for fullscreen breakpoint modal', async () => {
  await cbVRT('modal-fullscreen-breakpoint');
  await cbVRT('modal-fullscreen-breakpoint', {
    namePostfix: '-m',
    scenario: (page) =>
      page.evaluate(() => {
        (document.querySelector('p-modal') as any).fullscreen = { base: false, m: true };
      }),
  });
});

test.describe('should have no visual regression for full-width-slot', async () => {
  await cbVRT('modal-full-width-slot');
});

test.describe('should have no visual regression for modal without heading', async () => {
  await cbVRT('modal-no-heading');
});

test.describe('should have no visual regression for modal with slotted heading', async () => {
  await cbVRT('modal-slotted-heading');
});
