import { type Browser, type Page } from '@playwright/test';
import { evaluatePage } from './evaluate-page';
import {
  getAggregatedConsumedTagNames,
  getAggregatedConsumedTagNamesForVersionsAndPrefixes,
  getConsumedPrefixesForVersions,
  getRawDataWithoutVersionsAndPrefixes,
} from './helpers/convert-data-helper';
import { writeGeneralReport, writeWebsiteReport } from './helpers/fs-helper';
import { TagNameData } from './types';
import { stringifyObject } from './utils';
import { crawlerConfig } from '../constants';

export const crawlWebsite = async (page: Page, websiteUrl: string): Promise<TagNameData[]> => {
  await page.goto(websiteUrl, {
    waitUntil: 'networkidle',
  });

  console.log('Crawling page ' + websiteUrl);

  // getting raw data
  const pdsCrawlerRawData = await evaluatePage(page);

  // raw data in another format - without versions and prefixes
  const pdsCrawlerRawDataWithoutVersionsAndPrefixes = getRawDataWithoutVersionsAndPrefixes(pdsCrawlerRawData);

  console.log('Aggregating data for ' + page.url());

  // info about used versions and prefixes
  const consumedPdsVersionsWithPrefixes = getConsumedPrefixesForVersions(pdsCrawlerRawData);

  // aggregated data
  const aggregatedConsumedTagNamesForVersionsAndPrefixes =
    getAggregatedConsumedTagNamesForVersionsAndPrefixes(pdsCrawlerRawData);

  // aggregated data without versions and prefixes
  const aggregatedConsumedTagNames = getAggregatedConsumedTagNames(pdsCrawlerRawDataWithoutVersionsAndPrefixes);

  writeWebsiteReport(
    websiteUrl,
    stringifyObject({
      url: websiteUrl,
      consumedPdsVersionsWithPrefixes,
      consumedTagNamesForVersionsAndPrefixes: pdsCrawlerRawData,
    }),
    stringifyObject({
      url: websiteUrl,
      consumedPdsVersionsWithPrefixes,
      aggregatedConsumedTagNames,
      aggregatedConsumedTagNamesForVersionsAndPrefixes,
    })
  );

  return pdsCrawlerRawDataWithoutVersionsAndPrefixes;
};

export const crawlWebsites = async (browser: Browser, customerWebsites: string[]): Promise<void> => {
  // data for all websites
  let generalRawData = [] as TagNameData[];

  // at least porsche finder seems to check the headers to block scrapers, setting the UA solves this
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  });

  // Create a new page in the browser context and navigate to target URL
  const page = await context.newPage();

  await page.setViewportSize({
    width: crawlerConfig.viewport.width,
    height: crawlerConfig.viewport.height,
  });

  for (const websiteUrl of customerWebsites) {
    const pdsCrawlerRawDataWithoutVersionsAndPrefixes = await crawlWebsite(page, websiteUrl);

    // collecting data for general report (over all websites)
    generalRawData = generalRawData.concat(pdsCrawlerRawDataWithoutVersionsAndPrefixes);
  }

  console.log('Aggregating general data..');

  // creating general report (over all websites)
  const aggregatedConsumedTagNamesAllWebsites = getAggregatedConsumedTagNames(generalRawData);

  await page.close();

  return writeGeneralReport(
    stringifyObject({
      crawledWebsites: customerWebsites,
      aggregatedConsumedTagNames: aggregatedConsumedTagNamesAllWebsites,
    })
  );
};
