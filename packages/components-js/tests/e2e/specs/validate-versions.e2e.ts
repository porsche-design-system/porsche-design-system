import { expect, test } from '@porsche-design-system/testing/playwright';
import { assertDefined } from '@porsche-design-system/testing/assert-defined';
import { getOldLoaderScriptForPrefixes, setContentWithDesignSystem, sleep } from '../helpers';
import pkg from '@porsche-design-system/components-js/package.json';

const version = pkg.version as keyof typeof document.porscheDesignSystem;
const VERSION_VALIDATION_TIMEOUT = 3000;
const oldVersionUrls = [
  'https://cdn.ui.porsche.com/porsche-design-system/components/porsche-design-system.v3.7.0.3c3999ee659a976cf191.js',
  'https://cdn.ui.porsche.com/porsche-design-system/styles/font-face.min.02bef87be3cf3d34b4a5b63f52555cf5.css',
  'https://cdn.ui.porsche.com/porsche-design-system/fonts/porsche-next-w-la-regular.min.b8f1c203bd2ac5334247025236ba8d86.woff2',
];

test.describe('with v3.7.0 loaded', () => {
  test.use({
    expectedConsole: async ({ expectedConsole }, use) =>
      use([
        ...expectedConsole,
        /Multiple different versions detected!/,
        /\[Porsche Design System v3\.7\.0\] The Porsche Design System is used without using the getInitialStyles\(\) partial/,
      ]),
  });

  test('should show warning about multiple different versions correctly', async ({ page, context }) => {
    // the local CDN only serves this build, so v3.7.0 comes from production
    for (const url of oldVersionUrls) {
      await context.route(url, (route) => route.continue());
    }

    const prefixes = ['test', 'my-prefix'];

    await setContentWithDesignSystem(
      page,
      `<p-text>Some Text</p-text>
     ${getOldLoaderScriptForPrefixes(prefixes)}`,
      {
        withoutWaitForComponentsReady: true,
      }
    );

    const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem);

    expect(porscheDesignSystem[version]).toBeDefined();
    expect(porscheDesignSystem['3.7.0']).toBeDefined();
    expect(porscheDesignSystem['3.7.0'].prefixes).toEqual(prefixes);

    // Version validation warns from a 3000ms timer
    await sleep(VERSION_VALIDATION_TIMEOUT);

    const versionWarning = (await page.consoleMessages()).find(
      (message) => message.type() === 'warning' && message.text().includes('Multiple different versions')
    );

    assertDefined(versionWarning);

    const warningArgs = await Promise.all(versionWarning.args().map(async (arg) => await arg.evaluate((arg) => arg)));

    expect(warningArgs).toEqual([
      `[Porsche Design System v${version}]`,
      "Multiple different versions detected!\nWhile bootstrapping multiple versions is valid, it's highly recommended to upgrade all instances to the latest version in use for the best performance.\nRefer to the document.porscheDesignSystem object for detailed information on the current versions in use.\n",
      porscheDesignSystem,
    ]);
  });
});

test('should not show warning about multiple different versions if only one version is used', async ({ page }) => {
  await setContentWithDesignSystem(page, '<p-text>Some Text</p-text>');

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(Object.keys(porscheDesignSystem).length).toBe(2); // cdn and one version

  await sleep(VERSION_VALIDATION_TIMEOUT);

  // Wait until version validation

  const versionWarning = (await page.consoleMessages()).find(
    (message) => message.type() === 'warning' && message.text().includes('Multiple different versions')
  );

  expect(versionWarning).not.toBeDefined();
});
