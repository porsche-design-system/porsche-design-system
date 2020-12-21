import { Page } from 'puppeteer';
import { getBrowser, responses, setRequestInterceptor } from '../helpers';
import { ICONS_CDN_BASE_URL, ICONS_MANIFEST } from '@porsche-design-system/assets';

describe('icons cdn', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await setRequestInterceptor(page);
  });

  afterEach(async () => await page.close());

  const CDNBaseUrl = ICONS_CDN_BASE_URL;
  const fileNames = Object.values(ICONS_MANIFEST);

  it('should give correct response from cdn on icon call', async () => {
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
