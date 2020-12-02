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

  it('should request from .com cdn for { cdn: "auto" } when outside of china', async () => {
    await setContentWithDesignSystem(page, content, 'auto');

    expect(requests.length).toBe(responses.length);

    expect(responses.filter((item) => item.status !== 200).length).toBe(0);
    expect(responses.filter((item) => item.url.includes('cdn.ui.porsche.com')).length).toBe(responses.length);

    const baseUrl = 'https://cdn.ui.porsche.com/porsche-design-system';

    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/components/porsche-design-system.v`)).length).toBe(1);
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/styles/font-face.min.`)).length).toBe(1);
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/icons/arrow-head-right.min.`)).length).toBe(1);
    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/fonts/porsche-next-w-la-regular.min.`)).length).toBe(1);
    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/marque/porsche-marque-trademark.medium.min.`)).length).toBe(1);

    const responseErrors = responses.filter((item) => item.status === 400);
    if (responseErrors.length) {
      console.log('status 400', responseErrors);
    }
  });

  it('should request always from .cn cdn for { cdn: "cn" }', async () => {
    await setContentWithDesignSystem(page, content, 'cn');

    expect(requests.length).toBe(responses.length);

    expect(responses.filter((item) => item.status !== 200).length).toBe(0);
    expect(responses.filter((item) => item.url.includes('cdn.ui.porsche.cn')).length).toBe(responses.length);

    const baseUrl = 'https://cdn.ui.porsche.cn/porsche-design-system';

    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/components/porsche-design-system.v`)).length).toBe(1);
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/styles/font-face.min.`)).length).toBe(1);
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/icons/arrow-head-right.min.`)).length).toBe(1);
    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/fonts/porsche-next-w-la-regular.min.`)).length).toBe(1);
    // prettier-ignore
    expect(responses.filter((item) => item.url.startsWith(`${baseUrl}/marque/porsche-marque-trademark.medium.min.`)).length).toBe(1);

    const responseErrors = responses.filter((item) => item.status === 400);
    if (responseErrors.length) {
      console.log('status 400', responseErrors);
    }
  });

  it('should not emit lifecycleDOMEvents', async () => {
    const COUNTER_KEY = 'lifecycleCounter';
    await page.evaluate((COUNTER_KEY: string) => {
      window[COUNTER_KEY] = 0;
      ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
        window.addEventListener(`stencil_${event}`, () => {
          window[COUNTER_KEY]++;
        });
      });
    }, COUNTER_KEY);

    const getCountedEvents = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

    await setContentWithDesignSystem(page, content);

    expect(await getCountedEvents()).toBe(0);
  });
});
