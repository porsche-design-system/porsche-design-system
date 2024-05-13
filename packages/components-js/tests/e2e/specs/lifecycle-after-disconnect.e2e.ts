import { expect, test } from '@playwright/test';
import { buildDefaultComponentMarkup, getConsoleErrorsAmount, goto, initConsoleObserver, sleep } from '../helpers';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';

/**
 * When stencil web components are unmounted directly, their lifecycle hooks are invoked after disconnectedCallback.
 * This can lead to exceptions when components require references to their parent element which is already gone.
 * https://github.com/ionic-team/stencil/issues/2502
 */
const tagNames: TagName[] = TAG_NAMES.filter((tagName) => !INTERNAL_TAG_NAMES.includes(tagName));

for (const tagName of tagNames) {
  test(`should not throw error after disconnectedCallback for ${tagName}`, async ({ page }) => {
    // TODO: Banner is now using popover attribute which needs an update of Playwright so Firefox supports it (#3129)
    test.skip(({ browserName }) => tagName === 'p-banner' && browserName === 'firefox');

    initConsoleObserver(page);
    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName);

    await page.evaluate(
      ({ tagName, markup }) => {
        document.getElementById('app').innerHTML = markup;
        document.getElementById('app').querySelector(tagName).remove(); // remove component immediately
      },
      { tagName, markup }
    );

    await sleep(100);

    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
}
