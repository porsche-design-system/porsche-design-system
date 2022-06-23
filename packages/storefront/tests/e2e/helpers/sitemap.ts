import { baseURL } from './index';
import * as fs from 'fs';
import * as path from 'path';

// exclude URLS which should not be checked -> include all links which lead to downloads because puppeteer cant handle that
const whitelistedUrls: string[] = [
  'https://github.com/porscheui/porsche-design-system',
  'https://designsystem.porsche.com/sketch/porsche-design-system-colors.sketchpalette',
  'https://designsystem.porsche.com/sketch/porsche-design-system-form-templates.sketch',
  'https://designsystem.porsche.com/sketch/porsche-design-system-layout-template.sketch',
  'https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip',
  'https://www.sitepoint.com/introduction-wai-aria/',
  'https://adabook.com/',
  'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf',
  'sketch://add-library?url=https%3A%2F%2Fdesignsystem.porsche.com%2Fporsche-design-system-basic.sketch.xml',
  'sketch://add-library?url=https%3A%2F%2Fdesignsystem.porsche.com%2Fporsche-design-system-web.sketch.xml',
];

const console = require('console'); // workaround for nicer logs

const sitemapFixturePath = path.resolve(__dirname, '../fixtures/sitemap.json');
const sitemapResultPath = path.resolve(__dirname, '../results/sitemap.json');

export const getSitemap = (): string[] => {
  const fileContent = fs.readFileSync(sitemapFixturePath, 'utf8');
  return JSON.parse(fileContent);
};

export const getInternalUrls = (): string[] => {
  return getSitemap().filter((link) => link.startsWith('/'));
};

export const getExternalUrls = (): string[] => {
  return getSitemap().filter((link) => !link.startsWith('/'));
};

export const buildSitemap = async (): Promise<string[]> => {
  console.log('Building sitemap...');
  fs.mkdirSync(path.dirname(sitemapResultPath), { recursive: true });

  await page.goto(baseURL, { waitUntil: 'networkidle0' });

  let allUrls = await scanForUrls();

  for (let i = 0; i < allUrls.length; i++) {
    const href = allUrls[i];

    // follow internal urls only
    if (href.startsWith('/')) {
      process.stdout.write(`Crawling url ${i + 1}/${allUrls.length}...`);
      await page.goto(`${baseURL}${href}`, { waitUntil: 'networkidle0' });

      const newLinks = await scanForUrls();
      allUrls = allUrls.concat(newLinks).filter((x, i, array) => array.indexOf(x) === i);
    }
  }

  allUrls = allUrls.sort();

  console.log(`Finished building sitemap.json with ${allUrls.length} urls`);
  console.log(`– Internal urls: ${allUrls.filter((link) => link.startsWith('/')).length}`);
  console.log(`– External urls: ${allUrls.filter((link) => !link.startsWith('/')).length}`);

  fs.writeFileSync(sitemapResultPath, JSON.stringify(allUrls, null, 2));
  return allUrls;
};

const mapAsync = <T, U>(array: T[], callbackFn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> =>
  Promise.all(array.map(callbackFn));

const filterAsync = async <T>(
  array: T[],
  callbackFn: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> => {
  const filterMap = await mapAsync(array, callbackFn);
  return array.filter((value, index) => filterMap[index]);
};

const scanForUrls = async (): Promise<string[]> => {
  const bodyLinks = await page.$$('body [href]');

  // get rid of toc links since anchor links lead to the same page they where found on
  const bodyLinksWithoutToc = await filterAsync(
    bodyLinks,
    async (link) => (await link.evaluate((x) => x.parentElement.parentElement.parentElement.className)) !== 'toc'
  );

  const bodyHrefs: string[] = await mapAsync(bodyLinksWithoutToc, (link) =>
    link.evaluate((el) => el.getAttribute('href'))
  );

  return (
    bodyHrefs
      // add leading slash for anchor links within markdown
      .map((x) => (!x.startsWith('http') && !x.startsWith('/') && !x.startsWith('sketch://') ? `/${x}` : x))
      .filter((x) => !whitelistedUrls.includes(x))
  );
};
