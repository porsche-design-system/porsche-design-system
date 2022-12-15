import fs from 'fs';
import { crawlerConfig as config } from '../constants';
import * as puppeteer from 'puppeteer';
import { crawlComponents } from './crawl-components';
import { TagNamesWithProperties, getTagNamesWithProperties } from './helper';
import {
  getAggregatedConsumedTagNames,
  getAggregatedConsumedTagNamesForVersionsAndPrefixes,
  getConsumedPrefixesForVersions,
  getRawDataWithoutVersionsAndPrefixes,
  TagNameWithProperties,
} from './data-aggregator';
import { writeGeneralReport, writeWebsiteReport } from './fs-report-writer';

export const crawlWebsites = async (browser: puppeteer.Browser): Promise<void> => {
  const tagNamesWithProperties: TagNamesWithProperties = getTagNamesWithProperties();
  // data for all websites
  let generalRawData = [] as TagNameWithProperties[];

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

    // get raw data
    const consumedTagNamesForVersionsAndPrefixes = await crawlComponents(page, tagNamesWithProperties);
    const rawDataWithoutVersionsAndPrefixes = getRawDataWithoutVersionsAndPrefixes(
      consumedTagNamesForVersionsAndPrefixes
    );
    generalRawData = generalRawData.concat(rawDataWithoutVersionsAndPrefixes);

    console.log('Aggregating data for ' + page.url());
    const consumedPdsVersionsWithPrefixes = getConsumedPrefixesForVersions(consumedTagNamesForVersionsAndPrefixes);
    const aggregatedConsumedTagNamesForVersionsAndPrefixes = getAggregatedConsumedTagNamesForVersionsAndPrefixes(
      consumedTagNamesForVersionsAndPrefixes
    );
    const aggregatedConsumedTagNames = getAggregatedConsumedTagNames(rawDataWithoutVersionsAndPrefixes);
    writeWebsiteReport(
      websiteUrl,
      JSON.stringify(
        {
          url: websiteUrl,
          consumedPdsVersionsWithPrefixes,
          consumedTagNamesForVersionsAndPrefixes,
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

    await page.close();
  }

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
