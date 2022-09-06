import { cbVRT, testIfSkeletonsActive } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', async () => {
  await cbVRT('text-field-wrapper');
});

testIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  await cbVRT('text-field-wrapper-skeleton');
});
