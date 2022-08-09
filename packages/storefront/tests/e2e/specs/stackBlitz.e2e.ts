import { baseURL } from '../helpers';
import type { Page } from 'puppeteer';
import { Framework } from '../../../src/models';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it.each(<Framework[]>['react', 'vanilla-js', 'angular'])(
  'should have working stackBlitz button for framework: %s',
  async (framework) => {
    await page.goto(`${baseURL}/components/button/examples`, { waitUntil: 'networkidle0' });

    const playground = await page.$('.playground');
    const stackBlitzButton = await playground.$('p-button[type=button]');

    const codeBlock = await page.$('.code-block');
    const frameWorkTabsBar = await codeBlock.$('p-tabs-bar');
    const frameWorkButtons = await frameWorkTabsBar.$$('button');

    const frameWorkButtonMap = {
      'vanilla-js': 0,
      angular: 1,
      react: 2,
    };
    const frameWorkButton = frameWorkButtons[frameWorkButtonMap[framework]];

    frameWorkButton.click();
    await page.waitForFunction((el) => el.getAttribute('aria-selected') === 'true', {}, frameWorkButton);

    // ensure Framework is switched
    expect(await frameWorkTabsBar.evaluate((el) => (el as any).activeTabIndex)).toBe(frameWorkButtonMap[framework]);

    // bypass captcha in headless chrome
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
    );

    //save target of original page to know that this was the opener:
    const pageTarget = page.target();

    // now we're on the stackBlitz website
    await stackBlitzButton.click();

    // get stackBlitz tab
    //check that the first page opened this new page:
    const newTarget = await browser.waitForTarget((target) => target.opener() === pageTarget);
    //get the new page object:
    const stackBlitzPage = await newTarget.page();

    await stackBlitzPage.waitForSelector('#PreviewContentWrapper');
    const previewContentWrapper = await stackBlitzPage.$('#PreviewContentWrapper');

    await previewContentWrapper.waitForSelector('iframe');
    const iframe = await previewContentWrapper.$('iframe');
    const iframeSource = await iframe.evaluate((iframe) => iframe.src);

    // go to iframeSource link to avoid cross origin restrictions
    await page.goto(iframeSource, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.hydrated');

    const documentPDS = await page.evaluate(() => (document as any).porscheDesignSystem);

    expect(documentPDS).toBeDefined();
    await stackBlitzPage.close();
  }
);
