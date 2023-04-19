import type { Page } from 'puppeteer';
import { setContentWithDesignSystem } from '../helpers';
import { evaluatePage } from '../../../src/evaluate-page';
import type { ConsumedTagNamesForVersionsAndPrefixes } from '../../../src/types';
import { dependencies } from '../../../package.json';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

// for stable tests that don't need adjustment on every release we replace the version with `latest`
const replaceCurrentVersion = (
  data: ConsumedTagNamesForVersionsAndPrefixes
): ConsumedTagNamesForVersionsAndPrefixes => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key.replace(dependencies['@porsche-design-system/components-js'], 'latest'),
      value,
    ])
  );
};

it('should retrieve children and hostPdsComponent correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
<p-banner theme="dark">
  <span slot="title">Some notification title</span>
  <span slot="description">
    Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
  </span>
</p-banner>`,
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});

it('should retrieve children correctly and put stripped content', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
<p-flex>
  <p-flex-item>
    <p>1</p>
  </p-flex-item>
  <p-flex-item>
    <p>2</p>
  </p-flex-item>
</p-flex>`,
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});

it('should retrieve hostPdsComponent correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `<p-button variant="primary">Test button</p-button>`,
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});

it('should generate raw data correctly for 1 version and 2 prefixes', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
<p-text>Second prefix</p-text>
<my-prefix-p-text>First prefix</my-prefix-p-text>`,
    firstPdsVersionPrefixes: ['my-prefix', ''],
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});

it('should generate raw data correctly for 2 versions and 2 prefixes', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `
<test-prefix-p-text>First version first prefix</test-prefix-p-text>
<test1-prefix-p-text>First version second prefix</test1-prefix-p-text>
<p-text>Second version first prefix</p-text>
<my-prefix-p-text>Second version second prefix</my-prefix-p-text>`,
    firstPdsVersionPrefixes: ['test-prefix', 'test1-prefix'],
    secondPdsVersionPrefixes: ['', 'my-prefix'],
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});

it('should retrieve object value from string correctly', async () => {
  await setContentWithDesignSystem(page, {
    bodyHtml: `<p-spinner size="{ base: 'small', l: 'medium' }" aria="{ 'aria-label': 'Loading page content' }" />`,
  });
  const crawlerData = await evaluatePage(page);

  expect(replaceCurrentVersion(crawlerData)).toMatchSnapshot();
});
