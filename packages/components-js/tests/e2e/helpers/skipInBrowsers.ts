import { test } from '@porsche-design-system/testing/playwright';
import type { PlaywrightWorkerOptions } from 'playwright/types/test';

const insertSkipper = (browserNames: PlaywrightWorkerOptions['browserName'][]) =>
  test.skip(({ browserName }) => browserNames.includes(browserName));

export const skipInBrowsers = (browserNames: PlaywrightWorkerOptions['browserName'][], testFunction?: () => void) =>
  !testFunction
    ? insertSkipper(browserNames)
    : test.describe(`skip in ${browserNames.join(', ')}`, () => {
        insertSkipper(browserNames);
        testFunction();
      });
