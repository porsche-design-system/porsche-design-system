import { cbVRT } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for font family fallback strategy', async () => {
  await cbVRT('typography-fallback-strategy');
});

test.describe.only('should have no visual regression for latin charset', async () => {
  await cbVRT('typography-latin');
});

test.describe('should have no visual regression greek and coptic charset', async () => {
  await cbVRT('typography-greek-and-coptic');
});

test.describe('should have no visual regression cyril charset', async () => {
  await cbVRT('typography-cyril');
});
