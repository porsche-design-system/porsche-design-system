import { type CDPSession, expect, test } from '@playwright/test';
import { setContentWithDesignSystem } from '../helpers';

type RequestType = { url: string };
type ResponseType = { url: string; status: number; headers: Record<string, string> };
const requests: RequestType[] = [];
const responses: ResponseType[] = [];

const isStatusNot200 = (item: ResponseType, _index: number, _arr: ResponseType[]): boolean => item.status !== 200;
const urlIncludes =
  (str: string) =>
  (item: ResponseType, _index: number, _arr: ResponseType[]): boolean =>
    item.url.includes(str);
const urlStartsWith =
  (str: string) =>
  (item: ResponseType, _index: number, _arr: ResponseType[]): boolean =>
    item.url.startsWith(str);

test.beforeEach(async ({ page }) => {
  const cdp: CDPSession = await page.context().newCDPSession(page);
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

  page.on('request', (req) => {
    const url = req.url();

    if (url.includes('cdn.ui.porsche')) {
      requests.push({ url });
    }
  });

  page.on('response', (resp) => {
    const url = resp.url();
    const status = resp.status();
    const headers = resp.headers();

    if (url.includes('cdn.ui.porsche')) {
      // console.log(status, url);
      responses.push({ url, status, headers });
    }
  });
});

test.describe('bootstrapping with .com and .cn domains', () => {
  const assetPaths = {
    components: 'components/porsche-design-system.v',
    icons: 'icons/arrow-right.',
    flags: 'flags/de.',
    fonts: 'fonts/porsche-next-latin-regular.',
    crest: 'crest/porsche-crest.',
  } as const;

  const content = `
  <p-crest></p-crest>
  <p-flag></p-flag>
  <p-heading size="xx-large">Some Headline</p-heading>
  <p-button icon="arrow-right">Some label</p-button>`;

  test('should request from .com cdn for { cdn: "auto" } when outside of china', async ({ page }) => {
    await setContentWithDesignSystem(page, content, 'auto');

    const cdnDomain = 'cdn.ui.porsche.com';
    const baseUrl = `https://${cdnDomain}/porsche-design-system`;

    console.log(responses);

    expect(requests.length).toBe(responses.length);
    expect(responses.filter(isStatusNot200).length).toBe(0);
    expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.flags}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.crest}`)).length).toBe(1);
  });

  test('should request always from .cn cdn for { cdn: "cn" }', async ({ page }) => {
    await setContentWithDesignSystem(page, content, 'cn');

    const cdnDomain = 'cdn.ui.porsche.cn';
    const baseUrl = `https://${cdnDomain}/porsche-design-system`;

    expect(requests.length).toBe(responses.length);
    expect(responses.filter(isStatusNot200).length).toBe(0);
    expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.flags}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.crest}`)).length).toBe(1);
  });
});
