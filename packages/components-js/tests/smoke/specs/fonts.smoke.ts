import { Page } from 'puppeteer';
import { getBrowser, responses, setRequestInterceptor } from '../helpers';
import { FONTS_CDN_BASE_URL, FONTS_MANIFEST } from '@porsche-design-system/assets';

// Triggers File Download, maybe we download it and read buffer?

xdescribe('fonts cdn', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await setRequestInterceptor(page);
  });

  afterEach(async () => await page.close());

  const CDNBaseUrl = FONTS_CDN_BASE_URL;

  let fileNames: string[];
  for (const [, url] of Object.entries(FONTS_MANIFEST)) {
    fileNames = Object.values(url);
  }

  it('should give correct response from cdn on fonts call', async () => {
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
