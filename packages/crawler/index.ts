import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { componentMeta } from '@porsche-design-system/shared';
import { crawlerConfig as config } from './crawler-config';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

const tagNamesWithProperties: { [key: string]: string[] } = Object.entries(componentMeta).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: value.props ? Object.keys(value.props) : {},
  }),
  {}
);

// TODO: define correct return type
const crawlComponents = async (page: puppeteer.Page): Promise<any> => {
  const pdsCrawlerReport = await page.evaluate(
    // TODO: define correct return type
    async ({ tagNamesWithProperties }): Promise<any> => {
      const tagNames = Object.keys(tagNamesWithProperties);
      const porscheDesignSystem = document.porscheDesignSystem;
      const consumedPdsVersions = Object.keys(porscheDesignSystem);
      const consumedPrefixesForVersions: { [key: string]: string[] } = Object.entries(porscheDesignSystem).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: value.prefixes,
        }),
        {}
      );

      const getPdsComponentsSelector = (prefixes: string[]): string =>
        prefixes
          .map((prefix) => {
            return prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames;
          })
          .join();

      const getAllChildElements = (el: Element): Element[] => {
        const children = Array.from(el.children).concat(Array.from(el.shadowRoot?.children || [])) as Element[];
        const childrenChildren = children.concat(children.map(getAllChildElements).flat());
        return childrenChildren.flat();
      };

      // crawl all dom elements from body
      const allDOMElements = getAllChildElements(document.querySelector('body') as Element);
      const querySelectorAllDeep = (pdsComponentsSelector: string): Element[] => {
        return allDOMElements.filter((el: Element) => {
          return el.matches(pdsComponentsSelector);
        });
      };

      const getConsumedTagNames = (pdsElements: Element[]): { [p: string]: { [p: string]: unknown } }[] =>
        pdsElements.map((el) => {
          const tagName = el.tagName.toLowerCase();
          const [, tagNameWithoutPrefix = ''] = /^(?:[a-z-]+-)?(p-[a-z-]+)$/.exec(tagName) || [];
          const allPdsPropertiesForTagName = Object.entries(tagNamesWithProperties).reduce((result, [key, value]) => {
            return key === `${tagNameWithoutPrefix ? tagNameWithoutPrefix : tagName}` ? value : result;
          }, [] as string[]);

          const allAppliedProperties = Object.assign(
            {},
            ...Array.from(el.attributes, ({ name, value }) => {
              return { [name]: value };
            })
          );

          const consumedPdsProperties = Object.fromEntries(
            Object.entries(allAppliedProperties).filter(([key]) => allPdsPropertiesForTagName.includes(key))
          );

          return { [tagName]: consumedPdsProperties };
        });

      const consumedTagNamesForVersions: { [key: string]: string[] } = Object.entries(
        consumedPrefixesForVersions
      ).reduce((result, [version, prefixes]) => {
        const pdsComponentsSelector = getPdsComponentsSelector(prefixes);
        const pdsElements = Array.from(querySelectorAllDeep(pdsComponentsSelector));
        const consumedTagNames = getConsumedTagNames(pdsElements);

        // TODO: group tag names by prefix
        return {
          ...result,
          [version]: consumedTagNames,
        };
      }, {});

      // TODO: get and count the tag names with prefixes - and also without prefixes? Also split tag names into different arrays for every prefix

      return {
        consumedPdsVersions,
        consumedPrefixesForVersions,
        consumedTagNamesForVersions,
      };
    },
    { tagNamesWithProperties }
  );

  return pdsCrawlerReport;
};

const removeOldReports = (): void => {
  const reportFiles = fs.readdirSync(config.reportFolderName);
  reportFiles
    .filter((fileName: string) => {
      const dateCreated = Date.parse(fileName.split(config.dateSplitter)[0]);
      const oldestTimePossible = Date.now() - config.reportsMaxAge;
      return dateCreated < oldestTimePossible;
    })
    .map((fileName: string) => {
      fs.unlinkSync(`${config.reportFolderName}/${fileName}`);
    });
};

const crawlWebsites = async (browser: puppeteer.Browser): Promise<void> => {
  for (const websiteName in config.customerWebsiteMap) {
    const websiteUrl = config.customerWebsiteMap[websiteName];
    const page = await browser.newPage();
    // we need this setViewport, because for example porsche.com has different components depending on screen size
    await page.setViewport({ width: config.width, height: config.height });

    await page.goto(websiteUrl, {
      waitUntil: 'networkidle0',
    });

    console.log('Crawling Page ' + page.url());

    const crawlResults = await crawlComponents(page);

    fs.writeFileSync(
      `./${config.reportFolderName}/${new Date().toJSON().slice(0, 10)}${config.dateSplitter}${websiteName}.json`,
      JSON.stringify(crawlResults, null, 4)
    );

    await page.close();
  }
};
const startBrowser = async (): Promise<void> => {
  try {
    const browser = await puppeteer.launch({
      // TODO: make headless before PR
      headless: false, // The browser is visible
      ignoreHTTPSErrors: true,
      args: [`--window-size=${config.width},${config.height}`],
    });
    removeOldReports();
    await crawlWebsites(browser);

    console.log('Success - please check reports');
    browser.close();
  } catch (err) {
    console.log('Could not create a browser instance => : ', err);
  }
};

startBrowser();
