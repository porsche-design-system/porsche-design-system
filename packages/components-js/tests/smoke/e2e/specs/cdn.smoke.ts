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

const logSummary = (label: string): void => {
  const respUrls = new Set(responses.map((r) => r.url));
  const orphanRequests = requests.filter((r) => !respUrls.has(r.url));
  const reqUrls = new Set(requests.map((r) => r.url));
  const orphanResponses = responses.filter((r) => !reqUrls.has(r.url));
  const nonOk = responses.filter(isStatusNot200);

  console.log(`\n========== [SUMMARY: ${label}] ==========`);
  console.log(`requests:  ${requests.length}`);
  console.log(`responses: ${responses.length}`);
  console.log(`non-200:   ${nonOk.length}`);
  if (orphanRequests.length > 0) {
    console.warn(`[ORPHAN REQUESTS (no response)]`);
    for (const r of orphanRequests) console.warn(`  - ${r.url}`);
  }
  if (orphanResponses.length > 0) {
    console.warn(`[ORPHAN RESPONSES (no matching request)]`);
    for (const r of orphanResponses) console.warn(`  - ${r.status} ${r.url}`);
  }
  if (nonOk.length > 0) {
    console.warn(`[NON-200 RESPONSES]`);
    for (const r of nonOk) console.warn(`  - ${r.status} ${r.url}`);
  }
  console.log(`==========================================\n`);
};

test.beforeEach(async ({ page }) => {
  const cdp: CDPSession = await page.context().newCDPSession(page);
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

  page.on('request', (req) => {
    const url = req.url();

    if (url.includes('cdn.ui.porsche')) {
      console.log(`[REQUEST] ${req.method()} ${url}`);
      requests.push({ url });
    }
  });

  page.on('response', (resp) => {
    const url = resp.url();
    const status = resp.status();
    const headers = resp.headers();

    if (url.includes('cdn.ui.porsche')) {
      console.log(`[RESPONSE] ${status} ${url}`);
      responses.push({ url, status, headers });
    }
  });

  page.on('requestfailed', (req) => {
    const url = req.url();
    if (url.includes('cdn.ui.porsche')) {
      console.warn(`[REQUEST FAILED] ${url} - ${req.failure()?.errorText ?? 'unknown error'}`);
    }
  });

  page.on('requestfinished', async (req) => {
    const url = req.url();
    if (url.includes('cdn.ui.porsche')) {
      const resp = await req.response();
      console.log(`[REQUEST FINISHED] ${url} - status: ${resp?.status() ?? 'no response'}`);
    }
  });

  page.on('pageerror', (err) => {
    console.error(`[PAGE ERROR] ${err.message}`);
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
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

    logSummary('COM');

    expect(requests.length).toBe(responses.length);
    expect(responses.filter(isStatusNot200).length).toBe(0);
    expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(2); // TODO: Loaded twice because of double url in icon styles?
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.flags}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(0); // TODO: add global style to test so fonts are loaded
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.crest}`)).length).toBe(1);
  });

  test('should request always from .cn cdn for { cdn: "cn" }', async ({ page }) => {
    await setContentWithDesignSystem(page, content, 'cn');

    const cdnDomain = 'cdn.ui.porsche.cn';
    const baseUrl = `https://${cdnDomain}/porsche-design-system`;

    logSummary('CN');

    expect(requests.length).toBe(responses.length);
    expect(responses.filter(isStatusNot200).length).toBe(0);
    expect(responses.filter(urlIncludes(cdnDomain)).length).toBe(responses.length);

    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.components}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.icons}`)).length).toBe(2); // TODO: Loaded twice because of double url in icon styles?
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.flags}`)).length).toBe(1);
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.fonts}`)).length).toBe(0); // TODO: add global style to test so fonts are loaded
    expect(responses.filter(urlStartsWith(`${baseUrl}/${assetPaths.crest}`)).length).toBe(1);
  });
});
