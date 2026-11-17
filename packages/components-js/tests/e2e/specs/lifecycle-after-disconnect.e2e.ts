import { harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { buildDefaultComponentMarkup, goto, sleep } from '../helpers';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';

/**
 * When stencil web components are unmounted directly, their lifecycle hooks are invoked after disconnectedCallback.
 * This can lead to exceptions when components require references to their parent element which is already gone.
 * https://github.com/ionic-team/stencil/issues/2502
 */
const tagNames: TagName[] = TAG_NAMES.filter((tagName) => !INTERNAL_TAG_NAMES.includes(tagName));

for (const tagName of tagNames) {
  test.describe(tagName, () => {
    if (tagName === 'p-select-option') {
      // TODO remove once #4868 is fixed
      test.use({
        expectedConsole: async ({ expectedConsole }, use) =>
          use([
            ...expectedConsole,
            /Cannot read properties of null \(reading 'children'\)/,
            /null is not an object \(evaluating '.*\.pSelect\)\.children'\)/,
            /can't access property "children", .* is null/,
          ]),
      });
    }
    if (tagName === 'p-display') {
      test.use({
        expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, ...harnessPageConsole.display]),
      });
    }

    test(`should not throw error after disconnectedCallback`, async ({ page, browserName }) => {
      // TODO: Banner is now using popover attribute which needs an update of Playwright so Firefox supports it (#3129)
      test.skip(tagName === 'p-banner' && browserName === 'firefox');

      await goto(page, ''); // start page

      const markup = buildDefaultComponentMarkup(tagName);

      await page.evaluate(
        ({ tagName, markup }) => {
          const app = document.getElementById('app');
          if (!app) throw new Error('#app not found');
          app.innerHTML = markup;
          const component = app.querySelector(tagName);
          if (!component) throw new Error(`${tagName} not found`);
          component.remove(); // remove component immediately
        },
        { tagName, markup }
      );

      await sleep(100);
    });
  });
}
