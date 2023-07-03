import { baseURL } from './index';
import * as fs from 'fs';
import * as path from 'path';

// exclude URLS which should not be checked -> include all links which lead to downloads because puppeteer cant handle that
const whitelistedUrls: string[] = [
  'https://github.com/porsche-design-system/porsche-design-system',
  'https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip',
  'https://www.sitepoint.com/introduction-wai-aria/',
  'https://adabook.com/',
  'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf',
];

const console = require('console'); // workaround for nicer logs

const sitemapFixturePath = path.resolve(__dirname, '../fixtures/sitemap.json');
const sitemapResultPath = path.resolve(__dirname, '../results/sitemap.json');

export const getSitemap = (): string[] => {
  // read fixture/sitemap.json
  const fileContent = fs.readFileSync(sitemapFixturePath, 'utf8');
  return JSON.parse(fileContent);
};

export const getInternalUrls = (): string[] => {
  return (
    getSitemap()
      .filter((link) => link.startsWith('/'))
      // drop "base" links that are redirected to first tab
      .filter((link, i, array) => !array.some((x) => x.startsWith(link + '/')))
  );
};

export const getExternalUrls = (): string[] => {
  return getSitemap().filter((link) => !link.startsWith('/'));
};

export const buildSitemap = async (): Promise<string[]> => {
  console.log('Building sitemap...');
  fs.mkdirSync(path.dirname(sitemapResultPath), { recursive: true });

  await page.goto(baseURL);

  // initial scan on front page without duplicates
  let allUrls = (await scanForUrls()).filter((x, i, array) => array.indexOf(x) === i);

  for (let i = 0; i < allUrls.length; i++) {
    const href = allUrls[i];

    // follow internal urls only
    if (href.startsWith('/')) {
      console.log(`Crawling url ${i + 1}/${allUrls.length}...`);
      await page.goto(`${baseURL}${href}`);

      const newLinks = await scanForUrls();
      // get rid of duplicates
      allUrls = allUrls.concat(newLinks).filter((x, i, array) => array.indexOf(x) === i);
    }
  }

  allUrls = allUrls.sort();
  const internalUrls = allUrls.filter((link) => link.startsWith('/'));
  const externalUrls = allUrls.filter((link) => !link.startsWith('/'));

  console.log(`Finished building sitemap.json with only ${internalUrls.length} internalUrls`);
  console.log(`– Internal urls: ${internalUrls.length}`);
  console.log(`– External urls: ${externalUrls.length}`);

  // write results/sitemap.json
  // we only care about internalUrls, since we do nothing with external ones and they just cause an additional CI run when extending the changelog
  fs.writeFileSync(sitemapResultPath, JSON.stringify(internalUrls, null, 2));
  return internalUrls;
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
      // add leading slash for links within markdown
      .map((url) => (!url.startsWith('http') && !url.startsWith('/') ) ? `/${url}` : url))
      .filter((url) => !whitelistedUrls.includes(url)) // get rid of whitelisted urls
      .filter((url) => (url.startsWith('/') ? !url.includes('#') : true)) // get rid of internal anchor links
  );
};
