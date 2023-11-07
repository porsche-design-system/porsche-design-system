import { Page } from 'puppeteer';
import {
  enableBrowserLogging,
  getConsoleWarningMessagesRaw,
  initConsoleObserver,
  setContentWithDesignSystem,
} from '../helpers';
import { version } from '../../../../dist/components-wrapper/package.json';
import { getLoaderScript } from '../../../../projects/partials';
import { getExternalLoaderScriptForPrefixes } from 'crawler/tests/e2e/helpers';

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
    ${getLoaderScript({ prefix: [''] })}
    ${getExternalLoaderScriptForPrefixes(prefixes)}`,
    { withoutWaitForComponentsReady: true }
  );

  const rawWarnings = getConsoleWarningMessagesRaw();
  const versionWarning = rawWarnings.find((warning) => warning.text().includes('Multiple different versions'));

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

  await setContentWithDesignSystem(
    page,
    `
    ${getLoaderScript({ prefix: [''] })}`,
    { withoutWaitForComponentsReady: true }
  );

  const rawWarnings = getConsoleWarningMessagesRaw();
  const versionWarning = rawWarnings.find((warning) => warning.text().includes('Multiple different versions'));

  expect(versionWarning).not.toBeDefined();
});
