import fs from 'fs';
import { crawlerConfig as config } from '../constants';
import * as puppeteer from 'puppeteer';
import { crawlComponents } from './crawl-components';
import { TagNamesWithProperties, getTagNamesWithProperties } from './helper';
import { DataAggregator } from './data-aggregator';

export const crawlWebsites = async (browser: puppeteer.Browser): Promise<void> => {
  const tagNamesWithProperties: TagNamesWithProperties = getTagNamesWithProperties();

  for (const websiteName in config.customerWebsiteMap) {
    const websiteUrl = config.customerWebsiteMap[websiteName];
    const page = await browser.newPage();
    // we need this setViewport, because for example porsche.com has different components depending on screen size
    await page.setViewport({ width: config.width, height: config.height });
    // at least porsche finder seems to check the headers to block scrapers, setting the UA solves this
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    );
    await page.goto(websiteUrl, {
      waitUntil: 'networkidle0',
    });

    console.log('Crawling page ' + page.url());

    const consumedTagNamesForVersionsAndPrefixes = await crawlComponents(page, tagNamesWithProperties);
    const dataAggregator = new DataAggregator(consumedTagNamesForVersionsAndPrefixes);

    console.log('Aggregating data for ' + page.url());
    const consumedPdsVersionsWithPrefixes = dataAggregator.getConsumedPrefixesForVersions();
    const aggregatedConsumedTagNamesForVersionsAndPrefixes =
      dataAggregator.getAggregatedConsumedTagNamesForVersionsAndPrefixes();
    const aggregatedConsumedTagNames = dataAggregator.getAggregatedConsumedTagNames();

    fs.writeFileSync(
      `./${config.reportFolderName}/${new Date().toJSON().slice(0, 10)}${config.dateSplitter}${websiteName}.json`,
      JSON.stringify(
        {
          consumedPdsVersionsWithPrefixes,
          aggregatedConsumedTagNames,
          aggregatedConsumedTagNamesForVersionsAndPrefixes,
          consumedTagNamesForVersionsAndPrefixes,
        },
        null,
        4
      )
    );

    await page.close();
  }
};
