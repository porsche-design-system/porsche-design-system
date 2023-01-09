import { crawlPage } from '../../../src/crawl-websites';
import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../../../constants';
import { PdsTestingContext, setContentWithDesignSystem } from '../helpers';

export const testCrawlerWithHtmlAndPrefixes = async (pdsTestingContext: PdsTestingContext): Promise<void> => {
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  );
  await setContentWithDesignSystem(page, pdsTestingContext);
  const crawlerData = await crawlPage(page, 'http://localhost');
  await browser.close();

  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
};

it('should retrieve children and hostPdsComponent correctly', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <p-banner theme="dark">
          <span slot="title">Some notification title</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </p-banner>
    `,
  });
});

it('should retrieve children correctly and put stripped content', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
      <p-flex>
        <p-flex-item>
          <p>1</p>
        </p-flex-item>
        <p-flex-item>
          <p>2</p>
        </p-flex-item>
      </p-flex>
    `,
  });
});
it('should retrieve hostPdsComponent correctly', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <p-button variant="primary">
            Test button
        </p-button>
    `,
  });
});

it('should generate raw data correctly for 1 version and 2 prefixes', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <p-text>Second prefix</p-text>
        <my-prefix-p-text>First prefix</my-prefix-p-text>
  `,
    firstPdsVersionPrefixes: ['my-prefix', ''],
  });
});
it('should generate raw data correctly for 2 versions and 2 prefixes', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
        <test-prefix-p-text>First version first prefix</test-prefix-p-text>
        <test1-prefix-p-text>First version second prefix</test1-prefix-p-text>
        <p-text>Second version first prefix</p-text>
        <my-prefix-p-text>Second version second prefix</my-prefix-p-text>
  `,
    firstPdsVersionPrefixes: ['test-prefix', 'test1-prefix'],
    secondPdsVersionPrefixes: ['', 'my-prefix'],
  });
});

it('should retrieve object value from string correctly', async () => {
  await testCrawlerWithHtmlAndPrefixes({
    bodyHtml: `
      <p-spinner size="{ base: 'small', l: 'medium' }" aria="{ 'aria-label': 'Loading page content' }" />
    `,
  });
});
