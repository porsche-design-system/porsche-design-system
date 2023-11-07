import { Page } from 'puppeteer';
import {
  enableBrowserLogging,
  getConsoleWarnings,
  getV2LoaderScriptForPrefixes,
  initConsoleObserver,
  setContentWithDesignSystem,
} from '../helpers';
import { version } from '@porsche-design-system/components-js/package.json';
import type { PorscheDesignSystem } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

it('should show warning about multiple different versions correctly', async () => {
  enableBrowserLogging(page);

  const prefixes = ['test', 'my-prefix'];

  await setContentWithDesignSystem(
    page,
    `
    ${getV2LoaderScriptForPrefixes(prefixes)}`,
    { withoutWaitForComponentsReady: true }
  );

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem as PorscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(porscheDesignSystem['2.18.0']).toBeDefined();
  expect(porscheDesignSystem['2.18.0'].prefixes).toEqual(prefixes);

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).toBeDefined();

  const warningArgs = await Promise.all(versionWarning.args().map(async (arg) => await arg.evaluate((arg) => arg)));

  expect(warningArgs).toEqual([
    `[Porsche Design System v${version}]`,
    'Multiple different versions are used with following prefixes:\n',
    { '2.18.0': prefixes, [`${version}`]: [''] },
    `\nPlease upgrade all instances to the latest used version: ${version}`,
  ]);
});

it('should not show warning about multiple different versions if only one version is used', async () => {
  enableBrowserLogging(page);

  await setContentWithDesignSystem(page, '<p-text>Some Text</p-text>');

  const porscheDesignSystem = await page.evaluate(() => document.porscheDesignSystem);

  expect(porscheDesignSystem[version]).toBeDefined();
  expect(Object.keys(porscheDesignSystem).length).toBe(2); // cdn and one version

  const versionWarning = getConsoleWarnings().find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).not.toBeDefined();
});
