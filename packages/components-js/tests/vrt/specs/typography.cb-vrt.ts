import { cbVRT } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression for font family fallback strategy', async () => {
  await cbVRT('typography-fallback-strategy');
});

test.describe.only('should have no visual regression for latin charset U+0020-1EFF', async () => {
  await cbVRT('typography-latin-U+0020-1EFF');
});

test.describe.only('should have no visual regression for latin charset U+2000-26FF', async () => {
  await cbVRT('typography-latin-U+2000-26FF');
});

test.describe.only('should have no visual regression for latin charset U+FB00-FEFF', async () => {
  await cbVRT('typography-latin-U+FB00-FEFF');
});

test.describe('should have no visual regression greek and coptic charset', async () => {
  await cbVRT('typography-greek-and-coptic');
});

test.describe('should have no visual regression cyril charset', async () => {
  await cbVRT('typography-cyril');
});
