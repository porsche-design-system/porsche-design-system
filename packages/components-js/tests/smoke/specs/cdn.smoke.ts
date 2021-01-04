import { getBrowser, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

describe('cdn', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const content = `
<p-content-wrapper>
  <p-marque></p-marque>
  <p-headline variant="headline-1">Some Headline</p-headline>
  <p-button>Some label</p-button>
</p-content-wrapper>`;

  describe('assets', () => {
    type Request = { url: string };
    type Response = { url: string; status: number };
    const requests: Request[] = [];
    const responses: Response[] = [];

    beforeEach(async () => {
      await page.setRequestInterception(true);

      requests.length = 0; // clear old array
      responses.length = 0; // clear old array

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

        if (url.includes('cdn.ui.porsche')) {
          responses.push({ url, status });
        }
      });
    });

    const isStatusNot200 = (item: Response): boolean => item.status !== 200;
    const isStatus400 = (item: Response): boolean => item.status === 400;
    const urlIncludes = (str: string) => (item: Response): boolean => item.url.includes(str);
    const urlStartsWith = (str: string) => (item: Response): boolean => item.url.startsWith(str);

    describe('.com and .cn domains', () => {
      const assetPaths = {
        components: 'components/porsche-design-system.v',
        styles: 'styles/font-face.min.',
        icons: 'icons/arrow-head-right.min.',
        fonts: 'fonts/porsche-next-w-la-regular.min.',
        marque: 'marque/porsche-marque-trademark.medium.min.',
      };

      it('should request from .com cdn for { cdn: "auto" } when outside of china', async () => {
        await setContentWithDesignSystem(page, content, 'auto');

        const cdnDomain = 'cdn.ui.porsche.com';
        const baseUrl = `https://${cdnDomain}/porsche-design-system`;

        expect(requests.length).toBe(responses.length);
        expect(responses.filter(isStatusNot200).length).toBe(0);
        expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.styles}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.marque}`)).length).toBe(1);

        const responseErrors = responses.filter(isStatus400);
        if (responseErrors.length) {
          console.log('status 400', responseErrors);
        }
      });

      it('should request always from .cn cdn for { cdn: "cn" }', async () => {
        await setContentWithDesignSystem(page, content, 'cn');

        const cdnDomain = 'cdn.ui.porsche.cn';
        const baseUrl = `https://${cdnDomain}/porsche-design-system`;

        expect(requests.length).toBe(responses.length);
        expect(responses.filter(isStatusNot200).length).toBe(0);
        expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.styles}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
        expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.marque}`)).length).toBe(1);

        const responseErrors = responses.filter(isStatus400);
        if (responseErrors.length) {
          console.log('status 400', responseErrors);
        }
      });
    });
  });

  it('should not emit lifecycleDOMEvents', async () => {
    const COUNTER_KEY = 'lifecycleCounter';
    const extendedContent = `
<script>
  window['${COUNTER_KEY}'] = 0;
  ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
    window.addEventListener(\`stencil_\${event}\`, () => {
      window['${COUNTER_KEY}']++;
    });
  })
</script>
${content}`;

    const getCountedEvents = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

    await setContentWithDesignSystem(page, extendedContent);

    expect(await getCountedEvents()).toBe(0);

    await page.evaluate(() => {
      const event = new CustomEvent('stencil_componentWillUpdate');
      window.dispatchEvent(event);
    });

    expect(await getCountedEvents()).toBe(1);
  });
});
