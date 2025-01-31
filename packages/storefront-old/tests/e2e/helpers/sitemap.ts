import { type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// exclude URLS which should not be checked -> include all links which lead to downloads
const blacklistedUrls: string[] = [
  'https://github.com/porsche-design-system/porsche-design-system',
  'https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip',
  'https://sitepoint.com/introduction-wai-aria/',
  'https://adabook.com/',
  'https://etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf',
];

const console = require('console'); // workaround for nicer logs

const sitemapFixturePath = path.resolve(__dirname, '../fixtures/sitemap.json');
const sitemapResultPath = path.resolve(__dirname, '../results/sitemap.json');

function removeDuplicates(array = []) {
  return [...new Set(array)];
}

function isInternalUrl(url = '') {
  return url.startsWith('/');
}

export const getSitemap = (): string[] => {
  const fileContent = fs.readFileSync(sitemapFixturePath, 'utf8');

  return JSON.parse(fileContent);
};

export const getInternalUrls = (urls = getSitemap()): string[] => {
  return (
    urls
      .filter((url) => isInternalUrl(url))
      // drop "base" links that are redirected to first tab
      .filter((url, _index, filteredUrls) => !filteredUrls.some((link) => link.startsWith(url + '/')))
  );
};

export const getExternalUrls = (urls = getSitemap()): string[] => {
  return urls.filter((url) => !isInternalUrl(url));
};

export const buildSitemap = async (page: Page): Promise<string[]> => {
  console.log('Building sitemap...');

  fs.mkdirSync(path.dirname(sitemapResultPath), { recursive: true });

  await page.goto('/');

  // initial scan on front page without duplicates
  let sitemapUrls = removeDuplicates(await scanForUrls(page));

  for (let index = 0; index < sitemapUrls.length; index++) {
    const url = sitemapUrls[index];

    // scan internal urls only
    if (isInternalUrl(url)) {
      console.log(`Crawling url ${index + 1}/${sitemapUrls.length}...`);

      await page.goto(url);

      // add new links found on the page, they will be iterated also
      sitemapUrls = removeDuplicates(sitemapUrls.concat(await scanForUrls(page)));
    }
  }

  sitemapUrls.sort();

  console.log(`Finished building sitemap.json with ${sitemapUrls.length} urls`);
  console.log(`– Internal urls: ${getInternalUrls(sitemapUrls).length}`);
  console.log(`– External urls: ${getExternalUrls(sitemapUrls).length}`);

  // write results/sitemap.json
  // we only care about internalUrls, since we do nothing with external ones,
  // and they just cause an additional CI run when extending the changelog
  fs.writeFileSync(sitemapResultPath, JSON.stringify(sitemapUrls, null, 2));

  return sitemapUrls;
};

const scanForUrls = async (page: Page): Promise<string[]> => {
  const urls = await page.evaluate(() => {
    const collectedHrefs = [];

    for (const anchor of document.querySelectorAll('body [href]')) {
      // don't collect "toc"-links since anchor links lead to the same page they were found on
      if (anchor.parentElement?.parentElement?.className === 'toc') {
        continue;
      }

      collectedHrefs.push(anchor.getAttribute('href'));
    }

    return collectedHrefs;
  });

  return (
    urls
      .map((url) => (!url.startsWith('http') && !isInternalUrl(url) ? `/${url}` : url)) // add leading slash for links within markdown
      .filter((url) => !blacklistedUrls.includes(url)) // get rid of blacklisted urls
      // filters out porsche design system pull request urls, otherwise we'd need to re-run CI all the time
      .filter((url) => !url.startsWith('https://github.com/porsche-design-system/porsche-design-system/pull/'))
      .filter((url) => (isInternalUrl(url) ? !url.includes('#') : true)) // get rid of internal anchor links
  );
};
