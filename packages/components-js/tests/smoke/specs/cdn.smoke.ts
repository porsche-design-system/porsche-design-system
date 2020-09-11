import { getBrowser, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

describe('cdn', () => {
  let page: Page;
  const requests: { url: string }[] = [];
  const responses: { url: string; status: number }[] = [];

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await page.setRequestInterception(true);

    requests.length = 0;
    responses.length = 0;

    page.removeAllListeners('request');
    page.removeAllListeners('response');

    page.on('request', (req) => {
      const url = req.url();
      console.log('request', url);

      if (url.includes('cdn.ui.porsche')) {
        requests.push({ url });
      }
      req.continue();
    });

    page.on('response', (resp) => {
      const url = resp.url();
      const status = resp.status();
      console.log('response', status, url);

      if (url.includes('cdn.ui.porsche')) {
        responses.push({ url, status });
      }
    });
  });

  afterEach(async () => await page.close());

  const content = `<p-content-wrapper>
  <p-marque></p-marque>
  <p-headline variant="headline-1">Performance test</p-headline>
  <p-button>Some label</p-button>
</p-content-wrapper>`;

  // 6 because of core, marque chunk + asset, headline chunk + font, button chunk
  const minAmountOfRequests = 6;

  fit('should request from .com cdn for { cdn: "auto" } when outside of china', async () => {
    await setContentWithDesignSystem(page, content, 'auto');

    console.log('requestedUrls', requests);
    console.log('respondedUrls', responses);

    expect(requests.length).toBeGreaterThanOrEqual(minAmountOfRequests);
    expect(responses.length).toBeGreaterThanOrEqual(minAmountOfRequests);
    expect(requests.length).toBe(responses.length);

    expect(responses.filter((item) => item.status !== 200).length).toBe(0);
    expect(responses.filter((item) => item.url.includes('cdn.ui.porsche.com')).length).toBe(responses.length);
  });

  it('should request always from .cn cdn for { cdn: "cn" }', async () => {
    await setContentWithDesignSystem(page, content, 'cn');

    console.log('requestedUrls', requests);
    console.log('respondedUrls', responses);

    expect(requests.length).toBeGreaterThanOrEqual(minAmountOfRequests);
    expect(responses.length).toBeGreaterThanOrEqual(minAmountOfRequests);
    expect(requests.length).toBe(responses.length);

    expect(responses.filter((item) => item.status !== 200).length).toBe(0);
    expect(responses.filter((item) => item.url.includes('cdn.ui.porsche.cn')).length).toBe(responses.length);
  });
});
