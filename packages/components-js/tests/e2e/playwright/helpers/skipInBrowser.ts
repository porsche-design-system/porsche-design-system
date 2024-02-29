import { PlaywrightWorkerOptions } from 'playwright/types/test';
import { test } from '@playwright/test';

function insertSkipper(browserNames: PlaywrightWorkerOptions['browserName'][]) {
  for (const ignoredBrowser of browserNames) {
    test.skip(({ browserName }) => ignoredBrowser === browserName);
  }
}

export function skipInBrowser(browserNames: PlaywrightWorkerOptions['browserName'][], testFunction?: () => void) {
  if (!testFunction) {
    insertSkipper(browserNames);
  } else {
    test.describe(`skip in ${browserNames.join(', ')}`, () => {
      insertSkipper(browserNames);
      testFunction();
    });
  }
}
