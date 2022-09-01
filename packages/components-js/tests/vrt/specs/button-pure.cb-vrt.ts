import { test } from '@playwright/test';
import { cbVRT, defaultViewports, testIfSkeletonsActive } from '../helpers/cb-vrt-helper';

test.describe('should have no visual regression', () => {
  defaultViewports.forEach(async (viewport) => {
    await cbVRT('button-pure', viewport);
  });
});

testIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  await cbVRT('button-pure-skeleton');
});
