import { defaultViewports, cbVRT } from '../../vrt/helpers/cb-vrt-helper';
import { test } from '@playwright/test';

test.describe('should have no visual regression', () => {
  defaultViewports.forEach(async (viewport) => {
    await cbVRT('accordion', viewport);
  });
});
