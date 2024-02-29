import { PlaywrightWorkerOptions } from 'playwright/types/test';
import { test } from '@playwright/test';

const insertSkipper = (browserNames: PlaywrightWorkerOptions['browserName'][]) =>
  test.skip(({ browserName }) => browserNames.includes(browserName));

export const skipInBrowser = (browserNames: PlaywrightWorkerOptions['browserName'][], testFunction?: () => void) =>
  !testFunction
    ? insertSkipper(browserNames)
    : test.describe(`skip in ${browserNames.join(', ')}`, () => {
        insertSkipper(browserNames);
        testFunction();
      });
