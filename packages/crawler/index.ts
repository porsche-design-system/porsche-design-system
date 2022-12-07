import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

const width = 1366;
const height = 768;

// TODO: define correct return types
const crawlComponents = async (page: puppeteer.Page): Promise<any> => {
  const porscheDesignSystem = await page.evaluate(async (): Promise<any> => {
    // TODO: get all tagNames
    const tagNames = ['p-flex', 'p-accordion', 'p-text', 'p-flex-item', 'p-icon', 'p-marque'];
    const porscheDesignSystem = document.porscheDesignSystem;
    const consumedPdsVersions = Object.keys(porscheDesignSystem);

    const consumedPrefixesForVersions: { [key: string]: string[] } = Object.entries(porscheDesignSystem).reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value.prefixes,
      }),
      {}
    );

    const consumedTagNamesForVersions: { [key: string]: string[] } = Object.entries(consumedPrefixesForVersions).reduce(
      (result, [version, prefixes]) => {
        const pdsComponentsSelector = prefixes
          .map((prefix) => {
            return prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames;
          })
          .join();
        // TODO: get the set properties
        const pdsElements = Array.from(document.querySelectorAll(pdsComponentsSelector));
        // TODO: get and count the tag names with prefixes - and also without prefixes?
        const usedTagNames = pdsElements.map((el) => el.tagName.toLowerCase());

        return {
          ...result,
          [version]: usedTagNames,
        };
      },
      {}
    );

    return {
      consumedPdsVersions,
      consumedPrefixesForVersions,
      consumedTagNamesForVersions,
    };
  });

  return porscheDesignSystem;
};

const startBrowser = async (): Promise<void> => {
  try {
    const browser = await puppeteer.launch({
      headless: false, // The browser is visible
      ignoreHTTPSErrors: true,
      args: [`--window-size=${width},${height}`], // new option
    });
    const page = await browser.newPage();
    // await page.setViewport({ width: width, height: height });
    // await page.goto(`https://porsche.com`);
    // await page.goto(`https://finder.porsche.com`);
    // await page.goto(`https://shop.porsche.com/`);
    await page.goto('https://www.porsche.com/swiss/de/', {
      waitUntil: 'networkidle0',
    });

    console.log('Crawling Page ' + page.url());

    const crawlResults = await crawlComponents(page);
    // fs.writeFileSync(`report-components.json`, JSON.stringify(crawlResults.componentsStats, null, 4));

    // TODO: add date and URL
    // TODO: delete old reports?
    fs.writeFileSync(`report-components.json`, JSON.stringify(crawlResults, null, 4));

    console.log('Success - please check reports');
    browser.close();
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
};

startBrowser();
