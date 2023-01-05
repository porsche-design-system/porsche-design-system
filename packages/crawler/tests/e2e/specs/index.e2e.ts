import { crawlPage } from '../../../src/crawl-websites';
import * as puppeteer from 'puppeteer';
import { puppeteerConfig } from '../../../constants';
import { setContentWithDesignSystem } from '../helpers';

it('should generate raw data correctly for 2 prefixes', async () => {
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
  );
  await setContentWithDesignSystem(page);
  const crawlerData = await crawlPage(page, 'http://localhost');
  await browser.close();

  // check that raw data matches snapshot
  expect(crawlerData).toMatchSnapshot();
});
