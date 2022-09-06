import { test } from '@playwright/test';
import { cbVRT, testIfSkeletonsActive } from '../helpers/cb-vrt-helper';

test.describe('should have no visual regression', async () => {
  await cbVRT('button-pure');
});

testIfSkeletonsActive('should have no visual regression for skeleton', async () => {
  await cbVRT('button-pure-skeleton');
});
