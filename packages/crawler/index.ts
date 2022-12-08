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
// TODO: remove unnecessary comments before PR
// const reportsMaxAge = 1000 * 60 * 60 * 24 * 7; // one week in milliseconds
const reportsMaxAge = 1000 * 60 * 60 * 24; // one day in milliseconds
// const reportsMaxAge = 1000; // one second

// TODO: define correct return types
const crawlComponents = async (page: puppeteer.Page): Promise<any> => {
  // TODO: rename const?
  const porscheDesignSystem = await page.evaluate(
    async ({ tagNames, tagNamesWithProperties }): Promise<any> => {
      const porscheDesignSystem = document.porscheDesignSystem;
      const consumedPdsVersions = Object.keys(porscheDesignSystem);

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

        const pdsElements = Array.from(document.querySelectorAll(pdsComponentsSelector));

        const consumedTagNames = pdsElements.map((el) => {
          const tag = el.tagName.toLowerCase();
          // TODO: does not work for prefixes yet
          const allPdsPropertiesForTagName = Object.entries(tagNamesWithProperties).reduce((result, [key, value]) => {
            return key.match(new RegExp(`^${tag}$`)) ? value : result;
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

          return { [tag]: consumedPdsProperties };
        });

        return {
          ...result,
          [version]: consumedTagNames,
        };
      }, {});

      // TODO: get and count the tag names with prefixes - and also without prefixes?

      return {
        tagNamesWithProperties,
        consumedPdsVersions,
        consumedPrefixesForVersions,
        consumedTagNamesForVersions,
      };
    },
    { tagNames, tagNamesWithProperties }
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
