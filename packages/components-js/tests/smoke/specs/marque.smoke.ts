import { Page } from 'puppeteer';
import { getBrowser, responses, setRequestInterceptor } from '../helpers';
import { MARQUES_CDN_BASE_URL, MARQUES_MANIFEST } from '@porsche-design-system/assets';

describe('marque cdn', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await setRequestInterceptor(page);
  });

  afterEach(async () => await page.close());

  const CDNBaseUrl = MARQUES_CDN_BASE_URL;

  let fileNames: string[];
  for (const [, marqueVariants] of Object.entries(MARQUES_MANIFEST)) {
    for (const [, url] of Object.entries(marqueVariants)) {
      fileNames = Object.values(url);
    }
  }

  it('should give correct response from cdn on marque call', async () => {
    for (let i = 0; i < fileNames.length; i++) {
      await page.goto(CDNBaseUrl + '/' + fileNames[i]);
    }

    const failedResponses = responses.filter((item) => item.status !== 200);

    if (failedResponses.length > 0) {
      console.log('Requests failed for: ', failedResponses);
    }
    expect(failedResponses.length).toBe(0);
  });
});
