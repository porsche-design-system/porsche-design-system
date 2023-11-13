import { Page } from 'puppeteer';
import {
  getConsoleWarnings,
  getOldLoaderScriptForPrefixes,
  initConsoleObserver,
  setContentWithDesignSystem,
} from '../helpers';
import { version } from '@porsche-design-system/components-js/package.json';
import type { PorscheDesignSystem } from '@porsche-design-system/components/dist/types/bundle';
import { VERSION_VALIDATION_TIMEOUT } from '@porsche-design-system/components/src/utils';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

it('should show warning about multiple different versions correctly', async () => {
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

  await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT)); // Wait until version validation

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).toBeDefined();

  const warningArgs = await Promise.all(versionWarning.args().map(async (arg) => await arg.evaluate((arg) => arg)));

  expect(warningArgs).toEqual([
    `[Porsche Design System v${version}]`,
    'Multiple different versions detected!\nPlease upgrade all instances to the latest version in use.\nRefer to the document.porscheDesignSystem object for detailed information on the current versions in use.\n',
    porscheDesignSystem,
  ]);
});

it('should not show warning about multiple different versions if only one version is used', async () => {
  await setContentWithDesignSystem(page, '<p-text>Some Text</p-text>');

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(Object.keys(porscheDesignSystem).length).toBe(2); // cdn and one version

  await new Promise((resolve) => setTimeout(resolve, VERSION_VALIDATION_TIMEOUT)); // Wait until version validation

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).not.toBeDefined();
});
