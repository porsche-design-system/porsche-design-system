import { crawlerConfig as config } from '../constants';
import * as puppeteer from 'puppeteer';
import { evaluatePage } from './evaluate-page';
import { getPdsTagNamesNamesWithPropertyNames } from './helper';
import {
  getAggregatedConsumedTagNames,
  getAggregatedConsumedTagNamesForVersionsAndPrefixes,
  getConsumedPrefixesForVersions,
  getRawDataWithoutVersionsAndPrefixes,
} from './convert-data-helper';
import { writeGeneralReport, writeWebsiteReport } from './fs-helper';
import { TagNameData, TagNamesWithPropertyNames } from './types';

export const crawlWebsites = async (browser: puppeteer.Browser): Promise<void> => {
  const pdsTagNamesWithPropertyNames: TagNamesWithPropertyNames = getPdsTagNamesNamesWithPropertyNames();
  // data for all websites
  let generalRawData = [] as TagNameData[];

  for (const websiteUrl of config.customerWebsites) {
    const page = await browser.newPage();
    // at least porsche finder seems to check the headers to block scrapers, setting the UA solves this
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    );
    await page.goto(websiteUrl, {
      waitUntil: 'networkidle0',
    });

    console.log('Crawling page ' + page.url());
    // getting raw data
    const pdsCrawlerRawData = await evaluatePage(page, pdsTagNamesWithPropertyNames);
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
      JSON.stringify(
        {
          url: websiteUrl,
          consumedPdsVersionsWithPrefixes,
          consumedTagNamesForVersionsAndPrefixes: pdsCrawlerRawData,
        },
        null,
        config.jsonSpace
      ),
      JSON.stringify(
        {
          url: websiteUrl,
          consumedPdsVersionsWithPrefixes,
          aggregatedConsumedTagNames,
          aggregatedConsumedTagNamesForVersionsAndPrefixes,
        },
        null,
        config.jsonSpace
      )
    );

    // collecting data for general report (over all websites)
    generalRawData = generalRawData.concat(pdsCrawlerRawDataWithoutVersionsAndPrefixes);

    await page.close();
  }

  // creating general report (over all websites)
  const aggregatedConsumedTagNamesAllWebsites = getAggregatedConsumedTagNames(generalRawData);

  writeGeneralReport(
    JSON.stringify(
      {
        crawledWebsites: config.customerWebsites,
        aggregatedConsumedTagNames: aggregatedConsumedTagNamesAllWebsites,
      },
      null,
      4
    )
  );
};
