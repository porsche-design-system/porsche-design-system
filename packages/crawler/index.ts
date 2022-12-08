import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { componentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import { Browser } from 'puppeteer';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Document {
    // Extend Document interface, so we don't have to cast it on any
    porscheDesignSystem: { [key: string]: { prefixes: string[] } };
  }
}

const width = 1366;
const height = 768;
const tagNames = TAG_NAMES;
const tagNamesWithProperties: { [key: string]: string[] } = Object.entries(componentMeta).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: value.props ? Object.keys(value.props) : {},
  }),
  {}
);
const reportFolderName = 'reports';
const customerWebsiteMap: Record<string, string> = {
  'porsche.com': 'https://www.porsche.com/germany',
  'finder.porsche.com': 'https://finder.porsche.com/de/de-DE',
  'login.porsche.com': 'https://login.porsche.com/login/de/de_DE',
  'shop.porsche.com': 'https://shop.porsche.com/de/de-DE',
};
const dateSplitter = '_';
// TODO: how long should the old reports stay?
const reportsMaxAge = 1000 * 60 * 60 * 24 * 7; // one week in milliseconds

// TODO: define correct return types
const crawlComponents = async (page: puppeteer.Page): Promise<any> => {
  // TODO: rename const?
  const porscheDesignSystem = await page.evaluate(
    async ({ tagNames, tagNamesAndProperties }): Promise<any> => {
      const porscheDesignSystem = document.porscheDesignSystem;
      const consumedPdsVersions = Object.keys(porscheDesignSystem);

      const getAllChildElements = (el: Element): Element[] => {
        const children = Array.from(el.children).concat(Array.from(el.shadowRoot?.children || [])) as Element[];
        const childrenChildren = children.concat(children.map(getAllChildElements).flat());
        return childrenChildren.flat();
      };

      // all dom elements on the page
      const allDOMElements = getAllChildElements(document.querySelector('body') as Element);
      const querySelectorAllDeep = (pdsComponentsSelector: string): Element[] => {
        return allDOMElements.filter((el: Element) => {
          return el.matches(pdsComponentsSelector);
        });
      };

      const consumedPrefixesForVersions: { [key: string]: string[] } = Object.entries(porscheDesignSystem).reduce(
        (result, [key, value]) => ({
          ...result,
          [key]: value.prefixes,
        }),
        {}
      );

      const consumedTagNamesForVersions: { [key: string]: string[] } = Object.entries(
        consumedPrefixesForVersions
      ).reduce((result, [version, prefixes]) => {
        const pdsComponentsSelector = prefixes
          .map((prefix) => {
            return prefix ? tagNames.map((tagName) => `${prefix}-${tagName}`) : tagNames;
          })
          .join();

        const pdsElements = Array.from(querySelectorAllDeep(pdsComponentsSelector));

        const usedTagNames = pdsElements.map((el) => {
          const tag = el.tagName.toLowerCase();
          // TODO: filter properties and only report pds properties
          const properties = Object.assign({}, ...Array.from(el.attributes, ({ name, value }) => ({ [name]: value })));
          return { [tag]: properties };
        });

        return {
          ...result,
          [version]: usedTagNames,
        };
      }, {});

      // TODO: get and count the tag names with prefixes - and also without prefixes?

      return {
        consumedPdsVersions,
        consumedPrefixesForVersions,
        consumedTagNamesForVersions,
      };
    },
    { tagNames, tagNamesAndProperties: tagNamesWithProperties }
  );

  return porscheDesignSystem;
};

const removeOldReports = async (): Promise<void> => {
  const reportFiles = await fs.promises.readdir(reportFolderName);
  const filesToRemove = reportFiles.filter((fileName: string) => {
    const dateCreated = Date.parse(fileName.split(dateSplitter)[1].replace('.json', ''));
    const oldestTimePossible = Date.now() - reportsMaxAge;
    return dateCreated < oldestTimePossible;
  });
  for (const fileName of filesToRemove) {
    await fs.promises.unlink(`${reportFolderName}/${fileName}`);
  }
};

const crawlWebsites = async (browser: Browser): Promise<void> => {
  for (const websiteName in customerWebsiteMap) {
    const websiteUrl = customerWebsiteMap[websiteName];
    const page = await browser.newPage();
    // we need this setViewport, because for example porsche.com has different components depending on screen size
    await page.setViewport({ width: width, height: height });

    await page.goto(websiteUrl, {
      waitUntil: 'networkidle0',
    });

    console.log('Crawling Page ' + page.url());

    const crawlResults = await crawlComponents(page);

    fs.writeFileSync(
      `./${reportFolderName}/${websiteName}${dateSplitter}${new Date().toJSON().slice(0, 10)}.json`,
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
      args: [`--window-size=${width},${height}`],
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
