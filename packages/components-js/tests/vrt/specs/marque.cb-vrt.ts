import { cbVRT } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression on retina 3x display', async () => {
  await cbVRT('marque');
});
