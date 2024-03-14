import { expect, test } from '@playwright/test';
import {
  getConsoleWarnings,
  getOldLoaderScriptForPrefixes,
  initConsoleObserver,
  setContentWithDesignSystem,
  sleep,
} from '../helpers';
import pkg from '@porsche-design-system/components-js/package.json';
import type { PorscheDesignSystem } from '@porsche-design-system/components';

const version = pkg.version;
const VERSION_VALIDATION_TIMEOUT = 3000;

test.beforeEach(({ page }) => {
  initConsoleObserver(page);
});

test('should show warning about multiple different versions correctly', async ({ page }) => {
  const prefixes = ['test', 'my-prefix'];

  await setContentWithDesignSystem(
    page,
    `<p-text>Some Text</p-text>
     ${getOldLoaderScriptForPrefixes(prefixes)}`,
    {
      withoutWaitForComponentsReady: true,
    }
  );

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem as PorscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(porscheDesignSystem['3.7.0']).toBeDefined();
  expect(porscheDesignSystem['3.7.0'].prefixes).toEqual(prefixes);

  await sleep(VERSION_VALIDATION_TIMEOUT);

  // Wait until version validation

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).toBeDefined();

  const warningArgs = await Promise.all(versionWarning.args().map(async (arg) => await arg.evaluate((arg) => arg)));

  expect(warningArgs).toEqual([
    `[Porsche Design System v${version}]`,
    "Multiple different versions detected!\nWhile bootstrapping multiple versions is valid, it's highly recommended to upgrade all instances to the latest version in use for the best performance.\nRefer to the document.porscheDesignSystem object for detailed information on the current versions in use.\n",
    porscheDesignSystem,
  ]);
});

test('should not show warning about multiple different versions if only one version is used', async ({ page }) => {
  await setContentWithDesignSystem(page, '<p-text>Some Text</p-text>');

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(Object.keys(porscheDesignSystem).length).toBe(2); // cdn and one version

  await sleep(VERSION_VALIDATION_TIMEOUT);

  // Wait until version validation

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).not.toBeDefined();
});
